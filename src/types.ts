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
