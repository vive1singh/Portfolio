export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  tag: string;
  project?: string;
  body: string;
  labels?: string[];
};

/**
 * Authored Engineering Journal — manually maintained engineering milestones
 * for Vivek's projects. These are written by hand from the actual build
 * journey; no fabricated commits, contribution counts or test results.
 */
export const journalEntries: JournalEntry[] = [
  {
    id: "j-001",
    date: "2027",
    title: "Event Hive — project foundation",
    tag: "Project",
    project: "Event Hive",
    body:
      "Started Event Hive with a frontend-first scope: an event discovery and booking experience built with React, TypeScript, Tailwind and Vite. The booking interfaces, dashboards and category browsing are the implemented first pass. The backend is deliberately deferred — this journal records the decisions so the build order stays honest and reviewable.",
    labels: ["React", "TypeScript", "Vite"],
  },
  {
    id: "j-002",
    date: "2027",
    title: "Workspace design tokens",
    tag: "Journal",
    body:
      "Defined the VIVEK.DEV design system: deep-navy/graphite dark theme with an electric cobalt accent, plus a warm paper light theme. Chose restrained motion, editor-style layout, and clear Implemented / In progress / Planned labels across every project surface so the portfolio never overstates where a project stands.",
    labels: ["Design system", "Theming"],
  },
  {
    id: "j-003",
    date: "Next up",
    title: "Event Hive — auth, database and booking persistence",
    tag: "Roadmap",
    project: "Event Hive",
    body:
      "The next engineering milestone is the backend: user accounts, the database schema (users, events, bookings), a REST API and real booking persistence. Payments remain an open question until booking flows are proven against real data.",
    labels: ["Node", "Express", "PostgreSQL"],
  },
  {
    id: "j-004",
    date: "Future",
    title: "Unified Cloud Storage Manager — roadmap",
    tag: "Planned",
    project: "Unified Cloud Storage Manager",
    body:
      "A planned full-stack concept: adapters over multiple cloud providers, unified file discovery, embeddings + pgvector for semantic search, storage analytics and duplicate detection. Not started — this entry exists to capture the plan and keep it from being mistaken for a shipped product.",
    labels: ["RAG", "pgvector", "Node"],
  },
  {
    id: "j-005",
    date: "Ongoing",
    title: "Learning path — JavaScript ecosystem",
    tag: "Learning",
    body:
      "BCA coursework (CCS University) grounded in computer fundamentals, while a parallel self-study track goes deep on JavaScript: React, TypeScript, Tailwind, Node/Express, databases and data structures in JavaScript. Every project in this workspace is a practical application of that track.",
    labels: ["JavaScript", "DSA"],
  },
];
