#!/usr/bin/env node
/**
 * makefile.js — Cross-platform build system for the Portfolio project (JS/Node port).
 *
 * Usage:
 *     node makefile.js <target> [args...]
 *     make <target>           (delegates here via Makefile)
 *
 * All targets mirror the npm scripts in app/package.json and the generators in
 * scripts/. Node-only: no Python, no colorama, no external deps.
 */

"use strict";

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const APP_DIR = path.join(__dirname, "app");

// ── Tiny colored output (terminal only) ─────────────────────────────────────
function useColor() {
  return process.stderr.isTTY === true || process.stdout.isTTY === true;
}
const C = useColor() ? { b: "\x1b[1m", c: "\x1b[96m", y: "\x1b[33m", g: "\x1b[32m", r: "\x1b[31m", x: "\x1b[0m" } : { b: "", c: "", y: "", g: "", r: "", x: "" };

function header(title) {
  const bar = `${C.c}${C.b}${"=".repeat(60)}${C.x}`;
  console.log(`\n${bar}\n${C.c}${C.b}  ${title}${C.x}\n${bar}`);
}
function step(msg) {
  console.log(`${C.y}-->${C.x} ${msg}`);
}
function ok(msg) {
  console.log(`${C.g}[OK]${C.x} ${msg}`);
}
function warn(msg) {
  console.log(`${C.y}[WARN]${C.x} ${msg}`);
}
function fail(msg) {
  console.log(`${C.r}[ERROR]${C.x} ${msg}`);
}

/**
 * Run a command, streaming output. Exit code is propagated by default.
 * Mimics subprocess.run with shell=True on Windows so .cmd shims resolve.
 */
function runCmd(args, { cwd, allowFailure = false } = {}) {
  const res = spawnSync(args[0], args.slice(1), {
    cwd,
    stdio: "inherit",
    shell: os.platform() === "win32",
  });
  const code = res.status ?? (res.error ? 1 : 0);
  if (code !== 0 && !allowFailure) process.exit(code);
  return code;
}

function appCmd(args, opts = {}) {
  return runCmd(args, { cwd: APP_DIR, ...opts });
}

// ── Development ──────────────────────────────────────────────────────────────
const t_install = () => {
  header("Installing Dependencies");
  step("Running npm install...");
  appCmd(["npm", "install"]);
  ok("Dependencies installed successfully!");
};
const t_dev = (t_alias = false) => {
  header(`Starting Dev Server${t_alias ? " (alias)" : ""}`);
  step("Launching Vite dev server — press Ctrl+C to stop");
  appCmd(["npm", "run", "dev"]);
};
const t_start = () => t_dev(true);
const t_preview = () => {
  header("Starting Preview Server");
  step("Serving production build locally — press Ctrl+C to stop");
  appCmd(["npm", "run", "preview"]);
};
const t_watch_prod = () => {
  header("Watch + Serve Production Build");
  step("Building, watching for changes, serving at http://localhost:3000");
  step("Press Ctrl+C to stop");
  appCmd(["npm", "run", "watch:prod"]);
};

// ── Build ─────────────────────────────────────────────────────────────────────
const t_gen_git_stats = () => {
  header("Generating Git Statistics");
  appCmd(["npm", "run", "gen:git-stats"]);
  ok("Git stats generated!");
};
const t_gen_git_commits = () => {
  header("Generating Git Commits");
  appCmd(["npm", "run", "gen:git-commits"]);
  ok("Git commits generated!");
};
const t_gen_git_meta = () => {
  header("Generating Git Meta");
  appCmd(["npm", "run", "gen:git-meta"]);
  ok("Git meta generated!");
};
const t_gen_activity = () => {
  header("Generating Activity Feed");
  appCmd(["npm", "run", "gen:activity"]);
  ok("Activity feed generated!");
};
const t_gen_git_all = () => {
  header("Generating All Git Data (parallel)");
  const scripts = ["gen:git-stats", "gen:git-commits", "gen:git-meta"];
  const results = scripts.map((s) => {
    const r = spawnSync("npm", ["run", s], { cwd: APP_DIR, stdio: "inherit", shell: os.platform() === "win32" });
    return { name: s, code: r.status ?? (r.error ? 1 : 0) };
  });
  const failed = results.filter((r) => r.code !== 0);
  if (failed.length) {
    fail(`Failed: ${failed.map((f) => f.name).join(", ")}`);
    process.exit(1);
  }
  ok("All git data generated!");
};
const t_build = () => {
  header("Building for Production");
  runCmd(["node", "scripts/build.js"]);
  ok("Build completed successfully!");
};
const t_build_force = () => {
  header("Force Building (Cleaning Caches)");
  t_gen_git_all();
  step("Cleaning TypeScript cache before build...");
  appCmd(["npm", "run", "force-build"]);
  ok("Force build completed!");
};
const t_analyze = () => {
  header("Analyzing Bundle Size");
  appCmd(["npm", "run", "analyze"]);
};
const t_analyze_verbose = () => {
  header("Verbose Bundle Analysis");
  appCmd(["npm", "run", "analyze:verbose"]);
};

// ── Quality ──────────────────────────────────────────────────────────────────
const t_lint = () => {
  header("Running ESLint");
  appCmd(["npm", "run", "lint"]);
  ok("Linting completed!");
};
const t_lint_fix = () => {
  header("Running ESLint with Auto-fix");
  appCmd(["npx", "eslint", ".", "--ext", "ts,tsx", "--fix"]);
  ok("Linting and fixes completed!");
};
const t_type_check = () => {
  header("TypeScript Type Check");
  appCmd(["npx", "tsc", "--noEmit"]);
  ok("Type checking completed!");
};
const t_format = () => {
  header("Formatting Code");
  appCmd(["npm", "run", "format:write"]);
  ok("Formatting completed!");
};
const t_format_check = () => {
  header("Checking Code Formatting");
  appCmd(["npm", "run", "format:check"]);
  ok("Formatting check passed!");
};
const t_check = () => {
  header("Full Check: lint + type-check");
  t_lint();
  t_type_check();
  ok("All checks passed!");
};

// ── Maintenance ──────────────────────────────────────────────────────────────
const rmrf = (p) => {
  if (!p) return;
  try {
    fs.rmSync(p, { recursive: true, force: true });
  } catch {}
};
const t_clean = () => {
  header("Cleaning Build Artifacts");
  for (const p of [path.join(APP_DIR, "dist"), path.join(APP_DIR, "node_modules", ".vite")]) {
    rmrf(p);
    step(`Removed ${p}`);
  }
  ok("Clean completed!");
};
const t_clean_all = () => {
  header("Deep Clean (artifacts + node_modules)");
  t_clean();
  const nm = path.join(APP_DIR, "node_modules");
  rmrf(nm);
  step(`Removed ${nm}`);
  ok("Deep clean completed!");
};
const t_reinstall = () => {
  header("Reinstalling from Scratch");
  t_clean_all();
  t_install();
  ok("Reinstall completed!");
};
const t_update = () => {
  header("Updating Dependencies");
  appCmd(["npm", "update"]);
  ok("Dependencies updated!");
};
const t_outdated = () => {
  header("Checking for Outdated Dependencies");
  appCmd(["npm", "outdated"], { allowFailure: true });
};

// ── Git ──────────────────────────────────────────────────────────────────────
const t_git_status = () => runCmd(["git", "status"]);
const t_git_log = () => runCmd(["git", "log", "--oneline", "--graph", "--decorate", "-10"]);
const t_git_pull = () => {
  header("Pulling Latest Changes");
  runCmd(["git", "pull"]);
  ok("Pull completed!");
};
const t_git_push = () => {
  header("Pushing Changes to Remote");
  runCmd(["git", "push"]);
  ok("Push completed!");
};

// ── Info ────────────────────────────────────────────────────────────────────
const t_info = () => {
  header("Project Information");
  console.log(`\n${C.y}Project:${C.x}        Portfolio Website`);
  console.log(`${C.y}Homepage:${C.x}       (set your GitHub Pages URL)`);
  console.log(`${C.y}App Directory:${C.x}  ${APP_DIR}/`);
  console.log(`\n${C.y}Technology Stack:${C.x}`);
  const stack = [
    ["React", "^18.3.1"],
    ["TypeScript", "^5.9.3"],
    ["Vite", "^5.4.21"],
    ["Tailwind CSS", "^3.4.16"],
  ];
  for (const [name, version] of stack) {
    console.log(`  ${C.b}•${C.x} ${name} ${C.b}${version}${C.x}`);
  }
  console.log();
  try {
    const npmVer = spawnSync("npm", ["--version"], { cwd: APP_DIR, encoding: "utf8", shell: os.platform() === "win32" });
    console.log(`${C.y}npm version:${C.x}    ${(npmVer.stdout || "").trim()}`);
  } catch {
    warn("Could not determine npm version");
  }
  console.log();
};
const t_env = () => {
  header("Environment Information");
  console.log(`  Working Directory:  ${process.cwd()}`);
  console.log(`  App Directory:      ${APP_DIR}`);
  console.log(`  Node Version:       ${process.version}`);
  console.log(`  OS:                 ${os.type()} ${os.release()}`);
};

// ── Composite ────────────────────────────────────────────────────────────────
const t_fresh_start = () => {
  header("Fresh Start — clean, install, dev");
  t_clean_all();
  t_install();
  t_dev();
};
const t_prod_ready = () => {
  header("Production Readiness — clean + check + build");
  t_clean();
  t_check();
  t_build();
  ok("Production build ready!");
};
const t_quick_deploy = () => {
  header("Quick Deploy Check — lint + type-check + build");
  t_check();
  t_build();
  ok("Ready for deployment!");
  warn("Tip: Push to main branch to trigger GitHub Pages deployment");
};

// ── Help ──────────────────────────────────────────────────────────────────
const TARGETS = {
  // Development
  install: [t_install, "Install all dependencies", "Development"],
  dev: [t_dev, "Start development server", "Development"],
  start: [t_start, "Alias for dev", "Development"],
  preview: [t_preview, "Preview production build locally", "Development"],
  "watch-prod": [t_watch_prod, "Watch, rebuild, and serve production build at :3000", "Development"],
  // Build
  "gen-git-stats": [t_gen_git_stats, "Generate git statistics", "Build"],
  "gen-git-commits": [t_gen_git_commits, "Generate git commits JSON", "Build"],
  "gen-git-meta": [t_gen_git_meta, "Generate component-level git blame metadata", "Build"],
  "gen-git-all": [t_gen_git_all, "Generate all git data in parallel", "Build"],
  "gen-activity": [t_gen_activity, "Generate cross-repo activity feed JSON", "Build"],
  build: [t_build, "Build for production", "Build"],
  "build-force": [t_build_force, "Force rebuild (clean TypeScript cache)", "Build"],
  analyze: [t_analyze, "Build and analyze bundle size", "Build"],
  "analyze-verbose": [t_analyze_verbose, "Build with verbose bundle analysis", "Build"],
  // Quality
  lint: [t_lint, "Run ESLint on the codebase", "Quality"],
  "lint-fix": [t_lint_fix, "Run ESLint and auto-fix issues", "Quality"],
  "type-check": [t_type_check, "Run TypeScript type checking", "Quality"],
  format: [t_format, "Format codebase with Prettier", "Quality"],
  "format-check": [t_format_check, "Check formatting with Prettier", "Quality"],
  check: [t_check, "Run all checks (lint + type-check)", "Quality"],
  // Maintenance
  clean: [t_clean, "Clean build artifacts", "Maintenance"],
  "clean-all": [t_clean_all, "Clean everything including node_modules", "Maintenance"],
  reinstall: [t_reinstall, "Reinstall all dependencies from scratch", "Maintenance"],
  update: [t_update, "Update all dependencies to latest versions", "Maintenance"],
  outdated: [t_outdated, "Check for outdated dependencies", "Maintenance"],
  // Git
  status: [t_git_status, "Show git status", "Git"],
  log: [t_git_log, "Show recent git commits", "Git"],
  pull: [t_git_pull, "Pull latest changes from remote", "Git"],
  push: [t_git_push, "Push changes to remote", "Git"],
  // Info
  info: [t_info, "Show project information", "Info"],
  env: [t_env, "Show environment information", "Info"],
  // Composite
  "fresh-start": [t_fresh_start, "Clean, install, and run dev server", "Composite"],
  "prod-ready": [t_prod_ready, "Clean, check, and build for production", "Composite"],
  "quick-deploy": [t_quick_deploy, "Lint + type-check + build", "Composite"],
};

const t_help = () => {
  const groups = {};
  for (const [name, [, desc, group]] of Object.entries(TARGETS)) {
    (groups[group] ??= []).push([name, desc]);
  }
  console.log(`\n${C.c}${C.b}Portfolio Project — Available Commands${C.x}\n`);
  const order = ["Development", "Build", "Quality", "Maintenance", "Git", "Info", "Composite"];
  for (const group of order) {
    if (!groups[group]) continue;
    console.log(`${C.y}${C.b}${group}:${C.x}`);
    for (const [name, desc] of groups[group]) {
      console.log(`  ${C.g}${name.padEnd(22)}${C.x}  ${desc}`);
    }
    console.log();
  }
};

const main = () => {
  const name = process.argv[2];
  if (!name || name === "help" || !(name in TARGETS)) {
    if (name && !(name in TARGETS)) {
      fail(`Unknown target: '${name}'`);
      console.log(`  Run:  node makefile.js help  to list all available targets.`);
      process.exit(1);
    }
    t_help();
    process.exit(0);
  }
  TARGETS[name][0]();
};

main();
