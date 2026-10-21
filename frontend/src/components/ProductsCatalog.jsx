import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Search, 
  X, 
  PlayCircle, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Flame, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { getAllProducts, TOTAL_PRODUCT_COUNT } from '../data/productCatalogueData';

// Category tab configuration
const CATEGORY_TABS = [
  { id: 'all', label: 'All Systems', count: 25, icon: Layers },
  { id: 'access-automation', label: 'Access Automation', count: 5, icon: Cpu },
  { id: 'traffic-perimeter', label: 'Traffic & Perimeter', count: 5, icon: ShieldCheck },
  { id: 'pharma-cleanroom', label: 'Pharma Cleanroom', count: 5, icon: Lock },
  { id: 'fire-life-safety', label: 'Fire & Life Safety', count: 5, icon: Flame },
  { id: 'surveillance-alerts', label: 'Surveillance & Alerts', count: 5, icon: Activity }
];

export default function ProductsCatalog({
  initialCategory = 'all',
  isDedicatedPage = false,
  onSelectProduct,
  onNavigate,
  onQuickQuote
}) {
  // Category ids are lower-case slugs ('all', 'access-automation', ...).
  // Callers may pass a display label such as 'All', which used to silently
  // filter everything out and render an empty catalogue.
  const normalizeCategory = (value) => {
    if (!value) return 'all';
    const slug = String(value).trim().toLowerCase();
    return slug === '' || slug === 'all' ? 'all' : slug;
  };

  const [activeCategory, setActiveCategory] = useState(normalizeCategory(initialCategory));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveCategory(normalizeCategory(initialCategory));
  }, [initialCategory]);

  const allProducts = useMemo(() => getAllProducts(), []);

  // Filter products by selected category and search query
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // 1. Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.categorySlug === activeCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        (p.heroDescription && p.heroDescription.toLowerCase().includes(q)) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    return result;
  }, [allProducts, activeCategory, searchQuery]);

  const handleCardClick = (slug) => {
    if (onSelectProduct) {
      onSelectProduct(slug);
    } else if (onNavigate) {
      onNavigate('product', slug);
    }
  };

  const handleContactCTA = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else if (onQuickQuote) {
      onQuickQuote('General Product Inquiry', 'Product Catalog');
    }
  };

  return (
    <section id="catalog" className="catalog-section">
      {/* Decorative background blobs */}
      <div className="catalog-bg-blob blob-1" />
      <div className="catalog-bg-blob blob-2" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Breadcrumb if viewed as dedicated catalog page */}
        {isDedicatedPage && (
          <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
              <button 
                onClick={() => onNavigate && onNavigate('home')}
                style={{ background: 'none', border: 'none', color: '#0284c7', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                Home
              </button>
              <span>/</span>
              <span style={{ color: 'var(--text-main, #0f172a)', fontWeight: 700 }}>Official Product Catalogue ({TOTAL_PRODUCT_COUNT} Systems)</span>
            </div>
          </nav>
        )}
        <div className="catalog-header-row">
          <div className="catalog-header-left">
            <div className="pill-badge-catalog">
              <Layers size={13} style={{ marginRight: 6 }} />
              <span>OFFICIAL PRODUCT CATALOGUE</span>
            </div>
            <h2 className="catalog-section-title">
              Precision Automation &amp;{' '}
              <span className="catalog-title-highlight">Security Systems</span>
            </h2>
            <p className="catalog-subtitle">
              Engineered for continuous industrial duty, pharmaceutical compliance, and turnkey architectural integration.
            </p>
          </div>

          <div className="catalog-header-right">
            <button
              className="btn-view-all-products"
              onClick={handleContactCTA}
            >
              <span>Request Turnkey Quote</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Search Bar & Category Controls Container */}
        <div className="catalog-controls-bar" style={{ marginBottom: '24px' }}>
          
          {/* Live Search Input */}
          <div className="catalog-search-wrap" style={{
            position: 'relative',
            marginBottom: '16px',
            maxWidth: '520px'
          }}>
            <Search size={17} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
              pointerEvents: 'none'
            }} />
            <label className="sr-only" htmlFor="catalog-search-input">
              Search all {TOTAL_PRODUCT_COUNT} systems
            </label>
            <input
              id="catalog-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${TOTAL_PRODUCT_COUNT} systems (e.g. boom barrier, interlock, 4K CCTV, cleanroom door)...`}
              style={{
                width: '100%',
                padding: '11px 40px 11px 42px',
                borderRadius: '9999px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '0.9rem',
                color: '#0f172a',
                outline: 'none',
                boxShadow: '0 1px 4px rgba(15, 23, 42, 0.05)',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills (5 Official Categories + All) */}
          <div className="catalog-filter-bar">
            {CATEGORY_TABS.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`filter-pill-btn ${isActive ? 'pill-active' : ''}`}
                  onClick={() => setActiveCategory(tab.id)}
                  style={isActive ? {
                    background: '#0284c7',
                    borderColor: '#0284c7',
                    color: '#ffffff'
                  } : {}}
                >
                  <IconComp size={14} />
                  <span>{tab.label}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    opacity: isActive ? 0.9 : 0.65,
                    marginLeft: '2px'
                  }}>
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Status Line */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            color: '#64748b',
            marginBottom: '18px'
          }}>
            <span>
              Showing <strong>{filteredProducts.length}</strong> of {allProducts.length} industrial systems
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(activeCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0284c7',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  textDecoration: 'underline'
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        {filteredProducts.length > 0 ? (
          <div 
            className="catalog-products-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '44px'
            }}
          >
            {filteredProducts.map((p) => {
              // Extract 3 bullet points from trust indicators or overview highlights
              const bullets = p.trustIndicators && p.trustIndicators.length > 0
                ? p.trustIndicators.slice(0, 3).map(t => t.text)
                : (p.overview?.highlights || []).slice(0, 3);

              const hasVideo = p.video?.hasVideoFile;

              return (
                <div
                  key={p.slug}
                  className="catalog-product-card"
                  onClick={() => handleCardClick(p.slug)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)',
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                    cursor: 'pointer'
                  }}
                >
                  {/* Thumbnail Wrap */}
                  <div 
                    className="product-thumb-wrap"
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      height: 'auto',
                      overflow: 'hidden',
                      background: '#f1f5f9'
                    }}
                  >
                    <img
                      src={p.heroImage}
                      alt={p.name}
                      className="product-thumb-img"
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    {/* Category Overlay Tag */}
                    <span 
                      className="product-category-badge"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {p.category}
                    </span>

                    {/* Video Badge (if applicable) */}
                    {hasVideo && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          background: 'rgba(2, 132, 199, 0.9)',
                          backdropFilter: 'blur(6px)',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <PlayCircle size={12} />
                        <span>VIDEO</span>
                      </span>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div 
                    className="product-card-body"
                    style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1
                    }}
                  >
                    <h3 
                      className="product-card-name"
                      style={{
                        fontSize: '1.08rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        lineHeight: 1.3,
                        marginBottom: '8px'
                      }}
                    >
                      {p.name}
                    </h3>

                    <p 
                      style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        lineHeight: 1.5,
                        margin: '0 0 14px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {p.tagline || p.heroDescription}
                    </p>

                    {/* 3 Key Engineering Feature Bullets */}
                    {bullets && bullets.length > 0 && (
                      <ul 
                        className="product-card-bullets"
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: '0 0 18px 0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          flex: 1
                        }}
                      >
                        {bullets.map((b, idx) => (
                          <li 
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '6px',
                              fontSize: '0.78rem',
                              color: '#334155',
                              lineHeight: 1.4
                            }}
                          >
                            <CheckCircle2 size={13} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Action Button: View Product */}
                    <button
                      className="btn-product-details"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(p.slug);
                      }}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#0284c7';
                        e.currentTarget.style.borderColor = '#0284c7';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.color = '#0f172a';
                      }}
                    >
                      <span>View Product</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search Results State */
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '56px 24px',
            textAlign: 'center',
            marginBottom: '44px'
          }}>
            <Search size={36} style={{ color: '#94a3b8', margin: '0 auto 14px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              No Industrial Systems Found
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 20px' }}>
              No systems match "{searchQuery}" in the selected category. Try searching for broader terms like "door", "barrier", "camera", or "interlock".
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              style={{
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              Reset Filters &amp; View All {TOTAL_PRODUCT_COUNT} Systems
            </button>
          </div>
        )}

        {/* Bottom Turnkey Consultation Banner */}
        <div className="catalog-cta-banner">
          <div>
            <div className="catalog-cta-label">Turnkey System Integration</div>
            <h3 className="catalog-cta-title">
              Need Custom Technical Sizing or Project BOQ?
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#475569' }}>
              Our engineering office at Turbhe MIDC, Navi Mumbai provides CAD drawings, FAT compliance, and Pan-India site commissioning.
            </p>
          </div>
          <button
            className="catalog-cta-btn"
            onClick={handleContactCTA}
          >
            <span>Connect with Engineering Team</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
