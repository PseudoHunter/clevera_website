import React, { useState, useRef } from 'react';
import { useLogoConfig, DEFAULT_LOGO_CONFIG, LogoConfig } from '../context/LogoContext';
import { 
  Upload, 
  Sparkles, 
  RotateCcw, 
  Check, 
  X, 
  Image as ImageIcon, 
  Sliders, 
  ShieldCheck, 
  Eye, 
  Download, 
  Palette, 
  Type, 
  Sun, 
  Moon, 
  Smartphone,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CleveraLogo } from './CleveraLogo';

interface AdminLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminEmail?: string;
}

export const AdminLogoModal: React.FC<AdminLogoModalProps> = ({
  isOpen,
  onClose,
  adminEmail = 'alifhakimi1704@gmail.com',
}) => {
  const { 
    logoConfig, 
    updateLogoConfig, 
    saveLogoConfig, 
    uploadCustomLogoImage, 
    resetToDefaultLogo,
    isLogoCustomized 
  } = useLogoConfig();

  const [activeTab, setActiveTab] = useState<'upload' | 'palette' | 'typography'>('upload');
  const [previewMode, setPreviewMode] = useState<'light' | 'dark' | 'mobile'>('light');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local draft state so admin can tweak and then click "Apply & Save"
  const [draftConfig, setDraftConfig] = useState<LogoConfig>(logoConfig);

  // Sync draft with global config when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setDraftConfig(logoConfig);
      setSaveSuccessToast(false);
      setUploadError(null);
    }
  }, [isOpen, logoConfig]);

  if (!isOpen) return null;

  // Color presets for the vector emblem
  const COLOR_PRESETS = [
    {
      name: 'Official Business Card (Default)',
      top: '#3B82F6',
      left: '#1D4ED8',
      bottom: '#60A5FA',
      right: '#BFDBFE',
      dot: '#1D4ED8',
      star: '#FFFFFF',
    },
    {
      name: 'Electric Cobalt Signature',
      top: '#3430eb',
      left: '#1e1b9b',
      bottom: '#6366f1',
      right: '#a5b4fc',
      dot: '#3430eb',
      star: '#FFFFFF',
    },
    {
      name: 'Platinum & Obsidian',
      top: '#475569',
      left: '#0f172a',
      bottom: '#94a3b8',
      right: '#cbd5e1',
      dot: '#0f172a',
      star: '#FFFFFF',
    },
    {
      name: 'Emerald Corporate Excellence',
      top: '#10b981',
      left: '#047857',
      bottom: '#34d399',
      right: '#a7f3d0',
      dot: '#065f46',
      star: '#FFFFFF',
    },
    {
      name: 'Royal Navy & Amber Gold',
      top: '#f59e0b',
      left: '#1e3a8a',
      bottom: '#fbbf24',
      right: '#fef3c7',
      dot: '#b45309',
      star: '#FFFFFF',
    },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadError(null);
      const base64 = await uploadCustomLogoImage(file);
      setDraftConfig((prev) => ({
        ...prev,
        mode: 'custom-image',
        customImageUrl: base64,
      }));
    } catch (err: any) {
      setUploadError(err.message || 'Error uploading image');
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    setDraftConfig((prev) => ({
      ...prev,
      mode: 'custom-image',
      customImageUrl: imageUrlInput.trim(),
    }));
    updateLogoConfig({
      mode: 'custom-image',
      customImageUrl: imageUrlInput.trim(),
    });
    setImageUrlInput('');
  };

  const handleApplyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    const updated: Partial<LogoConfig> = {
      mode: 'official',
      topPetalColor: preset.top,
      leftPetalColor: preset.left,
      bottomPetalColor: preset.bottom,
      rightPetalColor: preset.right,
      centerDotColor: preset.dot,
      starColor: preset.star,
    };
    setDraftConfig((prev) => ({ ...prev, ...updated }));
    updateLogoConfig(updated);
  };

  const handleSaveAndApply = () => {
    saveLogoConfig(draftConfig);
    setSaveSuccessToast(true);
    setTimeout(() => {
      setSaveSuccessToast(false);
    }, 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset the website logo back to the official business card design?')) {
      resetToDefaultLogo();
      setDraftConfig(DEFAULT_LOGO_CONFIG);
      setSaveSuccessToast(true);
      setTimeout(() => {
        setSaveSuccessToast(false);
      }, 3000);
    }
  };

  const handleDownloadSVG = () => {
    const element = document.createElement('a');
    element.setAttribute('href', '/clevera-logo.svg');
    element.setAttribute('download', 'clevera-academy-official-logo.svg');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-black text-white p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3430eb] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black font-display tracking-tight text-white">
                  Admin Logo & Brand Privilege Manager
                </h2>
                <span className="bg-[#3430eb]/30 border border-[#3430eb]/60 text-[#93c5fd] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Authorized Admin: <span className="text-emerald-400 font-medium">{adminEmail}</span> &bull; Instant live updates across header, footer & brand assets.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Toast */}
        {saveSuccessToast && (
          <div className="bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 flex items-center justify-between shadow-md animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Logo updated successfully! Changes are active live across the entire website.</span>
            </div>
            <button onClick={() => setSaveSuccessToast(false)} className="text-emerald-200 hover:text-white">
              &times;
            </button>
          </div>
        )}

        {/* Modal Body: Two Columns (Controls on Left, Live Preview on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* LEFT: Controls (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto max-h-[65vh]">
            
            {/* Mode Tabs */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('upload');
                  setDraftConfig((prev) => ({ ...prev, mode: prev.customImageUrl ? 'custom-image' : 'official' }));
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'upload' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Logo File</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('palette');
                  setDraftConfig((prev) => ({ ...prev, mode: 'official' }));
                  updateLogoConfig({ mode: 'official' });
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'palette' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Emblem Colors</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('typography')}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'typography' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Brand Text</span>
              </button>
            </div>

            {/* TAB 1: UPLOAD LOGO */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Custom Logo File (PNG, SVG, JPG, WebP)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Upload your company logo. It will automatically be integrated into the navigation bar, footer, and brochures.
                  </p>
                </div>

                {/* Drag & Drop Box */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#3430eb] bg-slate-50/70 hover:bg-blue-50/30 transition-all rounded-2xl p-6 text-center cursor-pointer space-y-3 group"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="image/png,image/jpeg,image/svg+xml,image/webp" 
                    className="hidden" 
                  />
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 group-hover:scale-110 transition-transform mx-auto flex items-center justify-center text-[#3430eb]">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#3430eb] transition-colors block">
                      Click to choose image or drag & drop here
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Recommended: Transparent PNG or SVG (Max 4MB)
                    </span>
                  </div>
                </div>

                {uploadError && (
                  <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* External Image URL Alternative */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-600 block mb-1.5">
                    Or paste logo image link (URL)
                  </span>
                  <form onSubmit={handleUrlSubmit} className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#3430eb] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      Load URL
                    </button>
                  </form>
                </div>

                {/* Scale & Invert Controls (when custom image is selected) */}
                {draftConfig.customImageUrl && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 mt-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Logo Size / Scale: {draftConfig.customImageScale}%</span>
                      <button
                        type="button"
                        onClick={() => {
                          setDraftConfig((prev) => ({ ...prev, customImageScale: 100 }));
                          updateLogoConfig({ customImageScale: 100 });
                        }}
                        className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                      >
                        Reset 100%
                      </button>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={draftConfig.customImageScale}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setDraftConfig((prev) => ({ ...prev, customImageScale: val }));
                        updateLogoConfig({ customImageScale: val });
                      }}
                      className="w-full accent-[#3430eb]"
                    />

                    <div className="pt-1 flex items-center justify-between">
                      <label className="text-xs text-slate-700 font-medium flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draftConfig.customImageDarkInvert}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setDraftConfig((prev) => ({ ...prev, customImageDarkInvert: val }));
                            updateLogoConfig({ customImageDarkInvert: val });
                          }}
                          className="rounded text-[#3430eb] focus:ring-[#3430eb]"
                        />
                        <span>Invert colors on dark backgrounds (White filter)</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EMBLEM COLOR PALETTE */}
            {activeTab === 'palette' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Official Emblem Color Themes
                  </h3>
                  <p className="text-xs text-slate-600">
                    Pick a curated palette or customize each individual petal and core node.
                  </p>
                </div>

                {/* Presets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-[#3430eb] rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="flex -space-x-1 shrink-0">
                        <div className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.top }} />
                        <div className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.left }} />
                        <div className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.bottom }} />
                        <div className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: preset.right }} />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#3430eb] truncate block">
                          {preset.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Individual Petal Color Pickers */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Custom Petal Colors
                  </span>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Top Petal</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={draftConfig.topPetalColor}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftConfig((p) => ({ ...p, topPetalColor: val }));
                            updateLogoConfig({ topPetalColor: val });
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                        />
                        <span className="font-mono text-[11px] text-slate-600">{draftConfig.topPetalColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Left Petal</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={draftConfig.leftPetalColor}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftConfig((p) => ({ ...p, leftPetalColor: val }));
                            updateLogoConfig({ leftPetalColor: val });
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                        />
                        <span className="font-mono text-[11px] text-slate-600">{draftConfig.leftPetalColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Bottom Petal</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={draftConfig.bottomPetalColor}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftConfig((p) => ({ ...p, bottomPetalColor: val }));
                            updateLogoConfig({ bottomPetalColor: val });
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                        />
                        <span className="font-mono text-[11px] text-slate-600">{draftConfig.bottomPetalColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">Right Petal</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={draftConfig.rightPetalColor}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftConfig((p) => ({ ...p, rightPetalColor: val }));
                            updateLogoConfig({ rightPetalColor: val });
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                        />
                        <span className="font-mono text-[11px] text-slate-600">{draftConfig.rightPetalColor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BRAND TYPOGRAPHY */}
            {activeTab === 'typography' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Brand Name & Subtitle
                  </h3>
                  <p className="text-xs text-slate-600">
                    Modify the displayed company name and subtitle appearing alongside or beneath the emblem.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Main Brand Name
                    </label>
                    <input
                      type="text"
                      value={draftConfig.brandName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDraftConfig((p) => ({ ...p, brandName: val }));
                        updateLogoConfig({ brandName: val });
                      }}
                      placeholder="CLEVERA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-slate-900 focus:ring-2 focus:ring-[#3430eb] focus:outline-none uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subtitle / Unit
                    </label>
                    <input
                      type="text"
                      value={draftConfig.brandSub}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDraftConfig((p) => ({ ...p, brandSub: val }));
                        updateLogoConfig({ brandSub: val });
                      }}
                      placeholder="ACADEMY"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold tracking-widest text-slate-900 focus:ring-2 focus:ring-[#3430eb] focus:outline-none uppercase"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="text-xs text-slate-700 font-medium flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draftConfig.hideEmblem}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setDraftConfig((p) => ({ ...p, hideEmblem: val }));
                          updateLogoConfig({ hideEmblem: val });
                        }}
                        className="rounded text-[#3430eb] focus:ring-[#3430eb]"
                      />
                      <span>Hide vector rosette emblem (Text-only logo)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Live Real-Time Multi-View Preview (5 cols) */}
          <div className="lg:col-span-5 bg-slate-100/80 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Eye className="w-3.5 h-3.5 text-[#3430eb]" />
                  <span>Live Site Preview</span>
                </div>

                {/* Preview Theme Toggles */}
                <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('light')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      previewMode === 'light' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Light Navbar"
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('dark')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      previewMode === 'dark' ? 'bg-slate-900 text-white font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Dark Footer / Header"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('mobile')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      previewMode === 'mobile' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Stacked Card View"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Simulated Environment Display */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                
                {/* 1. Light Navbar Simulation */}
                {previewMode === 'light' && (
                  <div className="bg-white p-5 border border-slate-200 space-y-4">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                      Header Navigation Bar (Light Mode)
                    </span>
                    <div className="py-3 flex items-center justify-between border-b border-slate-100">
                      <CleveraLogo variant="horizontal" theme="light" size="md" />
                      <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <span>Modules</span>
                        <span>&bull;</span>
                        <span>Guide</span>
                        <span>&bull;</span>
                        <span className="px-2 py-1 bg-[#3430eb] text-white rounded-full text-[9px] font-bold">Book</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Dark Header/Footer Simulation */}
                {previewMode === 'dark' && (
                  <div className="bg-black text-white p-5 border border-slate-800 space-y-4">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block tracking-wider">
                      Architectural Dark Header & Footer
                    </span>
                    <div className="py-3 flex items-center justify-between border-b border-white/10">
                      <CleveraLogo variant="horizontal" theme="dark" size="md" />
                      <span className="px-2.5 py-1 bg-white/10 text-slate-300 text-[10px] rounded-full">
                        Nationwide Delivery
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. Stacked Business Card Simulation */}
                {previewMode === 'mobile' && (
                  <div className="bg-white p-6 border border-slate-200 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-4 tracking-wider">
                      Official Business Card Stacked Format
                    </span>
                    <div className="py-4">
                      <CleveraLogo variant="stacked" theme="light" size="lg" />
                    </div>
                  </div>
                )}
              </div>

              {/* Status Metadata */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Current Mode:</span>
                  <strong className="text-slate-900 uppercase font-mono text-[11px]">
                    {draftConfig.mode}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Last Modified:</span>
                  <span className="text-slate-500 text-[11px]">
                    {draftConfig.updatedAt ? new Date(draftConfig.updatedAt).toLocaleTimeString() : 'Default'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-4">
              <button
                type="button"
                onClick={handleSaveAndApply}
                className="w-full btn-cobalt py-3 px-4 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Apply & Save Site-Wide</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset to official business card logo"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Default</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSVG}
                  className="py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Download official SVG vector"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>SVG</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
