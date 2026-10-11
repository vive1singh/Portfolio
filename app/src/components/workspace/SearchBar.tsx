import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { VivekProject } from "@/config/projects.vivek";
import { vivekProjects } from "@/config/projects.vivek";
import { useSectionNav } from "@/hooks/use-editor-actions";
import { cn } from "@/lib/utils";

import { journalEntries } from "./journal-data";

type SearchResult = {
  id: string;
  title: string;
  meta: string;
  kind: "project" | "journal" | "skill";
  run: () => void;
};

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const { openProject, setActiveSection } = useSectionNav();

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const out: SearchResult[] = [];

    for (const p of vivekProjects as VivekProject[]) {
      if (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tagline ?? "").toLowerCase().includes(q)
      ) {
        out.push({
          id: `p-${p.name}`,
          title: p.name,
          meta: `${p.status} · ${p.tagline ?? ""}`,
          kind: "project",
          run: () => openProject(p),
        });
      }
    }

    for (const e of journalEntries) {
      if (
        e.title.toLowerCase().includes(q) ||
        e.body.toLowerCase().includes(q)
      ) {
        out.push({
          id: `j-${e.id}`,
          title: e.title,
          meta: `Journal · ${e.date}`,
          kind: "journal",
          run: () => setActiveSection("learning"),
        });
      }
    }

    return out.slice(0, 8);
  }, [query, openProject, setActiveSection]);

  return (
    <div className="px-3 pb-2 relative">
      <div className="flex items-center gap-2 rounded-lg border border-ctp-surface1/60 bg-ctp-surface0/40 px-2.5 py-1.5">
        <Search className="w-3.5 h-3.5 text-ctp-subtext0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, journal…"
          aria-label="Search projects and journal"
          className="flex-1 bg-transparent text-xs text-ctp-text outline-none placeholder:text-ctp-subtext0"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="text-ctp-subtext0 hover:text-ctp-text text-xs"
          >
            ×
          </button>
        )}
      </div>

      {query && (
        <div className="absolute left-3 right-3 top-full mt-1 rounded-xl border border-ctp-border bg-ctp-panel shadow-2xl overflow-hidden z-30">
          {results.length === 0 ? (
            <div className="px-3 py-3 text-xs text-ctp-subtext0">
              No results for “{query}”
            </div>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                onClick={r.run}
                className={cn(
                  "w-full text-left px-3 py-2 hover:bg-ctp-surface0/60 transition-colors",
                  "flex items-center justify-between gap-2"
                )}
              >
                <span className="truncate text-xs text-ctp-text">{r.title}</span>
                <span className="text-[0.625rem] text-ctp-subtext0 truncate">
                  {r.meta}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
