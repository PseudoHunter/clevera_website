import React, { useState } from 'react';
import { TrainingModule, PageRoute } from '../types';
import { 
  X, 
  Clock, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Calendar, 
  Award,
  Sparkles,
  FileText
} from 'lucide-react';

interface SyllabusModalProps {
  module: TrainingModule | null;
  onClose: () => void;
  onBookModule?: (module: TrainingModule) => void;
  onNavigate?: (route: PageRoute) => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({
  module,
  onClose,
  onBookModule,
  onNavigate,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!module) return null;

  const handleDownloadPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-blue-600/80 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {module.categoryLabel}
            </span>
            <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {module.hrdcScheme} Scheme ({module.grantCode})
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug pr-8 font-sans">
            {module.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-blue-200">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Duration: <strong className="text-white">{module.duration}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Accreditation: <strong className="text-white">HRD Corp Certified (TTT)</strong></span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Executive Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Executive Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {module.fullDescription}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Why Companies Choose This Program
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {module.keyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day-by-Day Syllabus */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-500" />
              Structured Learning Roadmap
            </h3>
            <div className="space-y-4">
              {module.syllabus.map((s, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40">
                  <div className="bg-slate-100/90 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wide text-blue-700">
                      {s.day}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {s.theme}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    {s.modules.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Learning Outcomes */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tangible Workplace Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {module.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              Recommended Audience
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {module.targetAudience.map((aud, idx) => (
                <span 
                  key={idx}
                  className="bg-slate-100 border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium"
                >
                  {aud}
                </span>
              ))}
            </div>
          </div>

          {/* Trainer Specialty Note */}
          <div className="text-xs text-slate-500 border-t border-slate-100 pt-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Facilitated by: <strong className="text-slate-800">{module.trainerSpecialty}</strong></span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            {downloadSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Syllabus Outline (PDF) Generated!
              </span>
            ) : (
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg border border-slate-300 hover:border-blue-400 bg-white"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>{downloading ? 'Preparing PDF...' : 'Download Course Outline (PDF)'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onBookModule) {
                  onBookModule(module);
                } else if (onNavigate) {
                  onNavigate('contact-booking');
                }
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-200" />
              <span>Book This Program (100% HRDC)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
