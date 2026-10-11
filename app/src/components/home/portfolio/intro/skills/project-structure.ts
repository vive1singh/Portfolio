export type FileItem = {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  extension?: string;
  description?: string;
  color: string;
  delay: number;
  depth: number;
};

export const projectStructure: FileItem[] = [
  {
    name: "frontend",
    type: "folder",
    color: "text-ctp-blue",
    delay: 0,
    depth: 0,
    children: [
      {
        name: "components",
        type: "folder",
        color: "text-ctp-blue",
        delay: 200,
        depth: 1,
        children: [
          {
            name: "App.tsx",
            type: "file",
            extension: "tsx",
            color: "text-ctp-blue",
            delay: 400,
            depth: 2,
            description:
              "I build user interfaces with React & TypeScript",
          },
          {
            name: "Button.tsx",
            type: "file",
            extension: "tsx",
            color: "text-ctp-blue",
            delay: 500,
            depth: 2,
            description: "Reusable components with TypeScript for type safety",
          },
        ],
      },
      {
        name: "styles",
        type: "folder",
        color: "text-ctp-sapphire",
        delay: 300,
        depth: 1,
        children: [
          {
            name: "globals.css",
            type: "file",
            extension: "css",
            color: "text-ctp-sapphire",
            delay: 600,
            depth: 2,
            description: "Custom CSS for pixel-perfect designs",
          },
          {
            name: "tailwind.config.js",
            type: "file",
            extension: "js",
            color: "text-ctp-yellow",
            delay: 700,
            depth: 2,
            description: "I use Tailwind CSS for rapid UI development",
          },
        ],
      },
    ],
  },
  {
    name: "backend",
    type: "folder",
    color: "text-ctp-green",
    delay: 100,
    depth: 0,
    children: [
      {
        name: "server.js",
        type: "file",
        extension: "js",
        color: "text-ctp-green",
        delay: 800,
        depth: 1,
        description: "Node.js & Express REST APIs",
      },
      {
        name: "models",
        type: "folder",
        color: "text-ctp-mauve",
        delay: 850,
        depth: 1,
        children: [
          {
            name: "Event.js",
            type: "file",
            extension: "js",
            color: "text-ctp-mauve",
            delay: 860,
            depth: 2,
            description: "Mongoose schemas for MongoDB collections",
          },
        ],
      },
      {
        name: "routes",
        type: "folder",
        color: "text-ctp-teal",
        delay: 870,
        depth: 1,
        children: [
          {
            name: "events.js",
            type: "file",
            extension: "js",
            color: "text-ctp-teal",
            delay: 880,
            depth: 2,
            description: "Express route handlers for the Event Hive API",
          },
        ],
      },
    ],
  },
  {
    name: "tools",
    type: "folder",
    color: "text-ctp-peach",
    delay: 150,
    depth: 0,
    children: [
      {
        name: ".gitignore",
        type: "file",
        extension: "git",
        color: "text-ctp-red",
        delay: 1200,
        depth: 1,
        description:
          "I use Git and GitHub for version control and project history",
      },
    ],
  },
];
