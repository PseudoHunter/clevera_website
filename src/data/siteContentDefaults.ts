import {
  CalculatorConfig,
  ContactConfig,
  FooterConfig,
  SectionVisibility,
  HeroConfig,
  EditorialConfig,
  SiteContentPayload,
} from '../types';
import {
  TRAINING_MODULES,
  TRAINERS,
  TESTIMONIALS,
  SITE_ANNOUNCEMENT,
} from './mockData';
import {
  DEFAULT_CLIENT_LOGOS,
  DEFAULT_TRUSTED_BY_CONFIG,
} from './clientLogosData';
import {
  DEFAULT_HERO_CONFIG,
  DEFAULT_EDITORIAL_CONFIG,
} from './defaultSiteContent';

export {
  DEFAULT_HERO_CONFIG,
  DEFAULT_EDITORIAL_CONFIG,
};

export const DEFAULT_SECTION_VISIBILITY: SectionVisibility = {
  hero: true,
  trustedBy: true,
  splitEditorial: true,
  activityLineup: true,
  faculty: true,
  hrdcCalculator: false, // Default hidden; admin can toggle anytime
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

export const DEFAULT_LOGO_CONFIG = {
  mode: 'official' as const,
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

export function getFullDefaultSiteContent(): Required<SiteContentPayload> {
  return {
    heroConfig: DEFAULT_HERO_CONFIG,
    editorialConfig: DEFAULT_EDITORIAL_CONFIG,
    modules: TRAINING_MODULES,
    trainers: TRAINERS,
    calculatorConfig: DEFAULT_CALCULATOR_CONFIG,
    testimonials: TESTIMONIALS,
    contactConfig: DEFAULT_CONTACT_CONFIG,
    footerConfig: DEFAULT_FOOTER_CONFIG,
    announcement: SITE_ANNOUNCEMENT,
    clientLogos: DEFAULT_CLIENT_LOGOS,
    trustedByConfig: DEFAULT_TRUSTED_BY_CONFIG,
    sectionVisibility: DEFAULT_SECTION_VISIBILITY,
    logoConfig: DEFAULT_LOGO_CONFIG,
    lastUpdated: new Date().toISOString(),
    updatedBy: 'System Baseline Initialization',
  };
}
