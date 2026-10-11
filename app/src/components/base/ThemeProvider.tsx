import { useEffect } from "react";

import useSettingsStore from "@/store/settings-store";

/**
 * Applies the active theme class to <html>. The settings store exposes two
 * themes — "cobalt" (dark, default) and "paper" (light) — mapped here onto
 * the `theme-*` classes that drive the --ctp-* design tokens in index.css.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSettingsStore((s) => s.theme);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-cobalt", "theme-paper");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => {
    window.document.documentElement.dataset.motion = reducedMotion
      ? "reduced"
      : "full";
  }, [reducedMotion]);

  return <>{children}</>;
}
