/**
 * Luxury Watermark - Abstract building silhouette
 * Creates a subtle premium real estate atmosphere
 * Refined with softer edges and architectural detail
 */
export function LuxuryWatermark() {
  return (
    <div className="luxury-watermark" aria-hidden="true">
      <svg
        viewBox="0 0 300 300"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tall central tower with tapered top */}
        <rect x="125" y="50" width="50" height="250" rx="1" />

        {/* Left building cluster */}
        <rect x="35" y="130" width="36" height="170" rx="1" />
        <rect x="78" y="100" width="30" height="200" rx="1" />

        {/* Right building cluster */}
        <rect x="192" y="110" width="40" height="190" rx="1" />
        <rect x="245" y="160" width="30" height="140" rx="1" />

        {/* Accent spire on central tower */}
        <polygon points="150,20 143,50 157,50" />

        {/* Window patterns (subtle horizontal lines) */}
        <rect x="130" y="65" width="16" height="2" opacity="0.2" />
        <rect x="154" y="65" width="16" height="2" opacity="0.2" />
        <rect x="130" y="85" width="16" height="2" opacity="0.2" />
        <rect x="154" y="85" width="16" height="2" opacity="0.2" />
        <rect x="130" y="105" width="16" height="2" opacity="0.15" />
        <rect x="154" y="105" width="16" height="2" opacity="0.15" />
        <rect x="130" y="125" width="16" height="2" opacity="0.1" />
        <rect x="154" y="125" width="16" height="2" opacity="0.1" />
      </svg>
    </div>
  );
}
