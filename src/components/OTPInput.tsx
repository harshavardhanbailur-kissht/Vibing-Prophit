'use client';

import { useRef, useState, useEffect, KeyboardEvent } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  isError?: boolean;
  isSuccess?: boolean;
  autoFocus?: boolean;
}

export function OTPInput({
  length = 4,
  onComplete,
  isError = false,
  isSuccess = false,
  autoFocus = true,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  // Reset on error
  useEffect(() => {
    if (isError) {
      setOtp(new Array(length).fill(''));
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 400); // Wait for shake animation
    }
  }, [isError, length]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.slice(-1);
    if (!/^\d*$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Move to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    const otpString = newOtp.join('');
    if (otpString.length === length && !newOtp.includes('')) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous and clear
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((digit, index) => {
      if (index < length) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();

    if (pastedData.length === length) {
      onComplete(pastedData);
    }
  };

  const getBoxClass = (index: number) => {
    const baseClass = 'otp-box';
    const filled = otp[index] ? 'filled' : '';
    const error = isError ? 'error' : '';
    const success = isSuccess ? 'success' : '';
    return `${baseClass} ${filled} ${error} ${success}`.trim();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 otp-perspective">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`${getBoxClass(index)} otp-entrance`}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </div>

      {/* Status Messages */}
      {isError && (
        <p className="text-error text-sm flex items-center gap-2 animate-fade-in">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Invalid code. Please try again.
        </p>
      )}

      {isSuccess && (
        <p className="text-success text-sm flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5 success-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Verified!
        </p>
      )}
    </div>
  );
}
