import React, { useState } from 'react';
import { PageRoute } from '../types';
import { 
  X, 
  Globe, 
  Share2, 
  FileCode2, 
  Check, 
  Copy, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  Search
} from 'lucide-react';

interface MetaTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: PageRoute;
}

export const MetaTagsModal: React.FC<MetaTagsModalProps> = ({
  isOpen,
  onClose,
  currentRoute,
}) => {
  const [activeTab, setActiveTab] = useState<'seo-preview' | 'og-card' | 'sitemap' | 'robots'>('seo-preview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentHost = typeof window !== 'undefined' ? window.location.origin : 'https://cleveraacademy.my';

  const routeMetaMap: Record<PageRoute, { title: string; desc: string; ogImage: string }> = {
    home: {
      title: 'Clevera Academy | HRDC Claimable Corporate Training & Team Building Malaysia',
      desc: 'Accelerate workforce productivity with 100% HRDC-claimable corporate workshops, retail leadership programs, and energetic team building retreats in Malaysia.',
      ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    },
    modules: {
      title: 'Training Modules Catalog | Retail, Synergy & Digital AI | Clevera Academy',
      desc: 'Browse 10+ certified corporate training masterclasses claimable under HRDC SBL-Khas scheme. Download complete syllabi and outlines.',
      ogImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    },
    'hrdc-guide': {
      title: 'Malaysian HRDC Claiming Guide & e-TRiS Walkthrough | Clevera Academy',
      desc: 'Complete step-by-step employer guide to claiming 100% corporate training grants on e-TRiS with zero out-of-pocket payment.',
      ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    },
    'gallery-about': {
      title: 'Corporate Training Gallery & About Clevera Academy | Kuala Lumpur',
      desc: 'Discover past corporate retreats, retail sales simulations, and meet our HRD Corp certified master trainers (TTT).',
      ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    'contact-booking': {
      title: 'Book HRDC Training & Request e-TRiS Quotation | Clevera Academy',
      desc: 'Request an official training proposal and quotation within 2 hours. 100% claimable via HRDC SBL-Khas scheme.',
      ogImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop',
    },
    admin: {
      title: 'Staff CRM Portal & Lead Management | Clevera Academy',
      desc: 'Authorized admin workspace for corporate inquiries, sales assignment, and e-TRiS webhook monitoring.',
      ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    },
    'thank-you': {
      title: 'Booking Inquiry Received | Clevera Academy Malaysia',
      desc: 'Thank you for your training booking. Our HRDC consultant will reach out within 2 hours.',
      ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    },
    privacy: {
      title: 'PDPA Privacy Policy | Clevera Academy Sdn Bhd',
      desc: 'Compliance with Malaysian Personal Data Protection Act (PDPA 2010) regarding corporate client information.',
      ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    },
    terms: {
      title: 'Terms of Service & Training Agreement | Clevera Academy',
      desc: 'Terms governing corporate training delivery, HRDC SBL-Khas claims, and participant attendance compliance.',
      ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    },
    '404': {
      title: 'Page Not Found | Clevera Academy Malaysia',
      desc: 'The requested resource could not be found. Explore our HRDC claimable training modules.',
      ogImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    },
  };

  const meta = routeMetaMap[currentRoute] || routeMetaMap.home;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${currentHost}/</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${currentHost}/modules</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${currentHost}/hrdc-guide</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${currentHost}/gallery-about</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${currentHost}/contact-booking</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.95</priority>
  </url>
</urlset>`;

  const robotsTxt = `# Clevera Academy Robots.txt
# Authorized crawling for Malaysian HRDC Corporate Training Portal

User-agent: *
Allow: /
Allow: /modules
Allow: /hrdc-guide
Allow: /gallery-about
Allow: /contact-booking

# Disallow protected staff admin workspace
Disallow: /admin
Disallow: /api/

Sitemap: ${currentHost}/sitemap.xml
Host: ${currentHost}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/30 text-blue-400 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                SEO & OpenGraph Meta Verification Engine
              </h3>
              <p className="text-xs text-slate-400">
                Active Route: <code className="text-blue-300 font-mono">/{currentRoute}</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 text-xs font-bold">
          <button
            onClick={() => setActiveTab('seo-preview')}
            className={`py-3 px-4 border-b-2 -mb-px flex items-center gap-1.5 ${
              activeTab === 'seo-preview'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Google SERP Snippet
          </button>
          <button
            onClick={() => setActiveTab('og-card')}
            className={`py-3 px-4 border-b-2 -mb-px flex items-center gap-1.5 ${
              activeTab === 'og-card'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            Social Media OG Card
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`py-3 px-4 border-b-2 -mb-px flex items-center gap-1.5 ${
              activeTab === 'sitemap'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            sitemap.xml
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`py-3 px-4 border-b-2 -mb-px flex items-center gap-1.5 ${
              activeTab === 'robots'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            robots.txt
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          
          {/* SERP Snippet */}
          {activeTab === 'seo-preview' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                    C
                  </div>
                  <span className="text-slate-700 font-medium">cleveraacademy.my &rsaquo; {currentRoute}</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-blue-800 hover:underline cursor-pointer">
                  {meta.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {meta.desc}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-700">Rendered HTML Meta Tags:</div>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed">
{`<title>${meta.title}</title>
<meta name="description" content="${meta.desc}" />
<meta property="og:title" content="${meta.title}" />
<meta property="og:description" content="${meta.desc}" />
<meta property="og:image" content="${meta.ogImage}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />`}
                </pre>
              </div>
            </div>
          )}

          {/* Social OG Card */}
          {activeTab === 'og-card' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-md max-w-lg mx-auto bg-slate-900 text-white">
                <div className="aspect-[1.91/1] w-full bg-slate-800 relative overflow-hidden">
                  <img
                    src={meta.ogImage}
                    alt={meta.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                    <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider w-max mb-1.5">
                      HRD Corp Approved
                    </span>
                    <h5 className="font-black text-white text-base sm:text-lg leading-tight line-clamp-2">
                      {meta.title}
                    </h5>
                  </div>
                </div>
                <div className="p-4 bg-slate-950">
                  <span className="text-[11px] text-slate-400 uppercase font-mono block">
                    CLEVERAACADEMY.MY
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {meta.desc}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sitemap.xml */}
          {activeTab === 'sitemap' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Generated XML Sitemap with Malaysian Search Engine Canonical Indexing:
                </span>
                <button
                  onClick={() => copyToClipboard(sitemapXml)}
                  className="text-xs text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy XML'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                {sitemapXml}
              </pre>
            </div>
          )}

          {/* Robots.txt */}
          {activeTab === 'robots' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Standard Web Crawler Directives:
                </span>
                <button
                  onClick={() => copyToClipboard(robotsTxt)}
                  className="text-xs text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Robots.txt'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                {robotsTxt}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 rounded-xl"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
