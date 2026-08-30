/**
 * Shared domain types for the author platform.
 *
 * These mirror the shape the future API is expected to return, so
 * components can be pointed at `GET /api/books` etc. later without
 * changing their prop contracts.
 */

export type AccessType = "free" | "premium";

export interface Book {
  id: string;
  title: string;
  author: string;
  /** Short genre/category label, e.g. "Literary Fiction" */
  genre: string;
  /** Deterministic gradient tokens used to render the generated cover art */
  coverPalette: [string, string];
  coverImage?: string;
  accessType: AccessType;
  /** Optional — only render a rating row when real, verified figures exist.
   *  Never fabricate these for a real author's real catalogue. */
  rating?: number;
  reviewCount?: number;
  /** Publication year, shown as a small detail on the card */
  year: number;
  /** Link to the real product page (Amazon, etc.) — there is no in-house
   *  reader yet, so book cards send readers here instead of a dead route. */
  amazonUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  /** Two-letter initials shown in the avatar when no photo is available */
  initials: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
}
