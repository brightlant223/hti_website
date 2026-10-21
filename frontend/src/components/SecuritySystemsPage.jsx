import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Video,
  Lock,
  Flame,
  Activity,
  Car,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Mail,
  Send,
  X,
  Maximize2,
  Volume2,
  VolumeX,
  FileText,
  Clock,
  Award,
  Layers,
  Cpu,
  Eye,
  SlidersHorizontal,
  Bell,
  Check,
  HelpCircle
} from 'lucide-react';
import './SecuritySystemsPage.css';

// 5 SOLUTION CATEGORIES (matching tab bar in screenshot)
const SOLUTION_CATEGORIES = [
  { id: 'all', label: 'All Solutions', icon: Layers },
  { id: 'surveillance', label: 'Smart Surveillance', icon: Video },
  { id: 'access', label: 'Access Control', icon: Lock },
  { id: 'fire', label: 'Fire & Life Safety', icon: Flame },
  { id: 'environment', label: 'Environmental Monitoring', icon: Activity },
  { id: 'parking', label: 'Parking Solutions', icon: Car }
];

// FEATURED SOLUTIONS (5 Solutions displayed in 1 Line)
const FEATURED_SOLUTIONS = [
  {
    id: 'cctv',
    category: 'surveillance',
    title: 'CCTV Surveillance',
    subtitle: '4K IP Cameras with AI',
    image: '/cctv-featured-dome.jpg',
    badge: 'AI Detection',
    highlight: '4K Ultra-HD Resolution',
    keyFeatures: [
      '4K UHD (8MP) AI Analytics',
      'Facial & Vehicle LPR Capture',
      '80m Starlight IR Night Vision'
    ],
    description: 'High-definition 4K IP cameras with deep learning video analytics for perimeter tripwire, object tracking, and central VMS management.',
    specs: [
      '4K Ultra HD (3840×2160) Resolution @ 30fps',
      'Deep Learning Facial & Vehicle Recognition (ANPR)',
      'Smart IR Night Vision up to 80m & 30x Optical Zoom',
      'H.265+ Ultra-Efficient Bandwidth Compression'
    ],
    applications: ['Corporate IT Campuses', 'Industrial Plants', 'Logistics Warehouses', 'Commercial Hubs']
  },
  {
    id: 'access',
    category: 'access',
    title: 'Access Control',
    subtitle: 'Biometric & Time Attendance',
    image: '/cctv-featured-biometric.jpg',
    badge: 'Touchless Multi-Modal',
    highlight: '0.2s Facial Scan',
    keyFeatures: [
      '0.2s Touchless Face & Palm',
      '21 CFR Part 11 Audit Trail',
      'RFID, PIN & Mobile NFC Key'
    ],
    description: 'Multi-spectral biometric attendance and access terminals with anti-spoofing liveness detection, RFID card readers, and automated payroll integration.',
    specs: [
      '0.2s Touchless Face & Palm Recognition with Dual Lenses',
      'USFDA 21 CFR Part 11 Audit Trail & Encrypted Logs',
      'Multi-Credential Support: Face, Fingerprint, RFID & Mobile NFC',
      'Direct Relay Integration with Cleanroom Interlocks & Flap Barriers'
    ],
    applications: ['Pharma Cleanrooms', 'BFSI Server Rooms', 'Corporate Head Offices', 'Manufacturing Airlocks']
  },
  {
    id: 'fire',
    category: 'fire',
    title: 'Fire Alarm System',
    subtitle: 'Conventional & Addressable',
    image: '/cctv-featured-fire-panel.jpg',
    badge: 'NBC 2016 / UL',
    highlight: 'Life-Safety Interlock',
    keyFeatures: [
      '1 to 8 Loop Microprocessor',
      'NBC 2016 Part 4 Certified',
      'Fail-Safe Interlock Trip Relay'
    ],
    description: 'Certified addressable and conventional fire alarm panels with fail-safe interlock trip relays and multi-loop smoke and thermal detectors.',
    specs: [
      '1 to 8 Loop Microprocessor Addressable Panel Architecture',
      'Addressable Optical Smoke, Heat & Flame Multi-Sensor Heads',
      'Instant Fail-Safe Electromagnetic Lock Release Relays',
      'Integrated Public Address & Voice Evacuation (PA/VA) System'
    ],
    applications: ['Industrial Warehouses', 'Chemical & API Storage', 'Commercial High-Rises', 'Hospitals & Healthcare']
  },
  {
    id: 'parking',
    category: 'parking',
    title: 'Parking & Entry',
    subtitle: 'Barrier Gate System',
    image: '/cctv-featured-barrier.jpg',
    badge: 'High Duty Cycle',
    highlight: '100% Continuous Duty',
    keyFeatures: [
      '0.9s–3s Fast Boom Arm',
      '5M+ Cycle Brushless Motor',
      'FastTag & ANPR Integration'
    ],
    description: 'Heavy-duty automatic boom barriers, toll gates, and bollards engineered with brushless DC motors for high-throughput vehicular perimeter security.',
    specs: [
      '0.9s to 3s High-Speed Opening with Telescopic / Articulated Arms',
      'Brushless DC Motor Rated for 5 Million+ Continuous Cycles',
      'Integrated Long-Range RFID FastTag & ANPR Number Plate Readers',
      'Anti-Crush Safety Dual Photocell & Magnetic Ground Loop Detectors'
    ],
    applications: ['Toll Plazas & IT Parks', 'Gated Logistics Parks', 'Commercial Basement Parking', 'High-Security Entry Gates']
  },
  {
    id: 'environment',
    category: 'environment',
    title: 'Environmental Telemetry',
    subtitle: 'Server Room & Cold Storage',
    image: '/cctv-featured-telemetry.jpg',
    badge: '24/7 Sensors',
    highlight: 'Early Risk Warning',
    keyFeatures: [
      'Temp & RH Digital Telemetry',
      'Under-Floor Water Rope Leak',
      'Instant SMS & SNMP Siren'
    ],
    description: 'Real-time telemetry and environmental protection tracking temperature, humidity, water leakage, and smoke for critical IT infrastructure.',
    specs: [
      'Calibrated Temperature (-40°C to +85°C) & Precision RH Sensors',
      'Conductive Sensing Rope for Under-Floor Fluid & Water Leak Detection',
      'Instant Multi-Channel Alerts: SMS, Email, SNMP Traps & Siren Tower',
      'Seamless Integration with Central BMS & SCADA Monitoring Gateways'
    ],
    applications: ['Data Centers & IT Hubs', 'Pharma Stability Chambers', 'Telecom Tower Shelters', 'Cold Storage Warehouses']
  }
];

// 4-STEP PROCESS (requested in prompt)
const FOUR_STEP_PROCESS = [
  {
    num: '01',
    title: 'Site Survey & Assessment',
    desc: 'Comprehensive facility walkthrough, camera angle & field-of-view mapping, blind-spot identification, and security risk assessment.'
  },
  {
    num: '02',
    title: 'System Design & Engineering',
    desc: 'Detailed CAD wiring layouts, NVR storage and bandwidth calculations, and strict compliance mapping for NBC 2016 and UL standards.'
  },
  {
    num: '03',
    title: 'Turnkey Installation & Commissioning',
    desc: 'Structured optical fiber cabling, clean device mounting, AI boundary configuration, and integration with fire alarms and door locks.'
  },
  {
    num: '04',
    title: '24/7 Monitoring & AMC Support',
    desc: 'Central VMS dashboard handover, hands-on operator training, diagnostic monitoring, and guaranteed 4-hour SLA preventive maintenance.'
  }
];

// WHY CHOOSE US
const WHY_CHOOSE_US = [
  {
    icon: Cpu,
    title: 'Enterprise AI Telemetry',
    desc: 'Edge analytics with facial recognition, ANPR vehicle plate capture, perimeter intrusion alarms, and real-time loitering alerts.'
  },
  {
    icon: ShieldCheck,
    title: 'Turnkey Execution',
    desc: 'End-to-end responsibility from preliminary CAD design to hardware supply, structured cabling, and statutory commissioning.'
  },
  {
    icon: Award,
    title: 'Statutory Compliance',
    desc: 'Fully certified systems adhering to NBC 2016 Part 4, TAC guidelines, UL standards, and USFDA 21 CFR Part 11 audit requirements.'
  },
  {
    icon: Clock,
    title: '99.9% Uptime & SLA',
    desc: 'Redundant power architecture, failover NVR clustering, and rapid on-site AMC support with guaranteed 4-hour response across India.'
  }
];

// FAQS (matching reference screenshot)
const FAQS = [
  {
    id: '01',
    q: 'What CCTV surveillance systems do you provide?',
    a: 'We deliver end-to-end 4K Ultra-HD IP surveillance systems, PTZ speed dome cameras, panoramic fisheye cameras, thermal vision, and ATEX flameproof Ex-d explosion-proof cameras for hazardous environments. Powered by central Video Management Software (VMS) with AI deep-learning analytics.'
  },
  {
    id: '02',
    q: 'How does the access control system work?',
    a: 'Our systems integrate multi-spectral contactless facial recognition terminals, optical fingerprint sensors, RFID smart cards, and mobile Bluetooth credentials. They communicate with electromagnetic locks, boom barriers, and turnstiles, maintaining real-time audit logs compliant with USFDA 21 CFR Part 11 and corporate HR payroll software.'
  },
  {
    id: '03',
    q: 'Are your systems compliant with NBC 2016 / UL?',
    a: 'Yes. All life-safety installations, addressable fire alarm panels, and emergency egress interlocks strictly adhere to the National Building Code of India (NBC 2016 Part 4), Tariff Advisory Committee (TAC) guidelines, and UL/FM international standards.'
  },
  {
    id: '04',
    q: 'Do you provide installation and AMC support?',
    a: 'Absolutely. We provide complete turnkey execution—from initial site survey, CAD layout engineering, and optical cabling to final commissioning. We offer Comprehensive and Non-Comprehensive Annual Maintenance Contracts (AMC) with guaranteed 4-hour response SLAs across India.'
  },
  {
    id: '05',
    q: 'Can the system be integrated with existing infrastructure?',
    a: 'Yes. Our open-architecture platforms support standard ONVIF, Wiegand, OSDP, and BACnet/Modbus IP protocols, enabling seamless integration with your existing BMS (Building Management System), third-party cameras, cleanroom interlocks, and IT server room monitoring tools.'
  },
  {
    id: '06',
    q: 'Do you offer customized solutions?',
    a: 'Every facility has unique security requirements. We design custom solutions tailored to your operational risk profile—including explosion-proof cameras for chemical plants, cleanroom-flush biometric panels for pharma gowning rooms, and multi-lane ANPR barrier gates for logistics parks.'
  }
];

// VIDEO CHAPTERS (matching right column in screenshot)
const VIDEO_CHAPTERS = [
  { title: 'Real Project Footage', desc: '4K live deployments across corporate IT and industrial hubs' },
  { title: 'Live Monitoring Demo', desc: 'Centralized VMS command console with multi-screen grid' },
  { title: 'AI Analytics in Action', desc: 'Perimeter tripwire, vehicle ANPR, and facial detection tests' },
  { title: 'Client Success Stories', desc: 'Turnkey security infrastructure delivered across Mumbai & India' }
];

export default function SecuritySystemsPage({ onNavigate, onQuickQuote }) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFaq, setActiveFaq] = useState(0); // first FAQ open by default
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const videoRef = useRef(null);

  // Toggle inline video play/pause
  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    } else {
      setVideoModalOpen(true);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Filter solutions by active tab
  const displayedSolutions = activeTab === 'all'
    ? FEATURED_SOLUTIONS
    : FEATURED_SOLUTIONS.filter(item => item.category === activeTab);

  const handleOpenQuote = (customSubject = 'Security Systems Turnkey BOQ Inquiry') => {
    if (onQuickQuote) {
      onQuickQuote(customSubject);
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <div className="security-page-root">
      {/* =========================================================================
          1. HERO SECTION (Matching Reference Screenshot)
          ========================================================================= */}
      <section className="security-hero-section">
        <div className="security-container">
          <div className="security-hero-grid">
            {/* Left Column: Heading, Subtext, Buttons & Trust Strip */}
            <div className="security-hero-left">
              <div className="security-kicker-badge">
                <span>INTEGRATED SECURITY SOLUTIONS</span>
              </div>

              <h1 className="security-hero-headline">
                Protect What <br />
                <span className="security-blue-accent">Matters Most</span>
              </h1>

              <p className="security-hero-subtext">
                AI-driven surveillance, access control, fire &amp; life safety and environmental
                monitoring for a safer and smarter future.
              </p>

              {/* Action Buttons */}
              <div className="security-hero-actions-row">
                <button
                  className="btn-security-primary"
                  onClick={() => handleOpenQuote('Security System Consultation Request')}
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  className="btn-security-video"
                  onClick={() => setVideoModalOpen(true)}
                >
                  <div className="btn-video-play-icon">
                    <Play size={13} fill="#0284c7" />
                  </div>
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Trust Metric Strip */}
              <div className="security-hero-trust-strip">
                <div className="trust-strip-item">
                  <div className="trust-icon-box">
                    <Video size={18} className="text-sky-600" />
                  </div>
                  <div className="trust-text-box">
                    <div className="trust-value">12,000+</div>
                    <div className="trust-label">Cameras Deployed</div>
                  </div>
                </div>

                <div className="trust-strip-divider"></div>

                <div className="trust-strip-item">
                  <div className="trust-icon-box">
                    <ShieldCheck size={18} className="text-sky-600" />
                  </div>
                  <div className="trust-text-box">
                    <div className="trust-value">250,000+</div>
                    <div className="trust-label">Sites Secured</div>
                  </div>
                </div>

                <div className="trust-strip-divider"></div>

                <div className="trust-strip-item">
                  <div className="trust-icon-box">
                    <Award size={18} className="text-sky-600" />
                  </div>
                  <div className="trust-text-box">
                    <div className="trust-value">NBC 2016 / UL</div>
                    <div className="trust-label">Compliant</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with CCTV & Floating Telemetry Badges */}
            <div className="security-hero-right">
              <div className="security-hero-media-wrap">
                <img
                  src="/cctv-hero-ai.jpg"
                  alt="Enterprise AI Security & 4K CCTV Surveillance"
                  className="security-hero-img"
                  loading="eager"
                />

                {/* Floating Telemetry Badges (Matching Screenshot) */}
                <div className="floating-telemetry-badge badge-ai-detection">
                  <span className="telemetry-dot dot-green"></span>
                  <span className="telemetry-text">AI Detection</span>
                </div>

                <div className="floating-telemetry-badge badge-realtime-alerts">
                  <Bell size={14} className="text-purple-600" />
                  <span className="telemetry-text">Real-time Alerts</span>
                </div>

                <div className="floating-telemetry-badge badge-monitoring-247">
                  <Clock size={14} className="text-sky-600" />
                  <span className="telemetry-text">24/7 Monitoring</span>
                </div>

                {/* Simulated AI Recognition Frame Overlay */}
                <div className="ai-recognition-box">
                  <div className="ai-box-corner top-left"></div>
                  <div className="ai-box-corner top-right"></div>
                  <div className="ai-box-corner bottom-left"></div>
                  <div className="ai-box-corner bottom-right"></div>
                  <div className="ai-box-label">VEHICLE LPR: ACTIVE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. QUICK SOLUTION CATEGORIES FILTER BAR (Matching Screenshot)
          ========================================================================= */}
      <section className="security-category-bar-section">
        <div className="security-container">
          <div className="security-category-pills-bar">
            {SOLUTION_CATEGORIES.map(category => {
              const IconComp = category.icon;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  className={`security-category-pill-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(category.id)}
                >
                  <div className="category-pill-icon-wrap">
                    <IconComp size={16} />
                  </div>
                  <span className="category-pill-label">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED SOLUTIONS SECTION (Matching Screenshot)
          ========================================================================= */}
      <section className="security-featured-section">
        <div className="security-container">
          {/* Header Row */}
          <div className="security-section-header-row">
            <div>
              <h2 className="security-section-title">Featured Solutions</h2>
              <p className="security-section-sub">
                Advanced security systems for modern infrastructure.
              </p>
            </div>

            <button
              className="btn-view-all-products"
              onClick={() => onNavigate ? onNavigate('catalog') : handleOpenQuote()}
            >
              <span>View All Products</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Cards Grid (4 in 1 line on desktop, matching screenshot) */}
          <div className="security-featured-grid">
            {displayedSolutions.map(solution => (
              <div
                key={solution.id}
                className="security-solution-card"
                onClick={() => setSelectedSolution(solution)}
              >
                <div className="solution-card-media-wrap">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="solution-card-img"
                    loading="lazy"
                  />
                  {solution.badge && (
                    <span className="solution-card-badge">{solution.badge}</span>
                  )}
                </div>

                <div className="solution-card-body">
                  <div className="solution-card-header-info">
                    <h3 className="solution-card-title">{solution.title}</h3>
                    <p className="solution-card-sub">{solution.subtitle}</p>
                  </div>

                  {/* Card Feature Details */}
                  {solution.keyFeatures && (
                    <ul className="solution-card-features-list">
                      {solution.keyFeatures.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <CheckCircle2 size={12} className="feature-check-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="solution-card-footer">
                    <button
                      className="solution-card-action-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSolution(solution);
                      }}
                    >
                      <span>View Details</span>
                      <ArrowRight size={13} className="action-arrow" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. VIDEO SECTION: Smart Security in Real Environments (Matching Screenshot)
          ========================================================================= */}
      <section className="security-video-section" id="security-video">
        <div className="security-container">
          <div className="security-video-grid">
            {/* Left Column: Interactive Video Player Card */}
            <div className="security-video-card">
              <div className="security-video-frame-wrap">
                {/* Real Video or Poster Display */}
                <video
                  ref={videoRef}
                  src="/automatic_sliding.mp4"
                  poster="/cctv-video-thumb.jpg"
                  className="security-embedded-video"
                  loop
                  muted={isMuted}
                  playsInline
                />

                <div className="security-video-scrim"></div>

                {/* Video Title Overlay (Matching Screenshot) */}
                <div className="security-video-overlay-text">
                  <h3>Smart Security <br />in Real Environments</h3>
                </div>

                {/* Big Glowing Play Button */}
                {!isVideoPlaying && (
                  <button
                    className="security-center-play-btn"
                    onClick={handleTogglePlay}
                    aria-label="Play Security Demo Video"
                  >
                    <div className="play-pulse-ring"></div>
                    <Play size={24} fill="#ffffff" className="play-icon-glyph" />
                  </button>
                )}

                {/* Bottom Video Controls Bar (Matching Screenshot) */}
                <div className="security-video-controls-bar">
                  <div className="video-controls-left">
                    <button
                      className="control-icon-btn"
                      onClick={handleTogglePlay}
                      aria-label={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                    >
                      {isVideoPlaying ? <Pause size={14} /> : <Play size={14} fill="#ffffff" />}
                    </button>
                    <span className="video-timecode">0:00 / 2:36</span>
                  </div>

                  <div className="video-controls-right">
                    <button
                      className="control-icon-btn"
                      onClick={handleToggleMute}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                    <button
                      className="control-icon-btn"
                      onClick={() => setVideoModalOpen(true)}
                      aria-label="Full Screen"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: "More Than Security, A Safer Tomorrow" & Chapters */}
            <div className="security-video-info-col">
              <div className="video-info-header">
                <h2 className="video-col-heading">
                  More Than Security <br />
                  <span className="text-navy-main">A Safer Tomorrow</span>
                </h2>
                <p className="video-col-desc">
                  Watch how our integrated security systems create safer, smarter and more
                  connected environments.
                </p>
              </div>

              {/* 4 Interactive Video Chapters (Matching Screenshot) */}
              <div className="video-chapters-list">
                {VIDEO_CHAPTERS.map((chap, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`video-chapter-item ${isActive ? 'is-active' : ''}`}
                      onClick={() => {
                        setActiveChapterIndex(idx);
                        setVideoModalOpen(true);
                      }}
                    >
                      <div className="chapter-play-circle">
                        <Play size={13} fill="#0284c7" />
                      </div>
                      <div className="chapter-text-wrap">
                        <h4 className="chapter-title">{chap.title}</h4>
                        <p className="chapter-desc">{chap.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FOUR-STEP ENGINEERING PROCESS (Requested in Prompt)
          ========================================================================= */}
      <section className="security-process-section">
        <div className="security-container">
          <div className="security-center-header">
            <span className="security-mini-tag">TURNKEY METHODOLOGY</span>
            <h2 className="security-section-title">Four-Step Implementation Process</h2>
            <p className="security-section-sub">
              From risk assessment to lifecycle SLA monitoring, HTI ensures seamless engineering execution.
            </p>
          </div>

          <div className="security-process-grid">
            {FOUR_STEP_PROCESS.map((step, idx) => (
              <div key={idx} className="security-process-card">
                <div className="process-card-num-badge">{step.num}</div>
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE US (Requested in Prompt)
          ========================================================================= */}
      <section className="security-why-section">
        <div className="security-container">
          <div className="security-center-header">
            <span className="security-mini-tag">ENGINEERING ADVANTAGE</span>
            <h2 className="security-section-title">Why Enterprises Choose HTI Security</h2>
            <p className="security-section-sub">
              Delivering high-reliability protection with intelligent AI automation and statutory compliance.
            </p>
          </div>

          <div className="security-why-grid">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="security-why-card">
                  <div className="why-icon-wrap">
                    <IconComp size={22} />
                  </div>
                  <h3 className="why-card-title">{item.title}</h3>
                  <p className="why-card-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FREQUENTLY ASKED QUESTIONS ACCORDION (Matching Screenshot)
          ========================================================================= */}
      <section className="security-faq-section">
        <div className="security-container">
          {/* Header */}
          <div className="security-section-header-row">
            <div>
              <h2 className="security-section-title">Frequently Asked Questions</h2>
              <p className="security-section-sub">
                Get answers to common questions about our security systems and services.
              </p>
            </div>

            <button
              className="btn-view-all-faqs"
              onClick={() => setActiveFaq(prev => prev === -1 ? 0 : -1)}
            >
              <span>{activeFaq === -1 ? 'Collapse FAQs' : 'View All FAQs'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Accordion Stack (Numbered 01 to 06 matching Screenshot) */}
          <div className="security-faq-accordion-stack">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx || activeFaq === -1;
              return (
                <div
                  key={faq.id}
                  className={`security-faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    className="security-faq-trigger"
                    onClick={() => setActiveFaq(prev => prev === idx ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-trigger-left">
                      <span className="faq-num-pill">{faq.id}</span>
                      <span className="faq-question-text">{faq.q}</span>
                    </div>
                    <div className="faq-trigger-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="security-faq-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. BOTTOM ESTIMATION & CTA BANNER (Matching Screenshot)
          ========================================================================= */}
      <section className="security-bottom-cta-section">
        <div className="security-container">
          <div className="security-cta-banner-card">
            {/* Left Content */}
            <div className="security-cta-left-content">
              <h2 className="security-cta-title">
                Need Turnkey Estimation for Your Security System?
              </h2>
              <p className="security-cta-desc">
                From site survey to final implementation, we provide detailed BOQs,
                CAD drawings and complete technical assistance.
              </p>
              <button
                className="btn-security-cta-white"
                onClick={() => handleOpenQuote('Turnkey Security System Estimation Request')}
              >
                <span>Request a Quote</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Cameras Image (Matching Screenshot) */}
            <div className="security-cta-right-media">
              <img
                src="/cctv-cta-cameras.jpg"
                alt="HTI 4K IP CCTV & Speed Dome Cameras"
                className="security-cta-cameras-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. MODALS: VIDEO PLAYER & PRODUCT DETAILS
          ========================================================================= */}
      {/* Video Modal */}
      {videoModalOpen && (
        <div className="security-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
          <div className="security-modal-container" onClick={e => e.stopPropagation()}>
            <div className="security-modal-header">
              <div>
                <span className="modal-kicker">HTI INTEGRATED SECURITY</span>
                <h3 className="modal-title">Smart Security in Real Environments</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setVideoModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="security-modal-video-wrap">
              <video
                src="/automatic_sliding.mp4"
                poster="/cctv-video-thumb.jpg"
                controls
                autoPlay
                className="modal-video-element"
              />
            </div>

            <div className="security-modal-footer">
              <p className="modal-caption-text">
                Live demonstration of AI boundary tracking, ANPR automatic number plate recognition, and central monitoring command.
              </p>
              <div className="modal-actions-row">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setVideoModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setVideoModalOpen(false);
                    handleOpenQuote('Security System Live Demonstration Request');
                  }}
                >
                  <Send size={14} />
                  <span>Request Site Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solution Details Modal */}
      {selectedSolution && (
        <div className="security-modal-backdrop" onClick={() => setSelectedSolution(null)}>
          <div className="security-modal-container modal-solution-detail" onClick={e => e.stopPropagation()}>
            <div className="security-modal-header">
              <div>
                <span className="modal-kicker">{selectedSolution.subtitle}</span>
                <h3 className="modal-title">{selectedSolution.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedSolution(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="solution-modal-body-grid">
              <div className="solution-modal-media">
                <img
                  src={selectedSolution.image}
                  alt={selectedSolution.title}
                  className="solution-modal-img"
                />
              </div>

              <div className="solution-modal-info">
                <p className="solution-modal-desc">{selectedSolution.description}</p>

                <h4 className="solution-modal-spec-heading">Technical Highlights:</h4>
                <ul className="solution-modal-specs-list">
                  {selectedSolution.specs.map((spec, sIdx) => (
                    <li key={sIdx}>
                      <CheckCircle2 size={15} className="text-sky-600 flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="solution-modal-spec-heading mt-3">Target Applications:</h4>
                <div className="solution-app-pills">
                  {selectedSolution.applications.map((app, aIdx) => (
                    <span key={aIdx} className="solution-app-tag">{app}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="security-modal-footer">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedSolution(null)}
              >
                Close
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  const title = selectedSolution.title;
                  setSelectedSolution(null);
                  handleOpenQuote(`Quotation Request for ${title}`);
                }}
              >
                <FileText size={14} />
                <span>Get Quotation for this Solution</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
