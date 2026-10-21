import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Flame, 
  Activity, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { PRODUCT_CATEGORIES, FEATURED_FLAGSHIP_PRODUCTS } from '../data/productCatalogueData';
import './ProductShowcase.css';

const categoryIconMap = {
  'access-automation': Cpu,
  'traffic-perimeter': ShieldCheck,
  'pharma-cleanroom': Lock,
  'fire-life-safety': Flame,
  'surveillance-alerts': Activity
};

export default function ProductShowcase({
  onSelectCategory,
  onSelectProduct,
  onExploreCatalog,
  onNavigate,
  onQuickQuote
}) {
  const handleCategoryClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    } else if (onNavigate) {
      onNavigate('catalog', categoryId);
    }
  };

  const handleProductClick = (slug) => {
    if (onSelectProduct) {
      onSelectProduct(slug);
    } else if (onNavigate) {
      onNavigate('product', slug);
    }
  };

  const handleCatalogClick = () => {
    if (onExploreCatalog) {
      onExploreCatalog();
    } else if (onNavigate) {
      onNavigate('catalog', 'all');
    }
  };

  const handleQuoteClick = (productName, category) => {
    if (onQuickQuote) {
      onQuickQuote(productName, category);
    } else if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <section id="products-showcase" className="products-showcase-section">
      <div className="container">

        {/* =========================================================================
            A. SECTION INTRODUCTION
            ========================================================================= */}
        <div className="showcase-header-center">
          <div className="pill-badge-blue">
            <Sparkles size={13} style={{ marginRight: 6 }} />
            <span>PRODUCT FAMILIES &amp; ARCHITECTURE</span>
          </div>
          <h2 className="showcase-title-large">
            Intelligent Automation &amp;{' '}
            <span className="title-highlight-blue">Security Solutions</span>
          </h2>
          <p className="showcase-subtitle-center">
            HTI provides integrated access automation, perimeter defense, USFDA cleanroom interlocks, turnkey fire safety networks, and intelligent 4K AI surveillance infrastructure across India.
          </p>
        </div>

        {/* =========================================================================
            B. VISUAL CATEGORY SHOWCASE (5 CARDS)
            ========================================================================= */}
        <div className="category-showcase-grid">
          {PRODUCT_CATEGORIES.map((cat) => {
            const IconComp = categoryIconMap[cat.id] || Cpu;
            return (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => handleCategoryClick(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(cat.id);
                  }
                }}
                title={`Explore ${cat.title} systems`}
              >
                {/* Image Wrap */}
                <div className="category-card-media">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="category-card-img"
                    loading="lazy"
                  />
                  <div className="category-card-overlay" />
                  
                  {/* Top Badges */}
                  <div className="category-media-badges">
                    <span className="category-badge-pill">
                      <IconComp size={12} />
                      <span>{cat.count} Systems</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="category-card-body">
                  <div className="category-card-header">
                    <h3 className="category-card-title">{cat.title}</h3>
                    <div className="category-arrow-circle" aria-hidden="true">
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  <p className="category-card-desc">{cat.shortDescription}</p>

                  {/* Highlights pills */}
                  {cat.keyHighlights && (
                    <div className="category-highlights-row">
                      {cat.keyHighlights.slice(0, 2).map((hl, hIdx) => (
                        <span key={hIdx} className="category-hl-tag">{hl}</span>
                      ))}
                    </div>
                  )}

                  {/* Explore Link */}
                  <div className="category-card-footer">
                    <span className="category-explore-link">
                      <span>Explore Category</span>
                      <ArrowRight size={14} className="explore-arrow-icon" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            C. FEATURED PRODUCTS (CURATED 4 FLAGSHIP SYSTEMS)
            ========================================================================= */}
        <div className="featured-flagships-wrap">
          <div className="flagships-header-row">
            <div>
              <div className="pill-badge-gray">
                <Layers size={12} style={{ marginRight: 6 }} />
                <span>FLAGSHIP SYSTEMS</span>
              </div>
              <h3 className="flagships-section-title">
                Featured Engineering Installations
              </h3>
              <p className="flagships-section-sub">
                Handpicked heavy-duty systems widely specified across pharmaceuticals, corporate offices, and logistics hubs.
              </p>
            </div>

            <button 
              className="btn-view-all-flagships"
              onClick={handleCatalogClick}
              title="Explore all 25 systems in full catalog"
            >
              <span>Explore All 25 Systems</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="flagships-grid">
            {FEATURED_FLAGSHIP_PRODUCTS.map((prod) => (
              <div key={prod.slug} className="flagship-card">
                <button
                  type="button"
                  className="flagship-card-media"
                  onClick={() => handleProductClick(prod.slug)}
                  aria-label={`View specifications for ${prod.name}`}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="flagship-card-img"
                    loading="lazy"
                  />
                  <span className="flagship-category-pill">{prod.category}</span>
                </button>

                <div className="flagship-card-body">
                  <button
                    type="button"
                    className="flagship-title flagship-title-btn"
                    onClick={() => handleProductClick(prod.slug)}
                  >
                    {prod.name}
                  </button>
                  <p className="flagship-tagline">{prod.tagline}</p>

                  <div className="flagship-specs-list">
                    {prod.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flagship-spec-item">
                        <CheckCircle2 size={13} className="spec-check-icon" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flagship-actions-row">
                    <button
                      className="flagship-btn-primary"
                      onClick={() => handleProductClick(prod.slug)}
                      title={`View specifications for ${prod.name}`}
                    >
                      <span>View Specifications</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      className="flagship-btn-secondary"
                      onClick={() => handleQuoteClick(prod.name, prod.category)}
                      title={`Request quotation for ${prod.name}`}
                    >
                      <span>Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            D. FULL CATALOGUE CALL TO ACTION BANNER
            ========================================================================= */}
        <div className="catalog-cta-banner">
          <div className="catalog-cta-content">
            <div className="catalog-cta-badge">
              <Layers size={13} style={{ marginRight: 6 }} />
              <span>OFFICIAL 25-SYSTEM CATALOGUE</span>
            </div>
            <h3 className="catalog-cta-heading">
              Browse the Complete Range of Industrial Automation &amp; Security Systems
            </h3>
            <p className="catalog-cta-desc">
              Looking for CAD drawings, USFDA 21 CFR Part 11 airlock schematics, fire certifications, or customized dimensions? Access our complete 25-system engineering catalogue with real-time technical search and filtering.
            </p>
          </div>

          <div className="catalog-cta-actions">
            <button
              className="catalog-cta-primary-btn"
              onClick={handleCatalogClick}
            >
              <span>Explore All Products</span>
              <ArrowRight size={16} />
            </button>
            <button
              className="catalog-cta-secondary-btn"
              onClick={() => onNavigate && onNavigate('contact')}
            >
              <span>Request Technical Proposal</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
