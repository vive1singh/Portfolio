import { PanelLeft } from "lucide-react";
import React from "react";

import Logo from "@/components/home/appbar/Logo";
import { useEditorStore } from "@/components/home/editor/context/editor-store";
import { Button } from "@/components/ui/button";
import { useEditorToggles } from "@/hooks/use-editor-actions";
import { cn } from "@/lib/utils";

interface MobileEditorDropdownProps {}

const MobileEditorDropdown: React.FC<MobileEditorDropdownProps> = () => {
  const { setMobileMenuOpen } = useEditorToggles();
  const mobileMenuOpen = useEditorStore((s) => s.mobileMenuOpen);

  return (
    <div className="flex items-center justify-between px-4 h-12 w-full bg-gradient-to-r from-ctp-base via-ctp-mantle to-ctp-base border-b border-ctp-surface0/50">
      <div className="flex items-center gap-2">
        {/* Toggle the VS Code-style activity bar + explorer panels */}
        <Button
          variant="ghost"
          size="icon"
          aria-label={mobileMenuOpen ? "Close side panels" : "Open side panels"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "h-9 w-9 rounded-lg transition-all duration-200 shadow-sm",
            mobileMenuOpen
              ? "bg-ctp-surface1/60 text-ctp-text border border-ctp-surface1/50"
              : "bg-gradient-to-br from-ctp-surface0/40 to-ctp-surface1/20 hover:from-ctp-surface1/60 hover:to-ctp-surface2/30 border border-ctp-surface0/30"
          )}
        >
          <PanelLeft className="h-4 w-4 text-ctp-text" />
        </Button>
        <Logo />
      </div>
    </div>
  );
};

export default MobileEditorDropdown;
