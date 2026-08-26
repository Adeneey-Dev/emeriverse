import type { ReactNode } from "react";
import { InkStroke } from "./InkStroke";
import { cn } from "../../lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  heading: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Consistent eyebrow + heading + description block used to open every
 * major section, keeping vertical rhythm and type scale uniform.
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={cn(isCentered && "text-center mx-auto", className)}>
      <span className="eyebrow">{eyebrow}</span>
      <InkStroke className={cn("mt-1.5 mb-4 block", isCentered && "mx-auto")} />
      <h2
        className={cn(
          "font-display font-medium leading-[1.1] text-3xl sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-fg" : "text-cream",
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-base leading-relaxed",
            tone === "dark" ? "text-fg-muted" : "text-cream/75",
            isCentered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
