#!/usr/bin/env node
// Full production build pipeline (npm version):
//   1. Unshallow git clone (needed in CI environments)
//   2. Generate all git data JSON files
//   3. Generate activity feed
//   4. Run Vite build
//
// Usage (from repo root):  node scripts/build.js
// Usage (from app/):       node ../scripts/build.js

"use strict";

const { execSync } = require("child_process");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APP = path.join(ROOT, "app");

function run(cmd, opts = {}) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", ...opts });
}

try {
  run("git fetch --unshallow", { cwd: ROOT });
} catch {
  // Not a shallow clone or fetch failed — safe to ignore
}

run("node scripts/generate-git-stats.js", { cwd: ROOT });
run("node scripts/generate-git-commits.js", { cwd: ROOT });
run("node scripts/generate-git-meta.js", { cwd: ROOT });

run("node scripts/generate-activity-feed.js", { cwd: ROOT });

run("npm run build", { cwd: APP });

console.log("\nBuild complete.");
