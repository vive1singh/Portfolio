import { Box, GitBranch, Server, Workflow } from "lucide-react";
import { useState } from "react";

import type { ArchitectureNode, VivekProject } from "@/config/projects.vivek";
import { STATUS_META } from "@/config/projects.vivek";
import { cn } from "@/lib/utils";

/**
 * Interactive architecture explorer.
 *
 * Renders the project's frontend and backend pipelines as linked nodes.
 * Clicking a node reveals its responsibility, current status, the planned
 * technology and — when available — the source files that back the claim.
 * Only nodes the source code proves are marked Implemented.
 */
const ArchitectureExplorer: React.FC<{ project: VivekProject }> = ({
  project,
}) => {
  const nodes: ArchitectureNode[] = [
    ...(project.architecture?.frontend ?? []),
    ...(project.architecture?.backend ?? []),
  ];
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");
  if (!nodes.length) return null;

  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];

  const selectNode = (node: ArchitectureNode) => {
    setActiveId(node.id);
  };

  return (
    <div className="border border-ctp-surface1/60 rounded-2xl overflow-hidden bg-ctp-surface0/10">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ctp-surface1/60">
        <Workflow className="w-4 h-4 text-ctp-blue" />
        <span className="text-sm font-semibold text-ctp-text font-source">
          Architecture — {project.name}
        </span>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        {/* ── Frontend chain ─────────────────────────────────────────── */}
        {project.architecture?.frontend?.length ? (
          <PipelineRow
            title="Frontend"
            note="Implemented on this site — click a node"
            nodes={project.architecture.frontend}
            activeId={activeId}
            onSelect={selectNode}
          />
        ) : null}
        {project.architecture?.backend?.length ? (
          <PipelineRow
            title="Backend / Data"
            note="Planned — shown as intent, not as built"
            nodes={project.architecture.backend}
            activeId={activeId}
            onSelect={selectNode}
          />
        ) : null}
      </div>

      {/* ── Detail panel ─────────────────────────────────────────────── */}
      <div className="px-4 md:px-6 pb-5">
        <div className="rounded-xl border border-ctp-surface1/60 bg-ctp-panel p-4 md:p-5 space-y-3 font-source">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-ctp-text">
              {active.label}
            </span>
            <span
              className={cn(
                "text-[0.625rem] px-2 py-0.5 rounded-full border font-medium",
                STATUS_META[active.status].chip
              )}
            >
              {active.status}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-ctp-subtext1">
            {active.responsibility}
          </p>
          <div className="flex items-start gap-2 text-xs text-ctp-subtext0">
            <Server className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-ctp-sapphire" />
            <span>{active.tech}</span>
          </div>
          {active.source && (
            <div className="flex items-start gap-2 text-xs text-ctp-subtext0">
              <GitBranch className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-ctp-mauve" />
              <span>{active.source}</span>
            </div>
          )}
          {active.next?.length ? (
            <div className="flex items-center gap-1.5 flex-wrap text-xs text-ctp-subtext0">
              <Box className="w-3.5 h-3.5 text-ctp-blue" />
              <span className="mr-1">Feeds into:</span>
              {active.next.map((n) => {
                const target = nodes.find((x) => x.id === n);
                return target ? (
                  <button
                    key={n}
                    onClick={() => selectNode(target)}
                    className="px-2 py-0.5 rounded-md bg-ctp-surface1/40 hover:bg-ctp-surface1/70 text-ctp-blue"
                  >
                    {target.label}
                  </button>
                ) : null;
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const PipelineRow: React.FC<{
  title: string;
  note: string;
  nodes: ArchitectureNode[];
  activeId: string;
  onSelect: (node: ArchitectureNode) => void;
}> = ({ title, note, nodes, activeId, onSelect }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-ctp-subtext0">
        {title}
      </span>
      <span className="text-[0.625rem] text-ctp-subtext0">{note}</span>
    </div>
    <div className="flex flex-col lg:flex-row gap-2 lg:items-stretch">
      {nodes.map((n, i) => (
        <div key={n.id} className="flex flex-col lg:flex-row flex-1 items-stretch">
          <button
            onClick={() => onSelect(n)}
            className={cn(
              "flex-1 text-left rounded-xl border px-3 py-3 transition-colors",
              activeId === n.id
                ? "border-ctp-blue/60 bg-ctp-surface0/60"
                : "border-ctp-surface1/60 bg-transparent hover:bg-ctp-surface0/40"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-ctp-text">
                {n.label}
              </span>
              <span className="flex-shrink-0 flex items-center gap-1.5 text-[0.625rem] text-ctp-subtext0">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    STATUS_META[n.status].dot
                  )}
                />
                {n.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-ctp-subtext0 leading-relaxed line-clamp-2">
              {n.responsibility}
            </p>
          </button>
          {i < nodes.length - 1 && (
            <div className="flex items-center justify-center py-1 lg:px-1 lg:py-0" aria-hidden="true">
              <span className="text-ctp-border lg:rotate-0 rotate-90">→</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ArchitectureExplorer;
