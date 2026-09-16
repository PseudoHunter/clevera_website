import React from 'react';
import { useLogoConfig, DEFAULT_LOGO_CONFIG } from '../context/LogoContext';

interface CleveraLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  showAdminBadge?: boolean;
}

export const CleveraLogo: React.FC<CleveraLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  className = '',
  onClick,
  showAdminBadge = false,
}) => {
  // Gracefully retrieve context (falls back to default if outside provider)
  let logoConfig = DEFAULT_LOGO_CONFIG;
  try {
    const ctx = useLogoConfig();
    if (ctx && ctx.logoConfig) {
      logoConfig = ctx.logoConfig;
    }
  } catch {
    // Outside LogoProvider fallback
    logoConfig = DEFAULT_LOGO_CONFIG;
  }

  // Dimensions map
  const dimensions = {
    sm: { icon: 34, title: 'text-lg', sub: 'text-[9px]', gap: 'gap-2.5', space: 'space-y-0.5', imgH: 'h-7' },
    md: { icon: 46, title: 'text-xl', sub: 'text-[10.5px]', gap: 'gap-3', space: 'space-y-1', imgH: 'h-9' },
    lg: { icon: 60, title: 'text-2xl sm:text-3xl', sub: 'text-[12px] sm:text-[13px]', gap: 'gap-3.5', space: 'space-y-1.5', imgH: 'h-12' },
    xl: { icon: 96, title: 'text-4xl sm:text-5xl', sub: 'text-[16px] sm:text-[18px]', gap: 'gap-5', space: 'space-y-2', imgH: 'h-20' },
  }[size];

  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const subColor = theme === 'dark' ? 'text-slate-300' : 'text-black';

  // Vector Emblem: Uses reactive colors from logoConfig
  const Emblem = ({ sizePx }: { sizePx: number }) => (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="-50 -50 100 100"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      aria-label={`${logoConfig.brandName} Emblem`}
    >
      <g>
        {/* Top Circular Petal */}
        <circle 
          cx="0" 
          cy="-21" 
          r="21" 
          fill={logoConfig.topPetalColor || '#3B82F6'} 
          opacity="0.88" 
          style={{ mixBlendMode: 'multiply' }} 
        />
        
        {/* Left Circular Petal */}
        <circle 
          cx="-21" 
          cy="0" 
          r="21" 
          fill={logoConfig.leftPetalColor || '#1D4ED8'} 
          opacity="0.94" 
          style={{ mixBlendMode: 'multiply' }} 
        />
        
        {/* Right Circular Petal */}
        <circle 
          cx="21" 
          cy="0" 
          r="21" 
          fill={logoConfig.rightPetalColor || '#BFDBFE'} 
          opacity="0.82" 
          style={{ mixBlendMode: 'multiply' }} 
        />
        
        {/* Bottom Circular Petal */}
        <circle 
          cx="0" 
          cy="21" 
          r="21" 
          fill={logoConfig.bottomPetalColor || '#60A5FA'} 
          opacity="0.88" 
          style={{ mixBlendMode: 'multiply' }} 
        />

        {/* Central Negative Space 4-Pointed Star */}
        <path 
          d="M 0,-14 C 1.8,-3.8 3.8,-1.8 14,0 C 3.8,1.8 1.8,3.8 0,14 C -1.8,3.8 -3.8,1.8 -14,0 C -3.8,-1.8 -1.8,-3.8 0,-14 Z" 
          fill={logoConfig.starColor || '#FFFFFF'} 
        />

        {/* Central Core Node */}
        <circle 
          cx="0" 
          cy="0" 
          r="4.4" 
          fill={logoConfig.centerDotColor || '#1D4ED8'} 
        />
      </g>
    </svg>
  );

  // If custom uploaded image is active
  if (logoConfig.mode === 'custom-image' && logoConfig.customImageUrl) {
    const scaleStyle = {
      transform: `scale(${(logoConfig.customImageScale || 100) / 100})`,
      filter: (theme === 'dark' && logoConfig.customImageDarkInvert) ? 'brightness(0) invert(1)' : 'none',
    };

    if (variant === 'icon-only') {
      return (
        <div 
          className={`inline-flex items-center justify-center cursor-pointer ${className}`}
          onClick={onClick}
        >
          <img 
            src={logoConfig.customImageUrl} 
            alt={logoConfig.brandName}
            style={scaleStyle}
            className={`${dimensions.imgH} w-auto object-contain transition-transform`}
          />
        </div>
      );
    }

    if (variant === 'stacked') {
      return (
        <div
          className={`inline-flex flex-col items-center justify-center text-center cursor-pointer select-none ${className}`}
          onClick={onClick}
        >
          <img 
            src={logoConfig.customImageUrl} 
            alt={logoConfig.brandName}
            style={scaleStyle}
            className={`${dimensions.imgH} max-h-24 w-auto object-contain transition-transform`}
          />
          {logoConfig.brandName && (
            <div className={`mt-3 flex flex-col items-center ${dimensions.space}`}>
              <span 
                className={`font-black tracking-[-0.01em] leading-none ${dimensions.title} ${textColor} font-display uppercase`}
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                {logoConfig.brandName}
              </span>
              {logoConfig.brandSub && (
                <span 
                  className={`font-semibold tracking-[0.32em] leading-tight uppercase ${dimensions.sub} ${subColor}`}
                  style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
                >
                  {logoConfig.brandSub}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }

    // Default: Horizontal with custom image
    return (
      <div
        className={`inline-flex items-center ${dimensions.gap} cursor-pointer select-none ${className}`}
        onClick={onClick}
      >
        <img 
          src={logoConfig.customImageUrl} 
          alt={logoConfig.brandName}
          style={scaleStyle}
          className={`${dimensions.imgH} w-auto object-contain transition-transform`}
        />
        {/* Optional text alongside image if brandName exists */}
        {logoConfig.brandName && (
          <div className={`flex flex-col justify-center ${dimensions.space}`}>
            <span 
              className={`font-black tracking-[-0.01em] leading-none ${dimensions.title} ${textColor} font-display uppercase`}
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              {logoConfig.brandName}
            </span>
            {logoConfig.brandSub && (
              <span 
                className={`font-semibold tracking-[0.30em] uppercase leading-tight ${dimensions.sub} ${subColor}`}
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                {logoConfig.brandSub}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Official or Custom Vector layout
  if (variant === 'icon-only') {
    return (
      <div 
        id="clevera-logo-icon"
        className={`inline-flex items-center justify-center cursor-pointer ${className}`}
        onClick={onClick}
      >
        {!logoConfig.hideEmblem && <Emblem sizePx={dimensions.icon} />}
      </div>
    );
  }

  // Exact reproduction of the Business Card stacked layout
  if (variant === 'stacked') {
    return (
      <div
        id="clevera-logo-stacked"
        className={`inline-flex flex-col items-center justify-center text-center cursor-pointer select-none ${className}`}
        onClick={onClick}
      >
        {!logoConfig.hideEmblem && <Emblem sizePx={dimensions.icon * 1.35} />}
        <div className={`mt-4 flex flex-col items-center ${dimensions.space}`}>
          <span 
            className={`font-black tracking-[-0.01em] leading-none ${dimensions.title} ${textColor} font-display uppercase`}
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {logoConfig.brandName}
          </span>
          <span 
            className={`font-semibold tracking-[0.32em] leading-tight uppercase ${dimensions.sub} ${subColor}`}
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            {logoConfig.brandSub}
          </span>
        </div>
      </div>
    );
  }

  // Horizontal layout (Emblem left, CLEVERA ACADEMY right)
  return (
    <div
      id="clevera-logo-horizontal"
      className={`inline-flex items-center ${dimensions.gap} cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      {!logoConfig.hideEmblem && <Emblem sizePx={dimensions.icon} />}
      <div className={`flex flex-col justify-center ${dimensions.space}`}>
        <span 
          className={`font-black tracking-[-0.01em] leading-none ${dimensions.title} ${textColor} font-display uppercase`}
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {logoConfig.brandName}
        </span>
        <span 
          className={`font-semibold tracking-[0.30em] uppercase leading-tight ${dimensions.sub} ${subColor}`}
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
        >
          {logoConfig.brandSub}
        </span>
      </div>
    </div>
  );
};
