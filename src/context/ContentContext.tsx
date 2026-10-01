import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  SectionVisibility,
  HeroConfig,
  EditorialConfig,
  SiteContentPayload
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
import {
  DEFAULT_SECTION_VISIBILITY,
  DEFAULT_CALCULATOR_CONFIG,
  DEFAULT_CONTACT_CONFIG,
  DEFAULT_FOOTER_CONFIG,
  DEFAULT_HERO_CONFIG,
  DEFAULT_EDITORIAL_CONFIG
} from '../data/siteContentDefaults';
import { 
  fetchLiveModulesFromGoogleSheets, 
  publishModulesToGoogleSheetsApi 
} from '../services/googleSheetsService';
import {
  fetchLiveSiteContent,
  publishSiteContentToServer,
  updateSectionOnServer,
  resetSectionOnServer
} from '../services/siteContentService';

export {
  DEFAULT_SECTION_VISIBILITY,
  DEFAULT_CALCULATOR_CONFIG,
  DEFAULT_CONTACT_CONFIG,
  DEFAULT_FOOTER_CONFIG,
  DEFAULT_HERO_CONFIG,
  DEFAULT_EDITORIAL_CONFIG
};

interface ContentContextType {
  // 0. Hero Section
  heroConfig: HeroConfig;
  updateHeroConfig: (updated: Partial<HeroConfig>) => void;
  resetHeroConfig: () => void;

  // 0.5. Editorial Section ("Gearing Up For The Future")
  editorialConfig: EditorialConfig;
  updateEditorialConfig: (updated: Partial<EditorialConfig>) => void;
  resetEditorialConfig: () => void;

  // 1. Modules
  modules: TrainingModule[];
  updateModule: (id: string, updated: Partial<TrainingModule>) => void;
  addModule: (module: TrainingModule) => void;
  deleteModule: (id: string) => void;
  resetModules: () => void;

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

  // Multi-Server Live Persistence & Sync
  isServerSyncing: boolean;
  isPublishingToServer: boolean;
  lastServerSyncTime: string | null;
  publishAllToServer: () => Promise<{ success: boolean; message: string }>;
  refreshFromServer: () => Promise<boolean>;

  // Google Sheets Live Sync
  isSheetsLoading: boolean;
  isPublishingToSheets: boolean;
  lastSheetsSyncTime: string | null;
  publishModulesToSheets: () => Promise<{ success: boolean; message: string }>;
  refreshModulesFromSheets: () => Promise<boolean>;

  // Quick navigation target for admin editor
  adminEditorTargetTab: AdminContentSubTab | null;
  setAdminEditorTargetTab: (tab: AdminContentSubTab | null) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. Hero state
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_hero_v1');
      if (saved) {
        try {
          return { ...DEFAULT_HERO_CONFIG, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse hero config', e);
        }
      }
    }
    return DEFAULT_HERO_CONFIG;
  });

  // 0.5. Editorial state
  const [editorialConfig, setEditorialConfig] = useState<EditorialConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_editorial_v1');
      if (saved) {
        try {
          return { ...DEFAULT_EDITORIAL_CONFIG, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse editorial config', e);
        }
      }
    }
    return DEFAULT_EDITORIAL_CONFIG;
  });

  // 1. Modules state
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

  // 2. Trainers state
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

  // 3. Calculator state
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

  // 4. Testimonials state
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

  // 5. Contact config state
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

  // 6. Footer config state
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

  // 7. Site Announcement state
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

  // 8. Client Logos state
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

  // 8.5. Trusted By Config state
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

  // 9. Section Visibility state
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

  // Multi-Server Live Persistence State
  const [isServerSyncing, setIsServerSyncing] = useState<boolean>(false);
  const [isPublishingToServer, setIsPublishingToServer] = useState<boolean>(false);
  const [lastServerSyncTime, setLastServerSyncTime] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('clevera_server_last_sync');
    }
    return null;
  });

  // Google Sheets Live Integration State
  const [isSheetsLoading, setIsSheetsLoading] = useState<boolean>(false);
  const [isPublishingToSheets, setIsPublishingToSheets] = useState<boolean>(false);
  const [lastSheetsSyncTime, setLastSheetsSyncTime] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('clevera_sheets_last_sync');
    }
    return null;
  });

  // Tracks the last applied server timestamp to avoid redundant updates
  const lastServerTimestampRef = useRef<string | null>(null);

  // Synchronize state with persistent backend server (/api/content)
  const applyServerContent = useCallback((data: SiteContentPayload) => {
    if (data.heroConfig) setHeroConfig(prev => ({ ...prev, ...data.heroConfig }));
    if (data.editorialConfig) setEditorialConfig(prev => ({ ...prev, ...data.editorialConfig }));
    if (data.modules && Array.isArray(data.modules) && data.modules.length > 0) setModules(data.modules);
    if (data.trainers && Array.isArray(data.trainers) && data.trainers.length > 0) setTrainers(data.trainers);
    if (data.calculatorConfig) setCalculatorConfig(prev => ({ ...prev, ...data.calculatorConfig }));
    if (data.testimonials && Array.isArray(data.testimonials) && data.testimonials.length > 0) setTestimonials(data.testimonials);
    if (data.contactConfig) setContactConfig(prev => ({ ...prev, ...data.contactConfig }));
    if (data.footerConfig) setFooterConfig(prev => ({ ...prev, ...data.footerConfig }));
    if (data.announcement) setAnnouncement(prev => ({ ...prev, ...data.announcement }));
    if (data.clientLogos && Array.isArray(data.clientLogos) && data.clientLogos.length > 0) setClientLogos(data.clientLogos);
    if (data.trustedByConfig) setTrustedByConfig(prev => ({ ...prev, ...data.trustedByConfig }));
    if (data.sectionVisibility) setSectionVisibility(prev => ({ ...prev, ...data.sectionVisibility }));

    // Notify LogoContext if custom logo exists
    if (data.logoConfig && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('clevera:logo-sync', { detail: data.logoConfig }));
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastServerSyncTime(now);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_server_last_sync', now);
    }
  }, []);

  // Fetch live site content from server disk
  const refreshFromServer = useCallback(async (): Promise<boolean> => {
    setIsServerSyncing(true);
    try {
      const data = await fetchLiveSiteContent();
      if (data) {
        applyServerContent(data);
        if (data.lastUpdated) {
          lastServerTimestampRef.current = data.lastUpdated;
        }
        return true;
      }
    } catch (err) {
      console.warn('[ContentContext] Server sync fallback to local cache:', err);
    } finally {
      setIsServerSyncing(false);
    }
    return false;
  }, [applyServerContent]);

  // Publish all current site content to the server disk
  const publishAllToServer = async (): Promise<{ success: boolean; message: string }> => {
    setIsPublishingToServer(true);
    try {
      const payload: SiteContentPayload = {
        heroConfig,
        editorialConfig,
        modules,
        trainers,
        calculatorConfig,
        testimonials,
        contactConfig,
        footerConfig,
        announcement,
        clientLogos,
        trustedByConfig,
        sectionVisibility,
      };

      const result = await publishSiteContentToServer(payload);
      if (result.success) {
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastServerSyncTime(now);
        if (typeof window !== 'undefined') {
          localStorage.setItem('clevera_server_last_sync', now);
        }
      }
      return result;
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Failed to publish content to live server'
      };
    } finally {
      setIsPublishingToServer(false);
    }
  };

  // Google Sheets Live Integration
  const refreshModulesFromSheets = async (): Promise<boolean> => {
    setIsSheetsLoading(true);
    try {
      const liveModules = await fetchLiveModulesFromGoogleSheets();
      if (liveModules && Array.isArray(liveModules) && liveModules.length > 0) {
        setModules(liveModules);
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSheetsSyncTime(now);
        if (typeof window !== 'undefined') {
          localStorage.setItem('clevera_sheets_last_sync', now);
          localStorage.setItem('clevera_modules_v2', JSON.stringify(liveModules));
        }
        // Also persist updated modules to server disk so all servers stay unified
        updateSectionOnServer('modules', liveModules);
        return true;
      }
    } catch (err) {
      console.warn('[ContentContext] Live Google Sheets sync fallback to local cache:', err);
    } finally {
      setIsSheetsLoading(false);
    }
    return false;
  };

  const publishModulesToSheets = async (): Promise<{ success: boolean; message: string }> => {
    setIsPublishingToSheets(true);
    try {
      const result = await publishModulesToGoogleSheetsApi(modules);
      if (result.success) {
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSheetsSyncTime(now);
        if (typeof window !== 'undefined') {
          localStorage.setItem('clevera_sheets_last_sync', now);
        }
        // Also ensure server disk is updated
        updateSectionOnServer('modules', modules);
      }
      return result;
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Failed to publish modules to Google Sheets'
      };
    } finally {
      setIsPublishingToSheets(false);
    }
  };

  // Initial mount: Fetch live content from server & modules from Google Sheets
  useEffect(() => {
    refreshFromServer();
    refreshModulesFromSheets();
  }, [refreshFromServer]);

  // Periodic polling & Tab Focus Sync:
  // When another server/visitor opens or revisits the page, pull updates seamlessly.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshFromServer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    // Heartbeat every 20 seconds to synchronize updates across all clients and servers
    const interval = setInterval(() => {
      refreshFromServer();
    }, 20000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [refreshFromServer]);

  // Sync state to local storage as client-side backup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_hero_v1', JSON.stringify(heroConfig));
    }
  }, [heroConfig]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_editorial_v1', JSON.stringify(editorialConfig));
    }
  }, [editorialConfig]);

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

  // 0. Hero CRUD
  const updateHeroConfig = (updated: Partial<HeroConfig>) => {
    setHeroConfig(prev => {
      const next = { ...prev, ...updated };
      updateSectionOnServer('heroConfig', next);
      return next;
    });
  };

  const resetHeroConfig = () => {
    setHeroConfig(DEFAULT_HERO_CONFIG);
    resetSectionOnServer('heroConfig');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_hero_v1');
    }
  };

  // 0.5. Editorial CRUD
  const updateEditorialConfig = (updated: Partial<EditorialConfig>) => {
    setEditorialConfig(prev => {
      const next = { ...prev, ...updated };
      updateSectionOnServer('editorialConfig', next);
      return next;
    });
  };

  const resetEditorialConfig = () => {
    setEditorialConfig(DEFAULT_EDITORIAL_CONFIG);
    resetSectionOnServer('editorialConfig');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_editorial_v1');
    }
  };

  // 1. Modules CRUD
  const updateModule = (id: string, updated: Partial<TrainingModule>) => {
    setModules(prev => {
      const next = prev.map(m => m.id === id ? { ...m, ...updated } : m);
      updateSectionOnServer('modules', next);
      return next;
    });
  };

  const addModule = (newModule: TrainingModule) => {
    setModules(prev => {
      const next = [newModule, ...prev];
      updateSectionOnServer('modules', next);
      return next;
    });
  };

  const deleteModule = (id: string) => {
    setModules(prev => {
      const next = prev.filter(m => m.id !== id);
      updateSectionOnServer('modules', next);
      return next;
    });
  };

  const resetModules = () => {
    setModules(INITIAL_MODULES);
    resetSectionOnServer('modules');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_modules_v2');
    }
  };

  // 2. Trainers CRUD
  const updateTrainer = (id: string, updated: Partial<Trainer>) => {
    setTrainers(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...updated } : t);
      updateSectionOnServer('trainers', next);
      return next;
    });
  };

  const addTrainer = (newTrainer: Trainer) => {
    setTrainers(prev => {
      const next = [...prev, newTrainer];
      updateSectionOnServer('trainers', next);
      return next;
    });
  };

  const deleteTrainer = (id: string) => {
    setTrainers(prev => {
      const next = prev.filter(t => t.id !== id);
      updateSectionOnServer('trainers', next);
      return next;
    });
  };

  const resetTrainers = () => {
    setTrainers(INITIAL_TRAINERS);
    resetSectionOnServer('trainers');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_trainers_v2');
    }
  };

  // 3. Calculator config
  const updateCalculatorConfig = (updated: Partial<CalculatorConfig>) => {
    setCalculatorConfig(prev => {
      const next = { ...prev, ...updated };
      updateSectionOnServer('calculatorConfig', next);
      return next;
    });
  };

  const resetCalculatorConfig = () => {
    setCalculatorConfig(DEFAULT_CALCULATOR_CONFIG);
    resetSectionOnServer('calculatorConfig');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_calculator_v2');
    }
  };

  // 4. Testimonials CRUD
  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...updated } : t);
      updateSectionOnServer('testimonials', next);
      return next;
    });
  };

  const addTestimonial = (newTestimonial: Testimonial) => {
    setTestimonials(prev => {
      const next = [newTestimonial, ...prev];
      updateSectionOnServer('testimonials', next);
      return next;
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => {
      const next = prev.filter(t => t.id !== id);
      updateSectionOnServer('testimonials', next);
      return next;
    });
  };

  const resetTestimonials = () => {
    setTestimonials(INITIAL_TESTIMONIALS);
    resetSectionOnServer('testimonials');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_testimonials_v2');
    }
  };

  // 5. Contact config
  const updateContactConfig = (updated: Partial<ContactConfig>) => {
    setContactConfig(prev => {
      const next = { ...prev, ...updated };
      updateSectionOnServer('contactConfig', next);
      return next;
    });
  };

  const resetContactConfig = () => {
    setContactConfig(DEFAULT_CONTACT_CONFIG);
    resetSectionOnServer('contactConfig');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_contact_v2');
    }
  };

  // 6. Footer config
  const updateFooterConfig = (updated: Partial<FooterConfig>) => {
    setFooterConfig(prev => {
      const next = { ...prev, ...updated };
      updateSectionOnServer('footerConfig', next);
      return next;
    });
  };

  const resetFooterConfig = () => {
    setFooterConfig(DEFAULT_FOOTER_CONFIG);
    resetSectionOnServer('footerConfig');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_footer_v2');
    }
  };

  // 7. Announcement
  const updateAnnouncement = (newAnnouncement: SiteAnnouncement) => {
    setAnnouncement(newAnnouncement);
    updateSectionOnServer('announcement', newAnnouncement);
  };

  const resetAnnouncement = () => {
    setAnnouncement(INITIAL_ANNOUNCEMENT);
    resetSectionOnServer('announcement');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_site_announcement_v2');
    }
  };

  // 8. Client Logos & Trusted By
  const updateClientLogo = (id: string, updated: Partial<ClientLogo>) => {
    setClientLogos(prev => {
      const next = prev.map(item => item.id === id ? { ...item, ...updated } : item);
      updateSectionOnServer('clientLogos', next);
      return next;
    });
  };

  const addClientLogo = (newLogo: ClientLogo) => {
    setClientLogos(prev => {
      const next = [newLogo, ...prev];
      updateSectionOnServer('clientLogos', next);
      return next;
    });
  };

  const deleteClientLogo = (id: string) => {
    setClientLogos(prev => {
      const next = prev.filter(item => item.id !== id);
      updateSectionOnServer('clientLogos', next);
      return next;
    });
  };

  const toggleClientLogo = (id: string) => {
    setClientLogos(prev => {
      const next = prev.map(item => item.id === id ? { ...item, active: !item.active } : item);
      updateSectionOnServer('clientLogos', next);
      return next;
    });
  };

  const resetClientLogos = () => {
    setClientLogos(DEFAULT_CLIENT_LOGOS);
    resetSectionOnServer('clientLogos');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_client_logos_v2');
    }
  };

  const updateTrustedByConfig = (updated: Partial<TrustedByConfig>) => {
    setTrustedByConfig(prev => {
      const next = { ...prev, ...updated };
      updateSectionOnServer('trustedByConfig', next);
      return next;
    });
  };

  const resetTrustedByConfig = () => {
    setTrustedByConfig(DEFAULT_TRUSTED_BY_CONFIG);
    resetSectionOnServer('trustedByConfig');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_trusted_by_v2');
    }
  };

  // 9. Section Visibility & Layout Control
  const updateSectionVisibility = (updated: Partial<SectionVisibility>) => {
    setSectionVisibility(prev => {
      const next = { ...prev, ...updated };
      updateSectionOnServer('sectionVisibility', next);
      return next;
    });
  };

  const toggleSectionVisibility = (sectionKey: keyof SectionVisibility) => {
    setSectionVisibility(prev => {
      const next = { ...prev, [sectionKey]: !prev[sectionKey] };
      updateSectionOnServer('sectionVisibility', next);
      return next;
    });
  };

  const resetSectionVisibility = () => {
    setSectionVisibility(DEFAULT_SECTION_VISIBILITY);
    resetSectionOnServer('sectionVisibility');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_section_visibility_v2');
    }
  };

  // Master reset
  const resetAllContent = async () => {
    resetHeroConfig();
    resetEditorialConfig();
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
    await resetSectionOnServer('all');
  };

  return (
    <ContentContext.Provider
      value={{
        heroConfig,
        updateHeroConfig,
        resetHeroConfig,

        editorialConfig,
        updateEditorialConfig,
        resetEditorialConfig,

        modules,
        updateModule,
        addModule,
        deleteModule,
        resetModules,

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

        isServerSyncing,
        isPublishingToServer,
        lastServerSyncTime,
        publishAllToServer,
        refreshFromServer,

        isSheetsLoading,
        isPublishingToSheets,
        lastSheetsSyncTime,
        publishModulesToSheets,
        refreshModulesFromSheets,

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
