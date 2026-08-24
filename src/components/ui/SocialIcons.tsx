import type { SVGProps } from "react";

/**
 * Minimal, dependency-free brand marks. lucide-react no longer ships
 * trademarked brand icons, so these small outline glyphs stand in —
 * swap for an icon set of your choice later if preferred.
 */

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path d="M14 9h2V6h-2c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9c0-.28.22-.5.5-.5H15" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M4 3.5h3.6l4 5.4 4.6-5.4H18l-6.2 7.3L18.6 20.5H15l-4.3-5.8-4.9 5.8H3.2l6.6-7.8L4 3.5Z" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="M10.5 9.6 15 12l-4.5 2.4V9.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
