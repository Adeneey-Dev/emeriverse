import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users, BookOpen, Star, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { HeroIllustration } from "./HeroIllustration";
import type { Stat } from "../../types";

const STATS: (Stat & { icon: typeof BookOpen })[] = [
  { id: "books", label: "Books Published", value: "12+", icon: BookOpen },
  { id: "readers", label: "Happy Readers", value: "25K+", icon: Users },
  { id: "rating", label: "Average Rating", value: "4.8", icon: Star },
  { id: "comments", label: "Comments", value: "10K+", icon: MessageCircle },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <HeroIllustration />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
      </div>

      <div className="container-page relative grid min-h-[92vh] grid-cols-1 items-center gap-12 pt-28 pb-16 lg:min-h-[88vh] lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-20">
        <motion.div
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "show"}
        >
          <motion.span variants={item} className="eyebrow">
            Welcome to My World
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-4 max-w-xl font-display text-4xl font-medium leading-[1.08] text-cream sm:text-5xl lg:text-[3.4rem]"
          >
            Stories That Inspire, <span className="text-gold-pale">Words</span> That Connect.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg">
            Explore my collection of books, short stories, and writings. Join a community of
            readers who love thought-provoking stories and meaningful conversations.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" size="lg" href="#books" icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}>
              Explore My Books
            </Button>
            <Button variant="outline-light" size="lg" href="#community" icon={<Users className="h-4 w-4" strokeWidth={2} />} iconPosition="left">
              Join the Community
            </Button>
          </motion.div>

          <motion.dl variants={item} className="mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-x-8">
            {STATS.map((stat) => (
              <div key={stat.id}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex items-center gap-1.5 font-display text-2xl font-medium text-cream">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs tracking-wide text-cream/50">{stat.label}</dd>
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
          <span className="font-display text-4xl leading-none text-gold" aria-hidden="true">
            &ldquo;
          </span>
          <p className="mt-1 font-display text-lg italic leading-relaxed text-cream/90">
            Writing is not just my passion, it&rsquo;s my way of connecting hearts and minds.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-cream/15" />
            <span className="text-sm text-cream/60">James Whitaker</span>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
