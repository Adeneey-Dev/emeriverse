# James Whitaker — Author Website (Phase 1: Landing Page)

A premium, editorial-style landing page for an author's personal website and
future digital reading platform. Built with React, TypeScript, Vite, Tailwind
CSS v4, Framer Motion, and lucide-react.

This is **Phase 1 only** — the public homepage. No authentication, payments,
book reader, or backend are included. Sections that will eventually need a
backend (login, subscribe, comments, etc.) are visual placeholders wired to
anchor links, ready to be connected later.

## Tech stack

- **React 19 + TypeScript** — strict typing, no `any`
- **Vite** — dev server and build
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
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── home/           # Hero, FeatureStrip, BookSection, BookCard,
│   │                    AuthorIntro, MembershipCTA, Testimonials,
│   │                    Newsletter, HeroIllustration
│   └── ui/              # Button, Badge, SectionHeading, InkStroke,
│                         BookCover, SocialIcons - shared primitives
├── data/                # mockBooks, mockTestimonials
├── types/                # Book, Testimonial, NavLink, Feature, Stat
├── lib/                  # cn() classnames helper
├── pages/
│   └── Home.tsx           # assembles the landing page from sections
├── App.tsx
├── main.tsx
└── index.css              # Tailwind import + design tokens (@theme)
```

## Design system

Tokens live in `src/index.css` under `@theme`, so every color/font is a
single source of truth consumed by Tailwind utility classes
(`bg-ink`, `text-gold`, `font-display`, etc.):

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#14110e` | Hero, footer, dark sections |
| `--color-cream` | `#faf5ea` | Page background |
| `--color-cream-deep` | `#f1e7d3` | Secondary light surfaces |
| `--color-gold` | `#b8863b` | Primary accent, CTAs |
| `--color-charcoal` | `#26211c` | Body text on light backgrounds |
| `--font-display` | Fraunces | Headings, editorial voice |
| `--font-sans` | Inter | Body copy, UI labels |

**Signature detail:** section eyebrows are underlined with a hand-drawn SVG
ink stroke (`InkStroke.tsx`) that draws itself in on scroll — a nod to a pen
underlining a word on paper, used instead of a generic straight rule.

Book covers (`BookCover.tsx`) are generated from typography and a two-tone
gradient rather than stock photography, so the catalogue stays fully
license-free and visually consistent as titles are added. The hero
background (`HeroIllustration.tsx`) is likewise a hand-composed SVG scene
(desk, lamp, open book, quill) rather than a stock photo, so the page has
zero external image dependencies out of the box.

## Connecting real data later

Mock data lives in `src/data/books.ts` and `src/data/testimonials.ts` and is
typed to match the shape the future API is expected to return
(`Book`, `Testimonial` in `src/types/index.ts`). To go live:

1. Replace the `mockBooks` array with a fetch to `GET /api/books`.
2. Replace `mockTestimonials` with `GET /api/testimonials`.
3. Wire the `Newsletter` form's `handleSubmit` to `POST /api/newsletter`.

No UI component needs to change shape — only the data source.

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) and heading order
- All interactive elements are real `<button>`/`<a>` elements with visible
  focus states (`:focus-visible`)
- Free/Premium status is communicated with icon + label, not color alone
- Respects `prefers-reduced-motion` (disables Framer Motion transitions and
  scroll animation)
- Descriptive `alt`/`aria-label` text throughout; testimonial carousel and
  newsletter success/error states use appropriate live-region roles

## Responsive breakpoints tested

320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px

## What's intentionally not built (Phase 2+)

Authentication, registration/login backend, payments/subscriptions, the
in-browser book reader, comments/likes backend, notifications, CMS, and admin
dashboard. These appear only as links/CTAs on this landing page.
