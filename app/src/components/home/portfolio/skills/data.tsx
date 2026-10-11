import {
  Code2,
  Database,
  Layers,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";
import { FaCss3, FaHtml5, FaNodeJs } from "react-icons/fa";
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import type { AppColor } from "@/lib/ctp-colors";

export const skillCategories = [
  {
    id: "languages",
    title: "Programming",
    icon: <Code2 className="w-5 h-5" />,
    color: "blue" as AppColor,
    description: "My primary programming language",
    skills: [
      { name: "JavaScript", icon: <SiJavascript className="w-5 h-5" />, color: "yellow" },
      { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" />, color: "blue" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: <Layers className="w-5 h-5" />,
    color: "sapphire" as AppColor,
    description: "What I build interfaces with",
    skills: [
      { name: "HTML5", icon: <FaHtml5 className="w-5 h-5" />, color: "peach" },
      { name: "CSS3", icon: <FaCss3 className="w-5 h-5" />, color: "sapphire" },
      { name: "JavaScript", icon: <SiJavascript className="w-5 h-5" />, color: "yellow" },
      { name: "React", icon: <SiReact className="w-5 h-5" />, color: "sapphire" },
      { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" />, color: "blue" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" />, color: "teal" },
    ],
  },
  {
    id: "backend",
    title: "Backend (Learning)",
    icon: <Server className="w-5 h-5" />,
    color: "green" as AppColor,
    description: "Server-side skills I'm actively learning",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="w-5 h-5" />, color: "green" },
      { name: "Express.js", icon: <SiExpress className="w-5 h-5" />, color: "text" },
      { name: "REST APIs", icon: <Server className="w-5 h-5" />, color: "teal" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: <Database className="w-5 h-5" />,
    color: "green" as AppColor,
    description: "My database stack",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="w-5 h-5" />, color: "green" },
      {
        name: "Mongoose",
        icon: <Database className="w-5 h-5" />,
        color: "mauve",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: <Wrench className="w-5 h-5" />,
    color: "peach" as AppColor,
    description: "Development workflow tools",
    skills: [
      { name: "Git", icon: <SiGit className="w-5 h-5" />, color: "red" },
      { name: "GitHub", icon: <SiGithub className="w-5 h-5" />, color: "text" },
      { name: "VS Code", icon: <VscVscode className="w-5 h-5" />, color: "blue" },
      { name: "Vite", icon: <SiVite className="w-5 h-5" />, color: "yellow" },
    ],
  },
  {
    id: "explore",
    title: "Exploring",
    icon: <Sparkles className="w-5 h-5" />,
    color: "pink" as AppColor,
    description: "Areas I'm exploring for future projects",
    skills: [
      { name: "AI APIs", icon: <Sparkles className="w-5 h-5" />, color: "pink" },
      { name: "RAG", icon: <Sparkles className="w-5 h-5" />, color: "mauve" },
      { name: "Semantic Search", icon: <Sparkles className="w-5 h-5" />, color: "lavender" },
      { name: "Embeddings", icon: <Sparkles className="w-5 h-5" />, color: "sapphire" },
    ],
  },
];

export const databases = ["MongoDB", "Mongoose"] as const;

export const tools = ["Git", "GitHub", "VS Code"] as const;

export const ai = [
  "AI APIs",
  "RAG",
  "Embeddings",
  "Semantic Search",
] as const;

export const languages = ["JavaScript", "TypeScript"] as const;

export const frameworks = [
  "React",
  "Tailwind CSS",
  "Express.js",
  "Node.js",
  "Vite",
] as const;
