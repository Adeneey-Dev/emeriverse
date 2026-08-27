import type { Testimonial } from "../types";

/**
 * Placeholder testimonials for Phase 1. These are illustrative, not real
 * attributed quotes — swap this array for a `GET /api/testimonials` call
 * once genuine reader/parent/teacher reviews are collected.
 */
export const mockTestimonials: Testimonial[] = [
  {
    id: "amara-p",
    name: "Amara P.",
    location: "Parent",
    quote:
      "My daughter struggled with idioms until we found these flash cards. The concord formulas book finally made subject-verb agreement click for her too.",
    rating: 5,
    initials: "AP",
  },
  {
    id: "tunde-o",
    name: "Tunde O.",
    location: "Secondary school teacher",
    quote:
      "I use the Nigerian Leaders and Heroes set in class every term. Students remember the material far better than when it's just read from a textbook.",
    rating: 5,
    initials: "TO",
  },
  {
    id: "chiamaka-n",
    name: "Chiamaka N.",
    location: "Homeschooling parent",
    quote:
      "Simple, clear, and genuinely fun for my kids. We've worked through the animals and colours sets and I'm already looking forward to the next release.",
    rating: 4,
    initials: "CN",
  },
];
