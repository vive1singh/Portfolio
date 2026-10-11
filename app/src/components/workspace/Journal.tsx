import { BookOpen, GitCommitHorizontal } from "lucide-react";
import React, { useState } from "react";

import { journalEntries } from "./journal-data";

/**
 * Engineering Journal — authored milestones, each opening as a readable
 * document inside the workspace. No fake commit data or invented stats.
 */
const Journal: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(journalEntries[0]?.id ?? null);

  if (!journalEntries.length) {
    return (
      <div className="text-sm text-ctp-subtext0 font-source py-10 text-center">
        No journal entries yet.
      </div>
    );
  }

  return (
    <div className="font-source">
      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="w-4 h-4 text-ctp-blue" />
        <h2 className="text-lg font-semibold text-ctp-text">Engineering Journal</h2>
      </div>
      <p className="text-xs text-ctp-subtext0 mb-6">
        Authored milestones — no fabricated commits, contribution counts or test results.
      </p>

      <div className="grid lg:grid-cols-[280px_1fr] gap-4 items-start">
        {/* Entry list */}
        <ul className="space-y-1.5">
          {journalEntries.map((e) => (
            <li key={e.id}>
              <button
                onClick={() => setOpenId(e.id)}
                className={
                  "w-full text-left rounded-xl border px-3 py-2.5 transition-colors " +
                  (openId === e.id
                    ? "bg-ctp-panel border-ctp-border"
                    : "border-transparent hover:bg-ctp-surface0/40")
                }
              >
                <div className="flex items-center gap-2">
                  <span className="text-[0.625rem] text-ctp-subtext0 font-mono">
                    {e.date}
                  </span>
                  <span className="text-[0.625rem] text-ctp-blue font-medium uppercase tracking-wider">
                    {e.tag}
                  </span>
                </div>
                <p className="text-sm font-medium text-ctp-text mt-1 leading-snug">
                  {e.title}
                </p>
              </button>
            </li>
          ))}
        </ul>

        {/* Open entry */}
        {(() => {
          const entry = journalEntries.find((e) => e.id === openId) ?? journalEntries[0];
          return (
            <article className="rounded-2xl border border-ctp-surface1/60 bg-ctp-panel overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-ctp-surface1/60">
                <GitCommitHorizontal className="w-4 h-4 text-ctp-green" />
                <span className="text-sm font-semibold text-ctp-text">
                  {entry.title}
                </span>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 flex-wrap text-[0.6875rem] text-ctp-subtext0 mb-4">
                  <span className="font-mono">{entry.date}</span>
                  <span>·</span>
                  <span>{entry.tag}</span>
                  {entry.project ? (
                    <>
                      <span>·</span>
                      <span className="text-ctp-sapphire">{entry.project}</span>
                    </>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed text-ctp-subtext1">
                  {entry.body}
                </p>
                {entry.labels?.length ? (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {entry.labels.map((l) => (
                      <span
                        key={l}
                        className="px-2 py-0.5 rounded-md text-[0.625rem] bg-ctp-surface0/50 text-ctp-subtext0 font-mono"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })()}
      </div>
    </div>
  );
};

export default Journal;
