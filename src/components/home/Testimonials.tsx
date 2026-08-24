import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { mockTestimonials } from "../../data/testimonials";
import { cn } from "../../lib/cn";

/**
 * Placeholder reviews sourced from `mockTestimonials`. Swap that module
 * for a `GET /api/testimonials` call once real reviews exist — this
 * component only reads `id / name / location / quote / rating / initials`.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const testimonial = mockTestimonials[index];

  const goTo = (i: number) => setIndex((i + mockTestimonials.length) % mockTestimonials.length);

  return (
    <section className="bg-cream py-20 lg:py-28" aria-labelledby="testimonials-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="What Readers Say"
          heading={<span id="testimonials-heading">Stories, shared both ways</span>}
          align="center"
          className="mx-auto"
        />

        <div className="relative mx-auto mt-12 max-w-2xl">
          <div className="relative min-h-[220px] rounded-sm border border-cream-line bg-white/60 p-8 text-center shadow-sm sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <span className="font-display text-5xl leading-none text-gold" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="mx-auto mt-2 max-w-lg font-display text-lg italic leading-relaxed text-charcoal">
                  {testimonial.quote}
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-sm font-medium text-gold-pale">
                    {testimonial.initials}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-charcoal">{testimonial.name}</p>
                    <p className="text-xs text-stone">{testimonial.location}</p>
                  </div>
                </div>

                <div className="mt-3 flex justify-center gap-0.5" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn("h-4 w-4", i < testimonial.rating ? "fill-gold text-gold" : "fill-cream-deep text-cream-line")}
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-line text-charcoal transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="flex items-center gap-2">
              {mockTestimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={i === index}
                  className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-gold" : "w-1.5 bg-cream-line")}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-line text-charcoal transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
