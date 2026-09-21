import React, { useState } from 'react';
import { PageRoute, TrainingModule, CorporateInquiry } from '../types';
import { useContent } from '../context/ContentContext';
import { 
  Calendar, 
  Building2, 
  Mail, 
  Phone, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Lock,
  Clock,
  MapPin,
  MessageCircle
} from 'lucide-react';

interface ContactBookingPageProps {
  onNavigate: (route: PageRoute) => void;
  preSelectedModule?: TrainingModule | null;
  onLeadSubmitted: (lead: CorporateInquiry) => void;
}

export const ContactBookingPage: React.FC<ContactBookingPageProps> = ({
  onNavigate,
  preSelectedModule,
  onLeadSubmitted,
}) => {
  const { modules, contactConfig } = useContent();
  const [step, setStep] = useState<number>(1);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    moduleId: preSelectedModule ? preSelectedModule.id : (modules[0]?.id || 'retail-sales-mastery'),
    participantsCount: 25,
    preferredDate: '',
    trainingFormat: 'In-House (Our Office)' as 'In-House (Our Office)' | 'External Retreat / Hotel' | 'Virtual / Hybrid',
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    industry: 'Retail & Consumer Goods',
    hrdcRegistered: 'Yes' as 'Yes' | 'No' | 'Unsure',
    budgetOrNotes: '',
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.moduleId) newErrors.moduleId = 'Please select a training module';
    if (!formData.participantsCount || formData.participantsCount < 5) {
      newErrors.participantsCount = 'Minimum 5 participants required for corporate programs';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required for e-TRiS quotation';
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact person name is required';
    }
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please provide a valid corporate email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Malaysian mobile or office phone is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number (e.g. +60 12-345 6789)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setShowSummaryModal(true);
      }
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    if (step === 1) validateStep1();
    if (step === 2) validateStep2();
  };

  const selectedModuleObj = modules.find(m => m.id === formData.moduleId) || modules[0] || {
    id: 'custom',
    title: 'Custom Corporate Program',
    categoryLabel: 'Custom',
    duration: '2 Days',
    hrdcScheme: 'SBL-Khas Approved',
    grantCode: 'HRDC-2026-GEN'
  } as any;

  const handleFinalSubmit = () => {
    setSubmitting(true);
    
    setTimeout(() => {
      const generatedId = `CA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInquiry: CorporateInquiry = {
        id: generatedId,
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        companyName: formData.companyName,
        contactName: formData.contactName,
        workEmail: formData.workEmail,
        phone: formData.phone,
        industry: formData.industry,
        participantsCount: Number(formData.participantsCount),
        preferredDate: formData.preferredDate || 'Flexible / Q4 2026',
        moduleId: formData.moduleId,
        moduleTitle: selectedModuleObj.title,
        hrdcRegistered: formData.hrdcRegistered,
        trainingFormat: formData.trainingFormat,
        budgetOrNotes: formData.budgetOrNotes,
        status: 'New',
        assignedRep: 'Sarah Wong',
      };

      onLeadSubmitted(newInquiry);
      setSubmitting(false);
      setShowSummaryModal(false);
      onNavigate('thank-you');
    }, 1200);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#3430eb]/20 border border-[#3430eb]/40 text-[#60a5fa] text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fast-Track HRDC SBL-Khas Booking</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            Book Corporate Training & Request Official Quotation
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Fill out the 2-minute corporate training brief. Our compliance desk dispatches your itemized proposal, trainer CV, and course code within 2 hours.
          </p>
        </div>
      </section>

      {/* Main Multi-Step Form Wrapper */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Step Indicator Progress Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-emerald-600 text-white'
                }`}>
                  {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '1'}
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Step 1: Program & Logistics
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Select module, participant count & venue
                  </span>
                </div>
              </div>

              <div className="hidden sm:block w-16 h-0.5 bg-slate-200" />

              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 2 ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-200 text-slate-600'
                }`}>
                  2
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Step 2: Company & HR Contact
                  </span>
                  <span className="text-[11px] text-slate-500">
                    SSM registered details & levy status
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            
            {/* STEP 1: PROGRAM & LOGISTICS */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Select Training Module */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Select Core Training Masterclass *
                  </label>
                  <select
                    value={formData.moduleId}
                    onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {modules.map((m) => (
                      <option key={m.id} value={m.id}>
                        [{m.categoryLabel.split('&')[0].trim()}] {m.title} ({m.duration})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Grant Scheme: <strong className="text-emerald-700">{selectedModuleObj.hrdcScheme}</strong> &bull; Code: {selectedModuleObj.grantCode}
                  </p>
                </div>

                {/* Delivery Mode & Pax */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Training Delivery Format *
                    </label>
                    <select
                      value={formData.trainingFormat}
                      onChange={(e) => setFormData({ ...formData, trainingFormat: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="In-House (Our Office)">In-House (At Your Office / HQ)</option>
                      <option value="External Retreat / Hotel">External Resort / Hotel Retreat</option>
                      <option value="Virtual / Hybrid">Virtual Interactive Masterclass</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                      <span>Estimated Participants (Pax) *</span>
                      <span className="text-blue-700 font-bold">{formData.participantsCount} Pax</span>
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="300"
                      value={formData.participantsCount}
                      onChange={(e) => setFormData({ ...formData, participantsCount: Number(e.target.value) })}
                      onBlur={() => handleBlur('participantsCount')}
                      className={`w-full bg-slate-50 border text-slate-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:outline-none ${
                        errors.participantsCount ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500'
                      }`}
                    />
                    {errors.participantsCount && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.participantsCount}
                      </p>
                    )}
                  </div>

                </div>

                {/* Preferred Dates & Special Customization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Preferred Training Date (Tentative)
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Applications on e-TRiS must be submitted at least 1 day in advance.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Industry Sector
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Retail & Consumer Goods">Retail & Consumer Goods</option>
                      <option value="Manufacturing & Industrial">Manufacturing & Industrial</option>
                      <option value="Banking, Finance & Fintech">Banking, Finance & Fintech</option>
                      <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                      <option value="Hospitality & Healthcare">Hospitality & Healthcare</option>
                      <option value="Government Linked (GLC) / Semi-Gov">Government Linked (GLC)</option>
                    </select>
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="min-h-[44px] px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>Proceed to Company Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: COMPANY & HR DETAILS */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Company / Organization Name *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Apex Retail Solutions Sdn Bhd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        onBlur={() => handleBlur('companyName')}
                        className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 focus:ring-2 focus:outline-none ${
                          errors.companyName ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* Contact Person Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Contact Person (HR Manager / Lead) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Puan Faridah binti Kassim"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      onBlur={() => handleBlur('contactName')}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-800 focus:ring-2 focus:outline-none ${
                        errors.contactName ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500'
                      }`}
                    />
                    {errors.contactName && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.contactName}
                      </p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Corporate Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Corporate Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="hr@yourcompany.com.my"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        onBlur={() => handleBlur('workEmail')}
                        className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 focus:ring-2 focus:outline-none ${
                          errors.workEmail ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.workEmail && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.workEmail}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+60 12-345 6789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onBlur={() => handleBlur('phone')}
                        className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 focus:ring-2 focus:outline-none ${
                          errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                </div>

                {/* HRDC Levy Status */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Are you registered with HRD Corp and paying the monthly 1% levy?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Yes', 'No', 'Unsure'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, hrdcRegistered: opt })}
                        className={`py-3 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                          formData.hrdcRegistered === opt
                            ? 'border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-500/20'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {opt === 'Yes' && '✓ Yes, Registered'}
                        {opt === 'No' && 'No (Direct Billing)'}
                        {opt === 'Unsure' && '? Unsure (Need Check)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Specific Learning Goals / Department Challenges (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g., We want to focus on retail upselling during weekend shifts, or reduce friction between Sales and Warehouse teams..."
                    value={formData.budgetOrNotes}
                    onChange={(e) => setFormData({ ...formData, budgetOrNotes: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Step 2 Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="min-h-[44px] px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Step 1</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="min-h-[44px] px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>Review Quotation Summary</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Dynamic Direct Contact Cards from Admin Contact Config */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {contactConfig.phoneLabel}
              </span>
              <a 
                href={`tel:${contactConfig.primaryPhone.replace(/\s+/g, '')}`} 
                className="font-bold text-sm text-slate-900 hover:text-blue-600 block mt-0.5"
              >
                {contactConfig.primaryPhone}
              </a>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {contactConfig.operatingHours}
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {contactConfig.whatsappLabel}
              </span>
              <a 
                href={contactConfig.whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                className="font-bold text-sm text-emerald-600 hover:underline block mt-0.5"
              >
                {contactConfig.whatsappNumber}
              </a>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Instant WhatsApp Desk
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Official Inquiries
              </span>
              <a 
                href={`mailto:${contactConfig.primaryEmail}`} 
                className="font-bold text-xs text-slate-900 hover:text-blue-600 block mt-0.5 truncate"
              >
                {contactConfig.primaryEmail}
              </a>
              {contactConfig.secondaryEmail && (
                <a 
                  href={`mailto:${contactConfig.secondaryEmail}`} 
                  className="text-[11px] text-slate-500 hover:text-blue-600 block mt-0.5 truncate"
                >
                  {contactConfig.secondaryEmail}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONFIRMATION SUMMARY MODAL (Prior to final submission) */}
      {showSummaryModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowSummaryModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">
                  Confirm e-TRiS Training Proposal Request
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Please verify your details before final dispatch to our Malaysian compliance desk.
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 space-y-2">
                <div className="font-bold text-sm text-blue-950">
                  {selectedModuleObj.title}
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-blue-800">
                  <span>Format: <strong>{formData.trainingFormat}</strong></span>
                  <span>&bull;</span>
                  <span>Pax: <strong>{formData.participantsCount} Employees</strong></span>
                  <span>&bull;</span>
                  <span>Scheme: <strong>{selectedModuleObj.hrdcScheme}</strong></span>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Company:</span>
                  <span className="font-bold text-slate-900">{formData.companyName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Contact Person:</span>
                  <span className="font-bold text-slate-900">{formData.contactName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Corporate Email:</span>
                  <span className="font-bold text-slate-900">{formData.workEmail}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Phone / WhatsApp:</span>
                  <span className="font-bold text-slate-900">{formData.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">HRDC Registered:</span>
                  <span className="font-bold text-emerald-700">{formData.hrdcRegistered}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Estimated Out-of-Pocket:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    RM 0.00 (100% SBL-Khas)
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-slate-500 leading-snug">
                🔒 Protected under the Malaysian Personal Data Protection Act (PDPA 2010). Your information is strictly used to prepare official HRD Corp documentation.
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
              >
                Edit Details
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="btn-cobalt px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>{submitting ? 'Submitting to e-TRiS Desk...' : 'Confirm & Request Proposal'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
