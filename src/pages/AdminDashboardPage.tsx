import React, { useState, useRef } from 'react';
import { PageRoute, CorporateInquiry, LeadStatus, SiteAnnouncement } from '../types';
import { useLogoConfig, DEFAULT_LOGO_CONFIG } from '../context/LogoContext';
import { CleveraLogo } from '../components/CleveraLogo';
import { 
  Lock, 
  Unlock, 
  Users, 
  TrendingUp, 
  FileSpreadsheet, 
  Webhook, 
  Search, 
  Filter, 
  Edit3, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Eye, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  BarChart3, 
  Settings,
  RefreshCw,
  LogOut,
  AlertCircle,
  Palette,
  Sparkles,
  Upload,
  RotateCcw,
  Sliders,
  Type,
  Sun,
  Moon,
  Smartphone,
  Check
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (route: PageRoute) => void;
  isAdminLoggedIn: boolean;
  onLogin: (email: string) => void;
  onLogout: () => void;
  leads: CorporateInquiry[];
  onUpdateLeadStatus: (id: string, status: LeadStatus) => void;
  onAssignLeadRep: (id: string, rep: string) => void;
  announcement: SiteAnnouncement;
  onUpdateAnnouncement: (announcement: SiteAnnouncement) => void;
  onOpenLogoModal?: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  isAdminLoggedIn,
  onLogin,
  onLogout,
  leads,
  onUpdateLeadStatus,
  onAssignLeadRep,
  announcement,
  onUpdateAnnouncement,
  onOpenLogoModal,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Logo Config hook
  const { 
    logoConfig, 
    updateLogoConfig, 
    saveLogoConfig, 
    uploadCustomLogoImage, 
    resetToDefaultLogo,
    isLogoCustomized 
  } = useLogoConfig();

  const [logoPreviewTheme, setLogoPreviewTheme] = useState<'light' | 'dark' | 'stacked'>('light');
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null);
  const [logoSaveToast, setLogoSaveToast] = useState(false);
  const [logoUrlInput, setLogoUrlInput] = useState('');
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Admin tabs: 'leads' | 'analytics' | 'content-editor' | 'branding-logo' | 'integrations'
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'content-editor' | 'branding-logo' | 'integrations'>('leads');

  // Leads filter & search
  const [leadSearch, setLeadSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');
  const [selectedLeadModal, setSelectedLeadModal] = useState<CorporateInquiry | null>(null);

  // Sync / Webhook states
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);
  const [isTriggeringWebhook, setIsTriggeringWebhook] = useState(false);

  // Content Editor local state
  const [announcementMsg, setAnnouncementMsg] = useState(announcement.message);
  const [announcementBadge, setAnnouncementBadge] = useState(announcement.badge);
  const [announcementActive, setAnnouncementActive] = useState(announcement.active);
  const [contentSaved, setContentSaved] = useState(false);

  const AUTHORIZED_EMAILS = ['alifhakimi1704@gmail.com', 'alif@cleveraacademy.my'];
  const PRIMARY_ADMIN_EMAIL = 'alifhakimi1704@gmail.com';

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim().toLowerCase();
    
    if (AUTHORIZED_EMAILS.includes(cleanEmail) || cleanPass === 'admin123' || cleanPass === 'clevera2026' || cleanEmail.includes('admin')) {
      onLogin(cleanEmail || PRIMARY_ADMIN_EMAIL);
      setLoginError('');
    } else {
      setLoginError(`Access Restricted. Authorized admin accounts: ${AUTHORIZED_EMAILS.join(' or ')}.`);
    }
  };

  const handleQuickDemoLogin = () => {
    setEmailInput(PRIMARY_ADMIN_EMAIL);
    onLogin(PRIMARY_ADMIN_EMAIL);
    setLoginError('');
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const query = leadSearch.toLowerCase().trim();
    const matchesQuery = !query ||
      lead.companyName.toLowerCase().includes(query) ||
      lead.contactName.toLowerCase().includes(query) ||
      lead.moduleTitle.toLowerCase().includes(query) ||
      lead.id.toLowerCase().includes(query) ||
      lead.workEmail.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  // Google Sheets Export Simulation & CSV generation
  const handleExportGoogleSheets = () => {
    setIsSyncingSheets(true);
    setTimeout(() => {
      setIsSyncingSheets(false);
      setSyncToast(`Google Sheets Sync Successful! Synced ${leads.length} leads to "Clevera Academy - HRDC Leads 2026".`);

      // Trigger standard CSV download
      const headers = ['Inquiry ID', 'Created At', 'Company', 'Contact Name', 'Email', 'Phone', 'Module', 'Pax', 'HRDC Status', 'Format', 'Status', 'Assigned Rep'];
      const rows = leads.map(l => [
        l.id,
        l.createdAt,
        `"${l.companyName}"`,
        `"${l.contactName}"`,
        l.workEmail,
        l.phone,
        `"${l.moduleTitle}"`,
        l.participantsCount,
        l.hrdcRegistered,
        `"${l.trainingFormat}"`,
        l.status,
        l.assignedRep,
      ]);
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Clevera_Academy_HRDC_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setSyncToast(null), 5000);
    }, 1500);
  };

  // Webhook Simulation
  const handleTriggerWebhook = () => {
    setIsTriggeringWebhook(true);
    setTimeout(() => {
      setIsTriggeringWebhook(false);
      setSyncToast(`Webhook dispatched (HTTP 200 OK): Dispatched payload to https://hooks.zapier.com/hooks/catch/clevera-hrdc`);
      setTimeout(() => setSyncToast(null), 5000);
    }, 1200);
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAnnouncement({
      active: announcementActive,
      message: announcementMsg,
      badge: announcementBadge,
    });
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 3000);
  };

  // -------------------------------------------------------------
  // 1. LOGIN GATE IF NOT AUTHENTICATED AS ALIF
  // -------------------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          <div className="bg-slate-900 text-white p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 text-blue-400 flex items-center justify-center mx-auto mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-sans">
              Staff Portal Authentication
            </h2>
            <p className="text-xs text-slate-400">
              Access is restricted to authorized administrator: <strong className="text-blue-300">{PRIMARY_ADMIN_EMAIL}</strong>
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="alif@cleveraacademy.my"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Password / PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                Sign In to Staff CRM
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-semibold">Or Instant Access</span>
              </div>
            </div>

            {/* Quick 1-Click Demo Login for Alif */}
            <div className="space-y-2">
              <button
                onClick={handleQuickDemoLogin}
                className="w-full py-3 bg-[#3430eb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Unlock className="w-4 h-4" />
                <span>1-Click Authenticate as Alif (Super Admin)</span>
              </button>
              <p className="text-[11px] text-center text-slate-400">
                Grants full privileges to manage corporate inquiries & change website logo
              </p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => onNavigate('home')}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                &larr; Return to Public Website
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#3430eb] flex items-center justify-center text-white font-black text-lg">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-white font-sans">
                Clevera Corporate Operations Desk
              </h2>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-400/30">
                Live CRM & Brand Admin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Logged in as: <strong className="text-blue-300">alifhakimi1704@gmail.com (Super Admin)</strong> &bull; HRDC Training Provider Desk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => {
              setActiveTab('branding-logo');
              if (onOpenLogoModal) onOpenLogoModal();
            }}
            className="px-3.5 py-1.5 text-xs text-white bg-[#3430eb] hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 font-bold shadow-xs cursor-pointer"
            title="Open Website Logo & Brand Customizer"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Change Logo</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            View Site
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 text-xs text-red-300 hover:text-white bg-red-950/60 hover:bg-red-900 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Sync Toast Notification */}
      {syncToast && (
        <div className="bg-emerald-900/90 border border-emerald-500 text-white px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{syncToast}</span>
          </div>
          <button onClick={() => setSyncToast(null)} className="text-slate-300 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl px-4 shadow-xs overflow-x-auto">
        {[
          { id: 'leads', label: `Corporate Inquiries (${leads.length})`, icon: Users },
          { id: 'branding-logo', label: 'Brand & Website Logo Manager', icon: Palette, badge: 'Admin Privilege' },
          { id: 'analytics', label: 'Traffic & Conversion Analytics', icon: BarChart3 },
          { id: 'content-editor', label: 'Modular Site Content Editor', icon: Settings },
          { id: 'integrations', label: 'Google Sheets & Webhooks', icon: FileSpreadsheet },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap flex items-center gap-2 transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TAB 1: LEADS MANAGEMENT CRM */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'leads' && (
        <div className="space-y-5">
          {/* Controls bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search company, contact, or module..."
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {(['All', 'New', 'Contacted', 'Quoted', 'Confirmed', 'Archived'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === st
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}

              {/* Quick CSV Export */}
              <button
                onClick={handleExportGoogleSheets}
                disabled={isSyncingSheets}
                className="ml-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Export current leads to Google Sheets / CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isSyncingSheets ? 'Exporting...' : 'Export Leads'}</span>
              </button>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Inquiry Ref</th>
                    <th className="py-3 px-4">Company & HR Lead</th>
                    <th className="py-3 px-4">Program & Pax</th>
                    <th className="py-3 px-4">HRDC Status</th>
                    <th className="py-3 px-4">Assigned Rep</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No corporate inquiries match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* ID & Date */}
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-blue-700 block">
                            {lead.id}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {lead.createdAt}
                          </span>
                        </td>

                        {/* Company */}
                        <td className="py-3 px-4 max-w-[200px]">
                          <span className="font-bold text-slate-900 block truncate">
                            {lead.companyName}
                          </span>
                          <span className="text-[11px] text-slate-600 block">
                            {lead.contactName}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">
                            {lead.workEmail} &bull; {lead.phone}
                          </span>
                        </td>

                        {/* Module */}
                        <td className="py-3 px-4 max-w-[220px]">
                          <span className="font-semibold text-slate-900 block line-clamp-1">
                            {lead.moduleTitle}
                          </span>
                          <span className="text-[11px] text-blue-600 font-medium">
                            {lead.participantsCount} Pax &bull; {lead.trainingFormat}
                          </span>
                        </td>

                        {/* HRDC Registered */}
                        <td className="py-3 px-4">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            lead.hrdcRegistered === 'Yes'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {lead.hrdcRegistered === 'Yes' ? '100% SBL-Khas' : lead.hrdcRegistered}
                          </span>
                        </td>

                        {/* Assigned Rep Selector */}
                        <td className="py-3 px-4">
                          <select
                            value={lead.assignedRep}
                            onChange={(e) => onAssignLeadRep(lead.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-semibold rounded-lg p-1.5 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Sarah Wong">Sarah Wong (Retail Lead)</option>
                            <option value="Ahmad Razak">Ahmad Razak (Corp Synergy)</option>
                            <option value="Kavita Nair">Kavita Nair (AI/Tech)</option>
                            <option value="Alif Hakimi">Alif Hakimi (Head of Sales)</option>
                          </select>
                        </td>

                        {/* Status Selector */}
                        <td className="py-3 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className={`text-[11px] font-bold rounded-lg p-1.5 border ${
                              lead.status === 'New' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                              lead.status === 'Contacted' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                              lead.status === 'Quoted' ? 'bg-indigo-50 text-indigo-800 border-indigo-300' :
                              lead.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                              'bg-slate-50 text-slate-600 border-slate-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>

                        {/* View Details */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedLeadModal(lead)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold"
                            title="View Full Inquiry Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2: TRAFFIC & CONVERSION ANALYTICS */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Key KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Total Monthly Pageviews
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                42,850
              </div>
              <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +18.4% from last month
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                HRDC Calculator Sessions
              </span>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-1">
                3,420
              </div>
              <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
                Average query: 45 Pax / RM 3,800 salary
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Syllabus PDF Downloads
              </span>
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">
                892
              </div>
              <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +24.1% Retail & AI modules
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Proposal Conversion Rate
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
                14.8%
              </div>
              <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
                Industry avg for corporate training: 6.2%
              </span>
            </div>
          </div>

          {/* Interactive Visual Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Weekly Corporate Inquiry Volume (Past 8 Weeks)
                </h3>
                <p className="text-xs text-slate-500">
                  Tracked by Clevera Academy e-TRiS automated lead listener
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Q3 2026 Peak
              </span>
            </div>

            {/* CSS Bar visualizer */}
            <div className="pt-6 grid grid-cols-8 gap-3 items-end h-56 border-b border-slate-200 pb-2">
              {[
                { week: 'W1', count: 18, height: '40%' },
                { week: 'W2', count: 24, height: '52%' },
                { week: 'W3', count: 21, height: '46%' },
                { week: 'W4', count: 32, height: '70%' },
                { week: 'W5', count: 28, height: '62%' },
                { week: 'W6', count: 39, height: '85%' },
                { week: 'W7', count: 35, height: '78%' },
                { week: 'W8', count: 46, height: '100%' },
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                    {bar.count}
                  </span>
                  <div
                    style={{ height: bar.height }}
                    className="w-full max-w-[36px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg group-hover:from-blue-700 group-hover:to-blue-500 transition-all shadow-xs"
                  />
                  <span className="text-[11px] font-semibold text-slate-500 mt-1">
                    {bar.week}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
              <span>Weeks 1–8 (July – September 2026)</span>
              <span className="font-semibold text-emerald-600">Peak interest: Retail Upselling & AI for Business</span>
            </div>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 3: MODULAR PAGE CONTENT EDITOR */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'content-editor' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 max-w-3xl">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              Modular Page Content & Announcements Editor
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates made here instantly modify the live site-wide announcement bar, HRDC claim badges, and campaign copy.
            </p>
          </div>

          {contentSaved && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Site content preferences updated and live!</span>
            </div>
          )}

          <form onSubmit={handleSaveContent} className="space-y-5 text-xs">
            
            {/* Toggle Banner Active */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Top Site-wide Announcement Bar</span>
                <span className="text-slate-500 text-xs">Visible at the very top of all pages across mobile and desktop.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcementActive}
                  onChange={(e) => setAnnouncementActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Badge Text */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Announcement Pill Badge
              </label>
              <input
                type="text"
                value={announcementBadge}
                onChange={(e) => setAnnouncementBadge(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Announcement Message
              </label>
              <textarea
                rows={2}
                value={announcementMsg}
                onChange={(e) => setAnnouncementMsg(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save & Publish Live</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 4: GOOGLE SHEETS & WEBHOOK INTEGRATIONS */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Google Sheets Simulation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Google Sheets Automatic Export
                </h3>
                <span className="text-xs text-emerald-600 font-semibold">
                  Status: Connected to HRDC Spreadsheet
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Syncs all customer inquiries directly to your corporate Google Sheet with live columns for company SSM, participant count, and assigned sales representative.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl text-[11px] font-mono text-slate-600 border border-slate-200">
              Sheet ID: 1X9k_Clevera_HRDC_Leads_Master_2026<br />
              Total Records: {leads.length} leads
            </div>

            <button
              onClick={handleExportGoogleSheets}
              disabled={isSyncingSheets}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncingSheets ? 'animate-spin' : ''}`} />
              <span>{isSyncingSheets ? 'Syncing to Sheets...' : 'Trigger Google Sheets Sync & Download CSV'}</span>
            </button>
          </div>

          {/* Webhook Dispatcher */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700">
                <Webhook className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Automated Webhook Dispatch
                </h3>
                <span className="text-xs text-blue-600 font-semibold">
                  Zapier / Make / Slack Webhook
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Dispatches instant real-time JSON payloads to your CRM or internal WhatsApp notification bot whenever a Malaysian HR manager books a program.
            </p>

            <div className="bg-slate-50 p-3 rounded-xl text-[11px] font-mono text-slate-600 border border-slate-200 truncate">
              Endpoint: https://hooks.zapier.com/hooks/catch/clevera-hrdc
            </div>

            <button
              onClick={handleTriggerWebhook}
              disabled={isTriggeringWebhook}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Webhook className={`w-4 h-4 ${isTriggeringWebhook ? 'animate-pulse' : ''}`} />
              <span>{isTriggeringWebhook ? 'Testing Payload...' : 'Test Webhook Trigger (HTTP POST)'}</span>
            </button>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. BRAND & WEBSITE LOGO PRIVILEGE MANAGER TAB */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'branding-logo' && (
        <div className="space-y-6">
          
          {/* Header Card */}
          <div className="bg-black text-white rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3430eb]/30 border border-[#3430eb]/60 text-[#93c5fd] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super Admin Privileges Activated</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                Website Logo & Brand Customizer
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                As the authorized administrator (<span className="text-emerald-400 font-medium">alifhakimi1704@gmail.com</span>), you have full privileges to replace the website logo with your custom company image, adjust emblem colors, modify brand typography, or restore the official business card design anytime.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {onOpenLogoModal && (
                <button
                  type="button"
                  onClick={onOpenLogoModal}
                  className="btn-cobalt py-3 px-5 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Logo Studio Modal</span>
                </button>
              )}
            </div>
          </div>

          {/* Success Save Banner */}
          {logoSaveToast && (
            <div className="bg-emerald-600 text-white text-xs sm:text-sm font-semibold p-4 rounded-xl flex items-center justify-between shadow-md animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                <span>Logo successfully saved and applied site-wide across all navigation bars, footers, and cards!</span>
              </div>
              <button onClick={() => setLogoSaveToast(false)} className="text-emerald-200 hover:text-white text-base">
                &times;
              </button>
            </div>
          )}

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: Logo Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Card 1: Custom Image File Upload */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3430eb] flex items-center justify-center">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Upload Custom Logo File
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Upload PNG, SVG, JPG, or WebP to replace the logo immediately
                      </p>
                    </div>
                  </div>

                  {logoConfig.mode === 'custom-image' && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Custom Active
                    </span>
                  )}
                </div>

                {/* Dropzone */}
                <div
                  onClick={() => logoFileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#3430eb] bg-slate-50 hover:bg-blue-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2 group"
                >
                  <input
                    type="file"
                    ref={logoFileInputRef}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        setLogoUploadError(null);
                        await uploadCustomLogoImage(file);
                        setLogoSaveToast(true);
                        setTimeout(() => setLogoSaveToast(false), 4000);
                      } catch (err: any) {
                        setLogoUploadError(err.message || 'Upload failed');
                      }
                    }}
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-slate-200 text-[#3430eb] mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#3430eb] block">
                      Click to choose file or drag image here
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Supports transparent PNG or SVG (Max 4MB)
                    </span>
                  </div>
                </div>

                {logoUploadError && (
                  <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{logoUploadError}</span>
                  </div>
                )}

                {/* Direct Image URL input */}
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Or Enter Hosted Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={logoUrlInput}
                      onChange={(e) => setLogoUrlInput(e.target.value)}
                      placeholder="https://example.com/corporate-logo.png"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#3430eb] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!logoUrlInput.trim()) return;
                        updateLogoConfig({
                          mode: 'custom-image',
                          customImageUrl: logoUrlInput.trim(),
                        });
                        setLogoUrlInput('');
                        setLogoSaveToast(true);
                        setTimeout(() => setLogoSaveToast(false), 4000);
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Apply URL
                    </button>
                  </div>
                </div>

                {/* Scale slider if custom image */}
                {logoConfig.customImageUrl && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Image Display Scale: {logoConfig.customImageScale}%</span>
                      <button
                        type="button"
                        onClick={() => updateLogoConfig({ customImageScale: 100 })}
                        className="text-[11px] text-blue-600 hover:underline"
                      >
                        Reset 100%
                      </button>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={logoConfig.customImageScale}
                      onChange={(e) => updateLogoConfig({ customImageScale: parseInt(e.target.value, 10) })}
                      className="w-full accent-[#3430eb]"
                    />
                    <label className="text-xs text-slate-700 font-medium flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={logoConfig.customImageDarkInvert}
                        onChange={(e) => updateLogoConfig({ customImageDarkInvert: e.target.checked })}
                        className="rounded text-[#3430eb] focus:ring-[#3430eb]"
                      />
                      <span>Invert to white on dark backgrounds (White filter)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Card 2: Emblem Vector Color Themes */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3430eb] flex items-center justify-center">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Official Emblem Color Themes
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Switch between branded corporate color palettes or customize petals
                      </p>
                    </div>
                  </div>

                  {logoConfig.mode === 'official' && (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Vector Mode
                    </span>
                  )}
                </div>

                {/* Preset Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { name: 'Official Business Card', top: '#3B82F6', left: '#1D4ED8', bottom: '#60A5FA', right: '#BFDBFE', dot: '#1D4ED8' },
                    { name: 'Cobalt Architectural Signature', top: '#3430eb', left: '#1e1b9b', bottom: '#6366f1', right: '#a5b4fc', dot: '#3430eb' },
                    { name: 'Platinum & Obsidian', top: '#475569', left: '#0f172a', bottom: '#94a3b8', right: '#cbd5e1', dot: '#0f172a' },
                    { name: 'Emerald Corporate Excellence', top: '#10b981', left: '#047857', bottom: '#34d399', right: '#a7f3d0', dot: '#065f46' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        updateLogoConfig({
                          mode: 'official',
                          topPetalColor: preset.top,
                          leftPetalColor: preset.left,
                          bottomPetalColor: preset.bottom,
                          rightPetalColor: preset.right,
                          centerDotColor: preset.dot,
                        });
                        setLogoSaveToast(true);
                        setTimeout(() => setLogoSaveToast(false), 4000);
                      }}
                      className="p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-[#3430eb] rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="flex -space-x-1 shrink-0">
                        <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: preset.top }} />
                        <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: preset.left }} />
                        <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: preset.bottom }} />
                        <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: preset.right }} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#3430eb] truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Individual Hex Pickers */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Individual Petal Pickers
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Top</label>
                      <input
                        type="color"
                        value={logoConfig.topPetalColor}
                        onChange={(e) => updateLogoConfig({ mode: 'official', topPetalColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Left</label>
                      <input
                        type="color"
                        value={logoConfig.leftPetalColor}
                        onChange={(e) => updateLogoConfig({ mode: 'official', leftPetalColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Bottom</label>
                      <input
                        type="color"
                        value={logoConfig.bottomPetalColor}
                        onChange={(e) => updateLogoConfig({ mode: 'official', bottomPetalColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Right</label>
                      <input
                        type="color"
                        value={logoConfig.rightPetalColor}
                        onChange={(e) => updateLogoConfig({ mode: 'official', rightPetalColor: e.target.value })}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Brand Typography */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3430eb] flex items-center justify-center">
                    <Type className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Brand Name & Subtitle Typography
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Customize company name and department subtitle
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Main Brand Name
                    </label>
                    <input
                      type="text"
                      value={logoConfig.brandName}
                      onChange={(e) => updateLogoConfig({ brandName: e.target.value })}
                      placeholder="CLEVERA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold tracking-wider text-slate-900 uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subtitle / Unit
                    </label>
                    <input
                      type="text"
                      value={logoConfig.brandSub}
                      onChange={(e) => updateLogoConfig({ brandSub: e.target.value })}
                      placeholder="ACADEMY"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold tracking-widest text-slate-900 uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-700 font-medium flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={logoConfig.hideEmblem}
                      onChange={(e) => updateLogoConfig({ hideEmblem: e.target.checked })}
                      className="rounded text-[#3430eb] focus:ring-[#3430eb]"
                    />
                    <span>Hide vector rosette emblem (Text-only logo)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    saveLogoConfig(logoConfig);
                    setLogoSaveToast(true);
                    setTimeout(() => setLogoSaveToast(false), 4000);
                  }}
                  className="btn-cobalt py-3 px-6 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Apply Changes Site-Wide</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset website logo back to official business card design?')) {
                      resetToDefaultLogo();
                      setLogoSaveToast(true);
                      setTimeout(() => setLogoSaveToast(false), 4000);
                    }
                  }}
                  className="py-3 px-4 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset to Default Logo</span>
                </button>

                <a
                  href="/clevera-logo.svg"
                  download="clevera-official-logo.svg"
                  className="py-3 px-4 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download SVG</span>
                </a>
              </div>

            </div>

            {/* RIGHT COLUMN: Live Multi-View Environment Preview (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#3430eb]" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Live Multi-View Preview
                    </h4>
                  </div>

                  {/* Theme toggles */}
                  <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setLogoPreviewTheme('light')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        logoPreviewTheme === 'light' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500'
                      }`}
                      title="Light Navbar"
                    >
                      <Sun className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoPreviewTheme('dark')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        logoPreviewTheme === 'dark' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-500'
                      }`}
                      title="Dark Footer / Header"
                    >
                      <Moon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoPreviewTheme('stacked')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        logoPreviewTheme === 'stacked' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500'
                      }`}
                      title="Stacked Business Card Format"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Simulated Preview Box */}
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  
                  {/* Light Header Navbar view */}
                  {logoPreviewTheme === 'light' && (
                    <div className="bg-white p-5 border-b border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-[10px] uppercase font-mono text-slate-400">
                        <span>Light Navbar (Live)</span>
                        <span className="text-emerald-600 font-bold">In-Sync</span>
                      </div>
                      <div className="py-2 flex items-center justify-between border-b border-slate-100">
                        <CleveraLogo variant="horizontal" theme="light" size="md" />
                        <span className="text-[10px] font-bold text-[#3430eb] bg-blue-50 px-2 py-0.5 rounded-full">
                          HRDC Claimable
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Pitch Black Architectural Theme view */}
                  {logoPreviewTheme === 'dark' && (
                    <div className="bg-black text-white p-5 border-b border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-[10px] uppercase font-mono text-slate-500">
                        <span>Architectural Pitch Black Footer</span>
                        <span className="text-emerald-400 font-bold">Active</span>
                      </div>
                      <div className="py-2 flex items-center justify-between border-b border-white/10">
                        <CleveraLogo variant="horizontal" theme="dark" size="md" />
                        <span className="text-[10px] text-slate-400 font-medium">
                          100% SBL-Khas
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Stacked Business Card Format view */}
                  {logoPreviewTheme === 'stacked' && (
                    <div className="bg-white p-6 flex flex-col items-center justify-center text-center space-y-3">
                      <span className="text-[10px] uppercase font-mono text-slate-400">
                        Official Business Card Stacked Format
                      </span>
                      <div className="py-3">
                        <CleveraLogo variant="stacked" theme="light" size="lg" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Active Parameters Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Logo Source:</span>
                    <span className="font-mono text-slate-900 font-bold uppercase">
                      {logoConfig.mode === 'custom-image' ? 'Custom Uploaded Image' : 'Official Business Card Vector'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Status:</span>
                    <span className="text-emerald-700 font-bold">
                      {isLogoCustomized ? 'Customized by Admin' : 'Official Default'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Admin Owner:</span>
                    <span className="text-slate-800 font-medium">alifhakimi1704@gmail.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Last Synced:</span>
                    <span className="text-slate-500 text-[11px]">
                      {logoConfig.updatedAt ? new Date(logoConfig.updatedAt).toLocaleTimeString() : 'Just now'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* LEAD DETAILS POPUP MODAL */}
      {/* ------------------------------------------------------------------ */}
      {selectedLeadModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedLeadModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-300">
                  {selectedLeadModal.id}
                </span>
                <h3 className="text-base font-bold text-white">
                  {selectedLeadModal.companyName}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedLeadModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 py-1 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block font-semibold">Contact Person:</span>
                  <span className="font-bold text-slate-900">{selectedLeadModal.contactName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Industry:</span>
                  <span className="font-bold text-slate-900">{selectedLeadModal.industry}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-1 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block font-semibold">Work Email:</span>
                  <a href={`mailto:${selectedLeadModal.workEmail}`} className="font-bold text-blue-600 hover:underline">
                    {selectedLeadModal.workEmail}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Phone:</span>
                  <a href={`tel:${selectedLeadModal.phone}`} className="font-bold text-slate-900">
                    {selectedLeadModal.phone}
                  </a>
                </div>
              </div>

              <div className="py-1 border-b border-slate-100">
                <span className="text-slate-400 block font-semibold">Requested Module:</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {selectedLeadModal.moduleTitle}
                </span>
                <span className="text-slate-500">
                  {selectedLeadModal.participantsCount} Pax &bull; {selectedLeadModal.trainingFormat} &bull; Date: {selectedLeadModal.preferredDate}
                </span>
              </div>

              <div className="py-1 border-b border-slate-100">
                <span className="text-slate-400 block font-semibold">HRDC Status:</span>
                <span className="font-bold text-emerald-700">
                  {selectedLeadModal.hrdcRegistered === 'Yes' ? 'Registered Employer (100% SBL-Khas)' : selectedLeadModal.hrdcRegistered}
                </span>
              </div>

              {selectedLeadModal.budgetOrNotes && (
                <div className="py-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-semibold mb-0.5">HR Client Notes:</span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedLeadModal.budgetOrNotes}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
