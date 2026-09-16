import { TrainingModule, Trainer, GalleryItem, Testimonial, CorporateInquiry, SiteAnnouncement } from '../types';

export const TRAINING_MODULES: TrainingModule[] = [
  // 1. Retail Leadership & Operations
  {
    id: 'retail-sales-mastery',
    title: 'Retail Sales Mastery & High-Conversion Upselling',
    category: 'retail-leadership',
    categoryLabel: 'Retail Leadership & Operations',
    shortDescription: 'Equip retail frontline staff and store advisors with psychological sales closing, cross-selling formulas, and VIP customer rapport techniques.',
    fullDescription: 'Designed specifically for high-velocity retail, FMCG, and luxury boutique operations in Malaysia. This hands-on boot camp transforms passive floor attendants into consultative sales professionals who actively increase Average Basket Value (ABV) and Units Per Transaction (UPT).',
    duration: '2 Days (14 Hours)',
    targetAudience: ['Retail Store Managers', 'Floor Supervisors', 'Brand Ambassadors', 'Frontline Sales Associates'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-RET-2026-08',
    keyHighlights: [
      'The 3-Step Consultative Upsell Matrix without being pushy',
      'Handling retail price objections and competitor comparisons',
      'Body language mastery and rapid customer temperament profiling',
      'Mystery shopper standards & closing high-ticket transactions'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Customer Psychology & Consultative Floor Selling',
        modules: [
          'Module 1: The Modern Malaysian Retail Shopper Expectations',
          'Module 2: The First 30 Seconds – Non-Intrusive Engagement Tactics',
          'Module 3: Probing Questions that Reveal Unspoken Buyer Needs',
          'Module 4: Value Stacking & Cross-Selling Companion Products'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Objection Handling, Closing & UPT Maximization',
        modules: [
          'Module 5: Overcoming "I am just looking" & Price Resistance',
          'Module 6: Closing Frameworks (Urgency, Assumptive & Trial Closes)',
          'Module 7: Live Floor Simulations & Video-Recorded Roleplays',
          'Module 8: Post-Sale Retention & Repeat Footfall Strategies'
        ]
      }
    ],
    learningOutcomes: [
      'Increase Average Basket Value (ABV) by an estimated 18–25%',
      'Master 5 frictionless closing scripts proven across retail sectors',
      'Convert browser resistance into engaged product demonstrations',
      'Deliver consistent brand storytelling across multi-store locations'
    ],
    trainerSpecialty: 'Former Regional Retail Operations Director for SEA luxury brands',
    featured: true,
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'supervisory-leadership-retail',
    title: 'Frontline Supervisory Leadership & Store Performance',
    category: 'retail-leadership',
    categoryLabel: 'Retail Leadership & Operations',
    shortDescription: 'Empower retail shift leaders and supervisors to coach frontline teams, manage rosters, and drive daily sales target achievement.',
    fullDescription: 'Frontline retail supervisors are the heartbeat of store profitability. This program transitions high-performing associates into commanding yet empathetic leaders capable of handling staff absenteeism, conflict, and daily target pacing.',
    duration: '2 Days (16 Hours)',
    targetAudience: ['Store Supervisors', 'Assistant Store Managers', 'Department Heads', 'Retail Operations Executives'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-RET-2026-14',
    keyHighlights: [
      'Translating monthly revenue targets into daily shift scorecards',
      'Managing Gen-Z floor staff and reducing turnover in retail',
      'Delegation and accountability during peak weekend traffic',
      'Conducting inspiring 10-minute morning huddles'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'The Shift from Doer to Retail Supervisor',
        modules: [
          'Module 1: Retail KPI Dashboard: Conversion Rate, Footfall & UPT',
          'Module 2: Running 10-Minute Morning Rallies that Ignite Energy',
          'Module 3: Shift Management, Peak Period Roster Optimization',
          'Module 4: Situational Leadership on the Retail Sales Floor'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Performance Coaching & Conflict Resolution',
        modules: [
          'Module 5: Handling Difficult Frontline Staff & Chronic Tardiness',
          'Module 6: The SBI (Situation-Behavior-Impact) Coaching Model',
          'Module 7: Loss Prevention, Shrinkage & Inventory Audits',
          'Module 8: Store Operations Action Plan & 30-Day Implementation'
        ]
      }
    ],
    learningOutcomes: [
      'Execute high-energy daily shift briefings that boost morale',
      'Diagnose floor bottlenecks and adjust staffing dynamically',
      'Conduct constructive performance feedback that reduces staff churn',
      'Maintain operational compliance and inventory shrinkage targets'
    ],
    trainerSpecialty: 'Certified Retail Leadership Coach with 18+ years store management',
    featured: false,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop'
  },

  // 2. Team Synergy & People Dynamics
  {
    id: 'high-impact-team-synergy',
    title: 'High-Impact Team Building & Synergy Expedition',
    category: 'team-synergy',
    categoryLabel: 'Team Synergy & People Dynamics',
    shortDescription: 'Immersive experiential outdoor and indoor team building designed to break department silos, build psychological safety, and boost camaraderie.',
    fullDescription: 'Beyond mere casual games, Clevera’s flagship Team Synergy program employs behavioral psychology and gamified problem-solving challenges. Teams experience high-stakes collaboration that directly reflects workplace dependencies, driving unified organizational commitment.',
    duration: '2 Days 1 Night / Full Day',
    targetAudience: ['Whole Company Departments', 'Cross-Functional Project Teams', 'Senior & Mid-Management Groups'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-SYNERGY-2026-01',
    keyHighlights: [
      'Gamified workplace simulations & outdoor strategy quests',
      'Breaking down cross-departmental "Us vs. Them" silos',
      'Psychological safety workshops and open-feedback circles',
      'Co-creating the Team Charter of Values & Accountability'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Breaking Silos & The Chemistry of Trust',
        modules: [
          'Phase 1: The Icebreaker Matrix & Identity Unification',
          'Phase 2: The Trust Fall Reimagined – Cognitive Reliance Quests',
          'Phase 3: The Silo Breaker: Inter-Departmental Resource Exchange',
          'Phase 4: Debrief: Mirroring Simulation Pressures to Office Reality'
        ]
      },
      {
        day: 'Day 2',
        theme: 'High-Velocity Execution & The Team Charter',
        modules: [
          'Phase 5: The Grand Synergy Championship (Gamified Strategy Race)',
          'Phase 6: Conflict De-escalation Under Simulated Pressure',
          'Phase 7: The Appreciation Fire: Radical Candor & Acknowledgments',
          'Phase 8: Signing the Corporate Commitment Charter'
        ]
      }
    ],
    learningOutcomes: [
      'Dismantle inter-departmental barriers between Sales, Ops, and Finance',
      'Establish open communication norms that accelerate project delivery',
      'Cultivate resilient teams that thrive during corporate restructuring',
      'Create memorable bonding moments that elevate employee engagement'
    ],
    trainerSpecialty: 'Lead Experiential Team Facilitator & Corporate Outbound Master',
    featured: true,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'personality-insights-disc-mbti',
    title: 'Personality Insights: DISC & Behavioral Profiling for Teams',
    category: 'team-synergy',
    categoryLabel: 'Team Synergy & People Dynamics',
    shortDescription: 'Decode behavioral styles within your workplace to minimize friction, speed up decision making, and adapt interpersonal communication.',
    fullDescription: 'Every team suffers from miscommunication caused by differing communication styles. Through certified DISC behavioral assessments, participants identify their primary drivers, stress triggers, and how to adapt their language to win collaboration across diverse personalities.',
    duration: '1 to 2 Days',
    targetAudience: ['Corporate Executives', 'HR Business Partners', 'Project Managers', 'People Managers'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-DISC-2026-05',
    keyHighlights: [
      'Individual personalized DISC behavioral assessment report',
      'Mapping team behavioral strengths and communication blind spots',
      'Adapting pitch and negotiation style to dominant personalities',
      'Resolving toxic passive-aggressive tensions systematically'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Understanding Self & The 4 Behavioral Dimensions',
        modules: [
          'Module 1: The Neuroscience of Interpersonal Perception',
          'Module 2: Decoding Dominance, Influence, Steadiness & Conscientiousness',
          'Module 3: Individual Assessment Debrief & Energy Profiling',
          'Module 4: Speed-Reading Colleagues and Clients within 5 Minutes'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Team Dynamics & Workplace Application',
        modules: [
          'Module 5: The Team Strengths Matrix: Identifying Critical Gaps',
          'Module 6: How to Communicate with Each Type Under Stress',
          'Module 7: Cross-Profile Negotiation and Collaboration Labs',
          'Module 8: Building a High-Performance Communication Playbook'
        ]
      }
    ],
    learningOutcomes: [
      'Identify personal communication blind spots and triggers',
      'Calibrate leadership style for diverse generational workforce',
      'Cut internal meeting friction and email misunderstandings by 40%',
      'Strengthen employee retention through empathetic management'
    ],
    trainerSpecialty: 'Certified Master DISC Behavioral Profiler & Psychologist',
    featured: false,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
  },

  // 3. Digital & Technical Skills
  {
    id: 'ai-business-productivity',
    title: 'AI for Business Productivity & Daily Workflow Automation',
    category: 'digital-technical',
    categoryLabel: 'Digital & Technical Skills',
    shortDescription: 'Master modern GenAI tools (Gemini, ChatGPT, Copilot) to automate meeting minutes, proposal writing, data analysis, and repetitive corporate admin.',
    fullDescription: 'AI is not replacing jobs; professionals who use AI are replacing those who don’t. This highly practical hands-on masterclass teaches non-technical corporate employees how to safely and ethically prompt generative AI to complete 8-hour administrative workflows in under 45 minutes.',
    duration: '2 Days (16 Hours)',
    targetAudience: ['Operations Professionals', 'Marketing & Sales Teams', 'Executive Assistants', 'Corporate Analysts'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-AI-2026-03',
    keyHighlights: [
      'Prompt Engineering frameworks (CREATE, PREP, and Persona chaining)',
      'Automating corporate emails, executive summaries, and board reports',
      'Analyzing complex Excel sheets & PDF contracts using multimodal AI',
      'Enterprise data privacy, confidentiality & security best practices'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Foundational AI Literacy & Advanced Prompt Engineering',
        modules: [
          'Module 1: The Enterprise AI Landscape (Gemini, ChatGPT, Claude)',
          'Module 2: The 5 Golden Rules of Business Prompt Engineering',
          'Module 3: Drafting Polished Emails, Proposals & SOPs at 10x Speed',
          'Module 4: Enterprise Privacy: Guarding Sensitive Corporate Data'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Autonomous Workflow Automation & Multimodal Analysis',
        modules: [
          'Module 5: AI as your Data Analyst: Ingesting Excel & CSV Files',
          'Module 6: Instant Contract & Policy Summarization Techniques',
          'Module 7: Building Custom AI GPT Assistants for Your Department',
          'Module 8: The 30-Day Corporate AI Adoption Blueprint'
        ]
      }
    ],
    learningOutcomes: [
      'Save 10+ hours per week on routine corporate writing and data synthesis',
      'Create department-tailored custom AI prompts for daily tasks',
      'Analyze financial spreadsheets and extract key trends in seconds',
      'Safeguard proprietary company data while leveraging AI capabilities'
    ],
    trainerSpecialty: 'Google Certified AI Professional & Corporate Tech Consultant',
    featured: true,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'microsoft-excel-masterclass',
    title: 'Microsoft Excel Masterclass: Formulas to Power BI & Dashboards',
    category: 'digital-technical',
    categoryLabel: 'Digital & Technical Skills',
    shortDescription: 'From XLOOKUP and dynamic arrays to interactive executive KPI dashboards and Power Query data cleaning without manual copy-pasting.',
    fullDescription: 'Stop wasting hours manually formatting messy spreadsheets. This intensive course elevates corporate teams from basic spreadsheet users to data powerhouses capable of automating data ingestion and building real-time interactive business scorecards.',
    duration: '2 Days (16 Hours)',
    targetAudience: ['Finance & Accounting Staff', 'Operations Leads', 'Admin & HR Executives', 'Logistics Planners'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-EXC-2026-02',
    keyHighlights: [
      'Mastering modern functions: XLOOKUP, FILTER, UNIQUE, SEQUENCE',
      'Automating raw data cleanup with Power Query in 1 click',
      'Building dynamic executive pivot charts and KPI slicers',
      'Spreadsheet error auditing and macro automation basics'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Modern Functions & Dynamic Data Structuring',
        modules: [
          'Module 1: Best Practices in Modern Spreadsheet Architecture',
          'Module 2: Say Goodbye to VLOOKUP: Mastering XLOOKUP & INDEX/MATCH',
          'Module 3: Dynamic Array Formulas & Conditional Formatting Magic',
          'Module 4: Data Validation, Dropdowns & Bulletproof Templates'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Power Query Automation & Executive KPI Dashboards',
        modules: [
          'Module 5: Connecting Disparate Data Files with Power Query',
          'Module 6: Advanced Pivot Tables & Multi-Table Data Modeling',
          'Module 7: Designing C-Suite Visual Dashboards with Slicers',
          'Module 8: Introduction to Power BI Integration & Reporting'
        ]
      }
    ],
    learningOutcomes: [
      'Cut monthly reporting cycles from 3 days to under 15 minutes',
      'Eliminate copy-paste errors across multiple company departments',
      'Present clean visual data stories that influence leadership decisions',
      'Automate repetitive data ingestion from external software exports'
    ],
    trainerSpecialty: 'Microsoft Certified Systems Expert & Financial Modeling Coach',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },

  // 4. HR, Compliance & Employment Law
  {
    id: 'employment-act-1955-amendments',
    title: 'Employment Act 1955: Recent Amendments & Practical Compliance',
    category: 'hr-compliance',
    categoryLabel: 'HR, Compliance & Employment Law',
    shortDescription: 'Navigate Malaysia’s updated Employment Act clauses, working hours (45 to 48 hrs), flexible work arrangements, maternity/paternity leave, and overtime rules.',
    fullDescription: 'Essential for Malaysian business owners, HR practitioners, and general managers. Gain crystal-clear clarity on the latest amendments to the Employment Act 1955, avoid costly industrial court penalties, and update company employee handbooks to maintain 100% legal compliance.',
    duration: '2 Days (16 Hours)',
    targetAudience: ['HR Directors & Managers', 'Payroll Specialists', 'C-Suite Executives', 'In-House Legal & Admin Officers'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-LAW-2026-11',
    keyHighlights: [
      'Comprehensive breakdown of Section 60A working hour reductions',
      'Handling statutory maternity leave (98 days) & paternity leave rules',
      'Flexible Working Arrangements (FWA) policy implementation',
      'Calculating statutory overtime, rest day pay & public holiday rates'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'The Core Amendments & Working Conditions',
        modules: [
          'Module 1: Scope of Application: The New Thresholds for All Employees',
          'Module 2: 45-Hour Work Week: Scheduling, Rostering & OT Calculations',
          'Module 3: Leave Entitlements: Maternity, Paternity, Sick & Hospitalization',
          'Module 4: Managing Flexible Working Arrangements (FWA) Requests Lawfully'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Discipline, Termination & Industrial Relations Precedents',
        modules: [
          'Module 5: Proper Handling of Sexual Harassment Mandates & Investigations',
          'Module 6: Discrimination in Employment & Forced Labor Provisions',
          'Module 7: Lawful Termination, Retrenchment & Performance Separation',
          'Module 8: Drafting Compliant Employment Contracts & Company Handbooks'
        ]
      }
    ],
    learningOutcomes: [
      'Ensure 100% adherence to Department of Labour (JTK) regulations',
      'Avoid costly compound fines and Industrial Court awards',
      'Audit your current employment contracts for illegal outdated clauses',
      'Handle employee disputes confidently using statutory legal guidelines'
    ],
    trainerSpecialty: 'Senior Industrial Court Advocate & Industrial Relations Consultant',
    featured: true,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'domestic-inquiry-disciplinary',
    title: 'Managing Workplace Discipline, Misconduct & Domestic Inquiries',
    category: 'hr-compliance',
    categoryLabel: 'HR, Compliance & Employment Law',
    shortDescription: 'Master procedural fairness, issuing show-cause letters, drafting charges, and conducting air-tight Domestic Inquiries (DI) without legal pitfalls.',
    fullDescription: 'Poorly executed disciplinary actions and botched Domestic Inquiries account for over 70% of employer losses in Malaysian Industrial Courts. Learn the exact step-by-step procedure to investigate misconduct, manage investigations, and chair lawful DI hearings.',
    duration: '2 Days (16 Hours)',
    targetAudience: ['HR Executives', 'HODs & Senior Supervisors', 'Operations Directors', 'Internal Auditors'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-LAW-2026-19',
    keyHighlights: [
      'Differentiating minor vs. gross workplace misconduct',
      'Drafting bulletproof Show-Cause & Suspension Letters',
      'Roles and responsibilities of the DI Panel Chairman & Prosecuting Officer',
      'Simulated live Mock Domestic Inquiry hearing session'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Misconduct Investigation & Evidence Gathering',
        modules: [
          'Module 1: Principles of Natural Justice in the Malaysian Workplace',
          'Module 2: Preliminary Investigations & Chain of Evidence Custody',
          'Module 3: Drafting Flawless Charges and Notice of Inquiry',
          'Module 4: Rights of the Accused Employee and Employer Prerogatives'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Executing the Inquiry & Panel Findings',
        modules: [
          'Module 5: Room Setup, Witness Examination & Cross-Examination Protocol',
          'Module 6: Live Roleplay: Conducting the Mock Domestic Inquiry Hearing',
          'Module 7: Synthesizing the Panel Report & Recommendations',
          'Module 8: Deciding Just Punishments (Warning, Demotion, Dismissal)'
        ]
      }
    ],
    learningOutcomes: [
      'Conduct legally sound misconduct investigations that withstand court scrutiny',
      'Write clear, unambiguous charges that prevent technical dismissal dismissals',
      'Chair or prosecute in a Domestic Inquiry with poise and procedural correctness',
      'Protect organizational reputation while maintaining workplace discipline'
    ],
    trainerSpecialty: 'Former Malaysian Industrial Court Assessor with 25+ years HR experience',
    featured: false,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop'
  },

  // 5. Specialized Business Modules
  {
    id: 'customer-service-excellence',
    title: 'Customer Service Excellence & Defusing High-Stress Conflicts',
    category: 'specialized-business',
    categoryLabel: 'Specialized Business Modules',
    shortDescription: 'Turn difficult interactions and angry customers into loyal brand champions through empathy formulas, verbal de-escalation, and omnichannel service standards.',
    fullDescription: 'Customer complaints can either destroy your brand’s reputation on Google Reviews and social media, or become your greatest retention opportunity. This program arms frontline, support, and account management teams with mental resilience and proven de-escalation frameworks.',
    duration: '1 to 2 Days',
    targetAudience: ['Customer Support Teams', 'Front Desk & Call Center Reps', 'Account Managers', 'Service Operation Leads'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-CS-2026-09',
    keyHighlights: [
      'The L.A.S.T. (Listen, Apologize, Solve, Thank) Method in action',
      'Handling toxic, abusive, or unreasonable clients without losing composure',
      'Email and chat etiquette: writing empathetic digital responses',
      'Service recovery paradox: Turning dissatisfied buyers into super-promoters'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Mindset & Verbal De-escalation Mastery',
        modules: [
          'Module 1: The Psychology of the Frustrated Customer',
          'Module 2: Words to Avoid & Magic Phrases that Immediately Lower Tempers',
          'Module 3: The 4 Customer Persona Types in Crisis Situations',
          'Module 4: Active Listening & Emotional Detachment Techniques'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Service Recovery & Omnichannel Standards',
        modules: [
          'Module 5: Crafting De-escalating Emails & WhatsApp Responses',
          'Module 6: The Service Recovery Protocol: Compensation & Follow-Through',
          'Module 7: Real Customer Audio / Case Study Roleplay Simulations',
          'Module 8: Preventing Burnout & Secondary Trauma in Support Staff'
        ]
      }
    ],
    learningOutcomes: [
      'Resolve 85%+ of client disputes on the first touchpoint without escalation',
      'Protect online corporate brand reputation against negative virality',
      'Equip staff with emotional resilience strategies that lower turnover',
      'Establish standardized service recovery benchmarks across teams'
    ],
    trainerSpecialty: 'International Hospitality & Corporate CX Consultant',
    featured: false,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'credit-management-debt-recovery',
    title: 'Credit Management, Collection Techniques & Debt Recovery',
    category: 'specialized-business',
    categoryLabel: 'Specialized Business Modules',
    shortDescription: 'Accelerate corporate cash collection, structure bulletproof credit terms, and recover overdue accounts while preserving valuable client relationships.',
    fullDescription: 'Cash flow is the lifeblood of business survival. Many companies struggle with aged accounts receivable and sluggish debtors. This high-impact module provides practical credit assessment tools, negotiation scripts, and legal escalation remedies under Malaysian debt recovery laws.',
    duration: '2 Days (16 Hours)',
    targetAudience: ['Credit Controllers', 'Accountants & Finance Executives', 'Sales Managers with Collection KPIs', 'Business Owners'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-FIN-2026-17',
    keyHighlights: [
      'Credit evaluation checklist to identify high-risk debtors beforehand',
      'Assertive collection call scripts that secure payment promises',
      'Negotiating structured installment plans for distressed accounts',
      'Malaysian legal tools: Letters of Demand (LOD), Judgments & Winding-Up'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Credit Risk Assessment & Preventive Frameworks',
        modules: [
          'Module 1: Diagnosing Root Causes of Slow Payment in Malaysian B2B',
          'Module 2: Conducting Due Diligence: CTOS, SSM & Financial Health Ratios',
          'Module 3: Structuring Enforceable Credit Application Forms & Personal Guarantees',
          'Module 4: The Aging Schedule: Prioritizing High-Risk Recovery Efforts'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Collection Psychology & Legal Recovery Avenues',
        modules: [
          'Module 5: The Phone Collection Script: Dealing with Excuses & Deflections',
          'Module 6: Written Reminders: From Gentle Notice to Final Warning',
          'Module 7: Legal Options in Malaysia: Small Claims, LOD & Summary Judgments',
          'Module 8: Roleplay Lab: Live Negotiation with Chronic Debtors'
        ]
      }
    ],
    learningOutcomes: [
      'Reduce Days Sales Outstanding (DSO) by 15–30 days within 90 days',
      'Prevent bad debts through rigorous upfront credit vetting systems',
      'Recover aged accounts receivable without damaging future sales relationships',
      'Know precisely when and how to deploy legal recovery mechanisms'
    ],
    trainerSpecialty: 'Senior B2B Credit Risk Strategist & Commercial Recovery Counsel',
    featured: false,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'commercial-contracts-negotiation',
    title: 'Commercial Contracts, Procurement & Risk Management',
    category: 'specialized-business',
    categoryLabel: 'Specialized Business Modules',
    shortDescription: 'Empower non-lawyers to review agreements, negotiate favorable indemnity clauses, prevent scope creep, and enforce supplier SLAs.',
    fullDescription: 'Every corporate agreement carries operational, financial, and legal liabilities. This practical masterclass demystifies legal jargon for procurement, sales, and operations leaders, showing them how to spot hidden contract traps and negotiate win-win covenants.',
    duration: '2 Days (16 Hours)',
    targetAudience: ['Procurement Managers', 'Contract Administrators', 'Business Development Directors', 'Project Directors'],
    hrdcScheme: 'SBL Khas',
    grantCode: 'HRDC-SBL-FIN-2026-22',
    keyHighlights: [
      'Red-flagging dangerous clauses: Unlimited Liability & Force Majeure pitfalls',
      'Drafting unambiguous Scope of Work (SOW) and milestone deliverables',
      'Managing vendor breaches and dispute resolution mechanisms',
      'Negotiation playbooks that protect profit margins'
    ],
    syllabus: [
      {
        day: 'Day 1',
        theme: 'Decoding Contracts for Non-Legal Corporate Leaders',
        modules: [
          'Module 1: Anatomy of a Commercial Agreement & Legal Essentials',
          'Module 2: Crucial Clauses: Indemnities, Warranties, & Limitations of Liability',
          'Module 3: Non-Disclosure Agreements (NDAs) & Intellectual Property Protection',
          'Module 4: Service Level Agreements (SLAs) & Liquidated Damages (LAD)'
        ]
      },
      {
        day: 'Day 2',
        theme: 'Negotiation Strategies & Contract Lifecycle Management',
        modules: [
          'Module 5: The Redline Process: How to Mark Up Contracts Tactfully',
          'Module 6: Managing Contract Amendments, Variations & Scope Creep',
          'Module 7: Termination for Convenience vs. Termination for Default',
          'Module 8: Interactive Redlining Workshop on Real Corporate Contracts'
        ]
      }
    ],
    learningOutcomes: [
      'Review corporate agreements in half the time with confidence',
      'Spot and neutralize one-sided liability terms before signing',
      'Prevent costly project disputes through clear deliverables and milestones',
      'Align supplier contracts with corporate risk tolerance goals'
    ],
    trainerSpecialty: 'Corporate Legal Advisor & Commercial Procurement Arbitrator',
    featured: false,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: 'dr-zulkifli-rahman',
    name: 'Dr. Zulkifli Rahman',
    title: 'Lead Corporate Strategist & HRDC Master Facilitator',
    credentials: ['Ph.D. in Organizational Behavior (UM)', 'HRDC TTT Certified (TTT/10492)', 'Certified EQ Practitioner'],
    hrdcTttNo: 'TTT/10492',
    experienceYears: 22,
    bio: 'With over two decades advising Fortune 500 multinationals and Malaysian GLCs, Dr. Zulkifli specializes in executive alignment, team building retreats, and culture transformation that bridges generational gaps.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    specialties: ['High-Impact Team Building', 'Executive Synergy', 'Cross-Cultural Leadership']
  },
  {
    id: 'kavita-muralidharan',
    name: 'Kavita Muralidharan',
    title: 'Principal Retail Leadership & Frontline CX Specialist',
    credentials: ['MBA in Retail Management (Monash)', 'HRDC TTT Certified (TTT/14820)', 'Certified Retail Performance Coach'],
    hrdcTttNo: 'TTT/14820',
    experienceYears: 16,
    bio: 'Formerly Head of Training for a leading Southeast Asian fashion & lifestyle retail chain with 120+ outlets. Kavita has coached more than 4,500 store managers and frontline associates to exceed sales KPIs.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    specialties: ['Retail Sales Mastery', 'Store Supervisory Leadership', 'High-Converting Upselling']
  },
  {
    id: 'bernard-tan',
    name: 'Bernard Tan Chee Keat',
    title: 'Senior Industrial Relations Counsel & Employment Law Trainer',
    credentials: ['LL.B (Hons) Malaya', 'Advocate & Solicitor of the High Court of Malaya', 'HRDC TTT Certified (TTT/08311)'],
    hrdcTttNo: 'TTT/08311',
    experienceYears: 19,
    bio: 'Bernard has represented Malaysian employers in over 300 Industrial Court and High Court labor disputes. He translates dense statutory employment legislation into pragmatic, real-world HR management playbooks.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    specialties: ['Employment Act 1955 Amendments', 'Domestic Inquiries', 'Workplace Misconduct & Retrenchment']
  },
  {
    id: 'sharifah-nadia',
    name: 'Sharifah Nadia Al-Haddad',
    title: 'Digital Transformation & Enterprise AI Productivity Lead',
    credentials: ['M.Sc. Computer Science (USM)', 'Certified AI Solutions Architect', 'HRDC TTT Certified (TTT/19034)'],
    hrdcTttNo: 'TTT/19034',
    experienceYears: 12,
    bio: 'Sharifah bridges the gap between cutting-edge generative AI and everyday workplace reality. She trains non-technical executives and corporate teams to automate spreadsheets, communications, and reporting workflows.',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    specialties: ['AI for Business Productivity', 'Automated Office Workflows', 'Microsoft Excel & Power BI']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Annual Leadership Synergy Expedition',
    category: 'outdoor',
    categoryLabel: 'Outdoor Team Building',
    location: 'Genting Highlands, Pahang',
    description: '140 corporate managers from a major Malaysian logistics group engaged in outdoor problem-solving quests to rebuild inter-departmental trust.',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=900&auto=format&fit=crop',
    paxCount: '140 Pax'
  },
  {
    id: 'gal-2',
    title: 'Retail Store Supervisory Bootcamp',
    category: 'retail',
    categoryLabel: 'Retail Simulation',
    location: 'Bangsar South, Kuala Lumpur',
    description: 'Hands-on roleplay session testing real customer objection handling and morning rally leadership for 60 retail outlet supervisors.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=900&auto=format&fit=crop',
    paxCount: '60 Pax'
  },
  {
    id: 'gal-3',
    title: 'Hands-On AI & Excel Masterclass',
    category: 'classroom',
    categoryLabel: 'Classroom Workshop',
    location: 'KL Eco City, Kuala Lumpur',
    description: 'Finance and operational executives building automated KPI reporting dashboards using generative AI and advanced XLOOKUP models.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop',
    paxCount: '35 Pax'
  },
  {
    id: 'gal-4',
    title: 'Corporate Beach Synergy & Trust Games',
    category: 'retreat',
    categoryLabel: 'Corporate Retreat',
    location: 'Port Dickson, Negeri Sembilan',
    description: 'High-energy beach games and trust dynamics for a nationwide telecommunications engineering team celebrating project milestones.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=900&auto=format&fit=crop',
    paxCount: '180 Pax'
  },
  {
    id: 'gal-5',
    title: 'Employment Act & Domestic Inquiry Workshop',
    category: 'classroom',
    categoryLabel: 'Executive Seminar',
    location: 'Mid Valley City, Kuala Lumpur',
    description: 'HR directors and in-house legal teams working through mock domestic inquiries and analyzing recent Malaysian Industrial Court cases.',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=900&auto=format&fit=crop',
    paxCount: '45 Pax'
  },
  {
    id: 'gal-6',
    title: 'Cross-Functional Strategy Hackathon',
    category: 'classroom',
    categoryLabel: 'Classroom Workshop',
    location: 'Sunway Resort Hotel, Selangor',
    description: 'Cross-departmental collaboration workshop where Sales, IT, and Warehouse managers co-designed a unified customer journey map.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop',
    paxCount: '90 Pax'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Clevera Academy made the entire HRDC SBL-Khas claiming process seamless. From issuing the exact grant codes to their interactive Retail Upselling workshop, our stores experienced a 21% jump in Average Basket Value in Q2 alone!',
    author: 'Datin Seri Melissa Chong',
    role: 'Vice President of Human Capital',
    company: 'Nexus Premier Retail Group (35 Outlets nationwide)',
    location: 'Kuala Lumpur',
    rating: 5,
    programTaken: 'Retail Sales Mastery & High-Conversion Upselling',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'test-2',
    quote: 'Our team was skeptical about another "team building" day, but Clevera’s Synergy Expedition completely shattered their defenses. The psychological safety debriefs tackled real friction that had delayed our product rollout by months.',
    author: 'Farid Hakimi',
    role: 'Chief Operating Officer',
    company: 'Apex Digital Logistics Malaysia',
    location: 'Shah Alam, Selangor',
    rating: 5,
    programTaken: 'High-Impact Team Building & Synergy Expedition',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'test-3',
    quote: 'The Employment Act 1955 masterclass was worth 10x its value. Bernard clarified our exact obligations regarding 45-hour work weeks and flexible work arrangements. We updated our handbook immediately with zero legal ambiguity.',
    author: 'Jonathan Lee Kean Hoong',
    role: 'Head of People & Culture',
    company: 'Berjaya Precision Engineering Berhad',
    location: 'Bayan Lepas, Penang',
    rating: 5,
    programTaken: 'Employment Act 1955: Recent Amendments',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
];

export const INITIAL_LEADS: CorporateInquiry[] = [
  {
    id: 'CA-2026-901',
    createdAt: '2026-09-14 09:30',
    companyName: 'Bina Megah Construction Sdn Bhd',
    contactName: 'Rosli bin Mansor',
    workEmail: 'rosli.m@binamegah.com.my',
    phone: '+60 12-384 9921',
    industry: 'Engineering & Construction',
    participantsCount: 45,
    preferredDate: '2026-10-15',
    moduleId: 'high-impact-team-synergy',
    moduleTitle: 'High-Impact Team Building & Synergy Expedition',
    hrdcRegistered: 'Yes',
    trainingFormat: 'External Retreat / Hotel',
    budgetOrNotes: 'Looking for a 2D1N retreat in Janda Baik for our project engineers and QS team.',
    status: 'New',
    assignedRep: 'Sarah Wong'
  },
  {
    id: 'CA-2026-894',
    createdAt: '2026-09-13 14:15',
    companyName: 'Luxe Brands Retail Malaysia',
    contactName: 'Amanda Teoh',
    workEmail: 'amanda.teoh@luxebrands.my',
    phone: '+60 17-291 0384',
    industry: 'Retail & Consumer Goods',
    participantsCount: 28,
    preferredDate: '2026-10-22',
    moduleId: 'retail-sales-mastery',
    moduleTitle: 'Retail Sales Mastery & High-Conversion Upselling',
    hrdcRegistered: 'Yes',
    trainingFormat: 'In-House (Our Office)',
    budgetOrNotes: 'Need focus on luxury fragrance & cosmetics upselling for Pavilion and KLCC staff.',
    status: 'Contacted',
    assignedRep: 'Ahmad Razak'
  },
  {
    id: 'CA-2026-881',
    createdAt: '2026-09-11 11:45',
    companyName: 'Puncak Ventures Fintech Sdn Bhd',
    contactName: 'Kuan Yew Wei',
    workEmail: 'kuan.yw@puncakventures.com',
    phone: '+60 16-883 9102',
    industry: 'Technology & Financial Services',
    participantsCount: 35,
    preferredDate: '2026-11-05',
    moduleId: 'ai-business-productivity',
    moduleTitle: 'AI for Business Productivity & Daily Workflow Automation',
    hrdcRegistered: 'Yes',
    trainingFormat: 'In-House (Our Office)',
    budgetOrNotes: 'Full day session covering Gemini Enterprise and automated reporting.',
    status: 'Quoted',
    assignedRep: 'Kavita Nair'
  },
  {
    id: 'CA-2026-874',
    createdAt: '2026-09-08 16:20',
    companyName: 'Metro Food Distributors Berhad',
    contactName: 'Siti Nurhaliza binti Kamal',
    workEmail: 'siti.kamal@metrofood.com.my',
    phone: '+60 19-450 1827',
    industry: 'FMCG & Logistics',
    participantsCount: 20,
    preferredDate: '2026-10-08',
    moduleId: 'credit-management-debt-recovery',
    moduleTitle: 'Credit Management, Collection Techniques & Debt Recovery',
    hrdcRegistered: 'Yes',
    trainingFormat: 'In-House (Our Office)',
    budgetOrNotes: 'High aging debts from supermarket accounts. Urgently need recovery strategies.',
    status: 'Confirmed',
    assignedRep: 'Sarah Wong'
  }
];

export const HRDC_FAQ_ITEMS = [
  {
    question: 'What is the HRD Corp (HRDC) SBL-Khas Scheme?',
    answer: 'The SBL-Khas (Skim Bantuan Latihan Khas) is a major training financial assistance scheme under HRD Corp. Under SBL-Khas, employers DO NOT need to make upfront payments to the training provider. Clevera Academy directly claims the approved course fees from HRD Corp, meaning zero out-of-pocket cash flow burden on your company!'
  },
  {
    question: 'What is the maximum claimable allowance for training in Malaysia?',
    answer: 'Under current HRD Corp allowable cost matrices: In-House Training is claimable up to RM6,000 per training group per day (subject to participant caps), plus meal allowances (RM50–RM100/pax/day depending on tier), and training consumables. For Public or External Retreat programs, course fees are claimable up to RM1,300 per pax per day.'
  },
  {
    question: 'When must we submit our grant application on e-TRiS?',
    answer: 'Grant applications must be submitted on the HRD Corp e-TRiS portal at least one (1) day prior to the training commencement date. Clevera Academy provides you with the completed Course Proposal, Trainer Profile, and Official Quotation within 2 hours of booking to ensure prompt submission.'
  },
  {
    question: 'What if our company does not have enough levy balance?',
    answer: 'You can still train with Clevera Academy! If your levy balance only covers 70% of the course fee, the remaining balance can be settled via company direct payment, or you can opt for shorter modular workshops aligned strictly to your current monthly levy accrual.'
  },
  {
    question: 'Are Clevera Academy trainers certified by HRD Corp?',
    answer: 'Yes, 100%! All our lead trainers and facilitators possess valid HRD Corp Train-The-Trainer (TTT) or Exemption credentials, along with extensive corporate C-suite or industry practitioner track records.'
  }
];

export const SITE_ANNOUNCEMENT: SiteAnnouncement = {
  active: true,
  badge: 'HRDC Circular 2026',
  message: '100% SBL-Khas Grants available for all registered Malaysian employers with zero upfront cash required.'
};

