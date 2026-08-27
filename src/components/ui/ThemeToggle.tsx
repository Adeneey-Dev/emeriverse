import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../providers/useTheme";
import { cn } from "../../lib/cn";

interface ThemeToggleProps {
  size?: "sm" | "md";
  className?: string;
}

/**
 * Light/dark toggle used in both the desktop navbar and the mobile
 * drawer. A visible circular hit target + border/background color
 * response makes the control read as interactive even before it's
 * pressed; the icon cross-fades and rotates in on toggle so the state
 * change itself is unmistakable, not just a static icon swap.
 */
export function ThemeToggle({ size = "md", className }: ThemeToggleProps) {
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
        "relative flex shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/75",
        "transition-colors duration-200 ease-out",
        "hover:border-gold/60 hover:bg-gold/10 hover:text-gold-pale",
        "active:bg-gold/20",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
        dimensions,
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={shouldReduceMotion ? undefined : { opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
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
