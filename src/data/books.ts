import type { Book } from "../types";

/**
 * Mock catalogue for Phase 1.
 *
 * Replace this static array with a fetch to `GET /api/books` once the
 * backend exists — every consumer (BookSection, future /books page)
 * reads through this module rather than importing data inline, so the
 * swap is a one-file change.
 */
export const mockBooks: Book[] = [
  {
    id: "beyond-the-horizon",
    title: "Beyond the Horizon",
    author: "James Whitaker",
    genre: "Literary Fiction",
    coverPalette: ["#3b2a1f", "#b8863b"],
    accessType: "free",
    rating: 4.7,
    reviewCount: 320,
  },
  {
    id: "whispers-of-the-past",
    title: "Whispers of the Past",
    author: "James Whitaker",
    genre: "Historical Drama",
    coverPalette: ["#2a2420", "#8c6423"],
    accessType: "premium",
    rating: 4.8,
    reviewCount: 512,
  },
  {
    id: "paths-unknown",
    title: "Paths Unknown",
    author: "James Whitaker",
    genre: "Adventure",
    coverPalette: ["#1f2a28", "#5c7a68"],
    accessType: "free",
    rating: 4.6,
    reviewCount: 280,
  },
  {
    id: "echoes-of-silence",
    title: "Echoes of Silence",
    author: "James Whitaker",
    genre: "Psychological Thriller",
    coverPalette: ["#161a24", "#3c4f6e"],
    accessType: "premium",
    rating: 4.9,
    reviewCount: 620,
  },
  {
    id: "shadows-within",
    title: "Shadows Within",
    author: "James Whitaker",
    genre: "Mystery",
    coverPalette: ["#1c1614", "#6e4a3a"],
    accessType: "premium",
    rating: 4.8,
    reviewCount: 410,
  },
  {
    id: "dawn-of-hope",
    title: "Dawn of Hope",
    author: "James Whitaker",
    genre: "Contemporary Fiction",
    coverPalette: ["#16221c", "#c79a4b"],
    accessType: "free",
    rating: 4.7,
    reviewCount: 330,
  },
];
