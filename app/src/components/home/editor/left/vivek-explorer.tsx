import { SiTypescript } from "react-icons/si";
import { VscFolder, VscFolderOpened } from "react-icons/vsc";

import { Tree } from "@/components/ui/tree";
import { useSectionNav } from "@/hooks/use-editor-actions";

import type { SectionType } from "../context/editor-store";
import { useActiveSection } from "../context/editor-store";

const files: { name: string; section: SectionType }[] = [
  { name: "about.ts", section: "about" },
  { name: "skills.ts", section: "skills" },
  { name: "projects.ts", section: "projects" },
  { name: "journal.ts", section: "learning" },
  { name: "contact.ts", section: "contact" },
];

export default function VivekExplorer() {
  const active = useActiveSection();
  const { setActiveSection } = useSectionNav();
  return (
    <div className="w-64 shrink-0 border-r border-[rgb(var(--vivek-border))] bg-[rgb(var(--vivek-panel))] py-3 overflow-y-auto">
      <div className="px-3 text-[11px] tracking-widest font-bold opacity-60">EXPLORER</div>
      <Tree activeId={active} defaultExpanded={new Set(["vivek"])}>
        <Tree.Group id="vivek" label="VIVEK.DEV" depth={0} icon={<VscFolder className="w-3.5 h-3.5"/>} iconOpen={<VscFolderOpened className="w-3.5 h-3.5"/>} iconColor="text-[rgb(var(--vivek-accent))]">
          {files.map(f=>(
            <Tree.Item key={f.section} id={f.section} depth={1} label={f.name} icon={<SiTypescript className="w-3.5 h-3.5"/>} iconColor="text-[rgb(var(--vivek-accent))]" onClick={()=>setActiveSection(f.section)} />
          ))}
          <Tree.Group id="eh" label="Event-Hive" depth={1} icon={<VscFolder className="w-3 h-3"/>} iconOpen={<VscFolderOpened className="w-3 h-3"/>} iconColor="text-[rgb(var(--vivek-accent))]">
            <Tree.Item id="eh-overview" depth={2} label="overview.md" icon={<span>md</span>} onClick={()=>setActiveSection("projects")} />
            <Tree.Item id="eh-arch" depth={2} label="architecture.md" icon={<span>md</span>} onClick={()=>setActiveSection("projects")} />
            <Tree.Item id="eh-features" depth={2} label="features.md" icon={<span>md</span>} onClick={()=>setActiveSection("projects")} />
          </Tree.Group>
        </Tree.Group>
      </Tree>
    </div>
  );
}
