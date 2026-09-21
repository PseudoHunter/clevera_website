import React, { useState } from 'react';
import { PageRoute, TrainingModule } from '../types';
import { useContent } from '../context/ContentContext';
import { TrustedBySection } from '../components/TrustedBySection';
import { HrdcCalculator } from '../components/HrdcCalculator';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Award, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  Star, 
  Clock, 
  FileText,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenSyllabus: (module: TrainingModule) => void;
  onOpenEligibility: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenSyllabus,
  onOpenEligibility,
}) => {
  const { modules, trainers, testimonials, contactConfig, sectionVisibility } = useContent();
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);

  // Lineup modules dynamically connected to live modules catalog
  const lineupModules = [
    {
      num: '01',
      tag: 'RETAIL & SALES MASTERY',
      module: modules.find(m => m.id === 'retail-sales-mastery') || modules[0],
      defaultImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=800&auto=format&fit=crop'
    },
    {
      num: '02',
      tag: 'TEAM SYNERGY & CULTURE',
      module: modules.find(m => m.id === 'corporate-team-building') || modules[1] || modules[0],
      defaultImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop'
    },
    {
      num: '03',
      tag: 'AI & WORKFLOW AUTOMATION',
      module: modules.find(m => m.id === 'ai-business-productivity') || modules[2] || modules[0],
      defaultImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
    },
    {
      num: '04',
      tag: 'EMPLOYMENT LAW & HR',
      module: modules.find(m => m.id === 'employment-act-compliance') || modules[3] || modules[0],
      defaultImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="w-full bg-white text-slate-900 font-sans selection:bg-[#3430eb] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Architectural Dark Facade + Bold Display Typography     */}
      {/* ========================================================================= */}
      {sectionVisibility.hero && (
        <section id="home-hero-section" className="relative w-full min-h-[680px] lg:min-h-[760px] bg-slate-950 flex flex-col justify-center overflow-hidden">
          {/* Background Architectural Facade with cinematic moody grading */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2200&auto=format&fit=crop')`,
            }}
          />
          {/* Deep Slate / Black Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-slate-950/70" />
          <div className="absolute inset-0 bg-radial-at-t from-transparent via-black/40 to-black/90 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 z-10 w-full">
            <div className="max-w-3xl space-y-7">
              
              {/* Main Headline (Clean, Massive, Sans Display) */}
              <div className="space-y-1">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] font-display">
                  Elevate<br />
                  Workforce<br />
                  Excellence
                </h1>
              </div>

              {/* Sub-header tracked uppercase badge */}
              <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-300 uppercase">
                MALAYSIA'S PREMIER HRD CORP APPROVED ACADEMY
              </p>

              {/* Schedule & Grant metadata */}
              <div className="space-y-1.5 pt-2 text-slate-400 text-xs sm:text-sm font-medium tracking-wide">
                <p className="text-white font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3430eb] animate-pulse inline-block" />
                  2026 CORPORATE CALENDAR OPEN &bull; ON-SITE OR RESORT RETREAT
                </p>
                <p className="text-slate-300">
                  100% SBL-KHAS GRANT CLAIMABLE &bull; ZERO OUT-OF-POCKET CASH
                </p>
              </div>

              {/* Primary Action Button (Reference Cobalt Blue Pill) */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  id="hero-register-btn"
                  onClick={() => onNavigate('contact-booking')}
                  className="btn-cobalt px-8 sm:px-10 py-4 text-xs sm:text-sm font-extrabold tracking-wider shadow-xl cursor-pointer"
                >
                  Request Proposal Now
                </button>

                <button
                  id="hero-explore-btn"
                  onClick={() => onNavigate('modules')}
                  className="px-7 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs sm:text-sm font-bold tracking-wide uppercase transition-all cursor-pointer"
                >
                  Explore 10+ Modules
                </button>

                <button
                  onClick={onOpenEligibility}
                  className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#60a5fa]" />
                  Check HRDC Eligibility
                </button>
              </div>

              {/* Floating Trust Metrics */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 max-w-2xl">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white font-display">250+</span>
                  <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Clients Trained</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#60a5fa] font-display">RM4.8M+</span>
                  <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Grants Disbursed</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white font-display">18.5K+</span>
                  <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Professionals</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">98.4%</span>
                  <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Approval Rate</span>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 1.5. TRUSTED BY CLIENT LOGOS CAROUSEL (Enterprise Social Proof)          */}
      {/* ========================================================================= */}
      {sectionVisibility.trustedBy && (
        <TrustedBySection onNavigate={onNavigate} />
      )}

      {/* ========================================================================= */}
      {/* 2. SPLIT EDITORIAL SECTION: 50/50 B&W Workshop + Pitch Black Content      */}
      {/* ========================================================================= */}
      {sectionVisibility.splitEditorial && (
        <section id="home-split-editorial-section" className="w-full grid grid-cols-1 lg:grid-cols-2 bg-black text-white overflow-hidden">
          {/* Left 50%: High-contrast authentic workshop photography */}
          <div className="relative min-h-[420px] lg:min-h-[580px] bg-slate-900 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop"
              alt="Corporate team collaboration and workshop session"
              className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-6 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-semibold text-slate-300">
              Live Corporate Workshop &bull; Kuala Lumpur
            </div>
          </div>

          {/* Right 50%: Pitch Black with Pristine Typography & Cobalt Pill CTA */}
          <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 lg:py-24 bg-black space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] font-display">
                Gearing up<br />
                for the future
              </h2>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              <p>
                Clevera Academy is Malaysia's premier corporate training institution where organizations empower their workforce, eliminate departmental silos, and unlock measurable productivity dividends.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                This year, we're focusing on future-readiness. Corporate dynamics are evolving rapidly across ASEAN, and Malaysian enterprises must elevate their leadership resilience, frontline retail agility, and AI workflow automation to rise to the challenges of tomorrow.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => onNavigate('modules')}
                className="btn-cobalt px-8 py-3.5 text-xs font-extrabold tracking-wider shadow-lg cursor-pointer"
              >
                See More Modules
              </button>
              <button
                onClick={() => onNavigate('gallery-about')}
                className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider transition-colors px-4 py-3"
              >
                About Faculty &rarr;
              </button>
            </div>

            {/* HRDC SBL-Khas Zero Cost note */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-[#3430eb] shrink-0" />
              <span>
                100% claimable under the HRD Corp SBL-Khas scheme. Employer makes zero upfront cash outlay.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. ACTIVITY LINEUP: Clean White Background + Faint Large Numbers 01-04    */}
      {/* ========================================================================= */}
      {sectionVisibility.activityLineup && (
        <section id="home-activity-lineup-section" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white">
          {/* Section Header */}
          <div className="mb-14">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
              Activity Lineup
            </h2>
            <p className="text-sm font-bold text-[#3430eb] uppercase tracking-wider mt-1.5">
              Clevera Academy Corporate Masterclasses
            </p>
          </div>

          {/* 4-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lineupModules.map((item) => (
              <div key={item.num} className="flex flex-col group">
                
                {/* Large Faint Number Header */}
                <div className="text-5xl sm:text-6xl font-black text-slate-200 select-none leading-none mb-3 font-display transition-colors group-hover:text-slate-300">
                  {item.num}
                </div>

                {/* Photo Frame */}
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100 mb-4">
                  <img
                    src={item.module.image || item.defaultImage}
                    alt={item.module.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    {item.module.hrdcScheme || 'HRDC Claimable'}
                  </span>
                </div>

                {/* Cobalt Tracked Uppercase Category Tag */}
                <div className="text-[11px] font-extrabold tracking-[0.16em] text-[#3430eb] uppercase mb-1.5">
                  {item.module.categoryLabel || item.tag}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#3430eb] transition-colors">
                  {item.module.title}
                </h3>

                {/* Concise Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                  {item.module.shortDescription}
                </p>

                {/* View Detailed Syllabus Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenSyllabus(item.module)}
                    className="text-xs font-bold text-slate-900 hover:text-[#3430eb] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#3430eb]" />
                    <span>View Syllabus</span>
                  </button>
                  <button
                    onClick={() => onNavigate('contact-booking')}
                    className="text-[11px] font-bold text-white bg-slate-900 hover:bg-[#3430eb] px-3 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Explore All CTA Button */}
          <div className="mt-14 pt-8 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigate('modules')}
              className="btn-cobalt px-8 py-3.5 text-xs font-extrabold tracking-wider shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Complete 10+ Module Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. FACULTY & SPEAKERS: Pitch Black Banner + Vertical Monochrome Columns    */}
      {/* ========================================================================= */}
      {sectionVisibility.faculty && (
        <section id="home-faculty-section" className="w-full bg-black text-white py-16 lg:py-24">
          
          {/* Full-width Centered Title Bar */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Summit Speakers & Faculty
            </h2>
            <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mt-2">
              HRD CORP TRAIN-THE-TRAINER (TTT) CERTIFIED INDUSTRY PRACTITIONERS
            </p>
          </div>

          {/* 4 Vertical Columns of Full-Bleed Monochrome Portraits with Dark Gradient */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trainers.map((trainer) => (
                <div 
                  key={trainer.id}
                  onClick={() => setSelectedTrainer(selectedTrainer === trainer.id ? null : trainer.id)}
                  className="relative aspect-[3/4] sm:aspect-[9/14] rounded-2xl overflow-hidden bg-slate-900 group cursor-pointer border border-white/10"
                >
                  {/* Trainer Photo (Monochrome / High Contrast Grade) */}
                  <img
                    src={trainer.photoUrl}
                    alt={trainer.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />

                  {/* Dark Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Trainer Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 text-left">
                    <div className="inline-block bg-[#3430eb] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      {trainer.hrdcTttNo}
                    </div>
                    <h3 className="text-lg font-black text-white leading-tight font-display uppercase tracking-wide">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium line-clamp-2">
                      {trainer.title}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 pt-1 border-t border-white/10">
                      {trainer.bio}
                    </p>
                    <span className="text-[10px] font-bold text-[#60a5fa] block pt-1 uppercase tracking-wider">
                      {trainer.specialties.join(' • ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE HRDC GRANT & ROI CALCULATOR (Admin Toggleable)             */}
      {/* ========================================================================= */}
      {sectionVisibility.hrdcCalculator && (
        <section id="home-calculator-section" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3430eb] block mb-1">
              Statutory Malaysian Levy Optimization
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Calculate Your SBL-Khas Grant Allocation
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Employers contributing to HRD Corp can claim up to 100% of course fees and meal allowances with zero cash outlay.
            </p>
          </div>
          <HrdcCalculator onNavigate={onNavigate} />
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. CORPORATE TESTIMONIALS & TRUST AUDIT                                   */}
      {/* ========================================================================= */}
      {sectionVisibility.testimonials && (
        <section id="home-testimonials-section" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-24 bg-white">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3430eb] block mb-1">
              Proven Industry Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              What Malaysian HR Leaders Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 flex items-center gap-3">
                  <img
                    src={test.avatarUrl}
                    alt={test.author}
                    className="w-11 h-11 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{test.author}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight">{test.role}</p>
                    <p className="text-[10px] font-extrabold text-[#3430eb] uppercase tracking-wide mt-0.5">
                      {test.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 7. SPLIT REACH OUT + ARCHITECTURAL GLASS SKYLIGHT CALL TO ACTION          */}
      {/* ========================================================================= */}
      {sectionVisibility.reachOut && (
        <section id="home-reach-out-section" className="w-full grid grid-cols-1 lg:grid-cols-2 border-t border-slate-200 bg-white">
          
          {/* Left 50%: Clean Stark White "Reach out" Section */}
          <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 lg:py-24 bg-white space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-display mb-1">
                {contactConfig.sectionTitle}
              </h2>
              <p className="text-xs font-bold tracking-[0.2em] text-[#3430eb] uppercase">
                {contactConfig.sectionSubtitle}
              </p>
            </div>

            <div className="space-y-6 text-slate-800">
              {/* Mailing Address */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-[0.16em] text-[#3430eb] uppercase block">
                  MAILING ADDRESS
                </span>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {contactConfig.addressLine1},<br />
                  {contactConfig.addressLine2},<br />
                  {contactConfig.cityStateZip}
                </p>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-[0.16em] text-[#3430eb] uppercase block">
                  EMAIL ADDRESS
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  <a href={`mailto:${contactConfig.primaryEmail}`} className="hover:text-[#3430eb] transition-colors">
                    {contactConfig.primaryEmail}
                  </a>
                  {contactConfig.secondaryEmail && (
                    <>
                      <span className="text-slate-400 mx-2">&bull;</span>
                      <a href={`mailto:${contactConfig.secondaryEmail}`} className="hover:text-[#3430eb] transition-colors text-slate-600 font-normal">
                        {contactConfig.secondaryEmail}
                      </a>
                    </>
                  )}
                </p>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-[0.16em] text-[#3430eb] uppercase block">
                  PHONE NUMBER
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  <a href={`tel:${contactConfig.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-[#3430eb] transition-colors">
                    {contactConfig.primaryPhone}{contactConfig.phoneLabel?.trim() ? ` (${contactConfig.phoneLabel.trim()})` : ''}
                  </a>
                  <span className="text-slate-400 mx-2">&bull;</span>
                  <a href={contactConfig.whatsappUrl} target="_blank" rel="noreferrer" className="text-[#3430eb] hover:underline font-bold">
                    {contactConfig.whatsappNumber}{contactConfig.whatsappLabel?.trim() ? ` (${contactConfig.whatsappLabel.trim()})` : ''}
                  </a>
                </p>
              </div>

              {/* Accreditation Code */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-extrabold tracking-[0.16em] text-slate-500 uppercase block">
                  NATIONAL ACCREDITATION
                </span>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {contactConfig.accreditationText}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact-booking')}
                className="btn-cobalt px-8 py-3.5 text-xs font-extrabold tracking-wider shadow-md cursor-pointer"
              >
                Book e-TRiS Workshop
              </button>
            </div>
          </div>

          {/* Right 50%: Modern Curved Architectural Glass Ceiling Photo + Centered Overlay */}
          <div className="relative min-h-[460px] lg:min-h-[580px] bg-slate-950 flex flex-col items-center justify-center text-center p-8 overflow-hidden">
            {/* Background curved glass ceiling looking upward */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-55 mix-blend-luminosity scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop')`,
              }}
            />
            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80" />

            {/* Centered Content */}
            <div className="relative z-10 max-w-md space-y-6 text-center">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] font-display">
                Ready to elevate<br />
                workforce<br />
                potential?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                Unlock 100% HRDC grants with zero out-of-pocket cash. Receive official course proposals and trainer credentials within 2 hours.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact-booking')}
                  className="btn-cobalt px-8 sm:px-10 py-4 text-xs sm:text-sm font-extrabold tracking-wider shadow-2xl cursor-pointer"
                >
                  Register For Training
                </button>
              </div>
            </div>
          </div>

        </section>
      )}

    </div>
  );
};
