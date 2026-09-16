import React from 'react';
import { Calendar, Phone, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types';

interface StickyMobileCTAProps {
  onNavigate: (route: PageRoute) => void;
  currentRoute?: PageRoute;
  onOpenEligibility?: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onNavigate, currentRoute }) => {
  // If user is already on booking form or admin, hide or adapt
  if (currentRoute === 'contact-booking' || currentRoute === 'admin') {
    return null;
  }

  return (
    <aside 
      aria-label="Quick booking actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-md border-t border-white/10 px-3.5 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
        
        {/* Quick Phone Call Button */}
        <a
          href="tel:+60322828900"
          className="flex-shrink-0 flex items-center justify-center gap-1.5 min-h-[44px] px-4 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold hover:bg-white/10 active:scale-95 transition-all"
          aria-label="Call Clevera Academy"
        >
          <Phone className="w-3.5 h-3.5 text-[#60a5fa]" />
          <span>Call HQ</span>
        </a>

        {/* Primary Book HRDC Workshop Button (Cobalt Pill) */}
        <button
          onClick={() => {
            onNavigate('contact-booking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 min-w-0 min-h-[44px] flex items-center justify-center gap-2 px-5 rounded-full bg-[#3430eb] hover:bg-[#2723cb] active:bg-[#1f1ba8] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-[0.98]"
        >
          <Calendar className="w-3.5 h-3.5 text-blue-200 shrink-0" />
          <span className="truncate">Book Workshop</span>
          <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full text-white font-black shrink-0">
            SBL-Khas
          </span>
        </button>

      </div>
      
      {/* Sub-label for trust */}
      <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[10px] text-slate-400">
        <ShieldCheck className="w-3 h-3 text-emerald-400" />
        <span className="truncate font-medium">HRD Corp Approved &bull; Zero Out-Of-Pocket Guarantee</span>
      </div>
    </aside>
  );
};
