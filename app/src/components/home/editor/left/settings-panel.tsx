import React from "react";
import {
  VscCheck,
  VscGitCommit,
  VscPulse,
  VscSettingsGear,
} from "react-icons/vsc";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GhostButton from "@/components/ui/ghost-button";
import { Switch } from "@/components/ui/switch";
import type { ThemeId } from "@/store/settings-store";
import useSettingsStore from "@/store/settings-store";

const THEMES: {
  id: ThemeId;
  label: string;
  swatches: string[];
}[] = [
  {
    id: "cobalt",
    label: "Cobalt",
    swatches: ["#2864FF", "#63C79A", "#FFB86B", "#F5AA9A", "#0f1520"],
  },
  {
    id: "paper",
    label: "Paper",
    swatches: ["#1E54FF", "#2E8B57", "#D97706", "#B93B4F", "#faf7f2"],
  },
];

const SettingsPanel: React.FC = () => {
  const {
    gitBlameEnabled,
    toggleGitBlame,
    theme,
    setTheme,
    reducedMotion,
    toggleReducedMotion,
  } = useSettingsStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <GhostButton
            icon={<VscSettingsGear className="w-5 h-5 text-ctp-overlay1" />}
            label="Settings"
            onClick={() => {}}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        className="w-60 bg-ctp-surface0 border-ctp-surface2 text-ctp-text font-source"
      >
        <DropdownMenuLabel className="text-ctp-subtext0 text-xs uppercase tracking-widest">
          Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-ctp-surface2" />

        {/* Git Blame toggle */}
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2 text-sm">
            <VscGitCommit className="w-3.5 h-3.5 text-ctp-green flex-shrink-0" />
            <span>Git Blame</span>
          </div>
          <Switch
            checked={gitBlameEnabled}
            onCheckedChange={toggleGitBlame}
            className="data-[state=checked]:bg-ctp-green data-[state=unchecked]:bg-ctp-surface2"
          />
        </div>

        {/* Reduce motion toggle */}
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2 text-sm">
            <VscPulse className="w-3.5 h-3.5 text-ctp-mauve flex-shrink-0" />
            <span>Reduce Motion</span>
          </div>
          <Switch
            checked={reducedMotion}
            onCheckedChange={toggleReducedMotion}
            className="data-[state=checked]:bg-ctp-mauve data-[state=unchecked]:bg-ctp-surface2"
          />
        </div>

        <DropdownMenuSeparator className="bg-ctp-surface2" />
        <DropdownMenuLabel className="text-ctp-subtext0 text-xs uppercase tracking-widest">
          Theme
        </DropdownMenuLabel>

        {/* Theme picker */}
        <div className="px-2 py-1 space-y-1">
          {THEMES.map((f) => (
            <button
              key={f.id}
              onClick={() => setTheme(f.id)}
              className="w-full flex items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-ctp-surface1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {f.swatches.map((color) => (
                    <span
                      key={color}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span>{f.label}</span>
              </div>
              {theme === f.id && (
                <VscCheck className="w-3.5 h-3.5 text-ctp-green flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsPanel;
