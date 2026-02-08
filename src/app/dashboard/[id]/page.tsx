'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useFlow } from '@/context/FlowContext';
import {
  getPropertyById,
  getPropertyLabel,
  riskBreakdowns,
  formatPrice,
  getExitBadgeLabel,
  getRiskColor,
} from '@/lib/propertyData';

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { state } = useFlow();
  const [expandedScore, setExpandedScore] = useState(false);

  const property = getPropertyById(params.id as string);
  const breakdown = property ? riskBreakdowns[property.id] : undefined;

  // Auth guard
  useEffect(() => {
    if (!state.displayName || !state.isVerified) {
      router.replace('/');
    }
  }, [state.displayName, state.isVerified, router]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="detail-hero">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="detail-hero-gradient" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="detail-back-btn"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Developer / Authority Label */}
        <span className="detail-hero-label">{getPropertyLabel(property)}</span>
      </div>

      {/* Content Area */}
      <div className="detail-content">
        {/* Title & Location */}
        <h1 className="text-white text-xl font-medium mb-1 heading-luxury">{property.title}</h1>
        <p className="text-text-muted text-sm mb-5">
          {property.locality}, {property.city}
        </p>

        {/* Price + Growth Card */}
        <div className="detail-price-section">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-white text-lg font-semibold">{formatPrice(property.priceMinInr)}</span>
            <span className="text-text-muted text-sm">&ndash;</span>
            <span className="text-white text-lg font-semibold">{formatPrice(property.priceMaxInr)}</span>
          </div>
          <div className="detail-growth-badge">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>+{property.growthPercent}%</span>
            <span className="text-text-muted font-normal">&middot;</span>
            <span>{property.growthPeriodYears}Y</span>
            <span className="text-text-muted font-normal">&middot;</span>
            <span className="text-text-muted font-normal">{property.growthSource}</span>
          </div>
        </div>

        {/* Trust Verification */}
        <div className="detail-section">
          <p className="detail-section-title">Trust Verification</p>
          <div className="trust-chips-row">
            {property.titleClearance && (
              <span className="trust-chip" title={`Ref: ${property.allotmentRef}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Allotment Verified</span>
              </span>
            )}
            {property.ecLast30Yrs && (
              <span className="trust-chip" title="EC covers last 30 years">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Title Clear</span>
              </span>
            )}
            {property.escrowAmountInr > 0 && (
              <span className="trust-chip trust-chip-escrow" title={`${property.escrowBankName}: ${formatPrice(property.escrowAmountInr)}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Escrow {formatPrice(property.escrowAmountInr)}</span>
              </span>
            )}
            {property.reraNumber && (
              <span className="trust-chip" title={property.reraNumber}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>RERA</span>
              </span>
            )}
          </div>
        </div>

        {/* Risk Score */}
        <div className="detail-section">
          <p className="detail-section-title">Risk Assessment</p>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-text-muted">Risk Score</span>
            <button
              onClick={() => setExpandedScore(!expandedScore)}
              className={`text-xs ${getRiskColor(property.riskBand)} font-medium`}
            >
              {property.riskScore}/100 {property.riskBand}
              <span className="text-text-muted ml-1">{expandedScore ? '\u25B2' : '\u25BC'}</span>
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

          {/* Score Breakdown */}
          {expandedScore && breakdown && (
            <div className="score-breakdown mt-3">
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
        </div>

        {/* Rationale */}
        <div className="detail-section">
          <p className="detail-section-title">Rationale</p>
          <p className="text-text-secondary text-sm leading-relaxed">{property.shortRationale}</p>
        </div>

        {/* Property Details Grid */}
        <div className="detail-section">
          <p className="detail-section-title">Property Details</p>
          <div className="detail-specs-grid">
            <div className="detail-spec">
              <p className="detail-spec-label">Size</p>
              <p className="detail-spec-value">{property.sizeSqm.toLocaleString()} sq m</p>
            </div>
            <div className="detail-spec">
              <p className="detail-spec-label">Tenure</p>
              <p className="detail-spec-value">{property.tenureType}</p>
            </div>
            <div className="detail-spec">
              <p className="detail-spec-label">Hold Period</p>
              <p className="detail-spec-value">{property.projectedHoldingPeriodYears}Y</p>
            </div>
            <div className="detail-spec">
              <p className="detail-spec-label">Exit Type</p>
              <p className="detail-spec-value">{getExitBadgeLabel(property.exitType)}</p>
            </div>
            <div className="detail-spec">
              <p className="detail-spec-label">Location</p>
              <p className="detail-spec-value">{property.locality}</p>
            </div>
            <div className="detail-spec">
              <p className="detail-spec-label">Authority</p>
              <p className="detail-spec-value">{property.developerName || property.issuingAuthority}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="detail-section">
          <p className="detail-section-title">Documents</p>
          <div className="flex flex-wrap gap-2">
            {property.docs.map((doc) => (
              <button key={doc} className="doc-chip" title={`View ${doc}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{doc.replace('.pdf', '').replace(/_/g, ' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-text-muted text-xs text-center leading-relaxed opacity-60 mt-6 mb-4">
          Exit depends on contractual conditions. See full documents. Verified by PropHit&apos;s legal partner. Not investment advice.
        </p>
      </div>
    </div>
  );
}
