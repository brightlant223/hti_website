import React, { useState, useEffect } from 'react';
import {
  X,
  Briefcase,
  Building2,
  MapPin,
  Clock,
  IndianRupee,
  Calendar,
  Layers,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Save,
  Send,
  Users,
  Check,
  Award,
  Wrench,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkle
} from 'lucide-react';
import './AdminJobModal.css';

// 12 Exact Universal Departments
export const DEPARTMENT_OPTIONS = [
  'Administration',
  'Accounts & Finance',
  'Human Resources',
  'Engineering',
  'Technical Services',
  'Sales & Marketing',
  'Operations',
  'Security',
  'Housekeeping',
  'IT & Software',
  'Logistics',
  'Management'
];

// 10 Exact Job Categories
export const CATEGORY_OPTIONS = [
  'Office & Administration',
  'Accounts & Finance',
  'Engineering & Technical',
  'Sales & Marketing',
  'HR & Recruitment',
  'IT & Software',
  'Security & Safety',
  'Operations & Support',
  'Field Staff',
  'Management'
];

// 5 Exact Employment Types
export const EMPLOYMENT_TYPE_OPTIONS = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Internship'
];

// 6 Exact Experience Levels
export const EXPERIENCE_OPTIONS = [
  'Fresher',
  '0–1 Years',
  '1–3 Years',
  '3–5 Years',
  '5–8 Years',
  '8+ Years'
];

// 24 Universal Roles Grouped across 10 Departments
export const UNIVERSAL_SUGGESTED_ROLES = [
  // 1. ADMINISTRATION
  {
    role: 'Office Boy',
    department: 'Administration',
    job_category: 'Office & Administration',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 2,
    experience: 'Fresher',
    salary_range: '₹15,000 – ₹20,000 / month',
    skills: 'Office Management, Filing, Tea & Coffee Service, Courier Handling, Punctuality',
    description: 'Responsible for daily office upkeep, assisting executive staff, serving refreshments, and managing pantry and couriers.',
    responsibilities: 'Daily office maintenance, desk cleaning, and pantry upkeep\nServing refreshments to clients, guests, and executive meetings\nHandling incoming and outgoing mail, parcels, and couriers\nSupporting administrative staff with bank visits and physical filing',
    qualifications: 'SSC / 10th Standard or HSC / 12th Standard Pass\nPunctual, polite, and active communication skills\nBasic understanding of office hygiene and safety protocols',
    additional_requirements: 'Valid two-wheeler driving licence preferred, Willingness to assist with nearby local deliveries'
  },
  {
    role: 'Receptionist',
    department: 'Administration',
    job_category: 'Office & Administration',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '0–1 Years',
    salary_range: '₹18,000 – ₹25,000 / month',
    skills: 'Front Desk Management, EPABX Handling, MS Excel, Visitor Reception, Good Communication',
    description: 'Serve as the welcoming face and voice of HTI Automation & Security Systems, directing visitor inquiries and incoming calls.',
    responsibilities: 'Greet clients, vendors, and visitors with utmost corporate professionalism\nManage front desk phone line, route calls, and take detailed messages\nMaintain inward/outward registers and digital visitor logs\nCoordinate executive boardroom reservations and dispatch couriers',
    qualifications: 'Graduate or Diploma in any discipline\nPleasing personality with fluent English & Hindi communication\nWorking knowledge of MS Word, Excel, and corporate email etiquette',
    additional_requirements: 'Good interpersonal demeanor, Basic computer knowledge'
  },
  {
    role: 'Office Assistant',
    department: 'Administration',
    job_category: 'Office & Administration',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 2,
    experience: '1–3 Years',
    salary_range: '₹20,000 – ₹28,000 / month',
    skills: 'Data Entry, MS Office, Documentation, Vendor Coordination, Filing',
    description: 'Assist corporate administration with documentation, vendor billing verification, record-keeping, and day-to-day coordination.',
    responsibilities: 'Maintain administrative files, staff attendance logs, and stationery inventory\nAssist with vendor invoices and coordination for office repairs\nDraft basic correspondence, internal memos, and courier manifests\nSupport HR and Accounts teams with physical documentation and record keeping',
    qualifications: 'Bachelor\'s Degree (B.Com / BA / B.Sc)\n1–3 years administrative or clerical experience\nGood typing speed and MS Excel proficiency',
    additional_requirements: 'Basic computer knowledge, Problem-solving attitude'
  },
  {
    role: 'Office Administrator',
    department: 'Administration',
    job_category: 'Office & Administration',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '3–5 Years',
    salary_range: '₹30,000 – ₹45,000 / month',
    skills: 'Office Administration, Facility Management, Vendor Management, Procurement, Compliance',
    description: 'Oversee overall office facilities, admin staff supervision, vendor contracts, AMC management, and seamless daily operations.',
    responsibilities: 'Manage office facilities, maintenance contracts, security, and housekeeping\nNegotiate with suppliers for office equipment, pantry, and IT hardware\nOversee office budget, bills verification, and administrative compliance\nSupervise front desk, office assistants, and support staff',
    qualifications: 'Bachelor\'s or Master\'s degree in Business Administration / Management\n3+ years experience as Office Administrator or Facility Executive\nStrong vendor negotiation and organizational skills',
    additional_requirements: 'Strong leadership, Willingness to manage multi-location facilities'
  },

  // 2. ACCOUNTS
  {
    role: 'Accountant',
    department: 'Accounts & Finance',
    job_category: 'Accounts & Finance',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 2,
    experience: '1–3 Years',
    salary_range: '₹25,000 – ₹38,000 / month',
    skills: 'Tally Prime, GST, TDS, Bank Reconciliation, MS Excel, Financial Auditing',
    description: 'Manage day-to-day accounting entries, bank reconciliations, GST / TDS compliance, and vendor ledger balancing.',
    responsibilities: 'Post daily vouchers, sales invoices, and purchase entries in Tally Prime\nPrepare monthly bank reconciliation statements (BRS)\nAssist in GST returns filing (GSTR-1, GSTR-3B) and TDS computations\nMaintain vendor and client ledger reconciliations and payment tracking',
    qualifications: 'B.Com / M.Com / Inter CA\n1–3 years hands-on accounting experience in engineering or trading firm\nProficiency in Tally Prime and advanced MS Excel (VLOOKUP, Pivot Tables)',
    additional_requirements: 'Knowledge of government GST portal & E-way bills, Good analytical abilities'
  },
  {
    role: 'Account Assistant',
    department: 'Accounts & Finance',
    job_category: 'Accounts & Finance',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 2,
    experience: 'Fresher',
    salary_range: '₹18,000 – ₹24,000 / month',
    skills: 'Basic Accounting, Tally, Invoice Entry, Cash Handling, MS Excel',
    description: 'Support senior accountants with debit/credit entries, bill checking, petty cash management, and financial record filing.',
    responsibilities: 'Assist with data entry of purchase and sales invoices into Tally\nCheck vendor bills against purchase orders and delivery challans\nMaintain petty cash vouchers and weekly replenishment records\nFile tax receipts and coordinate bank document submissions',
    qualifications: 'B.Com graduate or pursuing M.Com\nFreshers with sound debit/credit fundamentals welcome\nFamiliarity with Tally or accounting software',
    additional_requirements: 'High attention to detail, Willingness to learn GST compliance'
  },
  {
    role: 'Billing Executive',
    department: 'Accounts & Finance',
    job_category: 'Accounts & Finance',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '1–3 Years',
    salary_range: '₹22,000 – ₹32,000 / month',
    skills: 'Billing & Invoicing, E-way Bill Generation, GST Invoicing, MS Excel, Dispatch Coordination',
    description: 'Generate commercial tax invoices, delivery challans, and E-way bills for dispatched automation & security hardware.',
    responsibilities: 'Prepare GST-compliant sales invoices and delivery challans for project dispatches\nGenerate E-way bills on the government portal in coordination with logistics\nVerify work completion reports and milestone sign-offs before client billing\nFollow up with clients for payment confirmation and receipt generation',
    qualifications: 'B.Com or relevant degree\n1–3 years experience in commercial billing or dispatch invoicing\nHands-on proficiency with GST portal and E-way bill generation',
    additional_requirements: 'High numerical accuracy, Excellent speed under dispatch deadlines'
  },

  // 3. HUMAN RESOURCES
  {
    role: 'HR Executive',
    department: 'Human Resources',
    job_category: 'HR & Recruitment',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '1–3 Years',
    salary_range: '₹25,000 – ₹40,000 / month',
    skills: 'End-to-End Recruitment, Employee Onboarding, Attendance & Payroll, HR Policies, Communication',
    description: 'Lead talent sourcing across technical, field, and administrative roles, manage employee onboarding, and administer workplace policies.',
    responsibilities: 'Source, screen, and interview candidates for technical, sales, and administrative vacancies\nCoordinate technical interview rounds and issue offer letters\nConduct new joinee onboarding, documentation, and induction programs\nTrack daily biometric attendance and assist with monthly payroll inputs',
    qualifications: 'MBA / PGDM in Human Resources or Graduate with relevant experience\n1–3 years experience in full-cycle recruitment and employee engagement\nStrong communication and organizational skills',
    additional_requirements: 'Hands-on experience with job portals, Professional interpersonal conduct'
  },
  {
    role: 'HR Assistant',
    department: 'Human Resources',
    job_category: 'HR & Recruitment',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: 'Fresher',
    salary_range: '₹18,000 – ₹25,000 / month',
    skills: 'HR Administration, Resume Screening, Interview Scheduling, Record Keeping, MS Excel',
    description: 'Assist the HR department with candidate outreach, interview logistics, employee dossiers, and documentation maintenance.',
    responsibilities: 'Screen job applications received through website and portals\nSchedule telephonic and in-person interviews with hiring managers\nMaintain physical and digital employee personal files\nAssist with organizing company team-building events and festive celebrations',
    qualifications: 'Bachelor\'s degree (BBA / BA / B.Com) with interest in HR\nFreshers with energetic attitude and good spoken English/Hindi\nProficient in MS Word and Excel',
    additional_requirements: 'Good communication skills, Eager to build career in Human Resources'
  },

  // 4. ENGINEERING
  {
    role: 'Site Engineer',
    department: 'Engineering',
    job_category: 'Engineering & Technical',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ + Site Deployments',
    openings: 3,
    experience: '1–3 Years',
    salary_range: '₹28,000 – ₹42,000 / month',
    skills: 'Site Supervision, Low-Voltage Cabling, AutoCAD, Safety Compliance, Vendor Coordination',
    description: 'Supervise on-site installation and integration of automation and security systems across pharmaceutical and commercial facilities.',
    responsibilities: 'Supervise site execution for automatic doors, fire alarm panels, and access control\nRead and interpret AutoCAD layout drawings and conduit routing plans\nEnsure subcontractor adherence to site safety standards and project timelines\nCoordinate testing and commissioning milestones with client project managers',
    qualifications: 'B.E. / B.Tech / Diploma in Electrical, Electronics, or Mechanical Engineering\n1–3 years on-site installation experience in building automation or security systems\nAbility to read electrical schematics and site blueprints',
    additional_requirements: 'Willingness to travel to client sites across Maharashtra and Pan-India, Valid driving license'
  },
  {
    role: 'Project Engineer',
    department: 'Engineering',
    job_category: 'Engineering & Technical',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ + Pan-India',
    openings: 2,
    experience: '3–5 Years',
    salary_range: '₹40,000 – ₹60,000 / month',
    skills: 'Project Management, Client Handling, BMS Integration, Commissioning, Team Leadership',
    description: 'Manage turnkey automation projects from kickoff to final handover, managing site teams, materials, and milestone deadlines.',
    responsibilities: 'Formulate project delivery schedules, resource allocation, and material dispatches\nAct as the primary technical point of contact for architects, MEP consultants, and clients\nSupervise site engineers and installation technicians across active projects\nLead final testing, snag rectifications, and client handover sign-offs',
    qualifications: 'B.E. / B.Tech in Electrical / Electronics / Instrumentation Engineering\n3–5 years experience executing security systems, cleanroom automation, or BMS projects\nStrong client presentation and project management skills',
    additional_requirements: 'Willingness to travel, Sound leadership and vendor negotiation'
  },
  {
    role: 'Electrical Engineer',
    department: 'Engineering',
    job_category: 'Engineering & Technical',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 2,
    experience: '1–3 Years',
    salary_range: '₹30,000 – ₹45,000 / month',
    skills: 'Circuit Design, Control Panels, Wiring Schematics, Relay Logic, Power Distribution',
    description: 'Design, test, and troubleshoot electrical control circuits, interlocking control panels, and power distribution subsystems.',
    responsibilities: 'Design low-voltage electrical control panels and relay logic schematics\nPerform panel wiring, continuity testing, and safety trip checks before site dispatches\nCalculate cable sizing, power requirements, and surge protection ratings\nSupport field engineers in troubleshooting complex electrical faults',
    qualifications: 'Diploma or Degree in Electrical / Electronics Engineering\n1–3 years experience with control panels, relays, switches, and industrial power supplies\nProficient in electrical drawings and multimeters/oscilloscopes',
    additional_requirements: 'Valid electrical supervisor license is an advantage'
  },

  // 5. TECHNICAL SERVICES
  {
    role: 'CCTV Technician',
    department: 'Technical Services',
    job_category: 'Engineering & Technical',
    employment_type: 'Full-time',
    location: 'Navi Mumbai & Mumbai Region',
    openings: 4,
    experience: '1–3 Years',
    salary_range: '₹20,000 – ₹30,000 / month',
    skills: 'CCTV Installation, IP Cameras, NVR/DVR Configuration, Cat6 Cabling, Conduit Laying',
    description: 'Install, mount, terminate, and configure IP and HD analog CCTV cameras, NVRs, and security recording systems.',
    responsibilities: 'Install bullet, dome, and PTZ cameras at industrial and commercial client sites\nPull, crimp, and terminate Cat6 Ethernet cables and RG59 coaxial cables\nConfigure NVR/DVR IP addresses, remote mobile viewing, and recording schedules\nTroubleshoot camera offline issues, power supply faults, and video signal loss',
    qualifications: 'ITI / Diploma in Electronics, Hardware & Networking, or Electrical\n1+ years hands-on field experience installing CCTV surveillance systems\nSound knowledge of RJ45 crimping, PoE switches, and network setup',
    additional_requirements: 'Own two-wheeler preferred, Willingness to travel across Mumbai & Navi Mumbai'
  },
  {
    role: 'Electrician',
    department: 'Technical Services',
    job_category: 'Field Staff',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ & Field',
    openings: 3,
    experience: '1–3 Years',
    salary_range: '₹18,000 – ₹26,000 / month',
    skills: 'Electrical Wiring, Conduit Bending, Panel Termination, Multimeter Testing, Fault Finding',
    description: 'Execute field electrical conduit laying, single/three-phase wiring, cable terminations, and power connections for automation gates and barriers.',
    responsibilities: 'Lay electrical conduits, raceways, and trunking at client facilities\nTerminate power supply cables to automatic gates, boom barriers, and cleanroom controllers\nCarry out earthing, insulation resistance checks, and voltage balancing\nAssist service engineers during on-site preventative maintenance visits',
    qualifications: 'ITI Electrician Certificate / Wireman License\n1–3 years experience in commercial or industrial electrical wiring\nUnderstanding of safety PPE and electrical hazards',
    additional_requirements: 'Valid wireman certificate, Own two-wheeler preferred'
  },
  {
    role: 'Service Engineer',
    department: 'Technical Services',
    job_category: 'Engineering & Technical',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ + Field Visits',
    openings: 2,
    experience: '1–3 Years',
    salary_range: '₹25,000 – ₹38,000 / month',
    skills: 'Troubleshooting, AMC Servicing, Motor Controllers, Access Control, Customer Handling',
    description: 'Perform scheduled preventive maintenance and breakdown service calls for automatic entrance systems and access controls.',
    responsibilities: 'Attend customer service calls for breakdown rectifications within SLA timelines\nCarry out quarterly AMC servicing on sliding gates, boom barriers, and turnstiles\nDiagnose mechanical wear, motor controller errors, and sensor misalignment\nPrepare service work orders and obtain customer sign-off',
    qualifications: 'Diploma in Electrical / Mechanical / Electronics Engineering\n1–3 years experience in servicing automatic doors, gates, or security equipment\nPolite customer handling demeanor and technical diagnosis skills',
    additional_requirements: 'Valid two-wheeler license, Willingness to attend emergency breakdown visits'
  },
  {
    role: 'Security System Technician',
    department: 'Technical Services',
    job_category: 'Engineering & Technical',
    employment_type: 'Full-time',
    location: 'Mumbai / Navi Mumbai',
    openings: 3,
    experience: '1–3 Years',
    salary_range: '₹22,000 – ₹32,000 / month',
    skills: 'Access Control, Biometrics, EM Locks, Fire Alarm Systems, Integration',
    description: 'Install and commission biometric fingerprint readers, face recognition access systems, electromagnetic locks, and intruder alarms.',
    responsibilities: 'Mount and wire biometric readers, exit switches, and EM locks on doors\nConnect access control systems to door controller panels and software\nIntegrate cleanroom interlocking panels with emergency fire alarm signals\nConduct testing of sensors, magnetic door contacts, and siren strobe units',
    qualifications: 'ITI / Diploma in Electronics, Electrical, or Telecommunication\n1–3 years experience in electronic security systems\nPractical knowledge of low-voltage DC power supplies and relays',
    additional_requirements: 'Willingness to work flexible site hours, Own two-wheeler preferred'
  },
  {
    role: 'Installation Technician',
    department: 'Technical Services',
    job_category: 'Field Staff',
    employment_type: 'Full-time',
    location: 'Field Deployments',
    openings: 4,
    experience: '1–3 Years',
    salary_range: '₹20,000 – ₹28,000 / month',
    skills: 'Mechanical Installation, Welding & Fabrication, Motor Mounting, Hardware Assembly, Tools Handling',
    description: 'Handle mechanical mounting, bracket fabrication, track leveling, and hardware assembly for automatic sliding doors and rolling shutters.',
    responsibilities: 'Assemble aluminum profiles, track rails, and drive belts for automatic sliding doors\nBolt and weld mounting brackets for heavy industrial boom barriers and turnstiles\nEnsure level alignment, smooth glide, and mechanical balance of sliding systems\nMaintain installation power tools, drills, and scaffolding safely',
    qualifications: 'ITI in Fitter, Welder, Machinist, or equivalent practical mechanical experience\n1–3 years on-site installation experience in doors, gates, or architectural hardware\nPhysically fit and able to lift equipment',
    additional_requirements: 'Willingness to travel to outstation project sites'
  },

  // 6. SALES
  {
    role: 'Sales Executive',
    department: 'Sales & Marketing',
    job_category: 'Sales & Marketing',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ & Field',
    openings: 2,
    experience: '1–3 Years',
    salary_range: '₹25,000 – ₹45,000 / month + Incentives',
    skills: 'B2B Sales, Lead Generation, Product Demonstrations, Negotiation, Client Relationship',
    description: 'Generate new customer leads, pitch HTI automation and security products, and close orders with contractors and enterprise clients.',
    responsibilities: 'Identify and visit architects, MEP consultants, pharma companies, and builders\nPresent HTI product catalogue and arrange technical demonstrations\nPrepare quotation proposals in coordination with technical estimation team\nFollow up on pending inquiries, negotiate terms, and achieve monthly sales targets',
    qualifications: 'Any Bachelor\'s Degree (B.Com / BBA / B.Sc / Diploma in Engineering)\n1–3 years B2B field sales experience, preferably in building materials or security products\nPersuasive communication skills in English, Hindi, and Marathi',
    additional_requirements: 'Own two-wheeler and valid driving license mandatory, Result-oriented mindset'
  },
  {
    role: 'Business Development Executive',
    department: 'Sales & Marketing',
    job_category: 'Sales & Marketing',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 2,
    experience: '3–5 Years',
    salary_range: '₹35,000 – ₹55,000 / month + Incentives',
    skills: 'Corporate BD, Institutional Sales, Tender Bidding, Pharma Sector Relations, Presentation',
    description: 'Develop long-term institutional relationships with pharmaceutical corporations, industrial developers, and large EPC contractors.',
    responsibilities: 'Develop business accounts across Maharashtra and Western India industrial belts\nTrack upcoming greenfield pharmaceutical plants and commercial warehouse tenders\nConduct high-level presentations to Chief Project Engineers and Procurement Heads\nCollaborate with engineering teams to formulate techno-commercial bids',
    qualifications: 'MBA in Marketing / B.E. + MBA preferred\n3+ years experience in technical sales, automation, or industrial security\nStrong network with pharmaceutical or industrial plant contractors',
    additional_requirements: 'Willingness to travel for client conferences and plant visits'
  },
  {
    role: 'Marketing Executive',
    department: 'Sales & Marketing',
    job_category: 'Sales & Marketing',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '1–3 Years',
    salary_range: '₹25,000 – ₹38,000 / month',
    skills: 'Digital Marketing, Social Media, Brochure Design, Exhibition Coordination, Content Writing',
    description: 'Execute marketing campaigns, organize HTI trade exhibition booths, manage product brochures, and boost brand visibility.',
    responsibilities: 'Plan and execute corporate social media updates on LinkedIn, YouTube, and Google\nCoordinate participation in security and pharmaceutical industrial exhibitions\nLiaise with printers and design agencies for brochures, banners, and giveaways\nMaintain customer database and send monthly email newsletters',
    qualifications: 'Degree in Mass Media, Marketing, or Business Communications\n1–3 years experience in corporate marketing or event coordination\nFamiliarity with Canva, MS PowerPoint, and basic photo editing',
    additional_requirements: 'Creative mindset, Good writing and verbal presentation skills'
  },

  // 7. OPERATIONS
  {
    role: 'Operations Executive',
    department: 'Operations',
    job_category: 'Operations & Support',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '1–3 Years',
    salary_range: '₹24,000 – ₹35,000 / month',
    skills: 'Operations Coordination, Site Dispatch, Inventory Tracking, Vendor Coordination, MS Excel',
    description: 'Coordinate operations between engineering, store dispatches, procurement, and on-site deployment schedules.',
    responsibilities: 'Track daily progress of on-going installation sites and flag material shortages\nCoordinate dispatch schedules with store and logistics partners\nMonitor service engineer schedules and customer complaint turnaround times\nMaintain operational MIS reports and update management on milestones',
    qualifications: 'Graduate in any stream (B.Com / B.Sc / BBA)\n1–3 years operational experience in manufacturing or engineering service company\nStrong organizational and multitasking abilities',
    additional_requirements: 'Proficient in MS Excel and phone communication'
  },
  {
    role: 'Store Assistant',
    department: 'Operations',
    job_category: 'Field Staff',
    employment_type: 'Full-time',
    location: 'Navi Mumbai Warehouse',
    openings: 2,
    experience: 'Fresher',
    salary_range: '₹16,000 – ₹22,000 / month',
    skills: 'Material Inward/Outward, Stock Counting, Packing, GRN Entry, Warehouse Safety',
    description: 'Manage warehouse inventory, verify incoming vendor supplies, assist with packing, and ensure safe storage of security equipment.',
    responsibilities: 'Inspect incoming goods against purchase orders and raise Goods Receipt Notes (GRN)\nPack motors, barrier arms, sensors, and cables securely for site transportation\nConduct weekly physical stock audits and report shortages\nKeep warehouse aisles organized, safe, and clean',
    qualifications: '12th Pass or Graduate\nFreshers with enthusiasm and physical stamina welcome\nBasic understanding of counting and record keeping',
    additional_requirements: 'Physical stamina, Basic computer knowledge for store data entry'
  },
  {
    role: 'Logistics Coordinator',
    department: 'Logistics',
    job_category: 'Operations & Support',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '1–3 Years',
    salary_range: '₹22,000 – ₹32,000 / month',
    skills: 'Freight Management, Transporter Negotiation, Dispatch Tracking, E-way Bills, Delivery POD',
    description: 'Manage shipping, transporter bookings, freight rates, dispatch tracking, and delivery confirmations across pan-India sites.',
    responsibilities: 'Book transport vehicles (tempo, container, courier) for site dispatches\nNegotiate competitive freight rates with local and pan-India logistics providers\nTrack transit shipments and provide daily delivery updates to site engineers\nCollect Proof of Delivery (POD) documents and verify freight bills',
    qualifications: 'Graduate with 1–3 years experience in logistics or transport dispatch\nGood network with local transporters in Mumbai/Navi Mumbai\nFamiliarity with transit insurance and E-way bill rules',
    additional_requirements: 'Sharp negotiation skills, Punctual and reliable'
  },

  // 8. SECURITY
  {
    role: 'Security Guard',
    department: 'Security',
    job_category: 'Security & Safety',
    employment_type: 'Full-time',
    location: 'Navi Mumbai Facilities',
    openings: 4,
    experience: 'Fresher',
    salary_range: '₹16,000 – ₹22,000 / month',
    skills: 'Premises Guarding, Visitor Register, Gate Pass Checking, Vigilance, Physical Fitness',
    description: 'Maintain security of company premises, register incoming visitors, check vehicles, and protect company property.',
    responsibilities: 'Guard company entrance gates and conduct regular perimeter patrolling rounds\nVerify identities of visitors, contractors, and delivery personnel in register\nInspect vehicles entering and leaving the compound with gate passes\nMonitor fire alarm panel and report any unauthorized entry or suspicious activity',
    qualifications: '10th Standard Pass\nPhysically fit, alert, and disciplined demeanor\nPrior security guard training or NCC background is an advantage',
    additional_requirements: 'Willingness to work in day / night rotating shifts'
  },
  {
    role: 'Security Supervisor',
    department: 'Security',
    job_category: 'Security & Safety',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ & Yards',
    openings: 1,
    experience: '3–5 Years',
    salary_range: '₹24,000 – ₹32,000 / month',
    skills: 'Security Management, Shift Roster, Emergency Response, CCTV Monitoring, Team Discipline',
    description: 'Oversee security operations, deploy guard rosters, manage emergency protocols, and ensure zero-loss campus safety.',
    responsibilities: 'Supervise security guards across all shifts and conduct daily briefing parades\nMonitor CCTV feed from control desk and investigate security anomalies\nManage visitor pass procedures, parking management, and material inward passes\nCoordinate fire drill exercises and maintain emergency contact readiness',
    qualifications: '12th Pass or Graduate, Ex-serviceman or experienced civilian supervisor\n3+ years experience as Security Supervisor or Head Guard\nStrong leadership and conflict resolution skills',
    additional_requirements: 'Valid security license, First-aid certified preferred'
  },

  // 9. HOUSEKEEPING
  {
    role: 'Housekeeping Staff',
    department: 'Housekeeping',
    job_category: 'Field Staff',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 3,
    experience: 'Fresher',
    salary_range: '₹14,000 – ₹18,000 / month',
    skills: 'Office Cleaning, Sanitization, Dusting, Restroom Hygiene, Waste Disposal',
    description: 'Ensure sparkling cleanliness of executive offices, conference rooms, workstations, and washrooms.',
    responsibilities: 'Dust, sweep, and mop office floors, conference rooms, and reception lobby\nDisinfect washrooms and restock soap, hand towels, and sanitizers\nEmpty trash bins daily and segregate recyclable waste\nAssist in deep-cleaning cleanroom testing laboratories',
    qualifications: 'No formal educational bar; 8th or 10th standard preferred\nHardworking, honest, and dedicated to hygiene\nKnowledge of cleaning chemicals and sanitization tools',
    additional_requirements: 'Punctual, Good hygiene habits'
  },
  {
    role: 'Office Cleaner',
    department: 'Housekeeping',
    job_category: 'Field Staff',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 2,
    experience: 'Fresher',
    salary_range: '₹14,000 – ₹18,000 / month',
    skills: 'Floor Mopping, Glass Cleaning, Pantry Upkeep, Furniture Polishing, Hygiene',
    description: 'Maintain pristine hygiene in office cabins, clean glass partitions, and support pantry cleanliness throughout the workday.',
    responsibilities: 'Clean glass doors, partition windows, and executive desk surfaces\nWash cups, glasses, and pantry utensils after meetings\nWipe down electrical appliances and air vent grills safely\nSupport admin with setup of chairs and tables for team events',
    qualifications: 'Able to read basic signs and labels\nPrior experience in commercial office cleaning is a plus\nPolite and respectful conduct',
    additional_requirements: 'Reliable and diligent'
  },

  // 10. IT & SOFTWARE
  {
    role: 'Software Developer',
    department: 'IT & Software',
    job_category: 'IT & Software',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ / Hybrid',
    openings: 2,
    experience: '1–3 Years',
    salary_range: '₹35,000 – ₹60,000 / month',
    skills: 'React.js, JavaScript, Python, FastAPI, MySQL, REST APIs, Git',
    description: 'Develop and enhance web applications, customer portals, and internal BMS automation interfaces powering HTI systems.',
    responsibilities: 'Build responsive, high-performance web interfaces with React.js\nDevelop RESTful API endpoints and database models using FastAPI and MySQL\nIntegrate real-time telemetry dashboards for door interlocking and security systems\nOptimize page loading speeds and troubleshoot application defects',
    qualifications: 'B.E. / B.Tech / BCA / MCA in Computer Science or IT\n1–3 years hands-on experience building full-stack web applications\nStrong proficiency in React.js, Python, and SQL queries',
    additional_requirements: 'Good problem solving, Self-motivated and quick learner'
  },
  {
    role: 'IT Support Executive',
    department: 'IT & Software',
    job_category: 'IT & Software',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '0–1 Years',
    salary_range: '₹20,000 – ₹28,000 / month',
    skills: 'Desktop Support, LAN Networking, Windows OS, Hardware Troubleshooting, Printer Setup',
    description: 'Provide desktop support, resolve hardware/software issues, maintain office LAN networks, and manage company email accounts.',
    responsibilities: 'Troubleshoot employee laptops, desktops, printers, and network switches\nInstall and update operating systems, antivirus, and business software\nConfigure corporate emails, VPNs, and file sharing permissions\nMaintain inventory of IT hardware and assist with new user setup',
    qualifications: 'Diploma / Degree in IT, Computer Science, or Hardware & Networking (CCNA/MCSE is a plus)\n0–2 years experience in IT desktop and network support\nFriendly attitude when assisting colleagues with tech issues',
    additional_requirements: 'Basic computer knowledge, Active troubleshooting skills'
  }
];

export default function AdminJobModal({
  isOpen,
  onClose,
  initialData = null,
  editingJob = null,
  onJobSaved,
  onSave,
  showFeedback
}) {
  const activeJob = editingJob || initialData;
  const isEditing = Boolean(activeJob && activeJob.id);

  // Form State initialized with defaults
  const [formData, setFormData] = useState({
    title: '',
    department: 'Administration',
    job_category: 'Office & Administration',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: 'Fresher',
    salary_range: '',
    skills: '',
    description: '',
    responsibilities: '',
    qualifications: '',
    additional_requirements: '',
    deadline: '',
    status: 'Published'
  });

  const [filterPresetDept, setFilterPresetDept] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleResetForm = () => {
    setFormData({
      title: '',
      department: 'Administration',
      job_category: 'Office & Administration',
      employment_type: 'Full-time',
      location: 'Navi Mumbai HQ',
      openings: 1,
      experience: 'Fresher',
      salary_range: '',
      skills: '',
      description: '',
      responsibilities: '',
      qualifications: '',
      additional_requirements: '',
      deadline: '',
      status: 'Published'
    });
    setFormErrors({});
  };

  useEffect(() => {
    const jobSource = editingJob || initialData;
    if (jobSource) {
      setFormData({
        title: jobSource.title || '',
        department: jobSource.department || 'Administration',
        job_category: jobSource.job_category || 'Office & Administration',
        employment_type: jobSource.employment_type || 'Full-time',
        location: jobSource.location || 'Navi Mumbai HQ',
        openings: jobSource.openings || 1,
        experience: jobSource.experience || 'Fresher',
        salary_range: jobSource.salary_range || '',
        skills: jobSource.skills || '',
        description: jobSource.description || '',
        responsibilities: jobSource.responsibilities || '',
        qualifications: jobSource.qualifications || '',
        additional_requirements: jobSource.additional_requirements || '',
        deadline: jobSource.deadline || '',
        status: jobSource.status || 'Published'
      });
    } else {
      // Clear for new job
      handleResetForm();
    }
    setFormErrors({});
  }, [initialData, editingJob, isOpen]);

  if (!isOpen) return null;



  const handleApplyPresetRole = (preset) => {
    setFormData((prev) => ({
      ...prev,
      title: preset.role,
      department: preset.department,
      job_category: preset.job_category,
      employment_type: preset.employment_type,
      location: preset.location,
      openings: preset.openings,
      experience: preset.experience,
      salary_range: preset.salary_range,
      skills: preset.skills,
      description: preset.description,
      responsibilities: preset.responsibilities,
      qualifications: preset.qualifications,
      additional_requirements: preset.additional_requirements
    }));
    // Clear errors for auto-filled fields
    setFormErrors({});
    if (showFeedback) {
      showFeedback(`Loaded template for "${preset.role}" (${preset.department})`, 'info');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'openings' ? Math.max(1, parseInt(value, 10) || 1) : value
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.title || !formData.title.trim()) {
      errors.title = 'Job title is required';
    }
    if (!formData.department || !formData.department.trim()) {
      errors.department = 'Department is required';
    }
    if (!formData.job_category || !formData.job_category.trim()) {
      errors.job_category = 'Job category is required';
    }
    if (!formData.employment_type) {
      errors.employment_type = 'Employment type is required';
    }
    if (!formData.location || !formData.location.trim()) {
      errors.location = 'Work location is required';
    }
    if (!formData.openings || formData.openings < 1) {
      errors.openings = 'At least 1 opening is required';
    }
    if (!formData.experience) {
      errors.experience = 'Experience required is required';
    }
    if (!formData.description || formData.description.trim().length < 15) {
      errors.description = 'Please provide a clear job description (minimum 15 characters)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (targetStatus) => {
    const finalData = {
      ...formData,
      status: targetStatus || formData.status
    };

    if (!validate()) {
      if (showFeedback) {
        showFeedback('Please fill in all required fields highlighted in red.', 'error');
      }
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSave) {
        await onSave(finalData);
        if (onJobSaved) onJobSaved(finalData, isEditing);
        onClose();
        return;
      }

      const targetJobId = activeJob ? activeJob.id : null;
      const url = isEditing && targetJobId ? `/api/jobs/${targetJobId}` : '/api/jobs';
      const method = isEditing && targetJobId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to save job posting');
      }

      const resData = await res.json();
      const savedJob = resData.job || resData.data || finalData;

      if (showFeedback) {
        showFeedback(
          isEditing
            ? `Job "${savedJob.title}" updated successfully (${finalData.status})!`
            : `Job "${savedJob.title}" published successfully (${finalData.status})!`,
          'success'
        );
      }

      if (onJobSaved) {
        onJobSaved(savedJob, isEditing);
      }
      if (onSave) {
        onSave(savedJob, isEditing);
      }
      onClose();
    } catch (err) {
      console.error('Job save error:', err);
      if (showFeedback) {
        showFeedback(err.message || 'Error saving job posting', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter preset roles by selected department tab
  const filteredPresets =
    filterPresetDept === 'All'
      ? UNIVERSAL_SUGGESTED_ROLES
      : UNIVERSAL_SUGGESTED_ROLES.filter((p) => p.department.toLowerCase().includes(filterPresetDept.toLowerCase()));

  const presetDeptTabs = [
    'All',
    'Administration',
    'Accounts & Finance',
    'Human Resources',
    'Engineering',
    'Technical Services',
    'Sales & Marketing',
    'Operations',
    'Security',
    'Housekeeping',
    'IT & Software'
  ];

  return (
    <div
      className="adm-job-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="adm-job-modal-title"
    >
      <div className="adm-job-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* MODAL HEADER */}
        <header className="adm-job-modal-header">
          <div className="adm-job-modal-brand">
            <div className="adm-job-brand-logo">
              <span className="adm-job-logo-text">HTI</span>
              <span className="adm-job-logo-sub">AUTOMATION</span>
            </div>
            <div className="adm-job-header-text">
              <h2 id="adm-job-modal-title" className="adm-job-modal-title">
                {isEditing ? 'Edit Job Posting' : 'Universal Job Recruitment Form'}
              </h2>
              <p className="adm-job-modal-subtitle">
                Publish vacancies for all HTI departments — Administration, Accounts, Engineering, Technical Services, Sales, Operations, Security & Housekeeping.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="adm-job-modal-close-btn"
            onClick={onClose}
            aria-label="Close Job Posting Modal"
          >
            <X size={20} />
          </button>
        </header>

        {/* MODAL BODY */}
        <div className="adm-job-modal-body">
          {/* QUICK-SELECT SUGGESTED ROLES SECTION */}
          <div className="adm-job-presets-section">
            <div className="adm-job-presets-header">
              <div className="adm-job-presets-title">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Quick-Select Suggested HTI Roles (Auto-populates Department, Responsibilities & Skills)</span>
              </div>
              <button
                type="button"
                className="adm-job-reset-btn"
                onClick={handleResetForm}
                title="Clear all fields"
              >
                <RotateCcw size={14} />
                <span>Reset Form</span>
              </button>
            </div>

            {/* Department Filter Pills */}
            <div className="adm-job-preset-tabs">
              {presetDeptTabs.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  className={`adm-job-preset-tab ${filterPresetDept === dept ? 'is-active' : ''}`}
                  onClick={() => setFilterPresetDept(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Suggested Role Pills */}
            <div className="adm-job-preset-chips-grid">
              {filteredPresets.map((preset) => {
                const isSelected = formData.title === preset.role;
                return (
                  <button
                    key={preset.role}
                    type="button"
                    className={`adm-job-preset-chip ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleApplyPresetRole(preset)}
                    title={`Click to auto-populate ${preset.role} (${preset.department})`}
                  >
                    <span className="adm-preset-name">{preset.role}</span>
                    <span className="adm-preset-dept">{preset.department}</span>
                    {isSelected && <Check size={14} className="adm-preset-check" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN FORM */}
          <form className="adm-job-form" onSubmit={(e) => e.preventDefault()}>
            {/* SECTION 1: CORE JOB INFORMATION */}
            <div className="adm-job-section-card">
              <div className="adm-job-section-header">
                <Briefcase size={18} className="adm-section-icon" />
                <h3>A. Job Information & Position Details</h3>
              </div>

              <div className="adm-job-grid-2">
                {/* 1. Job Title */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-title" className="adm-job-label">
                    Job Title <span className="req">*</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <input
                      id="job-title"
                      name="title"
                      type="text"
                      className={`adm-job-input ${formErrors.title ? 'is-error' : ''}`}
                      placeholder="e.g. Office Boy, Accountant, CCTV Technician, Site Engineer"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.title && <span className="adm-job-err-msg">{formErrors.title}</span>}
                </div>

                {/* 2. Department */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-department" className="adm-job-label">
                    Department <span className="req">*</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <select
                      id="job-department"
                      name="department"
                      className={`adm-job-select ${formErrors.department ? 'is-error' : ''}`}
                      value={formData.department}
                      onChange={handleChange}
                    >
                      {DEPARTMENT_OPTIONS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formErrors.department && (
                    <span className="adm-job-err-msg">{formErrors.department}</span>
                  )}
                </div>

                {/* 3. Job Category */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-category" className="adm-job-label">
                    Job Category <span className="req">*</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <select
                      id="job-category"
                      name="job_category"
                      className={`adm-job-select ${formErrors.job_category ? 'is-error' : ''}`}
                      value={formData.job_category}
                      onChange={handleChange}
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formErrors.job_category && (
                    <span className="adm-job-err-msg">{formErrors.job_category}</span>
                  )}
                </div>

                {/* 4. Employment Type */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-employment-type" className="adm-job-label">
                    Employment Type <span className="req">*</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <select
                      id="job-employment-type"
                      name="employment_type"
                      className="adm-job-select"
                      value={formData.employment_type}
                      onChange={handleChange}
                    >
                      {EMPLOYMENT_TYPE_OPTIONS.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Work Location */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-location" className="adm-job-label">
                    Work Location <span className="req">*</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <MapPin size={16} className="adm-input-icon" />
                    <input
                      id="job-location"
                      name="location"
                      type="text"
                      className={`adm-job-input has-icon ${formErrors.location ? 'is-error' : ''}`}
                      placeholder="e.g. Navi Mumbai HQ, Mumbai & Field Sites, Pan-India"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.location && (
                    <span className="adm-job-err-msg">{formErrors.location}</span>
                  )}
                </div>

                {/* 6. Number of Openings */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-openings" className="adm-job-label">
                    Number of Openings <span className="req">*</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <Users size={16} className="adm-input-icon" />
                    <input
                      id="job-openings"
                      name="openings"
                      type="number"
                      min="1"
                      max="100"
                      className={`adm-job-input has-icon ${formErrors.openings ? 'is-error' : ''}`}
                      value={formData.openings}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.openings && (
                    <span className="adm-job-err-msg">{formErrors.openings}</span>
                  )}
                </div>

                {/* 7. Experience Required */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-experience" className="adm-job-label">
                    Experience Required <span className="req">*</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <select
                      id="job-experience"
                      name="experience"
                      className="adm-job-select"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      {EXPERIENCE_OPTIONS.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 8. Salary Range (Optional) */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-salary" className="adm-job-label">
                    Salary Range <span className="opt">(Optional)</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <IndianRupee size={16} className="adm-input-icon" />
                    <input
                      id="job-salary"
                      name="salary_range"
                      type="text"
                      className="adm-job-input has-icon"
                      placeholder="e.g. ₹18,000 – ₹25,000 / month or Competitive"
                      value={formData.salary_range}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* 9. Application Deadline (Optional) */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-deadline" className="adm-job-label">
                    Application Deadline <span className="opt">(Optional)</span>
                  </label>
                  <div className="adm-job-input-wrap">
                    <Calendar size={16} className="adm-input-icon" />
                    <input
                      id="job-deadline"
                      name="deadline"
                      type="date"
                      className="adm-job-input has-icon"
                      value={formData.deadline}
                      onChange={handleChange}
                    />
                  </div>
                  <span className="adm-field-hint">Expired jobs will automatically be hidden publicly.</span>
                </div>

                {/* 10. Job Status */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-status" className="adm-job-label">
                    Job Status <span className="req">*</span>
                  </label>
                  <div className="adm-job-status-picker">
                    <label className={`adm-status-radio-card ${formData.status === 'Published' ? 'is-selected live' : ''}`}>
                      <input
                        type="radio"
                        name="status"
                        value="Published"
                        checked={formData.status === 'Published'}
                        onChange={handleChange}
                      />
                      <span className="status-indicator live" />
                      <div className="status-meta">
                        <span className="status-name">Published (Live)</span>
                        <span className="status-desc">Visible on Career Page popup immediately</span>
                      </div>
                    </label>

                    <label className={`adm-status-radio-card ${formData.status === 'Draft' ? 'is-selected draft' : ''}`}>
                      <input
                        type="radio"
                        name="status"
                        value="Draft"
                        checked={formData.status === 'Draft'}
                        onChange={handleChange}
                      />
                      <span className="status-indicator draft" />
                      <div className="status-meta">
                        <span className="status-name">Draft (Admin Only)</span>
                        <span className="status-desc">Hidden from public website</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: UNIVERSAL SKILLS & JOB DESCRIPTION */}
            <div className="adm-job-section-card">
              <div className="adm-job-section-header">
                <FileText size={18} className="adm-section-icon" />
                <h3>B. Role Overview & Required Skills</h3>
              </div>

              {/* Universal Required Skills */}
              <div className="adm-job-field-group" style={{ marginBottom: '18px' }}>
                <label htmlFor="job-skills" className="adm-job-label">
                  Required Skills <span className="opt">(Universal — Comma separated)</span>
                </label>
                <div className="adm-job-input-wrap">
                  <input
                    id="job-skills"
                    name="skills"
                    type="text"
                    className="adm-job-input"
                    placeholder="e.g. MS Excel, Tally, GST, Electrical Wiring, CCTV Installation, Customer Handling, Office Management"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>
                <span className="adm-field-hint">
                  Works across all roles: Office Management, Filing, Tally, Site Wiring, CCTV Mounting, Sales Pitching, etc.
                </span>
              </div>

              {/* Job Description */}
              <div className="adm-job-field-group">
                <label htmlFor="job-description" className="adm-job-label">
                  Job Description <span className="req">*</span>
                </label>
                <textarea
                  id="job-description"
                  name="description"
                  rows="4"
                  className={`adm-job-textarea ${formErrors.description ? 'is-error' : ''}`}
                  placeholder="Provide a comprehensive summary of the role, daily duties, and how this position contributes to HTI Automation & Security Systems..."
                  value={formData.description}
                  onChange={handleChange}
                />
                {formErrors.description && (
                  <span className="adm-job-err-msg">{formErrors.description}</span>
                )}
              </div>
            </div>

            {/* SECTION 3: RESPONSIBILITIES & QUALIFICATIONS */}
            <div className="adm-job-section-card">
              <div className="adm-job-section-header">
                <Layers size={18} className="adm-section-icon" />
                <h3>C. Detailed Responsibilities & Qualifications</h3>
              </div>

              <div className="adm-job-grid-2">
                {/* Key Responsibilities */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-responsibilities" className="adm-job-label">
                    Key Responsibilities <span className="opt">(One per line)</span>
                  </label>
                  <textarea
                    id="job-responsibilities"
                    name="responsibilities"
                    rows="6"
                    className="adm-job-textarea"
                    placeholder="Enter each responsibility on a new line:&#10;• Daily office maintenance and cleanliness&#10;• Serving refreshments to clients&#10;• Managing inward/outward mail"
                    value={formData.responsibilities}
                    onChange={handleChange}
                  />
                </div>

                {/* Required Qualifications */}
                <div className="adm-job-field-group">
                  <label htmlFor="job-qualifications" className="adm-job-label">
                    Required Qualifications <span className="opt">(One per line)</span>
                  </label>
                  <textarea
                    id="job-qualifications"
                    name="qualifications"
                    rows="6"
                    className="adm-job-textarea"
                    placeholder="Enter each qualification on a new line:&#10;• SSC / 10th Pass or 12th Standard Pass&#10;• Polite communication and punctuality&#10;• Basic understanding of hygiene protocols"
                    value={formData.qualifications}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Additional Requirements (Optional) */}
              <div className="adm-job-field-group" style={{ marginTop: '16px' }}>
                <label htmlFor="job-additional-req" className="adm-job-label">
                  Additional Requirements <span className="opt">(Optional)</span>
                </label>
                <input
                  id="job-additional-req"
                  name="additional_requirements"
                  type="text"
                  className="adm-job-input"
                  placeholder="e.g. Valid driving licence, Willingness to travel, Basic computer knowledge, Good communication skills"
                  value={formData.additional_requirements}
                  onChange={handleChange}
                />
                <span className="adm-field-hint">
                  Specify any license requirements, physical preferences, or shift availability.
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* MODAL FOOTER */}
        <footer className="adm-job-modal-footer">
          <div className="adm-job-footer-left">
            <span className="adm-job-footer-hint">
              <span className="req">*</span> All auto-filled preset fields remain fully editable before saving.
            </span>
          </div>

          <div className="adm-job-footer-actions">
            <button
              type="button"
              className="adm-job-btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="button"
              className="adm-job-btn-draft"
              onClick={() => handleSubmit('Draft')}
              disabled={isSubmitting}
            >
              <Save size={15} />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              className="adm-job-btn-publish"
              onClick={() => handleSubmit('Published')}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Send size={15} />
                  <span>{isEditing ? 'Update Job' : 'Publish Job'}</span>
                </>
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
