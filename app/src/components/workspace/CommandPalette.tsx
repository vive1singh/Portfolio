import { Command, Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { vivekProjects } from "@/config/projects.vivek";
import { useSectionNav } from "@/hooks/use-editor-actions";
import { cn } from "@/lib/utils";
import useSettingsStore from "@/store/settings-store";
import type { Project } from "@/types";

type PaletteItem = {
  id: string;
  label: string;
  hint?: string;
  keywords: string;
  kind: "section" | "project" | "theme";
  icon?: React.ReactNode;
  run: () => void;
};

const projectItems = (
  openProject: (p: Project) => void
): PaletteItem[] =>
  vivekProjects.map((p) => ({
    id: `project-${p.name}`,
    label: `Open ${p.name}`,
    hint: "project",
    keywords: `${p.name} ${p.tagline ?? ""} ${p.status}`.toLowerCase(),
    kind: "project",
    icon: <span className="text-sm leading-none">{p.icon ?? "🗂️"}</span>,
    run: () => openProject(p),
  }));

/**
 * Command palette — Ctrl/Cmd+K.
 *
 * Searches sections, projects, journal and themes; navigates everything
 * through the editor's router-aware actions. Keyboard-first, Escape to
 * close, arrow-key navigation, clear empty state, accessible dialog.
 */
const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { setActiveSection, openProject } = useSectionNav();
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const items = useMemo<PaletteItem[]>(
    () => [
      {
        id: "go-projects",
        label: "Go to Projects",
        hint: "section",
        keywords: "projects event-hive cloud storage",
        kind: "section",
        icon: <Command className="w-4 h-4" />,
        run: () => setActiveSection("projects"),
      },
      {
        id: "go-about",
        label: "Go to About",
        hint: "section",
        keywords: "about info bio",
        kind: "section",
        icon: <Command className="w-4 h-4" />,
        run: () => setActiveSection("about"),
      },
      {
        id: "go-skills",
        label: "Go to Skills",
        hint: "section",
        keywords: "skills tech stack",
        kind: "section",
        run: () => setActiveSection("skills"),
      },
      {
        id: "go-certificates",
        label: "Go to Certificates",
        hint: "section",
        keywords: "certificates certifications credentials",
        kind: "section",
        run: () => setActiveSection("certificates"),
      },
      {
        id: "go-learning",
        label: "Engineering Journal",
        hint: "section",
        keywords: "journal learning blog log milestones",
        kind: "section",
        run: () => setActiveSection("learning"),
      },
      {
        id: "go-contact",
        label: "Go to Contact",
        hint: "section",
        keywords: "contact email social links",
        kind: "section",
        run: () => setActiveSection("contact"),
      },
      {
        id: "go-resume",
        label: "Resume",
        hint: "section",
        keywords: "resume cv pdf",
        kind: "section",
        run: () => setActiveSection("resume"),
      },
      {
        id: "go-home",
        label: "Go to Home",
        hint: "section",
        keywords: "home intro start",
        kind: "section",
        run: () => setActiveSection("home"),
      },
      ...projectItems(openProject),
      {
        id: "theme-cobalt",
        label: `Theme: Cobalt (${theme === "cobalt" ? "active" : "switch"})`,
        hint: "theme",
        keywords: "theme dark cobalt",
        kind: "theme",
        icon: <Moon className="w-4 h-4" />,
        run: () => setTheme("cobalt"),
      },
      {
        id: "theme-paper",
        label: `Theme: Paper (${theme === "paper" ? "active" : "switch"})`,
        hint: "theme",
        keywords: "theme light paper",
        kind: "theme",
        icon: <Sun className="w-4 h-4" />,
        run: () => setTheme("paper"),
      },
    ],
    [setActiveSection, openProject, theme, setTheme]
  );

  const filtered = items.filter((i) =>
    i.keywords.concat(" ", i.label).toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActiveIndex(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Reset index whenever the filtered list or query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  // Keep the active row visible in the list
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-active="true"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  const runItem = (item: PaletteItem) => {
    item.run();
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      runItem(filtered[activeIndex]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[10vh] md:pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-[min(600px,92vw)] rounded-2xl overflow-hidden shadow-2xl border border-ctp-border bg-ctp-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-ctp-surface1/60">
          <Command className="w-4 h-4 text-ctp-blue" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Search commands"
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent outline-none text-sm text-ctp-text placeholder:text-ctp-subtext0"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-ctp-surface0 text-ctp-subtext0 text-[0.625rem] font-mono">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-72 overflow-y-auto p-2 space-y-0.5">
          {filtered.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-ctp-subtext0">
              No commands found for “{query}”.
            </div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.id}
                data-active={i === activeIndex || undefined}
                onClick={() => runItem(item)}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  i === activeIndex
                    ? "bg-ctp-surface0 text-ctp-text"
                    : "text-ctp-subtext1"
                )}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className="flex-shrink-0 w-4 flex justify-center text-ctp-subtext0">
                    {item.icon ?? null}
                  </span>
                  <span className="truncate">{item.label}</span>
                </span>
                <span className="flex-shrink-0 text-[0.625rem] uppercase tracking-wider text-ctp-subtext0">
                  {item.hint}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-ctp-surface1/60 text-[0.625rem] text-ctp-subtext0">
          <span>VIVEK.DEV command palette</span>
          <span className="font-mono">
            ↑↓ navigate · enter select · esc close
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
