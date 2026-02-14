'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { PHONE_REGEX } from '@/lib/constants';
import { SocialProofModal } from '@/components/SocialProofModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Geo-personalization: deterministic city from phone digits
const CITIES = ['Mumbai', 'Bangalore', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Gurugram', 'Kochi'];

function getCityFromPhone(phone: string): string | null {
  if (phone.length < 4) return null;
  const sum = phone.split('').reduce((acc, d) => acc + parseInt(d || '0', 10), 0);
  return CITIES[sum % CITIES.length];
}

// Animated counter stats
const STATS = [
  { label: 'Properties Listed', value: '120+' },
  { label: 'Elite Investors', value: '1,200+' },
  { label: 'Cities Covered', value: '8' },
];

export default function PhonePage() {
  const router = useRouter();
  const { state, setPhone } = useFlow();
  const [phone, setPhoneLocal] = useState(state.phone);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
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
        if (showSocialProof) handleSocialProofComplete();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showSocialProof, handleSocialProofComplete]);

  // Scroll lock when social proof modal is open
  useEffect(() => {
    if (showSocialProof) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showSocialProof]);

  // Autoplay fallback — handles browsers that block autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVideoPlaying(false);
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoPlaying(true))
        .catch(() => setIsVideoPlaying(false));
    }
  }, []);

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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && !isLoading) {
      handleContinue();
    }
  };

  // Kinetic text helper
  const headingText = isReturningUser
    ? 'Welcome Back, Elite Member'
    : 'Your Exclusive Gateway to Premium Real Estate';
  const headingWords = headingText.split(' ');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 safe-top safe-bottom relative overflow-hidden">
      {/* Login Aurora Gradient */}
      <div className="login-aurora" aria-hidden="true" />

      {/* Hero Video Background — Fixed with proper z-index */}
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className={`hero-video ${isVideoLoaded ? 'hero-video-loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          onPlaying={() => setIsVideoLoaded(true)}
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

      {/* Glass Card Content Container */}
      <div className={`glass-card-hero w-full max-w-sm sm:max-w-md relative z-10 p-8 sm:p-10 transition-shadow duration-700 ease-luxury ${isValid ? 'shadow-gold-glow-md' : ''}`}>
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Logo className="w-56 h-10 mb-4" variant="dark" />

          {/* Exclusive Access Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-micro text-gold/70 tracking-[0.25em] uppercase">Exclusive Access</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Kinetic Typography Heading — Cormorant Garamond */}
          <h1 className="text-display text-center text-white mb-3 font-display" style={{ perspective: '600px' }}>
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
          <p className="text-text-secondary text-center mb-8 text-sm" aria-live="polite" style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.8s forwards' }}>
            {detectedCity
              ? <>Discover Prime <span className="text-gold font-medium">{detectedCity}</span> Properties</>
              : 'Enter your mobile number to begin'
            }
          </p>

          {/* Phone Input — Glass Surface with Gold Focus */}
          <div className="w-full mb-6">
            <div className={`group relative rounded-xl overflow-hidden bg-titanium-surface/80 backdrop-blur-xl border transition-all duration-500 ease-luxury ${isValid ? 'border-gold/40 shadow-gold-glow' : 'border-white/[0.06]'} focus-within:border-gold/40 focus-within:shadow-[0_0_32px_rgba(201,169,98,0.15)]`}>
              {/* Country Code Prefix */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                <span className="text-base leading-none">{'\u{1F1EE}\u{1F1F3}'}</span>
                <span className="font-medium text-xs text-text-secondary">+91</span>
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
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
                className="w-full bg-transparent border-0 py-4 pl-24 pr-12 text-text-primary text-base placeholder:text-text-ghost placeholder:italic placeholder:font-serif focus:outline-none focus:ring-0"
                aria-label="Mobile number"
              />

              {/* Valid Indicator */}
              {isValid && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-success animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            {/* Helper Text + Why Verify */}
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

          {/* Continue Button — shadcn Luxury Variant */}
          <Button
            variant="luxury"
            onClick={handleContinue}
            disabled={!isValid || isLoading}
            className="w-full"
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
          </Button>

          {/* VIP Preview (new users only) */}
          {!isReturningUser && (
            <p className="text-text-muted text-caption mt-4 text-center">
              <span className="text-gold font-medium">VIP Preview:</span> Curated property alerts post-login
            </p>
          )}

          {/* Gold Separator */}
          <div className="gold-line w-24 mt-6" />

          {/* Trust Badges */}
          <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="outline" className="border-gold/20 text-text-muted bg-transparent text-xs gap-1.5 py-1">
              <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Bank-Grade
            </Badge>
            <Badge variant="outline" className="border-gold/20 text-text-muted bg-transparent text-xs gap-1.5 py-1">
              <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Institutional
            </Badge>
          </div>

          {/* Testimonial */}
          <p className="text-text-muted text-xs text-center mt-4 italic opacity-70 leading-relaxed">
            <span className="text-gold/40 font-display text-lg leading-none align-top">&ldquo;</span>
            Transformed my portfolio in 6 months
            <span className="text-gold/40 font-display text-lg leading-none align-bottom">&rdquo;</span>
            <span className="text-text-secondary not-italic block mt-1 text-micro tracking-wider uppercase">Rajesh M., Mumbai</span>
          </p>
        </div>
      </div>

      {/* Bottom Stats Ticker */}
      <div className="relative z-10 mt-8 flex items-center gap-6 sm:gap-10">
        {STATS.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && (
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
            )}
            <div
              className="text-center"
              style={{ opacity: 0, animation: `fadeInUp 0.5s ease-out ${1.2 + i * 0.15}s forwards` }}
            >
              <p className="text-gold font-display text-xl sm:text-2xl font-light">{stat.value}</p>
              <p className="text-text-muted text-micro uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </Fragment>
        ))}
      </div>

      {/* Social Proof Modal */}
      {showSocialProof && (
        <SocialProofModal
          onComplete={handleSocialProofComplete}
          isReturning={isReturningUser}
        />
      )}

      {/* Why Phone Verification Dialog — shadcn Dialog */}
      <Dialog open={showWhyVerify} onOpenChange={setShowWhyVerify}>
        <DialogContent className="bg-titanium-surface/95 backdrop-blur-2xl border-gold/10 text-text-primary max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-white">Why Phone Verification?</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
                title: '256-Bit Encryption',
                desc: 'Your OTP is transmitted with bank-grade encryption',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                title: 'SEBI-Compliant KYC',
                desc: 'Phone verification is part of regulatory compliance',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />,
                title: 'Zero Data Sharing',
                desc: 'Your number is never shared with third parties',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
                title: 'Verified Access Only',
                desc: 'Ensures only legitimate investors access the platform',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
                <div>
                  <p className="text-xs text-white font-medium">{item.title}</p>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
