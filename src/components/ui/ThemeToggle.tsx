// ThemeToggle.tsx (updated for better visibility)
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../providers/useTheme";
import { cn } from "../../lib/cn";

interface ThemeToggleProps {
  size?: "sm" | "md";
  tone?: "light" | "dark";
  className?: string;
}

export function ThemeToggle({
  size = "md",
  tone = "light",
  className,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const shouldReduceMotion = useReducedMotion();

  const dimensions = size === "sm" ? "h-10 w-10" : "h-9 w-9";
  const iconSize = size === "sm" ? "h-[18px] w-[18px]" : "h-[17px] w-[17px]";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full transition-colors duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
        tone === "dark"
          ? "border border-ink/15 bg-cream/55 text-ink/75 backdrop-blur-sm hover:border-gold-deep/60 hover:bg-gold/15 hover:text-gold-deep"
          : "border border-white/20 text-white/70 backdrop-blur-sm hover:border-gold/60 hover:bg-gold/10 hover:text-gold-pale",
        dimensions,
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, rotate: -90, scale: 0.5 }
          }
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, rotate: 90, scale: 0.5 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.25,
            ease: "easeOut",
          }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className={iconSize} strokeWidth={1.75} />
          ) : (
            <Moon className={iconSize} strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
