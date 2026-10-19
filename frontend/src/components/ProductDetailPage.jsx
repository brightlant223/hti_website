import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Wrench,
  Settings,
  Zap,
  Clock,
  Flame,
  Activity,
  Lock,
  Layers,
  Truck,
  Phone,
  Mail,
  FileText,
  PlayCircle,
  Sparkles,
  Building2,
  Shield,
  Radio,
  Eye,
  Info
} from 'lucide-react';
import { getProductBySlug } from '../data/productCatalogueData';
import './ProductDetailPage.css';

// Specialized Cleanroom Interactive Simulations
import PassBoxDemo from './PassBoxDemo';
import DigitalClockDemo from './DigitalClockDemo';
import ChillerCleanroomDoorDemo from './ChillerCleanroomDoorDemo';
import DoorInterlockSimulator from './DoorInterlockSimulator';

// Map icon string names to Lucide components
const ICON_MAP = {
  ShieldCheck,
  Cpu,
  Wrench,
  Settings,
  Zap,
  Clock,
  Flame,
  Activity,
  Lock,
  Layers,
  Truck,
  Building2,
  CheckCircle2,
  Shield,
  FileText,
  Sparkles,
  Radio
};

const resolveIcon = (name, fallback = ShieldCheck) => {
  if (!name) return fallback;
  return ICON_MAP[name] || fallback;
};

export default function ProductDetailPage({
  product: productProp,
  onNavigate
}) {
  // Always resolve from structured master catalogue to guarantee full data fidelity
  const rawSlug = typeof productProp === 'string'
    ? productProp
    : (productProp?.slug || 'automatic-sliding-swing-doors');

  const product = getProductBySlug(rawSlug);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [rawSlug]);

  if (!product) {
    return (
      <div className="hti-product-detail-view">
        <div className="hti-container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Product System Not Found
          </h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            The requested industrial system may have been updated in our catalog.
          </p>
          <button
            className="hti-btn-primary"
            onClick={() => onNavigate && onNavigate('home', 'catalog')}
          >
            <ArrowLeft size={16} /> Return to Products Catalog
          </button>
        </div>
      </div>
    );
  }

  // Related products resolution (2-3 items)
  const relatedProducts = (product.relatedSlugs || [])
    .map(slug => getProductBySlug(slug))
    .filter(Boolean)
    .slice(0, 3);

  // Extract structured sections
  const overviewObj = product.overview || {};
  const overviewParas = overviewObj.paragraphs || [overviewObj.whatItIs, overviewObj.purposeAndOperation].filter(Boolean);
  const overviewHighlights = overviewObj.highlights || [];

  const benefitsList = product.benefits || product.keyBenefits || [];
  const applicationsList = product.applications || [];

  const specsObj = product.specs || product.technicalInfo || {};
  const tableRows = specsObj.tableRows || specsObj.specifications || [];
  const complianceItems = specsObj.complianceItems || [];

  const handleContactClick = () => {
    if (onNavigate) {
      onNavigate('contact');
    }
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

  const handleScrollToSpecs = (e) => {
    e.preventDefault();
    const el = document.getElementById('specifications');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hti-product-detail-view">

      {/* =========================================================================
          A. BREADCRUMB NAVIGATION
          ========================================================================= */}
      <nav className="hti-breadcrumb-bar" aria-label="Breadcrumb">
        <div className="hti-container">
          <ol className="hti-breadcrumb-list">
            <li className="hti-breadcrumb-item">
              <button onClick={() => onNavigate && onNavigate('home')}>Home</button>
            </li>
            <li className="hti-breadcrumb-sep">/</li>
            <li className="hti-breadcrumb-item">
              <button onClick={() => onNavigate && onNavigate('home', 'catalog')}>Products</button>
            </li>
            <li className="hti-breadcrumb-sep">/</li>
            <li className="hti-breadcrumb-item">
              <button onClick={handleCategoryBreadcrumb}>{product.category}</button>
            </li>
            <li className="hti-breadcrumb-sep">/</li>
            <li className="hti-breadcrumb-item active" aria-current="page">
              <span>{product.name}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* =========================================================================
          A. PRODUCT HERO HEADER
          ========================================================================= */}
      <section className="hti-product-hero">
        <div className="hti-container">
          <div className="hti-hero-grid">

            {/* Left Content */}
            <div className="hti-hero-content">
              <div className="hti-category-pill">
                <span className="hti-pulse-dot" />
                <span>{product.category}</span>
                {product.badge && <span style={{ opacity: 0.6 }}>•</span>}
                {product.badge && <span>{product.badge}</span>}
              </div>

              <h1 className="hti-hero-title">{product.name}</h1>

              <p className="hti-hero-intro">
                {product.heroDescription || product.tagline}
              </p>

              {/* Verified Engineering Trust Badges */}
              {product.trustIndicators && product.trustIndicators.length > 0 && (
                <div className="hti-trust-badges">
                  {product.trustIndicators.map((item, idx) => {
                    const IconComponent = resolveIcon(item.icon, ShieldCheck);
                    return (
                      <div key={idx} className="hti-trust-badge">
                        <IconComponent size={14} />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Primary Action Buttons (NO PDF BUTTON, NO EMBEDDED FORM) */}
              <div className="hti-hero-actions">
                <button
                  className="hti-btn-primary"
                  onClick={handleContactClick}
                  id="btn-hero-contact-team"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="#specifications"
                  className="hti-btn-secondary"
                  onClick={handleScrollToSpecs}
                >
                  <FileText size={15} />
                  <span>Technical Specifications</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image / Media */}
            <div className="hti-hero-visual">
              <div className="hti-hero-img-wrap">
                <img
                  src={product.heroImage}
                  alt={`${product.name} installation by HTI Automation`}
                  className="hti-hero-img"
                  loading="eager"
                />
                <div className="hti-hero-overlay-tag">
                  <span className="hti-pulse-dot" />
                  <span>Certified Industrial System • Turnkey Support</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          B. PRODUCT OVERVIEW
          ========================================================================= */}
      <section className="hti-section" id="overview">
        <div className="hti-container">
          <div className="hti-section-header">
            <span className="hti-section-tag">Engineering Overview</span>
            <h2 className="hti-section-title">System Architecture &amp; Purpose</h2>
            <p className="hti-section-subtitle">
              Engineered for continuous heavy-duty industrial duty cycles, fail-safe statutory compliance, and turnkey architectural integration.
            </p>
          </div>

          <div className="hti-overview-grid">

            {/* Left Paragraphs */}
            <div className="hti-overview-paragraphs">
              {overviewParas.map((para, idx) => (
                <div key={idx} className="hti-overview-block">
                  <p>{para}</p>
                </div>
              ))}
            </div>

            {/* Right Key Capability Highlights */}
            {overviewHighlights.length > 0 && (
              <div className="hti-highlights-card">
                <h4>Core Engineering Highlights</h4>
                <div className="hti-highlights-list">
                  {overviewHighlights.map((h, idx) => {
                    const label = typeof h === 'string' ? h : h.label;
                    const val = typeof h === 'string' ? null : h.value;
                    return (
                      <div key={idx} className="hti-highlight-item">
                        <CheckCircle2 size={16} />
                        <div>
                          <strong>{label}{val ? ':' : ''}</strong> {val && <span>{val}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* =========================================================================
          C. KEY BENEFITS (3–5 REFINED ICON CARDS)
          ========================================================================= */}
      {benefitsList.length > 0 && (
        <section className="hti-section bg-subtle" id="benefits">
          <div className="hti-container">
            <div className="hti-section-header">
              <span className="hti-section-tag">Key Advantages</span>
              <h2 className="hti-section-title">Designed for Performance &amp; Reliability</h2>
              <p className="hti-section-subtitle">
                Engineered specifically for {product.name} to maximize operational lifespan and reduce total cost of facility ownership.
              </p>
            </div>

            <div className="hti-benefits-grid">
              {benefitsList.map((benefit, idx) => {
                const BenefitIcon = resolveIcon(benefit.iconName || benefit.icon, ShieldCheck);
                return (
                  <div key={idx} className="hti-benefit-card">
                    <div className="hti-benefit-icon-wrap">
                      <BenefitIcon size={20} />
                    </div>
                    <h3 className="hti-benefit-title">{benefit.title}</h3>
                    <p className="hti-benefit-desc">{benefit.desc || benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          D. APPLICATIONS (RELEVANT INDUSTRIES & FACILITIES)
          ========================================================================= */}
      {applicationsList.length > 0 && (
        <section className="hti-section" id="applications">
          <div className="hti-container">
            <div className="hti-section-header">
              <span className="hti-section-tag">Deployment Sectors</span>
              <h2 className="hti-section-title">Target Industries &amp; Architectural Facilities</h2>
              <p className="hti-section-subtitle">
                Proven deployments across regulated environments, corporate campuses, logistics hubs, and critical infrastructure.
              </p>
            </div>

            <div className="hti-applications-grid">
              {applicationsList.map((app, idx) => (
                <div key={idx} className="hti-app-card">
                  <span className="hti-app-industry-badge">{app.industry || 'FACILITY DEPLOYMENT'}</span>
                  <h3 className="hti-app-title">{app.title}</h3>
                  <p className="hti-app-desc">{app.desc || app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          E. TECHNICAL INFORMATION & COMPLIANCE
          ========================================================================= */}
      {tableRows.length > 0 && (
        <section className="hti-section bg-subtle" id="specifications">
          <div className="hti-container">
            <div className="hti-section-header">
              <span className="hti-section-tag">Technical Parameters</span>
              <h2 className="hti-section-title">Engineering Specifications &amp; Standards</h2>
              <p className="hti-section-subtitle">
                Strictly authentic parameters derived from factory acceptance test (FAT) baselines and statutory Indian/international standards.
              </p>
            </div>

            <div className="hti-tech-container">

              {/* Specifications Table */}
              <div className="hti-table-responsive">
                <table className="hti-specs-table">
                  <tbody>
                    {tableRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="hti-spec-label">{row.label}</td>
                        <td className="hti-spec-value">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Statutory Compliance & Standards Card */}
              {complianceItems.length > 0 && (
                <div className="hti-compliance-card">
                  <h3 className="hti-compliance-title">
                    <ShieldCheck size={18} />
                    <span>{specsObj.complianceTitle || 'Statutory Compliance & Standards'}</span>
                  </h3>
                  <ul className="hti-compliance-list">
                    {complianceItems.map((comp, idx) => (
                      <li key={idx} className="hti-compliance-item">
                        <Check size={16} />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          F. PRODUCT MEDIA (OPERATIONAL VIDEO, INTERACTIVE SIMULATION OR GALLERY)
          ========================================================================= */}
      <section className="hti-section" id="media">
        <div className="hti-container">
          <div className="hti-section-header">
            <span className="hti-section-tag">Operational Showcase</span>
            <h2 className="hti-section-title">Media &amp; System Demonstrations</h2>
            <p className="hti-section-subtitle">
              Visual validation and operational dynamics of HTI automation systems.
            </p>
          </div>

          {/* Operational HTML5 Video (if available) */}
          {product.video?.hasVideoFile && product.video?.videoSrc && (
            <div className="hti-media-showcase">
              <div className="hti-video-layout">
                <div className="hti-video-player-wrap">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={product.video.poster || product.heroImage}
                    className="hti-html5-video"
                  >
                    <source src={product.video.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="hti-video-content">
                  <div className="hti-category-pill" style={{ marginBottom: '10px' }}>
                    <span>{product.video.badge || 'OPERATIONAL VIDEO'}</span>
                  </div>
                  <h4>{product.video.heading || `${product.name} in Action`}</h4>
                  <p>{product.video.description}</p>

                  {product.video.bullets && (
                    <ul className="hti-video-bullets">
                      {product.video.bullets.map((b, idx) => (
                        <li key={idx} className="hti-video-bullet-item">
                          <CheckCircle2 size={15} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Specialized Cleanroom Interactive Simulation (when applicable) */}
          {product.interactiveDemo === 'passbox' && (
            <div className="hti-media-showcase" style={{ padding: '0', overflow: 'hidden' }}>
              <PassBoxDemo />
            </div>
          )}

          {product.interactiveDemo === 'digital-clock' && (
            <div className="hti-media-showcase" style={{ padding: '0', overflow: 'hidden' }}>
              <DigitalClockDemo />
            </div>
          )}

          {product.interactiveDemo === 'chiller-door' && (
            <div className="hti-media-showcase" style={{ padding: '0', overflow: 'hidden' }}>
              <ChillerCleanroomDoorDemo />
            </div>
          )}

          {product.interactiveDemo === 'interlock' && (
            <div className="hti-media-showcase" style={{ padding: '0', overflow: 'hidden' }}>
              <DoorInterlockSimulator onInquireInterlock={handleContactClick} />
            </div>
          )}

          {/* Additional Product Imagery / Gallery */}
          {product.relatedImages?.images && product.relatedImages.images.length > 0 && (
            <div className="hti-gallery-container" style={{ marginTop: '28px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
                {product.relatedImages.heading || 'System Installation Views'}
              </h4>
              <div className="hti-gallery-grid">
                {product.relatedImages.images.map((img) => (
                  <div key={img.id} className="hti-gallery-card">
                    <img src={img.src} alt={img.caption} loading="lazy" />
                    <div className="hti-gallery-caption">{img.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          G. RELATED PRODUCTS (2–3 COMPACT CARDS)
          ========================================================================= */}
      {relatedProducts.length > 0 && (
        <section className="hti-section bg-subtle" id="related-systems">
          <div className="hti-container">
            <div className="hti-section-header">
              <span className="hti-section-tag">Complementary Infrastructure</span>
              <h2 className="hti-section-title">Related Systems in {product.category}</h2>
              <p className="hti-section-subtitle">
                Explore complementary equipment engineered to seamlessly integrate with {product.name}.
              </p>
            </div>

            <div className="hti-related-grid">
              {relatedProducts.map((rel) => (
                <div key={rel.slug} className="hti-related-card">
                  <div className="hti-related-img-wrap">
                    <img
                      src={rel.heroImage}
                      alt={rel.name}
                      className="hti-related-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="hti-related-body">
                    <span className="hti-related-category">{rel.category}</span>
                    <h3 className="hti-related-title">{rel.name}</h3>
                    <p className="hti-related-tagline">{rel.tagline}</p>
                    <button
                      className="hti-btn-view-related"
                      onClick={() => onNavigate && onNavigate('product', rel.slug)}
                    >
                      <span>Explore System</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          H. FINAL CORPORATE CTA (NO INLINE FORM, CLEAN LINK TO CONTACT US)
          ========================================================================= */}
      <section className="hti-section" style={{ borderBottom: 'none', paddingBottom: '30px' }}>
        <div className="hti-container">
          <div className="hti-final-cta-banner">

            <div className="hti-final-cta-left">
              <div className="hti-cta-badge">
                <Sparkles size={12} />
                <span>Turnkey Engineering Consultation</span>
              </div>
              <h2 className="hti-final-cta-title">
                Ready to Implement {product.name}?
              </h2>
              <p className="hti-final-cta-desc">
                Connect with our senior technical engineering team for turnkey site surveys, CAD general arrangement (GA) drawings, compliance documentation, and project BOQ estimates.
              </p>
              <div className="hti-final-cta-meta">
                <span>
                  <Building2 size={14} /> Turbhe MIDC, Navi Mumbai
                </span>
                <span>
                  <Phone size={14} /> +91 9992756077
                </span>
                <span>
                  <Mail size={14} /> info@htisystems.in
                </span>
              </div>
            </div>

            <div className="hti-final-cta-right">
              <button
                className="hti-btn-cta-large"
                onClick={handleContactClick}
                id="btn-final-contact-team"
              >
                <span>Contact Our Team</span>
                <ArrowRight size={18} />
              </button>
              <a href="tel:+919992756077" className="hti-cta-direct-phone">
                <Phone size={13} />
                <span>Immediate Project Hotline: +91 9992756077</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
