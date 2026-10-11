import { Command, Folder,List } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { vivekProjects } from "@/config/projects.vivek";
import { useSectionNav } from "@/hooks/use-editor-actions";

type ConsoleLine = {
  id: number;
  text: string;
  isCommand?: boolean;
};

const builtInHints: { cmd: string; note: string }[] = [
  { cmd: "help", note: "list commands" },
  { cmd: "projects", note: "go to projects" },
  { cmd: "skills", note: "go to skills" },
  { cmd: "about", note: "go to about" },
  { cmd: "contact", note: "go to contact" },
  { cmd: "open event-hive", note: "open Event Hive studio" },
  { cmd: "open cloud-storage", note: "open Cloud Storage studio" },
  { cmd: "journal", note: "open engineering journal" },
  { cmd: "help <command>", note: "command detail" },
  { cmd: "clear", note: "clear console" },
  { cmd: "ctrl+k", note: "command palette" },
];

/**
 * Engineering Console — safe, whitelisted commands only. This is a
 * portfolio console, never a real shell; no arbitrary commands or user
 * input are executed. Sample outputs are clearly static text.
 */
const EngineeringConsole: React.FC = () => {
  const { setActiveSection, openProject } = useSectionNav();
  const [lines, setLines] = useState<ConsoleLine[]>([
    { id: 1, text: "VIVEK.DEV engineering console — type help", isCommand: false },
  ]);
  const [input, setInput] = useState("");
  const idRef = useRef(2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const push = (text: string, isCommand?: boolean) => {
    setLines((prev) => [
      ...prev,
      { id: idRef.current++, text, isCommand },
    ]);
  };

  const handleRunCommand = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    push(`$ ${cmdText}`, true);
    if (cmd === "" || cmd === "help") {
      push(
        [
          "Commands:",
          ...builtInHints.map((h) => `  ${h.cmd.padEnd(18)}${h.note}`),
          "Tip: Ctrl+K opens the command palette.",
          "",
          "This console only understands the whitelisted commands above — it never executes arbitrary input.",
        ].join("\n")
      );
      return;
    }
    if (cmd === "clear") {
      setLines([{ id: idRef.current++, text: "VIVEK.DEV engineering console — type help", isCommand: false }]);
      setInput("");
      return;
    }
    if (cmd.startsWith("help ")) {
      const target = cmd.replace("help ", "").trim();
      const hint = builtInHints.find((h) => h.cmd.split(" ")[0] === target || h.cmd === target);
      if (hint) push(`${target}: ${hint.note}`);
      else push(`Unknown command: ${target}. Try 'help'.`);
      return;
    }
    if (cmd === "projects") {
      setActiveSection("projects");
      push("→ opening Projects");
      return;
    }
    if (cmd === "skills") {
      setActiveSection("skills");
      push("→ opening Skills");
      return;
    }
    if (cmd === "about") {
      setActiveSection("about");
      push("→ opening About");
      return;
    }
    if (cmd === "contact") {
      setActiveSection("contact");
      push("→ opening Contact");
      return;
    }
    if (cmd === "journal") {
      setActiveSection("learning");
      push("→ opening Engineering Journal");
      return;
    }
    if (cmd.startsWith("open ")) {
      const name = cmd.replace("open ", "").trim();
      const project = vivekProjects.find(
        (p) => p.name.toLowerCase().includes(name) || name.includes(p.name.toLowerCase())
      );
      if (project) {
        openProject(project);
        push(`→ opened ${project.name} (${project.status})`);
      } else {
        push(`Project '${name}' not found. Try: ${vivekProjects.map((p) => `open ${slugFrom(p.name)}`).join(" | ")}`);
      }
      return;
    }
    push(
      `Unknown command '${cmd}'. Type 'help' for the available commands.`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRunCommand(input);
      setInput("");
    }
  };

  return (
    <div className="border-t border-ctp-surface1/60 bg-ctp-crust/95 flex flex-col" style={{ maxHeight: "24rem" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-ctp-surface1/60">
        <div className="flex items-center gap-2 text-xs text-ctp-subtext0 font-mono">
          <Command className="w-3.5 h-3.5 text-ctp-blue" />
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="text-ctp-sapphire font-semibold">vivek</span>
            <span className="text-ctp-subtext0">@</span>
            <span className="text-ctp-green font-semibold">workspace</span>
            <span className="text-ctp-subtext0">:</span>
            <span className="text-ctp-mauve">~</span>
          </span>
        </div>
        <span className="text-[0.625rem] text-ctp-subtext0 hidden md:inline">
          portfolio console — safe commands only
        </span>
      </div>

      {/* Output */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs space-y-1 max-h-56">
        {lines.map((line) => (
          <pre key={line.id} className="whitespace-pre-wrap break-words font-mono leading-relaxed">
            <span className={line.isCommand ? "text-ctp-text" : "text-ctp-subtext1"}>{line.text}</span>
          </pre>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-2 border-t border-ctp-surface1/60">
        <span className="text-ctp-blue font-mono text-sm">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Engineering console input"
          placeholder="type 'help' for commands…"
          className="flex-1 bg-transparent outline-none font-mono text-xs text-ctp-text placeholder:text-ctp-subtext0"
        />
        {/* Quick action chips */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleRunCommand("projects")}
            className="px-2 py-1 rounded-md text-[0.625rem] bg-ctp-surface0/40 hover:bg-ctp-surface0/70 text-ctp-subtext0 hover:text-ctp-text flex items-center gap-1"
          >
            <Folder className="w-3 h-3" /> projects
          </button>
          <button
            onClick={() => handleRunCommand("journal")}
            className="px-2 py-1 rounded-md text-[0.625rem] bg-ctp-surface0/40 hover:bg-ctp-surface0/70 text-ctp-subtext0 hover:text-ctp-text flex items-center gap-1"
          >
            <List className="w-3 h-3" /> journal
          </button>
          <button
            onClick={() => handleRunCommand("clear")}
            className="px-2 py-1 rounded-md text-[0.625rem] bg-ctp-surface0/40 hover:bg-ctp-surface0/70 text-ctp-subtext0 hover:text-ctp-text"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
};

function slugFrom(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default EngineeringConsole;
