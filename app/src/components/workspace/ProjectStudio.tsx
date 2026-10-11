import { ArrowLeft, GitPullRequest } from "lucide-react";
import React, { useState } from "react";

import type { VivekProject } from "@/config/projects.vivek";
import { cn } from "@/lib/utils";

import ArchitectureExplorer from "./ArchitectureExplorer";
import { StatusBadge } from "./StatusBadge";

/** Virtual docs a project exposes in the workspace — backed by real data. */
export const PROJECT_VIEWS = [
  "overview",
  "architecture",
  "features",
  "challenges",
  "tech-stack",
  "roadmap",
] as const;
export type ProjectView = (typeof PROJECT_VIEWS)[number];

const viewLabel: Record<ProjectView, string> = {
  overview: "overview",
  architecture: "architecture",
  features: "features",
  challenges: "challenges",
  "tech-stack": "tech-stack",
  roadmap: "roadmap",
};

const ProjectStudio: React.FC<{ project: VivekProject | null }> = ({
  project,
}) => {
  const [view, setView] = useState<ProjectView>("overview");

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center text-ctp-subtext0 font-source">
        <span className="text-4xl">🗂️</span>
        <p className="text-sm">Select a project to open the studio.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* Virtual file tabs */}
      <div
        role="tablist"
        aria-label={`${project.name} documents`}
        className="flex flex-wrap gap-1.5 mb-5"
      >
        {PROJECT_VIEWS.map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs border font-source transition-colors",
              "flex items-center gap-1.5",
              view === v
                ? "bg-ctp-surface0 text-ctp-text border-ctp-border"
                : "text-ctp-subtext0 border-transparent hover:bg-ctp-surface0/50 hover:text-ctp-text"
            )}
          >
            <span className={view === v ? "text-ctp-blue" : "text-ctp-subtext0"}>
              ▸
            </span>
            {viewLabel[v]}.md
          </button>
        ))}
      </div>

      {view === "overview" && <OverviewView project={project} />}
      {view === "architecture" && (
        <div className="studio-panel">
          <ArchitectureExplorer project={project} />
        </div>
      )}
      {view === "features" && <FeaturesView project={project} />}
      {view === "challenges" && <ChallengesView project={project} />}
      {view === "tech-stack" && <TechStackView project={project} />}
      {view === "roadmap" && <RoadmapView project={project} />}
    </div>
  );
};

const OverviewView: React.FC<{ project: VivekProject }> = ({ project }) => (
  <div className="space-y-5 font-source">
    <div className="space-y-3">
      <StatusBadge status={project.status} />
      <h1 className="text-2xl md:text-3xl font-semibold text-ctp-text">
        {project.name}
        <span className="sr-only"></span>
      </h1>
      <p className="text-sm text-ctp-subtext1">{project.tagline}</p>
    </div>

    <p className="text-sm leading-relaxed text-ctp-subtext1">
      {project.fullDescription ?? project.description}
    </p>

    {project.screenshots?.length ? (
      <div>
        <h2 className="text-sm font-semibold text-ctp-text mb-3">
          Preview
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {project.screenshots.map((s) => (
            <figure
              key={s.name}
              className="rounded-xl overflow-hidden border border-ctp-surface1/60"
            >
              <img
                src={s.src}
                alt={s.caption}
                loading="lazy"
                className="w-full object-cover"
              />
              <figcaption className="px-3 py-2 text-xs text-ctp-subtext0">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    ) : null}

    <div className="grid md:grid-cols-2 gap-3">
      {project.problem ? (
        <Block title="Problem being addressed">{project.problem}</Block>
      ) : null}
      {project.targetUsers ? (
        <Block title="Target users">{project.targetUsers}</Block>
      ) : null}
    </div>
    {project.implementationStatus ? (
      <Block title="Implementation status">{project.implementationStatus}</Block>
    ) : null}
  </div>
);

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="rounded-xl border border-ctp-surface1/60 bg-ctp-panel p-4">
    <h2 className="text-xs font-bold uppercase tracking-widest text-ctp-subtext0 mb-2">
      {title}
    </h2>
    <p className="text-sm leading-relaxed text-ctp-subtext1">{children}</p>
  </div>
);

const FeaturesView: React.FC<{ project: VivekProject }> = ({ project }) => (
  <div className="font-source">
    <h2 className="text-sm font-semibold text-ctp-text mb-1">
      Key Features
    </h2>
    <p className="text-xs text-ctp-subtext0 mb-4">
      Each line is labelled so the implemented frontend is never confused with
      planned backend work.
    </p>
    <ul className="space-y-2">
      {(project.keyFeatures ?? []).map((f) => (
        <li
          key={f}
          className="rounded-lg border border-ctp-surface1/60 bg-ctp-panel px-4 py-3 text-sm text-ctp-subtext1 leading-relaxed"
        >
          {f}
        </li>
      ))}
    </ul>
  </div>
);

const ChallengesView: React.FC<{ project: VivekProject }> = ({
  project,
}) => (
  <div className="rounded-2xl overflow-hidden bg-ctp-panel border border-ctp-surface1/60">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-ctp-surface1/60">
      <GitPullRequest className="w-4 h-4 text-ctp-yellow" />
      <span className="text-sm font-semibold text-ctp-text font-source">
        Challenges & Engineering Decisions
      </span>
    </div>
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-ctp-subtext0 mb-3">
          Challenges
        </h3>
        {(project.challenges ?? []).map((c) => (
          <div key={c.title} className="mb-4 last:mb-0">
            <p className="text-sm font-medium text-ctp-text">{c.title}</p>
            <p className="text-sm text-ctp-subtext1 mt-1 leading-relaxed">
              {c.detail}
            </p>
            {c.solution && (
              <p className="text-sm text-ctp-green mt-1 leading-relaxed">
                <span className="font-medium">Solution: </span>
                {c.solution}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-ctp-surface1/60 pt-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-ctp-subtext0 mb-3">
          Decisions
        </h3>
        {(project.engineeringDecisions ?? []).map((d) => (
          <div key={d.title} className="mb-4 last:mb-0">
            <p className="text-sm font-medium text-ctp-text">{d.title}</p>
            <p className="text-sm text-ctp-subtext1 mt-1 leading-relaxed">
              {d.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TechStackView: React.FC<{ project: VivekProject }> = ({ project }) => (
  <div className="font-source">
    <h2 className="text-sm font-semibold text-ctp-text mb-1">Tech Stack</h2>
    <p className="text-xs text-ctp-subtext0 mb-4">
      Technologies already in use vs. planned.
    </p>
    <div className="flex flex-wrap gap-2">
      {project.technologies.map((t) => (
        <span
          key={t}
          className="px-3 py-1.5 rounded-lg text-sm bg-ctp-surface0/40 border border-ctp-surface1/60 text-ctp-subtext1 font-mono"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const RoadmapView: React.FC<{ project: VivekProject }> = ({ project }) => (
  <div className="rounded-2xl overflow-hidden bg-ctp-panel border border-ctp-surface1/60">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-ctp-surface1/60">
      <ArrowLeft className="w-4 h-4 text-ctp-mauve" />
      <span className="text-sm font-semibold text-ctp-text font-source">
        Roadmap — {project.name}
      </span>
    </div>
    <ol className="divide-y divide-ctp-surface1/60">
      {(project.roadmap ?? []).map((step, i) => (
        <li key={step} className="flex items-start gap-3 px-4 py-3">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-ctp-surface0 text-ctp-subtext0 text-[0.625rem] font-mono flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <span className="text-sm text-ctp-subtext1 leading-relaxed">
            {step}
          </span>
        </li>
      ))}
    </ol>
  </div>
);

export default ProjectStudio;
