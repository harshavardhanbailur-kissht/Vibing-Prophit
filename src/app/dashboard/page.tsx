'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import {
  properties,
  riskBreakdowns,
  formatPrice,
  getExitBadgeLabel,
  getRiskColor,
} from '@/lib/propertyData';

export default function DashboardPage() {
  const router = useRouter();
  const { state, reset } = useFlow();
  const [expandedExit, setExpandedExit] = useState<string | null>(null);
  const [expandedScore, setExpandedScore] = useState<string | null>(null);

  // Redirect if not completed flow
  useEffect(() => {
    if (!state.displayName || !state.isVerified) {
      router.replace('/');
    }
  }, [state.displayName, state.isVerified, router]);

  const handleLogout = () => {
    reset();
    router.push('/');
  };

  const lowRiskCount = properties.filter(p => p.riskBand === 'Low').length;
  const govtCount = properties.filter(p =>
    p.exitType === 'Government Allotment' || p.exitType === 'Government Auction'
  ).length;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 safe-top safe-bottom">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 page-transition">
        <Logo className="w-32 h-8" variant="dark" />
        <button
          onClick={handleLogout}
          className="text-text-muted hover:text-text-primary text-sm transition-colors"
        >
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <section className="mb-8 page-transition">
        <h1 className="text-hero text-white mb-1 heading-luxury">
          Welcome, <span className="text-gradient-gold">{state.displayName}</span>
        </h1>
        <p className="text-text-secondary">
          Verified assets with credible exit mechanisms
        </p>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-3 gap-3 mb-8">
        <div className="card-container">
          <p className="text-text-muted text-caption mb-1">Listings</p>
          <p className="text-2xl font-semibold text-white">{properties.length}</p>
        </div>
        <div className="card-container">
          <p className="text-text-muted text-caption mb-1">Govt-Backed</p>
          <p className="text-2xl font-semibold text-gold">{govtCount}</p>
        </div>
        <div className="card-container">
          <p className="text-text-muted text-caption mb-1">Low Risk</p>
          <p className="text-2xl font-semibold text-success">{lowRiskCount}</p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-title text-white">Verified Listings</h2>
          <span className="text-text-muted text-xs">Exit-verified only</span>
        </div>

        {/* Property Cards */}
        <div className="space-y-5 overflow-y-auto hide-scrollbar">
          {properties.map((property) => {
            const breakdown = riskBreakdowns[property.id];
            const isExitExpanded = expandedExit === property.id;
            const isScoreExpanded = expandedScore === property.id;

            return (
              <article key={property.id} className="property-card">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />

                  {/* Exit Type Badge (top-left) */}
                  <span className="exit-badge">
                    {getExitBadgeLabel(property.exitType)}
                  </span>

                  {/* Risk Band Dot (top-right) */}
                  <span className={`risk-dot ${getRiskColor(property.riskBand)}`}>
                    {property.riskScore}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title & Location */}
                  <h3 className="text-white font-medium mb-1 text-sm leading-snug">
                    {property.title}
                  </h3>
                  <p className="text-text-muted text-xs mb-3">
                    {property.locality}, {property.city} &middot; {property.sizeSqm.toLocaleString()} sq m &middot; {property.tenureType}
                  </p>

                  {/* Price Range */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-white font-semibold">
                      {formatPrice(property.priceMinInr)}
                    </span>
                    <span className="text-text-muted text-xs">&ndash;</span>
                    <span className="text-white font-semibold">
                      {formatPrice(property.priceMaxInr)}
                    </span>
                    <span className="text-text-muted text-xs ml-auto">
                      {property.projectedHoldingPeriodYears}yr hold
                    </span>
                  </div>

                  {/* Trust Chips Row */}
                  <div className="trust-chips-row">
                    {/* Allotment Verified */}
                    {property.titleClearance && (
                      <button className="trust-chip" title={`Ref: ${property.allotmentRef}`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Allotment Verified</span>
                      </button>
                    )}

                    {/* Title Clear */}
                    {property.ecLast30Yrs && (
                      <button className="trust-chip" title="EC covers last 30 years — no encumbrance">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Title Clear</span>
                      </button>
                    )}

                    {/* Escrow / Bank Guarantee */}
                    {property.escrowAmountInr > 0 && (
                      <button className="trust-chip trust-chip-escrow" title={`${property.escrowBankName}: ${formatPrice(property.escrowAmountInr)}`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Escrow {formatPrice(property.escrowAmountInr)}</span>
                      </button>
                    )}

                    {/* RERA */}
                    {property.reraNumber && (
                      <button className="trust-chip" title={property.reraNumber}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>RERA</span>
                      </button>
                    )}
                  </div>

                  {/* Risk Score Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-text-muted">Risk Score</span>
                      <button
                        onClick={() => setExpandedScore(isScoreExpanded ? null : property.id)}
                        className={`text-xs ${getRiskColor(property.riskBand)} font-medium`}
                      >
                        {property.riskScore}/100 {property.riskBand}
                        <span className="text-text-muted ml-1">{isScoreExpanded ? '\u25B2' : '\u25BC'}</span>
                      </button>
                    </div>
                    <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          property.riskBand === 'Low' ? 'bg-success' :
                          property.riskBand === 'High' ? 'bg-error' : 'bg-gold'
                        }`}
                        style={{ width: `${property.riskScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Why This Score? (expandable) */}
                  {isScoreExpanded && breakdown && (
                    <div className="score-breakdown">
                      <p className="text-text-muted text-xs font-medium mb-2">Score Breakdown</p>
                      <div className="space-y-1.5">
                        {[
                          { label: 'Legal Clarity', value: breakdown.legalClarity, max: 30 },
                          { label: 'Exit Enforceability', value: breakdown.exitEnforceability, max: 25 },
                          { label: 'Promoter Strength', value: breakdown.promoterStrength, max: 15 },
                          { label: 'Regulatory Maturity', value: breakdown.regulatoryMaturity, max: 15 },
                          { label: 'Market Demand', value: breakdown.marketDemand, max: 15 },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-2">
                            <span className="text-text-muted text-xs w-28 flex-shrink-0">{item.label}</span>
                            <div className="flex-1 h-1 rounded-full bg-bg-elevated overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gold"
                                style={{ width: `${(item.value / item.max) * 100}%` }}
                              />
                            </div>
                            <span className="text-text-secondary text-xs w-8 text-right">{item.value}/{item.max}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rationale */}
                  <p className="text-text-muted text-xs mt-3 leading-relaxed">
                    {property.shortRationale}
                  </p>

                  {/* Exit Card Toggle */}
                  <button
                    onClick={() => setExpandedExit(isExitExpanded ? null : property.id)}
                    className="exit-card-toggle"
                    aria-expanded={isExitExpanded}
                  >
                    <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>How You Exit</span>
                    <svg className={`w-3 h-3 text-text-muted ml-auto transition-transform ${isExitExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded Exit Card */}
                  {isExitExpanded && (
                    <div className="exit-card-content">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-gold text-xs font-bold mt-0.5">1</span>
                          <p className="text-text-secondary text-xs">
                            <span className="text-white font-medium">Exit mechanism:</span>{' '}
                            {property.buybackClausePresent
                              ? `Developer repurchase backed by escrow at ${property.escrowBankName}.`
                              : property.exitType === 'Government Allotment' || property.exitType === 'Government Auction'
                              ? `Secondary sale under ${property.issuingAuthority} transfer rules.`
                              : property.exitType === 'Land Pooling Return'
                              ? 'Transfer allowed per Land Pooling Policy LEC rules.'
                              : `Secondary sale or institutional offtake via ${property.issuingAuthority}.`
                            }
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gold text-xs font-bold mt-0.5">2</span>
                          <p className="text-text-secondary text-xs">
                            <span className="text-white font-medium">Key evidence:</span>{' '}
                            Allotment {property.allotmentRef}
                            {property.escrowBankName && ` \u00B7 Escrow: ${property.escrowBankName}`}
                            {property.reraNumber && ` \u00B7 ${property.reraNumber}`}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gold text-xs font-bold mt-0.5">3</span>
                          <p className="text-text-secondary text-xs">
                            <span className="text-white font-medium">Timeframe:</span>{' '}
                            {property.buybackClausePresent
                              ? `Repurchase window: ${property.projectedHoldingPeriodYears} years from allotment.`
                              : `Projected hold: ${property.projectedHoldingPeriodYears} years; exit via secondary market.`
                            }
                          </p>
                        </div>
                      </div>

                      {/* Document Links */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {property.docs.map((doc) => (
                          <button key={doc} className="doc-chip" title={`View ${doc}`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>{doc.replace('.pdf', '').replace(/_/g, ' ')}</span>
                          </button>
                        ))}
                      </div>

                      {/* Legal Disclaimer */}
                      <p className="text-text-muted text-xs mt-3 italic leading-relaxed opacity-70">
                        Exit depends on contractual conditions. See full documents. Verified by PropHit&apos;s legal partner.
                      </p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Platform Disclaimer */}
      <footer className="mt-8 mb-4">
        <p className="text-text-muted text-xs text-center leading-relaxed opacity-60">
          PropHit lists only assets with verifiable exit mechanisms. All listings undergo title verification,
          encumbrance checks, and escrow confirmation where applicable. Not investment advice.
        </p>
      </footer>
    </div>
  );
}
