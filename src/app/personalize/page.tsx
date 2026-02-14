'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { Button } from '@/components/ui/button';

// Geo-personalization: deterministic city from phone digits (same logic as login page)
const CITIES = ['Mumbai', 'Bangalore', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Gurugram', 'Kochi'];

function getCityFromPhone(phone: string): string | null {
  if (phone.length < 4) return null;
  const sum = phone.split('').reduce((acc, d) => acc + parseInt(d || '0', 10), 0);
  return CITIES[sum % CITIES.length];
}

// Personalized welcome messages — luxury concierge tone
const WELCOME_MESSAGES = [
  'Your bespoke PropHit experience has been curated exclusively for you\u2014let\u2019s unveil the possibilities.',
  'Step into your private realm at PropHit. Tailored insights and elite opportunities await your command.',
  'A world of luxurious discoveries, handpicked to elevate your journey. Ready to begin?',
  'As our distinguished guest, PropHit is now yours. Indulge in the exclusive features designed just for you.',
  'Your elite PropHit odyssey starts here. Personalized luxuries and hidden gems are at your fingertips.',
];

export default function PersonalizePage() {
  const router = useRouter();
  const { state, setName } = useFlow();
  const [name, setNameLocal] = useState(state.displayName);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const city = getCityFromPhone(state.phone);

  // Redirect if not verified
  useEffect(() => {
    if (!state.isVerified) {
      router.replace('/');
    }
  }, [state.isVerified, router]);

  const handleSkipWelcome = useCallback(() => {
    // Keep overlay visible during navigation to prevent form flash
    router.replace('/dashboard');
  }, [router]);

  // Auto-navigate after welcome animation (4s)
  useEffect(() => {
    if (!showWelcome) return;
    const timer = setTimeout(handleSkipWelcome, 2500);
    return () => clearTimeout(timer);
  }, [showWelcome, handleSkipWelcome]);

  // Escape key to skip welcome
  useEffect(() => {
    if (!showWelcome) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkipWelcome();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showWelcome, handleSkipWelcome]);

  // Scroll lock when welcome overlay is shown
  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showWelcome]);

  const handleContinue = async () => {
    const trimmedName = name.trim();
    if (!trimmedName || isLoading) return;

    setIsLoading(true);
    setName(trimmedName);

    // Pick a random welcome message
    const msg = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
    setWelcomeMessage(msg);

    // Brief loading, then reveal welcome
    await new Promise(resolve => setTimeout(resolve, 400));
    setIsLoading(false);
    setShowWelcome(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim() && !isLoading) {
      handleContinue();
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isValid = name.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 safe-top safe-bottom relative overflow-hidden">
      {/* Page Aurora (consistent with login) */}
      <div className="login-aurora" aria-hidden="true" />

      {/* Back Button — Glass Styling */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 z-20 safe-top p-2.5 rounded-xl glass-card border border-white/[0.06] text-text-muted hover:text-gold hover:border-gold/20 transition-all duration-300"
        aria-label="Go back"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Content Container — Glass Card Hero */}
      <div className="glass-card-hero w-full max-w-sm sm:max-w-md relative z-10 px-8 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col items-center page-transition">
          {/* Logo */}
          <Logo className="w-56 h-10 mb-10" variant="dark" />

          {/* EXCLUSIVE ACCESS Micro-Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-micro text-gold/70 tracking-[0.25em] uppercase">Exclusive Access</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Heading — Cormorant Garamond */}
          <h1 className="text-title text-center text-white mb-2 font-display">
            How Shall We Address You?
          </h1>
          <p className="text-text-secondary text-center mb-8">
            This will personalize your experience
          </p>

          {/* Name Input — Gold Underline */}
          <div className="w-full mb-6">
            <div className="input-gold-underline-wrapper">
              <input
                type="text"
                value={name}
                onChange={(e) => setNameLocal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your name"
                autoFocus
                className={`input-gold-underline w-full text-center text-lg ${isValid ? 'valid' : ''}`}
                aria-label="Your name"
                maxLength={30}
              />
            </div>

            {/* Live Name Preview — 2x Gold Serif */}
            {isValid && !showWelcome && (
              <p className="font-display text-2xl text-gold/80 text-center mt-6 animate-fade-in font-light tracking-wide">
                {name.trim()}
              </p>
            )}

            {/* Character Count */}
            <p className="text-text-muted text-caption mt-3 text-center">
              {name.length}/30 characters
            </p>
          </div>

          {/* Continue Button — Luxury Variant */}
          <Button
            onClick={handleContinue}
            disabled={!isValid || isLoading}
            variant="luxury"
            size="xl"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Setting up...
              </span>
            ) : (
              'Get Started'
            )}
          </Button>

          {/* Trust Line */}
          <div className="gold-line w-24 mt-8" />
        </div>
      </div>

      {/* ================================
          PERSONALIZED WELCOME OVERLAY
          Soft Glow Reveal + Cascade Unveil
          ================================ */}
      {showWelcome && (
        <div
          className="welcome-overlay"
          onClick={handleSkipWelcome}
          role="dialog"
          aria-modal="true"
          aria-label="Personalized welcome message"
        >
          {/* Enhanced Ambient Sapphire-Gold Glow */}
          <div className="welcome-glow-enhanced" aria-hidden="true" />

          {/* Cinematic Light Sweep */}
          <div className="welcome-light-sweep" aria-hidden="true" />

          {/* Floating Gold Particles — More particles for richer effect */}
          <div className="welcome-particles" aria-hidden="true">
            <span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>

          {/* Welcome Content — Glass Card Hero Container */}
          <div className="glass-card-hero px-8 py-10 sm:px-12 sm:py-14 max-w-lg mx-auto" onClick={e => e.stopPropagation()}>
            <div className="welcome-content" style={{ position: 'relative', background: 'none', backdropFilter: 'none', WebkitBackdropFilter: 'none', border: 'none', boxShadow: 'none' }}>
              {/* Welcome Badge */}
              <div className="welcome-badge">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>WELCOME TO PROPHIT</span>
              </div>

              {/* Name — The Hero Moment (Display XL + Shimmer Gold) */}
              <h2 className="font-display text-display-xl text-shimmer-gold text-center">
                {name.trim()}
              </h2>

              {/* City Tag (geo-personalized if phone available) */}
              {city && (
                <p className="welcome-city">
                  From the vibrant streets of {city}
                </p>
              )}

              {/* Gold Accent Line (draws itself in) */}
              <div className="welcome-line" aria-hidden="true" />

              {/* Personalized Message (cascade fade in) */}
              <p className="welcome-message">
                {welcomeMessage}
              </p>

              {/* Call to Action Hint */}
              <p className="welcome-hint">
                Tap anywhere to explore
                <svg className="inline-block w-4 h-4 ml-1 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
