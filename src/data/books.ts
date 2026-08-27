import type { Book } from "../types";

/**
 * Ifeanyi Emeribe's published catalogue, sourced from his Amazon author
 * page. `accessType` reflects whether a title is available free through
 * Kindle Unlimited ("free") or is purchase-only ("premium") — it does
 * not (yet) reflect a real Emeriverse membership tier, since that's a
 * Phase 2 feature.
 *
 * No star ratings/review counts are included: we don't have verified
 * figures for these titles, and inventing numbers next to a real
 * author's real books would misrepresent the catalogue. `BookCard`
 * only renders a rating row when `rating`/`reviewCount` are present.
 *
 * Replace this static array with a fetch to `GET /api/books` once a
 * backend exists — every consumer (BookSection, future /books page)
 * reads through this module rather than importing data inline, so the
 * swap is a one-file change.
 */
export const books: Book[] = [
  {
    id: "grammatical-concord-formulas",
    title: "The English Grammatical Concord Formulas",
    author: "Ifeanyi Emeribe",
    genre: "Grammar",
    coverPalette: ["#3b2a1f", "#b8863b"],
    accessType: "free",
    year: 2022,
    amazonUrl: "https://www.amazon.com/dp/B09QSPPRXB",
  },
  {
    id: "common-errors-in-idioms",
    title: "Easy Learning Flash Cards on Common Errors in Idioms",
    author: "Ifeanyi Emeribe",
    genre: "Idioms",
    coverPalette: ["#2a2420", "#8c6423"],
    accessType: "premium",
    year: 2022,
    amazonUrl: "https://www.amazon.com/dp/B0B5FSNZ9B",
  },
  {
    id: "fixed-idiomatic-pairs",
    title: "Easy Learning Flash Cards on Fixed Idiomatic Pairs of Words",
    author: "Ifeanyi Emeribe",
    genre: "Idioms",
    coverPalette: ["#1f2a28", "#5c7a68"],
    accessType: "free",
    year: 2022,
    amazonUrl: "https://www.amazon.com/dp/B0BC54J9GN",
  },
  {
    id: "tour-around-canada",
    title: "Tour Around Canada with Flashcards",
    author: "Ifeanyi Emeribe",
    genre: "Geography",
    coverPalette: ["#161a24", "#3c4f6e"],
    accessType: "premium",
    year: 2025,
    amazonUrl: "https://www.amazon.com/dp/B0F1LT6J2D",
  },
  {
    id: "animals-and-young-ones",
    title: "Easy Learning Flash Cards on Animals and Young Ones",
    author: "Ifeanyi Emeribe",
    genre: "Nature",
    coverPalette: ["#16221c", "#c79a4b"],
    accessType: "free",
    year: 2024,
    amazonUrl: "https://www.amazon.com/dp/B0CSBWTBD2",
  },
  {
    id: "nigerian-leaders-and-heroes",
    title: "Easy Learning Flashcards on Notable Nigerian Leaders and Heroes",
    author: "Ifeanyi Emeribe",
    genre: "History",
    coverPalette: ["#1c1614", "#6e4a3a"],
    accessType: "premium",
    year: 2024,
    amazonUrl: "https://www.amazon.com/dp/B0DJBBTWJ2",
  },
  {
    id: "colours-identification",
    title: "Easy Learning Flash Card on Colours Identification",
    author: "Ifeanyi Emeribe & Esther Toyi",
    genre: "Early Learning",
    coverPalette: ["#2f1f36", "#a56bb8"],
    accessType: "free",
    year: 2024,
    amazonUrl: "https://www.amazon.com/dp/B0CSBX9L33",
  },
  {
    id: "idioms-of-comparism",
    title: "Easy Learning Flash Card on Idioms of Comparism",
    author: "Ifeanyi Emeribe",
    genre: "Idioms",
    coverPalette: ["#22301f", "#7a9a5c"],
    accessType: "free",
    year: 2022,
    amazonUrl: "https://www.amazon.com/dp/B09VZSSHCS",
  },
  {
    id: "collective-noun",
    title: "Easy Learning Flash Card on Collective Noun",
    author: "Ifeanyi Emeribe",
    genre: "Vocabulary",
    coverPalette: ["#241a2e", "#8863b8"],
    accessType: "premium",
    year: 2022,
    amazonUrl: "https://www.amazon.com/dp/B09TS88K84",
  },
  {
    id: "distinctive-sound",
    title: "Easy Learning Flash Card on Distinctive Sound",
    author: "Ifeanyi Emeribe",
    genre: "Phonics",
    coverPalette: ["#132622", "#4a9a82"],
    accessType: "premium",
    year: 2022,
    amazonUrl: "https://www.amazon.com/dp/B09W17VT3L",
  },
];
