/**
 * ServiceDetailPage.jsx
 * This view renders any service detail page from a data object passed in the
 * pagesData prop (industrial access, fire safety, future categories); default is INDUSTRIAL_ACCESS_PAGES.
 */
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
  X,
  Award,
  Layers,
  DoorClosed,
  Settings,
  Eye,
  SlidersHorizontal,
  Lock,
  Download,
  Info,
  ChevronDown,
  ChevronUp,
  Radio,
  Cpu,
  Truck,
  User,
  Check,
  HelpCircle,
  Flame,
  Droplets,
  Bell,
  AlertTriangle
} from 'lucide-react';
import { INDUSTRIAL_ACCESS_PAGES } from '../data/industrialAccessPagesData';
import './TouchlessEntryPage.css';

// Icon resolver mapping string names to Lucide components
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
  SlidersHorizontal,
  Lock,
  Radio,
  Cpu,
  Truck,
  User,
  Check,
  HelpCircle,
  Eye,
  Flame,
  Droplets,
  Volume2,
  Bell,
  AlertTriangle
};

const resolveIcon = (iconInput, defaultIcon = ShieldCheck) => {
  if (!iconInput) return defaultIcon;
  if (typeof iconInput === 'string') {
    return ICON_MAP[iconInput] || defaultIcon;
  }
  return iconInput;
};

export default function ServiceDetailPage({
  slug = 'perimeter-gate',
  pagesData = INDUSTRIAL_ACCESS_PAGES,
  onNavigate,
  onQuoteSubmit
}) {
  const pageData = (pagesData && pagesData[slug]) || (pagesData && pagesData[Object.keys(pagesData)[0]]) || INDUSTRIAL_ACCESS_PAGES['perimeter-gate'];

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
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(pageData.titleLine1 + ' Solution');

  // Interactive step in "How It Works"
  const [activeStep, setActiveStep] = useState(0);

  // Active technology tab
  const [selectedTechTab, setSelectedTechTab] = useState(0);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Lightbox for gallery
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Form data for quote
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    application: 'Industrial Facilities',
    productType: pageData.titleLine1,
    quantity: '1-3 Units',
    message: `Hello HTI Engineering, please share technical datasheet, structural drawing, and turnkey quotation for ${pageData.titleLine1} Solutions.`
  });

  // Scroll to top and set page title on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${pageData.titleLine1} Solutions | HTI Automation & Security Systems`;
    setSelectedTechTab(0);
    setActiveStep(0);
    setOpenFaqIndex(0);
    setSelectedProductForQuote(pageData.titleLine1 + ' Solution');
    setFormData(prev => ({
      ...prev,
      productType: pageData.titleLine1,
      message: `Hello HTI Engineering, please share technical datasheet, structural drawing, and turnkey quotation for ${pageData.titleLine1} Solutions.`
    }));
  }, [slug, pageData.titleLine1]);

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
    setSelectedProductForQuote(productName || (pageData.titleLine1 + ' Solution'));
    setQuoteSuccess(false);
    setIsQuoteModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          product_name: selectedProductForQuote,
          category: pageData.categoryName || 'Fire Protection & Life Safety',
          message: `Application: ${formData.application} | Qty: ${formData.quantity} | ${formData.message}`
        })
      });
    } catch (err) {
      console.warn('API submission fallback to local:', err);
    }

    setQuoteSuccess(true);
    if (onQuoteSubmit) {
      onQuoteSubmit({
        ...formData,
        product: selectedProductForQuote,
        source: `${pageData.titleLine1} Page`
      });
    }
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setQuoteSuccess(false);
    }, 2400);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxImage(pageData.gallery[index]);
  };

  const nextLightbox = () => {
    const nextIdx = (lightboxIndex + 1) % pageData.gallery.length;
    setLightboxIndex(nextIdx);
    setLightboxImage(pageData.gallery[nextIdx]);
  };

  const prevLightbox = () => {
    const prevIdx = (lightboxIndex - 1 + pageData.gallery.length) % pageData.gallery.length;
    setLightboxIndex(prevIdx);
    setLightboxImage(pageData.gallery[prevIdx]);
  };

  return (
    <div className="touchless-page-root">
      {/* 1. TOP HERO SECTION */}
      <section className="touchless-hero-section">
        {/* Futuristic Mesh Background & Ambient Lighting */}
        <div className="touchless-hero-ambient-glow"></div>
        <div className="touchless-hero-mesh-grid"></div>

        <div className="touchless-container">
          {/* Breadcrumbs */}
          <nav className="touchless-breadcrumbs" aria-label="Breadcrumb">
            {pageData.breadcrumbs.map((crumb, cIdx) => (
              <React.Fragment key={cIdx}>
                {cIdx > 0 && <span className="breadcrumb-sep">&gt;</span>}
                {crumb.isCurrent ? (
                  <span className="breadcrumb-current">{crumb.label}</span>
                ) : (
                  <span
                    className="breadcrumb-link"
                    onClick={() => onNavigate && onNavigate(crumb.page || 'home')}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>

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
                  onClick={() => handleOpenQuote(pageData.titleLine1 + ' Solution')}
                >
                  <span>Request a Quote</span>
                  <ArrowRight size={18} className="btn-icon-right" />
                </button>

                <button
                  className="touchless-btn-secondary"
                  onClick={() => {
                    const el = document.getElementById('product-cards-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Explore Products</span>
                </button>
              </div>
            </div>

            {/* Center: Showcase Image with Interactive Status Badge */}
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
                    alt={`${pageData.titleLine1} Showcase`}
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
        </div>
      </section>

      {/* 2. OPERATIONAL SHOWCASE (Video Showcase) */}
      <section className="touchless-showcase-section">
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
                    aria-label="Play video"
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

      {/* 3. PRODUCT CARDS SECTION (4 CARDS IN ONE ROW ON DESKTOP) */}
      <section className="touchless-products-section" id="product-cards-section">
        <div className="touchless-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">{pageData.productsTitle}</h2>
              <div className="section-title-underline"></div>
            </div>

            <button
              className="view-all-link"
              onClick={() => onNavigate && onNavigate('catalog')}
            >
              <span>View All Products</span>
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
                      <span>Learn More</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ADVANCED TECHNOLOGY DEEP DIVE TABS */}
      {pageData.technologies && (
        <section className="touchless-sensors-deepdive-section">
          <div className="touchless-container">
            <div className="section-header-centered">
              <span className="section-eyebrow">{pageData.technologies.eyebrow}</span>
              <h2 className="section-title">{pageData.technologies.title}</h2>
              <div className="section-title-underline center-underline"></div>
              <p className="section-subtitle-desc">
                {pageData.technologies.subtitle}
              </p>
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
                      <span className="spec-metric-label">Capacity / Span:</span>
                      <span className="spec-metric-val">
                        {pageData.technologies.tabs[selectedTechTab].range}
                      </span>
                    </div>
                    <div className="spec-metric-row">
                      <span className="spec-metric-label">Drive Speed:</span>
                      <span className="spec-metric-val">
                        {pageData.technologies.tabs[selectedTechTab].speed}
                      </span>
                    </div>
                    <div className="spec-metric-row">
                      <span className="spec-metric-label">Regulatory Standard:</span>
                      <span className="spec-metric-val">
                        {pageData.technologies.tabs[selectedTechTab].standard || 'EN 12453 / CE Certified'}
                      </span>
                    </div>
                    <div className="spec-metric-row">
                      <span className="spec-metric-label">Protection Rating:</span>
                      <span className="spec-metric-val">
                        {pageData.technologies.tabs[selectedTechTab].ipRating || 'IP55 / IP65 Waterproof'}
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
        </section>
      )}

      {/* 5. HOW IT WORKS & IDEAL FOR MULTIPLE APPLICATIONS */}
      <section className="touchless-workflow-app-section">
        <div className="touchless-container">
          <div className="workflow-and-app-grid">
            {/* Left: How It Works */}
            <div className="workflow-block">
              <div className="section-subheading-wrap">
                <h2 className="section-title">How It Works ?</h2>
                <div className="section-title-underline"></div>
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
                      {sIdx === 0 && (
                        <div className="step-icon-svg radar-step">
                          <Activity size={26} />
                        </div>
                      )}
                      {sIdx === 1 && (
                        <div className="step-icon-svg controller-step">
                          <Settings size={26} />
                        </div>
                      )}
                      {sIdx === 2 && (
                        <div className="step-icon-svg door-open-step">
                          <DoorClosed size={26} />
                        </div>
                      )}
                      {sIdx === 3 && (
                        <div className="step-icon-svg door-close-step">
                          <Lock size={26} />
                        </div>
                      )}
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

              {/* Step Detail Explanation Box */}
              <div className="step-active-callout">
                <div className="callout-indicator">
                  <Info size={18} />
                  <strong>Step {pageData.howItWorks[activeStep].step} Engineering Insight:</strong>
                </div>
                <p>{pageData.howItWorks[activeStep].detail}</p>
              </div>
            </div>

            {/* Right: Ideal For Multiple Applications */}
            <div className="applications-block">
              <div className="section-subheading-wrap">
                <h2 className="section-title">Ideal For Multiple Applications</h2>
                <div className="section-title-underline"></div>
              </div>

              <div className="application-tiles-grid">
                {pageData.applications.map((app, aIdx) => (
                  <div key={aIdx} className="app-tile">
                    <div className="app-tile-media">
                      <img src={app.image} alt={app.title} className="app-tile-img" />
                    </div>
                    <div className="app-tile-label">{app.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL SPECIFICATIONS & STANDARDS */}
      <section className="touchless-specs-section">
        <div className="touchless-container">
          <div className="specs-cert-grid">
            {/* Left: Technical Specifications */}
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
                  onClick={() => handleOpenQuote(`${pageData.titleLine1} Data Sheet & CAD`)}
                >
                  <Download size={16} />
                  <span>Download Spec Sheet &amp; CAD</span>
                </button>
              </div>
            </div>

            {/* Right: Standards & Statutory Certifications */}
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

      {/* 7. RELATED GALLERY */}
      <section className="touchless-gallery-section">
        <div className="touchless-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Related Gallery</h2>
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

      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="touchless-faq-section">
        <div className="touchless-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">COMMON QUERIES</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="section-title-underline center-underline"></div>
            <p className="section-subtitle-desc">
              Key engineering, installation, compliance, and safety questions answered by our industrial entrance automation engineering team.
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

      {/* 9. BOTTOM TURNKEY CTA BANNER */}
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
                onClick={() => handleOpenQuote(`Turnkey ${pageData.titleLine1} Solution`)}
              >
                <span>Request a Quote Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL FOR GALLERY */}
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

      {/* CINEMATIC VIDEO MODAL */}
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

      {/* QUICK QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div className="touchless-quote-modal-overlay" onClick={() => setIsQuoteModalOpen(false)}>
          <div className="touchless-quote-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="quote-modal-header">
              <div>
                <span className="quote-header-badge">ENGINEERING INQUIRY</span>
                <h3 className="quote-modal-title">Request Quotation &amp; Technical Spec</h3>
                <p className="quote-modal-subtitle">Item: <strong>{selectedProductForQuote}</strong></p>
              </div>
              <button
                className="modal-close-icon-btn"
                onClick={() => setIsQuoteModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {quoteSuccess ? (
              <div className="quote-success-view">
                <div className="success-icon-badge">
                  <CheckCircle2 size={48} />
                </div>
                <h4>Quotation Request Received!</h4>
                <p>Thank you, {formData.name}. Our commercial automation engineer will send the customized technical proposal and pricing to <strong>{formData.email}</strong> shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="quote-modal-form">
                <div className="form-two-col">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rajesh@pharma.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Cipla Ltd / Tata Steel"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="form-group">
                    <label>Facility Application</label>
                    <select
                      value={formData.application}
                      onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                    >
                      <option value="Industrial Facilities">Industrial Manufacturing Plant</option>
                      <option value="Logistics & Warehouses">Logistics &amp; Cargo Hub</option>
                      <option value="Pharma Cleanrooms">Pharmaceutical Cleanroom</option>
                      <option value="Commercial Buildings">Commercial Tech Park</option>
                      <option value="Defense & High Security">Defense &amp; High Security</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estimated Quantity</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    >
                      <option value="1-3 Units">1-3 Units / Turnkey Opening</option>
                      <option value="4-10 Units">4-10 Units</option>
                      <option value="10+ Units">10+ Units (Enterprise Site)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Message / Site Specifications</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="form-modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsQuoteModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="touchless-btn-primary">
                    <span>Submit Request</span>
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
