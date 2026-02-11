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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 safe-top safe-bottom relative overflow-hidden">
      {/* Page Aurora (consistent with login) */}
      <div className="login-aurora" aria-hidden="true" />

      {/* Content Container */}
      <div className="login-form-container w-full max-w-sm sm:max-w-md relative z-10">
        <div className="login-form-inner flex flex-col items-center page-transition">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="fixed top-6 left-6 p-2 text-text-muted hover:text-text-primary transition-colors z-20 safe-top"
          aria-label="Go back"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo */}
        <Logo className="w-56 h-10 mb-12" variant="dark" />

        {/* Heading */}
        <h1 className="text-title text-center text-white mb-2 heading-luxury">
          Secure Verification
        </h1>
        <p className="text-text-secondary text-center mb-8">
          Enter the code sent to {maskedPhone}
        </p>

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

        {/* Resend with Countdown Ring */}
        <div className="text-center flex flex-col items-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-gold hover:text-gold-light transition-colors text-sm font-medium"
            >
              Resend code
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 36 36" className="countdown-ring">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border-subtle)" strokeWidth="2" />
                <circle
                  cx="18" cy="18" r="15" fill="none" stroke="var(--gold)" strokeWidth="2"
                  strokeDasharray={15 * 2 * Math.PI}
                  strokeDashoffset={15 * 2 * Math.PI * (1 - (30 - countdown) / 30)}
                  strokeLinecap="round"
                  className="countdown-ring-progress"
                />
              </svg>
              <p className="text-text-muted text-sm">
                Resend in <span className="text-text-secondary font-medium">{countdown}s</span>
              </p>
            </div>
          )}
        </div>

        {/* Demo Hint */}
        <p className="text-text-muted text-caption mt-12 text-center">
          Demo mode: Enter <span className="text-gold font-mono">1111</span> to verify
        </p>

        {/* Trust Line */}
        <div className="gold-line w-24 mt-8" />
        </div>{/* close login-form-inner */}
      </div>{/* close login-form-container */}
    </div>
  );
}
