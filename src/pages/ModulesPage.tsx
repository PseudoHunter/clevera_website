import React, { useState, useMemo } from 'react';
import { PageRoute, TrainingModule, ModuleCategory } from '../types';
import { useContent } from '../context/ContentContext';
import { 
  Search, 
  Filter, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Download, 
  Users, 
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

interface ModulesPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenSyllabus: (module: TrainingModule) => void;
}

export const ModulesPage: React.FC<ModulesPageProps> = ({
  onNavigate,
  onOpenSyllabus,
}) => {
  const { modules } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory>('all');
  const [downloadingCatalog, setDownloadingCatalog] = useState(false);
  const [catalogDownloaded, setCatalogDownloaded] = useState(false);

  const categories: { id: ModuleCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Programs', count: modules.length },
    { id: 'retail-leadership', label: 'Retail Leadership & Ops', count: modules.filter(m => m.category === 'retail-leadership').length },
    { id: 'team-synergy', label: 'Team Synergy & Dynamics', count: modules.filter(m => m.category === 'team-synergy').length },
    { id: 'digital-technical', label: 'Digital & AI Skills', count: modules.filter(m => m.category === 'digital-technical').length },
    { id: 'hr-compliance', label: 'Employment Law & HR', count: modules.filter(m => m.category === 'hr-compliance').length },
    { id: 'specialized-business', label: 'Specialized Business', count: modules.filter(m => m.category === 'specialized-business').length },
  ];

  const filteredModules = useMemo(() => {
    return modules.filter((m) => {
      const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        m.title.toLowerCase().includes(query) ||
        m.shortDescription.toLowerCase().includes(query) ||
        m.keyHighlights.some(h => h.toLowerCase().includes(query)) ||
        m.grantCode.toLowerCase().includes(query) ||
        m.targetAudience.some(a => a.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [modules, selectedCategory, searchQuery]);

  const handleDownloadCatalog = () => {
    setDownloadingCatalog(true);
    setTimeout(() => {
      setDownloadingCatalog(false);
      setCatalogDownloaded(true);
      setTimeout(() => setCatalogDownloaded(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Page Header */}
      <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#3430eb]/20 border border-[#3430eb]/50 text-[#60a5fa] text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% HRD Corp SBL-Khas Claimable</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
                Corporate Training Syllabi & Masterclasses
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Filter our HRDC-approved masterclasses across Retail Leadership, High-Impact Team Building, Digital AI Automation, and Employment Law 1955.
              </p>
            </div>

            {/* Catalog Download CTA Button */}
            <div className="shrink-0">
              {catalogDownloaded ? (
                <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 px-6 py-3.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>2026 Master Catalog Downloaded!</span>
                </div>
              ) : (
                <button
                  onClick={handleDownloadCatalog}
                  disabled={downloadingCatalog}
                  className="btn-cobalt px-7 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadingCatalog ? 'Compiling PDF...' : 'Download Full 2026 Catalog'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, e.g. 'Excel', 'Retail', 'AI', 'DISC'..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <div className="text-xs font-semibold text-slate-500 self-end md:self-center">
              Showing <span className="font-bold text-slate-900">{filteredModules.length}</span> of {modules.length} HRDC Programs
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCategory === cat.id ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Modules Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredModules.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No matching corporate training modules found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We customize tailored corporate syllabi for specific organizational requirements.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredModules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Header */}
                <div>
                  <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                    <img
                      src={module.image}
                      alt={module.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-between p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-blue-600/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                          {module.categoryLabel}
                        </span>
                        <span className="bg-emerald-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          {module.hrdcScheme}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-blue-200 bg-slate-900/80 px-2 py-0.5 rounded w-max">
                        {module.grantCode}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{module.duration}</span>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {module.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {module.shortDescription}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {module.keyHighlights.slice(0, 2).map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Target Audience Chips */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Audience:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {module.targetAudience.slice(0, 2).map((aud, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {aud}
                          </span>
                        ))}
                        {module.targetAudience.length > 2 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{module.targetAudience.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenSyllabus(module)}
                    className="flex-1 py-2.5 px-3 rounded-full border border-slate-200 hover:border-[#3430eb] hover:bg-slate-50 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#3430eb]" />
                    <span>View Syllabus</span>
                  </button>

                  <button
                    onClick={() => onNavigate('contact-booking')}
                    className="flex-1 py-2.5 px-3 rounded-full btn-cobalt text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-200" />
                    <span>Book</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Custom Syllabus Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-3xl p-8 sm:p-12 text-white border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <span className="text-xs font-bold text-[#60a5fa] uppercase tracking-widest">
              Bespoke Enterprise Program
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white font-display">
              Need a Custom Training Syllabus for Your Specific Industry?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our master trainers design customized modules matching your company's internal SOPs, retail mystery shopping standards, or digital transformation goals.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact-booking')}
            className="btn-cobalt px-8 py-4 text-xs font-extrabold uppercase tracking-wider shadow-lg shrink-0 cursor-pointer"
          >
            Request Tailored Outline
          </button>
        </div>
      </section>

    </div>
  );
};
