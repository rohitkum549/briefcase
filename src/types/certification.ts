export interface Certification {
  id: string;
  title: string;
  /** Display name of the issuing organisation. */
  issuer: string;
  /**
   * Key for the brand-icon lookup in lib/techIcons. Kept separate from `issuer`
   * so the display name can change without breaking the icon.
   */
  issuerId: string;
  year: number;
  /**
   * Short month name, or null when no source shows one. Never guessed — the UI
   * renders just the year in that case.
   */
  month: string | null;
  credentialId: string | null;
  /**
   * Public URL that proves the credential. Null only where no working link
   * exists — a verify button that 404s is worse than no button at all.
   */
  verifyUrl: string | null;
  /** Anything the certificate itself states that a title can't carry. */
  note?: string;
  /** Skills the certificate covers, named from its own subject matter. */
  skills: string[];
}
