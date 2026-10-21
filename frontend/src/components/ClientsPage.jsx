import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Factory, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Home,
  Search,
  CheckCircle2,
  Building2,
  Sparkles,
  PhoneCall,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { clientsData } from '../data/clientsData';

const categories = [
  { id: 'all', label: 'All Clients' },
  { id: 'pharma', label: 'Pharma & Healthcare' },
  { id: 'fmcg', label: 'FMCG & Food' },
  { id: 'industrial', label: 'Industrial & Chemicals' },
  { id: 'logistics', label: 'Logistics & Supply Chain' },
  { id: 'research', label: 'Research & Academics' }
];

export default function ClientsPage({ onNavigate, onQuoteClick, onExploreCatalog }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick();
    } else if (onNavigate) {
      onNavigate('home', 'contact');
    }
  };

  const handleCatalogClick = () => {
    if (onExploreCatalog) {
      onExploreCatalog();
    } else if (onNavigate) {
      onNavigate('home', 'catalog');
    }
  };

  // Filter clients based on category and search query
  const filteredClients = useMemo(() => {
    return clientsData.filter((client) => {
      const matchesCategory = selectedCategory === 'all' || client.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        client.name.toLowerCase().includes(q) || 
        client.sector.toLowerCase().includes(q) || 
        (client.solution && client.solution.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { all: clientsData.length };
    categories.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = clientsData.filter(c => c.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="clients-page-modern">
      {/* 1. Breadcrumb Bar */}
      <div className="clients-breadcrumb-container">
        <div className="container">
          <nav className="clients-breadcrumb-nav" aria-label="Breadcrumb">
            <button 
              className="clients-breadcrumb-link" 
              onClick={() => onNavigate && onNavigate('home', 'hero')}
            >
              <Home size={13} className="breadcrumb-home-icon" />
              <span>Home</span>
            </button>
            <ChevronRight size={13} className="clients-breadcrumb-divider" />
            <span className="clients-breadcrumb-active" aria-current="page">
              Clients
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="clients-hero-section">
        <div className="clients-hero-glow-bg"></div>
        <div className="container clients-hero-content text-center">
          <div className="clients-badge-pill">
            <Sparkles size={13} className="badge-sparkle-icon" />
            <span>TRUSTED BY 450+ CORPORATE ENTERPRISES</span>
          </div>

          <h1 className="clients-hero-title">
            Our Esteemed <span className="title-gradient-accent">Corporate Clients</span>
          </h1>

          <p className="clients-hero-subtitle">
            Partnering with leading pharmaceutical plants, FMCG giants, high-tech research institutions, 
            and manufacturing leaders to engineer precision automation and security infrastructure.
          </p>

          {/* 4 Key Stat Badges */}
          <div className="clients-stats-grid">
            <div className="clients-stat-card">
              <div className="stat-card-icon-wrap icon-blue">
                <Building2 size={20} />
              </div>
              <div className="stat-card-text">
                <div className="stat-card-num">450+</div>
                <div className="stat-card-label">Enterprise Sites</div>
              </div>
            </div>

            <div className="clients-stat-card">
              <div className="stat-card-icon-wrap icon-sky">
                <Factory size={20} />
              </div>
              <div className="stat-card-text">
                <div className="stat-card-num">4+</div>
                <div className="stat-card-label">Core Industries</div>
              </div>
            </div>

            <div className="clients-stat-card">
              <div className="stat-card-icon-wrap icon-indigo">
                <Globe size={20} />
              </div>
              <div className="stat-card-text">
                <div className="stat-card-num">Pan-India</div>
                <div className="stat-card-label">Execution Footprint</div>
              </div>
            </div>

            <div className="clients-stat-card">
              <div className="stat-card-icon-wrap icon-emerald">
                <ShieldCheck size={20} />
              </div>
              <div className="stat-card-text">
                <div className="stat-card-num">99.8%</div>
                <div className="stat-card-label">Uptime SLA Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Controls & Filter Bar */}
      <section className="clients-filter-section">
        <div className="container">
          <div className="clients-filter-bar">
            {/* Category Pills */}
            <div className="clients-category-tabs" role="tablist">
              {categories.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`clients-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <span className="clients-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Search Box */}
            <div className="clients-search-box">
              <Search size={16} className="search-box-icon" />
              <label className="sr-only" htmlFor="clients-search-input">Search clients or sector</label>
                <input
                type="text"
                id="clients-search-input"
                placeholder="Search clients or sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="clients-search-input"
              />
              {searchQuery && (
                <button 
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Client Cards Grid */}
      <section className="clients-showcase-section">
        <div className="container">
          {filteredClients.length === 0 ? (
            <div className="clients-empty-state">
              <Building2 size={40} className="empty-state-icon" />
              <h3>No matching clients found</h3>
              <p>Try clearing your search query or selecting a different category.</p>
              <button 
                className="clients-reset-btn"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="clients-modern-grid">
              {filteredClients.map((client) => {
                return (
                  <div key={client.id} className="client-modern-card">
                    {/* Top Row: Sector Badge & Number */}
                    <div className="client-card-header">
                      <span className="client-sector-tag">
                        {client.tag || client.sector}
                      </span>
                      <span className="client-index-pill">
                        #{client.num}
                      </span>
                    </div>

                    {/* Logo Box Container */}
                    <div className="client-logo-stage">
                      <img
                        src={client.logo}
                        alt={client.alt}
                        className="client-logo-media"
                        loading="lazy"
                      />
                    </div>

                    {/* Info Area */}
                    <div className="client-card-body">
                      <h3 className="client-brand-name">{client.name}</h3>
                      <p className="client-sector-title">{client.sector}</p>
                      
                      {/* Solution Deployed Badge */}
                      {client.solution && (
                        <div className="client-solution-badge">
                          <CheckCircle2 size={13} className="solution-check-icon" />
                          <span>{client.solution}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="client-card-footer">
                      <span className="client-verified-label">
                        <ShieldCheck size={13} className="verified-icon" />
                        Verified Enterprise Partner
                      </span>
                      <div className="client-hover-arrow">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 5. Why Leaders Trust HTI Strip */}
      <section className="clients-trust-section">
        <div className="container">
          <div className="trust-section-header text-center">
            <span className="trust-tag">ENTERPRISE STANDARDS</span>
            <h2 className="trust-heading">Why Industry Leaders Rely on HTI</h2>
            <p className="trust-subtitle">
              Delivering specialized engineering and statutory compliance required by regulated industries.
            </p>
          </div>

          <div className="trust-cards-grid">
            <div className="trust-card">
              <div className="trust-icon-box trust-icon-blue">
                <Award size={22} />
              </div>
              <h3>USFDA 21 CFR Part 11</h3>
              <p>Airlock interlocking controllers engineered with electronic audit trail compliance for sterile pharma cleanrooms.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box trust-icon-cyan">
                <Layers size={22} />
              </div>
              <h3>Turnkey Responsibility</h3>
              <p>Complete single-source execution from Mumbai site survey and GA fabrication to electrical cabling and statutory sign-offs.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box trust-icon-indigo">
                <Clock size={22} />
              </div>
              <h3>24/7 SLA Continuity</h3>
              <p>Dedicated resident engineers and guaranteed spare parts availability ensure continuous zero-downtime operation.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box trust-icon-emerald">
                <ShieldCheck size={22} />
              </div>
              <h3>Statutory Fire & Safety</h3>
              <p>Compliant with NBC 2016 Part 4, PESO/ATEX flameproof directives, and IS 3614 certified fire barrier ratings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Modern CTA Section ("Become Our Next Success Story") */}
      <section className="clients-modern-cta-section">
        <div className="container">
          <div className="clients-cta-card">
            <div className="cta-card-content">
              <div className="cta-pill-tag">
                <Sparkles size={13} />
                <span>LET'S BUILD A SAFER & SMARTER TOMORROW</span>
              </div>
              <h2 className="cta-title">
                Become Our Next <span className="cta-title-accent">Success Story</span>
              </h2>
              <p className="cta-description">
                Join 450+ leading pharmaceutical, industrial, and commercial enterprises who trust 
                HTI Automation for precision engineering, statutory compliance, and zero-downtime performance.
              </p>
              <div className="cta-actions-flex">
                <button 
                  className="cta-primary-btn"
                  onClick={handleQuoteClick}
                >
                  <span>Request Technical Consultation</span>
                  <ArrowRight size={16} />
                </button>
                <button 
                  className="cta-secondary-btn"
                  onClick={handleCatalogClick}
                >
                  <span>Explore Product Catalog</span>
                </button>
              </div>
            </div>

            <div className="cta-card-highlight">
              <div className="cta-contact-direct-box">
                <div className="direct-box-icon">
                  <PhoneCall size={22} />
                </div>
                <div>
                  <div className="direct-box-label">Direct Engineering Support</div>
                  <a href="tel:+919992756077" className="direct-box-tel">
                    +91 99927 56077
                  </a>
                </div>
              </div>
              <div className="cta-trust-checklist">
                <div className="trust-check-item">
                  <CheckCircle2 size={16} className="check-green" />
                  <span>Free PAN-India Site Survey & GA Drawings</span>
                </div>
                <div className="trust-check-item">
                  <CheckCircle2 size={16} className="check-green" />
                  <span>Custom OEM Fabrication & Sensor Calibration</span>
                </div>
                <div className="trust-check-item">
                  <CheckCircle2 size={16} className="check-green" />
                  <span>ISO 9001:2015 & NBC 2016 Certified Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
