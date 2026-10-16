import React from 'react';
import { 
  Users, 
  Factory, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Home 
} from 'lucide-react';
import { clientsData } from '../data/clientsData';

export default function ClientsPage({ onNavigate, onQuoteClick }) {
  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick();
    } else if (onNavigate) {
      onNavigate('home', 'contact');
    }
  };

  return (
    <div className="clients-page-dark">
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

      {/* 2. Hero Section with Industrial Background */}
      <section className="clients-dark-hero">
        <div className="clients-hero-overlay"></div>
        <div className="clients-hero-laser laser-red-1"></div>
        <div className="clients-hero-laser laser-cyan-1"></div>
        <div className="clients-hero-laser laser-cyan-2"></div>

        <div className="container clients-hero-content text-center">
          <h1 className="clients-dark-title">
            Our Esteemed <span className="clients-title-cyan">Clients</span>
          </h1>

          <p className="clients-dark-subtitle">
            Collaborating with leading organizations to deliver automation, safety and cleanroom solutions across industries.
          </p>

          {/* 3. Four Horizontally Aligned Statistics */}
          <div className="clients-stats-strip">
            {/* Stat 1: 12+ Happy Clients */}
            <div className="clients-stat-capsule">
              <div className="stat-icon-disc disc-red">
                <Users size={18} className="text-white" />
              </div>
              <div className="stat-text-group">
                <div className="stat-primary-num text-red">12+</div>
                <div className="stat-secondary-label">Happy Clients</div>
              </div>
            </div>

            {/* Stat 2: 4+ Industries Served */}
            <div className="clients-stat-capsule">
              <div className="stat-icon-disc disc-cyan">
                <Factory size={18} className="text-white" />
              </div>
              <div className="stat-text-group">
                <div className="stat-primary-num text-cyan">4+</div>
                <div className="stat-secondary-label">Industries Served</div>
              </div>
            </div>

            {/* Stat 3: Global Presence */}
            <div className="clients-stat-capsule">
              <div className="stat-icon-disc disc-blue">
                <Globe size={18} className="text-white" />
              </div>
              <div className="stat-text-group">
                <div className="stat-primary-num text-cyan-glow">Global</div>
                <div className="stat-secondary-label">Presence</div>
              </div>
            </div>

            {/* Stat 4: Proven Track Record */}
            <div className="clients-stat-capsule">
              <div className="stat-icon-disc disc-red">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <div className="stat-text-group">
                <div className="stat-primary-num text-white">Proven</div>
                <div className="stat-secondary-label">Track Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Client Logo Cards Grid (4 columns × 3 rows) */}
      <section className="clients-cards-section">
        <div className="container">
          <div className="clients-dark-grid">
            {clientsData.map((client) => {
              const isRed = client.theme === 'red';
              return (
                <div 
                  key={client.id}
                  className={`client-dark-card ${isRed ? 'card-theme-red' : 'card-theme-cyan'}`}
                >
                  {/* Top Bar inside Card: Number Badge, Logo Container, Arrow Icon */}
                  <div className="client-card-topbar">
                    {/* Number Badge */}
                    <span className={`client-card-badge ${isRed ? 'badge-red' : 'badge-cyan'}`}>
                      {client.num}
                    </span>

                    {/* Clean White Logo Container */}
                    <div className="client-white-logo-box">
                      <img
                        src={client.logo}
                        alt={client.alt}
                        className="client-card-logo-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Circular Arrow Button */}
                    <div className={`client-card-arrow-circle ${isRed ? 'arrow-disc-red' : 'arrow-disc-cyan'}`}>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  {/* Bottom Meta inside Card: Name & Industry */}
                  <div className="client-card-meta">
                    <h3 className="client-card-company-name">{client.name}</h3>
                    <p className="client-card-industry-label">{client.sector}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA Section ("Become Our Next Success Story") */}
      <section className="clients-bottom-cta-section">
        <div className="cta-backdrop-overlay"></div>
        <div className="cta-laser-beam laser-beam-cyan"></div>
        <div className="cta-laser-beam laser-beam-red"></div>

        <div className="container cta-section-inner">
          <div className="cta-content-left">
            {/* Tag line with 3 red bars */}
            <div className="cta-accent-badge">
              <div className="cta-red-bars">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="cta-tag-text">LET'S BUILD A SAFER & SMARTER TOMORROW</span>
              <div className="cta-tag-divider"></div>
            </div>

            {/* Heading */}
            <h2 className="cta-main-heading">
              Become Our Next <br />
              <span className="cta-heading-cyan">Success Story</span>
            </h2>

            {/* Supporting text */}
            <p className="cta-sub-description">
              Join leading organizations who trust HTI Automation for their automation, safety and cleanroom requirements.
            </p>

            {/* Red Action Button */}
            <button 
              className="cta-red-button"
              onClick={handleQuoteClick}
            >
              <span>Request a Quote</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Side Compact Statistics Row */}
          <div className="cta-stats-right">
            {/* Stat 1: 12+ Leading Clients */}
            <div className="cta-mini-stat">
              <div className="cta-stat-circle circle-red">
                <Users size={20} className="text-white" />
              </div>
              <div className="cta-stat-info">
                <div className="cta-stat-val">12+</div>
                <div className="cta-stat-lbl">Leading Clients</div>
              </div>
            </div>

            {/* Stat 2: 4+ Industries */}
            <div className="cta-mini-stat">
              <div className="cta-stat-circle circle-cyan">
                <Factory size={20} className="text-white" />
              </div>
              <div className="cta-stat-info">
                <div className="cta-stat-val">4+</div>
                <div className="cta-stat-lbl">Industries</div>
              </div>
            </div>

            {/* Stat 3: Global Presence */}
            <div className="cta-mini-stat">
              <div className="cta-stat-circle circle-blue">
                <Globe size={20} className="text-white" />
              </div>
              <div className="cta-stat-info">
                <div className="cta-stat-val">Global</div>
                <div className="cta-stat-lbl">Presence</div>
              </div>
            </div>

            {/* Stat 4: Proven Track Record */}
            <div className="cta-mini-stat">
              <div className="cta-stat-circle circle-red">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div className="cta-stat-info">
                <div className="cta-stat-val">Proven</div>
                <div className="cta-stat-lbl">Track Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
