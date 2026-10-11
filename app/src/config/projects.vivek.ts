import type { Project } from "@/types";

export type ProjectStatus = "Implemented" | "In progress" | "Planned";

/** A status-sensitive entry — may carry the full case-study payload. */
export type VivekProject = Project & {
  status: ProjectStatus;
  statusNote?: string;
  problem?: string;
  targetUsers?: string;
  fullDescription?: string;
  implementationStatus?: string;
  engineeringDecisions?: { title: string; detail: string }[];
  challenges?: { title: string; detail: string; solution?: string }[];
  architecture?: {
    frontend: ArchitectureNode[];
    backend: ArchitectureNode[];
  };
  roadmap?: string[];
  virtualFiles?: string[];
  screenshots?: { name: string; src: string; caption: string }[];
  githubLinkVerified?: boolean;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  responsibility: string;
  status: ProjectStatus;
  tech: string;
  source?: string;
  next?: string[];
};

export type BayStatus = "Implemented" | "In progress" | "Planned";
export const STATUS_META: Record<
  BayStatus,
  { label: BayStatus; dot: string; chip: string }
> = {
  Implemented: {
    label: "Implemented",
    dot: "bg-ctp-green",
    chip: "text-ctp-green border-ctp-green/30 bg-ctp-green/10",
  },
  "In progress": {
    label: "In progress",
    dot: "bg-ctp-yellow",
    chip: "text-ctp-yellow border-ctp-yellow/30 bg-ctp-yellow/10",
  },
  Planned: {
    label: "Planned",
    dot: "bg-ctp-blue",
    chip: "text-ctp-blue border-ctp-blue/30 bg-ctp-blue/10",
  },
};

const EVENT_HIVE_ARCH = {
  frontend: [
    {
      id: "ui",
      label: "Frontend UI",
      responsibility:
        "Event discovery, categories, detail views, booking interfaces and dashboards.",
      status: "Implemented" as const,
      tech: "React + TypeScript + Tailwind + Vite",
      source: "app/src/pages",
      next: ["api-layer", "backend-planned", "db-planned"],
    },
    {
      id: "api-layer",
      label: "API integration layer",
      responsibility:
        "Where the frontend will talk to the backend. Currently mocked with local data.",
      status: "In progress" as const,
      tech: "fetch / axios (client) → backend (planned)",
      source: "app/src/services (planned)",
      next: ["backend-planned", "db-planned"],
    },
  ],
  backend: [
    {
      id: "backend-planned",
      label: "Backend (planned)",
      responsibility: "Auth, events, bookings API. Not implemented yet.",
      status: "Planned" as const,
      tech: "Node + Express",
      next: ["db-planned"],
    },
    {
      id: "db-planned",
      label: "Database (planned)",
      responsibility: "Persist users, events, bookings.",
      status: "Planned" as const,
      tech: "MongoDB + Mongoose (planned)",
      next: [],
    },
  ],
};

const CLOUD_STORAGE_ARCH = {
  frontend: [
    {
      id: "cs-ui",
      label: "Unified storage UI (planned)",
      responsibility:
        "Single interface over many cloud providers: browse, search, transfer files.",
      status: "Planned" as const,
      tech: "React + TypeScript + Tailwind",
      source: "Roadmap only — not started",
      next: ["cs-api"],
    },
    {
      id: "cs-api",
      label: "Provider adapter layer (planned)",
      responsibility:
        "Normalize provider APIs (list, download, upload, metadata) behind one interface.",
      status: "Planned" as const,
      tech: "Node + Express + provider SDKs",
      source: "Roadmap only",
      next: ["cs-db"],
    },
  ],
  backend: [
    {
      id: "cs-db",
      label: "PostgreSQL + pgvector (planned)",
      responsibility:
        "File metadata, embeddings for semantic search, storage analytics, dedup.",
      status: "Planned" as const,
      tech: "PostgreSQL + pgvector",
      source: "Roadmap only",
      next: ["cs-rag"],
    },
    {
      id: "cs-rag",
      label: "Semantic search / RAG (planned)",
      responsibility:
        "Embedding pipeline + retrieval-augmented search over file metadata output.",
      status: "Planned" as const,
      tech: "Embeddings + RAG",
      source: "Roadmap only",
      next: [],
    },
  ],
};

export const vivekProjects: VivekProject[] = [
  {
    name: "Event Hive",
    tagline: "Event discovery & booking — frontend built, backend planned",
    description:
      "An event discovery and booking platform. The frontend is substantially developed and covers browsing, categories, detail views, booking interfaces and dashboards. The backend — auth, persistence and payments — is deliberately not claimed and is the next build step.",
    fullDescription:
      "Event Hive is a full-stack-leaning project I'm building to learn how the pieces of a real product fit together: a polished React frontend today, with the API, database and auth story planned and still to be built. The frontend demonstrates real feature work (browsing, filters, detail pages, a multi-step booking interface, role-styled dashboards) against local data — no fake backend is presented as real.",
    problem:
      "Discovering local events is fragmented: calendars are scattered, booking flows are inconsistent, and event organizers lack a simple publish-and-manage surface. A single platform that does discovery + booking well is the gap I'm targeting.",
    targetUsers:
      "People looking for things to do near them (attendees), and event organizers who want a simple way to list events, publish seating or tickets, and see who booked.",
    implementationStatus:
      "Frontend: Implemented. Backend, database, auth and payments: Planned. Full-stack completion is not claimed anywhere.",
    keyFeatures: [
      "Event discovery & browsing with categories — Implemented (frontend)",
      "Event detail views with rich metadata — Implemented (frontend)",
      "Multi-step booking interfaces — Implemented (frontend)",
      "User & organizer dashboards — Implemented (frontend mock)",
      "Auth, database & booking persistence — Planned",
    ],
    technologies: ["react", "typescript", "tailwind", "vite", "node", "mongodb"],
    githubLink: "https://github.com/vive1singh/event-hive",
    liveLink: "",
    icon: "🎟️",
    explain: ["Event browsing", "Booking flow"],
    explainCards: { problem: [], execution: [], future: [] },
    status: "In progress",
    statusNote: "Frontend: Implemented. Backend: Planned.",
    engineeringDecisions: [
      {
        title: "Frontend-first scoping",
        detail:
          "Built the interactive frontend against local/mock data before any backend work, so the UX could be designed and validated first. This avoids blocking the UI on infrastructure that hasn't been built.",
      },
      {
        title: "Guardrails app: honestly label each layer",
        detail:
          "The app never claims a completed backend. Each feature carries an explicit Implemented / In progress / Planned label, so visitors can see exactly where the project really stands.",
      },
    ],
    challenges: [
      {
        title: "Coherent booking flow",
        detail:
          "Stringing search → detail → booking into one understandable flow inside a single-page app.",
        solution:
          "Modular, step-based booking components with clear state transitions, plus a dashboard to review what's been reserved.",
      },
      {
        title: "Designing around an absent backend",
        detail:
          "Every screen needs data, but there is no API yet.",
        solution:
          "Local mock data behind a thin integration layer — ready to be pointed at a real API without rewriting the UI.",
      },
    ],
    architecture: EVENT_HIVE_ARCH,
    roadmap: [
      "Auth & user accounts",
      "Database schema & API",
      "Real booking persistence",
      "Payments (if needed)",
    ],
    virtualFiles: [
      "overview.md",
      "architecture.md",
      "features.md",
      "challenges.md",
      "tech-stack.md",
      "roadmap.md",
    ],
    screenshots: [],
    githubLinkVerified: false,
  },
  {
    name: "Unified Cloud Storage Manager",
    tagline: "Planned — unified cloud storage with semantic search",
    description:
      "A planned full-stack concept: connect several cloud providers and offer unified file discovery, semantic search, storage analytics, duplicate detection and AI-assisted file operations. Currently a roadmap, not a shipped product.",
    fullDescription:
      "The idea is a single pane over Google Drive / Dropbox / OneDrive / etc.: one search box that can find any file across every provider, storage analytics telling you where space actually goes, duplicate detection, and embeddings + RAG for semantic (meaning-based) search over filenames and content. This is the continuous-learning capstone I'm designing before writing a single line.",
    problem:
      "Files are scattered across cloud providers, so 'where did I put that?' becomes a repeated search in five places. Storage is duplicated across accounts and nobody notices. Semantic search — being able to ask for files by meaning — is still hard with plain filename matching.",
    targetUsers:
      "Students, freelancers and small teams juggling multiple cloud accounts who want one way to find and manage files.",
    implementationStatus: "Planned — concept and technical roadmap only. No production implementation claimed.",
    keyFeatures: [
      "Unified file discovery across providers — Planned",
      "Semantic search via embeddings + RAG — Planned",
      "Storage analytics & duplicate detection — Planned",
      "AI-assisted file operations — Planned",
    ],
    technologies: ["react", "typescript", "tailwind", "postgresql"],
    githubLink: "",
    liveLink: "",
    icon: "☁️",
    explain: ["Cloud aggregation", "Semantic search"],
    explainCards: { problem: [], execution: [], future: [] },
    status: "Planned",
    statusNote: "Concept & roadmap only. No production implementation claimed.",
    engineeringDecisions: [
      {
        title: "Provider adapters over deep integrations",
        detail:
          "Design calls for a thin adapter layer per provider exposing list/download/upload/metadata — so providers can be added without touching the UI or search logic.",
      },
      {
        title: "Embeddings from the start",
        detail:
          "pgvector + embeddings chosen early so semantic search isn't bolted on later. RAG comes after the pipeline exists.",
      },
    ],
    challenges: [
      {
        title: "Provider API heterogeneity",
        detail:
          "Each cloud service exposes different auth, paging and file APIs.",
        solution:
          "One interface implemented per adapter, so the rest of the system never sees the provider differences (planned).",
      },
      {
        title: "Accurate semantic search",
        detail:
          "Meaning-based search over user files is easy to get wrong (recall, permission scoping, cost).",
        solution:
          "Start with metadata + embeddings and scope retrieval carefully; iterate against real files once providers are in.",
      },
    ],
    architecture: CLOUD_STORAGE_ARCH,
    roadmap: [
      "Provider OAuth & file listing",
      "Embeddings + pgvector",
      "RAG search",
      "Analytics & dedup",
    ],
    virtualFiles: ["concept.md", "architecture.md", "roadmap.md"],
    screenshots: [],
    githubLinkVerified: false,
  },
];

/** Constructs the Project-shaped objects the global stores consume. */
export const vivekProjectsAsProjects = (): Project[] =>
  vivekProjects.map(({ name, description, technologies, keyFeatures, githubLink, liveLink, tagline, icon, explain, explainCards }) => ({
    name,
    description,
    technologies,
    keyFeatures,
    githubLink,
    liveLink,
    tagline,
    icon,
    explain,
    explainCards,
  }));

export function findVivekProject(slugOrName: string): VivekProject | undefined {
  const q = slugOrName.toLowerCase();
  return vivekProjects.find(
    (p) =>
      p.name.toLowerCase() === q ||
      p.tagline?.toLowerCase().includes(q) ||
      q.includes(p.name.toLowerCase())
  );
}
