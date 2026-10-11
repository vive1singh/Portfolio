import React from "react";

import { useGitComponent } from "@/hooks/use-git-component";
import { cn } from "@/lib/utils";

const texts = [
  "BCA student focused on JavaScript and building real, useful web applications.",
  "I've built Event Hive's frontend with React, Tailwind and TypeScript, and I'm working through Node.js, Express and MongoDB to go full stack.",
  "I learn by solving real problems — making things that work and shipping them, one project at a time.",
];

const PersonalDescription: React.FC = () => {
  const ref = useGitComponent(PersonalDescription);

  return (
    <div
      ref={ref}
      className={cn(
        "mb-8 text-ctp-text p-6  bg-gradient-to-br from-ctp-mantle to-ctp-crust rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-2xl font-source"
      )}
    >
      {texts.map((text, index) => (
        <p
          key={text}
          className={`mb-4 leading-relaxed`}
          style={{
            textShadow: index === 0 ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
            animation: `fadeIn ${0.5 + index * 0.2}s ease-out`,
          }}
        >
          {text}
        </p>
      ))}
    </div>
  );
};

export default PersonalDescription;
