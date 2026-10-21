import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Wrench,
  Settings,
  Send,
  Play,
  Check,
  FileText,
  Radio,
  Leaf,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Zap,
  Layers,
  Lock,
  Cpu,
  Activity,
  Volume2,
  Sparkles,
  Truck,
  ArrowRight
} from 'lucide-react';
import { getProductBySlug } from '../data/productCatalogueData';
import './ProductDetailPage.css';

// Specialized Cleanroom Interactive Demonstrations
import PassBoxDemo from './PassBoxDemo';
import DigitalClockDemo from './DigitalClockDemo';
import ChillerCleanroomDoorDemo from './ChillerCleanroomDoorDemo';
import DoorInterlockSimulator from './DoorInterlockSimulator';

// Map icon string names to Lucide components
const ICON_MAP = {
  ShieldCheck,
  Wrench,
  Settings,
  Zap,
  Lock,
  Cpu,
  Layers,
  Radio,
  Activity,
  Volume2,
  Award,
  Leaf,
  FileText,
  Sparkles,
  Truck,
  CheckCircle2,
  Check
};

const resolveIcon = (name, fallback = Settings, size = 20, className = '') => {
  if (!name) return React.createElement(fallback, { size, className });
  const Comp = ICON_MAP[name] || fallback;
  return React.createElement(Comp, { size, className });
};

export default function ProductDetailPage({
  product: productProp,
  onNavigate,
  onQuoteSubmit
}) {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [carouselOffset, setCarouselOffset] = useState(0);

  // Always resolve the canonical product record from productCatalogueData
  const rawSlug = typeof productProp === 'string'
    ? productProp
    : (productProp?.slug || 'automatic-sliding-swing-doors');

  const product = useMemo(() => {
    return getProductBySlug(rawSlug) || productProp;
  }, [rawSlug, productProp]);

  // Form state for quotation modal
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '1 Turnkey Site',
    message: ''
  });

  // Reset states and update prefilled message when product changes
  useEffect(() => {
    setIsVideoPlaying(false);
    setCarouselOffset(0);
    setModalSubmitted(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setFormData(prev => ({
      ...prev,
      message: `Hello HTI Engineering, please share technical data sheet, CAD GA drawing, and turnkey quotation for ${product?.name || 'this system'}.`
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [rawSlug, product?.name]);

  if (!product) {
    return (
      <div className="auto-doors-page-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
          Product System Not Found
        </h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          The requested industrial system may have been updated in our catalog.
        </p>
        <button
          className="auto-btn-primary"
          onClick={() => onNavigate && onNavigate('home', 'catalog')}
        >
          Return to Products Catalog
        </button>
      </div>
    );
  }

  // Determine badges
  const categoryBadgeText = (product.categorySlug === 'access-automation' || product.category === 'Access Automation')
    ? 'AUTOMATION'
    : (product.categorySlug === 'traffic-perimeter' || product.category === 'Traffic & Perimeter')
    ? 'TRAFFIC & PERIMETER'
    : (product.categorySlug === 'pharma-cleanroom' || product.category === 'Pharma Cleanroom')
    ? 'PHARMA CLEANROOM'
    : (product.categorySlug === 'fire-life-safety' || product.category === 'Fire & Life Safety')
    ? 'FIRE & LIFE SAFETY'
    : (product.categorySlug === 'surveillance-alerts' || product.category === 'Surveillance & Alerts')
    ? 'SURVEILLANCE & ALERTS'
    : (product.category?.toUpperCase() || 'AUTOMATION');

  const subBadgeText = product.subcategory || (
    product.categorySlug === 'access-automation' ? 'ACCESS CONTROL' :
    product.categorySlug === 'traffic-perimeter' ? 'VEHICLE ACCESS' :
    product.categorySlug === 'pharma-cleanroom' ? 'AIRLOCK LOGIC' :
    product.categorySlug === 'fire-life-safety' ? 'LIFE SAFETY' :
    product.categorySlug === 'surveillance-alerts' ? 'AI TELEMETRY' :
    'INDUSTRIAL GRADE'
  );

  const statusBadgeText = product.badge || 'HIGH DEMAND';

  // Determine trust indicators (3 items)
  const trustIndicators = product.trustIndicators && product.trustIndicators.length >= 3
    ? product.trustIndicators.slice(0, 3)
    : [
        { text: 'ISO & CE Certified Quality', icon: 'ShieldCheck' },
        { text: 'Turnkey PAN-India Installation', icon: 'Wrench' },
        { text: 'OEM Warranty & Service Support', icon: 'Settings' }
      ];

  // Video Section details
  const videoData = product.video || {
    hasVideoFile: false,
    poster: product.heroImage,
    badge: 'PRODUCT VIDEO',
    heading: `${product.name} in Action`,
    description: `Watch how our ${product.name.toLowerCase()} delivers smooth, secure, and intelligent operation for modern commercial and industrial environments.`,
    bullets: [
      'Smooth & Quiet Operation',
      'Access Control Integration',
      'Heavy-Duty Construction',
      'Safety & Obstruction Detection'
    ]
  };

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

  // Section D: Engineering & Technical Overview
  const engineeringHeading = product.overview?.heading || 'Designed for Secure & Intelligent Access';
  const engineeringDescription = (product.overview?.paragraphs && product.overview.paragraphs[0])
    ? product.overview.paragraphs[0]
    : (product.heroDescription || `Our ${product.name.toLowerCase()} is engineered for reliable performance, advanced system integration, and long-term durability across high-throughput commercial and industrial environments.`);

  // 4 Feature Cards for Section D
  const featureCircleClasses = ['circle-cyan', 'circle-red', 'circle-blue', 'circle-green'];
  const defaultBenefitIcons = ['Settings', 'Lock', 'Cpu', 'ShieldCheck'];

  const rawBenefits = (product.benefits && product.benefits.length > 0)
    ? product.benefits
    : [
        {
          title: 'Motorized Operation',
          desc: 'Smooth and reliable automated movement engineered for high-traffic environments.',
          iconName: 'Settings'
        },
        {
          title: 'Access Control Integration',
          desc: 'Seamlessly supports card, biometric, RFID, FASTag, and central PLC systems.',
          iconName: 'Lock'
        },
        {
          title: 'Heavy-Duty Construction',
          desc: 'Built with certified materials for long-lasting performance in industrial applications.',
          iconName: 'Cpu'
        },
        {
          title: 'Safety & Obstruction Detection',
          desc: 'Advanced active sensors and auto-reverse logic ensure safe and secure operation.',
          iconName: 'ShieldCheck'
        }
      ];

  const featureCards = rawBenefits.slice(0, 4);

  // Section E: Specifications & Standards
  const rawTableRows = product.specs?.tableRows || [];
  const tableRows = rawTableRows.length > 0
    ? rawTableRows
    : [
        { label: 'Drive Type', value: 'Electromechanical / Hydraulic' },
        { label: 'Construction Material', value: 'Mild Steel / Stainless Steel / Aluminium' },
        { label: 'Operating Speed', value: 'Microprocessor Adjustable' },
        { label: 'Power Supply', value: '230V AC, 50Hz' },
        { label: 'Access Control', value: 'Card, RFID, Biometric, dry contacts' },
        { label: 'Safety Features', value: 'Obstacle detection, Auto stop, Safety sensors' },
        { label: 'Duty Cycle', value: '100% Continuous Duty Rated' },
        { label: 'Application', value: 'Commercial, Healthcare, Industrial, Logistics' }
      ];

  const complianceTitle = product.specs?.complianceTitle || 'Standards & Compliance';
  const rawCompliance = product.specs?.complianceItems || [];
  const complianceItems = rawCompliance.length > 0
    ? rawCompliance
    : [
        'ISO Certified Quality Management',
        'CE Standard Verified Components',
        'Safety & Reliability Focus',
        'Durable & Weather Resistant Ingress Protection',
        'Professional Turnkey Commissioning'
      ];

  // Section F: Related Images (Target: 5 images in horizontal row)
  const rawRelatedImages = product.relatedImages?.images || [];
  const fallbackImages = [
    { id: 1, src: product.heroImage || '/products/automatic-doors.jpg', caption: `${product.name} Primary Installation` },
    { id: 2, src: '/hero-glass-atrium.jpg', caption: 'Commercial Facility Deployment' },
    { id: 3, src: '/hero-security-command-center.jpg', caption: 'Central Operations Control' },
    { id: 4, src: '/services/services-hero-access.jpg', caption: 'Turnkey Architectural Integration' },
    { id: 5, src: '/products/cleanroom-interlocks.jpg', caption: 'Controlled Environment Suite' }
  ];

  const allAvailableImages = rawRelatedImages.length >= 3 ? rawRelatedImages : fallbackImages;

  // Window of 5 images based on carouselOffset
  const totalImgs = allAvailableImages.length;
  const displayedImages = [];
  const countToDisplay = Math.min(5, totalImgs);
  for (let i = 0; i < countToDisplay; i++) {
    displayedImages.push(allAvailableImages[(carouselOffset + i) % totalImgs]);
  }

  const handlePrevImages = () => {
    setCarouselOffset(prev => (prev === 0 ? totalImgs - 1 : prev - 1));
  };

  const handleNextImages = () => {
    setCarouselOffset(prev => (prev === totalImgs - 1 ? 0 : prev + 1));
  };

  // Modal handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
        category: product.category || 'Automation',
        product_name: product.name,
        message: `${formData.message} [Scope/Qty: ${formData.quantity}]`
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

  const handleCategoryBreadcrumb = () => {
    if (onNavigate) {
      if (product.categoryPage) {
        onNavigate(product.categoryPage);
      } else {
        onNavigate('home', 'catalog');
      }
    }
  };

  // Determine if product uses interactive demo
  const isInterlockDemo = product.slug === 'door-interlock-systems' || product.interactiveDemo === 'interlock';
  const isPassBoxDemo = product.slug === 'pass-box-systems' || product.interactiveDemo === 'passbox';
  const isDigitalClockDemo = product.slug === 'digital-gps-clocks' || product.interactiveDemo === 'digital-clock';
  const isChillerDoorDemo = product.slug === 'chiller-clean-room-doors' || product.interactiveDemo === 'chiller-door';

  return (
    <div className="auto-doors-page-container">

      {/* =========================================================================
          SECTION A: BREADCRUMBS
          ========================================================================= */}
      <nav className="auto-doors-breadcrumb" aria-label="Breadcrumb">
        <button
          className="auto-breadcrumb-btn"
          onClick={() => onNavigate && onNavigate('home')}
        >
          Home
        </button>
        <span className="auto-breadcrumb-sep">&gt;</span>
        <button
          className="auto-breadcrumb-btn"
          onClick={handleCategoryBreadcrumb}
        >
          {product.category || 'Automation'}
        </button>
        <span className="auto-breadcrumb-sep">&gt;</span>
        <span className="auto-breadcrumb-curr">{product.name}</span>
      </nav>

      {/* =========================================================================
          SECTION B: PRODUCT HERO (Two-Column Layout)
          ========================================================================= */}
      <section className="auto-doors-hero-section">
        <div className="auto-doors-hero-grid">

          {/* Left Column: Badges, Heading, Description, Quotation Button, Trust Row */}
          <div className="auto-doors-hero-left">
            <div className="auto-badge-row">
              <span className="auto-badge-solid-blue">{categoryBadgeText}</span>
              <span className="auto-badge-soft-blue">{subBadgeText}</span>
              <span className="auto-badge-soft-pink">{statusBadgeText}</span>
            </div>

            <h1 className="auto-doors-hero-title">{product.name}</h1>

            <p className="auto-doors-hero-desc">
              {product.heroDescription || product.tagline}
            </p>

            <div className="auto-btn-row">
              <button
                className="auto-btn-primary"
                onClick={() => setIsQuoteModalOpen(true)}
                id="btn-hero-instant-quotation"
              >
                <span>Request Instant Quotation</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="auto-trust-row">
              {trustIndicators.map((item, idx) => (
                <div key={idx} className="auto-trust-item">
                  {resolveIcon(item.icon, ShieldCheck, 18, 'auto-trust-icon')}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="auto-doors-hero-right">
            <img
              src={product.heroImage}
              alt={`${product.name} Showcase`}
              className="auto-hero-main-img"
              loading="eager"
            />
            <div className="auto-hero-dots">
              <span className="auto-hero-dot active"></span>
              <span className="auto-hero-dot"></span>
              <span className="auto-hero-dot"></span>
              <span className="auto-hero-dot"></span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION C: PRODUCT VIDEO SECTION
          ========================================================================= */}
      <section className="auto-wide-card">
        <div className="auto-doors-video-grid">

          {/* Left Column: Interactive Simulation OR Video Player OR Visual Fallback */}
          {isInterlockDemo ? (
            <div className="auto-video-wrapper" style={{ aspectRatio: 'auto', background: 'transparent' }}>
              <DoorInterlockSimulator onInquireInterlock={() => setIsQuoteModalOpen(true)} />
            </div>
          ) : isPassBoxDemo ? (
            <div className="auto-video-wrapper" style={{ aspectRatio: 'auto', background: 'transparent' }}>
              <PassBoxDemo />
            </div>
          ) : isDigitalClockDemo ? (
            <div className="auto-video-wrapper" style={{ aspectRatio: 'auto', background: 'transparent' }}>
              <DigitalClockDemo />
            </div>
          ) : isChillerDoorDemo ? (
            <div className="auto-video-wrapper" style={{ aspectRatio: 'auto', background: 'transparent' }}>
              <ChillerCleanroomDoorDemo />
            </div>
          ) : (
            <div className="auto-video-wrapper">
              {videoData.hasVideoFile && videoData.videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    src={videoData.videoSrc}
                    poster={videoData.poster || product.heroImage}
                    controls
                    playsInline
                    preload="metadata"
                    className="auto-html5-video"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                  />
                  {!isVideoPlaying && (
                    <>
                      <button
                        className="auto-video-play-overlay"
                        onClick={handleVideoPlayToggle}
                        aria-label={`Play ${product.name} Video`}
                      >
                        <div className="auto-play-circle">
                          <Play size={28} className="fill-white text-white ml-1" />
                        </div>
                      </button>
                      <div className="auto-video-fallback-pill" style={{ pointerEvents: 'none' }}>
                        HD Product Showcase
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <img
                    src={videoData.poster || product.heroImage}
                    alt={`${product.name} Preview`}
                    className="auto-html5-video"
                  />
                  <div className="auto-video-play-overlay" style={{ cursor: 'default' }}>
                    <div className="auto-play-circle" style={{ opacity: 0.9 }}>
                      <Play size={28} className="fill-white text-white ml-1" />
                    </div>
                  </div>
                  <div className="auto-video-fallback-pill">
                    HD Product Showcase
                  </div>
                </>
              )}
            </div>
          )}

          {/* Right Column: Label, Heading, Description, 4 Bullet Points */}
          <div className="auto-doors-video-content">
            <span className="auto-card-kicker">
              {videoData.badge || 'PRODUCT VIDEO'}
            </span>

            <h2 className="auto-card-heading">
              {videoData.heading || `${product.name} in Action`}
            </h2>

            <p className="auto-card-desc">
              {videoData.description}
            </p>

            <div className="auto-video-bullets-list">
              {(videoData.bullets || []).map((bullet, idx) => {
                const isOdd = idx % 2 !== 0;
                const iconComp = idx === 0 ? Volume2 : idx === 1 ? Lock : idx === 2 ? Settings : ShieldCheck;
                return (
                  <div key={idx} className="auto-video-bullet-item">
                    <div className={`auto-video-bullet-icon ${isOdd ? 'icon-red' : 'icon-blue'}`}>
                      {React.createElement(iconComp, { size: 14 })}
                    </div>
                    <span>{bullet}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION D: ENGINEERING & TECHNICAL OVERVIEW
          ========================================================================= */}
      <section className="auto-engineering-section">
        <div className="auto-engineering-header">
          <span className="auto-card-kicker">ENGINEERING & TECHNICAL OVERVIEW</span>
          <h2 className="auto-card-heading">{engineeringHeading}</h2>
          <p className="auto-card-desc">{engineeringDescription}</p>
        </div>

        {/* 4 Feature Cards in a Row */}
        <div className="auto-feature-cards-row">
          {featureCards.map((card, idx) => {
            const circleClass = featureCircleClasses[idx % featureCircleClasses.length];
            const fallbackIcon = defaultBenefitIcons[idx % defaultBenefitIcons.length];
            return (
              <div key={idx} className="auto-feature-box">
                <div className={`auto-feature-icon-circle ${circleClass}`}>
                  {resolveIcon(card.iconName, ICON_MAP[fallbackIcon] || Settings, 22)}
                </div>
                <div className="auto-feature-content">
                  <h5>{card.title}</h5>
                  <p>{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION E: TECHNICAL SPECIFICATIONS & STANDARDS
          ========================================================================= */}
      <section className="auto-doors-specs-grid">

        {/* Left Column: Specifications Table */}
        <div className="auto-specs-card-left">
          <h3 className="auto-specs-title">Technical Specifications</h3>
          <div className="auto-specs-table-container">
            <table className="auto-specs-table">
              <tbody>
                {tableRows.map((row, idx) => {
                  const cleanLabel = (row.label || '').replace(/:$/, '');
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'even-row' : ''}>
                      <td className="auto-spec-label">{cleanLabel}</td>
                      <td className="auto-spec-value">{row.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Standards & Compliance Card */}
        <div className="auto-specs-card-right">
          <h3 className="auto-specs-title">{complianceTitle}</h3>
          <div className="auto-compliance-list">
            {complianceItems.map((item, idx) => (
              <div key={idx} className="auto-compliance-item">
                <div className="auto-compliance-icon-wrap">
                  {idx === 0 ? <Award size={15} /> :
                   idx === 1 ? <CheckCircle2 size={15} /> :
                   idx === 2 ? <ShieldCheck size={15} /> :
                   idx === 3 ? <Leaf size={15} /> :
                   <Wrench size={15} />}
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION F: RELATED IMAGES
          ========================================================================= */}
      <section className="auto-doors-related-section">
        <div className="auto-related-header">
          <div className="auto-related-header-left">
            <h3>Related Images</h3>
          </div>

          <div className="auto-related-controls">
            <button
              className="auto-related-view-all"
              onClick={() => onNavigate && onNavigate('catalog')}
            >
              View All
            </button>
            <div className="auto-arrow-btns-group">
              <button
                className="auto-arrow-btn"
                onClick={handlePrevImages}
                aria-label="Previous Related Images"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="auto-arrow-btn"
                onClick={handleNextImages}
                aria-label="Next Related Images"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="auto-related-grid">
          {displayedImages.map((img, idx) => (
            <div key={`${img.id || idx}-${idx}`} className="auto-related-card">
              <div className="auto-related-media">
                <img
                  src={img.src}
                  alt={img.caption || `${product.name} Installation View`}
                  loading="lazy"
                />
              </div>
              <div className="auto-related-caption">{img.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION G: INSTANT QUOTATION MODAL
          ========================================================================= */}
      {isQuoteModalOpen && (
        <div className="auto-modal-backdrop" onClick={() => setIsQuoteModalOpen(false)}>
          <div className="auto-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="auto-modal-close-btn"
              onClick={() => setIsQuoteModalOpen(false)}
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>

            {modalSubmitted ? (
              <div className="auto-modal-success">
                <CheckCircle2 size={54} className="text-emerald-500 mx-auto" style={{ color: '#10b981', margin: '0 auto 12px' }} />
                <h4>Quotation Request Received!</h4>
                <p>
                  Thank you! Our technical engineering team will review your specifications for <strong>{product.name}</strong> and contact you with a detailed technical proposal within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 className="auto-modal-title">Request Instant Quotation</h3>
                <p className="auto-modal-subtitle">
                  {product.name} • Turnkey Engineering Support
                </p>

                <form onSubmit={handleModalSubmit}>
                  <div className="auto-form-group">
                    <label className="auto-form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="auto-form-input"
                    />
                  </div>

                  <div className="auto-form-group">
                    <label className="auto-form-label">Corporate Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. rajesh@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="auto-form-input"
                    />
                  </div>

                  <div className="auto-form-group">
                    <label className="auto-form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="auto-form-input"
                    />
                  </div>

                  <div className="auto-form-group">
                    <label className="auto-form-label">Company / Facility Name</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Torrent Pharma / L&T Realty"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="auto-form-input"
                    />
                  </div>

                  <div className="auto-form-group">
                    <label className="auto-form-label">Project Scope / Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      placeholder="e.g. 4 Entrance Sets / Turnkey Site"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="auto-form-input"
                    />
                  </div>

                  <div className="auto-form-group">
                    <label className="auto-form-label">Project Requirements / Notes</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="auto-form-textarea"
                    />
                  </div>

                  <button type="submit" className="auto-modal-submit-btn">
                    <Send size={16} />
                    <span>Submit Quotation Request</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
