import React from "react";

import { siteConfig } from "@/config/site";

interface BasicPortfolioProps {
  layoutBroken: boolean;
}

/**
 * BasicPortfolio Component
 *
 * This component displays a basic portfolio layout with information about the developer, their skills, projects, and contact details.
 * It includes a conditional class for layout breaking, which can be used to dynamically change the layout based on certain conditions.
 *
 * Props:
 * - layoutBroken: A boolean indicating whether the layout should be broken or not.
 *
 * The component includes the following sections:
 * - A personal section with a photo, name, and profession.
 * - An about section with a brief description.
 * - A skills section listing the developer's skills.
 * - A projects section with brief descriptions of three projects.
 * - A contact section with email (absent until configured).
 *
 * This component is designed to provide a simple and easy-to-use interface for displaying a developer's portfolio.
 */
const BasicPortfolio: React.FC<BasicPortfolioProps> = ({ layoutBroken }) => {
  const email = siteConfig.links.email;
  return (
    <div
      className={`relative z-10 max-w-4xl mx-auto transition-transform duration-300 ${
        layoutBroken ? "layout-broken" : ""
      }`}
    >
      <img
        src="personal.webp"
        alt={siteConfig.name}
        className="w-20 h-20 rounded-lg mb-5"
      />
      <h1 className="text-2xl font-serif">{siteConfig.name}</h1>
      <p className="text-base font-serif">{siteConfig.role}</p>

      <hr className="my-4" />

      <h2 className="text-xl font-serif mt-5 font-bold">About Me</h2>
      <p className="text-base font-serif mb-3">
        {siteConfig.description}
      </p>

      <h2 className="text-xl font-serif mt-5 font-bold">Skills</h2>
      <ul className="list-disc ml-6 mb-3">
        <li className="mb-1">JavaScript</li>
        <li className="mb-1">React</li>
        <li className="mb-1">TypeScript</li>
        <li className="mb-1">Node.js</li>
      </ul>

      <h2 className="text-xl font-serif mt-5 font-bold">Projects</h2>

      {/* Broken images section */}
      <div className="project-section">
        <h3 className="text-lg font-serif mt-4 font-bold">Event Hive</h3>
        <p className="text-base font-serif mb-2">
          Event discovery &amp; booking — frontend implemented, backend in progress.
        </p>

        <h3 className="text-lg font-serif mt-4 font-bold">Cloud Storage Manager</h3>
        <p className="text-base font-serif mb-2">
          Unified cloud storage — planned (roadmap in progress).
        </p>
      </div>

      <h2 className="text-xl font-serif mt-5 font-bold">Contact Me 😊</h2>
      {email ? (
        <p className="text-base font-serif mb-3">Email: {email}</p>
      ) : (
        <p className="text-base font-serif mb-3">
          Email: set in src/config/site.ts
        </p>
      )}
    </div>
  );
};

export default BasicPortfolio;
