# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║                          PORTFOLIO PROJECT MAKEFILE                          ║
# ║        Delegates to makefile.js — the Node.js build system (no Python)       ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

.DEFAULT_GOAL := help

# All targets simply pass through to the Node script. Colourised output,
# cross-platform (Windows / macOS / Linux). No Python required.

NODE := node

# ── Catch-all rule ────────────────────────────────────────────────────────────
# Any target not listed below falls through here so you can still type
#   make <anything>
# and have it forwarded to makefile.js automatically.
%:
	@$(NODE) makefile.js $@

# ── Explicit phony declarations ───────────────────────────────────────────────
# Listed so that tab-completion and `make help` work predictably.

.PHONY: help
help:
	@$(NODE) makefile.js help

# Development
.PHONY: install dev start preview watch-prod
install:
	@$(NODE) makefile.js install
dev:
	@$(NODE) makefile.js dev
start:
	@$(NODE) makefile.js start
preview:
	@$(NODE) makefile.js preview
watch-prod:
	@$(NODE) makefile.js watch-prod

# Build
.PHONY: build build-force analyze analyze-verbose gen-git-stats gen-git-commits gen-git-meta gen-git-all gen-activity
gen-activity:
	@$(NODE) makefile.js gen-activity
gen-git-stats:
	@$(NODE) makefile.js gen-git-stats
gen-git-commits:
	@$(NODE) makefile.js gen-git-commits
gen-git-meta:
	@$(NODE) makefile.js gen-git-meta
gen-git-all:
	@$(NODE) makefile.js gen-git-all
build:
	@$(NODE) makefile.js build
build-force:
	@$(NODE) makefile.js build-force
analyze:
	@$(NODE) makefile.js analyze
analyze-verbose:
	@$(NODE) makefile.js analyze-verbose

# Quality
.PHONY: lint lint-fix type-check check format format-check
lint:
	@$(NODE) makefile.js lint
lint-fix:
	@$(NODE) makefile.js lint-fix
type-check:
	@$(NODE) makefile.js type-check
check:
	@$(NODE) makefile.js check
format:
	@$(NODE) makefile.js format
format-check:
	@$(NODE) makefile.js format-check

# Maintenance
.PHONY: clean clean-all reinstall update outdated
clean:
	@$(NODE) makefile.js clean
clean-all:
	@$(NODE) makefile.js clean-all
reinstall:
	@$(NODE) makefile.js reinstall
update:
	@$(NODE) makefile.js update
outdated:
	@$(NODE) makefile.js outdated

# Git
.PHONY: status log pull push
status:
	@$(NODE) makefile.js status
log:
	@$(NODE) makefile.js log
pull:
	@$(NODE) makefile.js pull
push:
	@$(NODE) makefile.js push

# Information
.PHONY: info env
info:
	@$(NODE) makefile.js info
env:
	@$(NODE) makefile.js env

# Composite
.PHONY: fresh-start prod-ready quick-deploy
fresh-start:
	@$(NODE) makefile.js fresh-start
prod-ready:
	@$(NODE) makefile.js prod-ready
quick-deploy:
	@$(NODE) makefile.js quick-deploy
