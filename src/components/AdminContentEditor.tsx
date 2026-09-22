import React, { useState } from 'react';
import { 
  AdminContentSubTab, 
  TrainingModule, 
  Trainer, 
  Testimonial, 
  ModuleCategory,
  ClientLogo,
  TrustedByConfig
} from '../types';
import { useContent } from '../context/ContentContext';
import { generateLogoPlaceholder } from '../data/clientLogosData';
import { 
  BookOpen, 
  Users, 
  Calculator, 
  MessageSquareQuote, 
  PhoneCall, 
  PanelBottom, 
  Megaphone,
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  ExternalLink,
  Search,
  Sparkles,
  Save,
  Image as ImageIcon,
  Star,
  DollarSign,
  Building,
  ShieldCheck,
  AlertTriangle,
  Sliders,
  Eye,
  Zap,
  X,
  CloudUpload,
  Loader2
} from 'lucide-react';

interface AdminContentEditorProps {
  initialTab?: AdminContentSubTab;
}

const CATEGORY_OPTIONS: { id: Exclude<ModuleCategory, 'all'>; label: string }[] = [
  { id: 'retail-leadership', label: 'Retail Leadership & Operations' },
  { id: 'team-synergy', label: 'Team Synergy & People Dynamics' },
  { id: 'digital-technical', label: 'Digital & AI Skills for Business' },
  { id: 'hr-compliance', label: 'Employment Law & HR Compliance' },
  { id: 'specialized-business', label: 'Specialized Business & Technical' },
];

export const AdminContentEditor: React.FC<AdminContentEditorProps> = ({ initialTab = 'modules' }) => {
  const {
    modules,
    updateModule,
    addModule,
    deleteModule,
    resetModules,
    publishModulesToGoogleSheets,

    trainers,
    updateTrainer,
    addTrainer,
    deleteTrainer,
    resetTrainers,

    calculatorConfig,
    updateCalculatorConfig,
    resetCalculatorConfig,

    testimonials,
    updateTestimonial,
    addTestimonial,
    deleteTestimonial,
    resetTestimonials,

    contactConfig,
    updateContactConfig,
    resetContactConfig,

    footerConfig,
    updateFooterConfig,
    resetFooterConfig,

    announcement,
    updateAnnouncement,
    resetAnnouncement,

    clientLogos,
    trustedByConfig,
    updateClientLogo,
    addClientLogo,
    deleteClientLogo,
    toggleClientLogo,
    updateTrustedByConfig,
    resetClientLogos,
    resetTrustedByConfig,

    sectionVisibility,
    updateSectionVisibility,
    toggleSectionVisibility,
    resetSectionVisibility,

    resetAllContent,
    adminEditorTargetTab,
    setAdminEditorTargetTab,
  } = useContent();

  const [activeSubTab, setActiveSubTab] = useState<AdminContentSubTab>(adminEditorTargetTab || initialTab);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPublishingModules, setIsPublishingModules] = useState(false);

  // Search queries for lists
  const [moduleSearch, setModuleSearch] = useState('');
  const [trainerSearch, setTrainerSearch] = useState('');
  const [testimonialSearch, setTestimonialSearch] = useState('');
  const [clientLogoSearch, setClientLogoSearch] = useState('');
  const [clientLogoCategoryFilter, setClientLogoCategoryFilter] = useState('all');

  // Editing Modals / Inline states
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(null);
  const [isAddingModule, setIsAddingModule] = useState(false);

  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [isAddingTrainer, setIsAddingTrainer] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  const [editingClientLogo, setEditingClientLogo] = useState<ClientLogo | null>(null);
  const [isAddingClientLogo, setIsAddingClientLogo] = useState(false);

  // SVG Placeholder generator state for client logo modal
  const [modalLogoPreview, setModalLogoPreview] = useState('');
  const [modalMonogram, setModalMonogram] = useState('KL');
  const [modalAccentColor, setModalAccentColor] = useState('#3430eb');
  const [modalSublabel, setModalSublabel] = useState('ENTERPRISE');

  // Sync subtab if context changes
  React.useEffect(() => {
    if (adminEditorTargetTab) {
      setActiveSubTab(adminEditorTargetTab);
      setAdminEditorTargetTab(null);
    }
  }, [adminEditorTargetTab, setAdminEditorTargetTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const visibleCount = Object.values(sectionVisibility).filter(Boolean).length;
  const totalSectionsCount = Object.keys(sectionVisibility).length;

  const navTabs = [
    { id: 'sections' as AdminContentSubTab, label: 'Section Visibility', icon: Eye, count: `${visibleCount}/${totalSectionsCount}` },
    { id: 'modules' as AdminContentSubTab, label: '1. Training Modules', icon: BookOpen, count: modules.length },
    { id: 'trainers' as AdminContentSubTab, label: '2. Trainers & Faculty', icon: Users, count: trainers.length },
    { id: 'calculator' as AdminContentSubTab, label: '3. HRDC Calculator Logic', icon: Calculator },
    { id: 'testimonials' as AdminContentSubTab, label: '4. Testimonies & Ratings', icon: MessageSquareQuote, count: testimonials.length },
    { id: 'trusted-by' as AdminContentSubTab, label: '5. Client Logos (Trusted By)', icon: Building, count: clientLogos.length },
    { id: 'contact' as AdminContentSubTab, label: '6. Contact Us Section', icon: PhoneCall },
    { id: 'footer' as AdminContentSubTab, label: '7. Footer Section', icon: PanelBottom },
    { id: 'announcement' as AdminContentSubTab, label: '8. Announcement Bar', icon: Megaphone },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Admin-Only Cross Pages Content Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Cross-Pages Dynamic Content & Logic Editor
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Edits made here instantly cascade across all visitor pages (Home, Modules catalog, About/Gallery, Contact & Booking, e-TRiS Guide, and Footer) with zero compilation delay.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all site content back to official factory defaults?')) {
                resetAllContent();
                showToast('All site modules, trainers, calculator logic, and sections have been reset to factory defaults.');
              }
            }}
            className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset all dynamic content to original defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Defaults</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white text-xs sm:text-sm font-semibold p-4 rounded-xl shadow-lg flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-white/80 hover:text-white text-xs font-bold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Secondary Horizontal Sub-Nav Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 0. SECTION VISIBILITY SUBTAB (ADMIN SHOW/HIDE CONTROLS)                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'sections' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Granular Layout Customizer</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
                Homepage & Global Section Visibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Empowers administrators to instantly show or hide sections across the website. Toggling any section automatically updates the public interface with zero build delay.
              </p>
            </div>

            {/* Quick Bulk Actions */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  updateSectionVisibility({
                    hero: true,
                    trustedBy: true,
                    splitEditorial: true,
                    activityLineup: true,
                    faculty: true,
                    hrdcCalculator: true,
                    testimonials: true,
                    reachOut: true,
                    announcementBar: true,
                    stickyMobileCta: true,
                    footer: true,
                  });
                  showToast('All 11 homepage sections and global components are now visible.');
                }}
                className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all cursor-pointer"
              >
                Show All Sections
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all section visibility flags to default configuration? (Calculator hidden by default, others visible)')) {
                    resetSectionVisibility();
                    showToast('Section visibility reset to factory defaults.');
                  }
                }}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block leading-tight">
                  {Object.values(sectionVisibility).filter(Boolean).length} / {Object.keys(sectionVisibility).length}
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Active Sections Online
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-700">
                    {sectionVisibility.hrdcCalculator ? 'Visible on Home' : 'Hidden on Home'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500 block mt-1">
                  SBL-Khas Grant Calculator
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#3430eb]" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">
                  Persistent Browser Storage
                </span>
                <span className="text-xs text-slate-500 block">
                  Changes saved automatically in real-time
                </span>
              </div>
            </div>
          </div>

          {/* Group 1: Homepage Landing Sections */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  1. Homepage Sections Hierarchy
                </h4>
                <p className="text-xs text-slate-500">
                  Control the visual modules presented on the primary landing page
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                8 Sections
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* 1. Hero Section */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#01</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Hero Section & Primary Call to Action
                    </h5>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      Top Fold
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Architectural dark facade, prominent display typography, HRD Corp accreditation badges, trust stats, and direct booking buttons.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.hero ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.hero ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('hero');
                      showToast(`Hero Section is now ${!sectionVisibility.hero ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.hero ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Hero Section"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.hero ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 2. Trusted By Client Logos */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#02</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Trusted By Client Logos (Enterprise Carousel & Mobile Grid)
                    </h5>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      Social Proof
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Infinite horizontal marquee on desktop with speed controls, transitioning seamlessly to a 2x2 or 3x2 responsive grid on mobile screens.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.trustedBy ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.trustedBy ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('trustedBy');
                      showToast(`Trusted By Section is now ${!sectionVisibility.trustedBy ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.trustedBy ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Trusted By Section"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.trustedBy ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 3. Split Editorial 50/50 */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#03</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Split Editorial Section (50/50 Photography & Philosophy)
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    High-contrast authentic workshop photography paired with pitch-black corporate philosophy, key methodology milestones, and quote highlight.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.splitEditorial ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.splitEditorial ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('splitEditorial');
                      showToast(`Split Editorial Section is now ${!sectionVisibility.splitEditorial ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.splitEditorial ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Split Editorial Section"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.splitEditorial ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 4. Activity Lineup Catalog */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#04</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Activity Lineup & Flagship Programs
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Four signature corporate training modules with interactive hover previews, tags, pax recommendations, and modal syllabus launchers.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.activityLineup ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.activityLineup ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('activityLineup');
                      showToast(`Activity Lineup Section is now ${!sectionVisibility.activityLineup ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.activityLineup ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Activity Lineup Section"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.activityLineup ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 5. Faculty & Trainers */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#05</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Trainers & Faculty Directory
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Certified HRD Corp TTT Master Trainers and industry practitioners with professional portraits, credential badges, and bio modals.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.faculty ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.faculty ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('faculty');
                      showToast(`Trainers & Faculty Section is now ${!sectionVisibility.faculty ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.faculty ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Faculty Section"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.faculty ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 6. HRDC Grant & ROI Calculator (SPECIAL HIGHLIGHT) */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-50/40 hover:bg-amber-50/70 border-l-4 border-l-amber-500 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-amber-600">#06</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Calculate Your SBL-Khas Grant Allocation
                    </h5>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/60">
                      User Removable & Toggleable
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                    Interactive statutory Malaysian HRD Corp calculator allowing employers to simulate available levy, 100% course fee reimbursement caps, and meal allowances with zero cash outlay. <strong className="text-slate-800">Turn this ON if you want the calculator visible on the homepage, or OFF to keep it hidden.</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.hrdcCalculator 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-slate-200 text-slate-700 font-semibold'
                  }`}>
                    {sectionVisibility.hrdcCalculator ? 'Visible on Homepage' : 'Hidden from Homepage'}
                  </span>
                  <button
                    id="admin-toggle-calculator-btn"
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('hrdcCalculator');
                      showToast(`SBL-Khas Grant Calculator is now ${!sectionVisibility.hrdcCalculator ? 'VISIBLE on homepage' : 'HIDDEN from homepage'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-xs ${
                      sectionVisibility.hrdcCalculator ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle HRDC Calculator Section"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.hrdcCalculator ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 7. Corporate Testimonials */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#07</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Corporate Testimonials & Trust Audit
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Client reviews from Malaysian HR Directors and Training Managers with 5-star ratings, company designations, and verified feedback.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.testimonials ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.testimonials ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('testimonials');
                      showToast(`Corporate Testimonials Section is now ${!sectionVisibility.testimonials ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.testimonials ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Testimonials Section"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.testimonials ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 8. Reach Out & Skylight CTA */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#08</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Reach Out Desk & Skylight Call to Action
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Split bottom layout featuring Clevera Academy headquarters address, telephone/email hotlines, operating hours, and curved glass architectural banner.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.reachOut ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.reachOut ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('reachOut');
                      showToast(`Reach Out Section is now ${!sectionVisibility.reachOut ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.reachOut ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Reach Out Section"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.reachOut ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Group 2: Global Shell Components */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  2. Global Site-wide Components
                </h4>
                <p className="text-xs text-slate-500">
                  Control persistent shell components rendered across all pages
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
                3 Global Elements
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* 9. Announcement Bar */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#09</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Top Urgent Announcement Bar
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    High-contrast dark banner pinned to the very top edge of the browser announcing intake deadlines and e-TRiS grant application links.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.announcementBar ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.announcementBar ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('announcementBar');
                      showToast(`Top Announcement Bar is now ${!sectionVisibility.announcementBar ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.announcementBar ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Announcement Bar"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.announcementBar ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 10. Sticky Mobile CTA */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#10</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Sticky Mobile Bottom Action Bar
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Fixed bottom bar on mobile viewports providing one-tap phone call connection, eligibility checker modal trigger, and workshop booking.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.stickyMobileCta ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.stickyMobileCta ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('stickyMobileCta');
                      showToast(`Sticky Mobile CTA is now ${!sectionVisibility.stickyMobileCta ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.stickyMobileCta ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Sticky Mobile CTA"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.stickyMobileCta ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 11. Footer */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">#11</span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-900">
                      Global Corporate Footer
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Full corporate footer containing company description, accreditation badges, brochure download form, course directory, address, and legal links.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    sectionVisibility.footer ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {sectionVisibility.footer ? 'Visible' : 'Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('footer');
                      showToast(`Global Footer is now ${!sectionVisibility.footer ? 'visible' : 'hidden'}.`);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      sectionVisibility.footer ? 'bg-[#3430eb]' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle Footer"
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        sectionVisibility.footer ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. MODULES SUBTAB                                                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'modules' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search modules by title, code, or description..."
                value={moduleSearch}
                onChange={(e) => setModuleSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Reset all modules to initial course catalog?')) {
                    resetModules();
                    showToast('Modules reset to original catalog.');
                  }
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Modules</span>
              </button>

              <button
                onClick={async () => {
                  setIsPublishingModules(true);
                  try {
                    await publishModulesToGoogleSheets();
                    window.alert('Module updates have been published to Google Sheets successfully.');
                  } catch (error) {
                    const message = error instanceof Error ? error.message : 'Unable to publish module updates.';
                    showToast(message);
                  } finally {
                    setIsPublishingModules(false);
                  }
                }}
                disabled={isPublishingModules}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Publish the current module catalog to Google Sheets"
              >
                {isPublishingModules ? <Loader2 className="w-4 h-4 animate-spin" /> : <CloudUpload className="w-4 h-4" />}
                <span>{isPublishingModules ? 'Publishing...' : 'Publish Updates to Google Sheets'}</span>
              </button>

              <button
                onClick={() => setIsAddingModule(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Module</span>
              </button>
            </div>
          </div>

          {/* Module List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules
              .filter(m => 
                !moduleSearch || 
                m.title.toLowerCase().includes(moduleSearch.toLowerCase()) || 
                m.grantCode.toLowerCase().includes(moduleSearch.toLowerCase()) ||
                m.shortDescription.toLowerCase().includes(moduleSearch.toLowerCase())
              )
              .map((mod) => (
                <div 
                  key={mod.id} 
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col hover:border-blue-300 transition-all group"
                >
                  {/* Image media container */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={mod.image} 
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {mod.categoryLabel}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-blue-900 font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                      {mod.grantCode}
                    </div>
                  </div>

                  {/* Body info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                        {mod.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {mod.shortDescription}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                          ⏱ {mod.duration}
                        </span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium">
                          {mod.hrdcScheme}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setEditingModule(mod)}
                        className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Module</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete module "${mod.title}"?`)) {
                            deleteModule(mod.id);
                            showToast(`Deleted module "${mod.title}"`);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Delete module"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* EDIT/ADD MODULE MODAL */}
          {(editingModule || isAddingModule) && (
            <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
              <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
                <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">
                      {isAddingModule ? 'Add New Training Module' : 'Edit Training Module'}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setEditingModule(null);
                      setIsAddingModule(false);
                    }}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕ Close
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    const title = String(formData.get('title') || '').trim();
                    const shortDescription = String(formData.get('shortDescription') || '').trim();
                    const fullDescription = String(formData.get('fullDescription') || '').trim();
                    const image = String(formData.get('image') || '').trim();
                    const category = formData.get('category') as Exclude<ModuleCategory, 'all'>;
                    const categoryLabel = CATEGORY_OPTIONS.find(c => c.id === category)?.label || 'Corporate Training';
                    const duration = String(formData.get('duration') || '2 Days (16 Hours)').trim();
                    const grantCode = String(formData.get('grantCode') || 'HRDC-SBL-2026-01').trim();
                    const hrdcScheme = (formData.get('hrdcScheme') || 'SBL Khas') as 'SBL Khas' | 'Skim Bantuan Latihan';

                    if (!title || !shortDescription) {
                      alert('Please fill out the Title and Short Description.');
                      return;
                    }

                    if (isAddingModule) {
                      const newId = `module-${Date.now()}`;
                      const newMod: TrainingModule = {
                        id: newId,
                        title,
                        category,
                        categoryLabel,
                        shortDescription,
                        fullDescription: fullDescription || shortDescription,
                        duration,
                        targetAudience: ['Supervisors', 'Managers', 'Key Executives'],
                        hrdcScheme,
                        grantCode,
                        keyHighlights: ['100% HRDC Claimable', 'Interactive Simulations', 'Practical Workplace Application'],
                        syllabus: [
                          { day: 'Day 1', theme: 'Foundations & Frameworks', modules: ['Orientation & Fundamentals', 'Operational Simulations'] },
                          { day: 'Day 2', theme: 'Application & Execution', modules: ['Actionable Toolkits', 'Post-Training Measurement'] }
                        ],
                        learningOutcomes: ['Enhance workplace productivity', 'Master industry closing scripts'],
                        trainerSpecialty: 'Senior Corporate HRDC Certified Master Facilitator',
                        featured: true,
                        image: image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'
                      };
                      addModule(newMod);
                      showToast(`Added new module "${title}"`);
                    } else if (editingModule) {
                      updateModule(editingModule.id, {
                        title,
                        shortDescription,
                        fullDescription: fullDescription || shortDescription,
                        image: image || editingModule.image,
                        category,
                        categoryLabel,
                        duration,
                        grantCode,
                        hrdcScheme
                      });
                      showToast(`Updated module "${title}"`);
                    }

                    setEditingModule(null);
                    setIsAddingModule(false);
                  }}
                  className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm"
                >
                  {/* Module Title */}
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Module Title *
                    </label>
                    <input
                      name="title"
                      type="text"
                      required
                      defaultValue={editingModule?.title || ''}
                      placeholder="e.g. Retail Sales Mastery & High-Conversion Upselling"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Media (Image URL) */}
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5 flex items-center justify-between">
                      <span>Module Media (Image URL) *</span>
                      <span className="text-[11px] text-slate-400 font-normal">Unsplash / Direct CDN URL</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        name="image"
                        type="url"
                        required
                        defaultValue={editingModule?.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop'}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Category & Grant Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        Category
                      </label>
                      <select
                        name="category"
                        defaultValue={editingModule?.category || 'retail-leadership'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        {CATEGORY_OPTIONS.map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        e-TRiS Grant Code
                      </label>
                      <input
                        name="grantCode"
                        type="text"
                        defaultValue={editingModule?.grantCode || 'HRDC-SBL-2026-08'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Duration & HRDC Scheme */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        Duration
                      </label>
                      <input
                        name="duration"
                        type="text"
                        defaultValue={editingModule?.duration || '2 Days (14 Hours)'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        HRDC Scheme
                      </label>
                      <select
                        name="hrdcScheme"
                        defaultValue={editingModule?.hrdcScheme || 'SBL Khas'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="SBL Khas">SBL Khas (Direct Deduction - 0 Cash)</option>
                        <option value="Skim Bantuan Latihan">Skim Bantuan Latihan</option>
                      </select>
                    </div>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Short Description (Catalog & Home Card) *
                    </label>
                    <textarea
                      name="shortDescription"
                      rows={2}
                      required
                      defaultValue={editingModule?.shortDescription || ''}
                      placeholder="Summarize course value for frontline and corporate executives..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Full Description (Syllabus Modal & Detail View)
                    </label>
                    <textarea
                      name="fullDescription"
                      rows={3}
                      defaultValue={editingModule?.fullDescription || ''}
                      placeholder="Comprehensive course background, industry context, and Malaysian market relevance..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Footer actions */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingModule(null);
                        setIsAddingModule(false);
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isAddingModule ? 'Create & Publish Module' : 'Save Module Changes'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TRAINERS SUBTAB                                                       */}
      {/* ========================================================================= */}
      {activeSubTab === 'trainers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search trainers by name, title, TTT number, or specialty..."
                value={trainerSearch}
                onChange={(e) => setTrainerSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Reset all trainers to default roster?')) {
                    resetTrainers();
                    showToast('Trainers reset to initial roster.');
                  }
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Trainers</span>
              </button>

              <button
                onClick={() => setIsAddingTrainer(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Trainer</span>
              </button>
            </div>
          </div>

          {/* Trainer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers
              .filter(t => 
                !trainerSearch ||
                t.name.toLowerCase().includes(trainerSearch.toLowerCase()) ||
                t.title.toLowerCase().includes(trainerSearch.toLowerCase()) ||
                t.bio.toLowerCase().includes(trainerSearch.toLowerCase())
              )
              .map((tr) => (
                <div 
                  key={tr.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col hover:border-blue-300 transition-all"
                >
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img 
                      src={tr.photoUrl} 
                      alt={tr.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {tr.experienceYears}+ Yrs Exp
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                        TTT No: {tr.hrdcTttNo}
                      </span>
                      <h4 className="font-bold text-base text-slate-900 leading-snug">
                        {tr.name}
                      </h4>
                      <p className="text-xs font-medium text-slate-500">
                        {tr.title}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-3 pt-1 leading-relaxed">
                        {tr.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setEditingTrainer(tr)}
                        className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Trainer</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete trainer "${tr.name}"?`)) {
                            deleteTrainer(tr.id);
                            showToast(`Deleted trainer "${tr.name}"`);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Delete trainer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* EDIT/ADD TRAINER MODAL */}
          {(editingTrainer || isAddingTrainer) && (
            <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
              <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
                <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Users className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">
                      {isAddingTrainer ? 'Add Certified Trainer' : 'Edit Trainer Profile'}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setEditingTrainer(null);
                      setIsAddingTrainer(false);
                    }}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕ Close
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    const name = String(formData.get('name') || '').trim();
                    const title = String(formData.get('title') || '').trim();
                    const photoUrl = String(formData.get('photoUrl') || '').trim();
                    const bio = String(formData.get('bio') || '').trim();
                    const hrdcTttNo = String(formData.get('hrdcTttNo') || '').trim();
                    const experienceYears = Number(formData.get('experienceYears') || 10);
                    const specialtiesRaw = String(formData.get('specialties') || '');
                    const specialties = specialtiesRaw.split(',').map(s => s.trim()).filter(Boolean);

                    if (!name || !title || !bio) {
                      alert('Please fill out the Trainer Name, Title, and Bio.');
                      return;
                    }

                    if (isAddingTrainer) {
                      const newId = `trainer-${Date.now()}`;
                      const newTr: Trainer = {
                        id: newId,
                        name,
                        title,
                        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
                        bio,
                        hrdcTttNo: hrdcTttNo || `EMP${Math.floor(1000 + Math.random() * 9000)}`,
                        experienceYears,
                        credentials: ['HRDC Accredited Trainer', 'Corporate Facilitator'],
                        specialties: specialties.length ? specialties : ['Leadership Development', 'Executive Coaching']
                      };
                      addTrainer(newTr);
                      showToast(`Added trainer "${name}"`);
                    } else if (editingTrainer) {
                      updateTrainer(editingTrainer.id, {
                        name,
                        title,
                        photoUrl: photoUrl || editingTrainer.photoUrl,
                        bio,
                        hrdcTttNo,
                        experienceYears,
                        specialties: specialties.length ? specialties : editingTrainer.specialties
                      });
                      showToast(`Updated trainer "${name}"`);
                    }

                    setEditingTrainer(null);
                    setIsAddingTrainer(false);
                  }}
                  className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm"
                >
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Trainer Full Name & Honorific *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      defaultValue={editingTrainer?.name || ''}
                      placeholder="e.g. Ts. Dr. Iskandar Dzulkarnain"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Professional Title / Designation *
                    </label>
                    <input
                      name="title"
                      type="text"
                      required
                      defaultValue={editingTrainer?.title || ''}
                      placeholder="e.g. Senior Retail Operations & CX Strategist"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Media (Photo URL) *
                    </label>
                    <input
                      name="photoUrl"
                      type="url"
                      required
                      defaultValue={editingTrainer?.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        HRDC TTT Certification No
                      </label>
                      <input
                        name="hrdcTttNo"
                        type="text"
                        defaultValue={editingTrainer?.hrdcTttNo || 'EMP3849'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        Industry Experience (Years)
                      </label>
                      <input
                        name="experienceYears"
                        type="number"
                        defaultValue={editingTrainer?.experienceYears || 15}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Trainer Biography & Track Record *
                    </label>
                    <textarea
                      name="bio"
                      rows={3}
                      required
                      defaultValue={editingTrainer?.bio || ''}
                      placeholder="Summarize executive roles held, major MNCs trained, and corporate methodology..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Specialties (comma-separated)
                    </label>
                    <input
                      name="specialties"
                      type="text"
                      defaultValue={editingTrainer?.specialties?.join(', ') || ''}
                      placeholder="Retail Operations, Sales Closing, Floor Coaching"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTrainer(null);
                        setIsAddingTrainer(false);
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isAddingTrainer ? 'Save New Trainer' : 'Update Trainer'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CALCULATOR LOGIC & PRICING SUBTAB                                     */}
      {/* ========================================================================= */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span>HRDC Grant & Levy ROI Calculator Settings</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure the underlying statutory formulas, grant allowable caps, meal allowances, and default slider presets used across the website.
                </p>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('Reset calculator formula parameters to statutory HRDC limits?')) {
                    resetCalculatorConfig();
                    showToast('Calculator parameters reset to standard HRDC limits.');
                  }
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Limits</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                updateCalculatorConfig({
                  title: String(fd.get('title') || '').trim(),
                  subtitle: String(fd.get('subtitle') || '').trim(),
                  badge: String(fd.get('badge') || '').trim(),
                  levyRatePercent: Number(fd.get('levyRatePercent') || 1),
                  inHouseDailyFeeCap: Number(fd.get('inHouseDailyFeeCap') || 6000),
                  inHouseMealAllowancePerPax: Number(fd.get('inHouseMealAllowancePerPax') || 50),
                  retreatDailyCourseFeeCapPerPax: Number(fd.get('retreatDailyCourseFeeCapPerPax') || 1300),
                  retreatMaxTotalCap: Number(fd.get('retreatMaxTotalCap') || 40000),
                  productivityMultiplierPercent: Number(fd.get('productivityMultiplierPercent') || 22),
                  productivityMultiplierMonths: Number(fd.get('productivityMultiplierMonths') || 6),
                  defaultEmployeeCount: Number(fd.get('defaultEmployeeCount') || 45),
                  defaultAvgSalary: Number(fd.get('defaultAvgSalary') || 3800),
                  defaultTrainingDays: Number(fd.get('defaultTrainingDays') || 2),
                  defaultPaxToTrain: Number(fd.get('defaultPaxToTrain') || 25),
                  upfrontCashDisplay: String(fd.get('upfrontCashDisplay') || 'RM 0.00').trim(),
                  sblKhasGuaranteeText: String(fd.get('sblKhasGuaranteeText') || '100% Direct SBL-Khas').trim(),
                });

                showToast('HRDC Calculator logic and pricing rates successfully published!');
              }}
              className="space-y-6 text-xs sm:text-sm"
            >
              {/* Titles & Badge */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Header Display & Guarantee Copy
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Calculator Title</label>
                    <input
                      name="title"
                      type="text"
                      defaultValue={calculatorConfig.title}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Badge Tagline</label>
                    <input
                      name="badge"
                      type="text"
                      defaultValue={calculatorConfig.badge}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Subtitle / Instructions</label>
                  <textarea
                    name="subtitle"
                    rows={2}
                    defaultValue={calculatorConfig.subtitle}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Upfront Employer Cash Display</label>
                    <input
                      name="upfrontCashDisplay"
                      type="text"
                      defaultValue={calculatorConfig.upfrontCashDisplay}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-emerald-600 font-bold text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">SBL-Khas Guarantee Pill</label>
                    <input
                      name="sblKhasGuaranteeText"
                      type="text"
                      defaultValue={calculatorConfig.sblKhasGuaranteeText}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Statutory Formula Caps & Rules */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Statutory HRDC Caps & Mathematical Formula Logic
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Monthly Levy Contribution Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        name="levyRatePercent"
                        type="number"
                        step="0.1"
                        defaultValue={calculatorConfig.levyRatePercent}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      In-House Daily Course Fee Cap (RM/group/day)
                    </label>
                    <input
                      name="inHouseDailyFeeCap"
                      type="number"
                      defaultValue={calculatorConfig.inHouseDailyFeeCap}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      In-House Meal Allowance (RM/pax/day)
                    </label>
                    <input
                      name="inHouseMealAllowancePerPax"
                      type="number"
                      defaultValue={calculatorConfig.inHouseMealAllowancePerPax}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      External / Retreat Fee Cap (RM/pax/day)
                    </label>
                    <input
                      name="retreatDailyCourseFeeCapPerPax"
                      type="number"
                      defaultValue={calculatorConfig.retreatDailyCourseFeeCapPerPax}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      External Program Max Total Claim Cap (RM)
                    </label>
                    <input
                      name="retreatMaxTotalCap"
                      type="number"
                      defaultValue={calculatorConfig.retreatMaxTotalCap}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Workforce Productivity Multiplier (%)
                    </label>
                    <div className="relative">
                      <input
                        name="productivityMultiplierPercent"
                        type="number"
                        defaultValue={calculatorConfig.productivityMultiplierPercent}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Productivity Measurement Window (Months)
                    </label>
                    <input
                      name="productivityMultiplierMonths"
                      type="number"
                      defaultValue={calculatorConfig.productivityMultiplierMonths}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Initial Slider Presets */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Default Slider Starting Values (User Entry Preset)
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Employee Count</label>
                    <input
                      name="defaultEmployeeCount"
                      type="number"
                      defaultValue={calculatorConfig.defaultEmployeeCount}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Avg Salary (RM)</label>
                    <input
                      name="defaultAvgSalary"
                      type="number"
                      defaultValue={calculatorConfig.defaultAvgSalary}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Training Days</label>
                    <input
                      name="defaultTrainingDays"
                      type="number"
                      defaultValue={calculatorConfig.defaultTrainingDays}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Pax to Train</label>
                    <input
                      name="defaultPaxToTrain"
                      type="number"
                      defaultValue={calculatorConfig.defaultPaxToTrain}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Calculator Pricing & Logic</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TESTIMONIES SUBTAB                                                    */}
      {/* ========================================================================= */}
      {activeSubTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search testimonials by client, company, or program..."
                value={testimonialSearch}
                onChange={(e) => setTestimonialSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Reset all testimonies to initial verified reviews?')) {
                    resetTestimonials();
                    showToast('Testimonies reset to default verified corporate reviews.');
                  }
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Testimonies</span>
              </button>

              <button
                onClick={() => setIsAddingTestimonial(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimony</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials
              .filter(t => 
                !testimonialSearch ||
                t.author.toLowerCase().includes(testimonialSearch.toLowerCase()) ||
                t.company.toLowerCase().includes(testimonialSearch.toLowerCase()) ||
                t.quote.toLowerCase().includes(testimonialSearch.toLowerCase())
              )
              .map((test) => (
                <div 
                  key={test.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all"
                >
                  <div className="space-y-3">
                    {/* Stars & Program */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: test.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        {test.programTaken}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{test.quote}"
                    </p>
                  </div>

                  {/* Author details with Media */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={test.avatarUrl} 
                        alt={test.author}
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
                        }}
                      />
                      <div className="min-w-0">
                        <h5 className="font-bold text-xs text-slate-900 truncate">
                          {test.author}
                        </h5>
                        <p className="text-[11px] text-slate-500 truncate">
                          {test.role} &bull; {test.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        onClick={() => setEditingTestimonial(test)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit testimony"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete testimony from "${test.author}"?`)) {
                            deleteTestimonial(test.id);
                            showToast(`Deleted testimony from ${test.author}`);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete testimony"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* EDIT/ADD TESTIMONIAL MODAL */}
          {(editingTestimonial || isAddingTestimonial) && (
            <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
              <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8 flex flex-col">
                <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <MessageSquareQuote className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">
                      {isAddingTestimonial ? 'Add Client Testimony' : 'Edit Client Testimony'}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setEditingTestimonial(null);
                      setIsAddingTestimonial(false);
                    }}
                    className="text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕ Close
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const fd = new FormData(form);

                    const author = String(fd.get('author') || '').trim();
                    const role = String(fd.get('role') || '').trim();
                    const company = String(fd.get('company') || '').trim();
                    const location = String(fd.get('location') || 'Kuala Lumpur').trim();
                    const programTaken = String(fd.get('programTaken') || 'Retail Sales Mastery').trim();
                    const quote = String(fd.get('quote') || '').trim();
                    const avatarUrl = String(fd.get('avatarUrl') || '').trim();
                    const rating = Number(fd.get('rating') || 5);

                    if (!author || !quote) {
                      alert('Please provide the author name and testimonial quote.');
                      return;
                    }

                    if (isAddingTestimonial) {
                      const newId = `test-${Date.now()}`;
                      const newT: Testimonial = {
                        id: newId,
                        author,
                        role,
                        company,
                        location,
                        programTaken,
                        quote,
                        rating,
                        avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                      };
                      addTestimonial(newT);
                      showToast(`Added testimony from "${author}"`);
                    } else if (editingTestimonial) {
                      updateTestimonial(editingTestimonial.id, {
                        author,
                        role,
                        company,
                        location,
                        programTaken,
                        quote,
                        rating,
                        avatarUrl: avatarUrl || editingTestimonial.avatarUrl
                      });
                      showToast(`Updated testimony from "${author}"`);
                    }

                    setEditingTestimonial(null);
                    setIsAddingTestimonial(false);
                  }}
                  className="p-6 space-y-4 text-xs sm:text-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        Client / Executive Name *
                      </label>
                      <input
                        name="author"
                        type="text"
                        required
                        defaultValue={editingTestimonial?.author || ''}
                        placeholder="e.g. Datin Noraisyah Kamarudin"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        Star Rating (1 - 5)
                      </label>
                      <select
                        name="rating"
                        defaultValue={editingTestimonial?.rating || 5}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value={5}>5 Stars (★★★★★)</option>
                        <option value={4}>4 Stars (★★★★☆)</option>
                        <option value={3}>3 Stars (★★★☆☆)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        Role / Title
                      </label>
                      <input
                        name="role"
                        type="text"
                        defaultValue={editingTestimonial?.role || ''}
                        placeholder="e.g. VP of People & Culture"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                        Company Name
                      </label>
                      <input
                        name="company"
                        type="text"
                        defaultValue={editingTestimonial?.company || ''}
                        placeholder="e.g. Berjaya Retail Group"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Program Taken
                    </label>
                    <input
                      name="programTaken"
                      type="text"
                      defaultValue={editingTestimonial?.programTaken || 'Retail Sales Mastery'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Client Media (Avatar URL) *
                    </label>
                    <input
                      name="avatarUrl"
                      type="url"
                      required
                      defaultValue={editingTestimonial?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                      Client Quote & Feedback *
                    </label>
                    <textarea
                      name="quote"
                      rows={3}
                      required
                      defaultValue={editingTestimonial?.quote || ''}
                      placeholder="Share quantifiable business impact, e.g. 24% increase in sales conversion..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestimonial(null);
                        setIsAddingTestimonial(false);
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isAddingTestimonial ? 'Publish Testimony' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TRUSTED BY / CLIENT LOGOS & SOCIAL PROOF SUBTAB                       */}
      {/* ========================================================================= */}
      {activeSubTab === 'trusted-by' && (
        <div className="space-y-8">
          {/* Top Controls Card: Section Settings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>Homepage 'Trusted By' Section & Carousel Settings</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure the social proof headline, subtitle, marquee speed, and display toggles visible right below the Homepage Hero.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset section title and speed settings to defaults?')) {
                      resetTrustedByConfig();
                      showToast('Carousel settings reset to defaults.');
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Settings</span>
                </button>
              </div>
            </div>

            {/* Section Settings Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateTrustedByConfig({
                  sectionBadge: formData.get('sectionBadge') as string,
                  sectionTitle: formData.get('sectionTitle') as string,
                  description: formData.get('description') as string,
                  autoScroll: formData.get('autoScroll') === 'on',
                  scrollSpeed: formData.get('scrollSpeed') as 'slow' | 'normal' | 'fast',
                  showCategoryFilter: formData.get('showCategoryFilter') === 'on',
                });
                showToast('Trusted By section settings saved and live!');
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                    Section Top Pill Badge
                  </label>
                  <input
                    name="sectionBadge"
                    type="text"
                    defaultValue={trustedByConfig.sectionBadge}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. ENTERPRISE SOCIAL PROOF"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                    Section Main Headline
                  </label>
                  <input
                    name="sectionTitle"
                    type="text"
                    defaultValue={trustedByConfig.sectionTitle}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Trusted by Malaysia’s Leading Enterprises"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs mb-1.5">
                  Section Subheading & Description
                </label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={trustedByConfig.description}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  placeholder="Describe your enterprise track record..."
                />
              </div>

              {/* Behavior switches */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">Continuous Auto-Scroll</span>
                    <span className="text-slate-500 text-[11px]">Infinite loop marquee</span>
                  </div>
                  <input
                    type="checkbox"
                    name="autoScroll"
                    defaultChecked={trustedByConfig.autoScroll}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">Category Filter Chips</span>
                    <span className="text-slate-500 text-[11px]">Allow visitor filtering</span>
                  </div>
                  <input
                    type="checkbox"
                    name="showCategoryFilter"
                    defaultChecked={trustedByConfig.showCategoryFilter}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">Scroll Pace</span>
                    <span className="text-slate-500 text-[11px]">Animation velocity</span>
                  </div>
                  <select
                    name="scrollSpeed"
                    defaultValue={trustedByConfig.scrollSpeed}
                    className="bg-white border border-slate-200 text-xs font-semibold rounded-lg px-2 py-1 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="slow">Slow (48s)</option>
                    <option value="normal">Normal (30s)</option>
                    <option value="fast">Fast (18s)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Carousel Settings</span>
                </button>
              </div>
            </form>
          </div>

          {/* Client Logos Management Table/Grid */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search and Category Filter */}
              <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search logos by name, industry, or highlight..."
                    value={clientLogoSearch}
                    onChange={(e) => setClientLogoSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={clientLogoCategoryFilter}
                  onChange={(e) => setClientLogoCategoryFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Sectors ({clientLogos.length})</option>
                  <option value="Banking & Financial">Banking & Financial</option>
                  <option value="Energy & Utilities">Energy & Utilities</option>
                  <option value="Technology & Telco">Technology & Telco</option>
                  <option value="Conglomerate & Property">Conglomerate & Property</option>
                  <option value="Retail & FMCG">Retail & FMCG</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all client logos back to the 12 default Malaysian enterprise logos?')) {
                      resetClientLogos();
                      showToast('Client logos reset to default catalog.');
                    }
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Logos</span>
                </button>

                <button
                  onClick={() => {
                    setEditingClientLogo(null);
                    setModalMonogram('CL');
                    setModalAccentColor('#3430eb');
                    setModalSublabel('MALAYSIA');
                    setModalLogoPreview(generateLogoPlaceholder('Client Corp', 'CL', '#3430eb', 'MALAYSIA'));
                    setIsAddingClientLogo(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Client Logo</span>
                </button>
              </div>
            </div>

            {/* Quick Malaysian Enterprise Presets Toolbar */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider flex items-center gap-1 mr-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Quick Add Presets:</span>
              </span>
              {[
                { name: 'AirAsia (Capital A)', mono: 'AA', color: '#dc2626', cat: 'Technology & Telco', ind: 'Aviation & SuperApp', high: 'Crew Service Agility' },
                { name: 'Gamuda Berhad', mono: 'GB', color: '#ea580c', cat: 'Conglomerate & Property', ind: 'Infrastructure & Engineering', high: 'Site Safety Leadership' },
                { name: 'Astro Malaysia', mono: 'AST', color: '#db2777', cat: 'Technology & Telco', ind: 'Media & Entertainment', high: 'Digital Content Operations' },
                { name: 'DRB-HICOM', mono: 'DH', color: '#0284c7', cat: 'Conglomerate & Property', ind: 'Automotive & Industrial', high: 'Manufacturing Leadership' },
              ].map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    const id = `logo-${Date.now()}`;
                    const placeholder = generateLogoPlaceholder(preset.name, preset.mono, preset.color, 'MALAYSIA');
                    addClientLogo({
                      id,
                      name: preset.name,
                      category: preset.cat,
                      industry: preset.ind,
                      statsOrHighlight: preset.high,
                      logoUrl: placeholder,
                      active: true,
                      order: clientLogos.length + 1
                    });
                    showToast(`Added ${preset.name} with custom SVG placeholder!`);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-[11px] font-semibold text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-blue-600" />
                  <span>+ {preset.name}</span>
                </button>
              ))}
            </div>

            {/* Grid of Client Logos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {clientLogos
                .filter(l => {
                  const matchQuery = !clientLogoSearch || 
                    l.name.toLowerCase().includes(clientLogoSearch.toLowerCase()) || 
                    l.industry.toLowerCase().includes(clientLogoSearch.toLowerCase()) ||
                    l.statsOrHighlight.toLowerCase().includes(clientLogoSearch.toLowerCase());
                  const matchCat = clientLogoCategoryFilter === 'all' || l.category === clientLogoCategoryFilter;
                  return matchQuery && matchCat;
                })
                .map((logo) => (
                  <div
                    key={logo.id}
                    className={`bg-white rounded-2xl border p-4 shadow-xs transition-all flex flex-col justify-between group ${
                      logo.active ? 'border-slate-200 hover:border-blue-300' : 'border-slate-200 bg-slate-50 opacity-60'
                    }`}
                  >
                    <div>
                      {/* Logo Preview Container */}
                      <div className="h-16 w-full bg-slate-950 rounded-xl p-2 flex items-center justify-center border border-slate-800 relative overflow-hidden">
                        <img
                          src={logo.logoUrl}
                          alt={logo.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = generateLogoPlaceholder(logo.name, logo.name.slice(0, 2).toUpperCase(), '#3430eb', 'LOGO');
                          }}
                        />
                        {!logo.active && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-[11px] font-bold text-slate-300">
                            Hidden from Site
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-xs text-slate-900 truncate">
                            {logo.name}
                          </h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 truncate max-w-[110px]">
                            {logo.category}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 truncate">
                          {logo.industry}
                        </p>

                        {logo.statsOrHighlight && (
                          <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg flex items-center gap-1 mt-1 truncate">
                            <Zap className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{logo.statsOrHighlight}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          toggleClientLogo(logo.id);
                          showToast(`Toggled ${logo.name} visibility.`);
                        }}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                          logo.active 
                            ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' 
                            : 'text-slate-500 bg-slate-200 hover:bg-slate-300'
                        }`}
                      >
                        {logo.active ? 'Active' : 'Hidden'}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingClientLogo(logo);
                            setModalLogoPreview(logo.logoUrl);
                            setModalMonogram(logo.name.slice(0, 2).toUpperCase());
                            setIsAddingClientLogo(false);
                          }}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit client logo"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete ${logo.name} from client logos?`)) {
                              deleteClientLogo(logo.id);
                              showToast(`Deleted ${logo.name}.`);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete logo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* ADD / EDIT CLIENT LOGO MODAL */}
          {(isAddingClientLogo || editingClientLogo) && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>{isAddingClientLogo ? 'Add New Client Logo' : `Edit ${editingClientLogo?.name}`}</span>
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingClientLogo(false);
                      setEditingClientLogo(null);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = (formData.get('name') as string).trim();
                    const category = formData.get('category') as string;
                    const industry = (formData.get('industry') as string).trim();
                    const statsOrHighlight = (formData.get('statsOrHighlight') as string).trim();
                    const logoUrl = (formData.get('logoUrl') as string).trim() || modalLogoPreview;
                    const active = formData.get('active') === 'on';

                    if (!name) {
                      alert('Please provide a company name.');
                      return;
                    }

                    if (isAddingClientLogo) {
                      const newId = `logo-${Date.now()}`;
                      addClientLogo({
                        id: newId,
                        name,
                        category,
                        industry: industry || category,
                        statsOrHighlight,
                        logoUrl: logoUrl || generateLogoPlaceholder(name, name.slice(0, 2).toUpperCase(), '#3430eb', 'MALAYSIA'),
                        active,
                        order: clientLogos.length + 1
                      });
                      showToast(`Added client logo for ${name}!`);
                    } else if (editingClientLogo) {
                      updateClientLogo(editingClientLogo.id, {
                        name,
                        category,
                        industry: industry || category,
                        statsOrHighlight,
                        logoUrl: logoUrl || editingClientLogo.logoUrl,
                        active
                      });
                      showToast(`Updated ${name} logo details!`);
                    }

                    setIsAddingClientLogo(false);
                    setEditingClientLogo(null);
                  }}
                  className="p-6 space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                        Company Name *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        defaultValue={editingClientLogo?.name || ''}
                        placeholder="e.g. Petronas Chemicals"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && (!modalMonogram || modalMonogram === 'CL')) {
                            setModalMonogram(val.slice(0, 2).toUpperCase());
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                        Sector / Category *
                      </label>
                      <select
                        name="category"
                        defaultValue={editingClientLogo?.category || 'Banking & Financial'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Banking & Financial">Banking & Financial</option>
                        <option value="Energy & Utilities">Energy & Utilities</option>
                        <option value="Technology & Telco">Technology & Telco</option>
                        <option value="Conglomerate & Property">Conglomerate & Property</option>
                        <option value="Retail & FMCG">Retail & FMCG</option>
                        <option value="Healthcare & Logistics">Healthcare & Logistics</option>
                        <option value="Government & GLC">Government & GLC</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                        Industry Specialty
                      </label>
                      <input
                        name="industry"
                        type="text"
                        defaultValue={editingClientLogo?.industry || ''}
                        placeholder="e.g. Petrochemical Refining & Ops"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                        Social Proof Highlight / Stat
                      </label>
                      <input
                        name="statsOrHighlight"
                        type="text"
                        defaultValue={editingClientLogo?.statsOrHighlight || ''}
                        placeholder="e.g. 340 Managers Upskilled via SBL-Khas"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Logo URL & Dynamic SVG Placeholder Generator */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                        <span>Client Logo Image & Placeholder Generator</span>
                      </span>
                      <span className="text-[10px] text-slate-500">Supports SVG data URIs & external image URLs</span>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-600 text-[11px] mb-1">
                        Image / Logo URL
                      </label>
                      <input
                        name="logoUrl"
                        type="text"
                        value={modalLogoPreview || editingClientLogo?.logoUrl || ''}
                        onChange={(e) => setModalLogoPreview(e.target.value)}
                        placeholder="Paste image URL or use generator below..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Generator Controls */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] text-slate-700">Generate Placeholder SVG Emblem:</span>
                        <button
                          type="button"
                          onClick={() => {
                            const name = (document.querySelector('input[name="name"]') as HTMLInputElement)?.value || 'Enterprise';
                            const generated = generateLogoPlaceholder(name, modalMonogram, modalAccentColor, modalSublabel);
                            setModalLogoPreview(generated);
                            showToast('Generated fresh crisp SVG placeholder!');
                          }}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] rounded-lg shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Generate & Apply</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px]">
                        <div>
                          <label className="block text-slate-500 mb-0.5">Monogram</label>
                          <input
                            type="text"
                            maxLength={4}
                            value={modalMonogram}
                            onChange={(e) => setModalMonogram(e.target.value.toUpperCase())}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 text-xs font-bold uppercase"
                            placeholder="e.g. MB"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 mb-0.5">Accent Color</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="color"
                              value={modalAccentColor}
                              onChange={(e) => setModalAccentColor(e.target.value)}
                              className="w-7 h-7 p-0.5 border border-slate-200 rounded-lg cursor-pointer bg-white"
                            />
                            <span className="font-mono text-[10px] text-slate-600 uppercase">{modalAccentColor}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-slate-500 mb-0.5">Sublabel</label>
                          <input
                            type="text"
                            value={modalSublabel}
                            onChange={(e) => setModalSublabel(e.target.value.toUpperCase())}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 text-xs uppercase"
                            placeholder="MALAYSIA"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Real-time Preview */}
                    <div>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Real-Time Live Logo Preview (Dark Mode Carousel Card):
                      </span>
                      <div className="h-16 w-full max-w-xs bg-slate-950 rounded-xl p-2 border border-slate-800 flex items-center justify-center">
                        {modalLogoPreview ? (
                          <img
                            src={modalLogoPreview}
                            alt="Logo preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-slate-500 text-xs">No image provided</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active switch */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">Visible on Live Site</span>
                      <span className="text-slate-500 text-[11px]">Toggle whether this client logo shows in carousel</span>
                    </div>
                    <input
                      type="checkbox"
                      name="active"
                      defaultChecked={editingClientLogo ? editingClientLogo.active : true}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingClientLogo(false);
                        setEditingClientLogo(null);
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isAddingClientLogo ? 'Add Client Logo' : 'Save Logo Details'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CONTACT US SECTION SUBTAB                                             */}
      {/* ========================================================================= */}
      {activeSubTab === 'contact' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-blue-600" />
                  <span>Contact Us & Headquarters Section Details</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Updates to these office addresses, telephones, WhatsApp links, and operating hours instantly update the Home page "Reach out" grid, Contact & Booking sidebar, and Footer across the site.
                </p>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('Reset contact details back to Menara Bangsar KL Eco City headquarters?')) {
                    resetContactConfig();
                    showToast('Contact details reset to standard KL Eco City headquarters.');
                  }
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Contacts</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                updateContactConfig({
                  sectionTitle: String(fd.get('sectionTitle') || '').trim(),
                  sectionSubtitle: String(fd.get('sectionSubtitle') || '').trim(),
                  companyName: String(fd.get('companyName') || '').trim(),
                  officeName: String(fd.get('officeName') || '').trim(),
                  addressLine1: String(fd.get('addressLine1') || '').trim(),
                  addressLine2: String(fd.get('addressLine2') || '').trim(),
                  cityStateZip: String(fd.get('cityStateZip') || '').trim(),
                  primaryPhone: String(fd.get('primaryPhone') || '').trim(),
                  phoneLabel: String(fd.get('phoneLabel') || '').trim(),
                  whatsappNumber: String(fd.get('whatsappNumber') || '').trim(),
                  whatsappLabel: String(fd.get('whatsappLabel') || '').trim(),
                  whatsappUrl: String(fd.get('whatsappUrl') || '').trim(),
                  primaryEmail: String(fd.get('primaryEmail') || '').trim(),
                  secondaryEmail: String(fd.get('secondaryEmail') || '').trim(),
                  operatingHours: String(fd.get('operatingHours') || '').trim(),
                  accreditationText: String(fd.get('accreditationText') || '').trim(),
                  slaNotice: String(fd.get('slaNotice') || '').trim(),
                });

                showToast('Contact Us section details saved and live across all pages!');
              }}
              className="space-y-5 text-xs sm:text-sm"
            >
              {/* Section Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Section Main Heading</label>
                  <input
                    name="sectionTitle"
                    type="text"
                    defaultValue={contactConfig.sectionTitle}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Section Subheading Tagline</label>
                  <input
                    name="sectionSubtitle"
                    type="text"
                    defaultValue={contactConfig.sectionSubtitle}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Physical Office Address */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Office Location & Mailing Address
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Office Name / Level</label>
                    <input
                      name="officeName"
                      type="text"
                      defaultValue={contactConfig.officeName}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Address Line 1</label>
                    <input
                      name="addressLine1"
                      type="text"
                      defaultValue={contactConfig.addressLine1}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Address Line 2 (Street / Landmark)</label>
                    <input
                      name="addressLine2"
                      type="text"
                      defaultValue={contactConfig.addressLine2}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Postcode, City & Country</label>
                    <input
                      name="cityStateZip"
                      type="text"
                      defaultValue={contactConfig.cityStateZip}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Direct Communications: Phones & Emails */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Telecommunications & Digital Channels
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Office Telephone (HQ)</label>
                    <input
                      name="primaryPhone"
                      type="text"
                      defaultValue={contactConfig.primaryPhone}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">WhatsApp Hot-Desk Number</label>
                    <input
                      name="whatsappNumber"
                      type="text"
                      defaultValue={contactConfig.whatsappNumber}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-emerald-600 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">WhatsApp Direct API Link</label>
                    <input
                      name="whatsappUrl"
                      type="url"
                      defaultValue={contactConfig.whatsappUrl}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Operating Hours</label>
                    <input
                      name="operatingHours"
                      type="text"
                      defaultValue={contactConfig.operatingHours}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">Primary Executive Email</label>
                    <input
                      name="primaryEmail"
                      type="email"
                      defaultValue={contactConfig.primaryEmail}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">General Inquiries Email</label>
                    <input
                      name="secondaryEmail"
                      type="email"
                      defaultValue={contactConfig.secondaryEmail}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Accreditation & SLA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Accreditation Notice</label>
                  <input
                    name="accreditationText"
                    type="text"
                    defaultValue={contactConfig.accreditationText}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">Proposal Dispatch SLA Notice</label>
                  <input
                    name="slaNotice"
                    type="text"
                    defaultValue={contactConfig.slaNotice}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Contact Us Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. FOOTER SECTION SUBTAB                                                 */}
      {/* ========================================================================= */}
      {activeSubTab === 'footer' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <PanelBottom className="w-5 h-5 text-blue-600" />
                  <span>Site-Wide Footer Section Configuration</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customize the brand biography, HRDC MyCoID accreditation badges, corporate training PDF brochure download copy, and legal copyright notices displayed on every page.
                </p>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('Reset footer settings to standard default text?')) {
                    resetFooterConfig();
                    showToast('Footer settings reset to default copy.');
                  }
                }}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Footer</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                updateFooterConfig({
                  brandDescription: String(fd.get('brandDescription') || '').trim(),
                  myCoIdText: String(fd.get('myCoIdText') || '').trim(),
                  grantClaimableText: String(fd.get('grantClaimableText') || '').trim(),
                  catalogHeading: String(fd.get('catalogHeading') || '').trim(),
                  catalogButtonText: String(fd.get('catalogButtonText') || '').trim(),
                  copyrightText: String(fd.get('copyrightText') || '').trim(),
                  pdpaNotice: String(fd.get('pdpaNotice') || '').trim(),
                });

                showToast('Site-wide Footer updated and live across all pages!');
              }}
              className="space-y-5 text-xs sm:text-sm"
            >
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1.5">
                  Brand Description / Tagline *
                </label>
                <textarea
                  name="brandDescription"
                  rows={3}
                  required
                  defaultValue={footerConfig.brandDescription}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1.5">
                    Accreditation Badge 1 (MyCoID / Registered)
                  </label>
                  <input
                    name="myCoIdText"
                    type="text"
                    defaultValue={footerConfig.myCoIdText}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1.5">
                    Accreditation Badge 2 (SBL-Khas Claimable)
                  </label>
                  <input
                    name="grantClaimableText"
                    type="text"
                    defaultValue={footerConfig.grantClaimableText}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1.5">
                    Catalog Download Box Heading
                  </label>
                  <input
                    name="catalogHeading"
                    type="text"
                    defaultValue={footerConfig.catalogHeading}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1.5">
                    Catalog Button Text
                  </label>
                  <input
                    name="catalogButtonText"
                    type="text"
                    defaultValue={footerConfig.catalogButtonText}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1.5">
                  Copyright Notice & Malaysian Legal Act Reference *
                </label>
                <input
                  name="copyrightText"
                  type="text"
                  required
                  defaultValue={footerConfig.copyrightText}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1.5">
                  Privacy & PDPA Compliance Statement
                </label>
                <input
                  name="pdpaNotice"
                  type="text"
                  defaultValue={footerConfig.pdpaNotice}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Footer Content</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. ANNOUNCEMENT BAR SUBTAB                                                */}
      {/* ========================================================================= */}
      {activeSubTab === 'announcement' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-blue-600" />
                <span>Top Site-Wide Announcement Bar</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Controls the persistent top announcement bar shown across all devices.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);

                updateAnnouncement({
                  active: fd.get('active') === 'on',
                  badge: String(fd.get('badge') || 'HRDC 2026').trim(),
                  message: String(fd.get('message') || '').trim(),
                  linkRoute: 'contact-booking'
                });

                showToast('Site announcement updated successfully!');
              }}
              className="space-y-5 text-xs sm:text-sm"
            >
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">Display Top Announcement Bar</span>
                  <span className="text-slate-500 text-xs">When enabled, stays pinned to the top of all pages.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    name="active"
                    type="checkbox"
                    defaultChecked={announcement.active}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1.5">
                  Announcement Badge / Pill Text
                </label>
                <input
                  name="badge"
                  type="text"
                  defaultValue={announcement.badge}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1.5">
                  Announcement Message Body
                </label>
                <textarea
                  name="message"
                  rows={2}
                  defaultValue={announcement.message}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Announcement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
