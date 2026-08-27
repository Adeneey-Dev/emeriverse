# Emeriverse — A Universe of Learning (Phase 1: Landing Page)

A premium, editorial-style landing page for **Emeriverse**, the online home
for Ifeanyi Emeribe's *Easy Learning Flash Cards* series and other
educational titles. Built with React, TypeScript, Vite, Tailwind CSS v4,
Framer Motion, and lucide-react.

This is **Phase 1 only** — the public homepage. No authentication,
payments, in-house reader, or backend are included. Book cards link out to
the real Amazon product pages, since there's no in-house reader yet.
Sections that will eventually need a backend (membership, comments, etc.)
are visual placeholders, ready to be connected later.

## Tech stack

- **React 19 + TypeScript** — strict typing, no `any`
- **Vite 6** — dev server and build
- **Tailwind CSS v4** — design tokens declared in `src/index.css` via `@theme`
- **Framer Motion** — subtle entrance/scroll animations, respects
  `prefers-reduced-motion`
- **lucide-react** — icon set (brand/social icons hand-rolled in
  `src/components/ui/SocialIcons.tsx`, since lucide no longer ships
  trademarked marks)

No UI kit (MUI, Bootstrap, shadcn, etc.) is used — every component is custom.

## Getting started

```bash
npm install
npm run dev       # start local dev server (Vite)
npm run build     # type-check + production build -> dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

Requires Node 18+.

## Project structure

```text
src/
├── assets/
│   └── hero-student.jpg   # real hero photo (user-provided)
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── home/           # Hero, FeatureStrip, BookSection, BookCard,
│   │                    AuthorIntro, MembershipCTA, Testimonials,
│   │                    Newsletter
│   └── ui/              # Button, Badge, SectionHeading, InkStroke,
│                         BookCover, ThemeToggle, SocialIcons
├── data/                # books, mockTestimonials
├── providers/            # ThemeProvider, theme-context, useTheme
├── types/                # Book, Testimonial, NavLink, Feature, Stat
├── lib/                  # cn() classnames helper
├── pages/
│   └── Home.tsx           # assembles the landing page from sections
├── App.tsx
├── main.tsx
└── index.css              # Tailwind import + design tokens (@theme)
```

## Design system

Tokens live in `src/index.css` under `@theme`. There are two families:

- **Brand chrome tokens** (`ink`, `cream`, `gold`, ...) — used by the
  Navbar, Hero, Footer, and Membership section, which stay dark in both
  themes by design.
- **Theme-aware tokens** (`surface`, `surface-alt`, `fg`, `fg-muted`, ...) —
  used by the light content sections (feature strip, books, author,
  testimonials, newsletter). These flip automatically when `<html>` gets
  the `dark` class, via CSS variable overrides — no per-component logic.

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#14110e` | Hero, footer, dark sections |
| `--color-surface` | `#faf5ea` (light) / `#17130f` (dark) | Content section background |
| `--color-gold` | `#b8863b` | Primary accent, CTAs |
| `--color-fg` | `#26211c` (light) / `#f1ece0` (dark) | Body text on content sections |
| `--font-display` | Fraunces | Headings, editorial voice |
| `--font-sans` | Inter | Body copy, UI labels |

**Light/dark toggle:** `ThemeProvider` (`src/providers/`) toggles a `dark`
class on `<html>` and persists the choice to `localStorage`. An inline
script in `index.html` applies the saved (or OS-preferred) theme before
React mounts, so there's no flash of the wrong theme. The toggle itself
(`ui/ThemeToggle.tsx`) is a shared component used in both the desktop
navbar and the mobile drawer, with a cross-fade/rotate icon transition and
a visible hover/focus color response.

**Signature detail:** section eyebrows are underlined with a hand-drawn SVG
ink stroke (`InkStroke.tsx`) that draws itself in on scroll. Book covers
(`BookCover.tsx`) are generated from typography and a two-tone gradient
rather than using the real Amazon cover art, to avoid hot-linking or
reproducing product images that aren't ours to redistribute.

## About the book data

`src/data/books.ts` reflects Ifeanyi Emeribe's real, published catalogue
(sourced from his Amazon author page). A few notes:

- **No fabricated ratings.** `rating`/`reviewCount` are optional on the
  `Book` type and are left unset here, because we don't have verified
  figures for these titles — `BookCard` only renders a rating row when
  both are present. Add real numbers once you have them (e.g. by wiring
  up the Amazon Product Advertising API, or entering them by hand).
- **`accessType`** ("free" vs "premium") reflects whether a title is
  currently available free through Kindle Unlimited, not a real
  Emeriverse membership tier — that's a Phase 2 feature.
- Every book card and "View All Books" button links out to the real
  Amazon page, since there's no in-house reader yet.

## Author photo

The About section (`AuthorIntro.tsx`) currently shows a labeled
placeholder panel instead of a real portrait, per request. To add one:

1. Drop the image in `src/assets/`, e.g. `author-portrait.jpg`.
2. In `src/components/home/AuthorIntro.tsx`, add near the top:
   ```ts
   import authorPhoto from "../../assets/author-portrait.jpg";
   ```
3. Replace the placeholder `<div>` (the one with the dashed border and the
   `ImagePlus` icon) with:
   ```tsx
   <img src={authorPhoto} alt="Ifeanyi Emeribe" className="h-full w-full object-cover" />
   ```

## Connecting real data later

- Replace `books` in `src/data/books.ts` with a fetch to `GET /api/books`
  (or the Amazon Product Advertising API) once available.
- Replace `mockTestimonials` in `src/data/testimonials.ts` with real
  reviews once collected.
- Wire the `Newsletter` form's `handleSubmit` to `POST /api/newsletter`.

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) and heading order
- All interactive elements are real `<button>`/`<a>` elements with visible
  focus states (`:focus-visible`)
- Free/Premium status is communicated with icon + label, not color alone
- Respects `prefers-reduced-motion` (disables Framer Motion transitions,
  the ThemeToggle's rotate animation, and scroll animation)
- Outbound links to Amazon use `target="_blank" rel="noopener noreferrer"`
  and are labeled as opening in a new tab

## Responsive breakpoints tested

320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px

## What's intentionally not built (Phase 2+)

Authentication, registration/login backend, payments/subscriptions, an
in-house book reader, comments/likes backend, notifications, CMS, and admin
dashboard. These appear only as links/CTAs on this landing page.
