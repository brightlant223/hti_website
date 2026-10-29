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
  CheckCircle2,
  ChevronLeft,
  ChevronRight
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

const mapCategoryToSlug = (cat) => {
  if (!cat) return 'access-automation';
  const c = String(cat).toLowerCase();
  if (c.includes('auto') || c.includes('door') || c.includes('gate') || c.includes('shutter')) return 'access-automation';
  if (c.includes('perim') || c.includes('traffic') || c.includes('barrier') || c.includes('bollard') || c.includes('turnstile')) return 'traffic-perimeter';
  if (c.includes('clean') || c.includes('interlock') || c.includes('pharma') || c.includes('pass box') || c.includes('clock') || c.includes('hygiene')) return 'pharma-cleanroom';
  if (c.includes('fire') || c.includes('alarm') || c.includes('safety')) return 'fire-life-safety';
  if (c.includes('sec') || c.includes('surveil') || c.includes('cctv') || c.includes('alert') || c.includes('monitor') || c.includes('biometric')) return 'surveillance-alerts';
  return 'access-automation';
};

const normalizeDbProduct = (db) => {
  const catSlug = mapCategoryToSlug(db.category);
  const feats = Array.isArray(db.features) ? db.features : [];
  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    category: db.category,
    categorySlug: catSlug,
    tagline: db.tagline || '',
    heroDescription: db.description || '',
    description: db.description || '',
    badge: db.badge || '',
    isFeatured: Boolean(db.is_featured),
    image: db.image_url || '/products/automatic-doors.jpg',
    image_url: db.image_url || '/products/automatic-doors.jpg',
    heroImage: db.image_url || '/products/automatic-doors.jpg',
    keyFeatures: feats,
    features: feats,
    specs: db.specs || {},
    brochure: Boolean(db.brochure_url),
    brochure_url: db.brochure_url || '',
    datasheet_url: db.datasheet_url || '',
    video_url: db.video_url || '',
    hasVideo: Boolean(db.video_url)
  };
};

export default function ProductsCatalog({
  initialCategory = 'all',
  isDedicatedPage = false,
  onSelectProduct,
  onNavigate,
  onQuickQuote,
  dbProducts = []
}) {
  // Category ids are lower-case slugs ('all', 'access-automation', ...).
  const normalizeCategory = (value) => {
    if (!value) return 'all';
    const slug = String(value).trim().toLowerCase();
    return slug === '' || slug === 'all' ? 'all' : slug;
  };

  const [activeCategory, setActiveCategory] = useState(normalizeCategory(initialCategory));
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setActiveCategory(normalizeCategory(initialCategory));
  }, [initialCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const allProducts = useMemo(() => {
    const staticItems = getAllProducts();
    if (!Array.isArray(dbProducts) || dbProducts.length === 0) return staticItems;

    // Filter out unpublished / drafts
    const publishedDb = dbProducts.filter(p => p.is_published !== false);

    const dbMap = new Map();
    publishedDb.forEach(p => {
      dbMap.set(p.slug, normalizeDbProduct(p));
    });

    const combined = [];
    const seenSlugs = new Set();

    // Process static catalogue items, updating with DB fields if available
    staticItems.forEach(item => {
      if (dbMap.has(item.slug)) {
        combined.push({ ...item, ...dbMap.get(item.slug) });
        seenSlugs.add(item.slug);
      } else {
        combined.push(item);
        seenSlugs.add(item.slug);
      }
    });

    // Append newly created products from database
    publishedDb.forEach(p => {
      if (!seenSlugs.has(p.slug)) {
        combined.push(normalizeDbProduct(p));
        seenSlugs.add(p.slug);
      }
    });

    return combined;
  }, [dbProducts]);

  // Dynamic count calculation per category
  const categoryCounts = useMemo(() => {
    const counts = { all: allProducts.length };
    allProducts.forEach(p => {
      const cat = p.categorySlug;
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });
    return counts;
  }, [allProducts]);

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

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const startItem = filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);

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
          <nav aria-label="Breadcrumb" className="catalog-breadcrumb">
            <div className="catalog-breadcrumb-inner">
              <button 
                onClick={() => onNavigate && onNavigate('home')}
                className="catalog-breadcrumb-home"
              >
                Home
              </button>
              <span className="catalog-breadcrumb-sep">/</span>
              <span className="catalog-breadcrumb-current">Official Product Catalogue ({allProducts.length} Systems)</span>
            </div>
          </nav>
        )}
        <div className="catalog-header-row">
          <div className="catalog-header-left">
            <div className="pill-badge-catalog">
              <Layers size={13} style={{ marginRight: 6 }} />
              <span>OFFICIAL PRODUCT CATALOGUE</span>
            </div>
            <h1 className="catalog-section-title">
              Precision Automation &amp;{' '}
              <span className="catalog-title-highlight">Security Systems</span>
            </h1>
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
        <div className="catalog-controls-bar">
          
          {/* Live Search Input */}
          <div className="catalog-search-wrap">
            <Search size={17} className="catalog-search-icon" />
            <label className="sr-only" htmlFor="catalog-search-input">
              Search all {allProducts.length} systems
            </label>
            <input
              id="catalog-search-input"
              className="catalog-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${allProducts.length} systems (e.g. boom barrier, interlock, 4K CCTV, cleanroom door)...`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="catalog-search-clear-btn"
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
              const count = categoryCounts[tab.id] || tab.count || 0;
              return (
                <button
                  key={tab.id}
                  className={`filter-pill-btn ${isActive ? 'pill-active' : ''}`}
                  onClick={() => setActiveCategory(tab.id)}
                >
                  <IconComp size={14} />
                  <span>{tab.label}</span>
                  <span className="filter-pill-count">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Status Line */}
          <div className="catalog-status-line">
            <span>
              Showing <strong>{filteredProducts.length === 0 ? 0 : `${startItem}–${endItem}`}</strong> of {filteredProducts.length} industrial systems
              {searchQuery && ` matching "${searchQuery}"`}
              {filteredProducts.length < allProducts.length && ` (filtered from ${allProducts.length} total)`}
            </span>
            {(activeCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="btn-catalog-reset"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="catalog-products-grid">
              {paginatedProducts.map((p) => {
                // Extract 3 bullet points from trust indicators or overview highlights
                const bullets = p.trustIndicators && p.trustIndicators.length > 0
                  ? p.trustIndicators.slice(0, 3).map(t => t.text)
                  : (p.overview?.highlights || []).slice(0, 3);

                const hasVideo = p.video?.hasVideoFile || p.hasVideo;

                return (
                  <div
                    key={p.slug}
                    className="catalog-product-card"
                    onClick={() => handleCardClick(p.slug)}
                  >
                    {/* Thumbnail Wrap */}
                    <div className="product-thumb-wrap">
                      <img
                        src={p.heroImage || p.image || p.image_url || '/products/automatic-doors.jpg'}
                        alt={p.name}
                        className="product-thumb-img"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/products/automatic-doors.jpg';
                        }}
                      />

                      {/* Category Overlay Tag */}
                      <span className="product-category-badge">
                        {p.category}
                      </span>

                      {/* Video Badge (if applicable) */}
                      {hasVideo && (
                        <span className="product-video-badge">
                          <PlayCircle size={12} />
                          <span>VIDEO</span>
                        </span>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="product-card-body">
                      <h2 className="product-card-name">
                        {p.name}
                      </h2>

                      <p className="product-card-desc">
                        {p.tagline || p.heroDescription}
                      </p>

                      {/* 3 Key Engineering Feature Bullets */}
                      {bullets && bullets.length > 0 && (
                        <ul className="product-card-bullets">
                          {bullets.map((b, idx) => (
                            <li key={idx} className="product-bullet-item">
                              <CheckCircle2 size={13} className="bullet-check-icon" />
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
                      >
                        <span>View Product</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="catalog-pagination" aria-label="Catalog pages">
                <button
                  className="catalog-page-btn catalog-page-nav"
                  onClick={() => {
                    setCurrentPage(prev => Math.max(1, prev - 1));
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="catalog-pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`catalog-page-btn catalog-page-num ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  className="catalog-page-btn catalog-page-nav"
                  onClick={() => {
                    setCurrentPage(prev => Math.min(totalPages, prev + 1));
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}
          </>
        ) : (
          /* Empty Search Results State */
          <div className="catalog-empty-state">
            <Search size={36} className="catalog-empty-icon" />
            <h2 className="catalog-empty-title">
              No Industrial Systems Found
            </h2>
            <p className="catalog-empty-desc">
              No systems match "{searchQuery}" in the selected category. Try searching for broader terms like "door", "barrier", "camera", or "interlock".
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="btn-catalog-empty-reset"
            >
              Reset Filters &amp; View All {allProducts.length} Systems
            </button>
          </div>
        )}

        {/* Bottom Turnkey Consultation Banner */}
        <div className="catalog-cta-banner">
          <div>
            <div className="catalog-cta-label">Turnkey System Integration</div>
            <h2 className="catalog-cta-title">
              Need Custom Technical Sizing or Project BOQ?
            </h2>
            <p className="catalog-cta-desc">
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
