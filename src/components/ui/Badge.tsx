import { Lock } from "lucide-react";
import { cn } from "../../lib/cn";
import type { AccessType } from "../../types";

interface BadgeProps {
  type: AccessType;
  className?: string;
}

export function Badge({ type, className }: BadgeProps) {
  const isPremium = type === "premium";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] shadow-md",
        isPremium ? "bg-gold text-ink" : "bg-white/95 text-emerald-700",
        className,
      )}
    >
      {isPremium ? (
        <Lock className="h-3 w-3" aria-hidden="true" strokeWidth={2.5} />
      ) : (
        <span
          className="h-1.5 w-1.5 rounded-full bg-emerald-500"
          aria-hidden="true"
        />
      )}
      {isPremium ? "Premium" : "Free"}
    </span>
  );
}
