import React from 'react';
import { PageRoute } from '../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Phone, 
  FileText, 
  Download 
} from 'lucide-react';

interface ThankYouPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onNavigate }) => {
  const refCode = `CA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-8 animate-in fade-in">
      
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Inquiry Successfully Registered with e-TRiS Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans tracking-tight">
          Thank You! Your Corporate Training Proposal is Underway.
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Our HRDC Compliance Specialist has received your requirements and is compiling your customized course outline, trainer CV, and official SBL-Khas quotation.
        </p>
      </div>

      {/* Reference Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-lg mx-auto shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-xs text-slate-500 font-medium">Inquiry Reference ID:</span>
          <span className="font-mono font-bold text-base text-blue-700">{refCode}</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
            What happens next:
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              1
            </div>
            <p className="text-slate-600">
              <strong>Official Proposal in &lt;2 Hours:</strong> You will receive an email containing the complete syllabus, course schedule, and itemized fee breakdown.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              2
            </div>
            <p className="text-slate-600">
              <strong>e-TRiS Grant Support:</strong> Our team assists your HR department in filling out the grant application on e-TRiS with 100% approval verification.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              3
            </div>
            <p className="text-slate-600">
              <strong>Zero Cash Upfront:</strong> Your organization incurs RM 0.00 upfront payment under the SBL-Khas arrangement.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('modules')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Explore Other Modules</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href="https://wa.me/60123847291?text=Hi%20Clevera%20Academy,%20I%20just%20submitted%20a%20corporate%20training%20booking"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          <span>Chat via WhatsApp</span>
        </a>

        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all"
        >
          Back to Home
        </button>
      </div>

    </div>
  );
};
