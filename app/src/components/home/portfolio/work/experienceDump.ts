import type { WorkExperience } from "@/types";

/**
 * Work experience — no invented employers. This stays as a self-descriptive
 * self-directed project timeline. Replace with real roles as they happen.
 */
export const experiences: WorkExperience[] = [
  {
    company: "VIVEK.DEV — Personal Portfolio",
    position: "Student Developer (BCA)",
    duration: "Current",
    imageSrc: "/vivek-dev.svg",
    achievements: [
      {
        title: "This workspace portfolio",
        description: [
          "This VS Code-style software engineering workspace — the one you're looking at now",
          "React, TypeScript and a real editor-style UI built as my own design",
          "Projects are labelled Implemented / In progress / Planned honestly",
        ],
        icon: "FaCode",
      },
      {
        title: "Learning full-stack development",
        description: [
          "JavaScript, React and TypeScript for the frontend",
          "Node.js, Express and SQL as the next step",
        ],
        icon: "FaCode",
      },
    ],
    technologies: ["react", "typescript", "node", "tailwind"],
    companyUrl: "",
    docsUrl: "",
  },
];
