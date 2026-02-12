import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { FlowProvider } from "@/context/FlowContext";
import { LuxuryWatermark } from "@/components/LuxuryWatermark";
import { PrestigeToggle } from "@/components/PrestigeToggle";
import { FeedbackWidget } from "@/components/FeedbackWidget";

// Premium serif font for headlines — variable for flexible weight control
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// Clean sans-serif for body text
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Ultra-luxury display font for hero moments
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#020202',
};

export const metadata: Metadata = {
  title: "PropHit | Premium Real Estate Participation",
  description: "Your exclusive portal to premium real estate investments in India. Secured, seamless, and institutional-grade.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PropHit',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans">
        {/* Warm Ambient Gold Aurora — Enhanced: 6 orbs, slower movement */}
        <div className="aurora-ambient" aria-hidden="true" />

        {/* Architectural Diamond Grid Background */}
        <div className="grid-background" aria-hidden="true" />

        {/* Subtle Noise Texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Floating Gold Particles — Enhanced: 8 particles with dust motes */}
        <div className="luxury-particles" aria-hidden="true">
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle" />
          <span className="luxury-particle luxury-particle-dust" />
          <span className="luxury-particle luxury-particle-dust" />
        </div>

        {/* Luxury Building Watermark */}
        <LuxuryWatermark />

        {/* Flow Context Provider */}
        <FlowProvider>
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
        </FlowProvider>

        {/* GLOBAL PERSISTENT ELEMENTS — Must stay in root layout to appear on ALL pages (current + future).
            See CLAUDE.md for details. Do NOT move these into nested layouts. */}
        <PrestigeToggle />
        <FeedbackWidget />
      </body>
    </html>
  );
}
