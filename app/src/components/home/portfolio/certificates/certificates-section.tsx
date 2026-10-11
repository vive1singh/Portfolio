import { Award, ExternalLink } from "lucide-react";
import React from "react";

import Reveal from "@/components/animations/reveal/Reveal";
import { OutlineNode } from "@/components/home/editor/outline";
import Section from "@/components/home/editor/section/portfolio-section";
import { useGitComponent } from "@/hooks/use-git-component";
import { ctpAccentStyle } from "@/lib/ctp-colors";
import { cn, withBase } from "@/lib/utils";

import { type Certificate, certificates } from "./data";

const cardColors = ["mauve", "green", "blue", "peach", "sapphire", "pink"];

const CertificateCard: React.FC<{
  cert: Certificate;
  color: string;
}> = ({ cert, color }) => {
  const image = cert.image ? withBase(cert.image) : undefined;

  return (
    <div
      style={ctpAccentStyle(color)}
      className={cn(
        "group relative flex flex-col h-full rounded-xl overflow-hidden",
        "bg-ctp-surface0/40 border border-ctp-surface1/50 backdrop-blur-sm",
        "transition-all duration-300 hover:bg-ctp-surface0/70",
        "hover:shadow-lg hover:shadow-black/10 interactive-scale"
      )}
    >
      {/* Certificate image / placeholder */}
      <div className="relative w-full aspect-[4/3] bg-ctp-mantle overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${cert.title} — ${cert.issuer}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ctp-overlay0">
            <Award className="w-10 h-10" strokeWidth={1.5} />
            <span className="text-xs font-source">Certificate image</span>
          </div>
        )}
        {/* Accent top border — driven by --accent from ctpAccentStyle */}
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-60"
          style={{ background: "rgb(var(--accent))" }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-ctp-text font-source leading-snug">
            {cert.title}
          </h3>
          {cert.date && (
            <span className="shrink-0 text-[0.625rem] px-1.5 py-0.5 rounded bg-ctp-base text-ctp-subtext1 font-source">
              {cert.date}
            </span>
          )}
        </div>

        <p className="text-xs text-ctp-subtext0 font-source">{cert.issuer}</p>

        {cert.credentialId && (
          <p className="text-[0.625rem] text-ctp-overlay1 font-mono truncate">
            ID: {cert.credentialId}
          </p>
        )}

        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {cert.skills.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-[0.625rem] px-1.5 py-0.5 rounded bg-ctp-base text-ctp-subtext1 font-source"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Verify link overlay */}
      {cert.verifyUrl && (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify ${cert.title}`}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-ctp-base/80 backdrop-blur-sm text-ctp-overlay0 hover:text-ctp-blue opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
};

const CertificatesSection: React.FC = () => {
  const ref = useGitComponent(CertificatesSection);

  return (
    <Section
      id="certificates"
      label="Certificates"
      title="Certifications"
      description="Courses, credentials and certificates I've earned along the way."
      headerIcon={Award}
      showHeader={true}
    >
      <div ref={ref} className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <OutlineNode
              key={cert.title}
              label={cert.title}
              icon={<Award className="w-3 h-3 text-ctp-yellow" />}
            >
              <Reveal effect="fade-up" duration={0.5} delay={0.05 * idx}>
                <CertificateCard
                  cert={cert}
                  color={cardColors[idx % cardColors.length]}
                />
              </Reveal>
            </OutlineNode>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CertificatesSection;
