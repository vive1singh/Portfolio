import type { SectionType } from "@/components/home/editor/context/editor-store";
import { useActiveSection } from "@/components/home/editor/context/editor-store";
import { useSectionNav } from "@/hooks/use-editor-actions";
import { cn } from "@/lib/utils";

const items: { id: SectionType; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certs" },
  { id: "learning", label: "Journal" },
  { id: "contact", label: "Contact" },
];

/**
 * Bottom navigation for phones/tablets — the workspace is fully operable
 * without the explorer sidebar or the console.
 */
const MobileNav: React.FC = () => {
  const active = useActiveSection();
  const { setActiveSection } = useSectionNav();

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 flex border-t border-ctp-surface1 bg-ctp-panel overflow-x-auto"
    >
      {items.map((i) => (
        <button
          key={i.id}
          onClick={() => setActiveSection(i.id)}
          className={cn(
            "flex-1 py-3 text-xs font-medium transition-colors whitespace-nowrap",
            active === i.id
              ? "text-ctp-text bg-ctp-surface0"
              : "text-ctp-subtext0 hover:text-ctp-subtext1"
          )}
        >
          {i.label}
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
