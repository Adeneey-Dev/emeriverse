import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/Button";
import heroImage from "../../assets/hero-student.jpg";

const STATS = [
  { id: "books", label: "Books Published", value: "10+", icon: BookOpen },
  { id: "range", label: "Active Since 2022", value: "2022–25", icon: Sparkles },
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
    <section id="home" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-[70%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="container-page relative grid min-h-[92vh] grid-cols-1 items-center gap-12 pt-28 pb-16 lg:min-h-[88vh] lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-20">
        <motion.div
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "show"}
        >
          <motion.span variants={item} className="eyebrow">
            Welcome to Emeriverse
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-4 max-w-xl font-display text-4xl font-medium leading-[1.08] text-cream sm:text-5xl lg:text-[3.3rem]"
          >
            A <span className="text-gold-pale">Universe</span> of Learning, One
            Concept at a Time.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            Explore Ifeanyi Emeribe&rsquo;s growing library of Easy Learning
            Flash Cards - practical, easy-to-follow books on English grammar,
            idioms, vocabulary, and general knowledge, built for learners of
            every age.
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
                <dd className="font-display text-2xl font-medium text-cream">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug tracking-wide text-cream/50">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.aside
          initial={shouldReduceMotion ? undefined : { opacity: 0, x: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm rounded-sm border border-cream/12 bg-ink-soft/70 p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm lg:ml-auto lg:mr-0"
        >
          <span
            className="font-display text-4xl leading-none text-gold"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="mt-1 font-display text-lg italic leading-relaxed text-cream/90">
            Learning becomes easier when knowledge is made simple.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-cream/15" />
            <span className="text-sm text-cream/60">Ifeanyi Emeribe</span>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
