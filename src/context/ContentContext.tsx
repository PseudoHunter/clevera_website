import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TrainingModule, 
  Trainer, 
  Testimonial, 
  CalculatorConfig, 
  ContactConfig, 
  FooterConfig, 
  SiteAnnouncement,
  AdminContentSubTab,
  ClientLogo,
  TrustedByConfig,
  SectionVisibility
} from '../types';
import { 
  TRAINING_MODULES as INITIAL_MODULES, 
  TRAINERS as INITIAL_TRAINERS, 
  TESTIMONIALS as INITIAL_TESTIMONIALS,
  SITE_ANNOUNCEMENT as INITIAL_ANNOUNCEMENT
} from '../data/mockData';
import {
  DEFAULT_CLIENT_LOGOS,
  DEFAULT_TRUSTED_BY_CONFIG
} from '../data/clientLogosData';

export const DEFAULT_SECTION_VISIBILITY: SectionVisibility = {
  hero: true,
  trustedBy: true,
  splitEditorial: true,
  activityLineup: true,
  faculty: true,
  hrdcCalculator: false, // Default hidden per user request; admin can toggle on anytime
  testimonials: true,
  reachOut: true,
  announcementBar: true,
  stickyMobileCta: true,
  footer: true,
};

export const DEFAULT_CALCULATOR_CONFIG: CalculatorConfig = {
  badge: 'Interactive Malaysian HRDC Matrix',
  title: 'HRDC Grant & Levy ROI Calculator',
  subtitle: 'Calculate your available corporate levy balance and claim 100% of your training costs with zero out-of-pocket employer expense via SBL-Khas.',
  levyRatePercent: 1, // 1%
  minEmployeesForMandatoryLevy: 10,
  inHouseDailyFeeCap: 6000,
  inHouseMealAllowancePerPax: 50,
  retreatDailyCourseFeeCapPerPax: 1300,
  retreatMaxTotalCap: 40000,
  productivityMultiplierPercent: 22,
  productivityMultiplierMonths: 6,
  defaultEmployeeCount: 45,
  defaultAvgSalary: 3800,
  defaultTrainingDays: 2,
  defaultPaxToTrain: 25,
  upfrontCashDisplay: 'RM 0.00',
  sblKhasGuaranteeText: '100% Direct SBL-Khas',
};

export const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  sectionTitle: 'Reach out',
  sectionSubtitle: 'Corporate Inquiries & e-TRiS Grant Consultations',
  companyName: 'Clevera Academy Sdn Bhd',
  officeName: 'Malaysian Headquarters',
  addressLine1: 'Level 19, Boutique Office 1, Menara Bangsar KL Eco City',
  addressLine2: 'No. 3, Jalan Bangsar, Kampung Haji Abdullah Hukum',
  cityStateZip: '59200 Kuala Lumpur, Malaysia',
  primaryPhone: '+60 3-2282 8900',
  phoneLabel: 'Office / HQ',
  whatsappNumber: '+60 12-384 7291',
  whatsappLabel: 'WhatsApp Hot-Desk',
  whatsappUrl: 'https://wa.me/60123847291',
  primaryEmail: 'alif@cleveraacademy.my',
  secondaryEmail: 'inquiry@cleveraacademy.my',
  operatingHours: 'Mon – Fri: 8:30 AM – 6:00 PM (MYT)',
  accreditationText: 'HRD Corp Registered Training Provider • MyCoID: 1429810-W',
  slaNotice: 'Itemized proposal & course code dispatched within 2 hours.',
};

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  brandDescription: "Clevera Academy is Malaysia's premier HRDC-approved corporate training provider. We specialize in high-impact team building, retail leadership, and workforce productivity designed to eliminate department silos and elevate employee performance.",
  myCoIdText: 'HRD Corp Registered (MyCoID: 1429810-W)',
  grantClaimableText: '100% SBL-Khas Grant Claimable',
  catalogHeading: 'Download 2026 Corporate Training Catalog (PDF)',
  catalogButtonText: 'Get PDF',
  copyrightText: '© 2026 Clevera Academy Sdn Bhd. All Rights Reserved. Regulated under Pembangunan Sumber Manusia Berhad Act 2001.',
  pdpaNotice: 'All corporate participant inquiries are secured under Malaysian PDPA 2010 standards.',
};

interface ContentContextType {
  // 1. Modules
  modules: TrainingModule[];
  updateModule: (id: string, updated: Partial<TrainingModule>) => void;
  addModule: (module: TrainingModule) => void;
  deleteModule: (id: string) => void;
  resetModules: () => void;
  publishModulesToGoogleSheets: () => Promise<void>;

  // 2. Trainers
  trainers: Trainer[];
  updateTrainer: (id: string, updated: Partial<Trainer>) => void;
  addTrainer: (trainer: Trainer) => void;
  deleteTrainer: (id: string) => void;
  resetTrainers: () => void;

  // 3. Calculator
  calculatorConfig: CalculatorConfig;
  updateCalculatorConfig: (updated: Partial<CalculatorConfig>) => void;
  resetCalculatorConfig: () => void;

  // 4. Testimonials
  testimonials: Testimonial[];
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  resetTestimonials: () => void;

  // 5. Contact Us
  contactConfig: ContactConfig;
  updateContactConfig: (updated: Partial<ContactConfig>) => void;
  resetContactConfig: () => void;

  // 6. Footer
  footerConfig: FooterConfig;
  updateFooterConfig: (updated: Partial<FooterConfig>) => void;
  resetFooterConfig: () => void;

  // 7. Announcement
  announcement: SiteAnnouncement;
  updateAnnouncement: (announcement: SiteAnnouncement) => void;
  resetAnnouncement: () => void;

  // 8. Client Logos & Trusted By
  clientLogos: ClientLogo[];
  trustedByConfig: TrustedByConfig;
  updateClientLogo: (id: string, updated: Partial<ClientLogo>) => void;
  addClientLogo: (logo: ClientLogo) => void;
  deleteClientLogo: (id: string) => void;
  toggleClientLogo: (id: string) => void;
  updateTrustedByConfig: (updated: Partial<TrustedByConfig>) => void;
  resetClientLogos: () => void;
  resetTrustedByConfig: () => void;

  // 9. Section Visibility & Layout Control
  sectionVisibility: SectionVisibility;
  updateSectionVisibility: (updated: Partial<SectionVisibility>) => void;
  toggleSectionVisibility: (sectionKey: keyof SectionVisibility) => void;
  resetSectionVisibility: () => void;

  // Master Global Reset
  resetAllContent: () => void;

  // Quick navigation target for admin editor
  adminEditorTargetTab: AdminContentSubTab | null;
  setAdminEditorTargetTab: (tab: AdminContentSubTab | null) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Modules state
  const [modules, setModules] = useState<TrainingModule[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_modules_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse modules', e);
        }
      }
    }
    return INITIAL_MODULES;
  });

  // Trainers state
  const [trainers, setTrainers] = useState<Trainer[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_trainers_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse trainers', e);
        }
      }
    }
    return INITIAL_TRAINERS;
  });

  // Calculator state
  const [calculatorConfig, setCalculatorConfig] = useState<CalculatorConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_calculator_v2');
      if (saved) {
        try {
          return { ...DEFAULT_CALCULATOR_CONFIG, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse calculator config', e);
        }
      }
    }
    return DEFAULT_CALCULATOR_CONFIG;
  });

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_testimonials_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse testimonials', e);
        }
      }
    }
    return INITIAL_TESTIMONIALS;
  });

  // Contact config state
  const [contactConfig, setContactConfig] = useState<ContactConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_contact_v2');
      if (saved) {
        try {
          return { ...DEFAULT_CONTACT_CONFIG, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse contact config', e);
        }
      }
    }
    return DEFAULT_CONTACT_CONFIG;
  });

  // Footer config state
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_footer_v2');
      if (saved) {
        try {
          return { ...DEFAULT_FOOTER_CONFIG, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse footer config', e);
        }
      }
    }
    return DEFAULT_FOOTER_CONFIG;
  });

  // Site Announcement state
  const [announcement, setAnnouncement] = useState<SiteAnnouncement>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_site_announcement_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse announcement', e);
        }
      }
    }
    return INITIAL_ANNOUNCEMENT;
  });

  // Client Logos state
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_client_logos_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse client logos', e);
        }
      }
    }
    return DEFAULT_CLIENT_LOGOS;
  });

  // Trusted By Config state
  const [trustedByConfig, setTrustedByConfig] = useState<TrustedByConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_trusted_by_v2');
      if (saved) {
        try {
          return { ...DEFAULT_TRUSTED_BY_CONFIG, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse trusted by config', e);
        }
      }
    }
    return DEFAULT_TRUSTED_BY_CONFIG;
  });

  // Section Visibility state
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_section_visibility_v2');
      if (saved) {
        try {
          return { ...DEFAULT_SECTION_VISIBILITY, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse section visibility', e);
        }
      }
    }
    return DEFAULT_SECTION_VISIBILITY;
  });

  const [adminEditorTargetTab, setAdminEditorTargetTab] = useState<AdminContentSubTab | null>(null);

  const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL as string | undefined;

  // Load the published catalog for every visitor, while retaining local/default content offline.
  useEffect(() => {
    if (!googleSheetsUrl || googleSheetsUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') return;

    const controller = new AbortController();
    fetch(`${googleSheetsUrl}?sheet=Modules`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Modules request failed (${response.status})`);
        const payload: unknown = await response.json();
        const liveModules = Array.isArray(payload)
          ? payload
          : payload && typeof payload === 'object' && Array.isArray((payload as { modules?: unknown }).modules)
            ? (payload as { modules: unknown[] }).modules
            : null;
        if (liveModules && liveModules.length > 0) {
          setModules(liveModules as TrainingModule[]);
        }
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== 'AbortError') {
          console.warn('Using local module defaults because Google Sheets is unavailable.', error);
        }
      });

    return () => controller.abort();
  }, [googleSheetsUrl]);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_modules_v2', JSON.stringify(modules));
    }
  }, [modules]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_trainers_v2', JSON.stringify(trainers));
    }
  }, [trainers]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_calculator_v2', JSON.stringify(calculatorConfig));
    }
  }, [calculatorConfig]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_testimonials_v2', JSON.stringify(testimonials));
    }
  }, [testimonials]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_contact_v2', JSON.stringify(contactConfig));
    }
  }, [contactConfig]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_footer_v2', JSON.stringify(footerConfig));
    }
  }, [footerConfig]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_site_announcement_v2', JSON.stringify(announcement));
    }
  }, [announcement]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_client_logos_v2', JSON.stringify(clientLogos));
    }
  }, [clientLogos]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_trusted_by_v2', JSON.stringify(trustedByConfig));
    }
  }, [trustedByConfig]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_section_visibility_v2', JSON.stringify(sectionVisibility));
    }
  }, [sectionVisibility]);

  // 1. Modules CRUD
  const updateModule = (id: string, updated: Partial<TrainingModule>) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const addModule = (newModule: TrainingModule) => {
    setModules(prev => [newModule, ...prev]);
  };

  const deleteModule = (id: string) => {
    setModules(prev => prev.filter(m => m.id !== id));
  };

  const resetModules = () => {
    setModules(INITIAL_MODULES);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_modules_v2');
    }
  };

  const publishModulesToGoogleSheets = async () => {
    const secret = import.meta.env.VITE_GOOGLE_SHEETS_SECRET as string | undefined;
    if (!googleSheetsUrl || googleSheetsUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      throw new Error('Google Apps Script URL is not configured.');
    }
    if (!secret || secret === 'YOUR_GOOGLE_APPS_SCRIPT_SECRET') {
      throw new Error('Google Sheets secret is not configured.');
    }

    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ secret, sheet: 'Modules', action: 'updateModules', modules }),
    });
    if (!response.ok) throw new Error(`Publish failed (${response.status})`);
  };

  // 2. Trainers CRUD
  const updateTrainer = (id: string, updated: Partial<Trainer>) => {
    setTrainers(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const addTrainer = (newTrainer: Trainer) => {
    setTrainers(prev => [...prev, newTrainer]);
  };

  const deleteTrainer = (id: string) => {
    setTrainers(prev => prev.filter(t => t.id !== id));
  };

  const resetTrainers = () => {
    setTrainers(INITIAL_TRAINERS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_trainers_v2');
    }
  };

  // 3. Calculator config
  const updateCalculatorConfig = (updated: Partial<CalculatorConfig>) => {
    setCalculatorConfig(prev => ({ ...prev, ...updated }));
  };

  const resetCalculatorConfig = () => {
    setCalculatorConfig(DEFAULT_CALCULATOR_CONFIG);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_calculator_v2');
    }
  };

  // 4. Testimonials CRUD
  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const addTestimonial = (newTestimonial: Testimonial) => {
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const resetTestimonials = () => {
    setTestimonials(INITIAL_TESTIMONIALS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_testimonials_v2');
    }
  };

  // 5. Contact config
  const updateContactConfig = (updated: Partial<ContactConfig>) => {
    setContactConfig(prev => ({ ...prev, ...updated }));
  };

  const resetContactConfig = () => {
    setContactConfig(DEFAULT_CONTACT_CONFIG);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_contact_v2');
    }
  };

  // 6. Footer config
  const updateFooterConfig = (updated: Partial<FooterConfig>) => {
    setFooterConfig(prev => ({ ...prev, ...updated }));
  };

  const resetFooterConfig = () => {
    setFooterConfig(DEFAULT_FOOTER_CONFIG);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_footer_v2');
    }
  };

  // 7. Announcement
  const updateAnnouncement = (newAnnouncement: SiteAnnouncement) => {
    setAnnouncement(newAnnouncement);
  };

  const resetAnnouncement = () => {
    setAnnouncement(INITIAL_ANNOUNCEMENT);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_site_announcement_v2');
    }
  };

  // 8. Client Logos & Trusted By
  const updateClientLogo = (id: string, updated: Partial<ClientLogo>) => {
    setClientLogos(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const addClientLogo = (newLogo: ClientLogo) => {
    setClientLogos(prev => [newLogo, ...prev]);
  };

  const deleteClientLogo = (id: string) => {
    setClientLogos(prev => prev.filter(item => item.id !== id));
  };

  const toggleClientLogo = (id: string) => {
    setClientLogos(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  const resetClientLogos = () => {
    setClientLogos(DEFAULT_CLIENT_LOGOS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_client_logos_v2');
    }
  };

  const updateTrustedByConfig = (updated: Partial<TrustedByConfig>) => {
    setTrustedByConfig(prev => ({ ...prev, ...updated }));
  };

  const resetTrustedByConfig = () => {
    setTrustedByConfig(DEFAULT_TRUSTED_BY_CONFIG);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_trusted_by_v2');
    }
  };

  // 9. Section Visibility & Layout Control
  const updateSectionVisibility = (updated: Partial<SectionVisibility>) => {
    setSectionVisibility(prev => ({ ...prev, ...updated }));
  };

  const toggleSectionVisibility = (sectionKey: keyof SectionVisibility) => {
    setSectionVisibility(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const resetSectionVisibility = () => {
    setSectionVisibility(DEFAULT_SECTION_VISIBILITY);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_section_visibility_v2');
    }
  };

  // Master reset
  const resetAllContent = () => {
    resetModules();
    resetTrainers();
    resetCalculatorConfig();
    resetTestimonials();
    resetContactConfig();
    resetFooterConfig();
    resetAnnouncement();
    resetClientLogos();
    resetTrustedByConfig();
    resetSectionVisibility();
  };

  return (
    <ContentContext.Provider
      value={{
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
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
