import React, { useState } from 'react';
import {
  ShieldCheck, Play, ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Camera, Lock, Flame, Activity, Car, Award, Clock, Layers, Settings,
  PhoneCall, Check, X, FileText, Cpu, ExternalLink, HelpCircle
} from 'lucide-react';
import './SecuritySystemsPage.css';

export default function SecuritySystemsPage({
  onNavigate,
  onQuickQuote,
  onSelectProduct
}) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0); // first FAQ open by default
  const [selectedSolutionModal, setSelectedSolutionModal] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    solution: 'CCTV Surveillance & AI Analytics',
    message: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // 5 Quick Service Strip Items (Matching screenshot icons bar)
  const quickCategories = [
    { id: 'surveillance', name: 'Smart Surveillance', icon: Camera, target: 'cctv' },
    { id: 'access', name: 'Access Control', icon: Lock, target: 'access' },
    { id: 'fire', name: 'Fire & Life Safety', icon: Flame, target: 'fire' },
    { id: 'env', name: 'Environmental Monitoring', icon: Activity, target: 'env' },
    { id: 'parking', name: 'Parking Solutions', icon: Car, target: 'parking' }
  ];

  // 4 Featured Solutions (Exact matching screenshot 4 cards)
  const featuredSolutions = [
    {
      id: 'cctv',
      title: 'CCTV Surveillance',
      subtitle: '4K IP Cameras with AI',
      image: '/cctv-featured-dome.jpg',
      badge: 'INTELLIGENT VISION',
      slug: 'cctv-surveillance',
      highlights: [
        '4K Ultra-HD 8MP Resolution with Sony STARVIS sensors',
        'Deep Learning AI: Facial recognition, line-crossing & ANPR',
        'Smart IR night vision up to 50 meters with true WDR 120dB',
        'Ex-d flameproof explosion-proof housing options for pharma'
      ]
    },
    {
      id: 'access',
      title: 'Access Control',
      subtitle: 'Biometric & Time Attendance',
      image: '/cctv-featured-biometric.jpg',
      badge: 'TOUCHLESS VERIFICATION',
      slug: 'biometric-access-control',
      highlights: [
        'Visible Light Contactless 3D Facial Recognition (<0.2s)',
        'Optical biometric fingerprint & Mifare RFID card support',
        'USFDA 21 CFR Part 11 compliant immutable audit trail logs',
        'Direct relay interface for electromagnetic locks & turnstiles'
      ]
    },
    {
      id: 'fire',
      title: 'Fire Alarm System',
      subtitle: 'Conventional & Addressable',
      image: '/cctv-featured-fire-panel.jpg',
      badge: 'LIFE SAFETY COMPLIANCE',
      slug: 'fire-alarm-system',
      highlights: [
        'Multi-loop addressable panel supporting up to 508 devices',
        'NBC 2016 Part 4 & UL/FM compliant detection protocols',
        'Emergency interlock relay dropping doors & AHUs on fire trip',
        'Integrated public address voice evacuation audio trigger'
      ]
    },
    {
      id: 'parking',
      title: 'Parking & Entry',
      subtitle: 'Barrier Gate System',
      image: '/cctv-featured-barrier.jpg',
      badge: 'PERIMETER DEFENSE',
      slug: 'boom-barriers',
      highlights: [
        'High-speed brushless DC motor (1.2s to 4.5s adjustable speed)',
        '100% continuous duty cycle exceeding 5 million operations',
        'FASTag RFID automatic tolling & loop detector integration',
        'LED illuminated boom arm with anti-crush safety rebound'
      ]
    }
  ];

  // 6 FAQs (Matching exact questions and icons from screenshot)
  const faqs = [
    {
      icon: Camera,
      question: 'What CCTV surveillance systems do you provide?',
      answer: 'We provide end-to-end enterprise video surveillance architectures including 4K Network IP Dome & Bullet cameras, PTZ long-range tracking, thermal perimeter sensors, and ATEX/IECEx certified Flameproof (Ex-d Group IIA, IIB, IIC) cameras for hazardous solvent areas. All systems integrate into a centralized VMS platform with AI analytics (perimeter intrusion, facial recognition, and license plate recognition).'
    },
    {
      icon: Lock,
      question: 'How does the access control system work?',
      answer: 'Our access control systems utilize multi-factor biometric authentication combining high-speed contactless 3D facial recognition, optical fingerprint scanning, encrypted Mifare RFID smartcards, and mobile BLE credentials. Every entry/exit is logged with microsecond timestamps and meets USFDA 21 CFR Part 11 audit guidelines with anti-passback and emergency fire release integration.'
    },
    {
      icon: Award,
      question: 'Are your systems compliant with NBC 2016 / UL?',
      answer: 'Yes. All HTI fire detection and alarm architectures are engineered strictly in accordance with National Building Code (NBC 2016 Part 4), IS standard guidelines, and UL/FM certified sensors. Our panels feature programmable potential-free relays that instantly drop access door electromagnetic locks, activate emergency voice evacuation, and ground elevators upon confirmed fire detection.'
    },
    {
      icon: Clock,
      question: 'Do you provide installation and AMC support?',
      answer: 'Yes, we provide complete turnkey engineering from initial site risk surveys, CAD layout design, conduit and cabling execution, rack termination, to final commissioning. We offer Comprehensive and Non-Comprehensive Annual Maintenance Contracts (AMC) backed by dedicated SLA response times and 24/7 on-call technical engineers.'
    },
    {
      icon: Layers,
      question: 'Can the system be integrated with existing infrastructure?',
      answer: 'Absolutely. Our systems feature open industry-standard protocols including ONVIF (Profile S, G, T, M), Wiegand, OSDP v2, dry contact relays, Modbus TCP/IP, and BACnet. This allows seamless integration into your existing building management systems (BMS), cleanroom door interlocks, HR payroll software, and IT security dashboards.'
    },
    {
      icon: Settings,
      question: 'Do you offer customized solutions?',
      answer: 'Yes. HTI specializes in custom engineering for demanding industrial and corporate sites. Whether you require stainless steel SS316 cleanroom housings, explosion-proof barriers, solar-powered perimeter radar, or automated multi-lane parking management with FASTag, our engineering team custom-builds the system to your exact site requirements.'
    }
  ];

  const handleOpenQuote = (solTitle) => {
    if (solTitle) {
      setQuoteForm(prev => ({ ...prev, solution: solTitle }));
    }
    setQuoteModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    if (onQuickQuote) {
      onQuickQuote(quoteForm.solution, 'Security Systems');
    }
    setTimeout(() => {
      setQuoteSubmitted(false);
      setQuoteModalOpen(false);
    }, 2500);
  };

  return (
    <div className="security-page-root">
      {/* =========================================================================
          1. BREADCRUMBS BAR
          ========================================================================= */}
      <div className="sec-breadcrumb-bar">
        <div className="sec-container">
          <div className="sec-breadcrumb-nav">
            <button className="sec-breadcrumb-link" onClick={() => onNavigate && onNavigate('home')}>Home</button>
            <span className="sec-breadcrumb-sep">&gt;</span>
            <span className="sec-breadcrumb-link" onClick={() => onNavigate && onNavigate('home', 'catalog')}>Services</span>
            <span className="sec-breadcrumb-sep">&gt;</span>
            <span className="sec-breadcrumb-current">CCTV Surveillance &amp; Biometrics</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. HERO SECTION ("Protect What Matters Most")
          ========================================================================= */}
      <section className="sec-hero-section">
        <div className="sec-container">
          <div className="sec-hero-grid">
            {/* Left Content */}
            <div className="sec-hero-left">
              <div className="sec-hero-pill-badge">
                <span className="sec-pulse-dot"></span>
                <span>INTEGRATED SECURITY SOLUTIONS</span>
              </div>

              <h1 className="sec-hero-title">
                Protect What <br />
                <span className="text-blue-glow">Matters Most</span>
              </h1>

              <p className="sec-hero-subtext">
                AI-driven surveillance, access control, fire &amp; life safety and environmental monitoring for a safer and smarter future.
              </p>

              <div className="sec-hero-actions-row">
                <button
                  className="btn-sec-primary"
                  onClick={() => handleOpenQuote('Comprehensive Security System')}
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  className="btn-sec-outline"
                  onClick={() => setVideoModalOpen(true)}
                >
                  <div className="play-icon-circle-sm">
                    <Play size={12} fill="#0284c7" />
                  </div>
                  <span>Watch Video</span>
                </button>
              </div>
            </div>

            {/* Right Media Graphic with Floating AI Badges */}
            <div className="sec-hero-right">
              <div className="sec-hero-graphic-wrap">
                <img
                  src="/cctv-hero-ai.jpg"
                  alt="AI-Driven CCTV Surveillance & Smart Security"
                  className="sec-hero-image"
                />

                {/* Floating Smart Badge 1: AI Detection */}
                <div className="smart-badge-float badge-ai-detection">
                  <div className="smart-badge-icon-box bg-green">
                    <Camera size={14} />
                  </div>
                  <span className="smart-badge-text">AI Detection</span>
                </div>

                {/* Floating Smart Badge 2: Real-time Alerts */}
                <div className="smart-badge-float badge-realtime-alerts">
                  <div className="smart-badge-icon-box bg-purple">
                    <Activity size={14} />
                  </div>
                  <div className="smart-badge-text-col">
                    <span className="smart-badge-text">Real-time Alerts</span>
                    <span className="smart-badge-sub">Instant push notification</span>
                  </div>
                </div>

                {/* Floating Smart Badge 3: 24/7 Monitoring */}
                <div className="smart-badge-float badge-monitoring">
                  <div className="smart-badge-icon-box bg-indigo">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="smart-badge-text">24/7 Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. QUICK SERVICE CATEGORIES STRIP (5 Horizontal Cards)
          ========================================================================= */}
      <section className="sec-categories-strip-section">
        <div className="sec-container">
          <div className="sec-categories-grid">
            {quickCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="sec-category-item"
                  onClick={() => {
                    const el = document.getElementById('featured-solutions-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="sec-cat-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <span className="sec-cat-name">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURED SOLUTIONS (4 Cards matching Screenshot)
          ========================================================================= */}
      <section className="sec-featured-section" id="featured-solutions-anchor">
        <div className="sec-container">
          <div className="sec-section-header-row">
            <div>
              <h2 className="sec-section-title">Featured Solutions</h2>
              <p className="sec-section-sub">Advanced security systems for modern infrastructure.</p>
            </div>
            <button
              className="btn-sec-outline-sm"
              onClick={() => onNavigate && onNavigate('home', 'catalog')}
            >
              <span>View All Products</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="sec-featured-cards-grid">
            {featuredSolutions.map((sol) => (
              <div key={sol.id} className="sec-solution-card">
                <div className="sec-solution-thumb-wrap">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="sec-solution-thumb"
                  />
                </div>

                <div className="sec-solution-body">
                  <h3 className="sec-solution-title">{sol.title}</h3>
                  <p className="sec-solution-desc">{sol.subtitle}</p>

                  <button
                    className="sec-view-details-btn"
                    onClick={() => setSelectedSolutionModal(sol)}
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. VIDEO & VALUE PROPOSITION ("More Than Security / A Safer Tomorrow")
          ========================================================================= */}
      <section className="sec-video-section">
        <div className="sec-container">
          <div className="sec-video-grid">
            {/* Left Column: Interactive Video Player Card */}
            <div className="sec-video-player-card" onClick={() => setVideoModalOpen(true)}>
              <div className="sec-video-media-wrap">
                <img
                  src="/cctv-video-thumb.jpg"
                  alt="Smart Security in Real Environments"
                  className="sec-video-thumb-img"
                />
                
                {/* Center Play Button Overlay */}
                <div className="sec-video-center-play">
                  <div className="sec-play-pulse-ring"></div>
                  <div className="sec-play-btn-circle">
                    <Play size={24} fill="#ffffff" />
                  </div>
                </div>

                {/* Bottom Video HUD Overlay */}
                <div className="sec-video-hud-overlay">
                  <div className="hud-title-block">
                    <span className="hud-label-bold">Smart Security</span>
                    <span className="hud-label-sub">Real Environments</span>
                  </div>

                  <div className="hud-controls-bar">
                    <div className="hud-play-indicator">
                      <Play size={12} fill="#ffffff" />
                      <span>0:00 / 2:16</span>
                    </div>
                    <div className="hud-fullscreen-icon">
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text & Value Checklist */}
            <div className="sec-video-content-col">
              <h2 className="sec-value-title">
                More Than Security <br />
                <span className="sec-title-dark">A Safer Tomorrow</span>
              </h2>

              <p className="sec-value-desc">
                Watch how our integrated security systems create safer, smarter and more connected environments.
              </p>

              <div className="sec-value-checklist">
                <div className="sec-check-item">
                  <div className="sec-check-circle">
                    <Check size={14} />
                  </div>
                  <span>Real Project Footage</span>
                </div>

                <div className="sec-check-item">
                  <div className="sec-check-circle">
                    <Check size={14} />
                  </div>
                  <span>Live Monitoring Demo</span>
                </div>

                <div className="sec-check-item">
                  <div className="sec-check-circle">
                    <Check size={14} />
                  </div>
                  <span>Customer Success Stories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FREQUENTLY ASKED QUESTIONS (Accordion)
          ========================================================================= */}
      <section className="sec-faqs-section">
        <div className="sec-container">
          <div className="sec-section-header-row">
            <div>
              <h2 className="sec-section-title">Frequently Asked Questions</h2>
              <p className="sec-section-sub">Get answers to common questions about our security systems and services.</p>
            </div>
            <button
              className="btn-sec-outline-sm"
              onClick={() => handleOpenQuote('Technical Consultation')}
            >
              <span>View All FAQs</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="sec-faqs-accordion-list">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`sec-faq-item ${isOpen ? 'is-active' : ''}`}
                >
                  <button
                    className="sec-faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <div className="sec-faq-left-group">
                      <div className="sec-faq-icon-box">
                        <Icon size={16} />
                      </div>
                      <span className="sec-faq-q-text">{faq.question}</span>
                    </div>
                    <div className="sec-faq-chevron-wrap">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="sec-faq-answer-pane">
                      <p className="sec-faq-answer-text">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. BOTTOM TURNKEY ESTIMATION CTA BANNER
          ========================================================================= */}
      <section className="sec-bottom-cta-section">
        <div className="sec-container">
          <div className="sec-cta-banner-card">
            <div className="sec-cta-left">
              <h3 className="sec-cta-title">
                Need Turnkey Estimation for Your Security System?
              </h3>
              <p className="sec-cta-subtext">
                From site survey to final implementation, we provide detailed BOQs, CAD drawings and complete technical assistance.
              </p>
              <div className="sec-cta-btn-wrap">
                <button
                  className="btn-sec-cta-white"
                  onClick={() => handleOpenQuote('Turnkey Security System Estimation')}
                >
                  <span>Request a Quote</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            <div className="sec-cta-right-graphic">
              <img
                src="/cctv-cta-cameras.jpg"
                alt="4K CCTV Security Cameras"
                className="sec-cta-cameras-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL 1: VIDEO MODAL
          ========================================================================= */}
      {videoModalOpen && (
        <div className="sec-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
          <div className="sec-modal-card video-modal-size" onClick={(e) => e.stopPropagation()}>
            <div className="sec-modal-header">
              <div className="flex-center-gap">
                <span className="sec-modal-tag">LIVE DEMONSTRATION</span>
                <h4 className="sec-modal-title">HTI Smart Security Solutions in Action</h4>
              </div>
              <button
                className="sec-modal-close-btn"
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </div>

            <div className="sec-modal-video-body">
              <video
                controls
                autoPlay
                className="sec-modal-video-elem"
                poster="/cctv-video-thumb.jpg"
              >
                <source src="/gemini_generated_video_02f233ca.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>

            <div className="sec-modal-footer">
              <p className="sec-modal-caption">
                Demonstrating multi-zone CCTV analytics, biometric facial verification, and automated perimeter barriers.
              </p>
              <button
                className="btn-sec-primary btn-sm"
                onClick={() => {
                  setVideoModalOpen(false);
                  handleOpenQuote('Video Demo Follow-Up Inquiry');
                }}
              >
                <span>Request Site Survey</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: PRODUCT DETAILS MODAL
          ========================================================================= */}
      {selectedSolutionModal && (
        <div className="sec-modal-backdrop" onClick={() => setSelectedSolutionModal(null)}>
          <div className="sec-modal-card solution-detail-size" onClick={(e) => e.stopPropagation()}>
            <div className="sec-modal-header">
              <div>
                <span className="sec-modal-tag">{selectedSolutionModal.badge}</span>
                <h4 className="sec-modal-title">{selectedSolutionModal.title}</h4>
              </div>
              <button
                className="sec-modal-close-btn"
                onClick={() => setSelectedSolutionModal(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="sec-solution-modal-body">
              <div className="solution-modal-img-col">
                <img
                  src={selectedSolutionModal.image}
                  alt={selectedSolutionModal.title}
                  className="solution-modal-img"
                />
              </div>

              <div className="solution-modal-info-col">
                <div className="solution-modal-spec-label">{selectedSolutionModal.subtitle}</div>
                <h5 className="solution-modal-spec-heading">Key Technical Specifications:</h5>
                <ul className="solution-specs-list">
                  {selectedSolutionModal.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} className="text-blue-500 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="solution-modal-action-row">
                  <button
                    className="btn-sec-primary btn-sm"
                    onClick={() => {
                      const sol = selectedSolutionModal.title;
                      setSelectedSolutionModal(null);
                      handleOpenQuote(sol);
                    }}
                  >
                    <span>Request BOQ &amp; Quote</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    className="btn-sec-outline-sm"
                    onClick={() => {
                      const slug = selectedSolutionModal.slug;
                      setSelectedSolutionModal(null);
                      if (onSelectProduct) {
                        onSelectProduct(slug);
                      } else if (onNavigate) {
                        onNavigate('product', slug);
                      }
                    }}
                  >
                    <span>Full Product Specs</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: INSTANT QUOTE ESTIMATION MODAL
          ========================================================================= */}
      {quoteModalOpen && (
        <div className="sec-modal-backdrop" onClick={() => setQuoteModalOpen(false)}>
          <div className="sec-modal-card quote-modal-size" onClick={(e) => e.stopPropagation()}>
            <div className="sec-modal-header">
              <div>
                <span className="sec-modal-tag">TURNKEY ESTIMATION</span>
                <h4 className="sec-modal-title">Request Security System Quotation</h4>
              </div>
              <button
                className="sec-modal-close-btn"
                onClick={() => setQuoteModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {quoteSubmitted ? (
              <div className="sec-quote-success-box">
                <div className="success-icon-circle">
                  <Check size={28} />
                </div>
                <h4>Estimation Request Received!</h4>
                <p>Our senior security engineering team will review your project requirements and share a detailed BOQ within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="sec-quote-form">
                <div className="form-field-group">
                  <label>Selected Solution / Requirement</label>
                  <input
                    type="text"
                    value={quoteForm.solution}
                    onChange={(e) => setQuoteForm({ ...quoteForm, solution: e.target.value })}
                    required
                  />
                </div>

                <div className="form-grid-2col">
                  <div className="form-field-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field-group">
                    <label>Contact Phone *</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="form-field-group">
                    <label>Work Email *</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field-group">
                    <label>Company / Facility Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai / Navi Mumbai"
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label>Project Scope &amp; Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Describe number of cameras, access points, facility type or tender requirements..."
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                  />
                </div>

                <div className="sec-form-submit-row">
                  <button type="submit" className="btn-sec-primary w-full">
                    <span>Submit Estimation Request</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
