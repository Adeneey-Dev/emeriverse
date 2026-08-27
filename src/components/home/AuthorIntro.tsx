import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ImagePlus } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

const ACHIEVEMENTS = [
  { value: "10+", label: "Books Published" },
  { value: "2022", label: "First Title Released" },
  { value: "8+", label: "Subjects Covered" },
];

/**
 * PHOTO SLOT: this panel is intentionally left as a placeholder — swap
 * it out with a real portrait once you have one:
 *
 *   1. Drop the image in `src/assets/`, e.g. `author-portrait.jpg`.
 *   2. Add `import authorPhoto from "../../assets/author-portrait.jpg";`
 *      near the top of this file.
 *   3. Replace the placeholder <div> below (the one with the dashed
 *      border and the ImagePlus icon) with:
 *        <img src={authorPhoto} alt="Ifeanyi Emeribe" className="h-full w-full object-cover" />
 */
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
          {/* --- Author photo placeholder — see comment above for how to swap in a real photo --- */}
          <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-sm border border-dashed border-gold/35 bg-ink shadow-[0_24px_50px_-24px_rgba(20,17,14,0.55)]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(199,154,75,0.28), transparent 55%), linear-gradient(160deg, #1f1a15 0%, #14110e 100%)",
              }}
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
              <ImagePlus className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="relative font-display text-sm italic text-cream/60">Author photo goes here</p>
          </div>

          <div className="absolute -bottom-6 -right-4 hidden w-44 rounded-sm border border-surface-line bg-surface p-4 shadow-lg sm:block lg:-right-8">
            <p className="font-display text-2xl font-medium text-fg">10+</p>
            <p className="mt-0.5 text-xs text-fg-muted">Published educational titles on Amazon</p>
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
              Ifeanyi Emeribe is an author and educational content creator dedicated to making
              learning simple, engaging, and accessible through books and educational
              resources. His published works explore a wide range of educational topics,
              particularly English language, grammar, vocabulary, idioms, and general
              knowledge.
            </p>
            <p>
              Through his <em>Easy Learning Flash Cards</em> series, he presents learning
              concepts in a simple and practical format for both children and learners —
              covering English grammatical concord, common errors in idioms, fixed idiomatic
              expressions, collective nouns, distinctive sounds, colours, animals and their
              young ones, notable Nigerian leaders and heroes, and educational explorations of
              places such as Canada.
            </p>
            <p>
              With a growing collection of publications available through Amazon, Ifeanyi
              continues to create resources designed to help readers learn, discover, and
              build knowledge one concept at a time.
            </p>
          </div>

          <Button
            variant="outline-dark"
            href="https://www.amazon.com/Ifeanyi-Emeribe/e/B0B248BPR6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8"
            icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
          >
            View Author Page on Amazon
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
