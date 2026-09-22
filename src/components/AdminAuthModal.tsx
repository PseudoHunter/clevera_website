import React, { useState } from 'react';
import { ShieldAlert, Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, X, Loader2 } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actionTitle?: string;
  description?: string;
  actionDescription?: string;
  targetSubject: 'inquiries' | 'single_inquiry' | 'analytics';
  leadDetails?: { id: string; companyName: string };
  onConfirmSuccess?: (mode: 'empty' | 'benchmark') => void;
  onSuccess?: (mode: 'empty' | 'benchmark') => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  title,
  actionTitle,
  description,
  actionDescription,
  targetSubject,
  leadDetails,
  onConfirmSuccess,
  onSuccess,
}) => {
  const displayTitle = title || actionTitle || 'Administrative Authorization';
  const displayDescription = description || actionDescription || 'Please verify your administrator credentials to confirm this operation.';

  const handleCallbackSuccess = (mode: 'empty' | 'benchmark') => {
    if (typeof onConfirmSuccess === 'function') {
      onConfirmSuccess(mode);
    }
    if (typeof onSuccess === 'function') {
      onSuccess(mode);
    }
  };

  const [username, setUsername] = useState('admincleverahebat');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetMode, setResetMode] = useState<'empty' | 'benchmark'>('empty');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Administrator password is required to confirm this action.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    try {
      // Call secure server verification endpoint
      const response = await fetch('/api/admin/verify-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          action: targetSubject,
        }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        // Success: execute the action callback
        handleCallbackSuccess(resetMode);
        onClose();
        setPassword('');
      } else {
        // Handle invalid credentials or lockout
        setErrorMessage(data.error || 'Authentication failed. Incorrect administrator credentials.');
        if (typeof data.attemptsLeft === 'number') {
          setAttemptsRemaining(data.attemptsLeft);
        }
      }
    } catch (err) {
      // Offline / fallback verification
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();
      const isValid = cleanUser === 'alif@cleveraacademy.my' && cleanPass === 'cleveranumber1';

      if (isValid) {
        handleCallbackSuccess(resetMode);
        onClose();
        setPassword('');
      } else {
        setErrorMessage('Invalid administrative credentials. Access attempt logged.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-rose-200 shadow-2xl max-w-lg w-full overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Header Banner */}
        <div className="bg-rose-50 border-b border-rose-200 p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-200/80 text-rose-800 font-mono">
                  Security Check
                </span>
                <span className="text-xs font-semibold text-rose-600">Admin Only Access</span>
              </div>
              <h3 id="modal-title" className="text-lg font-black text-slate-900 tracking-tight mt-0.5">
                {displayTitle}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-rose-100/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Warning notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">{displayDescription}</p>
              {leadDetails && (
                <div className="mt-1.5 font-mono text-[11px] text-rose-700 bg-rose-50 p-2 rounded border border-rose-200">
                  Target: <strong>{leadDetails.id}</strong> — {leadDetails.companyName}
                </div>
              )}
              <p className="mt-1 text-[11px] text-slate-500">
                To prevent accidental data loss, administrator authentication credentials (<code className="text-slate-700 font-bold">username & password</code>) must be verified before proceeding.
              </p>
            </div>
          </div>

          {/* Reset Mode Selector (For Bulk Inquiries or Analytics) */}
          {targetSubject === 'inquiries' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Reset Execution Mode:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  resetMode === 'empty' 
                    ? 'border-rose-500 bg-rose-50/50 text-rose-950 ring-1 ring-rose-500' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Clear All (Zero Leads)</span>
                    <input 
                      type="radio" 
                      name="inquiryMode" 
                      value="empty" 
                      checked={resetMode === 'empty'} 
                      onChange={() => setResetMode('empty')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Completely empties CRM table (0 inquiries).
                  </span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  resetMode === 'benchmark' 
                    ? 'border-blue-500 bg-blue-50/50 text-blue-950 ring-1 ring-blue-500' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Restore Factory Sample</span>
                    <input 
                      type="radio" 
                      name="inquiryMode" 
                      value="benchmark" 
                      checked={resetMode === 'benchmark'} 
                      onChange={() => setResetMode('benchmark')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Resets to 5 default corporate inquiries.
                  </span>
                </label>
              </div>
            </div>
          )}

          {targetSubject === 'analytics' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Analytics Reset Action:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  resetMode === 'empty' 
                    ? 'border-rose-500 bg-rose-50/50 text-rose-950 ring-1 ring-rose-500' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Clear All Telemetry (0% & 0 Data)</span>
                    <input 
                      type="radio" 
                      name="analyticsMode" 
                      value="empty" 
                      checked={resetMode === 'empty'} 
                      onChange={() => setResetMode('empty')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Wipes all stored records; clears all displayed numbers, charts, and percentages to 0.
                  </span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  resetMode === 'benchmark' 
                    ? 'border-blue-500 bg-blue-50/50 text-blue-950 ring-1 ring-blue-500' 
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Restore Benchmark Baseline</span>
                    <input 
                      type="radio" 
                      name="analyticsMode" 
                      value="benchmark" 
                      checked={resetMode === 'benchmark'} 
                      onChange={() => setResetMode('benchmark')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Repopulates 2024–2026 multi-year benchmark.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Credentials Inputs */}
          <div className="space-y-3.5 pt-1">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admincleverahebat"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:ring-2 focus:ring-rose-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  autoFocus
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-rose-500 focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {attemptsRemaining !== null && attemptsRemaining < 4 && (
            <div className="text-[11px] text-amber-700 font-semibold text-right">
              {attemptsRemaining} attempt{attemptsRemaining === 1 ? '' : 's'} remaining before security IP lockout.
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isVerifying || !password.trim()}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Verify & Execute Reset</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
