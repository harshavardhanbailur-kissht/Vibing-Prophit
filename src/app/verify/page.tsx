'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { OTPInput } from '@/components/OTPInput';
import { useFlow } from '@/context/FlowContext';
import { HARDCODED_OTP } from '@/lib/constants';

export default function VerifyPage() {
  const router = useRouter();
  const { state, verify } = useFlow();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Redirect if no phone
  useEffect(() => {
    if (!state.phone) {
      router.replace('/');
    }
  }, [state.phone, router]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOTPComplete = (otp: string) => {
    setIsError(false);

    if (otp === HARDCODED_OTP) {
      setIsSuccess(true);
      verify();

      // Navigate after success animation (skip skills page - it's disabled)
      setTimeout(() => {
        router.push('/personalize');
      }, 800);
    } else {
      setIsError(true);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(30);
    setCanResend(false);
    setIsError(false);
    // In real app, would call API to resend OTP
  };

  const handleBack = () => {
    router.back();
  };

  // Mask phone number
  const maskedPhone = state.phone
    ? `+91 ${state.phone.slice(0, 2)}****${state.phone.slice(-2)}`
    : '';

  // Progress bar percentage (inverted: starts full, drains to 0)
  const progressPercent = (countdown / 30) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 safe-top safe-bottom relative overflow-hidden">
      {/* Page Aurora (consistent with login) */}
      <div className="login-aurora" aria-hidden="true" />

      {/* Back Button — Glass styled with gold chevron */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 p-2.5 rounded-xl backdrop-blur-xl border border-gold/10 bg-titanium-surface/40 text-gold/70 hover:text-gold hover:border-gold/25 hover:bg-titanium-surface/60 transition-all duration-300 z-20 safe-top"
        aria-label="Go back"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Glass Card Content Container */}
      <div className="glass-card-hero w-full max-w-sm sm:max-w-md relative z-10 p-8 sm:p-10">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Logo className="w-56 h-10 mb-4" variant="dark" />

          {/* Exclusive Access Micro-Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-micro text-gold/70 tracking-[0.25em] uppercase">Exclusive Access</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Heading — Cormorant Garamond */}
          <h1 className="text-display text-center text-white mb-3 font-display">
            Secure Vault Access
          </h1>

          {/* Subheading — masked phone */}
          <p className="text-text-secondary text-center mb-8 text-sm">
            Enter the code sent to <span className="text-gold/80 font-mono tracking-[0.15em] font-medium">{maskedPhone}</span>
          </p>

          {/* Gold Separator */}
          <div className="gold-line w-16 mb-8" />

          {/* OTP Input */}
          <div className="mb-8">
            <OTPInput
              length={4}
              onComplete={handleOTPComplete}
              isError={isError}
              isSuccess={isSuccess}
              autoFocus
            />
          </div>

          {/* Resend with Horizontal Gold Progress Bar */}
          <div className="w-full flex flex-col items-center gap-4">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide"
              >
                Resend code
              </button>
            ) : (
              <div className="w-full flex flex-col items-center gap-3">
                {/* Horizontal Progress Bar */}
                <div className="w-full max-w-[200px] h-[2px] rounded-full bg-titanium-elevated/80 overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-1000 linear verify-progress-fill"
                    style={{
                      width: `${progressPercent}%`,
                      boxShadow: '0 0 8px rgba(201, 169, 98, 0.3)',
                    }}
                  />
                </div>
                <p className="text-text-muted text-sm">
                  Resend in <span className="text-text-secondary font-medium tabular-nums">{countdown}s</span>
                </p>
              </div>
            )}
          </div>

          {/* Gold Separator */}
          <div className="gold-line w-24 mt-8" />

          {/* Demo Hint — Premium styled */}
          <div className="mt-6 px-4 py-2.5 rounded-xl border border-gold/8 bg-titanium-surface/30 backdrop-blur-sm">
            <p className="text-text-muted text-caption text-center">
              Demo mode <span className="text-gold/30 mx-1.5">&middot;</span> Enter <span className="text-gold font-mono tracking-widest font-medium">1111</span><span className="inline-block w-[2px] h-3 bg-gold/50 ml-0.5 align-middle animate-pulse-gold" /> to verify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
