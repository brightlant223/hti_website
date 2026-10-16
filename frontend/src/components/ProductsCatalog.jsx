import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpRight, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ProductsCatalog({
  products,
  loading,
  selectedCategory,
  onCategoryChange,
  onSelectProduct,
  onQuickQuote
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const categories = [
    { id: 'All', label: 'All Products', count: products.length },
    { id: 'Automation', label: 'Automation', count: products.filter(p => p.category === 'Automation').length },
    { id: 'Security System', label: 'Security Systems', count: products.filter(p => p.category === 'Security System').length },
    { id: 'Hygiene', label: 'Hygiene Solutions', count: products.filter(p => p.category === 'Hygiene').length }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.tagline && p.tagline.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFeatured = !featuredOnly || p.is_featured;

      return matchesCategory && matchesSearch && matchesFeatured;
    });
  }, [products, selectedCategory, searchTerm, featuredOnly]);

  return (
    <section id="catalog" className="section catalog-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-tag">
            <SlidersHorizontal size={14} />
            <span>Comprehensive Engineering Portfolio</span>
          </div>
          <h2 className="section-heading">
            Commercial & Industrial <span className="gradient-text-cyan">Product Catalog</span>
          </h2>
          <p className="section-desc">
            Explore our complete range of certified systems across automation, perimeter control, fire fighting, life safety, and cleanroom hygiene.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="catalog-toolbar glass-card">
          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab-btn ${selectedCategory === cat.id ? 'tab-active' : ''}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="tab-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Search & Toggle Box */}
          <div className="search-filter-box">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search products, keywords, or specifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  ×
                </button>
              )}
            </div>

            <button
              className={`featured-filter-btn ${featuredOnly ? 'active' : ''}`}
              onClick={() => setFeaturedOnly(!featuredOnly)}
              title="Show only featured showcase items"
            >
              <Sparkles size={14} />
              <span>Featured Only</span>
            </button>
          </div>
        </div>

        {/* Catalog Result Counter */}
        <div className="catalog-status-bar">
          <span className="showing-text">
            Showing <strong className="text-white">{filteredProducts.length}</strong> systems in{' '}
            <strong className="text-cyan">{selectedCategory}</strong>
          </span>
          {searchTerm && (
            <span className="search-tag-pill">
              Filtered by: "{searchTerm}"
              <button onClick={() => setSearchTerm('')}>×</button>
            </span>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="loading-grid">
            <div className="loading-spinner"></div>
            <p>Loading certified technical catalog from SQLite database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-catalog glass-card">
            <Filter size={40} className="text-dim" />
            <h3>No products found</h3>
            <p>We couldn't find any products matching your current search or category filter.</p>
            <button
              className="btn-secondary"
              onClick={() => {
                setSearchTerm('');
                onCategoryChange('All');
                setFeaturedOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const categoryColorClass =
                product.category === 'Automation'
                  ? 'badge-red'
                  : product.category === 'Hygiene'
                  ? 'badge-emerald'
                  : 'badge-cyan';

              return (
                <div key={product.id} className="glass-card product-card">
                  <div className="product-card-top">
                    <span className={`badge-pill ${categoryColorClass}`}>
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="badge-pill badge-amber">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="product-subcat">{product.subcategory}</div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-tagline">{product.tagline}</p>
                  <p className="product-description">{product.description}</p>

                  {/* Highlights */}
                  {product.features && product.features.length > 0 && (
                    <div className="product-features-preview">
                      {product.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="feature-mini-item">
                          <CheckCircle2 size={13} className="text-cyan flex-shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="product-card-footer">
                    <button
                      className="btn-specs"
                      onClick={() => onSelectProduct(product)}
                      title="View complete technical specs and applications"
                    >
                      <span>Full Technical Specs</span>
                      <ArrowUpRight size={14} />
                    </button>
                    <button
                      className="btn-card-quote"
                      onClick={() => onQuickQuote(product.name, product.category)}
                    >
                      Inquire Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
