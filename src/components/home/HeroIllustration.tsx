/**
 * Hand-composed SVG scene standing in for the "author writing at a desk"
 * photograph called for in the brief. Built from shapes rather than a
 * stock photo so the hero has zero external dependencies and a look
 * that's specific to this page rather than generic stock imagery.
 */
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 640 720"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of an open book resting beside a lit desk lamp"
    >
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#c79a4b" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#8c6423" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#14110e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="deskFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f1a15" stopOpacity="0" />
          <stop offset="100%" stopColor="#0c0a08" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="pageShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f1e7d3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f1e7d3" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width="640" height="720" fill="#14110e" />
      <rect width="640" height="720" fill="url(#lampGlow)" />

      {/* bookshelf silhouette, back wall */}
      <g opacity="0.35">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={i}
            x={40 + i * 40}
            y={70 + ((i * 37) % 50)}
            width={26}
            height={170 - ((i * 23) % 60)}
            fill="#0c0a08"
            stroke="#2a2118"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* desk surface */}
      <rect x="0" y="520" width="640" height="200" fill="#1c1712" />
      <rect x="0" y="500" width="640" height="40" fill="url(#deskFade)" />

      {/* lamp */}
      <g>
        <line x1="470" y1="120" x2="470" y2="270" stroke="#3a2f22" strokeWidth="6" strokeLinecap="round" />
        <path d="M430 100 L515 100 L490 150 L455 150 Z" fill="#2a2118" stroke="#c79a4b" strokeOpacity="0.5" />
        <ellipse cx="472" cy="150" rx="70" ry="34" fill="#c79a4b" opacity="0.18" />
      </g>

      {/* open book */}
      <g transform="translate(140,470)">
        <path d="M0 40 Q120 -10 240 40 L240 130 Q120 90 0 130 Z" fill="url(#pageShade)" />
        <path d="M240 40 Q360 -10 480 40 L480 130 Q360 90 240 130 Z" fill="url(#pageShade)" opacity="0.85" />
        <path d="M240 40 L240 130" stroke="#8c6423" strokeWidth="2" opacity="0.6" />
        {Array.from({ length: 5 }).map((_, i) => (
          <path
            key={`l-${i}`}
            d={`M${20 + i * 8} ${52 + i * 3} Q120 ${18 - i} 220 ${52 + i * 3}`}
            stroke="#6f6558"
            strokeWidth="1"
            fill="none"
            opacity="0.35"
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <path
            key={`r-${i}`}
            d={`M${260 + i * 8} ${52 + i * 3} Q360 ${18 - i} 460 ${52 + i * 3}`}
            stroke="#6f6558"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        ))}
      </g>

      {/* feather quill resting on the page */}
      <g transform="translate(300,430) rotate(28)">
        <path d="M0 0 C40 -10 70 -55 60 -110 C20 -95 -8 -50 0 0 Z" fill="#c79a4b" opacity="0.85" />
        <path d="M2 -4 L52 -95" stroke="#14110e" strokeWidth="1" opacity="0.4" />
        <line x1="0" y1="0" x2="18" y2="34" stroke="#3a2f22" strokeWidth="3" strokeLinecap="round" />
      </g>

      <rect width="640" height="720" fill="#0c0a08" opacity="0.28" />
    </svg>
  );
}
