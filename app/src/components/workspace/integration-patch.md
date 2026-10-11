# Integration notes — manual wiring
- Palette: index.css now maps ctp-* vars to VIVEK.DEV (#10131A/#171B24/#202633/#2864FF) so existing components recolor without rewiring.
- projects.json replaced with 2 honest entries: Event Hive (In progress) + Cloud Storage (Planned) with status-split features.
- siteConfig at src/config/site.ts is source of truth; leave links empty as placeholders.
- New components in src/components/workspace/: StatusBar, CommandPalette (Ctrl/Cmd+K), ArchitectureExplorer, ProjectStudio, EngineeringConsole, Journal, MobileNav, SearchBar.
- TODO wiring (safe, no data loss):
  1) In src/components/home/editor/code-editor.tsx add: import CommandPalette from "@/components/workspace/CommandPalette" and render <CommandPalette/> inside root.
  2) In src/components/home/portfolio/learning/learning-section.tsx render <Journal/> alongside existing content (or replace with tabs).
  3) In src/components/home/portfolio/contact/contact-me.tsx read siteConfig.links and show placeholders clearly when empty.
  4) In src/components/home/portfolio/projects/projects-section.tsx render ProjectStudio for selected project and badge status (Implemented/In progress/Planned).
  5) Optional: add SearchBar to explorer header and MobileNav to CodeEditor mobile layout.
- No fake commits/stats introduced. Terminal commands remain safe whitelist.
