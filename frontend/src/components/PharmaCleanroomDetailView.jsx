import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Wrench,
  Settings,
  Send,
  Play,
  Check,
  FileText,
  Radio,
  Award,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Layers,
  Activity,
  AlertCircle,
  ArrowRight,
  Clock
} from 'lucide-react';
import './PharmaCleanroomDetailView.css';
import { PHARMA_CLEANROOM_CONFIGS } from '../data/pharmaCleanroomDetailData';

/**
 * Helper to render dynamic Lucide icons cleanly
 * @param {string} name - Icon name
 * @param {string} className - Optional Tailwind or CSS class
 * @param {number} size - Icon pixel size
 */
const renderPharmaIcon = (name, className = 'text-sky-600', size = 22) => {
  switch (name) {
    case 'Layers':
      return <Layers size={size} className={className} />;
    case 'Radio':
      return <Radio size={size} className={className} />;
    case 'AlertCircle':
      return <AlertCircle size={size} className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck size={size} className={className} />;
    case 'Wrench':
      return <Wrench size={size} className={className} />;
    case 'Activity':
      return <Activity size={size} className={className} />;
    case 'Clock':
      return <Clock size={size} className={className} />;
    case 'Award':
      return <Award size={size} className={className} />;
    case 'FileText':
      return <FileText size={size} className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 size={size} className={className} />;
    default:
      return <Settings size={size} className={className} />;
  }
};

/**
 * PharmaCleanroomDetailView Component
 * Dedicated detail view for Pharma Cleanroom products (e.g. Door Interlock System (2-8 Door)).
 * Follows the exact architectural structure and design aesthetic of the reference views,
 * fully scoped with "pharma-" prefix and zero external imports from access automation.
 */
export default function PharmaCleanroomDetailView({
  product,
  onNavigate,
  onQuoteSubmit
}) {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Active hero carousel slide index
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // Carousel indices for Related Products & Related Images
  const [relatedProductIndex, setRelatedProductIndex] = useState(0);
  const [relatedImageIndex, setRelatedImageIndex] = useState(0);

  // Match configuration for current product, fallback to door-interlock-system
  const cfg = PHARMA_CLEANROOM_CONFIGS[product?.slug] ||
    PHARMA_CLEANROOM_CONFIGS[product?.id] ||
    PHARMA_CLEANROOM_CONFIGS['door-interlock-system'];

  // Quotation form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '1 Turnkey Site',
    message: `Hello HTI Engineering, please share technical data sheet, CAD GA drawing, and turnkey quotation for ${cfg.name}.`
  });

  // Sync state & SEO meta tags when product slug changes
  useEffect(() => {
    setIsVideoPlaying(false);
    setHeroSlideIndex(0);
    setRelatedProductIndex(0);
    setRelatedImageIndex(0);
    setModalSubmitted(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setFormData(prev => ({
      ...prev,
      message: `Hello HTI Engineering, please share technical data sheet, CAD GA drawing, and turnkey quotation for ${cfg.name}.`
    }));

    // Update document title and Open Graph meta tags
    const prevTitle = document.title;
    document.title = `${cfg.heading} | Pharma Cleanroom | HTI Automation`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', cfg.heroDescription);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [product?.slug, cfg.name, cfg.heading, cfg.heroDescription]);

  // Video play/pause toggle
  const handleVideoPlayToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  // Hero carousel navigation
  const heroImagesList = cfg.heroImages || [
    { id: 1, src: cfg.heroImage, alt: `${cfg.name} Showcase` }
  ];

  const handlePrevHero = () => {
    setHeroSlideIndex(prev => (prev === 0 ? heroImagesList.length - 1 : prev - 1));
  };

  const handleNextHero = () => {
    setHeroSlideIndex(prev => (prev === heroImagesList.length - 1 ? 0 : prev + 1));
  };

  // Related products carousel
  const relatedProductsList = cfg.relatedProducts?.products || [];
  const handlePrevProduct = () => {
    setRelatedProductIndex(prev => (prev === 0 ? Math.max(0, relatedProductsList.length - 1) : prev - 1));
  };
  const handleNextProduct = () => {
    setRelatedProductIndex(prev => (prev >= relatedProductsList.length - 1 ? 0 : prev + 1));
  };

  // Related images carousel
  const relatedImagesList = cfg.relatedImages?.images || [];
  const handlePrevImage = () => {
    setRelatedImageIndex(prev => (prev === 0 ? relatedImagesList.length - 1 : prev - 1));
  };
  const handleNextImage = () => {
    setRelatedImageIndex(prev => (prev === relatedImagesList.length - 1 ? 0 : prev + 1));
  };

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in your Name, Email, and Phone number.');
      return;
    }

    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not specified',
        category: cfg.categoryName || 'Pharma Cleanroom',
        product_name: cfg.name,
        message: `${formData.message} [Qty: ${formData.quantity}]`
      })
    }).catch(() => {
      // Graceful offline fallback
    });

    setModalSubmitted(true);
    if (onQuoteSubmit) onQuoteSubmit();
    setTimeout(() => {
      setModalSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 2400);
  };

  // 3 displayed related images window
  const displayedRelatedImages = relatedImagesList.length > 0 ? [
    relatedImagesList[relatedImageIndex % relatedImagesList.length],
    relatedImagesList[(relatedImageIndex + 1) % relatedImagesList.length],
    relatedImagesList[(relatedImageIndex + 2) % relatedImagesList.length]
  ] : [];

  return (
    <div className="pharma-page-container">

      {/* ── 1. BREADCRUMBS ────────────────────────────────────────────── */}
      <nav className="pharma-breadcrumb" aria-label="Breadcrumb">
        <button
          className="pharma-breadcrumb-btn"
          onClick={() => onNavigate && onNavigate('home')}
        >
          Home
        </button>
        <span className="pharma-breadcrumb-sep">&gt;</span>
        <button
          className="pharma-breadcrumb-btn"
          onClick={() => onNavigate && onNavigate(cfg.categoryRoute || 'cleanroom-interlocks')}
        >
          {cfg.categoryName}
        </button>
        <span className="pharma-breadcrumb-sep">&gt;</span>
        <span className="pharma-breadcrumb-curr">{cfg.breadcrumbName}</span>
      </nav>

      {/* ── 2. HERO SECTION ───────────────────────────────────────────── */}
      <section className="pharma-hero-section">
        <div className="pharma-hero-grid">

          {/* Left Column: Badges, H1, Intro, CTA, Trust Badges */}
          <div className="pharma-hero-left">
            <div className="pharma-badge-row">
              {cfg.badges.map((b, idx) => {
                const badgeClass = b.type === 'solid-blue'
                  ? 'pharma-badge-solid-blue'
                  : b.type === 'outlined'
                    ? 'pharma-badge-outlined'
                    : 'pharma-badge-soft-red';

                return (
                  <span key={idx} className={badgeClass}>
                    {b.text}
                  </span>
                );
              })}
            </div>

            <h1 className="pharma-hero-title">{cfg.heading}</h1>

            <p className="pharma-hero-desc">
              {cfg.heroDescription}
            </p>

            <div className="pharma-btn-row">
              <button
                className="pharma-btn-primary"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                <Send size={16} />
                <span>Request Instant Quotation</span>
              </button>
            </div>

            <div className="pharma-trust-row">
              {cfg.trustIndicators.map((item, idx) => (
                <div key={idx} className="pharma-trust-item">
                  {renderPharmaIcon(item.icon, "text-sky-600", 18)}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Image Carousel */}
          <div className="pharma-hero-right">
            <img
              src={heroImagesList[heroSlideIndex]?.src || cfg.heroImage}
              alt={heroImagesList[heroSlideIndex]?.alt || `${cfg.name} Showcase`}
              className="pharma-hero-main-img"
              loading="eager"
            />

            {heroImagesList.length > 1 && (
              <>
                <button
                  type="button"
                  className="pharma-hero-carousel-btn prev"
                  onClick={handlePrevHero}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="pharma-hero-carousel-btn next"
                  onClick={handleNextHero}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="pharma-hero-dots">
                  {heroImagesList.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      className={`pharma-hero-dot ${heroSlideIndex === dotIdx ? 'active' : ''}`}
                      onClick={() => setHeroSlideIndex(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ── 3. OPERATIONAL SHOWCASE (VIDEO PLAYER & 4 FEATURE BULLETS) ─── */}
      <section className="pharma-wide-card">
        <div className="pharma-video-grid">

          {/* Left Column: Video Showcase Player */}
          <div className="pharma-video-wrapper">
            {cfg.video.hasVideoFile ? (
              <>
                <video
                  ref={videoRef}
                  src={cfg.video.videoSrc}
                  poster={cfg.video.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="pharma-html5-video"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                />
                {!isVideoPlaying && (
                  <>
                    <button
                      className="pharma-video-play-overlay"
                      onClick={handleVideoPlayToggle}
                      aria-label={`Play ${cfg.name} Video Showcase`}
                    >
                      <div className="pharma-play-circle">
                        <Play size={28} className="fill-white text-white ml-1" />
                      </div>
                    </button>
                    <div className="pharma-video-fallback-pill" style={{ pointerEvents: 'none' }}>
                      HD Product Showcase
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <img
                  src={cfg.video.poster}
                  alt={`${cfg.name} Video Preview`}
                  className="pharma-html5-video"
                />
                <div className="pharma-video-play-overlay" style={{ cursor: 'default' }}>
                  <div className="pharma-play-circle" style={{ opacity: 0.9 }}>
                    <Play size={28} className="fill-white text-white ml-1" />
                  </div>
                </div>
                <div className="pharma-video-fallback-pill">
                  HD Product Showcase
                </div>
              </>
            )}
          </div>

          {/* Right Column: Operational Showcase Content & 4 Feature Bullets */}
          <div className="pharma-video-content">
            <span className="pharma-badge-soft-pink">{cfg.video.badge}</span>

            <h2 className="pharma-card-heading">
              {cfg.video.heading}
            </h2>

            <p className="pharma-card-desc">
              {cfg.video.description}
            </p>

            <div className="pharma-video-bullets-list">
              {cfg.video.bullets.map((bullet, idx) => (
                <div key={idx} className="pharma-video-bullet-item">
                  <div className="pharma-check-circle">
                    <Check size={13} className="text-white" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. ENGINEERING & TECHNICAL OVERVIEW (4 CARDS) ─────────────── */}
      <section className="pharma-engineering-section">
        <div className="pharma-engineering-header">
          <span className="pharma-card-kicker">{cfg.engineering.tag}</span>
          <h2 className="pharma-card-heading">{cfg.engineering.heading}</h2>
          <p className="pharma-card-desc">{cfg.engineering.description}</p>
        </div>

        {/* 4 Feature Cards in a Row */}
        <div className="pharma-feature-cards-row">
          {cfg.engineering.cards.map((c, idx) => (
            <div key={idx} className="pharma-feature-box">
              <div className={`pharma-feature-icon-circle ${c.circleClass}`}>
                {renderPharmaIcon(c.iconName, c.iconClass, 22)}
              </div>
              <div className="pharma-feature-content">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. TECHNICAL SPECIFICATIONS & STANDARDS ───────────────────── */}
      <section className="pharma-specs-grid">

        {/* Left Column: Specifications Table */}
        <div className="pharma-specs-card-left">
          <h3 className="pharma-specs-title">Technical Specifications</h3>
          <div className="pharma-specs-table-container">
            <table className="pharma-specs-table">
              <tbody>
                {cfg.specs.tableRows.map((row, idx) => {
                  const cleanLabel = (row.label || '').replace(/:$/, '');
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'even-row' : ''}>
                      <td className="pharma-spec-label">{cleanLabel}</td>
                      <td className="pharma-spec-value">{row.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Standards & Statutory Certifications */}
        <div className="pharma-specs-card-right">
          <h3 className="pharma-specs-title">{cfg.specs.complianceTitle}</h3>
          <div className="pharma-compliance-list">
            {cfg.specs.complianceItems.map((item, idx) => (
              <div key={idx} className="pharma-compliance-item">
                <div className="pharma-compliance-icon-wrap">
                  {idx === 0 ? <Award size={15} /> :
                   idx === 1 ? <CheckCircle2 size={15} /> :
                   idx === 2 ? <ShieldCheck size={15} /> :
                   idx === 3 ? <AlertCircle size={15} /> :
                   <Wrench size={15} />}
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </section>



      {/* ── 7. RELATED IMAGES SECTION ─────────────────────────────────── */}
      {relatedImagesList.length > 0 && (
        <section className="pharma-related-section">
          <div className="pharma-related-header">
            <div className="pharma-related-header-text">
              <div className="pharma-heading-with-icon">
                <ImageIcon size={24} className="text-sky-600" />
                <h3>{cfg.relatedImages.heading}</h3>
              </div>
              <p className="pharma-card-desc" style={{ marginBottom: 0 }}>
                {cfg.relatedImages.description}
              </p>
            </div>

            <div className="pharma-arrow-btns-group">
              <button
                className="pharma-arrow-btn"
                onClick={handlePrevImage}
                aria-label="Previous Related Images"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="pharma-arrow-btn"
                onClick={handleNextImage}
                aria-label="Next Related Images"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="pharma-related-grid">
            {displayedRelatedImages.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="pharma-related-card">
                <div className="pharma-related-media">
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                  />
                </div>
                <div className="pharma-related-caption">{item.caption}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 8. INSTANT QUOTATION MODAL ────────────────────────────────── */}
      {isQuoteModalOpen && (
        <div className="pharma-modal-backdrop" onClick={() => setIsQuoteModalOpen(false)}>
          <div className="pharma-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="pharma-modal-close-btn"
              onClick={() => setIsQuoteModalOpen(false)}
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>

            {modalSubmitted ? (
              <div className="pharma-modal-success">
                <CheckCircle2 size={54} className="text-emerald-500 mx-auto" />
                <h4>Quotation Request Received!</h4>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our cleanroom automation engineering team will email the technical data dossier and custom project BOQ for <strong>{cfg.name}</strong> promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit}>
                <h3 className="pharma-modal-title">Request Instant Quotation</h3>
                <div className="pharma-modal-subtitle">{cfg.name}</div>

                <div className="pharma-form-group">
                  <label className="pharma-form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pharma-form-input"
                  />
                </div>

                <div className="pharma-form-group">
                  <label className="pharma-form-label">Official Work Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@pharma-corp.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pharma-form-input"
                  />
                </div>

                <div className="pharma-form-group">
                  <label className="pharma-form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98200 00000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pharma-form-input"
                  />
                </div>

                <div className="pharma-form-group">
                  <label className="pharma-form-label">Company &amp; Project Site Location</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g., Cipla Labs / Sun Pharma, Gujarat"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="pharma-form-input"
                  />
                </div>

                <div className="pharma-form-group">
                  <label className="pharma-form-label">Estimated Quantity / Airlock Doors</label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="pharma-form-input"
                  >
                    <option value="2-Door Cascade Airlock">2-Door Cascade Airlock</option>
                    <option value="3-4 Door Sterile Airlock">3 - 4 Door Sterile Airlock</option>
                    <option value="5-8 Door Cleanroom Suite">5 - 8 Door Cleanroom Suite</option>
                    <option value="Turnkey Facility (Multi-Zone)">Turnkey Facility (Multi-Zone)</option>
                  </select>
                </div>

                <div className="pharma-form-group">
                  <label className="pharma-form-label">Technical Notes / Cleanroom Classification</label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="pharma-form-textarea"
                  />
                </div>

                <button type="submit" className="pharma-modal-submit-btn">
                  <Send size={16} />
                  <span>Submit Quotation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
