import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Briefcase, ArrowRight, Users, Cpu, ShieldCheck, Award,
  X, MapPin, Clock, Building2, CheckCircle2, Mail, Send, TrendingUp,
  Sparkles, Phone, FileText, UploadCloud, AlertCircle, Loader2,
  Plus, Minus, Heart, Zap, Globe, Target
} from 'lucide-react';
import './Careers.css';

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
    id: 'plc-automation-engineer',
    title: 'Automation & PLC Engineer',
    category: 'engineering',
    categoryLabel: 'Engineering',
    subtitle: 'Full-Time · Industrial Controls & Systems · Mumbai HQ',
    department: 'Automation Engineering',
    location: 'Goregaon (West), Mumbai & Site Deployments',
    employmentType: 'Full-Time',
    experience: '2 – 5 Years',
    summary: 'Design, program, and commission PLC-based industrial control systems for cleanroom door interlocks, perimeter defense, and high-speed door automation. Work on complex multi-sensor integration projects for pharma, food, and corporate facility clients.',
    responsibilities: [
      'Program and configure PLCs (Siemens, Delta, Schneider, or equivalent) for interlock sequences and motor drive control.',
      'Design relay logic, wiring diagrams, and control panel schematics for access automation and door interlock systems.',
      'Integrate SCADA dashboards for remote monitoring, alarm management, and audit trail logging.',
      'Conduct FAT and SAT testing for pharma cleanroom compliance.',
      'Ensure all systems meet USFDA 21 CFR Part 11, EN 16005, and IS 2189 fire safety standards.'
    ],
    requirements: [
      'B.E./B.Tech in Electrical, Electronics, Instrumentation, or Control Systems Engineering.',
      'Demonstrated experience programming Siemens S7, Delta DVP, or Allen-Bradley PLCs.',
      'Knowledge of industrial protocols: Modbus RTU/TCP, CANopen, or BACnet.',
      'Familiarity with USFDA cleanroom validation protocols, GMP, and HVAC interlock logic is a strong plus.'
    ]
  },
  {
    id: 'sales-and-business-development',
    title: 'Business Development Executive',
    category: 'sales',
    categoryLabel: 'Sales',
    subtitle: 'Full-Time · Corporate & Enterprise Accounts · Mumbai HQ',
    department: 'Enterprise Sales & Client Accounts',
    location: 'Goregaon (West), Mumbai',
    employmentType: 'Full-Time',
    experience: '2 – 6 Years',
    summary: 'Drive revenue by identifying, pursuing, and converting high-value opportunities across pharmaceutical facilities, corporate campuses, logistics parks, and commercial real estate. Build long-term client relationships and present HTI\'s turnkey automation portfolio.',
    responsibilities: [
      'Prospect and qualify leads across pharma, corporate real estate, logistics, and hospitality sectors.',
      'Conduct site visits, needs assessments, and technical presentations showcasing HTI\'s automation portfolio.',
      'Prepare BOQs, tender documents, commercial proposals, and negotiate contracts through to closure.',
      'Coordinate with engineering and project teams for accurate scope definition and delivery.',
      'Maintain CRM pipeline, track KPIs, and provide monthly revenue forecasts to senior leadership.'
    ],
    requirements: [
      'Proven B2B sales track record in building automation, industrial equipment, MEP, or security systems.',
      'Ability to interpret architectural drawings, MEP tender documents, and technical specifications.',
      'Excellent consultative selling, negotiation, and relationship management capabilities.',
      'Bachelor\'s in Engineering, Business, or equivalent — MBA preferred but not mandatory.'
    ]
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'engineering',
    categoryLabel: 'Engineering',
    subtitle: 'Full-Time · Software & IoT Platforms · Mumbai HQ / Hybrid',
    department: 'IoT & Software Systems',
    location: 'Goregaon (West), Mumbai / Hybrid',
    employmentType: 'Full-Time',
    experience: '2 – 5 Years',
    summary: 'Build and scale web monitoring portals, hardware telemetry dashboards, and client-facing CRM systems that bridge HTI\'s physical automation infrastructure with cloud management platforms.',
    responsibilities: [
      'Develop responsive React frontends for device monitoring dashboards and client-facing web applications.',
      'Build secure RESTful APIs and WebSocket services using Python (FastAPI/Django) or Node.js.',
      'Integrate hardware controllers (door interlocks, CCTV DVRs, access panels) with cloud APIs.',
      'Maintain audit-trail logging, user access management, and enterprise-grade database architectures.',
      'Collaborate with hardware engineers to define interface contracts and telemetry data formats.'
    ],
    requirements: [
      'Strong proficiency in React, JavaScript (ES6+), and modern CSS design systems.',
      'Solid backend experience with Python or Node.js and relational databases (PostgreSQL, MySQL).',
      'Familiarity with MQTT, WebSockets, or IoT telemetry interfaces is a strong advantage.',
      'B.E./B.Tech in Computer Science, IT, or demonstrable project portfolio.'
    ]
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing & Content Specialist',
    category: 'marketing',
    categoryLabel: 'Marketing',
    subtitle: 'Full-Time · Brand & Growth Strategy · Mumbai HQ',
    department: 'Brand Communications & Growth',
    location: 'Goregaon (West), Mumbai',
    employmentType: 'Full-Time',
    experience: '1 – 4 Years',
    summary: 'Strengthen HTI Automation\'s digital presence, execute B2B inbound marketing campaigns, and produce authoritative technical content that builds trust with industrial decision-makers.',
    responsibilities: [
      'Plan and execute targeted B2B campaigns across LinkedIn, Google Search (SEO/SEM), and industry platforms.',
      'Author case studies, technical whitepapers, product brochures, and client success stories.',
      'Manage website SEO performance, track lead conversion analytics, and optimize landing pages.',
      'Coordinate with engineering leads to capture project milestones, certifications, and testimonials.',
      'Manage social media presence (LinkedIn, YouTube), email campaigns, and trade press relations.'
    ],
    requirements: [
      'Experience in B2B digital marketing, content strategy, or growth marketing — industrial or tech sector preferred.',
      'Working knowledge of Google Analytics 4, LinkedIn Campaign Manager, SEMrush, and CMS platforms.',
      'Strong technical writing ability — comfortable converting engineering specs into compelling narratives.',
      'Bachelor\'s in Marketing, Communications, Journalism, or related discipline.'
    ]
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Roles' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' }
];

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'What types of roles does HTI Automation hire for?',
    answer: 'We hire across three domains: Engineering (site commissioning, PLC/automation, software development), Sales (B2B enterprise accounts and business development), and Marketing (digital campaigns and technical content). All roles are based in our Mumbai HQ, with some requiring pan-India site travel.'
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
  { value: '5', label: 'Open Positions', sub: 'Join our growing team today' },
];

const BENEFITS = [
  { icon: TrendingUp, color: 'cyan', title: 'Career Growth', desc: 'Clear progression paths from Engineer to Senior, Project Lead, and Department Head. We invest in your long-term professional development.' },
  { icon: Globe, color: 'blue', title: 'Pan-India Exposure', desc: 'Work on projects at premier pharma facilities, corporate campuses, and industrial parks across India. Expand your professional network significantly.' },
  { icon: Zap, color: 'amber', title: 'Cutting-Edge Technology', desc: 'Get hands-on with the latest industrial PLCs, AI surveillance systems, cleanroom interlock controllers, and IoT telemetry platforms.' },
  { icon: Users, color: 'red', title: 'Collaborative Culture', desc: 'A flat, transparent team where ideas are heard, challenges are shared, and every member\'s contribution is recognized and valued.' },
  { icon: Heart, color: 'rose', title: 'Work-Life Balance', desc: 'Structured working hours (Mon–Sat), defined leave policies, and management that genuinely respects your personal time and wellbeing.' },
  { icon: Target, color: 'emerald', title: 'Meaningful Impact', desc: 'Every system you build protects lives — from pharma cleanroom interlocks preventing contamination to fire alarms safeguarding industrial workers.' }
];

export default function CareersPage({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRole, setSelectedRole] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', position: '',
    experience: '', currentCTC: '', noticePeriod: '',
    linkedinUrl: '', message: '', agreePrivacy: false,
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => setOpenFaqIndex(prev => prev === index ? null : index);

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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validExt = ['.pdf', '.doc', '.docx'];
    if (!validExt.some(ext => file.name.toLowerCase().endsWith(ext))) {
      setFormErrors(prev => ({ ...prev, resume: 'Only PDF, DOC, or DOCX files are accepted.' }));
      setResumeFile(null); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, resume: 'File size exceeds 5 MB limit.' }));
      setResumeFile(null); return;
    }
    setFormErrors(prev => ({ ...prev, resume: undefined }));
    setResumeFile(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFormErrors(prev => ({ ...prev, resume: undefined }));
    const fi = document.getElementById('resumeUpload');
    if (fi) fi.value = '';
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.email = 'Please enter a valid email address.';
    const cleanPhone = formData.phone.replace(/[\s\-\(\)\.]/g, '');
    if (!formData.phone.trim() || cleanPhone.length < 7 || cleanPhone.length > 15) errors.phone = 'Please enter a valid phone number.';
    if (!formData.position) errors.position = 'Please select the position you are applying for.';
    if (!formData.agreePrivacy) errors.agreePrivacy = 'You must agree to the privacy policy to submit.';
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstKey = Object.keys(errors)[0];
      const el = document.getElementById(firstKey);
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
      `• Current CTC: ${formData.currentCTC || 'Not specified'}`,
      `• Notice Period: ${formData.noticePeriod || 'Not specified'}`,
      `• LinkedIn: ${formData.linkedinUrl || 'N/A'}`,
      ``,
      `Cover Note:`,
      formData.message || 'N/A',
      ``,
      resumeFile ? `[Resume "${resumeFile.name}" — please attach this file to your email]` : `[Please attach your resume/CV to this email]`,
      ``,
      `Best regards,`,
      formData.fullName
    ].join('\n');

    window.location.href = `mailto:careers@htisystems.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => { setIsSubmitting(false); setSubmitted(true); }, 800);
  };

  const handleApplyForRole = (roleTitle) => {
    setSelectedRole(null);
    setFormData(prev => ({ ...prev, position: roleTitle }));
    setFormErrors(prev => ({ ...prev, position: undefined }));
    setSubmitted(false);
    setTimeout(() => { const el = document.getElementById('application-form'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 120);
  };

  const filteredPositions = activeFilter === 'all' ? JOB_POSITIONS : JOB_POSITIONS.filter(pos => pos.category === activeFilter);

  return (
    <div className="careers-dedicated-page">

      {/* Breadcrumb */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button className="breadcrumb-link" onClick={() => onNavigate && onNavigate('home')}>Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Careers</span>
          </div>
          <button className="back-btn" onClick={() => onNavigate && onNavigate('home')} aria-label="Back to Home">
            <ArrowLeft size={15} /><span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="careers-hero-section" aria-label="Careers Hero">
        <div className="careers-hero-bg-glow careers-glow-cyan" aria-hidden="true" />
        <div className="careers-hero-bg-glow careers-glow-red" aria-hidden="true" />
        <div className="careers-hero-grid-pattern" aria-hidden="true" />
        <div className="container">
          <div className="careers-hero-container">
            <div className="careers-hero-content">
              <div className="careers-hero-badge">
                <Briefcase size={14} className="careers-badge-icon" />
                <span>CAREERS AT HTI AUTOMATION</span>
              </div>
              <h1 className="careers-hero-title">
                Build Your Career at the{' '}
                <span className="gradient-text-red">Heart of India's Automation Industry</span>
              </h1>
              <p className="careers-hero-desc">
                Join a Mumbai-based engineering team that has been delivering mission-critical industrial
                automation, pharma cleanroom interlocks, and life-safety infrastructure since 2014.
                Do meaningful work. Grow fast. Make a real impact.
              </p>
              <div className="careers-hero-actions">
                <a href="#open-positions" className="btn-primary careers-cta-primary"
                  onClick={(e) => { e.preventDefault(); scrollTo('open-positions'); }} id="careers-hero-explore-btn">
                  <span>View Open Positions</span>
                  <ArrowRight size={17} className="btn-arrow-icon" />
                </a>
                <a href="#life-at-hti" className="btn-secondary careers-cta-secondary"
                  onClick={(e) => { e.preventDefault(); scrollTo('life-at-hti'); }} id="careers-hero-life-btn">
                  <Heart size={16} /><span>Life at HTI</span>
                </a>
              </div>
              <div className="careers-hero-pillars">
                <div className="careers-pillar-item">
                  <div className="pillar-icon-shell"><Cpu size={15} /></div>
                  <span>PLC &amp; Industrial Automation</span>
                </div>
                <div className="careers-pillar-item">
                  <div className="pillar-icon-shell"><ShieldCheck size={15} /></div>
                  <span>Pharma Cleanroom Systems</span>
                </div>
                <div className="careers-pillar-item">
                  <div className="pillar-icon-shell"><Award size={15} /></div>
                  <span>Pan-India Project Deployments</span>
                </div>
              </div>
            </div>
            <div className="careers-hero-visual">
              <div className="careers-image-frame">
                <img src="/careers-hero-team.jpg" alt="HTI Automation engineering team at work"
                  className="careers-hero-image" loading="eager" width="1280" height="720" />
                <div className="frame-corner corner-tl" aria-hidden="true" />
                <div className="frame-corner corner-br" aria-hidden="true" />
                <div className="careers-floating-badge top-floating">
                  <span className="live-status-dot" aria-hidden="true" />
                  <span className="floating-badge-text">Multidisciplinary Engineering Team</span>
                </div>
                <div className="careers-floating-card bottom-floating">
                  <div className="floating-metric-row">
                    <div className="floating-metric-num">10+</div>
                    <div className="floating-metric-info">
                      <span className="metric-title">Years of Innovation</span>
                      <span className="metric-sub">Serving India Since 2014</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────── */}
      <section className="careers-stats-strip" aria-label="Company highlights">
        <div className="container">
          <div className="stats-strip-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-strip-item">
                <div className="stat-strip-value">{s.value}</div>
                <div className="stat-strip-label">{s.label}</div>
                <div className="stat-strip-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ───────────────────────────── */}
      <section className="careers-positions-section" id="open-positions" aria-label="Open Positions">
        <div className="container">
          <div className="positions-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span>CURRENT OPPORTUNITIES</span>
          </div>
          <h2 className="positions-heading">Open Positions</h2>
          <div className="positions-intro-grid">
            <div className="positions-intro-lead">
              We are actively hiring across engineering, sales, and marketing.
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
            {filteredPositions.map((job) => (
              <div key={job.id} className="job-row-card" role="listitem" tabIndex={0}
                onClick={() => setSelectedRole(job)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedRole(job); } }}>
                <div className="job-row-left">
                  <span className="job-row-badge">{job.categoryLabel}</span>
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
      </section>

      {/* ── LIFE AT HTI ──────────────────────────────── */}
      <section className="careers-why-section" id="life-at-hti" aria-label="Life at HTI">
        <div className="container">
          <div className="why-eyebrow">
            <span className="why-eyebrow-dot" aria-hidden="true" />
            <span>LIFE AT HTI AUTOMATION</span>
          </div>
          <div className="why-split-grid">
            <div className="why-text-col">
              <h2 className="why-heading">
                Where engineers grow.{' '}
                <span className="why-heading-highlight">Where work matters.</span>
              </h2>
              <p className="why-paragraph">
                At HTI Automation, you contribute to real industrial systems that safeguard pharmaceutical
                cleanrooms, protect corporate campuses, and keep India's logistics infrastructure running.
                Our team is small, skilled, and driven — your work is visible, impactful, and recognized
                from day one.
              </p>
              <div className="why-quote-badge">
                <span className="why-quote-line" aria-hidden="true" />
                <span className="why-quote-text">"Engineering rigor. Meaningful work. Collaborative ownership."</span>
              </div>
            </div>
            <div className="why-visual-col">
              <div className="why-image-card">
                <img src="/careers-why-work.jpg" alt="HTI Automation team collaborating"
                  className="why-workplace-image" loading="lazy" width="1200" height="900" />
                <div className="why-image-tag">
                  <span className="why-tag-dot" aria-hidden="true" />
                  <span>Engineering Design Studio · Mumbai HQ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="why-benefits-grid why-benefits-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className={`why-benefit-item benefit-color-${b.color}`}>
                  <div className="benefit-icon-box"><Icon size={22} className="benefit-icon-inner" /></div>
                  <h3 className="benefit-title">{b.title}</h3>
                  <p className="benefit-desc">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HIRING PROCESS ───────────────────────────── */}
      <section className="careers-process-section" id="hiring-process" aria-label="Hiring Process">
        <div className="container">
          <div className="process-header">
            <div className="process-eyebrow">
              <span className="process-eyebrow-line" aria-hidden="true" />
              <span>HOW WE HIRE</span>
            </div>
            <h2 className="process-heading">Simple. Transparent. Fast.</h2>
            <p className="process-intro-text">Our process is respectful of your time — typically completed within 1–2 weeks.</p>
          </div>
          <div className="process-steps-grid" role="list">
            {[
              { num: '01', pill: 'Application', title: 'Apply Online', desc: 'Submit your application via the form below or email your CV to careers@htisystems.in. We review every application personally.' },
              { num: '02', pill: 'Screening', title: 'HR Screening Call', desc: 'Our HR team will contact you within 3–5 working days to verify your profile, experience, and availability.' },
              { num: '03', pill: 'Technical', title: 'Technical Interview', desc: 'A focused discussion with the department head to assess your domain knowledge, hands-on skills, and problem-solving approach.' },
              { num: '04', pill: 'Offer', title: 'Decision & Offer', desc: 'We communicate our decision promptly. If selected, we discuss compensation, joining date, and onboarding directly with you.' }
            ].map((step, i) => (
              <div key={i} className="process-step-item" role="listitem" tabIndex={0}>
                <div className="step-top-row">
                  <span className="step-large-num" aria-hidden="true">{step.num}</span>
                  <span className="step-accent-pill">{step.pill}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ─────────────────────────── */}
      <section className="careers-application-section" id="application-form" aria-label="Application Form">
        <div className="container">
          <div className="application-split-grid">

            <div className="application-intro-col">
              <div className="application-eyebrow">
                <span className="application-eyebrow-line" aria-hidden="true" />
                <span>APPLY NOW</span>
              </div>
              <h2 className="application-heading">Let's build something great together.</h2>
              <p className="application-lead">
                Whether you're a seasoned systems engineer, a PLC specialist, a driven sales professional,
                or a creative marketer — we'd love to hear from you. Fill in your details and we'll be in
                touch within 3–5 working days.
              </p>

              <div className="application-encouragement-card">
                <div className="encouragement-header">
                  <Sparkles size={18} className="encouragement-icon" aria-hidden="true" />
                  <h3 className="encouragement-title">Don't meet every requirement?</h3>
                </div>
                <p className="encouragement-text">
                  Apply anyway. We value a strong work ethic, eagerness to learn, and genuine passion for
                  engineering over a perfect resume. Fresh graduates and career changers are welcome.
                </p>
              </div>

              <div className="hr-contact-card">
                <div className="hr-card-badge">HR &amp; TALENT TEAM</div>
                <h3 className="hr-contact-title">Prefer to reach us directly?</h3>
                <p className="hr-contact-subtitle">Available Monday – Saturday, 9 AM – 6:30 PM IST.</p>
                <div className="hr-contact-list">
                  <div className="hr-contact-item">
                    <div className="hr-icon-shell"><Mail size={16} /></div>
                    <div className="hr-item-content">
                      <span className="hr-item-label">Careers Email</span>
                      <a href="mailto:careers@htisystems.in" className="hr-item-link">careers@htisystems.in</a>
                    </div>
                  </div>
                  <div className="hr-contact-item">
                    <div className="hr-icon-shell"><Phone size={16} /></div>
                    <div className="hr-item-content">
                      <span className="hr-item-label">HR Direct Line</span>
                      <a href="tel:+919992756077" className="hr-item-link">+91 9992756077 / 9594917010</a>
                    </div>
                  </div>
                  <div className="hr-contact-item">
                    <div className="hr-icon-shell"><MapPin size={16} /></div>
                    <div className="hr-item-content">
                      <span className="hr-item-label">Corporate Headquarters</span>
                      <span className="hr-item-text">
                        Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703
                      </span>
                    </div>
                  </div>

                  <div className="hr-contact-item">
                    <div className="hr-icon-shell">
                      <Clock size={16} aria-hidden="true" />
                    </div>
                    <div className="hr-item-content">
                      <span className="hr-item-label">Office Working Hours</span>
                      <span className="hr-item-text">
                        Monday – Saturday: 9:00 AM – 6:30 PM IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="application-form-col">
              <div className="application-form-card">
                <div className="form-card-header">
                  <h3 className="form-card-title">Submit Your Application</h3>
                  <p className="form-card-subtitle">Fields marked <span className="required-star">*</span> are required.</p>
                </div>

                {submitted ? (
                  <div className="careers-success-box" role="alert">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={44} className="success-big-icon" />
                    </div>
                    <h3 className="success-title">Application Submitted!</h3>
                    <p className="success-desc">
                      Your email client has been opened with your details pre-filled. Please attach your
                      resume and send the email to complete your application. Our HR team will get back
                      to you within 3–5 working days.
                    </p>
                    <div className="success-contact-note">
                      Questions? Email us at <a href="mailto:careers@htisystems.in">careers@htisystems.in</a>
                    </div>
                    <button className="btn-apply-again" onClick={() => {
                      setSubmitted(false);
                      setFormData({ fullName: '', email: '', phone: '', position: '', experience: '', currentCTC: '', noticePeriod: '', linkedinUrl: '', message: '', agreePrivacy: false });
                      setResumeFile(null);
                    }}>
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="application-actual-form">

                    {/* Row 1: Full Name + Email */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="fullName" className="form-label">Full Name <span className="required-star">*</span></label>
                        <input type="text" id="fullName" name="fullName"
                          className={`form-input ${formErrors.fullName ? 'has-error' : ''}`}
                          placeholder="e.g. Rahul Sharma" value={formData.fullName}
                          onChange={handleInputChange} aria-required="true" disabled={isSubmitting} />
                        {formErrors.fullName && <span className="field-error-msg" role="alert"><AlertCircle size={13} />{formErrors.fullName}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address <span className="required-star">*</span></label>
                        <input type="email" id="email" name="email"
                          className={`form-input ${formErrors.email ? 'has-error' : ''}`}
                          placeholder="rahul@example.com" value={formData.email}
                          onChange={handleInputChange} aria-required="true" disabled={isSubmitting} />
                        {formErrors.email && <span className="field-error-msg" role="alert"><AlertCircle size={13} />{formErrors.email}</span>}
                      </div>
                    </div>

                    {/* Row 2: Phone + Position */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number <span className="required-star">*</span></label>
                        <input type="tel" id="phone" name="phone"
                          className={`form-input ${formErrors.phone ? 'has-error' : ''}`}
                          placeholder="+91 98201 12345" value={formData.phone}
                          onChange={handleInputChange} aria-required="true" disabled={isSubmitting} />
                        {formErrors.phone && <span className="field-error-msg" role="alert"><AlertCircle size={13} />{formErrors.phone}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="position" className="form-label">Position Applying For <span className="required-star">*</span></label>
                        <select id="position" name="position"
                          className={`form-select ${formErrors.position ? 'has-error' : ''}`}
                          value={formData.position} onChange={handleInputChange}
                          aria-required="true" disabled={isSubmitting}>
                          <option value="">Select a role...</option>
                          {JOB_POSITIONS.map(pos => <option key={pos.id} value={pos.title}>{pos.title}</option>)}
                          <option value="General / Open Application">General / Open Application</option>
                        </select>
                        {formErrors.position && <span className="field-error-msg" role="alert"><AlertCircle size={13} />{formErrors.position}</span>}
                      </div>
                    </div>

                    {/* Row 3: Experience + Current CTC */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="experience" className="form-label">Years of Experience <span className="optional-badge">Optional</span></label>
                        <select id="experience" name="experience" className="form-select" value={formData.experience} onChange={handleInputChange} disabled={isSubmitting}>
                          <option value="">Select experience...</option>
                          <option value="Fresher / 0 Years">Fresher / 0 Years</option>
                          <option value="Less than 1 Year">Less than 1 Year</option>
                          <option value="1 – 2 Years">1 – 2 Years</option>
                          <option value="2 – 4 Years">2 – 4 Years</option>
                          <option value="4 – 6 Years">4 – 6 Years</option>
                          <option value="6 – 10 Years">6 – 10 Years</option>
                          <option value="10+ Years">10+ Years</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="currentCTC" className="form-label">Current CTC (per annum) <span className="optional-badge">Optional</span></label>
                        <input type="text" id="currentCTC" name="currentCTC" className="form-input"
                          placeholder="e.g. ₹4.5 LPA or Fresher" value={formData.currentCTC}
                          onChange={handleInputChange} disabled={isSubmitting} />
                      </div>
                    </div>

                    {/* Row 4: Notice Period + LinkedIn */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="noticePeriod" className="form-label">Notice Period <span className="optional-badge">Optional</span></label>
                        <select id="noticePeriod" name="noticePeriod" className="form-select" value={formData.noticePeriod} onChange={handleInputChange} disabled={isSubmitting}>
                          <option value="">Select notice period...</option>
                          <option value="Immediately Available">Immediately Available</option>
                          <option value="Within 15 Days">Within 15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="45 Days">45 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="linkedinUrl" className="form-label">LinkedIn Profile URL <span className="optional-badge">Optional</span></label>
                        <input type="url" id="linkedinUrl" name="linkedinUrl" className="form-input"
                          placeholder="https://linkedin.com/in/yourname" value={formData.linkedinUrl}
                          onChange={handleInputChange} disabled={isSubmitting} />
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="form-group">
                      <label htmlFor="resumeUpload" className="form-label">
                        Resume / CV <span className="optional-badge">PDF, DOC, DOCX · Max 5 MB</span>
                      </label>
                      {resumeFile ? (
                        <div className="resume-file-selected">
                          <div className="file-info-group">
                            <FileText size={20} className="file-selected-icon" />
                            <div className="file-details">
                              <span className="file-name">{resumeFile.name}</span>
                              <span className="file-size">{(resumeFile.size / 1024).toFixed(1)} KB</span>
                            </div>
                          </div>
                          <button type="button" className="file-remove-btn" onClick={handleRemoveFile} aria-label="Remove file" disabled={isSubmitting}>
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="resume-upload-zone"
                          onClick={() => document.getElementById('resumeUpload')?.click()}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById('resumeUpload')?.click(); } }}
                          tabIndex={0} role="button" aria-label="Upload resume">
                          <UploadCloud size={28} className="upload-icon" />
                          <div className="upload-text-group">
                            <span className="upload-main-text"><strong>Click to browse</strong> or drag &amp; drop your resume</span>
                            <span className="upload-sub-text">PDF, DOC, DOCX — max 5 MB</span>
                          </div>
                          <input type="file" id="resumeUpload" name="resume" accept=".pdf,.doc,.docx"
                            className="visually-hidden-input" onChange={handleFileChange} disabled={isSubmitting} />
                        </div>
                      )}
                      {formErrors.resume && <span className="field-error-msg" role="alert"><AlertCircle size={13} />{formErrors.resume}</span>}
                    </div>

                    {/* Cover Note */}
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">Cover Note <span className="optional-badge">Optional</span></label>
                      <textarea id="message" name="message" rows={4} className="form-textarea"
                        placeholder="Tell us about your key projects, skills, and why you'd like to join HTI Automation..."
                        value={formData.message} onChange={handleInputChange} disabled={isSubmitting} />
                    </div>

                    {/* Privacy Checkbox */}
                    <div className="privacy-checkbox-row">
                      <input type="checkbox" id="agreePrivacy" name="agreePrivacy"
                        checked={formData.agreePrivacy} onChange={handleInputChange}
                        className="privacy-checkbox" aria-required="true" disabled={isSubmitting} />
                      <label htmlFor="agreePrivacy" className="privacy-label">
                        I agree to HTI Automation processing my application data in accordance with their{' '}
                        <button type="button" className="privacy-policy-link"
                          onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('about'); }}>Privacy Policy</button>.{' '}
                        <span className="required-star">*</span>
                      </label>
                    </div>
                    {formErrors.agreePrivacy && <span className="field-error-msg privacy-error" role="alert"><AlertCircle size={13} />{formErrors.agreePrivacy}</span>}

                    {/* Submit */}
                    <div className="form-actions-wrapper">
                      <button type="submit" className="careers-submit-btn" disabled={isSubmitting}>
                        {isSubmitting
                          ? <><Loader2 size={18} className="btn-spinner" /><span>Opening Email Client...</span></>
                          : <><Send size={16} /><span>Submit Application</span></>}
                      </button>
                      <p className="form-security-note">
                        <ShieldCheck size={14} className="security-icon" />
                        <span>Your information is handled confidentially by our HR team.</span>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="careers-faq-section" id="faq" aria-label="Frequently Asked Questions">
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
      </section>

      {/* ── ROLE DETAILS MODAL ───────────────────────── */}
      {selectedRole && (
        <div className="role-modal-overlay" onClick={() => setSelectedRole(null)}
          role="dialog" aria-modal="true" aria-labelledby="modal-role-title">
          <div className="role-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="role-modal-header">
              <div className="role-modal-title-group">
                <div className="role-modal-badges">
                  <span className="role-badge-category">{selectedRole.categoryLabel}</span>
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
