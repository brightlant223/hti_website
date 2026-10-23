import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Shield,
  Activity,
  Zap,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  X,
  Award,
  Layers,
  DoorClosed,
  Settings,
  Eye,
  Lock,
  Download,
  Info,
  Radio,
  Cpu,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Check,
  HelpCircle,
  Building2,
  SlidersHorizontal
} from 'lucide-react';
import { CLEANROOM_PAGES } from '../data/cleanroomPagesData';
import './TouchlessEntryPage.css';

const ICON_MAP = {
  ShieldCheck,
  Shield,
  Activity,
  Zap,
  Sparkles,
  Award,
  Layers,
  DoorClosed,
  Settings,
  Lock,
  Radio,
  Cpu,
  Check,
  HelpCircle,
  Eye,
  SlidersHorizontal
};

const resolveIcon = (iconInput, defaultIcon = ShieldCheck) => {
  if (!iconInput) return defaultIcon;
  if (typeof iconInput === 'string') {
    return ICON_MAP[iconInput] || defaultIcon;
  }
  return iconInput;
};

export default function DoorInterlockPage({ onNavigate, onQuoteSubmit }) {
  const pageData = CLEANROOM_PAGES['door-interlock-system'];

  // Video player state
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('2:15');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState('Door Interlock (2-8 Door) System');

  // Interactive step in "Working Process"
  const [activeStep, setActiveStep] = useState(0);

  // Active technology tab
  const [selectedTechTab, setSelectedTechTab] = useState(0);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Lightbox for gallery
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Direct Inline Contact Form State
  const [inlineContactSuccess, setInlineContactSuccess] = useState(false);
  const [inlineFormData, setInlineFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    doorsCount: '2-Door PAL/MAL Interlock',
    facilityType: 'Sterile Pharma Formulation Suite',
    message: 'Hello HTI Engineering, please share cleanroom door interlock wiring diagram, technical datasheet, and turnkey proposal.'
  });

  // Modal quote form data
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    application: 'Cleanroom Airlock',
    productType: 'Door Interlock (2-8 Door)',
    quantity: '1-3 Units',
    message: 'Hello HTI Engineering, please share technical datasheet and quotation for Door Interlock Systems.'
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Door Interlock (2-8 Door) Systems | Cleanroom Sterile Automation | HTI';
  }, []);

  // Video progress handling
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 135;
      setProgress((current / total) * 100);

      const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      };
      setCurrentTime(formatTime(current));
      if (videoRef.current.duration) {
        setDuration(formatTime(videoRef.current.duration));
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleOpenQuote = (productName) => {
    setSelectedProductForQuote(productName || 'Door Interlock (2-8 Door) System');
    setQuoteSuccess(false);
    setIsQuoteModalOpen(true);
  };

  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    setQuoteSuccess(true);
    if (onQuoteSubmit) {
      onQuoteSubmit({
        ...modalFormData,
        product: selectedProductForQuote,
        source: 'Door Interlock Page Modal'
      });
    }
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setQuoteSuccess(false);
    }, 2400);
  };

  const handleInlineContactSubmit = (e) => {
    e.preventDefault();
    setInlineContactSuccess(true);
    if (onQuoteSubmit) {
      onQuoteSubmit({
        name: inlineFormData.name,
        email: inlineFormData.email,
        phone: inlineFormData.phone,
        company: inlineFormData.company,
        product: `${inlineFormData.doorsCount} (${inlineFormData.facilityType})`,
        message: inlineFormData.message,
        source: 'Door Interlock Page Inline Contact Form'
      });
    }
    setTimeout(() => {
      setInlineContactSuccess(false);
    }, 4000);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxImage(pageData.gallery[index]);
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    const nextIdx = (lightboxIndex + 1) % pageData.gallery.length;
    setLightboxIndex(nextIdx);
    setLightboxImage(pageData.gallery[nextIdx]);
  };

  const prevLightbox = (e) => {
    e.stopPropagation();
    const prevIdx = (lightboxIndex - 1 + pageData.gallery.length) % pageData.gallery.length;
    setLightboxIndex(prevIdx);
    setLightboxImage(pageData.gallery[prevIdx]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="touchless-page-root">
      {/* ====================================================================
          1. HERO SECTION (MAJESTIC FIRST VIEWPORT)
          ==================================================================== */}
      <section className="touchless-hero-section">
        {/* Ambient Glow & Mesh Background */}
        <div className="touchless-hero-ambient-glow"></div>
        <div className="touchless-hero-mesh-grid"></div>

        <div className="touchless-container">
          {/* Breadcrumbs Navigation */}
          <nav className="touchless-breadcrumbs" aria-label="Breadcrumb">
            <span
              className="breadcrumb-link"
              onClick={() => onNavigate && onNavigate('home')}
            >
              Home
            </span>
            <span className="breadcrumb-sep">&gt;</span>
            <span
              className="breadcrumb-link"
              onClick={() => onNavigate && onNavigate('cleanroom-interlocks')}
            >
              Services
            </span>
            <span className="breadcrumb-sep">&gt;</span>
            <span
              className="breadcrumb-link"
              onClick={() => onNavigate && onNavigate('cleanroom-interlocks')}
            >
              Cleanroom Interlocks &amp; Pass Boxes
            </span>
            <span className="breadcrumb-sep">&gt;</span>
            <span className="breadcrumb-current">Door Interlock (2-8 Door)</span>
          </nav>

          {/* 3-Column Hero Layout */}
          <div className="touchless-hero-layout">
            {/* Left Column: Heading, Badge, Description, Metrics & CTA */}
            <div className="touchless-hero-left">
              <div className="touchless-badge-pill">
                <span className="badge-dot"></span>
                <span>{pageData.badge}</span>
              </div>

              <h1 className="touchless-hero-title">
                {pageData.titleLine1}<br />
                <span className="touchless-title-accent">{pageData.titleLine2Accent}</span>
              </h1>

              <div className="touchless-hero-tagline">
                {pageData.tagline}
              </div>

              <p className="touchless-hero-desc">
                {pageData.description}
              </p>

              <div className="touchless-hero-metrics-pills">
                {pageData.metrics.map((metric, mIdx) => {
                  const MetricIcon = resolveIcon(metric.icon, Zap);
                  return (
                    <div key={mIdx} className="metric-pill">
                      <MetricIcon size={13} className="pill-icon" />
                      <span>{metric.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="touchless-hero-actions">
                <button
                  className="touchless-btn-primary"
                  onClick={() => handleOpenQuote('Door Interlock (2-8 Door) System')}
                >
                  <span>Request a Quote</span>
                  <ArrowRight size={18} className="btn-icon-right" />
                </button>

                <button
                  className="touchless-btn-secondary"
                  onClick={() => scrollToSection('door-interlock-products')}
                >
                  <span>Explore Products</span>
                </button>
              </div>
            </div>

            {/* Center Column: Showcase Door Frame with Radiating Sensor */}
            <div className="touchless-hero-center">
              <div className="touchless-door-showcase-frame">
                <div className="radar-sensor-assembly sensor-active">
                  <div className="sensor-hardware-box">
                    <div className="sensor-lens"></div>
                    <div className="sensor-led-indicator"></div>
                  </div>
                  <div className="radar-wave wave-1"></div>
                  <div className="radar-wave wave-2"></div>
                  <div className="radar-wave wave-3"></div>
                </div>

                <div className="door-viewport">
                  <img
                    src={pageData.heroImage}
                    alt="Door Interlock Showcase in Sterile Cleanroom Airlock"
                    className="touchless-hero-door-img"
                  />
                  <div className="door-reflection-overlay"></div>

                  <div className="door-interactive-badge">
                    <span className="door-pulse-live"></span>
                    <span>{pageData.heroStatusBadge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Key Benefits Cards */}
            <div className="touchless-hero-right">
              <div className="touchless-benefits-stack">
                {pageData.benefits.map((benefit, bIdx) => {
                  const BenefitIcon = resolveIcon(benefit.icon, ShieldCheck);
                  return (
                    <div key={bIdx} className="benefit-card">
                      <div className="benefit-icon-box">
                        <BenefitIcon size={20} />
                      </div>
                      <div className="benefit-text">
                        <h3 className="benefit-title">{benefit.title}</h3>
                        <p className="benefit-desc">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Smooth Scroll Cue to Transition to Next Section */}
          <div className="hero-scroll-cue-wrapper">
            <button
              className="hero-scroll-cue"
              onClick={() => scrollToSection('door-interlock-products')}
              aria-label="Scroll down to explore products"
            >
              <span>Scroll to explore full system details</span>
              <ChevronDown size={15} className="scroll-cue-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. PRODUCT FEATURES (OUR DOOR INTERLOCK PRODUCTS - 4 CARDS IN 1 ROW)
          ==================================================================== */}
      <section className="touchless-products-section" id="door-interlock-products">
        <div className="touchless-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">{pageData.productsTitle}</h2>
              <div className="section-title-underline"></div>
            </div>

            <button
              className="view-all-link"
              onClick={() => scrollToSection('contact-section')}
            >
              <span>Inquire All Systems</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="touchless-products-grid">
            {pageData.products.map((prod, pIdx) => (
              <div key={pIdx} className="touchless-product-card">
                <div className="product-card-media">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="product-card-img"
                  />
                  <span className="product-card-badge">{prod.badge}</span>
                </div>
                <div className="product-card-body">
                  <div className="product-mini-chips">
                    {prod.chips.map((chip, cIdx) => (
                      <span key={cIdx} className="mini-chip">{chip}</span>
                    ))}
                  </div>
                  <h3 className="product-card-title">{prod.title}</h3>
                  <p className="product-card-desc">
                    {prod.desc}
                  </p>
                  <ul className="product-card-bullets">
                    {prod.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>
                        <Check size={13} className="bullet-check" /> {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="product-card-footer">
                    <button
                      className="learn-more-btn"
                      onClick={() => handleOpenQuote(prod.title)}
                    >
                      <span>Inquire / Learn More</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. WORKING PROCESS (HOW IT WORKS & TECHNOLOGY DEEP DIVE)
          ==================================================================== */}
      <section className="touchless-workflow-app-section" id="working-process">
        <div className="touchless-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">STEP-BY-STEP OPERATION</span>
            <h2 className="section-title">Working Process: How It Works</h2>
            <div className="section-title-underline center-underline"></div>
            <p className="section-subtitle-desc">
              Sequential cleanroom interlocking logic ensuring zero simultaneous door openings, containing airborne particulate cascades, and stabilizing positive differential air pressure.
            </p>
          </div>

          <div className="workflow-steps-horizontal">
            {pageData.howItWorks.map((st, sIdx) => (
              <div
                key={sIdx}
                className={`workflow-step-card ${activeStep === sIdx ? 'is-active-step' : ''}`}
                onClick={() => setActiveStep(sIdx)}
              >
                <div className="step-num-badge">{st.step}</div>

                <div className="step-icon-wrap">
                  {sIdx === 0 && <Activity size={26} />}
                  {sIdx === 1 && <Radio size={26} />}
                  {sIdx === 2 && <Lock size={26} />}
                  {sIdx === 3 && <ShieldCheck size={26} />}
                </div>

                <h4 className="step-name">{st.title}</h4>
                <p className="step-desc">{st.desc}</p>

                {sIdx < pageData.howItWorks.length - 1 && (
                  <div className="step-arrow-connector" aria-hidden="true">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Active Step Engineering Insight */}
          <div className="step-active-callout" style={{ marginBottom: '48px' }}>
            <div className="callout-indicator">
              <Info size={18} />
              <strong>Step {pageData.howItWorks[activeStep].step} Engineering Insight:</strong>
            </div>
            <p>{pageData.howItWorks[activeStep].detail}</p>
          </div>

          {/* Advanced Architecture Tabs */}
          {pageData.technologies && (
            <div style={{ marginTop: '24px' }}>
              <div className="section-header-centered">
                <span className="section-eyebrow">{pageData.technologies.eyebrow}</span>
                <h3 className="section-title" style={{ fontSize: '22px' }}>{pageData.technologies.title}</h3>
                <div className="section-title-underline center-underline"></div>
                <p className="section-subtitle-desc">{pageData.technologies.subtitle}</p>
              </div>

              <div className="sensor-tabs-nav">
                {pageData.technologies.tabs.map((tab, idx) => {
                  const TabIcon = resolveIcon(tab.icon, Settings);
                  return (
                    <button
                      key={tab.id || idx}
                      className={`sensor-tab-btn ${selectedTechTab === idx ? 'tab-active' : ''}`}
                      onClick={() => setSelectedTechTab(idx)}
                    >
                      <TabIcon size={16} />
                      <span>{tab.name.split('(')[0].trim()}</span>
                    </button>
                  );
                })}
              </div>

              {pageData.technologies.tabs[selectedTechTab] && (
                <div className="sensor-tab-content-card">
                  <div className="sensor-content-left">
                    <span className="sensor-tech-badge">
                      {pageData.technologies.tabs[selectedTechTab].badge}
                    </span>
                    <h3 className="sensor-tech-name">
                      {pageData.technologies.tabs[selectedTechTab].name}
                    </h3>
                    <p className="sensor-tech-summary">
                      {pageData.technologies.tabs[selectedTechTab].summary}
                    </p>

                    <div className="sensor-highlights-list">
                      {pageData.technologies.tabs[selectedTechTab].highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="sensor-hl-item">
                          <CheckCircle2 size={16} className="hl-check-icon" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sensor-content-right">
                    <div className="sensor-spec-box">
                      <div className="spec-metric-row">
                        <span className="spec-metric-label">Capacity / Logic:</span>
                        <span className="spec-metric-val">
                          {pageData.technologies.tabs[selectedTechTab].range}
                        </span>
                      </div>
                      <div className="spec-metric-row">
                        <span className="spec-metric-label">Execution Speed:</span>
                        <span className="spec-metric-val">
                          {pageData.technologies.tabs[selectedTechTab].speed}
                        </span>
                      </div>
                      <div className="spec-metric-row">
                        <span className="spec-metric-label">Regulatory Standard:</span>
                        <span className="spec-metric-val">
                          {pageData.technologies.tabs[selectedTechTab].standard}
                        </span>
                      </div>
                      <div className="spec-metric-row">
                        <span className="spec-metric-label">Enclosure Protection:</span>
                        <span className="spec-metric-val">
                          {pageData.technologies.tabs[selectedTechTab].ipRating}
                        </span>
                      </div>
                    </div>

                    <button
                      className="sensor-inquire-btn"
                      onClick={() => handleOpenQuote(pageData.technologies.tabs[selectedTechTab].name)}
                    >
                      <span>Request Technical Spec Sheet</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          4. TECHNICAL SPECIFICATIONS & COMPLIANCE
          ==================================================================== */}
      <section className="touchless-specs-section" id="technical-specifications">
        <div className="touchless-container">
          <div className="specs-cert-grid">
            {/* Left Column: Technical Specifications Table */}
            <div className="specs-table-wrapper">
              <h2 className="section-title">Technical Specifications (Typical)</h2>
              <div className="specs-table-container">
                <table className="tech-specs-table">
                  <tbody>
                    {pageData.specs.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="spec-label">{row.label}</td>
                        <td className="spec-value">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="specs-table-actions">
                <button
                  className="download-spec-btn"
                  onClick={() => handleOpenQuote('Door Interlock Technical Data Sheet & Wiring CAD')}
                >
                  <Download size={16} />
                  <span>Download Spec Sheet &amp; CAD</span>
                </button>
              </div>
            </div>

            {/* Right Column: Standards & Statutory Certifications */}
            <div className="certs-wrapper">
              <h2 className="section-title">Standards &amp; Statutory Certifications</h2>

              <div className="certs-list">
                {pageData.certs.map((cert, cIdx) => (
                  <div key={cIdx} className="cert-item-card">
                    <div className="cert-icon-circle">
                      {cIdx % 2 === 0 ? <Award size={20} /> : <ShieldCheck size={20} />}
                    </div>
                    <div className="cert-text">
                      <h4 className="cert-name">{cert.name}</h4>
                      <p className="cert-sub">{cert.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. APPLICATIONS (DEDICATED FULL-WIDTH GRID)
          ==================================================================== */}
      <section className="touchless-applications-section" id="applications">
        <div className="touchless-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">DEPLOYMENT ENVIRONMENTS</span>
            <h2 className="section-title">Ideal Cleanroom Applications</h2>
            <div className="section-title-underline center-underline"></div>
            <p className="section-subtitle-desc">
              HTI cleanroom door interlocking controllers are deployed across India's leading pharmaceutical formulation suites, high-containment biosafety labs, and sterile healthcare environments.
            </p>
          </div>

          <div className="applications-grid-full">
            {pageData.applications.map((app, aIdx) => (
              <div key={aIdx} className="app-card-full">
                <div className="app-card-full-media">
                  <img src={app.image} alt={app.title} className="app-card-full-img" />
                  <span className="app-card-tag">ISO 14644 Validated</span>
                </div>
                <div className="app-card-full-body">
                  <h3 className="app-card-full-title">{app.title}</h3>
                  <p className="app-card-full-desc">
                    Mutual exclusion interlocking preserving calibrated differential pressure gradients, mitigating particle transfer, and complying with USFDA 21 CFR Part 11 electronic audit readiness.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. VIDEO DEMONSTRATION (OPERATIONAL SHOWCASE)
          ==================================================================== */}
      <section className="touchless-showcase-section" id="video-demonstration">
        <div className="touchless-container">
          <div className="showcase-content-grid">
            {/* Left: Custom Video Showcase Player */}
            <div className="showcase-video-card">
              <div className="video-player-wrapper">
                <video
                  ref={videoRef}
                  src={pageData.showcase.videoSrc}
                  poster={pageData.showcase.poster}
                  className="showcase-video-element"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  muted={isMuted}
                  playsInline
                />

                {/* Big Center Play Button when paused */}
                {!isPlaying && (
                  <button
                    className="video-center-play-btn"
                    onClick={togglePlay}
                    aria-label="Play video demonstration"
                  >
                    <div className="play-triangle"></div>
                  </button>
                )}

                {/* Scrubber and Video Controls Bar */}
                <div className="video-controls-bar">
                  <button className="control-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <div className="video-time-display">
                    {currentTime} / {duration}
                  </div>

                  <div
                    className="video-progress-track"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      if (videoRef.current && videoRef.current.duration) {
                        videoRef.current.currentTime = pos * videoRef.current.duration;
                      }
                    }}
                  >
                    <div className="video-progress-filled" style={{ width: `${progress}%` }}></div>
                  </div>

                  <button className="control-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <button className="control-btn" onClick={handleFullscreen} aria-label="Fullscreen">
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Operational Details & Features */}
            <div className="showcase-info-col">
              <div className="showcase-matrix-dots" aria-hidden="true">
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
              </div>

              <div className="showcase-eyebrow">{pageData.showcase.eyebrow}</div>
              <h2 className="showcase-heading">{pageData.showcase.heading}</h2>

              <p className="showcase-description">
                {pageData.showcase.description}
              </p>

              <div className="showcase-features-list">
                {pageData.showcase.features.map((featureText, fIdx) => (
                  <div key={fIdx} className="showcase-feature-item">
                    <div className="check-circle-icon">
                      <Check size={16} />
                    </div>
                    <span>{featureText}</span>
                  </div>
                ))}
              </div>

              <div className="showcase-action-row">
                <button
                  className="showcase-watch-btn"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <span>Watch Full Video</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. RELATED IMAGES (PRODUCT & INSTALLATION GALLERY)
          ==================================================================== */}
      <section className="touchless-gallery-section" id="related-gallery">
        <div className="touchless-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Related Product &amp; Installation Gallery</h2>
              <div className="section-title-underline"></div>
            </div>

            <button
              className="view-all-link"
              onClick={() => openLightbox(0)}
            >
              <span>View All Images</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="gallery-grid">
            {pageData.gallery.map((item, gIdx) => (
              <div
                key={gIdx}
                className="gallery-item-card"
                onClick={() => openLightbox(gIdx)}
              >
                <div className="gallery-media">
                  <img src={item.image} alt={item.title} className="gallery-img" />
                  <div className="gallery-hover-overlay">
                    <Eye size={24} className="gallery-zoom-icon" />
                    <span>View Photo</span>
                  </div>
                </div>
                <div className="gallery-caption">
                  <h4 className="gallery-title">{item.title}</h4>
                  <span className="gallery-category">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FREQUENTLY ASKED QUESTIONS (FAQS)
          ==================================================================== */}
      <section className="touchless-faq-section" id="faqs">
        <div className="touchless-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">COMMON ENGINEERING QUERIES</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="section-title-underline center-underline"></div>
            <p className="section-subtitle-desc">
              Key cleanroom engineering, pressure cascade, emergency override, and compliance questions answered by HTI's cleanroom access team.
            </p>
          </div>

          <div className="touchless-faq-accordion">
            {pageData.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div key={fIdx} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. CONTACT SECTION (ENGINEERING CONSULTATION & TURNKEY PROPOSAL)
          ==================================================================== */}
      <section className="touchless-contact-section" id="contact-section">
        <div className="touchless-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">GET IN TOUCH WITH OUR SPECIALISTS</span>
            <h2 className="section-title">Engineering Consultation &amp; Turnkey Quotation</h2>
            <div className="section-title-underline center-underline"></div>
            <p className="section-subtitle-desc">
              Connect directly with HTI's Cleanroom Automation division to receive custom airlock wiring schematics, USFDA compliance documentation, and turnkey factory supply-and-installation quotes.
            </p>
          </div>

          <div className="contact-section-grid">
            {/* Left: Contact Info Panel */}
            <div className="contact-info-panel">
              <span className="contact-panel-badge">
                <Building2 size={13} />
                <span>CLEANROOM AUTOMATION DIVISION</span>
              </span>

              <h3 className="contact-panel-title">HTI Automation &amp; Security Systems Pvt. Ltd.</h3>
              <p className="contact-panel-desc">
                Specialized in USFDA 21 CFR Part 11 compliant door interlocks, dynamic pass boxes, digital GPS master clocks, and hermetic cleanroom door engineering across India.
              </p>

              <div className="contact-details-stack">
                <div className="contact-detail-row">
                  <div className="contact-icon-bubble">
                    <Phone size={18} />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Direct Engineering Helpline</span>
                    <a href="tel:+919820000000" className="contact-detail-val">+91 98200 00000 / 022-28000000</a>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-icon-bubble">
                    <Mail size={18} />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Technical Proposals &amp; Schematics</span>
                    <a href="mailto:sales@htiautomation.com" className="contact-detail-val">sales@htiautomation.com</a>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-icon-bubble">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Head Office &amp; Engineering Center</span>
                    <span className="contact-detail-val">Mumbai / Pune Industrial Corridor, Maharashtra, India</span>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="contact-icon-bubble">
                    <Clock size={18} />
                  </div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Operational Hours &amp; Response SLA</span>
                    <span className="contact-detail-val">Mon – Sat: 9:00 AM – 7:00 PM IST (24h Proposal SLA)</span>
                  </div>
                </div>
              </div>

              <div className="contact-compliance-badge-box">
                <ShieldCheck size={28} style={{ color: '#38bdf8', minWidth: '28px' }} />
                <span>
                  <strong>Full Regulatory Support:</strong> Every system includes IQ/OQ/DQ qualification protocols, FAT/SAT testing checklists, and compliance certificates for USFDA &amp; cGMP audits.
                </span>
              </div>
            </div>

            {/* Right: Direct On-Page Contact & Proposal Form */}
            <div className="contact-form-card">
              <h3 className="contact-form-title">Request Turnkey Proposal &amp; CAD Layout</h3>
              <p className="contact-form-subtitle">Fill in your facility parameters to receive custom schematics and itemized pricing.</p>

              {inlineContactSuccess && (
                <div className="contact-form-success-banner">
                  <CheckCircle2 size={20} />
                  <span>Thank you! Your cleanroom inquiry has been submitted. Our engineering team will contact you within 24 hours.</span>
                </div>
              )}

              <form onSubmit={handleInlineContactSubmit}>
                <div className="contact-form-grid">
                  <div>
                    <label className="contact-input-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={inlineFormData.name}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, name: e.target.value })}
                      className="contact-text-input"
                    />
                  </div>

                  <div>
                    <label className="contact-input-label">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rsharma@pharmalab.com"
                      value={inlineFormData.email}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, email: e.target.value })}
                      className="contact-text-input"
                    />
                  </div>

                  <div>
                    <label className="contact-input-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98201 23456"
                      value={inlineFormData.phone}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, phone: e.target.value })}
                      className="contact-text-input"
                    />
                  </div>

                  <div>
                    <label className="contact-input-label">Company / Facility Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Biotech Laboratories"
                      value={inlineFormData.company}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, company: e.target.value })}
                      className="contact-text-input"
                    />
                  </div>

                  <div>
                    <label className="contact-input-label">Door Count Configuration *</label>
                    <select
                      value={inlineFormData.doorsCount}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, doorsCount: e.target.value })}
                      className="contact-select-input"
                    >
                      <option value="2-Door PAL/MAL Interlock">2-Door PAL/MAL Interlock</option>
                      <option value="3-Door Cascading Airlock">3-Door Cascading Airlock</option>
                      <option value="4-Door Multi-Zone Controller">4-Door Multi-Zone Controller</option>
                      <option value="6-Door Custom Air Shower Suite">6-Door Custom Air Shower Suite</option>
                      <option value="8-Door Enterprise PLC Panel">8-Door Enterprise PLC Panel</option>
                      <option value="Flameproof (Ex-d) Zone 1/2 System">Flameproof (Ex-d) Zone 1/2 System</option>
                    </select>
                  </div>

                  <div>
                    <label className="contact-input-label">Cleanroom Facility Type *</label>
                    <select
                      value={inlineFormData.facilityType}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, facilityType: e.target.value })}
                      className="contact-select-input"
                    >
                      <option value="Sterile Pharma Formulation Suite">Sterile Pharma Formulation Suite</option>
                      <option value="BSL-2/3/4 Research Laboratory">BSL-2/3/4 Research Laboratory</option>
                      <option value="API / Solvent Chemical Synthesis">API / Solvent Chemical Synthesis</option>
                      <option value="Hospital Modular Operation Theatre">Hospital Modular Operation Theatre</option>
                      <option value="Semiconductor / Electronic Cleanroom">Semiconductor / Electronic Cleanroom</option>
                      <option value="Food & Beverage Hygiene Airlock">Food &amp; Beverage Hygiene Airlock</option>
                    </select>
                  </div>

                  <div className="form-group-full">
                    <label className="contact-input-label">Project Details / Custom Logic Requirements</label>
                    <textarea
                      value={inlineFormData.message}
                      onChange={(e) => setInlineFormData({ ...inlineFormData, message: e.target.value })}
                      className="contact-textarea-input"
                      placeholder="Describe airlock dimensions, pressure differential, BMS integration, or fire alarm release requirements..."
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="contact-form-submit-btn">
                  <span>Submit Request for Turnkey Proposal &amp; CAD</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TURNKEY CTA BANNER (PROTECT YOUR CLEANROOM CASCADES)
          ==================================================================== */}
      <section className="touchless-cta-banner-section">
        <div className="touchless-container">
          <div className="touchless-cta-box">
            <div className="cta-left-content">
              <span className="cta-tag">{pageData.cta.tag}</span>
              <h3 className="cta-title">{pageData.cta.title}</h3>
              <p className="cta-desc">{pageData.cta.desc}</p>
            </div>
            <div className="cta-right-action">
              <button
                className="touchless-btn-primary cta-btn-lg"
                onClick={() => handleOpenQuote('Turnkey Cleanroom Door Interlock Project')}
              >
                <span>Request a Quote Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          MODALS: LIGHTBOX, VIDEO & QUOTE MODAL
          ==================================================================== */}
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="touchless-lightbox-modal" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setLightboxImage(null)} aria-label="Close image">
              <X size={24} />
            </button>

            <button className="lightbox-nav-btn prev-btn" onClick={prevLightbox} aria-label="Previous image">
              <ChevronLeft size={28} />
            </button>
            <button className="lightbox-nav-btn next-btn" onClick={nextLightbox} aria-label="Next image">
              <ChevronRight size={28} />
            </button>

            <img src={lightboxImage.image} alt={lightboxImage.title} className="lightbox-main-img" />
            <div className="lightbox-caption-bar">
              <h4>{lightboxImage.title}</h4>
              <p>{lightboxImage.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Video Modal */}
      {isVideoModalOpen && (
        <div className="touchless-video-modal" onClick={() => setIsVideoModalOpen(false)}>
          <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <h3>{pageData.showcase.heading} - Operational Video</h3>
              <button className="modal-close-icon-btn" onClick={() => setIsVideoModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="video-modal-body">
              <video
                src={pageData.showcase.videoSrc}
                controls
                autoPlay
                className="modal-fullscreen-video"
              />
            </div>
          </div>
        </div>
      )}

      {/* Quote Request Modal */}
      {isQuoteModalOpen && (
        <div className="touchless-quote-modal-overlay" onClick={() => setIsQuoteModalOpen(false)}>
          <div className="touchless-quote-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="quote-modal-header">
              <div className="quote-modal-header-text">
                <span className="quote-eyebrow">CUSTOM ENGINEERING ESTIMATE</span>
                <h3>Request a Turnkey Quote</h3>
                <p>Selected Solution: <strong>{selectedProductForQuote}</strong></p>
              </div>
              <button className="modal-close-icon-btn" onClick={() => setIsQuoteModalOpen(false)} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            {quoteSuccess ? (
              <div className="quote-success-state">
                <div className="success-circle">
                  <Check size={36} />
                </div>
                <h3>Quote Request Received!</h3>
                <p>
                  Thank you for reaching out. Our cleanroom automation engineers will contact you shortly with the engineering datasheet and competitive turnkey pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalFormSubmit} className="quote-modal-form">
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={modalFormData.name}
                      onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rsharma@company.com"
                      value={modalFormData.email}
                      onChange={(e) => setModalFormData({ ...modalFormData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98200 00000"
                      value={modalFormData.phone}
                      onChange={(e) => setModalFormData({ ...modalFormData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Biotech Laboratories"
                      value={modalFormData.company}
                      onChange={(e) => setModalFormData({ ...modalFormData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Target Application Zone</label>
                    <select
                      value={modalFormData.application}
                      onChange={(e) => setModalFormData({ ...modalFormData, application: e.target.value })}
                    >
                      <option value="Sterile Pharma Formulation Airlock">Sterile Pharma Formulation Airlock</option>
                      <option value="BSL-2/3 Containment Suite">BSL-2/3 Containment Suite</option>
                      <option value="API Solvent Bay (Ex-d Flameproof)">API Solvent Bay (Ex-d Flameproof)</option>
                      <option value="Hospital Modular OT Suite">Hospital Modular OT Suite</option>
                      <option value="Semiconductor / Precision Electronics">Semiconductor / Precision Electronics</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estimated Quantity / Airlocks</label>
                    <select
                      value={modalFormData.quantity}
                      onChange={(e) => setModalFormData({ ...modalFormData, quantity: e.target.value })}
                    >
                      <option value="1-2 Airlocks (Pilot / Refurbishment)">1-2 Airlocks (Pilot / Refurbishment)</option>
                      <option value="3-6 Airlocks (Standard Facility)">3-6 Airlocks (Standard Facility)</option>
                      <option value="7-15 Airlocks (Full Plant Complex)">7-15 Airlocks (Full Plant Complex)</option>
                      <option value="15+ Airlocks (Enterprise Turnkey)">15+ Airlocks (Enterprise Turnkey)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Technical Scope &amp; Special Requirements</label>
                  <textarea
                    rows={3}
                    value={modalFormData.message}
                    onChange={(e) => setModalFormData({ ...modalFormData, message: e.target.value })}
                  />
                </div>

                <div className="form-modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsQuoteModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="touchless-btn-primary">
                    <span>Submit Quote Request</span>
                    <ArrowRight size={16} />
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
