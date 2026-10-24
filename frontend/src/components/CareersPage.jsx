import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Briefcase, ArrowRight, Users, Cpu, ShieldCheck, Award,
  X, MapPin, Clock, Building2, CheckCircle2, Mail, Send, TrendingUp,
  Sparkles, Phone, FileText, UploadCloud, AlertCircle, Loader2,
  Plus, Minus, Heart, Zap, Globe, Target, ChevronLeft, ChevronRight, Check,
  Truck, Home
} from 'lucide-react';
import './Careers.css';
import CareersHero from './CareersHero';
import CareersApply from './CareersApply';
import CareersProcess from './CareersProcess';

const JOB_POSITIONS = [
  {
    id: 'site-engineer',
    title: 'Site Engineer – Automation & Security',
    category: 'engineering',
    categoryLabel: 'Engineering',
    subtitle: 'Full-Time · Field Commissioning · Mumbai & Pan-India Sites',
    department: 'Site Operations & Commissioning',
    location: 'Mumbai HQ + Pan-India Site Deployments',
    employmentType: 'Full-Time',
    experience: '1 – 4 Years',
    summary: 'Execute end-to-end on-site installation, wiring, commissioning, and handover of industrial automation systems including automatic doors, boom barriers, CCTV, fire alarm panels, and cleanroom door interlocks at pharmaceutical, corporate, and logistics client sites across India.',
    responsibilities: [
      'Install, wire, and commission automatic sliding/swing doors, boom barriers, rolling shutters, and motorized gate systems.',
      'Deploy and configure CCTV cameras (IP & analog), biometric access systems, and video door phones.',
      'Perform site surveys, cable routing, electrical DB work, and loop testing for fire alarm and gas detection systems.',
      'Liaise with clients, MEP contractors, and project managers to ensure on-time, zero-punch-list handovers.',
      'Prepare site completion reports, as-built drawings, and maintenance documentation.'
    ],
    requirements: [
      'Diploma or B.E. in Electrical, Electronics, Instrumentation, or Mechatronics Engineering.',
      'Hands-on experience with relay-based control panels, DC motors, or industrial wiring is strongly preferred.',
      'Willingness to travel to client sites across Maharashtra and other states as required.',
      'Strong attention to detail, ability to read electrical schematics, and client-facing communication skills.'
    ]
  },
  {
    id: 'site-supervisor',
    title: 'Site Supervisor',
    category: 'engineering',
    categoryLabel: 'Engineering',
    subtitle: 'Full-Time · Site Operations & Project Execution · Pan-India Sites',
    department: 'Site Operations & Field Execution',
    location: 'Navi Mumbai HQ + Pan-India Project Sites',
    employmentType: 'Full-Time',
    experience: '2 – 5 Years',
    summary: 'Supervise on-site installation, mechanical fitting, and electrical cabling of automated doors, boom barriers, and cleanroom interlock systems at industrial and commercial project sites across India. Coordinate site workforce, subcontractors, and ensure adherence to safety standards and project timelines.',
    responsibilities: [
      'Supervise on-site mechanical and electrical installation of automated sliding/swing doors, boom barriers, and access control hardware.',
      'Coordinate daily task allocation for field technicians, electricians, and client MEP subcontractors.',
      'Perform quality checks, alignment verifications, cable insulation tests, and ensure safety compliance on site.',
      'Track daily site progress (DPR), manage site inventory and tools, and address client punch-lists promptly.',
      'Liaise between client site engineers and HTI project managers to maintain handover schedules.'
    ],
    requirements: [
      'Diploma or Degree in Electrical, Mechanical, Instrumentation, or Civil Engineering.',
      '2+ years experience in supervising site execution for building automation, MEP, or industrial installations.',
      'Practical understanding of electrical schematics, mechanical drawings, and site safety protocols.',
      'Strong communication, leadership skills, and willingness to travel for out-of-station site deployments.'
    ]
  },
  {
    id: 'site-engineer-field',
    title: 'Site Engineer',
    category: 'engineering',
    categoryLabel: 'Engineering',
    subtitle: 'Full-Time · Installation & Commissioning · Pan-India Sites',
    department: 'Field Engineering & Commissioning',
    location: 'Navi Mumbai HQ + Pan-India Project Sites',
    employmentType: 'Full-Time',
    experience: '1 – 3 Years',
    summary: 'Execute on-site installation, termination, wiring, testing, and commissioning for automated entry systems, access control units, and industrial security solutions at client facilities. Troubleshoot electrical and mechanical systems to ensure smooth handovers.',
    responsibilities: [
      'Perform hands-on installation, cable termination, and loop testing of door controllers, sensors, and access panels.',
      'Conduct power-up commissioning, calibration of sensors, and trial testing for automatic doors and gate systems.',
      'Troubleshoot on-site electrical, wiring, and mechanical alignment issues under senior guidance.',
      'Assist in site surveys, measurement verifications, and material readiness checks prior to installation.',
      'Prepare site test reports, commissioning sign-off sheets, and client handover documentation.'
    ],
    requirements: [
      'Diploma or B.E. in Electrical, Electronics, Instrumentation, or Mechatronics Engineering.',
      'Hands-on experience with control panels, DC/AC motors, multimeters, and low-voltage field wiring.',
      'Willingness to travel for field installations at pharmaceutical, logistics, and commercial sites pan-India.',
      'Good analytical skills, attention to safety norms, and disciplined work approach.'
    ]
  },
  {
    id: 'sales-executive',
    title: 'Sales Executive',
    category: 'sales',
    categoryLabel: 'Sales',
    subtitle: 'Full-Time · Client Acquisition & Inquiries · Navi Mumbai HQ',
    department: 'Sales & Business Development',
    location: 'Turbhe, Navi Mumbai HQ',
    employmentType: 'Full-Time',
    experience: '1 – 3 Years',
    summary: 'Drive sales of HTI Automation\'s physical security, automatic doors, and cleanroom interlock solutions. Identify prospective B2B clients, handle incoming inquiries, present product capabilities, and coordinate with technical teams to generate commercial quotes.',
    responsibilities: [
      'Identify and prospect new B2B accounts across industrial manufacturing, warehousing, pharma, and commercial realty.',
      'Follow up on incoming sales leads, qualify client requirements, and conduct introductory product presentations.',
      'Work closely with technical estimation teams to prepare accurate quotations, tender responses, and BOQs.',
      'Maintain systematic follow-ups with prospective clients, handle commercial negotiations, and assist in closing deals.',
      'Track client feedback, pipeline status in CRM, and submit weekly sales progress reports.'
    ],
    requirements: [
      'Bachelor\'s Degree in Business, Marketing, Engineering, or relevant diploma.',
      '1–3 years experience in B2B direct sales, industrial equipment, architectural products, or MEP systems.',
      'Strong verbal and written communication skills in English and Hindi (working knowledge of Marathi is a plus).',
      'Self-motivated, relationship-oriented, and comfortable with client meetings and consultative selling.'
    ]
  },
  {
    id: 'accountant',
    title: 'Accountant',
    category: 'operations',
    categoryLabel: 'Operations',
    subtitle: 'Full-Time · Accounts & Tax Compliance · Navi Mumbai HQ',
    department: 'Finance & Accounts',
    location: 'Turbhe, Navi Mumbai HQ',
    employmentType: 'Full-Time',
    experience: '2 – 5 Years',
    summary: 'Manage day-to-day accounts, vendor invoices, client billing, bank reconciliations, and statutory tax compliance (GST, TDS, PF/ESIC) for HTI Automation. Maintain accurate financial books and support periodic audits.',
    responsibilities: [
      'Record daily accounting transactions, journal entries, and bank vouchers in Tally / ERP software.',
      'Process vendor bills, verify purchase orders against delivery challans, and schedule timely vendor payments.',
      'Generate GST-compliant client invoices, track accounts receivable, and follow up on outstanding payments.',
      'Prepare monthly GST returns (GSTR-1, GSTR-3B) and compute TDS deductions in line with tax regulations.',
      'Perform monthly bank reconciliations, vendor ledger reconciliations, and assist auditors during financial audits.'
    ],
    requirements: [
      'B.Com / M.Com or equivalent degree in Accounting / Finance.',
      '2–5 years of accounting experience in a manufacturing, engineering contracting, or trading business.',
      'Proficiency in Tally Prime, MS Excel (VLOOKUP, pivot tables), and GST / Income Tax portal workflows.',
      'High numerical accuracy, integrity, and sound knowledge of TDS and GST compliance.'
    ]
  },
  {
    id: 'office-boy',
    title: 'Office Boy',
    category: 'operations',
    categoryLabel: 'Operations',
    subtitle: 'Full-Time · Office Support & Upkeep · Navi Mumbai HQ',
    department: 'Office Administration',
    location: 'Turbhe, Navi Mumbai HQ',
    employmentType: 'Full-Time',
    experience: '1 – 3 Years',
    summary: 'Ensure smooth daily office operations by maintaining cleanliness, managing pantry services, handling local banking and courier errands, and assisting office staff and visitors with daily administrative support.',
    responsibilities: [
      'Maintain overall office cleanliness, organize conference rooms, and ensure workstations are orderly.',
      'Manage pantry services, prepare tea and coffee, and serve refreshments to team members, clients, and visitors.',
      'Carry out local banking errands (cheque deposits), courier drop-offs, and local document collections.',
      'Assist with office stationery inventory, printing, photocopying, and basic material handling in the office.',
      'Support administrative staff with daily errands and coordinate with building housekeeping when required.'
    ],
    requirements: [
      'Minimum 10th or 12th pass (SSC / HSC).',
      '1+ years of prior experience in an office boy, pantry boy, or support staff role.',
      'Polite, punctual, honest, and helpful attitude with a clean personal presentation.',
      'Familiarity with Navi Mumbai local routes and transport.'
    ]
  },
  {
    id: 'dispatch-manager',
    title: 'Dispatch Manager',
    category: 'operations',
    categoryLabel: 'Operations',
    subtitle: 'Full-Time · Logistics & Material Dispatch · Navi Mumbai HQ',
    department: 'Supply Chain & Logistics',
    location: 'Turbhe, Navi Mumbai HQ',
    employmentType: 'Full-Time',
    experience: '3 – 6 Years',
    summary: 'Oversee warehouse dispatch operations, equipment packing, e-Way bill documentation, and transporter logistics to ensure timely and damage-free delivery of automation systems and components to project sites across India.',
    responsibilities: [
      'Plan, coordinate, and supervise daily material packing, staging, loading, and dispatch to project sites.',
      'Generate delivery challans, packing lists, e-Way bills, and transport documentation in compliance with GST norms.',
      'Coordinate with logistics partners, freight transporters, and couriers to negotiate rates and secure timely deliveries.',
      'Maintain warehouse inventory records, track in-transit consignments, and update project teams on dispatch status.',
      'Inspect outgoing and incoming materials for quality, quantity, and packaging integrity to minimize transit damage.'
    ],
    requirements: [
      'Bachelor\'s Degree or Diploma in Commerce, Logistics, Supply Chain, or equivalent discipline.',
      '3–6 years experience in dispatch management or warehouse logistics, preferably in engineering or manufacturing.',
      'Strong practical knowledge of e-Way bills, GST transport compliance, delivery challans, and inventory tracking.',
      'Excellent coordination and vendor management skills under dynamic project delivery schedules.'
    ]
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Roles' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'operations', label: 'Operations' }
];

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'What types of roles does HTI Automation hire for?',
    answer: 'We hire across four domains: Engineering (site commissioning, supervision, PLC/automation, software development), Sales (B2B enterprise accounts and business development), Operations (accounts, office administration, and dispatch logistics), and Marketing (digital campaigns and technical content). All roles are based in our Mumbai / Navi Mumbai HQ, with engineering and field positions requiring pan-India site travel.'
  },
  {
    id: 'faq-2',
    question: 'Can fresh graduates or diploma holders apply?',
    answer: 'Yes — particularly for our Site Engineer role, we welcome diploma holders in Electrical, Electronics, or Mechatronics with strong practical skills. For software roles, a strong project portfolio speaks louder than a degree. We value hands-on ability and a learning mindset.'
  },
  {
    id: 'faq-3',
    question: 'What is the interview and selection process?',
    answer: 'Our process is straightforward: (1) Resume screening by our HR and technical team, (2) Introductory phone or video call, (3) Technical or role-specific discussion with the department head, and (4) Final decision and offer. The entire process typically takes 1–2 weeks.'
  },
  {
    id: 'faq-4',
    question: 'Do site engineer roles require extensive travel?',
    answer: 'Yes — site engineering roles involve regular travel to client facilities across Maharashtra and other states for installation, commissioning, and handover. Travel expenses, lodging, and daily allowances are fully covered by HTI for all out-of-station assignments.'
  },
  {
    id: 'faq-5',
    question: 'What growth opportunities are available at HTI?',
    answer: 'HTI is a growing company with a strong project pipeline. Engineers who demonstrate technical excellence progress to Senior Engineer, Project Lead, and Department Head roles. Sales professionals grow into Regional Managers as we expand across India. We strongly promote from within.'
  },
  {
    id: 'faq-6',
    question: 'How can I submit my application?',
    answer: 'Use the application form on this page — fill in your details and click Submit. Your email client will open with your details pre-filled; simply attach your resume and send. You may also email your CV directly to careers@htisystems.in with the subject "Application: [Role Name]".'
  },
  {
    id: 'faq-7',
    question: 'How can I contact the recruitment team?',
    answer: 'You can contact our talent acquisition and HR team directly via email at careers@htisystems.in or by calling +91 9992756077 / 9594917010 during office hours (Monday to Saturday, 9:00 AM – 6:30 PM IST). Our corporate headquarters is located at Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703.'
  }
];

const STATS = [
  { value: '10+', label: 'Years of Excellence', sub: 'Serving India since 2014' },
  { value: '100+', label: 'Client Installations', sub: 'Pharma, corporate & logistics' },
  { value: '500+', label: 'Projects Delivered', sub: 'Across 15+ states pan-India' },
  { value: `${JOB_POSITIONS.length}`, label: 'Open Positions', sub: 'Join our growing team today' },
];

const CAREER_ROLES = [
  {
    id: 'site-supervisor',
    num: '01',
    title: 'Site Supervisor',
    category: 'Engineering & Projects',
    roleTitle: 'Site Supervisor',
    icon: ShieldCheck,
    color: 'cyan',
    summary: 'Supervise on-site mechanical fitting and electrical cabling of automated entry systems while leading field crews, subcontractors, and safety compliance.'
  },
  {
    id: 'site-engineer',
    num: '02',
    title: 'Site Engineer',
    category: 'Engineering & Projects',
    roleTitle: 'Site Engineer',
    icon: Cpu,
    color: 'blue',
    summary: 'Execute on-site installation, termination, wiring, testing, and commissioning of automated entry systems, access control units, and security solutions.'
  },
  {
    id: 'sales-executive',
    num: '03',
    title: 'Sales Executive',
    category: 'Sales',
    roleTitle: 'Sales Executive',
    icon: TrendingUp,
    color: 'amber',
    summary: 'Drive B2B sales for automatic doors and cleanroom interlocks by qualifying prospective inquiries, presenting solutions, and closing commercial quotes.'
  },
  {
    id: 'accountant',
    num: '04',
    title: 'Accountant',
    category: 'Finance & Administration',
    roleTitle: 'Accountant',
    icon: FileText,
    color: 'emerald',
    summary: 'Manage daily accounting transactions, vendor invoices, client billing, bank reconciliations, and statutory GST and TDS tax compliance in Tally Prime.'
  },
  {
    id: 'office-boy',
    num: '05',
    title: 'Office Boy',
    category: 'Office Support',
    roleTitle: 'Office Boy',
    icon: Building2,
    color: 'rose',
    summary: 'Ensure smooth daily office operations through workspace upkeep, pantry management, document handling, and administrative assistance for the team.'
  },
  {
    id: 'dispatch-manager',
    num: '06',
    title: 'Dispatch Manager',
    category: 'Logistics & Operations',
    roleTitle: 'Dispatch Manager',
    icon: Truck,
    color: 'red',
    summary: 'Oversee warehouse dispatch operations, equipment packing, e-Way bills, and transporter logistics to ensure timely and damage-free site deliveries.'
  }
];

const BENEFITS = CAREER_ROLES;

export default function CareersPage({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRole, setSelectedRole] = useState(null);

  // Scroll-driven horizontal benefits section refs and state
  const whySectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [maxHorizontalOverflow, setMaxHorizontalOverflow] = useState(0);
  const [pinnedScrollDistance, setPinnedScrollDistance] = useState(0);
  const [isPinnedEnabled, setIsPinnedEnabled] = useState(false);
  const [navHeight, setNavHeight] = useState(96);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', position: '',
    experience: '', noticePeriod: '', agreePrivacy: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => setOpenFaqIndex(prev => prev === index ? null : index);

  // Measure track overflow and compute responsive, proportional pinned scroll range
  useEffect(() => {
    const updateMetrics = () => {
      const isLargeScreen = window.innerWidth > 992;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isLargeScreen || prefersReducedMotion) {
        setIsPinnedEnabled(false);
        setMaxHorizontalOverflow(0);
        setPinnedScrollDistance(0);
        return;
      }

      setIsPinnedEnabled(true);

      // Measure sticky navbar height dynamically to align sticky viewport
      const navEl = document.querySelector('.navbar-wrapper');
      const nh = navEl ? navEl.offsetHeight : 96;
      setNavHeight(nh);
      document.documentElement.style.setProperty('--hti-navbar-height', `${nh}px`);

      if (trackRef.current && viewportRef.current) {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        const trackWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;

        // Exact horizontal travel needed to bring the 6th card comfortably into view
        const overflow = Math.max(0, trackWidth - viewportWidth);
        setMaxHorizontalOverflow(overflow);

        // Derive vertical scroll range from actual card step dimensions and track overflow
        const cardEl = track.querySelector('.why-benefit-card');
        const cardWidth = cardEl ? cardEl.offsetWidth : 320;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.gap) || 20;
        const stepWidth = cardWidth + gap;
        const steps = overflow > 0 ? overflow / stepWidth : 1;

        // Proportional vertical travel adapted to viewport height:
        // ~140px on short viewports (< 700px), ~160px on standard desktop
        const vh = window.innerHeight;
        const perStep = vh < 700 ? 140 : 160;
        const calculatedDistance = Math.round(steps * perStep);
        const finalDistance = Math.max(420, Math.min(800, calculatedDistance));
        setPinnedScrollDistance(finalDistance);
      }
    };

    updateMetrics();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateMetrics, 60);
    };

    window.addEventListener('resize', onResize);

    const observer = new ResizeObserver(() => {
      updateMetrics();
    });

    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  // Sync vertical scroll with horizontal track translation
  useEffect(() => {
    if (!isPinnedEnabled || pinnedScrollDistance <= 0 || maxHorizontalOverflow <= 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!whySectionRef.current) return;
      const rect = whySectionRef.current.getBoundingClientRect();

      // Pinning begins when top of section reaches bottom of sticky navbar (navHeight)
      const scrolledInsidePinned = navHeight - rect.top;

      if (scrolledInsidePinned <= 0) {
        setScrollProgress(0);
        setActiveCardIndex(0);
      } else if (scrolledInsidePinned >= pinnedScrollDistance) {
        setScrollProgress(1);
        setActiveCardIndex(CAREER_ROLES.length - 1);
      } else {
        // Continuous, proportional progress that reverses smoothly on upward scroll
        const rawProgress = scrolledInsidePinned / pinnedScrollDistance;
        setScrollProgress(rawProgress);

        // Update active card counter based on proportional scroll progress
        const activeIdx = Math.min(
          CAREER_ROLES.length - 1,
          Math.max(0, Math.round(rawProgress * (CAREER_ROLES.length - 1)))
        );
        setActiveCardIndex(activeIdx);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isPinnedEnabled, pinnedScrollDistance, maxHorizontalOverflow, navHeight]);

  // Touch scroll on mobile track
  const handleMobileTrackScroll = () => {
    if (isPinnedEnabled || !trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const max = scrollWidth - clientWidth;
    if (max <= 0) return;
    const p = Math.min(1, Math.max(0, scrollLeft / max));
    setScrollProgress(p);
    const cardEl = trackRef.current.querySelector('.why-benefit-card');
    const stepWidth = (cardEl ? cardEl.offsetWidth : 280) + 16;
    const idx = Math.min(CAREER_ROLES.length - 1, Math.round(scrollLeft / stepWidth));
    setActiveCardIndex(idx);
  };

  // Nav arrow click handler - keeps direct navigation and normal scrolling synchronized
  const handleCardNav = (direction) => {
    if (!isPinnedEnabled) {
      if (trackRef.current) {
        const cardWidth = trackRef.current.querySelector('.why-benefit-card')?.offsetWidth || 300;
        trackRef.current.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' });
      }
      return;
    }

    if (pinnedScrollDistance <= 0 || !whySectionRef.current || maxHorizontalOverflow <= 0) return;

    let targetIndex = activeCardIndex + direction;
    targetIndex = Math.max(0, Math.min(CAREER_ROLES.length - 1, targetIndex));

    const targetProgress = targetIndex / (CAREER_ROLES.length - 1);
    const sectionDocTop = window.scrollY + whySectionRef.current.getBoundingClientRect().top;
    const targetY = sectionDocTop - navHeight + (targetProgress * pinnedScrollDistance);

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') setSelectedRole(null); };
    if (selectedRole) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { window.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = ''; };
  }, [selectedRole]);

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const processSelectedFile = (file) => {
    const validExt = ['.pdf', '.doc', '.docx'];
    if (!validExt.some(ext => file.name.toLowerCase().endsWith(ext))) {
      setFormErrors(prev => ({ ...prev, resume: 'Only PDF, DOC, or DOCX files are accepted.' }));
      setResumeFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, resume: 'File size exceeds the 5 MB limit.' }));
      setResumeFile(null);
      return;
    }
    setFormErrors(prev => ({ ...prev, resume: undefined }));
    setResumeFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFormErrors(prev => ({ ...prev, resume: undefined }));
    const fi = document.getElementById('resumeUpload');
    if (fi) fi.value = '';
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (minimum 2 characters).';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    const cleanPhone = formData.phone.replace(/[\s\-\(\)\.]/g, '');
    if (!formData.phone.trim() || cleanPhone.length < 7 || cleanPhone.length > 15) {
      errors.phone = 'Please enter a valid phone number (7–15 digits).';
    }
    if (!formData.position) {
      errors.position = 'Please select the position you are applying for.';
    }
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    if (formErrors.resume) {
      errors.resume = formErrors.resume;
    }
    return errors;
  };

  const validateStep3 = () => {
    const errors = {};
    if (!formData.agreePrivacy) {
      errors.agreePrivacy = 'You must agree to the privacy policy to submit.';
    }
    return errors;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const errors = validateStep1();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        const firstKey = Object.keys(errors)[0];
        const el = document.getElementById(firstKey);
        if (el) el.focus();
        return;
      }
      setFormErrors({});
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const errors = validateStep2();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setFormErrors({});
    }
  };

  const handleGoToStep = (targetStep) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      setFormErrors({});
    } else if (targetStep === 2 && currentStep === 1) {
      handleNextStep();
    } else if (targetStep === 3) {
      const errors1 = validateStep1();
      if (Object.keys(errors1).length > 0) {
        setFormErrors(errors1);
        setCurrentStep(1);
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors1 = validateStep1();
    if (Object.keys(errors1).length > 0) {
      setFormErrors(errors1);
      setCurrentStep(1);
      const firstKey = Object.keys(errors1)[0];
      const el = document.getElementById(firstKey);
      if (el) el.focus();
      return;
    }

    const errors3 = validateStep3();
    if (Object.keys(errors3).length > 0) {
      setFormErrors(errors3);
      const el = document.getElementById('agreePrivacy');
      if (el) el.focus();
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const subject = `Application: ${formData.position} — ${formData.fullName}`;
    const body = [
      `Dear HTI Automation Talent Team,`,
      ``,
      `Please find my application details below:`,
      ``,
      `• Full Name: ${formData.fullName}`,
      `• Email: ${formData.email}`,
      `• Phone: ${formData.phone}`,
      `• Position Applied For: ${formData.position}`,
      `• Years of Experience: ${formData.experience || 'Not specified'}`,
      `• Notice Period: ${formData.noticePeriod || 'Not specified'}`,
      ``,
      resumeFile ? `[Resume attached: "${resumeFile.name}" (${(resumeFile.size / 1024).toFixed(1)} KB) — please attach this file to your email]` : `[Please attach your resume/CV to this email]`,
      ``,
      `Best regards,`,
      formData.fullName
    ].join('\n');

    window.location.href = `mailto:careers@htisystems.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleApplyForRole = (roleTitle) => {
    setSelectedRole(null);
    setFormData(prev => ({ ...prev, position: roleTitle }));
    setFormErrors(prev => ({ ...prev, position: undefined }));
    setCurrentStep(1);
    setSubmitted(false);
    setTimeout(() => {
      const el = document.getElementById('application-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const filteredPositions = activeFilter === 'all' ? JOB_POSITIONS : JOB_POSITIONS.filter(pos => pos.category === activeFilter);

  return (
    <div className="careers-dedicated-page">

      {/* ── BREADCRUMB BAR ───────────────────────────── */}
      <div className="careers-breadcrumb-bar">
        <div className="careers-breadcrumb-container">
          <nav className="careers-breadcrumb-nav" aria-label="Breadcrumb">
            <button
              type="button"
              className="careers-breadcrumb-link"
              onClick={() => onNavigate && onNavigate('home')}
            >
              <Home size={14} className="careers-breadcrumb-home-icon" />
              <span>Home</span>
            </button>

            <ChevronRight size={13} className="careers-breadcrumb-divider" aria-hidden="true" />

            <div className="careers-breadcrumb-active-badge" aria-current="page">
              <Briefcase size={13} className="careers-badge-icon" />
              <span>Careers</span>
            </div>

            <div className="careers-hiring-badge" aria-label="Status: We're Hiring">
              <span className="careers-hiring-pulse" aria-hidden="true">
                <span className="careers-pulse-dot" />
                <span className="careers-pulse-ring" />
              </span>
              <span>We're Hiring · 6 Roles</span>
            </div>
          </nav>

          <button
            type="button"
            className="careers-back-btn"
            onClick={() => onNavigate && onNavigate('home')}
            aria-label="Back to Home"
          >
            <ArrowLeft size={14} className="careers-back-arrow" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────── */}
      <CareersHero scrollTo={scrollTo} />



      {/* ── OPEN POSITIONS ───────────────────────────── */}
      {/* <section className="careers-positions-section" id="open-positions" aria-label="Open Positions">
        <div className="container">
          <div className="positions-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span>CURRENT OPPORTUNITIES</span>
          </div>
          <h2 className="positions-heading">Open Positions</h2>
          <div className="positions-intro-grid">
            <div className="positions-intro-lead">
              We are actively hiring across engineering, sales, operations, and marketing.
            </div>
            <div className="positions-intro-desc">
              <p>At HTI Automation, every role contributes directly to real industrial systems that protect pharma cleanrooms, secure corporate campuses, and automate India's most critical facilities.</p>
            </div>
          </div>

          <div className="positions-filters-wrap" role="tablist" aria-label="Job category filters">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = tab.id === 'all' ? JOB_POSITIONS.length : JOB_POSITIONS.filter(p => p.category === tab.id).length;
              return (
                <button key={tab.id} role="tab" aria-selected={isActive}
                  className={`positions-filter-tab ${isActive ? 'filter-active' : ''}`}
                  onClick={() => setActiveFilter(tab.id)}>
                  <span>{tab.label}</span>
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="positions-listings-list" role="list">
            {filteredPositions.map((job, idx) => (
              <div
                key={`${activeFilter}-${job.id}`}
                className="job-row-card"
                role="listitem"
                tabIndex={0}
                style={{ '--card-index': idx }}
                onClick={() => setSelectedRole(job)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedRole(job); } }}
              >
                <div className="job-row-left">
                  <span className={`job-row-badge badge-${job.category}`}>{job.categoryLabel}</span>
                  <div className="job-row-content">
                    <h3 className="job-row-title">{job.title}</h3>
                    <div className="job-row-meta">
                      <span className="meta-chip"><MapPin size={12} />{job.location}</span>
                      <span className="meta-chip"><Clock size={12} />{job.experience}</span>
                      <span className="meta-chip"><Briefcase size={12} />{job.employmentType}</span>
                    </div>
                  </div>
                </div>
                <div className="job-row-action">
                  <button type="button" className="job-view-btn"
                    onClick={(e) => { e.stopPropagation(); setSelectedRole(job); }}
                    aria-label={`View details for ${job.title}`}>
                    <span>View Role</span>
                    <ArrowRight size={16} className="job-view-arrow" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="positions-open-cta">
            <p>Don't see a suitable role? Send your CV directly to{' '}
              <a href="mailto:careers@htisystems.in" className="positions-email-link">careers@htisystems.in</a> — we review every application.
            </p>
          </div>
        </div>
      </section> */}

      {/* ── LIFE AT HTI (Scroll-Driven Pinned Horizontal Track) ── */}
      <section
        className={`careers-why-section ${isPinnedEnabled ? 'why-section-pinned-mode' : 'why-section-flow-mode'}`}
        id="life-at-hti"
        aria-label="Life at HTI Automation"
        ref={whySectionRef}
        style={
          isPinnedEnabled && pinnedScrollDistance > 0
            ? { height: `calc(100vh - ${navHeight}px + ${pinnedScrollDistance}px)` }
            : undefined
        }
      >
        <div className="why-sticky-viewport">
          <div className="container why-layout-container">
            <div className="why-horizontal-grid">

              {/* Left Column: Pinned Introduction */}
              <div className="why-pinned-left-col">
                <div className="why-pinned-eyebrow">
                  <span className="why-pinned-dot" aria-hidden="true" />
                  <span>JOIN OUR TEAM</span>
                </div>

                <h2 className="why-pinned-heading">
                  Find your place at <span className="why-heading-highlight">HTI.</span>
                </h2>

                <p className="why-pinned-desc">
                  Explore opportunities to join our team at HTI Automation. From on-site engineering and operations to sales and administration, discover a role where you can contribute and grow.
                </p>

                {/* Interactive Progress & Nav Controls */}
                <div className="why-scroll-controls" aria-label="Job opportunities navigation">
                  <div className="why-progress-track" aria-hidden="true">
                    <div
                      className="why-progress-bar"
                      style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                    />
                  </div>

                  <div className="why-controls-bottom-row">
                    <div className="why-card-counter">
                      <span className="counter-current">0{activeCardIndex + 1}</span>
                      <span className="counter-slash">/</span>
                      <span className="counter-total">0{CAREER_ROLES.length}</span>
                      <span className="counter-hint">{isPinnedEnabled ? 'Scroll to explore' : 'Swipe to explore'}</span>
                    </div>

                    <div className="why-nav-arrows">
                      <button
                        type="button"
                        className="why-nav-btn btn-prev"
                        onClick={() => handleCardNav(-1)}
                        disabled={activeCardIndex === 0 && scrollProgress <= 0.02}
                        aria-label="Previous job role"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        className="why-nav-btn btn-next"
                        onClick={() => handleCardNav(1)}
                        disabled={activeCardIndex === CAREER_ROLES.length - 1 || scrollProgress >= 0.98}
                        aria-label="Next job role"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Horizontal Cards Viewport & Track */}
              <div className="why-track-viewport" ref={viewportRef}>
                <div
                  className="why-horizontal-track"
                  ref={trackRef}
                  onScroll={handleMobileTrackScroll}
                  style={
                    isPinnedEnabled && maxHorizontalOverflow > 0
                      ? { transform: `translate3d(-${(scrollProgress * maxHorizontalOverflow).toFixed(1)}px, 0, 0)` }
                      : undefined
                  }
                  role="list"
                >
                  {CAREER_ROLES.map((role, i) => {
                    const Icon = role.icon;
                    const isActive = activeCardIndex === i;
                    return (
                      <div
                        key={role.id || i}
                        className={`why-benefit-card benefit-color-${role.color} ${isActive ? 'card-active' : ''}`}
                        role="listitem"
                        tabIndex={0}
                        aria-label={`${role.title} — ${role.category}`}
                      >
                        <div className="card-top-row">
                          <div className={`card-icon-shell shell-color-${role.color}`} aria-hidden="true">
                            <Icon size={22} className="card-icon-svg" />
                          </div>
                          <span className="card-index-num" aria-hidden="true">{role.num}</span>
                        </div>

                        <div className="card-content">
                          <div className="card-role-category-tag">
                            <span className="card-tag-dot" aria-hidden="true" />
                            <span className="card-tag-text">{role.category}</span>
                          </div>
                          <h3 className="card-title">{role.title}</h3>
                          <p className="card-desc">{role.summary}</p>
                        </div>

                        <div className="card-action-row">
                          <button
                            type="button"
                            className="card-apply-btn"
                            onClick={() => handleApplyForRole(role.roleTitle)}
                            aria-label={`Apply for ${role.title}`}
                          >
                            <span>Apply Now</span>
                            <ArrowRight size={14} className="card-apply-arrow" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── HIRING PROCESS (Commissioning Sequence) ─── */}
      <CareersProcess scrollTo={scrollTo} />

      {/* ── APPLICATION FORM ─────────────────────────── */}
      <CareersApply selectedPosition={formData.position} onNavigate={onNavigate} />

      {/* ── FAQ ──────────────────────────────────────── */}
      {/* <section className="careers-faq-section" id="faq" aria-label="Frequently Asked Questions">
        <div className="container">
          <div className="faq-editorial-grid">
            <div className="faq-header-col">
              <div className="faq-eyebrow">
                <span className="faq-eyebrow-line" aria-hidden="true" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="faq-heading">Got questions?<br />We've got answers.</h2>
              <p className="faq-intro-text">Everything you need to know before taking the next step in your career with HTI Automation.</p>
              <div className="faq-help-box">
                <span className="faq-help-label">Still have questions?</span>
                <p className="faq-help-text">Reach our HR team at{' '}
                  <a href="mailto:careers@htisystems.in" className="faq-help-link">careers@htisystems.in</a>
                </p>
              </div>
            </div>
            <div className="faq-accordion-col">
              <div className="faq-accordion-list" role="presentation">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={item.id} className={`faq-item ${isOpen ? 'is-expanded' : ''}`}>
                      <button type="button" className="faq-trigger" onClick={() => toggleFaq(idx)} aria-expanded={isOpen}>
                        <span className="faq-question-text">{item.question}</span>
                        <span className="faq-icon-wrapper" aria-hidden="true">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
                      </button>
                      <div className={`faq-answer-panel ${isOpen ? 'is-open' : ''}`}>
                        <div className="faq-answer-inner">
                          <p className="faq-answer-text">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── ROLE DETAILS MODAL ───────────────────────── */}
      {selectedRole && (
        <div className="role-modal-overlay" onClick={() => setSelectedRole(null)}
          role="dialog" aria-modal="true" aria-labelledby="modal-role-title">
          <div className="role-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="role-modal-header">
              <div className="role-modal-title-group">
                <div className="role-modal-badges">
                  <span className={`role-badge-category badge-${selectedRole.category}`}>{selectedRole.categoryLabel}</span>
                  <span className="role-badge-type">{selectedRole.employmentType}</span>
                </div>
                <h3 id="modal-role-title" className="role-modal-title">{selectedRole.title}</h3>
                <div className="role-modal-meta-row">
                  <span className="role-meta-item"><Building2 size={14} className="meta-icon" /><span>{selectedRole.department}</span></span>
                  <span className="role-meta-sep">•</span>
                  <span className="role-meta-item"><MapPin size={14} className="meta-icon" /><span>{selectedRole.location}</span></span>
                  <span className="role-meta-sep">•</span>
                  <span className="role-meta-item"><Clock size={14} className="meta-icon" /><span>{selectedRole.experience} Experience</span></span>
                </div>
              </div>
              <button type="button" className="role-modal-close-btn" onClick={() => setSelectedRole(null)} aria-label="Close"><X size={20} /></button>
            </div>
            <div className="role-modal-body">
              <div className="role-modal-section">
                <h4 className="role-section-heading">Role Overview</h4>
                <p className="role-section-text">{selectedRole.summary}</p>
              </div>
              <div className="role-modal-section">
                <h4 className="role-section-heading">Key Responsibilities</h4>
                <ul className="role-points-list">
                  {selectedRole.responsibilities.map((r, i) => (
                    <li key={i} className="role-point-item"><CheckCircle2 size={16} className="role-check-icon" /><span>{r}</span></li>
                  ))}
                </ul>
              </div>
              <div className="role-modal-section">
                <h4 className="role-section-heading">Qualifications &amp; Skills</h4>
                <ul className="role-points-list">
                  {selectedRole.requirements.map((r, i) => (
                    <li key={i} className="role-point-item"><CheckCircle2 size={16} className="role-check-icon" /><span>{r}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="role-modal-footer">
              <div className="modal-footer-info"><span>Email your CV to <strong>careers@htisystems.in</strong></span></div>
              <div className="modal-footer-actions">
                <button type="button" className="btn-primary modal-apply-btn" onClick={() => handleApplyForRole(selectedRole.title)}>
                  <FileText size={16} /><span>Apply with Form</span>
                </button>
                <a href={`mailto:careers@htisystems.in?subject=Application for ${encodeURIComponent(selectedRole.title)} - HTI Automation`}
                  className="btn-secondary modal-inquire-btn">
                  <Mail size={16} /><span>Apply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
