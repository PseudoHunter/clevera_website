import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';
import { PageRoute } from '../types';

interface EligibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    registeredSSM: true,
    tenPlusEmployees: true,
    paysHrdcLevy: true,
    hasLevyBalance: 'yes', // 'yes' | 'unsure' | 'no'
  });

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setAnswers({
      registeredSSM: true,
      tenPlusEmployees: true,
      paysHrdcLevy: true,
      hasLevyBalance: 'yes',
    });
  };

  const isEligible = answers.registeredSSM && answers.tenPlusEmployees && answers.paysHrdcLevy;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Malaysian PSMB Act 2001 Assessment</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            HRDC Claimable Eligibility Checker
          </h3>
          <p className="text-xs text-blue-200 mt-1">
            Answer 3 quick questions to determine if your training qualifies for 100% SBL-Khas grant coverage.
          </p>
        </div>

        {/* Wizard Content */}
        <div className="p-6">
          {step <= 3 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Question {step} of 3</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <span 
                      key={s} 
                      className={`h-1.5 w-6 rounded-full transition-all ${
                        s === step ? 'bg-blue-600' : s < step ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900">
                    Is your company registered in Malaysia under SSM (Sdn Bhd / Berhad / LLP)?
                  </h4>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, registeredSSM: true });
                        setStep(2);
                      }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 font-bold text-slate-800 text-sm transition-all"
                    >
                      Yes, registered with SSM
                    </button>
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, registeredSSM: false });
                        setStep(2);
                      }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 font-medium text-slate-700 text-sm transition-all"
                    >
                      No / Foreign Entity
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900">
                    Does your organization employ 10 or more Malaysian employees?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Under the PSMB Act 2001, employers in manufacturing, services, and primary sectors with 10+ employees are mandated to register with HRD Corp.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, tenPlusEmployees: true });
                        setStep(3);
                      }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 font-bold text-slate-800 text-sm transition-all"
                    >
                      Yes, 10 or more
                    </button>
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, tenPlusEmployees: false });
                        setStep(3);
                      }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 font-medium text-slate-700 text-sm transition-all"
                    >
                      Less than 10 (Optional HRDC)
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900">
                    Do you currently contribute the monthly 1% HRD Corp levy via the e-TRiS portal?
                  </h4>
                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() => {
                        setAnswers({ ...answers, paysHrdcLevy: true, hasLevyBalance: 'yes' });
                        setStep(4);
                      }}
                      className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <span className="font-bold text-sm text-slate-900 block">Yes, we actively contribute monthly</span>
                      <span className="text-xs text-slate-500">We have an active e-TRiS employer account and accumulated levy.</span>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, paysHrdcLevy: true, hasLevyBalance: 'unsure' });
                        setStep(4);
                      }}
                      className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <span className="font-bold text-sm text-slate-900 block">We are registered, but unsure of exact balance</span>
                      <span className="text-xs text-slate-500">Our HR / Finance handles payments; need a quick balance check.</span>
                    </button>

                    <button
                      onClick={() => {
                        setAnswers({ ...answers, paysHrdcLevy: false });
                        setStep(4);
                      }}
                      className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all"
                    >
                      <span className="font-bold text-sm text-slate-900 block">No, we have not yet registered with HRD Corp</span>
                      <span className="text-xs text-slate-500">Looking to register or take private corporate training.</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Result Step */
            <div className="space-y-5 animate-in fade-in">
              {isEligible ? (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">
                    Congratulations! 100% SBL-Khas Grant Eligible
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your company is fully primed to claim all corporate training, team building retreats, and leadership workshops with <strong className="text-emerald-700">zero upfront cash payment</strong>. Clevera Academy will generate your e-TRiS grant proposal within 2 hours.
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-800 text-left space-y-1.5">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      What Happens Next:
                    </div>
                    <p>&bull; <strong>Select your program</strong> from our Retail, Team Synergy, or AI modules.</p>
                    <p>&bull; Clevera Academy issues the official Quotation & Trainer Profile (TTT certified).</p>
                    <p>&bull; Submit on e-TRiS 24h prior to course start for instantaneous grant approval.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">
                    Registration or Verification Needed
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    You may not yet be utilizing your full HRD Corp entitlement, or you can register now to turn monthly tax contributions into powerful team training. You can also engage Clevera Academy via direct corporate billing.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('contact-booking');
                    }}
                    className="px-5 py-2.5 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <span>{isEligible ? 'Book SBL-Khas Training' : 'Speak with HRDC Advisor'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
