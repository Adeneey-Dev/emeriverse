import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";

interface InkStrokeProps {
  className?: string;
  color?: string;
  width?: number;
}

/**
 * The page's signature mark: a single hand-drawn ink stroke that draws
 * itself in whenever it scrolls into view. Used under eyebrow labels
 * throughout the page in place of a generic straight-line rule, echoing
 * a pen underlining a word on paper.
 */
export function InkStroke({ className, color = "var(--color-gold)", width = 64 }: InkStrokeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      width={width}
      height="10"
      viewBox="0 0 64 10"
      fill="none"
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      <motion.path
        d="M1.5 6.2C10 3 20 2 32 4.5C44 7 54 6.5 62.5 3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.7, ease: "easeInOut", delay: 0.15 }
        }
      />
    </svg>
  );
}
