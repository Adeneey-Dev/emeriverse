// Hero.tsx
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/Button";
import { HeroSlideshow } from "./HeroSlideshow";
import slide0 from "../../assets/hero/slide-0-fun-way-cover.jpg";
import slide1 from "../../assets/hero/slide-1-student-flashcards.jpg";
import slide2 from "../../assets/hero/slide-2-classroom-alphabet.jpg";
import slide3 from "../../assets/hero/slide-3-grammar-notebook.jpg";
import slide4 from "../../assets/hero/slide-4-idiom-cards-circle.jpg";
import slide5 from "../../assets/hero/slide-5-flashcard-set.jpg";

const HERO_IMAGES = [
    {
    src: slide0,
    alt: "Learn Flashcards the Fun Way with Emeriverse — a student using flashcards and a laptop",
  },
  {
    src: slide1,
    alt: "A student writing in a notebook, surrounded by Easy Learning Flash Cards",
  },
  {
    src: slide2,
    alt: "A teacher and young students holding up alphabet flash cards outdoors",
  },
  {
    src: slide3,
    alt: "A grammar notebook and colourful flash cards laid out on a desk",
  },
  {
    src: slide4,
    alt: "A teacher reading an idiom flash card with a circle of young students",
  },
  {
    src: slide5,
    alt: "A set of Easy Learning Flash Cards covering nouns, verbs, and idioms",
  },
];

const STATS = [
  { id: "books", label: "Books Published", value: "10+", icon: BookOpen },
  { id: "range", label: "Active Since 2022", value: "2022-25", icon: Sparkles },
  { id: "subjects", label: "Subjects Covered", value: "8+", icon: Layers },
  {
    id: "platform",
    label: "Available on Amazon",
    value: "Kindle & Print",
    icon: GraduationCap,
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Full-screen background slideshow */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroSlideshow images={HERO_IMAGES} intervalMs={60000} />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      <div className="container-page relative z-10 flex min-h-screen items-center pt-20 pb-16 lg:pt-24 lg:pb-20">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          {/* Left Content */}
          <motion.div
            variants={shouldReduceMotion ? undefined : container}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
            className="flex flex-col justify-center"
          >
            <motion.span
              variants={item}
              className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-pale"
            >
              Welcome to Emeriverse
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]"
            >
              A <span className="text-gold-pale">Universe</span> of Learning,
              <br />
              One Concept at a Time.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg"
            >
              Explore Emeribe's growing library of Easy Learning Flash Cards -
              practical, easy-to-follow books on English grammar, idioms,
              vocabulary, and general knowledge, built for learners of every
              age.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                variant="primary"
                size="lg"
                href="#books"
                icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
              >
                Explore My Books
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                href="#about"
                icon={<GraduationCap className="h-4 w-4" strokeWidth={2} />}
                iconPosition="left"
              >
                Meet the Author
              </Button>
            </motion.div>

            <motion.dl
              variants={item}
              className="mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-x-8"
            >
              {STATS.map((stat) => (
                <div key={stat.id}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-medium text-white">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-snug tracking-wide text-white/70">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Empty right column for spacing */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
