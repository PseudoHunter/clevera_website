import React, { useState, useRef, useMemo } from 'react';
import { ClientLogo, PageRoute } from '../types';
import { useContent } from '../context/ContentContext';
import { 
  Building2, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Award,
  CheckCircle2,
  X,
  Zap,
  LayoutGrid
} from 'lucide-react';

interface TrustedBySectionProps {
  onNavigate?: (route: PageRoute) => void;
}

export const TrustedBySection: React.FC<TrustedBySectionProps> = ({ onNavigate }) => {
  const { clientLogos, trustedByConfig } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>(trustedByConfig.scrollSpeed || 'normal');
  const [activeModalLogo, setActiveModalLogo] = useState<ClientLogo | null>(null);
  const [mobileGridLayout, setMobileGridLayout] = useState<'2x2' | '3x2' | 'all'>('3x2');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter active logos
  const activeLogos = useMemo(() => {
    return clientLogos.filter(logo => logo.active);
  }, [clientLogos]);

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(activeLogos.map(l => l.category).filter(Boolean)));
    return ['All', ...cats];
  }, [activeLogos]);

  // Filtered logos based on category selection
  const displayedLogos = useMemo(() => {
    if (selectedCategory === 'All') return activeLogos;
    return activeLogos.filter(l => l.category === selectedCategory);
  }, [activeLogos, selectedCategory]);

  // Duplicated list for seamless infinite loop (if at least 4 items)
  const marqueeItems = useMemo(() => {
    if (displayedLogos.length === 0) return [];
    if (displayedLogos.length < 5) {
      // Repeat more times to fill marquee width
      return [...displayedLogos, ...displayedLogos, ...displayedLogos, ...displayedLogos];
    }
    return [...displayedLogos, ...displayedLogos];
  }, [displayedLogos]);

  // Responsive logos for mobile 2x2 or 3x2 grid
  const mobileLogos = useMemo(() => {
    if (mobileGridLayout === '2x2') {
      return displayedLogos.slice(0, 4);
    }
    if (mobileGridLayout === '3x2') {
      return displayedLogos.slice(0, 6);
    }
    return displayedLogos;
  }, [displayedLogos, mobileGridLayout]);

  // Marquee duration calculation
  const speedDuration = useMemo(() => {
    switch (speed) {
      case 'slow':
        return '48s';
      case 'fast':
        return '18s';
      case 'normal':
      default:
        return '30s';
    }
  }, [speed]);

  // Manual scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (activeLogos.length === 0) {
    return null;
  }

  return (
    <section 
      id="trusted-by-section" 
      className="relative w-full bg-slate-950 border-y border-slate-800/80 py-12 lg:py-16 overflow-hidden select-none"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-[#3430eb]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-[11px] font-bold text-blue-400 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{trustedByConfig.sectionBadge || 'Enterprise Social Proof'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-display">
              {trustedByConfig.sectionTitle || 'Trusted by Malaysia’s Leading Enterprises'}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {trustedByConfig.description || 'Over 250+ top multinational corporations, government-linked entities, and retail champions partner with Clevera Academy for workforce excellence.'}
            </p>
          </div>

          {/* Controls Bar: Desktop Carousel Controls & Admin shortcut */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Desktop Carousel Controls: Speed, Pause, Arrows (Hidden on mobile grid) */}
            <div className="hidden md:flex items-center gap-2">
              {/* Speed toggle */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-[11px] font-bold text-slate-400">
                <button
                  id="speed-slow-btn"
                  onClick={() => setSpeed('slow')}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${speed === 'slow' ? 'bg-[#3430eb] text-white' : 'hover:text-white'}`}
                  title="Slow scroll"
                >
                  0.5x
                </button>
                <button
                  id="speed-normal-btn"
                  onClick={() => setSpeed('normal')}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${speed === 'normal' ? 'bg-[#3430eb] text-white' : 'hover:text-white'}`}
                  title="Normal scroll"
                >
                  1.0x
                </button>
                <button
                  id="speed-fast-btn"
                  onClick={() => setSpeed('fast')}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${speed === 'fast' ? 'bg-[#3430eb] text-white' : 'hover:text-white'}`}
                  title="Fast scroll"
                >
                  1.5x
                </button>
              </div>

              {/* Pause/Resume button */}
              <button
                id="pause-carousel-btn"
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
                title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
              >
                {isPaused ? <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" /> : <Pause className="w-4 h-4" />}
              </button>

              {/* Manual Carousel Navigation Arrows */}
              <div className="flex items-center gap-1">
                <button
                  id="scroll-left-btn"
                  onClick={() => handleScroll('left')}
                  className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
                  title="Scroll previous"
                  aria-label="Previous logos"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="scroll-right-btn"
                  onClick={() => handleScroll('right')}
                  className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
                  title="Scroll next"
                  aria-label="Next logos"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters (if enabled) */}
        {trustedByConfig.showCategoryFilter && categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#3430eb] text-white shadow-md shadow-indigo-950'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE RESPONSIVE GRID LAYOUT (2x2 or 3x2) - Visible on screens < md   */}
      {/* ========================================================================= */}
      <div className="block md:hidden px-4 sm:px-6 mt-1">
        {/* Mobile View Switcher */}
        <div className="flex items-center justify-between gap-2 mb-3 bg-slate-900/90 border border-slate-800/90 rounded-xl p-1.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-semibold pl-1.5">
            <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
            <span>Mobile Grid:</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="mobile-grid-2x2-tab"
              type="button"
              onClick={() => setMobileGridLayout('2x2')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                mobileGridLayout === '2x2'
                  ? 'bg-[#3430eb] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="2x2 Grid (4 Logos)"
            >
              2x2
            </button>
            <button
              id="mobile-grid-3x2-tab"
              type="button"
              onClick={() => setMobileGridLayout('3x2')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                mobileGridLayout === '3x2'
                  ? 'bg-[#3430eb] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="3x2 Grid (6 Logos)"
            >
              3x2
            </button>
            <button
              id="mobile-grid-all-tab"
              type="button"
              onClick={() => setMobileGridLayout('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                mobileGridLayout === 'all'
                  ? 'bg-[#3430eb] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={`View All ${displayedLogos.length} Logos`}
            >
              All ({displayedLogos.length})
            </button>
          </div>
        </div>

        {/* Responsive Mobile Grid: 2 columns on phone screens (<sm), 3 columns on small tablets (sm) */}
        <div className={`grid gap-2.5 sm:gap-3 ${mobileGridLayout === '2x2' ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {mobileLogos.map((logo, index) => (
            <div
              key={`mobile-${logo.id}-${index}`}
              id={`mobile-client-logo-${logo.id}`}
              onClick={() => setActiveModalLogo(logo)}
              className="bg-slate-900/90 active:bg-slate-850 border border-slate-800/90 active:border-[#3430eb]/60 rounded-xl p-3 transition-all cursor-pointer flex flex-col justify-between shadow-xs"
            >
              <div className="h-12 sm:h-14 w-full flex items-center justify-center bg-slate-950/70 rounded-lg p-2 border border-slate-800/60 overflow-hidden">
                <img
                  src={logo.logoUrl}
                  alt={`${logo.name} logo`}
                  className="max-h-full max-w-full object-contain filter contrast-125 brightness-95"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="200" height="50"><rect width="200" height="50" rx="8" fill="%231e293b"/><text x="100" y="30" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">${encodeURIComponent(logo.name)}</text></svg>`;
                  }}
                />
              </div>

              <div className="mt-2.5 space-y-0.5 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-xs text-white truncate block">
                    {logo.name}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded shrink-0">
                    Claimed
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 truncate block">
                  {logo.industry || logo.category}
                </span>
              </div>

              {logo.statsOrHighlight && (
                <div className="mt-2 pt-1.5 border-t border-slate-800/70 flex items-center gap-1 text-[9px] text-slate-300 font-medium">
                  <Zap className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                  <span className="truncate">{logo.statsOrHighlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Prompt if constrained to 2x2 or 3x2 */}
        {mobileGridLayout !== 'all' && displayedLogos.length > mobileLogos.length && (
          <div className="mt-3 text-center">
            <button
              id="mobile-view-all-cta"
              type="button"
              onClick={() => setMobileGridLayout('all')}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg bg-slate-900 border border-slate-800 shadow-2xs cursor-pointer"
            >
              <span>View All {displayedLogos.length} Corporate Partners &rarr;</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP/TABLET SINGLE-ROW INFINITE CAROUSEL - Visible on screens >= md  */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full overflow-hidden mt-2 group hidden md:block"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Shadows for seamless visual fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee Row */}
        <div
          ref={scrollContainerRef}
          style={{ '--marquee-duration': speedDuration } as React.CSSProperties}
          className={`animate-marquee py-3 flex items-center gap-4 sm:gap-6 ${
            isPaused || !trustedByConfig.autoScroll ? 'paused' : ''
          }`}
        >
          {marqueeItems.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              id={`client-logo-card-${logo.id}-${index}`}
              onClick={() => setActiveModalLogo(logo)}
              className="w-[240px] sm:w-[270px] shrink-0 bg-slate-900/80 hover:bg-slate-850 border border-slate-800/90 hover:border-[#3430eb]/60 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#3430eb]/10 cursor-pointer flex flex-col justify-between group/card"
            >
              {/* Logo Media Container */}
              <div className="h-16 w-full flex items-center justify-center bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60 group-hover/card:border-slate-700/80 transition-all overflow-hidden">
                <img
                  src={logo.logoUrl}
                  alt={`${logo.name} logo`}
                  className="max-h-full max-w-full object-contain filter grayscale contrast-125 brightness-95 group-hover/card:grayscale-0 group-hover/card:brightness-110 transition-all duration-300"
                  onError={(e) => {
                    // Fallback to stylized vector badge if image URL fails
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="200" height="50"><rect width="200" height="50" rx="8" fill="%231e293b"/><text x="100" y="30" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">${encodeURIComponent(logo.name)}</text></svg>`;
                  }}
                />
              </div>

              {/* Company Info & Impact Metric */}
              <div className="mt-3.5 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-xs text-white truncate block group-hover/card:text-[#60a5fa] transition-colors">
                    {logo.name}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 truncate block">
                    {logo.industry || logo.category}
                  </span>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    Claimed
                  </span>
                </div>
              </div>

              {/* Impact Tag */}
              {logo.statsOrHighlight && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-300 font-medium">
                  <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{logo.statsOrHighlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Guarantee Badge Underneath Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-slate-400 text-xs text-center border-t border-slate-900 pt-4">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            100% HRD Corp SBL-Khas Direct Provider Reimbursement
          </span>
          <span className="hidden sm:inline text-slate-700">&bull;</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3430eb]" />
            Official e-TRiS Course Approvals Handled within 24 Hours
          </span>
          <span className="hidden sm:inline text-slate-700">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            Certified TTT Master Facilitators with Industry Track Records
          </span>
        </div>
      </div>

      {/* POPUP DETAIL MODAL WHEN CLICKING A CLIENT LOGO */}
      {activeModalLogo && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveModalLogo(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalLogo(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo and Name */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-14 bg-slate-950 border border-slate-800 rounded-xl p-2 flex items-center justify-center shrink-0">
                <img
                  src={activeModalLogo.logoUrl}
                  alt={activeModalLogo.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider mb-1">
                  {activeModalLogo.category}
                </div>
                <h3 className="text-xl font-black text-white font-display">
                  {activeModalLogo.name}
                </h3>
              </div>
            </div>

            {/* Program & SBL-Khas Details */}
            <div className="space-y-3 bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Industry Sector</span>
                <span className="text-slate-200 font-bold">{activeModalLogo.industry || 'Corporate Enterprise'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Impact Outcome</span>
                <span className="text-emerald-400 font-bold">{activeModalLogo.statsOrHighlight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Grant Scheme</span>
                <span className="text-blue-400 font-bold">100% SBL-Khas Approved</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Course Verification</span>
                <span className="text-slate-200 font-semibold">e-TRiS Clevera Academy Official</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Clevera Academy collaborated with <span className="text-white font-bold">{activeModalLogo.name}</span> to deliver targeted competency development aligned strictly to corporate KPIs and allowable HRD Corp grant claim guidelines.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => {
                    setActiveModalLogo(null);
                    onNavigate('contact-booking');
                  }}
                  className="btn-cobalt flex-1 py-3 text-xs font-bold tracking-wider text-center cursor-pointer"
                >
                  Request Similar Proposal
                </button>
              )}
              <button
                onClick={() => setActiveModalLogo(null)}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
