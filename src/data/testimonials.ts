import type { Testimonial } from "../types";

/**
 * Placeholder reader testimonials for Phase 1.
 *
 * Shape matches the future `GET /api/testimonials` response so
 * <Testimonials /> can switch from this array to a fetch without
 * touching its render logic.
 */
export const mockTestimonials: Testimonial[] = [
  {
    id: "sarah-j",
    name: "Sarah J.",
    location: "Reader since 2021",
    quote:
      "Every story feels personal. I always find something meaningful in James's writing, and I find myself thinking about his characters for weeks afterward.",
    rating: 5,
    initials: "SJ",
  },
  {
    id: "daniel-m",
    name: "Daniel M.",
    location: "Reader since 2022",
    quote:
      "Whispers of the Past kept me up until 2am on a work night. Rare to find a writer who trusts the reader to sit with silence between the big moments.",
    rating: 5,
    initials: "DM",
  },
  {
    id: "amara-o",
    name: "Amara O.",
    location: "Reader since 2023",
    quote:
      "The premium community has genuinely changed how I read — the early chapters and the discussion threads make it feel like being part of the book's making.",
    rating: 4,
    initials: "AO",
  },
];
