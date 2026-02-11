'use client';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#1a1a1a';
  const goldColor = '#D4AF37';

  return (
    <svg
      viewBox="0 0 260 48"
      className={className}
      aria-label="PropHit Logo"
      fill="none"
    >
      {/* P */}
      <text
        x="0"
        y="37"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="36"
        letterSpacing="0.04em"
        fill={textColor}
      >
        P
      </text>

      {/* ₹ (Rupee symbol — gold accent, replacing R) */}
      <text
        x="24"
        y="37"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="36"
        letterSpacing="0.04em"
        fill={goldColor}
      >
        ₹
      </text>

      {/* OPHIT */}
      <text
        x="50"
        y="37"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="36"
        letterSpacing="0.04em"
        fill={textColor}
      >
        OPHIT
      </text>

      {/* Growth Arrows — 4 upward chevrons, gaps increase for exponential growth */}
      <g transform="translate(200, 3)">
        {/* Arrow 1 — bottom (starts at text midpoint) */}
        <path d="M10 19 L0 24 L4 24 L10 21 L16 24 L20 24 Z" fill={textColor} />
        {/* Arrow 2 */}
        <path d="M10 13 L0 18 L4 18 L10 15 L16 18 L20 18 Z" fill={textColor} />
        {/* Arrow 3 (gold — profit zone) */}
        <path d="M10 6 L0 11 L4 11 L10 8 L16 11 L20 11 Z" fill={goldColor} />
        {/* Arrow 4 — top (gold, leading growth) */}
        <path d="M10 -2 L0 3 L4 3 L10 0 L16 3 L20 3 Z" fill={goldColor} />
      </g>
    </svg>
  );
}

// Simplified Logo Icon for smaller sizes (favicon, mobile header)
export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-label="PropHit"
      fill="none"
    >
      {/* P₹ compact mark */}
      <text
        x="2"
        y="30"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="#FFFFFF"
      >
        P
      </text>
      <text
        x="18"
        y="30"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="#D4AF37"
      >
        ₹
      </text>
    </svg>
  );
}
