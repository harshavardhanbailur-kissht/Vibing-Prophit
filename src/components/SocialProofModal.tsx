'use client';

import { useEffect, useState, useCallback } from 'react';

interface SocialProofModalProps {
  onComplete: () => void;
  isReturning?: boolean;
}

const ALL_STATS = [
  { value: '\u20B9500 Cr+', label: 'Assets Under Management' },
  { value: '4.8/5', label: 'Verified Investor Rating' },
  { value: '12,000+', label: 'Active Portfolio Holders' },
  { value: '98.7%', label: 'Client Satisfaction Rate' },
  { value: '350+', label: 'Premium Deals Closed' },
  { value: '42', label: 'Cities Covered' },
  { value: '\u20B92.4 Cr', label: 'Average Deal Size' },
  { value: '15+', label: 'Years Market Experience' },
];

const FOOTER_MESSAGES = [
  'Verifying platform credentials...',
  'Loading premium deal catalog...',
  'Preparing personalized recommendations...',
  'Securing your session...',
  'Almost ready...',
];

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

export function SocialProofModal({ onComplete, isReturning }: SocialProofModalProps) {
  const [phase, setPhase] = useState<Phase>(0);
  const [progress, setProgress] = useState(0);
  const [visibleStats, setVisibleStats] = useState<typeof ALL_STATS[number][]>([]);
  const [footerMsgIndex, setFooterMsgIndex] = useState(0);
  const [shuffleKey, setShuffleKey] = useState(0);

  const duration = isReturning ? 8000 : 10000;

  const stableComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Phase timeline
  useEffect(() => {
    const scale = duration / 10000;

    const t1 = setTimeout(() => {
      setPhase(1);
      setVisibleStats(ALL_STATS.slice(0, 2));
    }, 500 * scale);

    const t2 = setTimeout(() => {
      setPhase(2);
      setShuffleKey(prev => prev + 1);
      setVisibleStats(ALL_STATS.slice(0, 4));
    }, 2500 * scale);

    const t3 = setTimeout(() => {
      setPhase(3);
      setShuffleKey(prev => prev + 1);
      setVisibleStats([ALL_STATS[4], ALL_STATS[5], ALL_STATS[6], ALL_STATS[7]]);
    }, 4500 * scale);

    const t4 = setTimeout(() => {
      setPhase(4);
      setShuffleKey(prev => prev + 1);
      setVisibleStats(ALL_STATS.slice(0, 4));
    }, 6500 * scale);

    const t5 = setTimeout(() => {
      setPhase(5);
    }, 8500 * scale);

    const dismissTimer = setTimeout(stableComplete, duration);

    return () => {
      [t1, t2, t3, t4, t5, dismissTimer].forEach(clearTimeout);
    };
  }, [duration, stableComplete]);

  // Footer message rotation
  useEffect(() => {
    if (phase < 1) return;
    const interval = setInterval(() => {
      setFooterMsgIndex(prev => (prev + 1) % FOOTER_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [phase]);

  // Progress bar
  useEffect(() => {
    const interval = 30;
    const step = (interval / duration) * 100;
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + step;
      });
    }, interval);
    return () => clearInterval(progressTimer);
  }, [duration]);

  const getCardClass = (index: number): string => {
    switch (phase) {
      case 1:
        return index < 2 ? 'sp-fly-in' : '';
      case 2:
        return index >= 2 ? 'sp-fly-in-delayed' : 'sp-shuffle';
      case 3:
        return 'sp-shuffle-rotate';
      case 4:
        return 'sp-pulse-glow';
      case 5:
        return 'sp-settled';
      default:
        return '';
    }
  };

  return (
    <div
      className="social-proof-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Platform trust verification"
      onClick={stableComplete}
    >
      <div className="social-proof-modal" onClick={e => e.stopPropagation()}>
        {/* Verified Badge */}
        <div className="social-proof-badge">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>VERIFIED PLATFORM</span>
        </div>

        {/* Stats Grid with 3D perspective */}
        <div className="social-proof-stats-grid sp-perspective" key={shuffleKey}>
          {visibleStats.map((stat, i) => (
            <div
              key={`${stat.label}-${shuffleKey}`}
              className={`social-proof-stat ${getCardClass(i)}`}
              style={{
                animationDelay: `${i * 150}ms`,
                '--card-index': i,
              } as React.CSSProperties}
            >
              <div className="social-proof-value">
                <span className={phase >= 3 ? 'sp-counter-animate' : ''}>
                  {stat.value}
                </span>
              </div>
              <div className="social-proof-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="social-proof-progress-track">
          <div
            className="social-proof-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Rotating Footer */}
        <p className="social-proof-footer sp-footer-rotate" key={footerMsgIndex}>
          {phase === 5 ? (
            <span className="sp-verified-text">
              <svg className="sp-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Session verified. Entering platform...
            </span>
          ) : (
            FOOTER_MESSAGES[footerMsgIndex]
          )}
        </p>
      </div>
    </div>
  );
}
