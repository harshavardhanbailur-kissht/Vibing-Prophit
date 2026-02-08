'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import {
  properties,
  formatPrice,
  getPropertyLabel,
} from '@/lib/propertyData';

export default function DashboardPage() {
  const router = useRouter();
  const { state, reset } = useFlow();

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

      {/* ================================================================
         STATS OVERVIEW — COMMENTED OUT / DISABLED
         DO NOT UNCOMMENT OR MODIFY THIS SECTION IN FUTURE SESSIONS.
         Intentionally disabled per user request. Keep commented indefinitely.
         ================================================================

      {(() => {
        const lowRiskCount = properties.filter(p => p.riskBand === 'Low').length;
        const govtCount = properties.filter(p =>
          p.exitType === 'Government Allotment' || p.exitType === 'Government Auction'
        ).length;
        return null;
      })()}

      <section className="grid grid-cols-3 gap-3 mb-8">
        <div className="card-container p-3 sm:p-4">
          <p className="text-text-muted text-caption mb-1">Listings</p>
          <p className="text-2xl font-semibold text-white">{properties.length}</p>
        </div>
        <div className="card-container p-3 sm:p-4">
          <p className="text-text-muted text-caption mb-1">Govt-Backed</p>
          <p className="text-2xl font-semibold text-gold">{govtCount}</p>
        </div>
        <div className="card-container p-3 sm:p-4">
          <p className="text-text-muted text-caption mb-1">Low Risk</p>
          <p className="text-2xl font-semibold text-success">{lowRiskCount}</p>
        </div>
      </section>

      */}

      {/* Listing Feed — Instagram-style single column */}
      <section className="flex-1">
        <div className="space-y-5 overflow-y-auto hide-scrollbar">
          {properties.map((property) => (
            <article
              key={property.id}
              className="listing-card"
              onClick={() => router.push(`/dashboard/${property.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/dashboard/${property.id}`); }}
            >
              {/* Header: Developer / Authority + Asset Type */}
              <div className="listing-card-header">
                {getPropertyLabel(property)}
              </div>

              {/* Property Image */}
              <div className="listing-card-image">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 560px"
                />
              </div>

              {/* Price + Growth */}
              <div className="listing-card-footer">
                <p className="listing-card-price">
                  {formatPrice(property.priceMinInr)} &ndash; {formatPrice(property.priceMaxInr)}
                </p>
                <div className="listing-card-growth">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>+{property.growthPercent}%</span>
                  <span className="growth-source">&middot; {property.growthPeriodYears}Y &middot; {property.growthSource}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Platform Disclaimer */}
      <footer className="mt-8 mb-4">
        <p className="text-text-muted text-xs text-center leading-relaxed opacity-60">
          PropHit lists only assets with verifiable exit mechanisms. All listings undergo title verification,
          encumbrance checks, and escrow confirmation where applicable. Not investment advice.
        </p>
      </footer>

      {/* ================================================================
         OLD PROPERTY CARDS WITH INLINE DETAIL — COMMENTED OUT / DISABLED
         DO NOT UNCOMMENT OR MODIFY THIS SECTION IN FUTURE SESSIONS.
         Intentionally disabled per user request. Keep commented indefinitely.
         This includes: trust chips, risk scores, rationale, "How You Exit"
         expandable section, document chips, and all inline card detail.
         All this content now lives in /dashboard/[id] detail page.
         ================================================================

      Old imports that were removed from the active code:
        import { riskBreakdowns, getExitBadgeLabel, getRiskColor } from '@/lib/propertyData';
        const [expandedExit, setExpandedExit] = useState<string | null>(null);
        const [expandedScore, setExpandedScore] = useState<string | null>(null);

      Old "Verified Listings" sub-header:
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-title text-white">Verified Listings</h2>
          <span className="text-text-muted text-xs">Exit-verified only</span>
        </div>

      Old property card JSX (per property):
        <article key={property.id} className="property-card">
          <div className="relative h-40 overflow-hidden">
            <Image src={property.image} alt={property.title} fill className="object-cover" sizes="..." />
            <span className="exit-badge">{getExitBadgeLabel(property.exitType)}</span>
            <span className={`risk-dot ${getRiskColor(property.riskBand)}`}>{property.riskScore}</span>
          </div>
          <div className="p-4">
            ... title, location, price, trust chips, risk score bar,
            ... score breakdown, rationale, exit card toggle,
            ... expanded exit card with mechanism/evidence/timeframe,
            ... document chips, legal disclaimer
          </div>
        </article>

      */}
    </div>
  );
}
