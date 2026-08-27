import { motion, useReducedMotion } from "framer-motion";
import { Library, Users, Share2, ShoppingBag } from "lucide-react";
import type { Feature } from "../../types";

const FEATURES: (Feature & { icon: typeof Library })[] = [
  {
    id: "browse",
    title: "Browse the Catalogue",
    description: "Explore a growing library of flash cards and educational books, organized by subject.",
    icon: Library,
  },
  {
    id: "community",
    title: "Learn Together",
    description: "Join a community of parents, teachers, and learners who use these resources every day.",
    icon: Users,
  },
  {
    id: "share",
    title: "Share Resources",
    description: "Share your favorite titles with fellow learners, classrooms, and homeschool groups.",
    icon: Share2,
  },
  {
    id: "own",
    title: "Own Your Copy",
    description: "Every title is available on Amazon in Kindle, paperback, or hardcover.",
    icon: ShoppingBag,
  },
];

export function FeatureStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-b border-surface-line bg-surface" aria-label="What you can do here">
      <div className="container-page grid grid-cols-1 gap-x-6 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:py-16">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative flex flex-col items-start gap-4 border-surface-line pl-0 sm:pr-4 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-alt text-gold transition-colors duration-200 group-hover:bg-gold group-hover:text-cream">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-fg">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{feature.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
