import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Clock, Gem } from "lucide-react";
import { Button } from "../ui/Button";
import { InkStroke } from "../ui/InkStroke";

const BENEFITS = [
  { icon: Sparkles, label: "Exclusive Books & Stories" },
  { icon: Clock, label: "Early Access" },
  { icon: Gem, label: "Members-Only Content" },
];

export function MembershipCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="membership" className="relative overflow-hidden bg-ink py-20 lg:py-28" aria-labelledby="membership-heading">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(199,154,75,0.18), transparent 45%), radial-gradient(circle at 85% 85%, rgba(199,154,75,0.12), transparent 45%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="container-page relative flex flex-col items-center text-center"
      >
        <span className="eyebrow">Membership</span>
        <InkStroke className="mt-1.5 mb-5" />

        <h2 id="membership-heading" className="max-w-2xl font-display text-3xl font-medium leading-[1.15] text-cream sm:text-4xl lg:text-[2.75rem]">
          Read More. Discover More. Become Part of the Story.
        </h2>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
          Join the premium community and unlock exclusive stories, early access to new
          releases, and special content created for dedicated readers.
        </p>

        <ul className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-10">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <li key={benefit.label} className="flex items-center gap-3 text-cream/85">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium">{benefit.label}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Button variant="primary" size="lg" href="#membership">
            Explore Membership
          </Button>
          <span className="text-xs text-cream/45">Cancel anytime.</span>
        </div>
      </motion.div>
    </section>
  );
}
