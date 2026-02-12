'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import {
  properties,
  formatPrice,
  getPropertyLabel,
} from '@/lib/propertyData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Time-aware greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Get unique asset type categories
const CATEGORIES = ['All', ...Array.from(new Set(properties.map(p => {
  if (p.exitType.includes('Government')) return 'Government';
  if (p.assetType.includes('Industrial')) return 'Industrial';
  if (p.assetType.includes('Developer')) return 'Developer';
  return 'Other';
})))];

export default function DashboardPage() {
  const router = useRouter();
  const { state, reset } = useFlow();
  const [activeTab, setActiveTab] = useState('All');

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

  // Filter properties by category
  const filteredProperties = activeTab === 'All'
    ? properties
    : properties.filter(p => {
        if (activeTab === 'Government') return p.exitType.includes('Government');
        if (activeTab === 'Industrial') return p.assetType.includes('Industrial');
        if (activeTab === 'Developer') return p.assetType.includes('Developer') || p.developerName;
        return true;
      });

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto safe-top safe-bottom">
      {/* Sticky Header */}
      <header className="flex items-center justify-between mb-8 page-transition sticky top-0 z-20 py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-titanium-deep/80 backdrop-blur-xl border-b border-white/[0.03]">
        <Logo className="w-36 h-6 sm:w-40 sm:h-7" variant="dark" />

        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/30 border border-gold/20 flex items-center justify-center">
              <span className="text-gold text-xs font-semibold">
                {state.displayName?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <span className="text-text-secondary text-sm">{state.displayName}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-text-muted hover:text-gold text-sm transition-all duration-300 py-2 px-3 min-h-[44px] flex items-center gap-1.5 rounded-lg hover:bg-white/[0.03]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Welcome Hero Banner */}
      <section className="glass-card-hero p-6 sm:p-8 mb-8" style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out 0.1s forwards' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-text-muted text-micro uppercase tracking-widest mb-2">{getGreeting()}</p>
            <h1 className="text-display text-white font-display">
              {state.displayName}, <span className="text-shimmer-gold">your portfolio awaits</span>
            </h1>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            {[
              { value: properties.length.toString(), label: 'Assets' },
              { value: '8', label: 'Cities' },
              { value: '42%', label: 'Avg Growth' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center" style={{ opacity: 0, animation: `fadeInUp 0.4s ease-out ${0.3 + i * 0.1}s forwards` }}>
                <p className="text-gold font-display text-xl font-light">{stat.value}</p>
                <p className="text-text-ghost text-micro uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-titanium-surface/50 border border-white/[0.04] h-10 p-1">
          {CATEGORIES.map(cat => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="text-xs data-[state=active]:bg-gold/10 data-[state=active]:text-gold data-[state=active]:shadow-none transition-all duration-300"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Property Gallery Grid */}
      <section className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProperties.map((property, index) => (
            <article
              key={property.id}
              className="group relative bg-titanium-surface/60 backdrop-blur-sm border border-white/[0.04] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-luxury hover:border-gold/20 hover:shadow-card-hover"
              style={{ opacity: 0, animation: `fadeInUp 0.5s ease-out ${0.15 + index * 0.08}s forwards` }}
              onClick={() => router.push(`/dashboard/${property.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/dashboard/${property.id}`); }}
            >
              {/* Header: Authority + Asset Type */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.03]">
                <span className="text-text-muted text-xs truncate">{getPropertyLabel(property)}</span>
                <Badge variant="outline" className="border-gold/15 text-gold/70 bg-transparent text-micro shrink-0">
                  {property.riskBand}
                </Badge>
              </div>

              {/* Property Image with Parallax Zoom */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.08]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Hover Overlay with Quick Stats */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-white/80">{property.city}</span>
                    <span className="text-gold/60">&middot;</span>
                    <span className="text-white/80">{property.sizeSqm} sqm</span>
                    <span className="text-gold/60">&middot;</span>
                    <span className="text-white/80">{property.tenureType}</span>
                  </div>
                </div>
              </div>

              {/* Price + Growth */}
              <div className="p-4">
                <p className="text-white font-serif text-lg tracking-tight">
                  {formatPrice(property.priceMinInr)} &ndash; {formatPrice(property.priceMaxInr)}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Badge className="bg-success/10 text-success border-success/20 text-xs gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +{property.growthPercent}%
                  </Badge>
                  <span className="text-text-ghost text-xs">{property.growthPeriodYears}Y &middot; {property.growthSource}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Platform Disclaimer */}
      <footer className="mt-10 mb-4">
        <div className="gold-line w-32 mx-auto mb-4" />
        <p className="text-text-muted text-xs text-center leading-relaxed opacity-50 max-w-xl mx-auto">
          PropHit lists only assets with verifiable exit mechanisms. All listings undergo title verification,
          encumbrance checks, and escrow confirmation where applicable. Not investment advice.
        </p>
      </footer>

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

      */}

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

      */}
    </div>
  );
}
