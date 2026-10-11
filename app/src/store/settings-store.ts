import { create } from "zustand";
import { persist } from "zustand/middleware";

/** The app ships two hand-tuned themes — cobalt (dark) and paper (light). */
export type ThemeId = "cobalt" | "paper";

interface SettingsState {
  gitBlameEnabled: boolean;
  toggleGitBlame: () => void;
  /** Previously "flavor"; now the active VIVEK.DEV theme id. */
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  /** @deprecated alias kept for any code still reading `flavor`. */
  flavor: ThemeId;
  setFlavor: (flavor: ThemeId) => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      gitBlameEnabled: true,
      toggleGitBlame: () => set({ gitBlameEnabled: !get().gitBlameEnabled }),
      theme: "cobalt",
      setTheme: (theme) => set({ theme }),
      flavor: "cobalt",
      setFlavor: (flavor) => set({ theme: flavor, flavor }),
      reducedMotion: false,
      toggleReducedMotion: () => set({ reducedMotion: !get().reducedMotion }),
    }),
    { name: "portfolio-settings" }
  )
);

export default useSettingsStore;
