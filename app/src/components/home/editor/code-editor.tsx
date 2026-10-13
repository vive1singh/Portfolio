import React, { lazy } from "react";

import {
  type SectionType,
  useEditorStore,
} from "@/components/home/editor/context/editor-store";
import {
  CommandPalette,
  EngineeringConsole,
  MobileNav,
  WorkspaceStatusBar,
} from "@/components/workspace";
import { useEditorToggles } from "@/hooks/use-editor-actions";
import useMobile from "@/hooks/use-mobile";

import EditorBreadcrumbs from "./breadcrumbs/editor-breadcrumbs";
import CodeContent from "./code-content";
import { useEditorSync } from "./context/use-editor-sync";
import GitBlameManager from "./git-blame/git-blame-manager";
import Explorer from "./left/editor-explorer";
import SideBar from "./left/side-bar";
import MobileSwipeHint from "./mobile-swipe-hint";
import EditorTabs from "./tabs/editor-tabs";

const sectionComponents: Record<
  SectionType,
  React.LazyExoticComponent<React.ComponentType>
> = {
  home: lazy(() => import("@/components/home/portfolio/intro/personal-intro")),
  about: lazy(() => import("@/components/home/portfolio/about/about-me")),
  skills: lazy(
    () => import("@/components/home/portfolio/skills/skills-section")
  ),
  projects: lazy(
    () => import("@/components/home/portfolio/projects/projects-section")
  ),
  certificates: lazy(
    () => import("@/components/home/portfolio/certificates/certificates-section")
  ),
  experience: lazy(
    () => import("@/components/home/portfolio/work/work-experience")
  ),
  contact: lazy(() => import("@/components/home/portfolio/contact/contact-me")),
  learning: lazy(
    () => import("@/components/home/portfolio/learning/learning-section")
  ),
  articles: lazy(
    () => import("@/components/home/portfolio/articles/articles-section")
  ),
  resume: lazy(
    () => import("@/components/home/portfolio/resume/resume-section")
  ),
};

/**
 * CodeEditor component represents the main editor interface of the application
 * It manages the layout and interactions between the sidebar, explorer, tabs, and content areas
 * Uses lazy loading for content components to improve performance
 * Implements responsive design for mobile optimization
 */
const CodeEditor: React.FC = () => {
  useEditorSync();
  const explorerOpen = useEditorStore((s) => s.explorerOpen);
  const terminalOpen = useEditorStore((s) => s.terminalOpen);
  const mobileMenuOpen = useEditorStore((s) => s.mobileMenuOpen);
  const { setMobileMenuOpen } = useEditorToggles();

  const { isMobile } = useMobile();

  return (
    <div className="min-h-screen bg-ctp-base flex">
      {/* Mobile: dark backdrop behind the sliding sidebar/explorer panels */}
      {isMobile && mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div className="flex h-screen w-screen max-w-screen overflow-hidden md:ml-14">
        <SideBar />
        {explorerOpen && (!isMobile || mobileMenuOpen) && <Explorer />}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <GitBlameManager />
          <EditorTabs sections={sectionComponents} />
          <EditorBreadcrumbs />
          <CodeContent sections={sectionComponents} />
          <WorkspaceStatusBar />
          {terminalOpen ? (
            <EngineeringConsole />
          ) : (
            <MobileNav />
          )}
          <MobileSwipeHint />
        </div>
      </div>
      <CommandPalette />
    </div>
  );
};

export default CodeEditor;
