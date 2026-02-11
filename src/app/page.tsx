'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { PHONE_REGEX } from '@/lib/constants';
import { SocialProofModal } from '@/components/SocialProofModal';

// Geo-personalization: deterministic city from phone digits
const CITIES = ['Mumbai', 'Bangalore', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Gurugram', 'Kochi'];

function getCityFromPhone(phone: string): string | null {
  if (phone.length < 4) return null;
  const sum = phone.split('').reduce((acc, d) => acc + parseInt(d || '0', 10), 0);
  return CITIES[sum % CITIES.length];
}


export default function PhonePage() {
  const router = useRouter();
  const { state, setPhone } = useFlow();
  const [phone, setPhoneLocal] = useState(state.phone);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enhanced feature state
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [showWhyVerify, setShowWhyVerify] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);

  const detectedCity = getCityFromPhone(phone);

  // Check returning user on mount
  useEffect(() => {
    const visited = localStorage.getItem('prophit-user-visited');
    if (visited) setIsReturningUser(true);
  }, []);

  // Validate phone on change
  useEffect(() => {
    setIsValid(PHONE_REGEX.test(phone));
  }, [phone]);

  // Escape key handler for modals
  const handleSocialProofComplete = useCallback(() => {
    setShowSocialProof(false);
    router.push('/verify');
  }, [router]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showWhyVerify) setShowWhyVerify(false);
        if (showSocialProof) handleSocialProofComplete();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showWhyVerify, showSocialProof, handleSocialProofComplete]);

  // Scroll lock when social proof modal is open
  useEffect(() => {
    if (showSocialProof) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showSocialProof]);

  // Scroll lock when why-verify modal is open
  useEffect(() => {
    if (showWhyVerify) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showWhyVerify]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneLocal(value);
  };

  const handleContinue = async () => {
    if (!isValid || isLoading) return;

    setIsLoading(true);
    setPhone(phone);

    // Mark as visited for tiered onboarding
    localStorage.setItem('prophit-user-visited', 'true');

    // Brief loading, then show social proof modal
    await new Promise(resolve => setTimeout(resolve, 300));
    setShowSocialProof(true);
    // isLoading stays true so button remains disabled
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && !isLoading) {
      handleContinue();
    }
  };

  // Kinetic text helper
  const headingText = isReturningUser
    ? 'Welcome Back, Elite Member'
    : 'Your Exclusive Gateway to Premium Real Estate Deals';
  const headingWords = headingText.split(' ');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 safe-top safe-bottom relative overflow-hidden">
      {/* Login Aurora Gradient */}
      <div className="login-aurora" aria-hidden="true" />

      {/* Hero Video Background */}
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className={`hero-video ${isVideoLoaded ? 'hero-video-loaded' : ''}`}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />

        <button
          onClick={() => {
            if (videoRef.current) {
              if (isVideoPlaying) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
              }
              setIsVideoPlaying(!isVideoPlaying);
            }
          }}
          className="hero-video-toggle"
          aria-label={isVideoPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isVideoPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Content Container — centered on all screens */}
      <div className="login-form-container w-full max-w-sm sm:max-w-md relative z-10">
        <div className="login-form-inner flex flex-col items-center page-transition">
        {/* Logo */}
        <Logo className="w-56 h-10 mb-6" variant="dark" />

        {/* Gold accent separator */}
        <div className="gold-line w-16 mb-8" />

        {/* Kinetic Typography Heading */}
        <h1 className="text-hero text-center text-white mb-2 heading-luxury" style={{ perspective: '600px' }}>
          {headingWords.map((word, i) => (
            <span
              key={i}
              className="kinetic-word"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              {word}{i < headingWords.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>

        {/* Geo-personalized Subheading */}
        <p className="text-text-secondary text-center mb-10" aria-live="polite" style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.8s forwards' }}>
          {detectedCity
            ? <>Discover Prime <span className="text-gold font-medium">{detectedCity}</span> Properties</>
            : 'Enter your mobile number to begin'
          }
        </p>

        {/* Phone Input */}
        <div className="w-full mb-6">
          <div className={`phone-input-group ${isValid ? 'valid' : ''}`}>
            {/* Country Code Prefix */}
            <div className="phone-prefix">
              <span className="text-base sm:text-lg leading-none">{'\u{1F1EE}\u{1F1F3}'}</span>
              <span className="font-medium text-sm text-text-secondary">+91</span>
              <div className="phone-divider" />
            </div>

            {/* Input */}
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              placeholder="9876543210"
              autoFocus
              className="phone-input-field"
              aria-label="Mobile number"
            />

            {/* Valid Indicator */}
            {isValid && (
              <div className="phone-valid-icon">
                <svg className="w-5 h-5 text-success success-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          {/* Helper Text + Why Verify Link */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <p className="text-text-muted text-caption text-center">
              Encrypted &amp; never shared
            </p>
            <span className="text-text-muted text-caption">&middot;</span>
            <button
              onClick={() => setShowWhyVerify(true)}
              className="text-gold text-caption hover:underline underline-offset-2 transition-colors py-1 px-1"
              aria-haspopup="dialog"
            >
              Why verify?
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!isValid || isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </span>
          ) : (
            'Continue'
          )}
        </button>

        {/* VIP Preview Opt-in (new users only) */}
        {!isReturningUser && (
          <p className="text-text-muted text-caption mt-4 text-center">
            <span className="text-gold font-medium">VIP Preview:</span> Curated property alerts post-login
          </p>
        )}

        {/* Tagline */}
        <p className="text-text-muted text-caption mt-6 text-center max-w-xs">
          Premium Real Estate Deals, Exclusively Curated
        </p>

        {/* Social Proof */}
        <p className="text-text-secondary text-caption mt-4 text-center animate-fade-in">
          Join <span className="text-gold font-semibold">1,000+</span> Elite Deals
        </p>

        {/* Trust Indicators */}
        <div className="gold-line w-32 mt-6" />

        {/* Trust Badges — Staggered Entrance */}
        <div className="trust-badges mt-6">
          <div className="flex items-center justify-center gap-5 flex-wrap">
            <div className="flex items-center gap-1.5 trust-badge-item">
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-text-muted text-xs tracking-wide uppercase">Bank-Grade Encryption</span>
            </div>

            <div className="flex items-center gap-1.5 trust-badge-item">
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-text-muted text-xs tracking-wide uppercase">Institutional Partners</span>
            </div>
          </div>

          <p className="text-text-muted text-xs text-center mt-4 italic trust-badge-item">
            <span className="text-gold opacity-60">&ldquo;</span>Transformed my portfolio in just 6 months<span className="text-gold opacity-60">&rdquo;</span>
            <span className="text-text-secondary not-italic"> &mdash; Rajesh M., Mumbai</span>
          </p>
        </div>
        </div>{/* close login-form-inner */}
      </div>{/* close login-form-container */}

      {/* Social Proof Modal */}
      {showSocialProof && (
        <SocialProofModal
          onComplete={handleSocialProofComplete}
          isReturning={isReturningUser}
        />
      )}

      {/* Why Phone Verification Modal */}
      {showWhyVerify && (
        <>
          <div className="why-verify-backdrop" onClick={() => setShowWhyVerify(false)} />
          <div className="why-verify-modal" role="dialog" aria-modal="true" aria-label="Why phone verification">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Why Phone Verification?</h3>
              <button
                onClick={() => setShowWhyVerify(false)}
                className="text-text-muted hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-xs text-white font-medium">256-Bit Encryption</p>
                  <p className="text-xs text-text-muted">Your OTP is transmitted with bank-grade encryption</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-xs text-white font-medium">SEBI-Compliant KYC</p>
                  <p className="text-xs text-text-muted">Phone verification is part of regulatory compliance</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <div>
                  <p className="text-xs text-white font-medium">Zero Data Sharing</p>
                  <p className="text-xs text-text-muted">Your number is never shared with third parties</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs text-white font-medium">Verified Access Only</p>
                  <p className="text-xs text-text-muted">Ensures only legitimate investors access the platform</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
