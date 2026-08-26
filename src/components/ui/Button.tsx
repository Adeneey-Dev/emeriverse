import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "outline-dark" | "outline-light" | "ghost-light";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-deep active:bg-gold-deep shadow-[0_1px_0_0_rgba(0,0,0,0.15)]",
  "outline-dark":
    "border border-fg/25 text-fg hover:border-fg hover:bg-fg/[0.03]",
  "outline-light":
    "border border-cream/35 text-cream hover:border-cream hover:bg-cream/10",
  "ghost-light": "text-cream hover:text-gold-pale",
};

const sizeClasses: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-sm",
};

/**
 * Shared CTA button used across the landing page. Renders a <button> by
 * default, or an <a> when an `href` prop is supplied — the visual style
 * stays identical either way.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-wide transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, target, rel } = rest as ButtonAsLink;
    return (
      <a href={href} target={target} rel={rel} className={cn("group", classes)}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cn("group", classes)} {...buttonRest}>
      {content}
    </button>
  );
}
