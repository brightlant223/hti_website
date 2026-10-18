import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Briefcase,
  ArrowRight,
  Users,
  Cpu,
  ShieldCheck,
  Award,
  X,
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
  Mail,
  Send,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Phone,
  FileText,
  UploadCloud,
  AlertCircle,
  Loader2,
  Plus,
  Minus
} from 'lucide-react';
import './Careers.css';

// 4 Established Open Roles for HTI Automation
const JOB_POSITIONS = [
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'engineering',
    categoryLabel: 'Engineering',
    subtitle: 'Full-Time · Engineering & Systems Architecture · Mumbai HQ / Hybrid',
    department: 'IoT & Software Systems',
    location: 'Goregaon (West), Mumbai / Hybrid',
    employmentType: 'Full-Time',
    experience: '2 - 5 Years',
    summary: 'Design, develop, and scale responsive web applications, hardware telemetry dashboards, and real-time device monitoring portals that connect HTI\'s physical automation controllers to central client networks.',
    responsibilities: [
      'Develop robust, high-performance web frontends using modern React and clean Vanilla CSS architecture.',
      'Build secure, asynchronous RESTful APIs and WebSocket telemetry services in Python (FastAPI) or Node.js.',
      'Collaborate with hardware engineers to interface cleanroom door interlocks and access controllers with centralized management software.',
      'Maintain reliable database architectures, audit trail logging, and secure client-facing portals compliant with enterprise standards.'
    ],
    requirements: [
      'Strong proficiency in React, JavaScript (ES6+), HTML5, and modern responsive CSS design systems.',
      'Experience developing RESTful APIs with Python (FastAPI/Django) or Node.js, and working with relational databases.',
      'Familiarity with WebSockets, hardware status polling, or IoT telemetry interfaces is a strong plus.',
      'Bachelor’s degree in Computer Science, Information Technology, Engineering, or demonstrable practical experience.'
    ]
  },
  {
    id: 'ai-automation-engineer',
    title: 'AI Automation Engineer',
    category: 'engineering',
    categoryLabel: 'Engineering',
    subtitle: 'Full-Time · Industrial Robotics & Vision Systems · Mumbai HQ',
    department: 'Robotics & Vision Automation',
    location: 'Goregaon (West), Mumbai & Site Deployments',
    employmentType: 'Full-Time',
    experience: '3 - 6 Years',
    summary: 'Lead the design and commissioning of automated industrial robotics, PLC logic, edge AI video surveillance analytics, and cleanroom airlock controls for high-speed manufacturing environments.',
    responsibilities: [
      'Program and calibrate industrial PLCs (Siemens, Delta, Schneider) for automatic doors, gates, and interlock controllers.',
      'Deploy and optimize edge computer vision algorithms for 4K perimeter security and real-time anomaly detection.',
      'Perform on-site system integration, end-to-end electrical commissioning, and multi-sensor stress testing.',
      'Ensure all installations strictly adhere to statutory life-safety, USFDA 21 CFR Part 11, and EN 16005 standards.'
    ],
    requirements: [
      'Degree in Mechatronics, Robotics, Electrical, or Instrumentation Engineering.',
      'Demonstrated hands-on experience programming industrial PLCs, relay logic, and electromechanical drives.',
      'Working knowledge of computer vision frameworks (OpenCV, YOLO) and IP surveillance networks.',
      'Willingness to conduct hands-on testing and commissioning at premier industrial and pharmaceutical client sites.'
    ]
  },
  {
    id: 'sales-and-business-development',
    title: 'Sales and Business Development',
    category: 'sales',
    categoryLabel: 'Sales',
    subtitle: 'Full-Time · Corporate & Enterprise Accounts · Mumbai HQ & Pan-India',
    department: 'Enterprise Sales & Client Accounts',
    location: 'Goregaon (West), Mumbai',
    employmentType: 'Full-Time',
    experience: '2 - 7 Years',
    summary: 'Drive revenue growth and cultivate strategic relationships with corporate clients, pharmaceutical facility heads, architects, and MEP contractors seeking turnkey access automation and life-safety systems.',
    responsibilities: [
      'Identify and engage prospective corporate and pharmaceutical enterprises across Mumbai, Maharashtra, and pan-India clusters.',
      'Deliver consultative technical presentations showcasing HTI\'s automated doors, cleanroom interlocks, and fire safety systems.',
      'Prepare technical proposals, Bill of Quantities (BOQs), tender documentation, and commercial quotations.',
      'Manage the end-to-end sales lifecycle from initial site survey coordination to contract finalization and handover.'
    ],
    requirements: [
      'Proven track record in B2B technical sales, industrial equipment, building automation, or commercial security systems.',
      'Exceptional consultative communication, client presentation, and proposal drafting capabilities.',
      'Ability to interpret architectural layouts, MEP specifications, and technical client tender documents.',
      'Bachelor’s in Engineering, Business Administration, Marketing, or relevant commercial domain.'
    ]
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    category: 'marketing',
    categoryLabel: 'Marketing',
    subtitle: 'Full-Time · Brand & Growth Strategy · Mumbai HQ',
    department: 'Brand Communications & Growth',
    location: 'Goregaon (West), Mumbai',
    employmentType: 'Full-Time',
    experience: '2 - 5 Years',
    summary: 'Elevate HTI Automation’s brand reach, execute targeted B2B inbound campaigns, and author authoritative engineering case studies that communicate our technological capabilities to industrial decision-makers.',
    responsibilities: [
      'Plan and execute targeted B2B digital campaigns across LinkedIn, search engines (SEO/SEM), and industrial industry platforms.',
      'Author compelling engineering case studies, whitepapers, technical brochures, and client success stories.',
      'Optimize website search presence, track inquiry conversion analytics, and refine digital customer journeys.',
      'Partner closely with senior leadership and engineering leads to spotlight innovative client deployments.'
    ],
    requirements: [
      'Demonstrated experience in B2B digital marketing, content marketing, or corporate growth strategy (industrial/tech preferred).',
      'Solid grasp of SEO, Google Analytics, LinkedIn Campaign Manager, and content management systems.',
      'Strong technical writing skills with the ability to convey complex engineering value in clear, engaging language.',
      'Bachelor’s degree in Marketing, Communications, Journalism, Business, or related discipline.'
    ]
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Roles' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' }
];

// 7 Verified Editorial FAQ Items for HTI Careers
const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How do I apply for a position?',
    answer: 'Candidates can review the Open Positions section and use the available application form to submit their details.'
  },
  {
    id: 'faq-2',
    question: 'Can I apply for more than one role?',
    answer: 'Yes. Candidates may apply for roles that match their skills and interests, submitting the relevant details for each application.'
  },
  {
    id: 'faq-3',
    question: 'What happens after I submit my application?',
    answer: 'The recruitment team reviews applications and may contact suitable candidates regarding the next steps.'
  },
  {
    id: 'faq-4',
    question: 'Do I need previous work experience?',
    answer: "Requirements depend on the role. Review each position's requirements and highlight relevant projects, skills, internships, or experience."
  },
  {
    id: 'faq-5',
    question: 'Can fresh graduates apply?',
    answer: 'Fresh graduates can explore relevant openings and apply when their qualifications and skills match the role requirements.'
  },
  {
    id: 'faq-6',
    question: 'How can I prepare for the interview?',
    answer: 'Review the role description, understand your projects, and be ready to discuss your technical skills and problem-solving approach.'
  },
  {
    id: 'faq-7',
    question: 'How can I contact the recruitment team?',
    answer: 'You can contact our talent acquisition and HR team directly via email at careers@htisystems.in or by calling +91 9992756077 / 9594917010 during office hours (Monday to Saturday, 9:00 AM – 6:30 PM IST). Our corporate headquarters is located at Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703.'
  }
];

export default function CareersPage({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRole, setSelectedRole] = useState(null);

  // Section 5: Application Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    linkedinUrl: '',
    portfolioUrl: '',
    message: '',
    agreePrivacy: false,
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | 'missing_backend' | 'success'

  // Section 6: FAQ Accordion State (item 0 open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  // Close modal with Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRole(null);
      }
    };

    if (selectedRole) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedRole]);

  const handleExplorePositions = (e) => {
    e.preventDefault();
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLifeAtHti = (e) => {
    e.preventDefault();
    const el = document.getElementById('life-at-hti');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#life-at-hti');
      }
    }
  };

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error on user edit
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Resume upload change handler (PDF / DOC / DOCX up to 5MB)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const hasValidExt = validExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExt) {
      setFormErrors(prev => ({
        ...prev,
        resume: 'Invalid format. Only PDF, DOC, or DOCX documents are accepted.'
      }));
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({
        ...prev,
        resume: 'File size exceeds 5 MB. Please attach a smaller file.'
      }));
      setResumeFile(null);
      return;
    }

    setFormErrors(prev => ({ ...prev, resume: undefined }));
    setResumeFile(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFormErrors(prev => ({ ...prev, resume: undefined }));
    const fileInput = document.getElementById('resumeUpload');
    if (fileInput) fileInput.value = '';
  };

  // Client-side validation
  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)\.]/g, '');
    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required.';
    } else if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      errors.phone = 'Please enter a valid phone number (7 to 15 digits).';
    }

    if (!formData.position) {
      errors.position = 'Please select the position you are applying for.';
    }

    if (formData.linkedinUrl.trim()) {
      try {
        const urlStr = formData.linkedinUrl.trim().startsWith('http')
          ? formData.linkedinUrl.trim()
          : `https://${formData.linkedinUrl.trim()}`;
        const parsed = new URL(urlStr);
        if (!parsed.hostname.includes('linkedin.com')) {
          errors.linkedinUrl = 'Please enter a valid LinkedIn URL (e.g. linkedin.com/in/username).';
        }
      } catch {
        errors.linkedinUrl = 'Please enter a valid website URL.';
      }
    }

    if (formData.portfolioUrl.trim()) {
      try {
        const urlStr = formData.portfolioUrl.trim().startsWith('http')
          ? formData.portfolioUrl.trim()
          : `https://${formData.portfolioUrl.trim()}`;
        new URL(urlStr);
      } catch {
        errors.portfolioUrl = 'Please enter a valid portfolio or GitHub URL.';
      }
    }

    if (!formData.agreePrivacy) {
      errors.agreePrivacy = 'You must agree to the privacy policy to submit your application.';
    }

    return errors;
  };

  // Handle Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      // Attempt backend submission to check if an application endpoint exists
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          experience: formData.experience,
          linkedinUrl: formData.linkedinUrl,
          portfolioUrl: formData.portfolioUrl,
          message: formData.message,
          hasResume: !!resumeFile
        })
      });

      if (res.ok) {
        setSubmissionStatus('success');
      } else {
        // Backend endpoint not configured on server (404/Not Implemented)
        setSubmissionStatus('missing_backend');
      }
    } catch {
      // Network failure or no server endpoint configured
      setSubmissionStatus('missing_backend');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct Apply action from modal or job rows
  const handleApplyForRole = (roleTitle) => {
    setSelectedRole(null);
    setFormData(prev => ({ ...prev, position: roleTitle }));
    setFormErrors(prev => ({ ...prev, position: undefined }));
    setSubmissionStatus(null);
    setTimeout(() => {
      const el = document.getElementById('application-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  // Pre-formatted mailto URL for direct fallback submission
  const mailtoHref = `mailto:careers@htisystems.in?subject=${encodeURIComponent(
    `Application: ${formData.position || 'Open Role'} - ${formData.fullName}`
  )}&body=${encodeURIComponent(
    `Dear HTI Automation Talent Acquisition Team,\n\nPlease find my application details below:\n\n• Full Name: ${formData.fullName}\n• Email: ${formData.email}\n• Phone: ${formData.phone}\n• Position: ${formData.position}\n• Experience: ${formData.experience || 'Not specified'}\n• LinkedIn: ${formData.linkedinUrl || 'N/A'}\n• Portfolio / GitHub: ${formData.portfolioUrl || 'N/A'}\n\nCandidate Message:\n${formData.message || 'N/A'}\n\n${resumeFile
      ? `[Resume file "${resumeFile.name}" attached with this email]`
      : '[Resume file attached with this email]'
    }\n\nBest regards,\n${formData.fullName}`
  )}`;

  // Filter positions based on active tab
  const filteredPositions = activeFilter === 'all'
    ? JOB_POSITIONS
    : JOB_POSITIONS.filter(pos => pos.category === activeFilter);

  return (
    <div className="careers-dedicated-page">
      {/* 1. Standard HTI Breadcrumb Bar */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button
              className="breadcrumb-link"
              onClick={() => onNavigate && onNavigate('home')}
            >
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Careers</span>
          </div>

          <button
            className="back-btn"
            onClick={() => onNavigate && onNavigate('home')}
            aria-label="Back to Home"
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* 2. Section 1: Careers Hero */}
      <section className="careers-hero-section" aria-label="Careers Hero">
        {/* Ambient background decoration */}
        <div className="careers-hero-bg-glow careers-glow-cyan" aria-hidden="true" />
        <div className="careers-hero-bg-glow careers-glow-red" aria-hidden="true" />
        <div className="careers-hero-grid-pattern" aria-hidden="true" />

        <div className="container">
          <div className="careers-hero-container">
            {/* Left Column: Headline, Copy, CTAs, Highlights */}
            <div className="careers-hero-content">
              {/* Tag / Badge */}
              <div className="careers-hero-badge">
                <Briefcase size={14} className="careers-badge-icon" />
                <span>CAREERS AT HTI AUTOMATION</span>
              </div>

              {/* Main Headline */}
              <h1 className="careers-hero-title">
                Build Your Engineering Career at{' '}
                <span className="gradient-text-red">HTI Automation</span>
              </h1>

              {/* Supporting Copy */}
              <p className="careers-hero-desc">
                Join our Mumbai-based engineering team delivering high-reliability industrial
                automation, cleanroom door interlocks, and turnkey life-safety infrastructure.
                Work alongside seasoned specialists on mission-critical manufacturing and corporate
                projects that advance safety, precision, and your professional growth.
              </p>

              {/* Action Buttons */}
              <div className="careers-hero-actions">
                <a
                  href="#open-positions"
                  className="btn-primary careers-cta-primary"
                  onClick={handleExplorePositions}
                  id="careers-hero-explore-btn"
                >
                  <span>Explore Open Positions</span>
                  <ArrowRight size={17} className="btn-arrow-icon" />
                </a>

                <a
                  href="#life-at-hti"
                  className="btn-secondary careers-cta-secondary"
                  onClick={handleLifeAtHti}
                  id="careers-hero-life-btn"
                >
                  <Users size={16} />
                  <span>Life at HTI</span>
                </a>
              </div>

              {/* Core Engineering Disciplines Strip */}
              <div className="careers-hero-pillars">
                <div className="careers-pillar-item">
                  <div className="pillar-icon-shell">
                    <Cpu size={15} />
                  </div>
                  <span>Industrial Robotics & PLCs</span>
                </div>

                <div className="careers-pillar-item">
                  <div className="pillar-icon-shell">
                    <ShieldCheck size={15} />
                  </div>
                  <span>Pharma Cleanroom Interlocks</span>
                </div>

                <div className="careers-pillar-item">
                  <div className="pillar-icon-shell">
                    <Award size={15} />
                  </div>
                  <span>Turnkey PAN-India Projects</span>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Workplace Image with Glass Overlay */}
            <div className="careers-hero-visual">
              <div className="careers-image-frame">
                <img
                  src="/careers-hero-team.jpg"
                  alt="HTI Automation engineering team collaborating on industrial PLC control cabinets and robotics in a modern facility"
                  className="careers-hero-image"
                  loading="eager"
                  width="1280"
                  height="720"
                />

                {/* Decorative Corner Accents */}
                <div className="frame-corner corner-tl" aria-hidden="true" />
                <div className="frame-corner corner-br" aria-hidden="true" />

                {/* Floating Live Indicator Badge */}
                <div className="careers-floating-badge top-floating">
                  <span className="live-status-dot" aria-hidden="true" />
                  <span className="floating-badge-text">
                    Multi-Disciplinary Engineering Team
                  </span>
                </div>

                {/* Floating Bottom Metric Card */}
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

      {/* 3. Section 2: Open Positions (Inspired by Recharge Careers Reference) */}
      <section
        className="careers-positions-section"
        id="open-positions"
        aria-label="Open Positions"
      >
        <div className="container">
          {/* Section Kicker / Eyebrow */}
          <div className="positions-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span>OPPORTUNITIES AT HTI</span>
          </div>

          {/* Large Elegant Left-Aligned Heading */}
          <h2 className="positions-heading">Open Positions</h2>

          {/* Two-Column Introduction: Bold Lead on Left, Lighter Description on Right */}
          <div className="positions-intro-grid">
            <div className="positions-intro-lead">
              Build next-generation industrial systems with a team driven by engineering rigor and measurable impact.
            </div>
            <div className="positions-intro-desc">
              <p>
                We are continually seeking passionate engineers, creative problem-solvers, and growth-minded
                professionals. At HTI Automation, you will work on mission-critical automation hardware and
                enterprise software that safeguard facilities and advance modern Indian industry.
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="positions-filters-wrap" role="tablist" aria-label="Job category filters">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = tab.id === 'all'
                ? JOB_POSITIONS.length
                : JOB_POSITIONS.filter(p => p.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`positions-filter-tab ${isActive ? 'filter-active' : ''}`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  <span>{tab.label}</span>
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Job Listings: Four Wide Horizontally Stretched Rows */}
          <div className="positions-listings-list" role="list">
            {filteredPositions.map((job) => (
              <div
                key={job.id}
                className="job-row-card"
                role="listitem"
                tabIndex={0}
                onClick={() => setSelectedRole(job)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedRole(job);
                  }
                }}
              >
                {/* Left: Role Title and Subtitle */}
                <div className="job-row-content">
                  <h3 className="job-row-title">{job.title}</h3>
                  <div className="job-row-meta">
                    <span className="meta-text">{job.subtitle}</span>
                  </div>
                </div>

                {/* Right: Rounded Action Button */}
                <div className="job-row-action">
                  <button
                    type="button"
                    className="job-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRole(job);
                    }}
                    aria-label={`View role details for ${job.title}`}
                  >
                    <span>View Role</span>
                    <ArrowRight size={16} className="job-view-arrow" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section 3: Why Work With Us (Editorial Split Layout) */}
      <section
        className="careers-why-section"
        id="life-at-hti"
        aria-label="Why Work With Us"
      >
        <div className="container">
          {/* Eyebrow / Tag */}
          <div className="why-eyebrow">
            <span className="why-eyebrow-dot" aria-hidden="true" />
            <span>WHY WORK WITH US</span>
          </div>

          {/* Editorial Split Hero: Large Typography Left, Refined Photo Right */}
          <div className="why-split-grid">
            <div className="why-text-col">
              <h2 className="why-heading">
                Grow your skills.{' '}
                <span className="why-heading-highlight">Make an impact.</span>
              </h2>

              <p className="why-paragraph">
                At HTI Automation, you don’t just write code or assemble components—you
                engineer mission-critical automation systems that protect lives, prevent
                pharmaceutical contamination, and empower India’s most demanding industries.
                Work alongside seasoned engineers who share ideas openly, embrace complex
                technical challenges, and empower your long-term professional growth.
              </p>

              <div className="why-quote-badge">
                <span className="why-quote-line" aria-hidden="true" />
                <span className="why-quote-text">
                  Engineering rigor. Meaningful work. Collaborative ownership.
                </span>
              </div>
            </div>

            <div className="why-visual-col">
              <div className="why-image-card">
                <img
                  src="/careers-why-work.jpg"
                  alt="HTI Automation team of engineers collaborating in a modern design studio over blueprints and hardware designs"
                  className="why-workplace-image"
                  loading="lazy"
                  width="1200"
                  height="900"
                />
                <div className="why-image-tag">
                  <span className="why-tag-dot" aria-hidden="true" />
                  <span>Engineering Design Studio · Mumbai HQ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Compact Benefits Below the Split Layout */}
          <div className="why-benefits-grid">
            {/* Benefit 1: Learning & Growth */}
            <div className="why-benefit-item">
              <div className="benefit-icon-box">
                <TrendingUp size={22} className="benefit-icon-cyan" />
              </div>
              <h3 className="benefit-title">Learning & Growth</h3>
              <p className="benefit-desc">
                Opportunities to develop technical and professional skills through hands-on mentorship,
                advanced automation toolchains, and real-world system deployments.
              </p>
            </div>

            {/* Benefit 2: Collaborative Culture */}
            <div className="why-benefit-item">
              <div className="benefit-icon-box">
                <Users size={22} className="benefit-icon-red" />
              </div>
              <h3 className="benefit-title">Collaborative Culture</h3>
              <p className="benefit-desc">
                Work together, share ideas, and solve problems as a team where transparent communication
                and diverse engineering perspectives are always celebrated.
              </p>
            </div>

            {/* Benefit 3: Meaningful Projects */}
            <div className="why-benefit-item">
              <div className="benefit-icon-box">
                <ShieldCheck size={22} className="benefit-icon-cyan" />
              </div>
              <h3 className="benefit-title">Meaningful Projects</h3>
              <p className="benefit-desc">
                Contribute to practical technology and automation solutions that safeguard cleanrooms,
                streamline manufacturing lines, and protect critical infrastructure across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 4: Our Hiring Process (Awwwards-Inspired Editorial Sequence) */}
      <section
        className="careers-process-section"
        id="hiring-process"
        aria-label="Our Hiring Process"
      >
        <div className="container">
          {/* Section Header */}
          <div className="process-header">
            <div className="process-eyebrow">
              <span className="process-eyebrow-line" aria-hidden="true" />
              <span>OUR HIRING PROCESS</span>
            </div>

            <h2 className="process-heading">
              Your journey starts here.
            </h2>

            <p className="process-intro-text">
              A straightforward process designed to help us understand your strengths, experience, and potential.
            </p>
          </div>

          {/* 4 Steps Editorial Sequence with Oversized Numbers & Thin Dividing Lines */}
          <div className="process-steps-grid" role="list">
            {/* Step 01 */}
            <div className="process-step-item" role="listitem" tabIndex={0}>
              <div className="step-top-row">
                <span className="step-large-num" aria-hidden="true">01</span>
                <span className="step-accent-pill">Application</span>
              </div>
              <h3 className="step-title">Apply</h3>
              <p className="step-desc">
                Submit your application and share your experience, skills, and interests.
              </p>
            </div>

            {/* Step 02 */}
            <div className="process-step-item" role="listitem" tabIndex={0}>
              <div className="step-top-row">
                <span className="step-large-num" aria-hidden="true">02</span>
                <span className="step-accent-pill">Review</span>
              </div>
              <h3 className="step-title">Initial Screening</h3>
              <p className="step-desc">
                Our team reviews your profile and checks how your skills align with the opportunity.
              </p>
            </div>

            {/* Step 03 */}
            <div className="process-step-item" role="listitem" tabIndex={0}>
              <div className="step-top-row">
                <span className="step-large-num" aria-hidden="true">03</span>
                <span className="step-accent-pill">Conversation</span>
              </div>
              <h3 className="step-title">Interview</h3>
              <p className="step-desc">
                Discuss your experience, approach to problem-solving, and suitability for the role with our team.
              </p>
            </div>

            {/* Step 04 */}
            <div className="process-step-item" role="listitem" tabIndex={0}>
              <div className="step-top-row">
                <span className="step-large-num" aria-hidden="true">04</span>
                <span className="step-accent-pill">Next Steps</span>
              </div>
              <h3 className="step-title">Final Decision</h3>
              <p className="step-desc">
                We communicate the outcome and, if selected, discuss the next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section 5: Application Form (Two-Column Editorial & Application Suite) */}
      <section
        className="careers-application-section"
        id="application-form"
        aria-label="Application Form"
      >
        <div className="container">
          <div className="application-split-grid">

            {/* Left Column: Introduction & HR Contact Block */}
            <div className="application-intro-col">
              <div className="application-eyebrow">
                <span className="application-eyebrow-line" aria-hidden="true" />
                <span>START YOUR APPLICATION</span>
              </div>

              <h2 className="application-heading">
                Let's build something great together.
              </h2>

              <p className="application-lead">
                Whether you are an experienced systems engineer, an AI innovator, or an energetic sales professional, we want to hear about your experience, ideas, and ambitions. Share your background with us to explore where you can make an impact.
              </p>

              {/* Encouragement Highlight Note */}
              <div className="application-encouragement-card">
                <div className="encouragement-header">
                  <Sparkles size={18} className="encouragement-icon" aria-hidden="true" />
                  <h3 className="encouragement-title">Don't meet 100% of the requirements?</h3>
                </div>
                <p className="encouragement-text">
                  Apply anyway. At HTI Automation, we value curiosity, craftsmanship, and problem-solving capability as much as pedigree. If you are passionate about building dependable technology, we encourage you to submit your application.
                </p>
              </div>

              {/* Verified Project HR Contact Block */}
              <div className="hr-contact-card">
                <div className="hr-card-badge">HR & TALENT TEAM</div>
                <h3 className="hr-contact-title">Direct Talent Contact</h3>
                <p className="hr-contact-subtitle">
                  Have questions before applying or prefer to connect directly? Reach our team:
                </p>

                <div className="hr-contact-list">
                  <div className="hr-contact-item">
                    <div className="hr-icon-shell">
                      <Mail size={16} aria-hidden="true" />
                    </div>
                    <div className="hr-item-content">
                      <span className="hr-item-label">Careers Email</span>
                      <a href="mailto:careers@htisystems.in" className="hr-item-link">
                        careers@htisystems.in
                      </a>
                    </div>
                  </div>

                  <div className="hr-contact-item">
                    <div className="hr-icon-shell">
                      <Phone size={16} aria-hidden="true" />
                    </div>
                    <div className="hr-item-content">
                      <span className="hr-item-label">Telephone / HR Desk</span>
                      <a href="tel:+919992756077" className="hr-item-link">
                        +91 9992756077 / 9594917010
                      </a>
                    </div>
                  </div>

                  <div className="hr-contact-item">
                    <div className="hr-icon-shell">
                      <MapPin size={16} aria-hidden="true" />
                    </div>
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

            {/* Right Column: Application Form */}
            <div className="application-form-col">
              <div className="application-form-card">
                <div className="form-card-header">
                  <h3 className="form-card-title">Candidate Application</h3>
                  <p className="form-card-subtitle">
                    Complete the details below to submit your profile for consideration.
                  </p>
                </div>

                {submissionStatus === 'missing_backend' ? (
                  <div className="integration-notice-box" role="alert">
                    <div className="integration-notice-header">
                      <AlertCircle className="notice-icon" size={22} aria-hidden="true" />
                      <h4 className="notice-title">Application Validated — Backend Integration Notice</h4>
                    </div>

                    <p className="notice-desc">
                      An automated application submission endpoint (<code>/api/careers/apply</code>) is not yet configured on the server. Your information has been completely validated and is ready to submit.
                    </p>

                    <p className="notice-action-prompt">
                      To ensure your application is delivered directly to our Talent Acquisition team, please click below to send your pre-formatted details via email and attach your resume file:
                    </p>

                    <div className="notice-actions-group">
                      <a
                        href={mailtoHref}
                        className="btn-mailto-fallback"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Mail size={16} aria-hidden="true" />
                        <span>Send Application via Email Client</span>
                      </a>

                      <button
                        type="button"
                        className="btn-edit-details"
                        onClick={() => setSubmissionStatus(null)}
                      >
                        Edit Details
                      </button>
                    </div>

                    <div className="notice-details-preview">
                      <span className="preview-label">Prepared Submission:</span>
                      <div className="preview-tags">
                        <span><strong>Name:</strong> {formData.fullName}</span>
                        <span><strong>Role:</strong> {formData.position}</span>
                        <span><strong>Email:</strong> {formData.email}</span>
                        <span><strong>Phone:</strong> {formData.phone}</span>
                        {resumeFile && <span><strong>Resume:</strong> {resumeFile.name}</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="application-actual-form">
                    {/* Full Name & Email */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="fullName" className="form-label">
                          <span>Full Name <span className="required-star">*</span></span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          className={`form-input ${formErrors.fullName ? 'has-error' : ''}`}
                          placeholder="e.g. Rahul Sharma"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          aria-required="true"
                          aria-invalid={!!formErrors.fullName}
                          aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                          disabled={isSubmitting}
                        />
                        {formErrors.fullName && (
                          <span id="fullName-error" className="field-error-msg" role="alert">
                            <AlertCircle size={14} aria-hidden="true" />
                            {formErrors.fullName}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          <span>Email Address <span className="required-star">*</span></span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`form-input ${formErrors.email ? 'has-error' : ''}`}
                          placeholder="rahul.sharma@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          aria-required="true"
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                          disabled={isSubmitting}
                        />
                        {formErrors.email && (
                          <span id="email-error" className="field-error-msg" role="alert">
                            <AlertCircle size={14} aria-hidden="true" />
                            {formErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Phone Number & Position Applying For */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          <span>Phone Number <span className="required-star">*</span></span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className={`form-input ${formErrors.phone ? 'has-error' : ''}`}
                          placeholder="+91 98201 12345"
                          value={formData.phone}
                          onChange={handleInputChange}
                          aria-required="true"
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                          disabled={isSubmitting}
                        />
                        {formErrors.phone && (
                          <span id="phone-error" className="field-error-msg" role="alert">
                            <AlertCircle size={14} aria-hidden="true" />
                            {formErrors.phone}
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="position" className="form-label">
                          <span>Position Applying For <span className="required-star">*</span></span>
                        </label>
                        <select
                          id="position"
                          name="position"
                          className={`form-select ${formErrors.position ? 'has-error' : ''}`}
                          value={formData.position}
                          onChange={handleInputChange}
                          aria-required="true"
                          aria-invalid={!!formErrors.position}
                          aria-describedby={formErrors.position ? 'position-error' : undefined}
                          disabled={isSubmitting}
                        >
                          <option value="">Select a role...</option>
                          {JOB_POSITIONS.map(pos => (
                            <option key={pos.id} value={pos.title}>
                              {pos.title} ({pos.categoryLabel})
                            </option>
                          ))}
                          <option value="General Consideration / Other Role">
                            General Consideration / Other Role
                          </option>
                        </select>
                        {formErrors.position && (
                          <span id="position-error" className="field-error-msg" role="alert">
                            <AlertCircle size={14} aria-hidden="true" />
                            {formErrors.position}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Relevant Experience & LinkedIn Profile URL */}
                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="experience" className="form-label">
                          <span>Relevant Experience</span>
                          <span className="optional-badge">Optional</span>
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          className="form-select"
                          value={formData.experience}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        >
                          <option value="">Select experience level...</option>
                          <option value="Entry-Level / 0-1 Year">Entry-Level / 0-1 Year</option>
                          <option value="1 - 3 Years">1 - 3 Years</option>
                          <option value="3 - 5 Years">3 - 5 Years</option>
                          <option value="5 - 8 Years">5 - 8 Years</option>
                          <option value="8+ Years / Senior Specialist">8+ Years / Senior Specialist</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="linkedinUrl" className="form-label">
                          <span>LinkedIn Profile URL</span>
                          <span className="optional-badge">Optional</span>
                        </label>
                        <input
                          type="url"
                          id="linkedinUrl"
                          name="linkedinUrl"
                          className={`form-input ${formErrors.linkedinUrl ? 'has-error' : ''}`}
                          placeholder="https://linkedin.com/in/username"
                          value={formData.linkedinUrl}
                          onChange={handleInputChange}
                          aria-invalid={!!formErrors.linkedinUrl}
                          aria-describedby={formErrors.linkedinUrl ? 'linkedinUrl-error' : undefined}
                          disabled={isSubmitting}
                        />
                        {formErrors.linkedinUrl && (
                          <span id="linkedinUrl-error" className="field-error-msg" role="alert">
                            <AlertCircle size={14} aria-hidden="true" />
                            {formErrors.linkedinUrl}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Portfolio / GitHub URL */}
                    <div className="form-group">
                      <label htmlFor="portfolioUrl" className="form-label">
                        <span>Portfolio / GitHub URL</span>
                        <span className="optional-badge">Optional</span>
                      </label>
                      <input
                        type="url"
                        id="portfolioUrl"
                        name="portfolioUrl"
                        className={`form-input ${formErrors.portfolioUrl ? 'has-error' : ''}`}
                        placeholder="https://github.com/username or personal website"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        aria-invalid={!!formErrors.portfolioUrl}
                        aria-describedby={formErrors.portfolioUrl ? 'portfolioUrl-error' : undefined}
                        disabled={isSubmitting}
                      />
                      {formErrors.portfolioUrl && (
                        <span id="portfolioUrl-error" className="field-error-msg" role="alert">
                          <AlertCircle size={14} aria-hidden="true" />
                          {formErrors.portfolioUrl}
                        </span>
                      )}
                    </div>

                    {/* Resume Upload (PDF / DOC / DOCX - Max 5MB) */}
                    <div className="form-group">
                      <label htmlFor="resumeUpload" className="form-label">
                        <span>Resume / Curriculum Vitae</span>
                        <span className="optional-badge">PDF, DOC, DOCX · Max 5 MB</span>
                      </label>

                      {resumeFile ? (
                        <div className="resume-file-selected">
                          <div className="file-info-group">
                            <FileText size={20} className="file-selected-icon" aria-hidden="true" />
                            <div className="file-details">
                              <span className="file-name">{resumeFile.name}</span>
                              <span className="file-size">{(resumeFile.size / 1024).toFixed(1)} KB</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="file-remove-btn"
                            onClick={handleRemoveFile}
                            aria-label="Remove attached resume"
                            disabled={isSubmitting}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="resume-upload-zone"
                          onClick={() => document.getElementById('resumeUpload')?.click()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              document.getElementById('resumeUpload')?.click();
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label="Upload resume file, PDF, DOC, or DOCX up to 5 megabytes"
                        >
                          <UploadCloud size={28} className="upload-icon" aria-hidden="true" />
                          <div className="upload-text-group">
                            <span className="upload-main-text">
                              <strong>Click to browse</strong> or drag and drop your resume
                            </span>
                            <span className="upload-sub-text">
                              Supported formats: PDF, DOC, DOCX (Maximum file size: 5 MB)
                            </span>
                          </div>
                          <input
                            type="file"
                            id="resumeUpload"
                            name="resume"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="visually-hidden-input"
                            onChange={handleFileChange}
                            disabled={isSubmitting}
                          />
                        </div>
                      )}

                      {formErrors.resume && (
                        <span className="field-error-msg" role="alert">
                          <AlertCircle size={14} aria-hidden="true" />
                          {formErrors.resume}
                        </span>
                      )}
                    </div>

                    {/* Short Message */}
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        <span>Short Message</span>
                        <span className="optional-badge">Optional</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="form-textarea"
                        placeholder="Share anything you'd like us to know about your background, career aspirations, or engineering projects..."
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Privacy Consent Checkbox */}
                    <div className="privacy-checkbox-row">
                      <input
                        type="checkbox"
                        id="agreePrivacy"
                        name="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onChange={handleInputChange}
                        className="privacy-checkbox"
                        aria-required="true"
                        aria-invalid={!!formErrors.agreePrivacy}
                        aria-describedby={formErrors.agreePrivacy ? 'privacy-error' : undefined}
                        disabled={isSubmitting}
                      />
                      <label htmlFor="agreePrivacy" className="privacy-label">
                        I agree to the processing of my application details by HTI Automation in accordance with the{' '}
                        <button
                          type="button"
                          className="privacy-policy-link"
                          onClick={(e) => {
                            e.preventDefault();
                            if (onNavigate) onNavigate('about');
                          }}
                        >
                          Privacy Policy
                        </button>
                        . <span className="required-star">*</span>
                      </label>
                    </div>
                    {formErrors.agreePrivacy && (
                      <span id="privacy-error" className="field-error-msg privacy-error" role="alert">
                        <AlertCircle size={14} aria-hidden="true" />
                        {formErrors.agreePrivacy}
                      </span>
                    )}

                    {/* Submit Button */}
                    <div className="form-actions-wrapper">
                      <button
                        type="submit"
                        className="careers-submit-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="btn-spinner" aria-hidden="true" />
                            <span>Validating & Processing...</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} aria-hidden="true" />
                            <span>Submit Application</span>
                          </>
                        )}
                      </button>

                      <p className="form-security-note">
                        <ShieldCheck size={14} className="security-icon" aria-hidden="true" />
                        <span>All candidate data is handled confidentially by HTI Talent Acquisition.</span>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Section 6: Frequently Asked Questions (Minimalist Editorial Accordion) */}
      <section
        className="careers-faq-section"
        id="faq"
        aria-label="Frequently Asked Questions"
      >
        <div className="container">
          <div className="faq-editorial-grid">

            {/* Left Column: Heading & Introductory Text */}
            <div className="faq-header-col">
              <div className="faq-eyebrow">
                <span className="faq-eyebrow-line" aria-hidden="true" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>

              <h2 className="faq-heading">
                Frequently asked questions.
              </h2>

              <p className="faq-intro-text">
                Everything you need to know before taking the next step in your career with HTI Automation.
              </p>

              {/* Direct Support Box */}
              <div className="faq-help-box">
                <span className="faq-help-label">Have a specific question?</span>
                <p className="faq-help-text">
                  Our talent acquisition team is available to help. Reach out directly at{' '}
                  <a href="mailto:careers@htisystems.in" className="faq-help-link">
                    careers@htisystems.in
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Right Column: Clean Editorial Accordion with Thin Divider Lines */}
            <div className="faq-accordion-col">
              <div className="faq-accordion-list" role="presentation">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  const questionId = `faq-q-${idx}`;
                  const answerId = `faq-a-${idx}`;

                  return (
                    <div
                      key={item.id}
                      className={`faq-item ${isOpen ? 'is-expanded' : ''}`}
                    >
                      <button
                        type="button"
                        id={questionId}
                        className="faq-trigger"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                      >
                        <span className="faq-question-text">{item.question}</span>
                        <span className="faq-icon-wrapper" aria-hidden="true">
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </span>
                      </button>

                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        className={`faq-answer-panel ${isOpen ? 'is-open' : ''}`}
                      >
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

      {/* 8. Role Details Modal (Accessible, Complete, Connected to Email & Contact) */}
      {selectedRole && (
        <div
          className="role-modal-overlay"
          onClick={() => setSelectedRole(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-role-title"
        >
          <div
            className="role-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="role-modal-header">
              <div className="role-modal-title-group">
                <div className="role-modal-badges">
                  <span className="role-badge-category">{selectedRole.categoryLabel}</span>
                  <span className="role-badge-type">{selectedRole.employmentType}</span>
                </div>
                <h3 id="modal-role-title" className="role-modal-title">{selectedRole.title}</h3>
                <div className="role-modal-meta-row">
                  <span className="role-meta-item">
                    <Building2 size={14} className="meta-icon" />
                    <span>{selectedRole.department}</span>
                  </span>
                  <span className="role-meta-sep">•</span>
                  <span className="role-meta-item">
                    <MapPin size={14} className="meta-icon" />
                    <span>{selectedRole.location}</span>
                  </span>
                  <span className="role-meta-sep">•</span>
                  <span className="role-meta-item">
                    <Clock size={14} className="meta-icon" />
                    <span>{selectedRole.experience} Experience</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="role-modal-close-btn"
                onClick={() => setSelectedRole(null)}
                aria-label="Close role details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="role-modal-body">
              {/* Overview */}
              <div className="role-modal-section">
                <h4 className="role-section-heading">Role Overview</h4>
                <p className="role-section-text">{selectedRole.summary}</p>
              </div>

              {/* Responsibilities */}
              <div className="role-modal-section">
                <h4 className="role-section-heading">Key Responsibilities</h4>
                <ul className="role-points-list">
                  {selectedRole.responsibilities.map((resp, idx) => (
                    <li key={idx} className="role-point-item">
                      <CheckCircle2 size={16} className="role-check-icon" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="role-modal-section">
                <h4 className="role-section-heading">Qualifications & Skills</h4>
                <ul className="role-points-list">
                  {selectedRole.requirements.map((req, idx) => (
                    <li key={idx} className="role-point-item">
                      <CheckCircle2 size={16} className="role-check-icon" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="role-modal-footer">
              <div className="modal-footer-info">
                <span>To apply, email your resume to <strong>careers@htisystems.in</strong></span>
              </div>
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn-primary modal-apply-btn"
                  onClick={() => handleApplyForRole(selectedRole.title)}
                >
                  <FileText size={16} />
                  <span>Apply with Online Form</span>
                </button>
                <a
                  href={`mailto:careers@htisystems.in?subject=Application for ${encodeURIComponent(selectedRole.title)} - HTI Automation`}
                  className="btn-secondary modal-inquire-btn"
                >
                  <Mail size={16} />
                  <span>Apply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
