import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Settings, 
  Send, 
  Download, 
  Play, 
  Pause, 
  Check, 
  FileText, 
  Radio, 
  Leaf,
  Award,
  Image as ImageIcon,
  ChevronLeft, 
  ChevronRight, 
  X,
  CheckCircle2,
  Zap,
  Layers
} from 'lucide-react';
import '../AutomaticDoorsDetail.css';
import { ACCESS_AUTOMATION_CONFIGS } from '../data/accessAutomationDetailData';

// Helper to render dynamic icons cleanly
const renderDynamicIcon = (name, className = 'text-sky-600', size = 22) => {
  switch (name) {
    case 'Zap':
      return <Zap size={size} className={className} />;
    case 'Radio':
      return <Radio size={size} className={className} />;
    case 'Layers':
      return <Layers size={size} className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck size={size} className={className} />;
    case 'Settings':
      return <Settings size={size} className={className} />;
    case 'Leaf':
      return <Leaf size={size} className={className} />;
    case 'Wrench':
      return <Wrench size={size} className={className} />;
    case 'Award':
      return <Award size={size} className={className} />;
    case 'FileText':
      return <FileText size={size} className={className} />;
    default:
      return <Settings size={size} className={className} />;
  }
};

export default function AutomaticDoorsDetailView({ 
  product, 
  onNavigate, 
  onQuoteSubmit 
}) {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Match configuration for current product, fallback to automatic-sliding-swing-doors
  const cfg = ACCESS_AUTOMATION_CONFIGS[product?.slug] || ACCESS_AUTOMATION_CONFIGS['automatic-sliding-swing-doors'];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '1 Turnkey Site',
    message: `Hello HTI Engineering, please share technical data sheet, CAD GA drawing, and turnkey quotation for ${cfg.name}.`
  });

  // Carousel index for Related Images
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Sync state when product slug changes
  useEffect(() => {
    setIsVideoPlaying(false);
    setCarouselIndex(0);
    setModalSubmitted(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setFormData(prev => ({
      ...prev,
      message: `Hello HTI Engineering, please share technical data sheet, CAD GA drawing, and turnkey quotation for ${cfg.name}.`
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product?.slug, cfg.name]);

  const relatedImagesList = cfg.relatedImages.images;

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

  const handleBrochureDownload = () => {
    alert(`Technical specification dossier & CAD schematic for "${cfg.name}" is being prepared. Our engineering office will email the PDF package to your registered address.`);
  };

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
        category: product?.category || 'Automation',
        product_name: cfg.name,
        message: `${formData.message} [Qty: ${formData.quantity}]`
      })
    }).catch(() => {
      // Offline fallback
    });

    setModalSubmitted(true);
    if (onQuoteSubmit) onQuoteSubmit();
    setTimeout(() => {
      setModalSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 2400);
  };

  const handlePrevRelated = () => {
    setCarouselIndex(prev => (prev === 0 ? relatedImagesList.length - 1 : prev - 1));
  };

  const handleNextRelated = () => {
    setCarouselIndex(prev => (prev === relatedImagesList.length - 1 ? 0 : prev + 1));
  };

  // Rotate images based on carouselIndex for the 3 slots
  const displayedRelatedImages = [
    relatedImagesList[carouselIndex % relatedImagesList.length],
    relatedImagesList[(carouselIndex + 1) % relatedImagesList.length],
    relatedImagesList[(carouselIndex + 2) % relatedImagesList.length]
  ];

  return (
    <div className="auto-doors-page-container">
      
      {/* 1. Header & Navigation Breadcrumbs */}
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
          onClick={() => onNavigate && onNavigate('automation')}
        >
          Automation
        </button>
        <span className="auto-breadcrumb-sep">&gt;</span>
        <span className="auto-breadcrumb-curr">{cfg.breadcrumbName}</span>
      </nav>

      {/* 2. Hero Section: Left Content & Right High-Res Image */}
      <section className="auto-doors-hero-section">
        <div className="auto-doors-hero-grid">
          
          {/* Left Column: Badges, Heading, Description, Buttons, Trust Indicators */}
          <div className="auto-doors-hero-left">
            <div className="auto-badge-row">
              {cfg.badges.map((b, idx) => (
                <span key={idx} className={`auto-badge-${b.type}`}>
                  {b.text}
                </span>
              ))}
            </div>

            <h1 className="auto-doors-hero-title">{cfg.heading}</h1>

            <p className="auto-doors-hero-desc">
              {cfg.heroDescription}
            </p>

            <div className="auto-btn-row">
              <button 
                className="auto-btn-primary"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                <Send size={16} />
                <span>Request Instant Quotation</span>
              </button>

              <button 
                className="auto-btn-secondary"
                onClick={handleBrochureDownload}
              >
                <Download size={16} />
                <span>Download Specs PDF</span>
              </button>
            </div>

            <div className="auto-trust-row">
              {cfg.trustIndicators.map((item, idx) => (
                <div key={idx} className="auto-trust-item">
                  {renderDynamicIcon(item.icon, "text-sky-600", 18)}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Showcase Image with Carousel Indicator */}
          <div className="auto-doors-hero-right">
            <img 
              src={cfg.heroImage} 
              alt={`${cfg.name} Showcase`} 
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

      {/* 3. Product Video Section */}
      <section className="auto-wide-card">
        <div className="auto-doors-video-grid">
          
          {/* Left Column: Video Player or Polished Preview Fallback */}
          <div className="auto-video-wrapper">
            {cfg.video.hasVideoFile ? (
              <>
                <video 
                  ref={videoRef}
                  src={cfg.video.videoSrc} 
                  poster={cfg.video.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="auto-html5-video"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                />
                {!isVideoPlaying && (
                  <button 
                    className="auto-video-play-overlay"
                    onClick={handleVideoPlayToggle}
                    aria-label={`Play ${cfg.name} Video`}
                  >
                    <div className="auto-play-circle">
                      <Play size={28} className="fill-white text-white ml-1" />
                    </div>
                  </button>
                )}
              </>
            ) : (
              <>
                <img 
                  src={cfg.video.poster} 
                  alt={`${cfg.name} Video Preview`}
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

          {/* Right Column: Video Details & Features */}
          <div className="auto-doors-video-content">
            <span className="auto-badge-soft-pink">{cfg.video.badge}</span>
            
            <h2 className="auto-card-heading">
              {cfg.video.heading}
            </h2>

            <p className="auto-card-desc">
              {cfg.video.description}
            </p>

            <div className="auto-video-bullets-list">
              {cfg.video.bullets.map((bullet, idx) => (
                <div key={idx} className="auto-video-bullet-item">
                  <div className="auto-check-circle">
                    <Check size={13} className="text-white" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Engineering & Technical Overview Section */}
      <section className="auto-wide-card">
        <div className="auto-doors-engineering-grid">
          
          {/* Left Column: Heading & Description */}
          <div className="auto-engineering-col-left">
            <div className="auto-heading-with-icon">
              <FileText size={26} className="text-sky-600" />
              <h3>{cfg.engineering.heading}</h3>
            </div>
            
            <p className="auto-card-desc leading-relaxed">
              {cfg.engineering.description}
            </p>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div className="auto-feature-cards-grid">
            {cfg.engineering.cards.map((c, idx) => (
              <div key={idx} className="auto-feature-box">
                <div className={`auto-feature-icon-circle ${c.circleClass}`}>
                  {renderDynamicIcon(c.iconName, c.iconClass, 22)}
                </div>
                <div className="auto-feature-content">
                  <h5>{c.title}</h5>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Technical Specifications & Standards Section */}
      <section className="auto-wide-card">
        <div className="auto-doors-specs-grid">
          
          {/* Left Column: Specifications Table */}
          <div className="auto-specs-col-left">
            <div className="auto-heading-with-icon">
              <Settings size={26} className="text-sky-600" />
              <h3>{cfg.specs.heading}</h3>
            </div>

            <p className="auto-card-desc">
              {cfg.specs.description}
            </p>

            <div className="auto-specs-table-container">
              <table className="auto-specs-table">
                <tbody>
                  {cfg.specs.tableRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "even-row" : ""}>
                      <td className="auto-spec-label">{row.label}</td>
                      <td className="auto-spec-value">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Standards & Compliance Card */}
          <div className="auto-specs-col-right">
            <div className="auto-compliance-card">
              <div className="auto-heading-with-icon">
                <Award size={24} className="text-sky-600" />
                <h4>{cfg.specs.complianceTitle}</h4>
              </div>

              <div className="auto-compliance-list">
                {cfg.specs.complianceItems.map((item, idx) => (
                  <div key={idx} className="auto-compliance-item">
                    <div className="auto-check-circle">
                      <Check size={13} className="text-white" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Related Images Section */}
      <section className="auto-doors-related-section">
        <div className="auto-related-header">
          <div className="auto-related-header-text">
            <div className="auto-heading-with-icon">
              <ImageIcon size={24} className="text-sky-600" />
              <h3>{cfg.relatedImages.heading}</h3>
            </div>
            <p className="auto-card-desc mb-0">
              {cfg.relatedImages.description}
            </p>
          </div>

          <div className="auto-arrow-btns-group">
            <button 
              className="auto-arrow-btn" 
              onClick={handlePrevRelated}
              aria-label="Previous Related Images"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className="auto-arrow-btn" 
              onClick={handleNextRelated}
              aria-label="Next Related Images"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="auto-related-grid">
          {displayedRelatedImages.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="auto-related-card">
              <div className="auto-related-media">
                <img 
                  src={item.src} 
                  alt={item.caption} 
                  loading="lazy"
                />
              </div>
              <div className="auto-related-caption">{item.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Instant Quotation Modal */}
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
                <CheckCircle2 size={54} className="text-emerald-500 mx-auto" />
                <h4>Quotation Request Received!</h4>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our industrial automation engineering team will email the technical data dossier and custom project BOQ for <strong>{cfg.name}</strong> promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit}>
                <h3 className="auto-modal-title">Request Instant Quotation</h3>
                <div className="auto-modal-subtitle">{cfg.name}</div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  />
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Official Work Email *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    placeholder="name@company.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  />
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Phone / WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required
                    placeholder="+91 98200 00000" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  />
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Company &amp; Project Site Location</label>
                  <input 
                    type="text" 
                    name="company" 
                    placeholder="e.g., Godrej One, Mumbai / Navi Mumbai" 
                    value={formData.company}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  />
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Estimated Quantity</label>
                  <select 
                    name="quantity" 
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  >
                    <option value="1 Turnkey Site">1 Unit / Turnkey Site</option>
                    <option value="2-5 Units">2 - 5 Units</option>
                    <option value="6-20 Units (Industrial Campus)">6 - 20 Units (Industrial Campus)</option>
                    <option value="20+ Units (Enterprise Rollout)">20+ Units (Enterprise Rollout)</option>
                  </select>
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Technical Notes / Opening Dimensions</label>
                  <textarea 
                    name="message" 
                    rows="3"
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
            )}
          </div>
        </div>
      )}

    </div>
  );
}
