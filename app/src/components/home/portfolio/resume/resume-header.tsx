import { Download, Github, Linkedin, Mail, User } from "lucide-react";
import React from "react";

import { OutlineNode } from "@/components/home/editor/outline";
import { Heading, Text } from "@/components/ui/text";
import { siteConfig } from "@/config/site";
import { useGitComponent } from "@/hooks/use-git-component";
import { cn, withBase } from "@/lib/utils";

import styles from "./resume.module.css";

type ContactEntry = {
  icon: typeof Mail;
  label: string;
  href: string;
};

/** Contact rows from siteConfig.links — empty (placeholder) until configured. */
const contacts: ContactEntry[] = (() => {
  const items: ContactEntry[] = [];
  const email = siteConfig.links.email;
  const github = siteConfig.links.github;
  const linkedin = siteConfig.links.linkedin;
  if (email) {
    items.push({ icon: Mail, label: email, href: `mailto:${email}` });
  }
  if (github.length > 0) {
    items.push({
      icon: Github,
      label: github.replace(/^https?:\/\/(www\.)?/, ""),
      href: github,
    });
  }
  if (linkedin.length > 0) {
    items.push({
      icon: Linkedin,
      label: linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: linkedin,
    });
  }
  return items;
})();

const ResumeHeader: React.FC = () => {
  const ref = useGitComponent(ResumeHeader);

  return (
    <div ref={ref} className="border-b border-ctp-surface1 pb-6 mb-6">
      <OutlineNode
        label="Profile"
        icon={<User className="w-3 h-3" />}
        iconColor="teal"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <Heading
              as="h1"
              className="text-3xl md:text-4xl font-extrabold text-ctp-text tracking-tight"
            >
              {siteConfig.name}
            </Heading>
            <Text variant="lead" className="mt-1 text-ctp-subtext0  text-base">
              {siteConfig.role}
            </Text>
          </div>

          <a
            href={withBase("/resume.pdf")}
            download
            className={cn(
              "inline-flex items-center gap-2 self-start px-4 py-2 rounded-md",
              "bg-transparent border border-ctp-surface2",
              "text-ctp-text hover:bg-ctp-surface0 hover:border-ctp-overlay0 transition-all duration-200",
              "text-sm  font-medium",
              styles.download
            )}
          >
            <Download className={cn("w-4 h-4", styles.downloadIcon)} />
            Download PDF
          </a>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
          {contacts.length ? (
            contacts.map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-ctp-subtext0 hover:text-ctp-text transition-colors group"
              >
                <Icon className="w-3.5 h-3.5 text-ctp-overlay0 group-hover:text-ctp-text transition-colors" />
                <Text
                  as="span"
                  variant="caption"
                  className=" text-xs group-hover:text-ctp-text transition-colors"
                >
                  {label}
                </Text>
              </a>
            ))
          ) : (
            <Text variant="caption" className="text-ctp-subtext0">
              Contact details pending — add them in{" "}
              <code className="font-mono text-ctp-blue">
                src/config/site.ts
              </code>
              .
            </Text>
          )}
        </div>
      </OutlineNode>
    </div>
  );
};

export default ResumeHeader;
