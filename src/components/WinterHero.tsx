'use client';

/**
 * WinterHero — Full-screen immersive winter background
 * 3 Animations:
 *   1. Aurora gradient (animated mesh gradient simulating northern lights)
 *   2. Snowfall particles (pure CSS snow drifting down)
 *   3. Parallax mountain silhouettes (layered SVG mountains with gentle motion)
 */
export function WinterHero() {
  return (
    <div className="winter-hero" aria-hidden="true">
      {/* Animation 1: Aurora Gradient */}
      <div className="winter-aurora" />

      {/* Animation 2: Snowfall */}
      <div className="winter-snow">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="snowflake" />
        ))}
      </div>

      {/* Animation 3: Parallax Mountain Silhouettes */}
      <div className="winter-mountains">
        {/* Far mountain layer (slowest) */}
        <svg
          className="mountain-layer mountain-far"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,320 L0,240 Q120,140 240,200 Q360,120 480,180 Q600,80 720,160 Q840,60 960,140 Q1080,100 1200,180 Q1320,120 1440,200 L1440,320 Z"
            fill="rgba(201,169,98,0.06)"
          />
        </svg>

        {/* Mid mountain layer */}
        <svg
          className="mountain-layer mountain-mid"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,320 L0,260 Q180,160 360,220 Q480,140 600,200 Q720,100 840,180 Q960,120 1080,200 Q1200,140 1320,220 L1440,260 L1440,320 Z"
            fill="rgba(201,169,98,0.04)"
          />
        </svg>

        {/* Near mountain layer (fastest, darkest) */}
        <svg
          className="mountain-layer mountain-near"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,320 L0,280 Q240,200 480,250 Q600,180 720,230 Q840,160 960,220 Q1080,190 1200,250 Q1320,210 1440,270 L1440,320 Z"
            fill="rgba(10,10,10,0.5)"
          />
        </svg>
      </div>

      {/* Frost vignette overlay */}
      <div className="winter-frost" />
    </div>
  );
}
