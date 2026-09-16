import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, Settings2 } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // always true
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('clevera_cookie_consent');
    if (!consent) {
      // Delay display slightly for smooth entrance
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'clevera_cookie_consent',
      JSON.stringify({ status: 'accepted_all', date: new Date().toISOString() })
    );
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem(
      'clevera_cookie_consent',
      JSON.stringify({ status: 'declined', date: new Date().toISOString() })
    );
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'clevera_cookie_consent',
      JSON.stringify({ status: 'custom', preferences, date: new Date().toISOString() })
    );
    setShowPreferences(false);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 text-slate-100 p-5 rounded-2xl shadow-2xl">
        {!showPreferences ? (
          <div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Privacy & Cookies Notice</span>
                  <span className="text-[10px] bg-blue-900/80 text-blue-300 px-1.5 py-0.5 rounded font-mono">
                    PDPA 2010
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Clevera Academy uses cookies to measure portal performance, remember your HRDC grant calculation parameters, and deliver compliant corporate training experiences under Malaysian PDPA guidelines.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setShowPreferences(true)}
                className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors min-h-[36px]"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecline}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700 min-h-[36px]"
                >
                  Decline
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-lg shadow-sm transition-colors min-h-[36px]"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Preferences Modal State */
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                Cookie Preferences
              </h4>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50">
                <div>
                  <span className="font-bold text-white block">Strictly Necessary</span>
                  <span className="text-slate-400 text-[11px]">Required for secure portal navigation & session auth.</span>
                </div>
                <span className="text-blue-400 font-semibold text-[11px]">Always On</span>
              </div>

              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Analytics & Performance</span>
                  <span className="text-slate-400 text-[11px]">Anonymously monitors page speed & grant calculator usage.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded bg-slate-700 border-slate-600 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Marketing & Retargeting</span>
                  <span className="text-slate-400 text-[11px]">Helps display tailored corporate workshop announcements.</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded bg-slate-700 border-slate-600 focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-lg flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
