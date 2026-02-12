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

      {/* Growth Arrows — 2-column staircase (matches brand logo) */}
      <g transform="translate(200, 3)">
        {/* Left column — base growth */}
        <path d="M13 28 L0 36 L5 36 L13 31 L21 36 L26 36 Z" fill={textColor} />
        <path d="M13 18 L0 26 L5 26 L13 21 L21 26 L26 26 Z" fill={textColor} />
        {/* Right column — stepped right, exponential profit */}
        <path d="M37 8 L24 16 L29 16 L37 11 L45 16 L50 16 Z" fill={goldColor} />
        <path d="M37 -2 L24 6 L29 6 L37 1 L45 6 L50 6 Z" fill={goldColor} />
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
