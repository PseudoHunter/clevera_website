export type PageRoute = 
  | 'home' 
  | 'modules' 
  | 'hrdc-guide' 
  | 'gallery-about' 
  | 'contact-booking' 
  | 'admin' 
  | 'thank-you' 
  | 'privacy' 
  | 'terms'
  | '404';

export type ModuleCategory = 
  | 'all'
  | 'retail-leadership'
  | 'team-synergy'
  | 'digital-technical'
  | 'hr-compliance'
  | 'specialized-business';

export interface TrainingModule {
  id: string;
  title: string;
  category: Exclude<ModuleCategory, 'all'>;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  duration: string; // e.g. "2 Days (16 Hours)"
  targetAudience: string[];
  hrdcScheme: 'SBL Khas' | 'Skim Bantuan Latihan';
  grantCode: string;
  keyHighlights: string[];
  syllabus: {
    day: string;
    theme: string;
    modules: string[];
  }[];
  learningOutcomes: string[];
  trainerSpecialty: string;
  featured?: boolean;
  image: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Archived';

export interface CorporateInquiry {
  id: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  industry: string;
  participantsCount: number;
  preferredDate?: string;
  moduleId: string;
  moduleTitle: string;
  hrdcRegistered: 'Yes' | 'No' | 'Unsure';
  trainingFormat: 'In-House (Our Office)' | 'External Retreat / Hotel' | 'Virtual / Hybrid';
  budgetOrNotes?: string;
  status: LeadStatus;
  assignedRep: string;
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  hrdcTttNo: string;
  experienceYears: number;
  bio: string;
  photoUrl: string;
  specialties: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'retreat' | 'classroom' | 'outdoor' | 'retail';
  categoryLabel: string;
  location: string;
  description: string;
  imageUrl: string;
  paxCount: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  programTaken: string;
  avatarUrl: string;
}

export interface SiteAnnouncement {
  active: boolean;
  message: string;
  badge: string;
  linkRoute?: PageRoute;
}

export interface CalculatorConfig {
  badge: string;
  title: string;
  subtitle: string;
  levyRatePercent: number; // e.g. 1%
  minEmployeesForMandatoryLevy: number; // e.g. 10
  inHouseDailyFeeCap: number; // e.g. RM 6,000 / day
  inHouseMealAllowancePerPax: number; // e.g. RM 50 / pax / day
  retreatDailyCourseFeeCapPerPax: number; // e.g. RM 1,300 / pax / day
  retreatMaxTotalCap: number; // e.g. RM 40,000 max total
  productivityMultiplierPercent: number; // e.g. 22%
  productivityMultiplierMonths: number; // e.g. 6 months
  defaultEmployeeCount: number; // default 45
  defaultAvgSalary: number; // default 3800
  defaultTrainingDays: number; // default 2
  defaultPaxToTrain: number; // default 25
  upfrontCashDisplay: string; // "RM 0.00"
  sblKhasGuaranteeText: string; // "100% Direct SBL-Khas"
}

export interface ContactConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  companyName: string;
  officeName: string;
  addressLine1: string;
  addressLine2: string;
  cityStateZip: string;
  primaryPhone: string;
  phoneLabel: string;
  whatsappNumber: string;
  whatsappLabel: string;
  whatsappUrl: string;
  primaryEmail: string;
  secondaryEmail: string;
  operatingHours: string;
  accreditationText: string;
  slaNotice: string;
}

export interface FooterConfig {
  brandDescription: string;
  myCoIdText: string;
  grantClaimableText: string;
  catalogHeading: string;
  catalogButtonText: string;
  copyrightText: string;
  pdpaNotice: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  industry: string;
  statsOrHighlight: string;
  featured?: boolean;
  order: number;
  active: boolean;
}

export interface TrustedByConfig {
  sectionTitle: string;
  sectionBadge: string;
  description: string;
  autoScroll: boolean;
  scrollSpeed: 'slow' | 'normal' | 'fast';
  showCategoryFilter: boolean;
  layoutVariant: 'marquee' | 'grid' | 'carousel';
}

export interface SectionVisibility {
  // Home Page Sections
  hero: boolean;
  trustedBy: boolean;
  splitEditorial: boolean;
  activityLineup: boolean;
  faculty: boolean;
  hrdcCalculator: boolean;
  testimonials: boolean;
  reachOut: boolean;

  // Global Components
  announcementBar: boolean;
  stickyMobileCta: boolean;
  footer: boolean;
}

export type AdminContentSubTab = 
  | 'sections'
  | 'modules' 
  | 'trainers' 
  | 'calculator' 
  | 'testimonials' 
  | 'trusted-by'
  | 'contact' 
  | 'footer' 
  | 'announcement';

