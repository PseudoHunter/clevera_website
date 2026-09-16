import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

interface LegalPagesProps {
  type: 'privacy' | 'terms';
  onNavigate: (route: PageRoute) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ type, onNavigate }) => {
  if (type === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Malaysian PDPA 2010 Compliance Notice</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 font-sans">
            Personal Data Protection Act (PDPA) Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last revised: September 15, 2026 &bull; Clevera Academy Sdn. Bhd. (Registration No. 1429810-W)
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Collection of Personal and Corporate Data</h2>
            <p>
              In compliance with the Malaysian Personal Data Protection Act 2010 (PDPA), Clevera Academy collects information solely to facilitate corporate training services, HRD Corp (HRDF) SBL-Khas grant documentation, e-TRiS compliance verification, and certification delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Categories of Information Collected</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Corporate details: Company name, SSM registration number, HRDC Employer Code (MyCoID).</li>
              <li>HR Contact details: Full name, work email address, corporate telephone or mobile number.</li>
              <li>Participant details: Attendance records, IC number or passport number (strictly for HRDC Joint Declaration Form 14 certification).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Purpose and Disclosure</h2>
            <p>
              Your data is never sold or shared with commercial marketing third parties. Disclosures are made strictly to statutory regulatory authorities including the Human Resource Development Corporation (HRD Corp) and Ministry of Human Resources Malaysia (KESUMA) to satisfy levy claiming compliance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Data Subject Rights & Inquiries</h2>
            <p>
              You have the right to request access to and correction of your personal data held by us. For any data protection inquiries, contact our Data Protection Officer at: <strong className="text-blue-600">privacy@cleveraacademy.my</strong>.
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Institutional Corporate Training Agreement</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 font-sans">
          Terms & Conditions of Corporate Training Service
        </h1>
        <p className="text-xs text-slate-500">
          Last revised: September 15, 2026 &bull; Clevera Academy Sdn. Bhd.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. SBL-Khas Grant Approvals & Payment</h2>
          <p>
            Under the HRD Corp SBL-Khas scheme, approved course fees are claimed directly by Clevera Academy from the employer's HRDC levy account upon successful training completion. The employer agrees to submit grant applications on e-TRiS at least one (1) day prior to program commencement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Attendance & Certification Thresholds</h2>
          <p>
            In accordance with HRD Corp governance guidelines, participants must complete a minimum of 75% total workshop contact hours to qualify for levy claim disbursements and receive the official Clevera Academy Certificate of Competency.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Postponement & Rescheduling Policy</h2>
          <p>
            Postponements requested at least fourteen (14) calendar days prior to the confirmed date incur zero penalty. Postponements within 7 days may require e-TRiS grant amendment paperwork to update the trainer delivery schedule.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Intellectual Property</h2>
          <p>
            All custom simulation roleplay scripts, behavioral diagnostic workbooks, and PowerPoint decks supplied remain the intellectual property of Clevera Academy Sdn. Bhd.
          </p>
        </section>
      </div>
    </div>
  );
};
