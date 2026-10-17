import React, { useState } from 'react';
import { ArrowRight, Check, Zap, Shield, Droplets, Flame, Wind, Layers } from 'lucide-react';

const categoryMeta = {
  'All Products':        { icon: Layers,  gradient: 'linear-gradient(135deg,#1e3a5f,#0f172a)', accent: '#38bdf8', glow: 'rgba(56,189,248,0.25)' },
  'Automation':          { icon: Zap,     gradient: 'linear-gradient(135deg,#1a3a6b,#0f2952)', accent: '#60a5fa', glow: 'rgba(96,165,250,0.25)' },
  'Security Systems':    { icon: Shield,  gradient: 'linear-gradient(135deg,#1a2d5a,#0c1f42)', accent: '#818cf8', glow: 'rgba(129,140,248,0.25)' },
  'Hygiene Solutions':   { icon: Droplets,gradient: 'linear-gradient(135deg,#064e3b,#022c22)', accent: '#34d399', glow: 'rgba(52,211,153,0.25)' },
  'Fire & Life Safety':  { icon: Flame,   gradient: 'linear-gradient(135deg,#7c1d1d,#450a0a)', accent: '#f87171', glow: 'rgba(248,113,113,0.25)' },
  'Cleanroom Solutions': { icon: Wind,    gradient: 'linear-gradient(135deg,#312e81,#1e1b4b)', accent: '#c084fc', glow: 'rgba(192,132,252,0.25)' },
};

const filterTabs = [
  'All Products',
  'Automation',
  'Security Systems',
  'Hygiene Solutions',
  'Fire & Life Safety',
  'Cleanroom Solutions'
];

const referenceProducts = [
  {
    id: 'prod-1',
    slug: 'automatic-sliding-swing-doors',
    name: 'Automatic Sliding Door',
    category: 'Automation',
    tag: 'Automation',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    bullets: ['Sensor Operated', 'Commercial & Industrial', 'Safe & Reliable'],
  },
  {
    id: 'prod-2',
    slug: 'cctv-surveillance-analogue-ip',
    name: 'CCTV Surveillance',
    category: 'Security Systems',
    tag: 'Security',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    bullets: ['HD & IP Cameras', 'Remote Monitoring', 'Indoor & Outdoor'],
  },
  {
    id: 'prod-3',
    slug: 'biometric-access-control-time-attendance',
    name: 'Access Control System',
    category: 'Security Systems',
    tag: 'Security',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
    bullets: ['Biometric & RFID', 'Time Attendance', 'Secure Entry'],
  },
  {
    id: 'prod-4',
    slug: 'fire-alarm-system-conventional-addressable',
    name: 'Fire Alarm System',
    category: 'Fire & Life Safety',
    tag: 'Fire Safety',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
    bullets: ['Conventional & Addressable', 'Detectors & Panels', 'Full FAS Solution'],
  },
  {
    id: 'prod-5',
    slug: 'cleanroom-door-interlock',
    name: 'Cleanroom Door Interlock',
    category: 'Cleanroom Solutions',
    tag: 'Cleanroom',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    bullets: ['Pharma Grade', 'ISO Class Compliant', 'Contamination Control'],
  },
];

export default function ProductsCatalog({
  products = [],
  loading = false,
  selectedCategory = 'All Products',
  onCategoryChange,
  onSelectProduct,
  onQuickQuote
}) {
  const [activeTab, setActiveTab] = useState('All Products');
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onCategoryChange) {
      if (tab === 'All Products') onCategoryChange('All');
      else if (tab === 'Security Systems') onCategoryChange('Security System');
      else if (tab === 'Hygiene Solutions') onCategoryChange('Hygiene');
      else onCategoryChange(tab);
    }
  };

  const displayedProducts = activeTab === 'All Products'
    ? referenceProducts
    : referenceProducts.filter(p => {
        if (activeTab === 'Automation') return p.category === 'Automation';
        if (activeTab === 'Security Systems') return p.category === 'Security Systems';
        if (activeTab === 'Hygiene Solutions') return p.category === 'Hygiene Solutions';
        if (activeTab === 'Fire & Life Safety') return p.category === 'Fire & Life Safety';
        if (activeTab === 'Cleanroom Solutions') return p.category === 'Cleanroom Solutions';
        return true;
      });

  const meta = categoryMeta[activeTab] || categoryMeta['All Products'];

  return (
    <section id="catalog" className="catalog-section">
      {/* Decorative background blobs */}
      <div className="catalog-bg-blob blob-1" />
      <div className="catalog-bg-blob blob-2" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="catalog-header-row">
          <div className="catalog-header-left">
            <div className="pill-badge-catalog">
              <Layers size={12} style={{ marginRight: 5 }} />
              COMPLETE RANGE
            </div>
            <h2 className="catalog-section-title">
              Commercial &amp; Industrial{' '}
              <span className="catalog-title-highlight">Product Catalog</span>
            </h2>
            <p className="catalog-subtitle">
              Explore our comprehensive range of automation, security &amp; hygiene solutions built for modern enterprises.
            </p>
          </div>
          <div className="catalog-header-right">
            <button
              className="btn-view-all-products"
              onClick={() => onCategoryChange && onCategoryChange('All')}
            >
              <span>View All Products</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="catalog-filter-bar">
          {filterTabs.map((tab) => {
            const Icon = categoryMeta[tab].icon;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                className={`filter-pill-btn ${isActive ? 'pill-active' : ''}`}
                onClick={() => handleTabClick(tab)}
                style={isActive ? {
                  background: categoryMeta[tab].gradient,
                  borderColor: 'transparent',
                  color: '#fff',
                  boxShadow: `0 4px 16px ${categoryMeta[tab].glow}`,
                } : {}}
              >
                <Icon size={13} style={{ flexShrink: 0 }} />
                {tab}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="catalog-products-grid">
          {displayedProducts.map((prod) => {
            const cardMeta = categoryMeta[prod.category] || categoryMeta['All Products'];
            const isHovered = hoveredCard === prod.id;
            return (
              <div
                key={prod.id}
                className="catalog-product-card"
                onMouseEnter={() => setHoveredCard(prod.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={isHovered ? {
                  '--card-accent': cardMeta.accent,
                  '--card-glow': cardMeta.glow,
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: `0 24px 48px ${cardMeta.glow}, 0 0 0 1.5px ${cardMeta.accent}40`,
                } : { '--card-accent': cardMeta.accent, '--card-glow': cardMeta.glow }}
              >
                {/* Image with overlay gradient */}
                <div className="product-thumb-wrap">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="product-thumb-img"
                    loading="lazy"
                  />
                  <div className="product-thumb-overlay"
                    style={{ background: `linear-gradient(to top, ${cardMeta.accent}40 0%, transparent 60%)` }}
                  />
                  {/* Category Badge */}
                  <div className="product-category-badge"
                    style={{ background: cardMeta.gradient, color: '#fff', boxShadow: `0 2px 8px ${cardMeta.glow}` }}
                  >
                    {prod.tag}
                  </div>
                </div>

                {/* Card Body */}
                <div className="product-card-body">
                  {/* Glowing accent line */}
                  <div className="product-accent-bar"
                    style={{ background: `linear-gradient(90deg, ${cardMeta.accent}, transparent)` }}
                  />

                  <h4 className="product-card-name">{prod.name}</h4>

                  <ul className="product-card-bullets">
                    {prod.bullets.map((bullet, idx) => (
                      <li key={idx} className="product-bullet-item">
                        <div className="bullet-check-circle"
                          style={{ background: `${cardMeta.accent}20`, color: cardMeta.accent }}
                        >
                          <Check size={10} />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn-product-details"
                    style={{
                      background: isHovered ? cardMeta.gradient : 'transparent',
                      borderColor: cardMeta.accent,
                      color: isHovered ? '#fff' : cardMeta.accent,
                    }}
                    onClick={() => {
                      const match = products.find(p => p.slug === prod.slug || p.name.toLowerCase().includes(prod.name.toLowerCase()));
                      if (onSelectProduct && match) onSelectProduct(match);
                      else if (onQuickQuote) onQuickQuote(prod.name, prod.category);
                    }}
                  >
                    <span>View Details</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="catalog-cta-banner">
          <div className="catalog-cta-content">
            <p className="catalog-cta-label">Need a custom solution?</p>
            <h3 className="catalog-cta-title">Get a Free Technical Consultation</h3>
          </div>
          <button
            className="catalog-cta-btn"
            onClick={() => onCategoryChange && onCategoryChange('All')}
          >
            Explore Full Catalog
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
