# Vivek Singh — Developer Portfolio

**_A VS Code–inspired developer portfolio. Built to impress. Crafted to perform._**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.x-fbf0df?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## 🧠 About

I'm **Vivek Singh** — a BCA student at CCS University working my way toward being a full stack developer. I focus on frontend with **JavaScript** and **React**, and I'm actively learning **TypeScript, Tailwind, Node, Express, databases, and DSA in JavaScript**.

This portfolio is my **software engineering workspace**: a fully interactive, VS Code–inspired single-page application that reimagines the portfolio as a living code editor — complete with a file explorer, closeable tabs, an embedded terminal, and a git commits panel.

**Why this exists:**

Most portfolios are static pages. This one behaves like an IDE. Every section of the portfolio maps to a "file" inside the editor. Visitors navigate the way developers do — through files and tabs — making the experience memorable, immersive, and uniquely on-brand for a software developer.

**Problems it solves:**

- 🎯 Stands out in a sea of template-based portfolios
- 🎨 Communicates personality through the UI itself, not just text
- ⚡ Delivers exceptional performance via code splitting, PWA caching, image optimization, compression, and lazy loading
- 📱 Works beautifully on both desktop and mobile, with swipe navigation on touch devices

---

## ✨ Key Features

- 💻 **VS Code Editor UI** — Authentic file explorer, closeable tabs (close left/right/all), breadcrumbs, status bar, and outline panel. Open tabs are remembered between visits.
- 🔍 **Git Blame Annotations** — Hover any component to see its last commit (hash, date, author, message), sourced from pre-generated `git-meta.json`, mirroring the VS Code GitLens experience. Can be toggled off in Settings; disabled on mobile.
- 📜 **Git Commits Panel** — Browsable commit history for this repo, with a GitHub-style contribution heatmap
- 📡 **Activity Feed** — A cross-repo panel showing recent commits from my most recently pushed GitHub repositories
- 🗂️ **Project Workspace** — Each project opens in its own workspace with overview, architecture, features, challenges, tech stack, roadmap, and shareable deep links
- ⌨️ **Interactive Terminal** — A real-feeling terminal with commands like `help`, `ls`, `cd`, `cat`, `find`, `projects`, `skills`, and `contact`
- 💫 **CSS Module Animations** — Performant, zero-runtime-cost animations via CSS modules + AnimeJS for complex sequences
- 🚀 **Project Showcase** — A featured project plus a project grid, each with honest Implemented / In progress / Planned status labels
- 📝 **Articles Section** — Highlights technical writing, blog posts, and dev content
- 📱 **Swipe Navigation** — Mobile-first swipe gestures (via `react-swipeable`) for navigating sections and projects
- 🎨 **Multi-Theme Support** — Catppuccin flavor picker in Settings (Mocha, Macchiato, Frappé, Latte) with persisted preference
- ⚡ **PWA Ready** — Installable, offline-capable, and lightning-fast with Vite's service worker plugin
- 🔬 **React Compiler** — Enabled through Babel for automatic memoization and optimized re-renders

---

## 🛠️ Tech Stack

### Core

| Layer            | Technology                                           |
| :--------------- | :--------------------------------------------------- |
| **UI Framework** | React 18.3 + TypeScript 5                            |
| **Build Tool**   | Vite 5                                               |
| **Styling**      | Tailwind CSS 3 (Catppuccin, 4 flavors) + CSS Modules |
| **Routing**      | React Router DOM 7                                   |
| **State Mgt**    | Zustand 5                                            |
| **Pkg Manager**  | Bun                                                  |
| **Compiler**     | React Compiler (via Babel)                           |

### UI & Components

| Purpose                 | Library                                                     |
| :---------------------- | :---------------------------------------------------------- |
| **Headless Primitives** | Radix UI _(Dialog, Tabs, Tooltip, Dropdown, Avatar, …)_     |
| **Component System**    | shadcn/ui (style: `new-york`)                               |
| **Icons**               | Lucide React + React Icons                                  |
| **Drawer**              | Vaul                                                        |
| **Resizable Layouts**   | react-resizable-panels                                      |
| **Swipe Gestures**      | react-swipeable                                             |
| **Scroll Observers**    | react-intersection-observer                                 |
| **Code Highlighting**   | PrismJS + react-syntax-highlighter                          |
| **Markdown Rendering**  | react-markdown + rehype-highlight + rehype-raw + remark-gfm |

### Animations

| Purpose                   | Library                           |
| :------------------------ | :-------------------------------- |
| **Complex Sequences**     | AnimeJS 3                         |
| **Transition Animations** | CSS Modules + tailwindcss-animate |

### Build & DX

| Purpose                | Tool                                                            |
| :--------------------- | :-------------------------------------------------------------- |
| **Bundler**            | Vite 5 + Rollup                                                 |
| **Type Checking**      | TypeScript 5 + vite-plugin-checker                              |
| **Linting**            | ESLint 8 + typescript-eslint + react-hooks + simple-import-sort |
| **Formatting**         | Prettier 3                                                      |
| **Git Hooks**          | Husky 9                                                         |
| **Bundle Analysis**    | rollup-plugin-visualizer                                        |
| **Image Optimization** | vite-imagetools + sharp                                         |
| **Compression**        | vite-plugin-compression (gzip/brotli)                           |
| **PWA**                | vite-plugin-pwa                                                 |

---

## 📁 Project Structure

```text
me/
├── app/                        # All source code lives here
│   ├── src/
│   │   ├── App.tsx             # Routes: every section path + /projects/:slug → the editor
│   │   ├── types.ts            # Global TypeScript types
│   │   ├── config/             # Site config + project data (projects.vivek.ts)
│   │   ├── components/
│   │   │   ├── animations/     # Floating elements, Matrix rain, Reveal effects
│   │   │   ├── base/           # ThemeProvider, TechBadge, technology icon mapping
│   │   │   ├── home/
│   │   │   │   ├── editor/     # VS Code chrome: tabs, explorer, breadcrumbs, outline, terminal, status bar
│   │   │   │   │   ├── context/     # Editor store (open tabs) + URL ↔ tab sync
│   │   │   │   │   ├── git-blame/   # Git blame annotations (manager + portal tooltip)
│   │   │   │   │   ├── panels/      # Git commits (with heatmap) and activity feed panels
│   │   │   │   │   └── section/     # Shared wrapper used by every portfolio section
│   │   │   │   └── portfolio/  # Content sections: intro, about, skills, projects, work, resume, …
│   │   │   ├── load/           # 404 page + story-driven intro screens
│   │   │   └── ui/             # shadcn/ui components + shared primitives (Heading/Text, loaders, cards)
│   │   ├── hooks/              # use-mobile, use-project, use-git-component, use-swipe, use-keydown, …
│   │   ├── store/              # Zustand: projects, git data, activity feed, outline, settings
│   │   ├── lib/                # cn() helper (tailwind-merge + clsx), Catppuccin color types
│   │   └── utils/              # Project slugs, outline ids, unique ids
│   ├── public/
│   │   └── data/
│   │       ├── projects.json   # Project cards (source of truth)
│   │       └── projects/       # One markdown write-up per project (<slug>.md)
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── docs/
│   ├── PROJECT_RESTRUCTURE_GUIDE.md  # Writing guide for project markdown pages
│   ├── PROJECT_TEMPLATE.json         # Template for a projects.json entry
│   └── resume.pdf
├── scripts/                    # Build pipeline + git/activity data generators
├── Makefile                    # Dev workflow shortcuts (delegates to makefile.py)
└── README.md
```

The git panels read JSON generated from the repo's history at build time: `app/public/git-stats.json`, `app/public/git-commits.json`, `app/public/data/git-meta.json`, and `app/public/data/activity-feed.json`. These files are gitignored and generated, not committed by hand.

---

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** `>= 1.0` — used as the package manager and runtime
- **[Git](https://git-scm.com/)**
- **Python 3** — only needed for the `make` shortcuts

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vive1singh/me.git
cd me

# 2. Navigate to the app directory
cd app

# 3. Install dependencies
bun install

# 4. Start the development server
bun run dev
```

The dev server will be available at **<http://localhost:5173>**.

The git commits, activity, blame, and status-bar data come from generated JSON files. Run `make gen-git-all` (and `make gen-activity` for the activity feed) once so those panels have data in development.

### Available Commands

Run from the `app/` directory:

```bash
bun run dev              # Start development server
bun run build            # Type-check + production build (does not regenerate git data)
bun run force-build      # Clean rebuild (clears Vite/TS cache)
bun run lint             # ESLint (zero-warnings policy)
bun run typecheck        # TypeScript check only
bun run preview          # Preview the production build locally
bun run watch:prod       # Rebuild on change and serve the production build on :3000
bun run analyze          # Visualize bundle composition
bun run format:check     # Check formatting with Prettier
bun run format:write     # Auto-fix formatting with Prettier
bun run gen:git-stats    # Regenerate per-section git stats (status bar)
bun run gen:git-commits  # Regenerate commits panel + heatmap data
bun run gen:git-meta     # Regenerate per-component git blame data
bun run gen:activity     # Regenerate the cross-repo activity feed (set GITHUB_TOKEN to avoid rate limits)
```

Or use the **Makefile** from the project root (`make help` lists everything):

```bash
make dev              # Start dev server
make build            # Regenerate all git/activity data, then production build
make gen-git-all      # Regenerate all git data in parallel
make lint             # Run linter
make lint-fix         # Auto-fix lint issues
make type-check       # TypeScript check only
make check            # lint + type-check together
make clean            # Remove dist/ and the Vite cache
make fresh-start      # Clean install → start dev
make prod-ready       # Clean, then lint + type-check + build
```

There is no automated test suite; `make check` plus a successful build is the bar for a change. A Husky pre-commit hook runs ESLint (`--fix`, zero warnings) and Prettier on staged files.

### Adding a New Project

Projects are data-driven. No component changes are needed.

1. Add an entry to `app/src/config/projects.vivek.ts`, following the shape of the existing entries (name, tagline, status, description, technologies, etc.).
2. If the project needs a shareable deep link, add a route in `App.tsx` and a page under `app/src/components/workspace/` (`ProjectStudio.tsx` shows the pattern).

---

## 💼 Projects

### 🎟️ Event Hive — *In progress*

> Event discovery & booking platform. Frontend substantially developed; backend, auth and persistence are the next build step.

| Layer                    | Status      |
| :----------------------- | :---------- |
| Frontend UI/UX           | Implemented |
| API integration layer    | In progress |
| Backend (Node + Express) | Planned     |
| DB (MongoDB + Mongoose)  | Planned     |

- [Repo](https://github.com/vive1singh/event-hive)
- Roadmap: Auth → Database & API → Real booking persistence → Payments (if needed)

### ☁️ Unified Cloud Storage Manager — *Planned*

> A planned full-stack concept: connect several cloud providers (Google Drive / Dropbox / OneDrive / etc.) behind one interface, with unified file discovery, semantic search (embeddings + pgvector + RAG), storage analytics, duplicate detection, and AI-assisted file operations.

| Layer                | Status  |
| :------------------- | :------ |
| Frontend UI          | Planned |
| Provider adapters    | Planned |
| PostgreSQL + pgvector | Planned |
| Semantic search / RAG | Planned |

Currently a concept and technical roadmap — no production implementation claimed.

---

## 💡 Usage & Examples

### Terminal Commands

Once the portfolio loads, open the terminal with **Ctrl + `` ` ``** and try:

```text
> help       — Lists all available commands (help <command> for details)
> ls / cd    — List sections or content, and jump to a section
> pwd        — Prints the current section
> cat        — Displays details of a specific item
> find       — Searches across all content
> open       — Opens a link in a new tab
> about      — Shows a quick bio (also: whoami)
> projects   — Lists all projects
> skills     — Lists technical skills
> articles   — Lists articles
> contact    — Shows contact info and social links
> clear      — Clears the terminal output
```

### Navigating Sections

- **Desktop:** Use the file explorer on the left sidebar or click tabs at the top to switch sections. Toggle the explorer with **`\`** or **Ctrl + E**.
- **Mobile:** Swipe left/right to navigate between sections; a swipe hint appears on first load.
- **Direct links:** Every section has its own URL (`/about`, `/projects`, `/resume`, …), and each project has one at `/projects/<slug>`.

### Customizing Content

| Content          | Where it lives                                            |
| :--------------- | :-------------------------------------------------------- |
| Site info        | `app/src/config/site.ts`                                  |
| Projects         | `app/src/config/projects.vivek.ts`                        |
| Articles         | `app/src/components/home/portfolio/articles/articles-dump.ts` |
| Work experience  | `app/src/components/home/portfolio/work/experienceDump.ts`    |
| Skills           | `app/src/components/home/portfolio/skills/data.tsx`             |

Editing these updates both the sections and the terminal commands. No component changes are needed.

---

## 🗺️ Roadmap

- [x] VS Code editor UI with tabs, explorer, and status bar
- [x] Interactive terminal with custom commands
- [x] Git contribution heatmap panel
- [x] Git blame annotations per section (VS Code GitLens–style)
- [x] Git commits history panel
- [x] Project workspace pages
- [x] Multi-theme Catppuccin flavor picker (Mocha, Macchiato, Frappé, Latte)
- [x] PWA support (offline, installable)
- [x] Mobile swipe navigation
- [x] Cross-repo activity feed panel
- [x] Event Hive frontend
- [ ] Event Hive backend (auth, database, API)
- [ ] Unified Cloud Storage Manager
- [ ] Blog/article detail pages with full markdown rendering
- [ ] Full WCAG 2.1 AA accessibility audit

---

## 🤝 Contributing

Contributions are greatly appreciated. Any improvements, bug fixes, or ideas are welcome.

### How to Contribute

1. **Fork** the repository
2. **Create your feature branch**

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes** and ensure they follow the project conventions below
4. **Lint and type-check before committing**

   ```bash
   make check
   ```

5. **Commit your changes**

   ```bash
   git commit -m "feat: your description"
   ```

6. **Push to your branch**

   ```bash
   git push origin feat/your-feature-name
   ```

7. **Open a Pull Request** targeting the `main` branch

### Conventions

- Use `bun` — not npm or yarn
- ESLint zero-warnings policy must pass: `bun run lint`
- Use the Catppuccin `ctp-*` color tokens from `tailwind.config.js` for any new UI (`ctp-blue`, `ctp-mauve`, `ctp-pink`, etc.). Hardcoded colors won't follow the theme flavor picker.
- Use `<Heading>` and `<Text>` from `src/components/ui/text.tsx` — no raw `<h1>`–`<h6>` or `<p>` tags
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Prefer CSS modules or `tailwindcss-animate` for animations — do not add Framer Motion
- Keep components focused; prefer editing existing files over creating new ones

---

## 📄 License

Distributed under the **MIT License**. Free to use, fork, and learn from.

See [`LICENSE`](LICENSE) for full details.

---

## 📬 Contact

**Vivek Singh** — Full Stack Developer (in training) · BCA student at CCS University

| Platform           | Link                                                    |
| :----------------- | :------------------------------------------------------ |
| 🐙 **GitHub**      | [@vive1singh](https://github.com/vive1singh)            |
| 💼 **LinkedIn**    | [Vivek Singh](https://www.linkedin.com/in/vive1singh)   |
| 📧 **Email**       | [dtvivek8@gmail.com](mailto:dtvivek8@gmail.com)         |

---

Made with ❤️ and a lot of ☕ by **Vivek Singh**

⭐ **Star this repo if you found it useful or inspiring!**
