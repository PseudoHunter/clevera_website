import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CleveraLogo } from './CleveraLogo';
import { 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  Lock, 
  FileCode2, 
  ChevronRight,
  Sparkles,
  Palette
} from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenMetaInspector?: () => void;
  onOpenSitemapModal?: () => void;
  onOpenLogoModal?: () => void;
  isAdminLoggedIn: boolean;
  announcementActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenMetaInspector,
  onOpenSitemapModal,
  onOpenLogoModal,
  isAdminLoggedIn,
  announcementActive = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openInspector = onOpenMetaInspector || onOpenSitemapModal || (() => {});

  const navItems: { label: string; route: PageRoute; badge?: string }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Training Modules', route: 'modules', badge: '100% Claimable' },
    { label: 'HRDC Claiming Guide', route: 'hrdc-guide' },
    { label: 'Gallery & About Us', route: 'gallery-about' },
    { label: 'Contact & Booking', route: 'contact-booking' },
  ];

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Top Banner: HRDC Accreditation & Quick Contact */}
      {announcementActive && (
        <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-blue-600/90 text-white font-semibold text-[11px] px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                HRD Corp Approved
              </span>
              <span className="hidden sm:inline text-slate-300">
                100% SBL-Khas Grant Claimable with Zero Out-of-Pocket Payment.
              </span>
              <span className="sm:hidden text-slate-300 truncate">
                100% HRDC Claimable
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <a 
                href="tel:+60322828900" 
                className="hover:text-white flex items-center gap-1.5 transition-colors"
                title="Call Malaysian HQ"
              >
                <Phone className="w-3 h-3 text-blue-400" />
                <span className="hidden md:inline">+60 3-2282 8900</span>
                <span className="md:hidden">Call HQ</span>
              </a>
              {isAdminLoggedIn && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 hidden sm:inline">|</span>
                  <button
                    onClick={openInspector}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer"
                    title="View Sitemap & Robots.txt (Admin Only)"
                  >
                    <FileCode2 className="w-3 h-3 text-blue-400" />
                    <span>SEO / Sitemap</span>
                  </button>
                  <button
                    onClick={onOpenLogoModal}
                    className="bg-[#3430eb] hover:bg-blue-700 text-white text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                    title="Change Website Logo (Admin Privilege)"
                  >
                    <Palette className="w-3 h-3" />
                    <span>Change Logo</span>
                  </button>
                  <button
                    onClick={() => handleNav('admin')}
                    className="bg-emerald-700 hover:bg-emerald-600 text-emerald-100 text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                  >
                    <Lock className="w-3 h-3" />
                    Admin Active
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2.5">
            <CleveraLogo 
              variant="horizontal" 
              size="md" 
              onClick={() => handleNav('home')} 
            />
            {isAdminLoggedIn && (
              <button
                onClick={onOpenLogoModal}
                className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-[#3430eb] bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full transition-all cursor-pointer shadow-2xs"
                title="Change Website Logo (Admin Privileges)"
              >
                <Palette className="w-3 h-3" />
                <span>Change Logo</span>
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 font-bold'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 tracking-tight">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNav('contact-booking')}
              className="inline-flex items-center gap-2 rounded-full bg-[#3430eb] hover:bg-[#2723cb] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 shadow-md hover:shadow-[#3430eb]/25 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-200" />
              <span>Book Workshop</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNav('contact-booking')}
              className="sm:hidden text-xs rounded-full bg-[#3430eb] text-white font-bold px-3.5 py-1.5 shadow-xs uppercase tracking-wider"
            >
              Book
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNav('contact-booking')}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md text-sm"
              >
                <Calendar className="w-4 h-4" />
                Book Corporate Training
              </button>

              {isAdminLoggedIn && onOpenLogoModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogoModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#3430eb] hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                >
                  <Palette className="w-4 h-4" />
                  <span>Change Website Logo (Admin)</span>
                </button>
              )}

              <div className={`grid ${isAdminLoggedIn ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mt-2`}>
                <a
                  href="tel:+60322828900"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call HQ: +60 3-2282 8900</span>
                </a>
                {isAdminLoggedIn && (
                  <button
                    onClick={() => handleNav('admin')}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold"
                  >
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Admin Console (Active)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
