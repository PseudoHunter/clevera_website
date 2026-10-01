import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { PageRoute, AdminContentSubTab } from '../types';
import { 
  ShieldCheck, 
  Globe, 
  UploadCloud, 
  Sliders, 
  ExternalLink, 
  Loader2, 
  CheckCircle2, 
  Settings,
  ChevronDown
} from 'lucide-react';

interface AdminQuickBarProps {
  onNavigate: (route: PageRoute) => void;
  adminUser?: { username: string; role: string } | null;
  currentRoute: PageRoute;
}

export const AdminQuickBar: React.FC<AdminQuickBarProps> = ({
  onNavigate,
  adminUser,
  currentRoute,
}) => {
  const { 
    isPublishingToServer, 
    lastServerSyncTime, 
    publishAllToServer,
    setAdminEditorTargetTab 
  } = useContent();

  const [toast, setToast] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handlePublishAll = async () => {
    const res = await publishAllToServer();
    setToast(res.message);
    setTimeout(() => setToast(null), 4000);
  };

  const handleJumpToSection = (tab: AdminContentSubTab) => {
    setAdminEditorTargetTab(tab);
    setDropdownOpen(false);
    onNavigate('admin');
  };

  return (
    <aside 
      aria-label="Administrative Multi-Server Management Bar"
      className="bg-slate-950 text-white border-b border-blue-500/30 px-4 py-2 sticky top-0 z-50 shadow-md backdrop-blur-md bg-opacity-95"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap text-xs">
        
        {/* Left: Admin Identity & Multi-Server Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-blue-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Admin Live Mode</span>
          </div>

          <span className="text-slate-500 hidden sm:inline">|</span>

          <span className="text-slate-300 hidden md:inline">
            Operator: <strong className="text-white">{adminUser?.username || 'admincleverahebat'}</strong>
          </span>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
            <Globe className="w-3 h-3 text-emerald-400" />
            <span>All-Servers Live Sync: Active {lastServerSyncTime ? `(${lastServerSyncTime})` : ''}</span>
          </div>
        </div>

        {/* Right: Quick Edit Actions & Publish Live */}
        <div className="flex items-center gap-2">
          
          {/* Quick Edit Section Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 font-semibold transition-colors border border-slate-700 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>Edit Sections</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-50 text-left">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Select Section to Edit
                </div>
                {[
                  { tab: 'hero' as AdminContentSubTab, label: 'Hero Headline & Copy' },
                  { tab: 'editorial' as AdminContentSubTab, label: 'Future Outlook / Editorial' },
                  { tab: 'modules' as AdminContentSubTab, label: 'Training Modules Catalog' },
                  { tab: 'trainers' as AdminContentSubTab, label: 'Faculty & Speakers' },
                  { tab: 'calculator' as AdminContentSubTab, label: 'HRDC Grant Matrix' },
                  { tab: 'testimonials' as AdminContentSubTab, label: 'Client Testimonials' },
                  { tab: 'trusted-by' as AdminContentSubTab, label: 'Client Logos & Marquee' },
                  { tab: 'contact' as AdminContentSubTab, label: 'Reach Out / Office Info' },
                  { tab: 'footer' as AdminContentSubTab, label: 'Footer & PDPA Notice' },
                  { tab: 'announcement' as AdminContentSubTab, label: 'Top Announcement Bar' },
                  { tab: 'sections' as AdminContentSubTab, label: 'Section Visibility Toggles' },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleJumpToSection(item.tab)}
                    className="w-full px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-blue-600/30 flex items-center justify-between text-left transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-blue-400">&rarr;</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Master 1-Click Publish to Live Servers */}
          <button
            onClick={handlePublishAll}
            disabled={isPublishingToServer}
            className="px-3 py-1.5 bg-[#3430eb] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-lg shadow flex items-center gap-1.5 transition-all cursor-pointer hover:scale-102 active:scale-98"
            title="Saves all content to persistent server disk so every visitor across all servers sees the updates immediately"
          >
            {isPublishingToServer ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Publishing to Servers...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Publish Live to All Servers</span>
              </>
            )}
          </button>

          {/* Go to Operations Desk */}
          {currentRoute !== 'admin' && (
            <button
              onClick={() => onNavigate('admin')}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-1 font-semibold transition-colors border border-slate-700 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Operations Desk</span>
            </button>
          )}

        </div>
      </div>

      {/* Floating Confirmation Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </aside>
  );
};
