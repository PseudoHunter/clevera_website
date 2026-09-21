import { ClientLogo, TrustedByConfig } from '../types';

/**
 * Generates an ultra-crisp, self-contained SVG placeholder data URL for corporate client logos.
 * Perfect for responsive retina displays and offline reliability.
 */
export function generateLogoPlaceholder(
  companyName: string,
  monogram: string,
  accentColor: string = '#3430eb',
  sublabel: string = 'MALAYSIA'
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 70" width="260" height="70">
    <defs>
      <linearGradient id="grad-${monogram.toLowerCase()}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="260" height="70" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.2"/>
    <g transform="translate(18, 14)">
      <!-- Geometric Corporate Logo Emblem -->
      <rect width="42" height="42" rx="8" fill="url(#grad-${monogram.toLowerCase()})"/>
      <text x="21" y="27" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="14" text-anchor="middle" letter-spacing="1">${monogram}</text>
    </g>
    <!-- Brand Typography -->
    <g transform="translate(72, 28)">
      <text x="0" y="7" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="16" letter-spacing="0.5">${companyName}</text>
      <text x="0" y="22" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="9" letter-spacing="2">${sublabel}</text>
    </g>
    <!-- Verified Enterprise Dot -->
    <circle cx="238" cy="22" r="3.5" fill="${accentColor}"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_TRUSTED_BY_CONFIG: TrustedByConfig = {
  sectionTitle: 'Trusted by Malaysia’s Leading Enterprises',
  sectionBadge: 'ENTERPRISE SOCIAL PROOF',
  description: 'Over 250+ top multinational corporations, GLCs, and high-growth retail brands partner with Clevera Academy for HRD Corp-claimable workforce transformation.',
  autoScroll: true,
  scrollSpeed: 'normal',
  showCategoryFilter: true,
  layoutVariant: 'marquee'
};

export const DEFAULT_CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'logo-maybank',
    name: 'Maybank Berhad',
    category: 'Banking & Financial',
    industry: 'Banking & Wealth Management',
    statsOrHighlight: '620+ Branch Leaders Upskilled',
    logoUrl: generateLogoPlaceholder('Maybank', 'MB', '#eab308', 'MALAYAN BANKING'),
    featured: true,
    order: 1,
    active: true,
  },
  {
    id: 'logo-petronas',
    name: 'Petronas Dagangan',
    category: 'Energy & Utilities',
    industry: 'Energy & Downstream Retail',
    statsOrHighlight: 'HSE & Supervisory Excellence',
    logoUrl: generateLogoPlaceholder('Petronas', 'PDB', '#06b6d4', 'ENERGY & RETAIL'),
    featured: true,
    order: 2,
    active: true,
  },
  {
    id: 'logo-maxis',
    name: 'Maxis Communications',
    category: 'Technology & Telco',
    industry: 'Telecommunications & 5G',
    statsOrHighlight: 'Enterprise Agile & CX Mastery',
    logoUrl: generateLogoPlaceholder('Maxis', 'MX', '#10b981', 'TELECOMMUNICATIONS'),
    featured: true,
    order: 3,
    active: true,
  },
  {
    id: 'logo-sunway',
    name: 'Sunway Group',
    category: 'Conglomerate & Property',
    industry: 'Property, Leisure & Healthcare',
    statsOrHighlight: 'Cross-Silo Executive Retreat',
    logoUrl: generateLogoPlaceholder('Sunway Group', 'SW', '#ef4444', 'CONGLOMERATE'),
    featured: true,
    order: 4,
    active: true,
  },
  {
    id: 'logo-lotus',
    name: "Lotus's Malaysia",
    category: 'Retail & FMCG',
    industry: 'Hypermarket & Supermarkets',
    statsOrHighlight: 'Frontline UPT & Sales Conversion',
    logoUrl: generateLogoPlaceholder("Lotus's", 'LT', '#14b8a6', 'RETAIL HYPERMARKET'),
    featured: true,
    order: 5,
    active: true,
  },
  {
    id: 'logo-tng',
    name: "Touch 'n Go Digital",
    category: 'Banking & Financial',
    industry: 'Fintech & Digital Payments',
    statsOrHighlight: 'Regulatory Compliance & Service',
    logoUrl: generateLogoPlaceholder("Touch 'n Go", 'TNG', '#3b82f6', 'DIGITAL WALLET'),
    featured: true,
    order: 6,
    active: true,
  },
  {
    id: 'logo-grab',
    name: 'Grab Malaysia',
    category: 'Technology & Telco',
    industry: 'Ride-Hailing & Deliveries',
    statsOrHighlight: 'AI Workflow & Data Productivity',
    logoUrl: generateLogoPlaceholder('Grab', 'GB', '#22c55e', 'TECH & LOGISTICS'),
    featured: true,
    order: 7,
    active: true,
  },
  {
    id: 'logo-simedarby',
    name: 'Sime Darby Berhad',
    category: 'Conglomerate & Property',
    industry: 'Industrial & Motors Conglomerate',
    statsOrHighlight: 'Supervisory Performance Track',
    logoUrl: generateLogoPlaceholder('Sime Darby', 'SD', '#f97316', 'INDUSTRIAL HOLDINGS'),
    featured: true,
    order: 8,
    active: true,
  },
  {
    id: 'logo-cimb',
    name: 'CIMB Group',
    category: 'Banking & Financial',
    industry: 'ASEAN Universal Banking',
    statsOrHighlight: 'SBL-Khas 100% Grant Claimed',
    logoUrl: generateLogoPlaceholder('CIMB Bank', 'CB', '#dc2626', 'UNIVERSAL BANKING'),
    featured: false,
    order: 9,
    active: true,
  },
  {
    id: 'logo-celcomdigi',
    name: 'CelcomDigi',
    category: 'Technology & Telco',
    industry: 'Telecommunications & Cloud',
    statsOrHighlight: 'Team Synergy Bootcamp (180 Pax)',
    logoUrl: generateLogoPlaceholder('CelcomDigi', 'CD', '#6366f1', 'NETWORK & TELCO'),
    featured: false,
    order: 10,
    active: true,
  },
  {
    id: 'logo-tnb',
    name: 'Tenaga Nasional',
    category: 'Energy & Utilities',
    industry: 'National Power & Utilities',
    statsOrHighlight: 'Operational Silo Elimination',
    logoUrl: generateLogoPlaceholder('TNB', 'TNB', '#0284c7', 'POWER UTILITIES'),
    featured: false,
    order: 11,
    active: true,
  },
  {
    id: 'logo-aeon',
    name: 'AEON Co. (M) Bhd',
    category: 'Retail & FMCG',
    industry: 'Department Store & Malls',
    statsOrHighlight: 'Retail Shift Supervisor Series',
    logoUrl: generateLogoPlaceholder('AEON Retail', 'AN', '#a855f7', 'RETAIL CHAIN'),
    featured: false,
    order: 12,
    active: true,
  }
];
