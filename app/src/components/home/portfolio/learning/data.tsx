import {
  Brain,
  Cloud,
  Code,
  Code2,
  Cpu,
  Database,
  Server,
} from "lucide-react";

import type { AppColor } from "@/lib/ctp-colors";
import type { TechnologyLearning } from "@/types";

/**
 * Learning focus areas (BCA coursework + self-study), not shipped products.
 * Repo links are opt-in; set one only when the repo actually exists.
 */
const LEARNING_REPO = {
  rag: "",
  db: "",
  mobile: "",
  interpreter: "",
  orchestrator: "",
  streaming: "",
  dsa: "",
  react: "",
  node: "",
};
const r = (key: keyof typeof LEARNING_REPO) =>
  LEARNING_REPO[key] || undefined;

export const currentLearningTechnologies: TechnologyLearning[] = [
  {
    name: "JavaScript & DSA",
    icon: <Code className="w-4 h-4" />,
    description:
      "Core language fundamentals and data structures & algorithms in JavaScript — my active focus for problem-solving and web development.",
    repoLink: r("dsa"),
    category: "Frontend",
    learningGoals: [
      "Solidify JavaScript fundamentals: closures, prototypes, async, event loop",
      "Practice common data structures and algorithms in JS",
      "Understand the DOM and browser APIs",
      "Apply patterns to real React components",
    ],
  },
  {
    name: "React & TypeScript",
    icon: <Code2 className="w-4 h-4" />,
    description:
      "Learning modern React (components, hooks, state, routing) and TypeScript to build the frontend — currently powering this very workspace.",
    repoLink: r("react"),
    category: "Frontend",
    learningGoals: [
      "Components, props, state and hooks",
      "React Router and client-side navigation",
      "TypeScript types and generics in React projects",
      "Vite + Tailwind tooling workflow",
    ],
  },
  {
    name: "Node.js & Express",
    icon: <Server className="w-4 h-4" />,
    description:
      "Backend fundamentals with Node.js and Express — building REST APIs and preparing for real data work in the Cloud Storage project.",
    repoLink: r("node"),
    category: "Backend",
    learningGoals: [
      "Modules, npm and the Node runtime",
      "Express routing and middleware",
      "REST API design basics",
      "Connecting to databases (PostgreSQL)",
    ],
  },
  {
    name: "Databases & SQL (for Cloud Storage)",
    icon: <Database className="w-4 h-4" />,
    description:
      "SQL and relational databases for the planned Cloud Storage Manager backend — how data is stored, indexed and queried.",
    repoLink: r("db"),
    category: "Database",
    learningGoals: [
      "SQL: queries, joins, transactions",
      "PostgreSQL setup and schema design",
      "Indexes and query performance",
      "Prisma/ORM basics",
    ],
  },
  {
    name: "Cloud Storage & RAG (Planned)",
    icon: <Brain className="w-4 h-4" />,
    description:
      "Planned learning for the Unified Cloud Storage Manager — embeddings, vector search and retrieval-augmented generation to make stored files searchable by meaning.",
    repoLink: r("rag"),
    category: "AI/ML",
    learningGoals: [
      "Embeddings and vector similarity",
      "pgvector + PostgreSQL for vector search",
      "RAG pipelines and chunking",
      "Semantic file search UX",
    ],
  },
  {
    name: "Deploy & Ship",
    icon: <Cloud className="w-4 h-4" />,
    description:
      "Deployment and tooling basics — git, Vercel, GitHub Pages, GitHub Actions — enough to ship and iterate on real projects.",
    repoLink: r("orchestrator"),
    category: "DevOps",
    learningGoals: [
      "Git workflow and PRs",
      "Deploying to Vercel / GitHub Pages",
      "Basic CI with GitHub Actions",
      "Environment variables and secrets",
    ],
  },
];

type Category = (typeof currentLearningTechnologies)[number]["category"];

export const categoryInfo: Record<
  Category,
  {
    icon: React.ReactNode;
    color: string;
    hoverColor: string;
    description: string;
    position: string;
  }
> = {
  Database: {
    icon: <Database className="w-full h-full p-2" />,
    color: "#89dceb", // Catppuccin blue
    hoverColor: "#96d0fd", // Catppuccin sapphire
    description: "Storage systems and query optimization",
    position: "top-8 left-1/4",
  },
  Backend: {
    icon: <Cpu className="w-full h-full p-2" />,
    color: "#ca9ee6", // Catppuccin mauve
    hoverColor: "#f4b8e4", // Catppuccin pink
    description: "Server-side development and APIs",
    position: "top-1/2 left-8 -translate-y-1/2",
  },
  Frontend: {
    icon: <Code className="w-full h-full p-2" />,
    color: "#e78284", // Catppuccin red
    hoverColor: "#ef9f76", // Catppuccin peach
    description: "User interfaces and experience design",
    position: "bottom-8 left-1/4",
  },
  DevOps: {
    icon: <Cloud className="w-full h-full p-2" />,
    color: "#81c8be", // Catppuccin teal
    hoverColor: "#a6d189", // Catppuccin green
    description: "Deployment and infrastructure automation",
    position: "bottom-8 right-1/4",
  },
  "AI/ML": {
    icon: <Cpu className="w-full h-full p-2" />,
    color: "#f4b8e4", // Catppuccin pink
    hoverColor: "#ca9ee6", // Catppuccin mauve
    description: "Machine learning and artificial intelligence",
    position: "top-1/2 right-8 -translate-y-1/2",
  },
};

export const learningJourneyItems: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: AppColor;
  gradient: string;
  accent: string;
}[] = [
  {
    title: "JavaScript & DSA",
    description:
      "Building a strong foundation in JavaScript — closures, async, the event loop — and practicing data structures & algorithms to think like an engineer.",
    icon: <Code className="w-5 h-5" />,
    color: "mauve",
    gradient: "from-ctp-mauve/20 to-ctp-lavender/20",
    accent: "border-ctp-mauve",
  },
  {
    title: "React & TypeScript",
    description:
      "Deepening React with TypeScript by building real interfaces — the project studio, architecture explorer and console here are all practice.",
    icon: <Code2 className="w-5 h-5" />,
    color: "blue",
    gradient: "from-ctp-blue/20 to-ctp-sapphire/20",
    accent: "border-ctp-blue",
  },
  {
    title: "Backend & Data",
    description:
      "Node.js, Express and SQL so my projects can carry real data — the Cloud Storage Manager's backend is the target for this track.",
    icon: <Server className="w-5 h-5" />,
    color: "green",
    gradient: "from-ctp-green/20 to-ctp-teal/20",
    accent: "border-ctp-green",
  },
  {
    title: "AI-Assisted Search (Planned)",
    description:
      "Embeddings, vector search and RAG — planned for semantic file search in the Unified Cloud Storage Manager.",
    icon: <Brain className="w-5 h-5" />,
    color: "peach",
    gradient: "from-ctp-peach/20 to-ctp-yellow/20",
    accent: "border-ctp-peach",
  },
];
