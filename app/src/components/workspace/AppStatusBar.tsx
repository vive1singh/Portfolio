import { FaGitAlt } from "react-icons/fa";

import { useActiveProjectId,useActiveSection } from "@/components/home/editor/context/editor-store";
import useSettingsStore from "@/store/settings-store";

/**
 * Workspace status bar — shows VIVEK.DEV identification, the active file
 * and a theme indicator. No fabricated git stats: without a configured
 * GitHub link the commit side stays empty rather than faking data.
 */
const WorkspaceStatusBar: React.FC = () => {
  const theme = useSettingsStore((s) => s.theme);
  const activeSection = useActiveSection();
  const activeProjectId = useActiveProjectId();

  const right = (
    <>
      <span className="hidden sm:inline">
        {activeProjectId ?? `${activeSection}.ts`}
      </span>
      <span className="mx-1 text-ctp-subtext0">|</span>
      <span className="uppercase">{theme}</span>
    </>
  );

  return (
    <footer className="flex items-center justify-between bg-ctp-base border-t border-ctp-surface0 px-3 md:px-4 h-7 text-[0.6875rem] text-ctp-subtext0 font-source flex-shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <FaGitAlt className="w-3 h-3 text-ctp-peach" />
        <span className="font-medium text-ctp-peach whitespace-nowrap">
          main
        </span>
        <span className="text-ctp-overlay1 hidden md:inline truncate">
          VIVEK.DEV — Software Engineering Workspace
        </span>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap">{right}</div>
    </footer>
  );
};

export default WorkspaceStatusBar;
