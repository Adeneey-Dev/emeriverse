import { Lock } from "lucide-react";
import { cn } from "../../lib/cn";
import type { AccessType } from "../../types";

interface BadgeProps {
  type: AccessType;
  className?: string;
}

/**
 * Access-level badge. Free/premium status is communicated by both label
 * and icon (not color alone) to stay accessible for color-blind readers.
 */
export function Badge({ type, className }: BadgeProps) {
  const isPremium = type === "premium";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
        isPremium ? "bg-ink text-gold-pale" : "bg-cream text-charcoal",
        className,
      )}
    >
      {isPremium && <Lock className="h-3 w-3" aria-hidden="true" strokeWidth={2.25} />}
      {isPremium ? "Premium" : "Free"}
    </span>
  );
}
