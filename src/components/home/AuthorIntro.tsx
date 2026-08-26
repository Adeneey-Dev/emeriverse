import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Feather } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

const ACHIEVEMENTS = [
  { value: "15+", label: "Years Writing" },
  { value: "3", label: "Bestseller Awards" },
  { value: "40+", label: "Countries Reached" },
];

export function AuthorIntro() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="bg-surface-alt py-20 lg:py-28" aria-labelledby="about-heading">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink shadow-[0_24px_50px_-24px_rgba(20,17,14,0.55)]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(199,154,75,0.35), transparent 55%), linear-gradient(160deg, #1f1a15 0%, #14110e 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-28 w-28 items-center justify-center rounded-full border border-gold/40 text-gold">
                <Feather className="h-11 w-11" strokeWidth={1.25} aria-hidden="true" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
              <p className="font-display text-sm italic text-cream/70">Author portrait — Cape Town, 2026</p>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-4 hidden w-44 rounded-sm border border-surface-line bg-surface p-4 shadow-lg sm:block lg:-right-8">
            <p className="font-display text-2xl font-medium text-fg">15+</p>
            <p className="mt-0.5 text-xs text-fg-muted">Years crafting stories readers remember</p>
          </div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Meet the Author"
            heading={
              <span id="about-heading">
                Words have the power to change the way we see the world.
              </span>
            }
          />

          <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-muted">
            <p>
              I&rsquo;ve spent the better part of two decades chasing the sentence that makes a
              reader stop, look up, and sit with a feeling a little longer. That pursuit has
              taken shape as twelve novels, a handful of short story collections, and a
              community of readers I now think of as collaborators.
            </p>
            <p>
              My work leans toward quiet, character-driven stories — the kind that trust a
              reader to fill in the silence. Whether you&rsquo;re here for a weekend escape or a
              story that stays with you for years, I hope you find something worth carrying
              with you.
            </p>
          </div>

          <Button variant="outline-dark" href="#about" className="mt-8" icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}>
            Read My Story
          </Button>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-surface-line pt-8">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.label}>
                <dd className="font-display text-2xl font-medium text-fg sm:text-3xl">{item.value}</dd>
                <dt className="mt-1 text-xs leading-snug text-fg-muted">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
