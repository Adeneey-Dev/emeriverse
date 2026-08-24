import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Heart, Share2, LockKeyhole } from "lucide-react";
import type { Feature } from "../../types";

const FEATURES: (Feature & { icon: typeof BookOpen })[] = [
  {
    id: "read",
    title: "Read Online",
    description: "Enjoy a seamless reading experience directly on the website.",
    icon: BookOpen,
  },
  {
    id: "like",
    title: "Like & Comment",
    description: "Share your thoughts, like stories, and engage with the community.",
    icon: Heart,
  },
  {
    id: "share",
    title: "Share Stories",
    description: "Share your favorite stories with friends and spread the inspiration.",
    icon: Share2,
  },
  {
    id: "premium",
    title: "Premium Access",
    description: "Unlock exclusive content, premium stories, and special benefits.",
    icon: LockKeyhole,
  },
];

export function FeatureStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-b border-cream-line bg-cream" aria-label="What you can do here">
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
              className="group relative flex flex-col items-start gap-4 border-cream-line pl-0 sm:pr-4 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-deep text-gold transition-colors duration-200 group-hover:bg-gold group-hover:text-cream">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-charcoal">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">{feature.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
