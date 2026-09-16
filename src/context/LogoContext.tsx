import React, { createContext, useContext, useState, useEffect } from 'react';

export type LogoMode = 'official' | 'custom-image' | 'custom-vector';

export interface LogoConfig {
  mode: LogoMode;
  // Custom image settings
  customImageUrl?: string;
  customImageScale: number; // 50 to 150
  customImageDarkInvert: boolean;
  // Brand typography
  brandName: string;
  brandSub: string;
  // Vector emblem colors
  topPetalColor: string;
  leftPetalColor: string;
  bottomPetalColor: string;
  rightPetalColor: string;
  centerDotColor: string;
  starColor: string;
  hideEmblem: boolean;
  // Meta
  updatedAt?: string;
  updatedBy?: string;
}

export const DEFAULT_LOGO_CONFIG: LogoConfig = {
  mode: 'official',
  customImageUrl: '',
  customImageScale: 100,
  customImageDarkInvert: false,
  brandName: 'CLEVERA',
  brandSub: 'ACADEMY',
  topPetalColor: '#3B82F6',
  leftPetalColor: '#1D4ED8',
  bottomPetalColor: '#60A5FA',
  rightPetalColor: '#BFDBFE',
  centerDotColor: '#1D4ED8',
  starColor: '#FFFFFF',
  hideEmblem: false,
  updatedAt: new Date().toISOString(),
  updatedBy: 'Official Brand Asset',
};

interface LogoContextType {
  logoConfig: LogoConfig;
  updateLogoConfig: (updates: Partial<LogoConfig>) => void;
  saveLogoConfig: (newConfig: LogoConfig) => void;
  uploadCustomLogoImage: (file: File) => Promise<string>;
  resetToDefaultLogo: () => void;
  isLogoCustomized: boolean;
  isLogoModalOpen: boolean;
  setIsLogoModalOpen: (open: boolean) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clevera_admin_logo_config');
      if (saved) {
        try {
          return { ...DEFAULT_LOGO_CONFIG, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse saved logo configuration', e);
        }
      }
    }
    return DEFAULT_LOGO_CONFIG;
  });

  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);

  // Synchronize with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('clevera_admin_logo_config', JSON.stringify(logoConfig));
      } catch (e) {
        console.error('Failed to save logo config to localStorage', e);
      }
    }
  }, [logoConfig]);

  const updateLogoConfig = (updates: Partial<LogoConfig>) => {
    setLogoConfig((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: 'Admin (alifhakimi1704@gmail.com)',
    }));
  };

  const saveLogoConfig = (newConfig: LogoConfig) => {
    const finalConfig: LogoConfig = {
      ...newConfig,
      updatedAt: new Date().toISOString(),
      updatedBy: 'Admin (alifhakimi1704@gmail.com)',
    };
    setLogoConfig(finalConfig);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clevera_admin_logo_config', JSON.stringify(finalConfig));
    }
  };

  const uploadCustomLogoImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.match(/^image\/(png|jpeg|jpg|svg\+xml|webp|gif)$/i)) {
        reject(new Error('Please upload a valid image file (PNG, JPG, SVG, WebP)'));
        return;
      }
      // Check file size (max 4MB)
      if (file.size > 4 * 1024 * 1024) {
        reject(new Error('File size exceeds 4MB limit'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        updateLogoConfig({
          mode: 'custom-image',
          customImageUrl: base64,
        });
        resolve(base64);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const resetToDefaultLogo = () => {
    setLogoConfig(DEFAULT_LOGO_CONFIG);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('clevera_admin_logo_config');
    }
  };

  const isLogoCustomized = 
    logoConfig.mode !== 'official' ||
    logoConfig.brandName !== DEFAULT_LOGO_CONFIG.brandName ||
    logoConfig.brandSub !== DEFAULT_LOGO_CONFIG.brandSub ||
    logoConfig.topPetalColor !== DEFAULT_LOGO_CONFIG.topPetalColor ||
    logoConfig.leftPetalColor !== DEFAULT_LOGO_CONFIG.leftPetalColor ||
    logoConfig.bottomPetalColor !== DEFAULT_LOGO_CONFIG.bottomPetalColor ||
    logoConfig.rightPetalColor !== DEFAULT_LOGO_CONFIG.rightPetalColor ||
    Boolean(logoConfig.customImageUrl);

  return (
    <LogoContext.Provider
      value={{
        logoConfig,
        updateLogoConfig,
        saveLogoConfig,
        uploadCustomLogoImage,
        resetToDefaultLogo,
        isLogoCustomized,
        isLogoModalOpen,
        setIsLogoModalOpen,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogoConfig = (): LogoContextType => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogoConfig must be used within a LogoProvider');
  }
  return context;
};
