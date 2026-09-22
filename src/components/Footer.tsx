import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CleveraLogo } from './CleveraLogo';
import { useContent } from '../context/ContentContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  FileCode2,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenMetaInspector?: () => void;
  onOpenSitemapModal?: () => void;
  onOpenEligibility?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenMetaInspector,
  onOpenSitemapModal,
  onOpenEligibility
}) => {
  const { footerConfig, contactConfig } = useContent();
  const [brochureEmail, setBrochureEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const openInspector = onOpenMetaInspector || onOpenSitemapModal || (() => {});

  const handleBrochureDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (brochureEmail.trim() && brochureEmail.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setBrochureEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Accreditation */}
          <div className="lg:col-span-2 space-y-4">
            {/* Aesthetic Rounded Brand Card - matching Navigation Header Logo & Typography */}
            <div 
              onClick={() => onNavigate('home')}
              className="inline-flex items-center bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group select-none"
              title="Clevera Academy - Return to Home"
            >
              <CleveraLogo 
                variant="horizontal" 
                theme="light" 
                size="md" 
                className="group-hover:opacity-95 transition-opacity"
              />
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {footerConfig.brandDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs px-3 py-1.5 rounded-lg font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{footerConfig.myCoIdText}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg font-medium">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{footerConfig.grantClaimableText}</span>
              </div>
            </div>

            {/* Quick brochure subscribe */}
            <div className="pt-4 max-w-sm">
              <span className="block text-xs font-semibold text-slate-200 mb-2">
                {footerConfig.catalogHeading}
              </span>
              {subscribed ? (
                <div className="bg-emerald-900/50 border border-emerald-600/60 text-emerald-200 text-xs p-3 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Success! Catalog link dispatched to your email.</span>
                </div>
              ) : (
                <form onSubmit={handleBrochureDownload} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email..."
                    value={brochureEmail}
                    onChange={(e) => setBrochureEmail(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 flex-1 min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-[#3430eb] hover:bg-[#2723cb] text-white font-bold text-xs px-4 py-2.5 rounded-full transition-colors shrink-0 flex items-center gap-1 cursor-pointer shadow-md"
                  >
                    <span>{footerConfig.catalogButtonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('modules')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Retail Leadership & Operations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('modules')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Team Synergy & People Dynamics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('modules')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Digital & AI for Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('modules')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Employment Act 1955 Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('modules')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Credit Control & Debt Recovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('modules')}
                  className="hover:text-blue-400 transition-colors text-left text-blue-400 font-medium inline-flex items-center gap-1"
                >
                  <span>View All 10+ Modules</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: HR Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              HR Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('hrdc-guide')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Step-by-Step e-TRiS Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hrdc-guide')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  SBL-Khas Grant Scheme
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hrdc-guide')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Eligibility Checker for Employers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery-about')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Our Certified Trainers (TTT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery-about')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Past Client Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Real Malaysian Address & Contacts */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {contactConfig.officeName}
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {contactConfig.addressLine1},<br />
                  {contactConfig.addressLine2},<br />
                  {contactConfig.cityStateZip}
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <a href={`tel:${contactConfig.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors block">
                    {contactConfig.primaryPhone}{contactConfig.phoneLabel?.trim() ? ` (${contactConfig.phoneLabel.trim()})` : ''}
                  </a>
                  <a href={contactConfig.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors text-[11px] text-slate-400">
                    {contactConfig.whatsappNumber}{contactConfig.whatsappLabel?.trim() ? ` (${contactConfig.whatsappLabel.trim()})` : ''}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <a href={`mailto:${contactConfig.primaryEmail}`} className="hover:text-white transition-colors block">
                    {contactConfig.primaryEmail}
                  </a>
                  {contactConfig.secondaryEmail && (
                    <a href={`mailto:${contactConfig.secondaryEmail}`} className="hover:text-white transition-colors text-[11px] text-slate-400">
                      {contactConfig.secondaryEmail}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{contactConfig.operatingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            {footerConfig.copyrightText}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => onNavigate('privacy')} 
              className="hover:text-slate-300 transition-colors"
            >
              PDPA Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate('terms')} 
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
