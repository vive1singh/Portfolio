export interface Certificate {
  /** Certificate title, e.g. "Meta Front-End Developer". */
  title: string;
  /** Issuing organization, e.g. "Meta". */
  issuer: string;
  /** When it was earned, e.g. "2025". */
  date: string;
  /** Credential id, shown under the card (optional). */
  credentialId?: string;
  /** Link to the credential (optional). */
  verifyUrl?: string;
  /** Skills the certificate covers (optional). */
  skills?: string[];
  /**
   * Image for the certificate — put files in `public/certificates/` and
   * reference them as `/certificates/<file>` (withBase is applied here).
   * Leave out to render the placeholder.
   */
  image?: string;
}

/**
 * Certificates shown in the Certificates section.
 * Add an `image` (a file under `public/certificates/`) once the asset exists —
 * cards render a placeholder until then.
 */
export const certificates: Certificate[] = [
  {
    title: "Coming Soon",
    issuer: "—",
    date: "",
  },
];
