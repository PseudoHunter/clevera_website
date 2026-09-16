import React, { useState, useEffect } from 'react';
import { PageRoute, TrainingModule, CorporateInquiry, LeadStatus, SiteAnnouncement } from './types';
import { INITIAL_LEADS, SITE_ANNOUNCEMENT } from './data/mockData';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { CookieBanner } from './components/CookieBanner';
import { SyllabusModal } from './components/SyllabusModal';
import { EligibilityCheckerModal } from './components/EligibilityCheckerModal';
import { MetaTagsModal } from './components/MetaTagsModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ModulesPage } from './pages/ModulesPage';
import { HrdcGuidePage } from './pages/HrdcGuidePage';
import { GalleryAboutPage } from './pages/GalleryAboutPage';
import { ContactBookingPage } from './pages/ContactBookingPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LegalPages } from './pages/LegalPages';
import { LogoProvider } from './context/LogoContext';
import { AdminLogoModal } from './components/AdminLogoModal';

// Route extraction supporting direct URL path /admin and hash fallbacks
const getRouteFromUrl = (): PageRoute => {
  if (typeof window === 'undefined') return 'home';
  const validRoutes: PageRoute[] = ['home', 'modules', 'hrdc-guide', 'gallery-about', 'contact-booking', 'admin', 'thank-you', 'privacy', 'terms'];
  
  // 1. Check pathname directly (e.g. /admin or /modules)
  const pathPart = window.location.pathname.replace(/^\/+/, '').split('/')[0].toLowerCase() as PageRoute;
  if (validRoutes.includes(pathPart)) {
    return pathPart;
  }

  // 2. Check hash fallback (e.g. #/admin or #admin)
  if (window.location.hash) {
    const hashPart = window.location.hash.replace(/^#\/?/, '').split('?')[0].toLowerCase() as PageRoute;
    if (validRoutes.includes(hashPart)) {
      return hashPart;
    }
  }

  return 'home';
};

export default function App() {
  // 1. Navigation State
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getRouteFromUrl);

  // 2. Backend Admin Authentication State
  const [adminToken, setAdminToken] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('clevera_admin_token') || '';
    }
    return '';
  });

  const [adminUser, setAdminUser] = useState<{ username: string; role: string } | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Verify backend session token on initial mount
  useEffect(() => {
    const token = localStorage.getItem('clevera_admin_token');
    if (!token) {
      setIsAdminLoggedIn(false);
      return;
    }

    fetch('/api/admin/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid && data.user) {
          setIsAdminLoggedIn(true);
          setAdminUser(data.user);
          setAdminToken(token);
        } else {
          localStorage.removeItem('clevera_admin_token');
          setIsAdminLoggedIn(false);
          setAdminToken('');
          setAdminUser(null);
        }
      })
      .catch((err) => {
        console.warn('Backend admin session check deferred:', err);
      });
  }, []);

  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);

  // 3. Leads CRM Persistence
  const [leads, setLeads] = useState<CorporateInquiry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_corporate_leads');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved leads', e);
        }
      }
    }
    return INITIAL_LEADS;
  });

  // 4. Site Announcement Persistence
  const [announcement, setAnnouncement] = useState<SiteAnnouncement>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_site_announcement');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse announcement', e);
        }
      }
    }
    return SITE_ANNOUNCEMENT;
  });

  // 5. Modals State
  const [selectedSyllabus, setSelectedSyllabus] = useState<TrainingModule | null>(null);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isMetaInspectorOpen, setIsMetaInspectorOpen] = useState(false);

  // Sync route changes with window pathname/hash and scroll to top
  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      const newPath = route === 'home' ? '/' : `/${route}`;
      window.history.pushState({ route }, '', newPath);
      window.location.hash = `#/${route}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync browser back/forward buttons (both popstate and hashchange)
  useEffect(() => {
    const handleUrlChange = () => {
      const route = getRouteFromUrl();
      setCurrentRoute(route);
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Update document title dynamically based on active route
  useEffect(() => {
    const titleMap: Record<PageRoute, string> = {
      home: 'Clevera Academy | HRDC Claimable Corporate Training & Team Building Malaysia',
      modules: 'Training Modules Catalog | Retail & Corporate Masterclasses | Clevera Academy',
      'hrdc-guide': 'HRDC SBL-Khas Employer Claiming Guide | Clevera Academy',
      'gallery-about': 'About Us & Corporate Training Gallery | Clevera Academy',
      'contact-booking': 'Book Corporate Training & Request e-TRiS Quotation | Clevera Academy',
      admin: 'Staff CRM Portal & Lead Management | Clevera Academy',
      'thank-you': 'Inquiry Received | Clevera Academy Malaysia',
      privacy: 'PDPA Privacy Policy | Clevera Academy Malaysia',
      terms: 'Terms of Service | Clevera Academy Malaysia',
      '404': 'Page Not Found | Clevera Academy Malaysia',
    };
    document.title = titleMap[currentRoute] || titleMap.home;
  }, [currentRoute]);

  // Lead Submission Handler
  const handleLeadSubmitted = (newLead: CorporateInquiry) => {
    const updated = [newLead, ...leads];
    setLeads(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_corporate_leads', JSON.stringify(updated));
    }
  };

  // Update Lead Status
  const handleUpdateLeadStatus = (id: string, status: LeadStatus) => {
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    setLeads(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_corporate_leads', JSON.stringify(updated));
    }
  };

  // Assign Sales Rep
  const handleAssignLeadRep = (id: string, assignedRep: string) => {
    const updated = leads.map(l => l.id === id ? { ...l, assignedRep } : l);
    setLeads(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_corporate_leads', JSON.stringify(updated));
    }
  };

  // Admin Backend Auth Handlers
  const handleAdminLogin = (token: string, user: { username: string; role: string }) => {
    setIsAdminLoggedIn(true);
    setAdminToken(token);
    setAdminUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_admin_token', token);
      localStorage.removeItem('clevera_admin_auth');
    }
  };

  const handleAdminLogout = async () => {
    const token = adminToken || (typeof window !== 'undefined' ? localStorage.getItem('clevera_admin_token') : null);
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        // ignore logout network errors
      }
    }
    setIsAdminLoggedIn(false);
    setAdminToken('');
    setAdminUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_admin_token');
      localStorage.removeItem('clevera_admin_auth');
    }
    handleNavigate('home');
  };

  // Content Announcement Updater
  const handleUpdateAnnouncement = (newAnnouncement: SiteAnnouncement) => {
    setAnnouncement(newAnnouncement);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_site_announcement', JSON.stringify(newAnnouncement));
    }
  };

  // Render Page Content
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenSyllabus={(module) => setSelectedSyllabus(module)}
            onOpenEligibility={() => setIsEligibilityOpen(true)}
          />
        );
      case 'modules':
        return (
          <ModulesPage
            onNavigate={handleNavigate}
            onOpenSyllabus={(module) => setSelectedSyllabus(module)}
          />
        );
      case 'hrdc-guide':
        return (
          <HrdcGuidePage
            onNavigate={handleNavigate}
            onOpenEligibility={() => setIsEligibilityOpen(true)}
          />
        );
      case 'gallery-about':
        return (
          <GalleryAboutPage
            onNavigate={handleNavigate}
          />
        );
      case 'contact-booking':
        return (
          <ContactBookingPage
            onNavigate={handleNavigate}
            preSelectedModule={selectedSyllabus}
            onLeadSubmitted={handleLeadSubmitted}
          />
        );
      case 'admin':
        return (
          <AdminDashboardPage
            onNavigate={handleNavigate}
            isAdminLoggedIn={isAdminLoggedIn}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            adminUser={adminUser}
            leads={leads}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onAssignLeadRep={handleAssignLeadRep}
            announcement={announcement}
            onUpdateAnnouncement={handleUpdateAnnouncement}
            onOpenLogoModal={() => setIsLogoModalOpen(true)}
            onOpenMetaInspector={() => setIsMetaInspectorOpen(true)}
          />
        );
      case 'thank-you':
        return <ThankYouPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <LegalPages type="privacy" onNavigate={handleNavigate} />;
      case 'terms':
        return <LegalPages type="terms" onNavigate={handleNavigate} />;
      case '404':
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <LogoProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#3430eb] selection:text-white">
        
        {/* 1. Top Site-wide Announcement Bar */}
        {announcement.active && (
          <div className="bg-slate-950 text-white text-xs py-2 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2 flex-wrap">
            <span className="bg-[#3430eb] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {announcement.badge}
            </span>
            <span className="text-slate-300 font-medium">
              {announcement.message}
            </span>
            <button
              onClick={() => handleNavigate('contact-booking')}
              className="text-blue-400 hover:text-blue-300 font-bold underline decoration-blue-500/50 underline-offset-2 ml-1"
            >
              Apply on e-TRiS &rarr;
            </button>
          </div>
        )}

        {/* 2. Responsive Header & Navigation */}
        <Navbar
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenMetaInspector={() => setIsMetaInspectorOpen(true)}
          onOpenLogoModal={() => setIsLogoModalOpen(true)}
        />

        {/* 3. Main Page Body */}
        <main className="flex-1">
          {renderCurrentPage()}
        </main>

        {/* 4. Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
          onOpenMetaInspector={() => setIsMetaInspectorOpen(true)}
        />

        {/* 5. Sticky Mobile CTA Bar */}
        <StickyMobileCTA
          onNavigate={handleNavigate}
          onOpenEligibility={() => setIsEligibilityOpen(true)}
        />

        {/* 6. Cookie Consent Banner (Malaysian PDPA) */}
        <CookieBanner />

        {/* 7. Detailed Syllabus Modal */}
        <SyllabusModal
          module={selectedSyllabus}
          onClose={() => setSelectedSyllabus(null)}
          onNavigate={handleNavigate}
          onBookModule={(mod) => {
            setSelectedSyllabus(mod);
            handleNavigate('contact-booking');
          }}
        />

        {/* 8. HRDC Employer Eligibility Checker Modal */}
        <EligibilityCheckerModal
          isOpen={isEligibilityOpen}
          onClose={() => setIsEligibilityOpen(false)}
          onNavigate={handleNavigate}
        />

        {/* 9. SEO & Meta Tags Inspector Modal */}
        <MetaTagsModal
          isOpen={isMetaInspectorOpen}
          onClose={() => setIsMetaInspectorOpen(false)}
          currentRoute={currentRoute}
        />

        {/* 10. Admin Website Logo Customizer Modal */}
        <AdminLogoModal
          isOpen={isLogoModalOpen}
          onClose={() => setIsLogoModalOpen(false)}
          adminEmail={adminUser?.username || 'cleveraadminhebat'}
        />

      </div>
    </LogoProvider>
  );
}
