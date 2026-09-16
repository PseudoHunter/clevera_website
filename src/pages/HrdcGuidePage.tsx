import React, { useState } from 'react';
import { PageRoute } from '../types';
import { HRDC_FAQ_ITEMS } from '../data/mockData';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ArrowRight, 
  FileCheck, 
  DollarSign,
  AlertCircle,
  Phone
} from 'lucide-react';

interface HrdcGuidePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenEligibility: () => void;
}

export const HrdcGuidePage: React.FC<HrdcGuidePageProps> = ({
  onNavigate,
  onOpenEligibility,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      stepNumber: '01',
      stage: 'Pre-Training Phase',
      title: 'Quotation & e-TRiS Grant Submission',
      desc: 'Submit your grant application on the official HRD Corp e-TRiS portal at least one (1) day before the training commences.',
      deliverables: [
        'Clevera Academy provides Official Quotation (Quotation No. & MyCoID)',
        'Course Proposal & Detailed Schedule breakdown',
        'Trainer Profile with HRDC TTT/Exemption Certificate',
        'Company submits on e-TRiS > Grant > Apply Grant (SBL-Khas Scheme)'
      ],
      timing: '1 to 7 days before training date'
    },
    {
      stepNumber: '02',
      stage: 'During Training Phase',
      title: 'Attendance Verification & Workshop Delivery',
      desc: 'Ensure all registered employees attend the sessions and sign daily physical or biometric e-TRiS attendance logs.',
      deliverables: [
        'Daily attendance sheet signed by participants and master trainer',
        'HRD Corp QR code attendance scan (if mandated by venue)',
        'Interactive workshop delivery with case studies & roleplays',
        'Photographic evidence of session for compliance file'
      ],
      timing: 'Day of training'
    },
    {
      stepNumber: '03',
      stage: 'Post-Training Phase',
      title: 'Zero Out-Of-Pocket Levy Disbursement',
      desc: 'Clevera Academy directly submits the claim to HRD Corp. Your company does not pay course fees out-of-pocket.',
      deliverables: [
        'Clevera Academy issues Joint Declaration Form (JD 14)',
        'Training provider claims directly from your HRDC Levy Account',
        'Employer only submits standard internal post-course report',
        'HRD Corp disburses directly to Clevera Academy'
      ],
      timing: 'Within 6 months post-training'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Page Header */}
      <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#3430eb]/20 border border-[#3430eb]/40 text-[#60a5fa] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Malaysian Human Resource Development Corporation (HRD Corp)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            HRDC SBL-Khas Claiming Guide for HR Managers
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Everything your HR & Finance department needs to know to claim 100% of corporate training fees with zero out-of-pocket cash requirements under the SBL-Khas Scheme.
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={onOpenEligibility}
              className="btn-cobalt px-7 py-3.5 text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Test Company Eligibility</span>
            </button>
            <button
              onClick={() => onNavigate('contact-booking')}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Request Fast-Track Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3-Step Walkthrough */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Frictionless 3-Stage Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mt-1">
            How the SBL-Khas Process Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Under SBL-Khas, employers never pay course fees upfront. HRD Corp settles directly with Clevera Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-blue-600 font-sans">
                    {s.stepNumber}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide bg-slate-100 px-2.5 py-1 rounded-md">
                    {s.stage}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {s.desc}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Requirements:
                  </span>
                  {s.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Timeline: {s.timing}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Allowable Cost Matrix Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Regulatory Cost Matrix
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Official HRD Corp Allowable Claim Ceilings
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Guidelines according to latest HRD Corp Employers’ Circular on Allowable Costs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="py-3 px-4 font-bold text-slate-800">Training Type</th>
                  <th className="py-3 px-4 font-bold text-slate-800">Allowable Course Fee Ceiling</th>
                  <th className="py-3 px-4 font-bold text-slate-800">Meal / Consumables Subsidy</th>
                  <th className="py-3 px-4 font-bold text-slate-800">SBL-Khas Upfront Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                <tr>
                  <td className="py-3 px-4 font-bold text-blue-900">In-House Corporate Program</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">Up to RM 6,000 / group / day</td>
                  <td className="py-3 px-4">RM 50 – RM 100 / pax / day</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">RM 0 (Direct HRDC claim)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-blue-900">External Team Building Retreat</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">Up to RM 1,300 / pax / day</td>
                  <td className="py-3 px-4">Included in hotel package / claims</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">RM 0 (Direct HRDC claim)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-blue-900">Digital / Virtual Masterclass</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">Up to RM 700 / pax / day</td>
                  <td className="py-3 px-4">E-learning materials covered</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">RM 0 (Direct HRDC claim)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-blue-50/70 p-3 rounded-xl border border-blue-100">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Note: Clevera Academy prepares the exact itemized quotation matching these allowable thresholds so your e-TRiS grant is approved without revision requests from HRD Corp officers.
            </p>
          </div>
        </div>
      </section>

      {/* HRDC FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mt-1">
            Common Questions by Malaysian HR Practitioners
          </h2>
        </div>

        <div className="space-y-3">
          {HRDC_FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-blue-900">
              Have a tricky e-TRiS submission or query about your levy balance?
            </h4>
            <p className="text-xs text-blue-700 mt-0.5">
              Speak directly with our HRDC Grant Compliance Specialist.
            </p>
          </div>
          <a
            href="https://wa.me/60123847291"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp HRDC Helpdesk</span>
          </a>
        </div>
      </section>

    </div>
  );
};
