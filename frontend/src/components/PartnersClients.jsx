import React from 'react';
import { ArrowRight, Sparkles, Building2, ShieldCheck } from 'lucide-react';

export default function PartnersClients({ onViewAllClients, onNavigate }) {
  // 18 prestigious clients with verified logos and vector badges
  const clientList = [
    {
      name: 'Reliance',
      type: 'vector',
      render: () => (
        <div className="client-brand-flex">
          <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" fill="#F59E0B" />
            <circle cx="50" cy="50" r="28" fill="#1E3A8A" />
            <polygon points="50,15 58,38 82,38 63,52 70,75 50,60 30,75 37,52 18,38 42,38" fill="#FFFFFF" />
          </svg>
          <span className="client-text-reliance">Reliance</span>
        </div>
      )
    },
    {
      name: 'TATA',
      type: 'vector',
      render: () => (
        <div className="client-brand-flex">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="#0284C7" strokeWidth="8" fill="none" />
            <path d="M28 36 H72 M50 36 V72" stroke="#0284C7" strokeWidth="9" strokeLinecap="round" />
          </svg>
          <span className="client-text-tata">TATA</span>
        </div>
      )
    },
    {
      name: 'Adani',
      type: 'vector',
      render: () => (
        <span className="client-text-adani">adani</span>
      )
    },
    {
      name: 'Larsen & Toubro',
      type: 'vector',
      render: () => (
        <div className="client-brand-flex">
          <div className="lt-badge-seal">L&T</div>
          <span className="client-text-lt">LARSEN & TOUBRO</span>
        </div>
      )
    },
    {
      name: 'Godrej',
      type: 'vector',
      render: () => (
        <span className="client-text-godrej">Godrej</span>
      )
    },
    {
      name: 'Mahindra',
      type: 'vector',
      render: () => (
        <div className="client-brand-flex">
          <svg width="18" height="14" viewBox="0 0 40 30" fill="none">
            <path d="M4 26 L16 4 L22 14 L28 4 L40 26" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="client-text-mahindra">mahindra</span>
        </div>
      )
    },
    {
      name: 'Glenmark Pharmaceuticals',
      type: 'image',
      logo: '/clients/glenmark.png',
      alt: 'Glenmark'
    },
    {
      name: 'Cadila Pharmaceuticals',
      type: 'image',
      logo: '/clients/cadila.png',
      alt: 'Cadila'
    },
    {
      name: 'Alkem Laboratories',
      type: 'image',
      logo: '/clients/alkem.png',
      alt: 'Alkem'
    },
    {
      name: 'Alembic Pharmaceuticals',
      type: 'image',
      logo: '/clients/alembic.png',
      alt: 'Alembic'
    },
    {
      name: 'Indoco Remedies',
      type: 'image',
      logo: '/clients/indoco.png',
      alt: 'Indoco'
    },
    {
      name: 'Venus Remedies',
      type: 'image',
      logo: '/clients/venus.png',
      alt: 'Venus Remedies'
    },
    {
      name: 'Shreya Life Sciences',
      type: 'image',
      logo: '/clients/shreya.png',
      alt: 'Shreya'
    },
    {
      name: 'Pidilite Industries',
      type: 'image',
      logo: '/clients/pidilite.png',
      alt: 'Pidilite'
    },
    {
      name: 'Procter & Gamble (P&G)',
      type: 'image',
      logo: '/clients/pg.png',
      alt: 'P&G'
    },
    {
      name: 'Ferrero Rocher',
      type: 'image',
      logo: '/clients/ferrero.png',
      alt: 'Ferrero'
    },
    {
      name: 'IIT Bombay',
      type: 'image',
      logo: '/clients/iit-bombay.png',
      alt: 'IIT Bombay'
    },
    {
      name: 'Future Supply Chain',
      type: 'image',
      logo: '/clients/fsc.png',
      alt: 'Future Supply Chain'
    }
  ];

  // Duplicate for seamless 100% infinite loop
  const marqueeItems = [...clientList, ...clientList];

  const handleViewAll = () => {
    if (onViewAllClients) {
      onViewAllClients();
    } else if (onNavigate) {
      onNavigate('clients');
    }
  };

  return (
    <section id="esteemed-clients" className="clients-marquee-section">
      <div className="container">
        {/* Clean Header Bar */}
        <div className="clients-marquee-header">
          <div className="clients-header-left">
            <div className="pill-badge-blue">
              <Sparkles size={13} className="mr-1" />
              TRUSTED BY 500+ ENTERPRISES ACROSS INDIA
            </div>
            <h2 className="section-title-large">
              Our Esteemed <span className="title-highlight-blue">Clients</span>
            </h2>
            <p className="clients-section-desc">
              Driving mission-critical automation, cleanroom compliance & life-safety security for India's leading pharmaceutical plants, Fortune 500 corporations and logistics hubs.
            </p>
          </div>

          <button 
            className="btn-view-all-clients-pill"
            onClick={handleViewAll}
            title="Explore Full Client Case Studies"
          >
            <span>View All 100+ Clients</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Full-width Automatic Horizontal Infinite Scrolling Marquee */}
      <div className="clients-marquee-wrapper">
        {/* Left and Right Fade Edge Masks */}
        <div className="marquee-edge-fade-left"></div>
        <div className="marquee-edge-fade-right"></div>

        {/* Continuous Scrolling Track (Left to Right / Right to Left) */}
        <div className="clients-marquee-track">
          {marqueeItems.map((client, idx) => (
            <div key={idx} className="marquee-client-tile" title={client.name}>
              {client.type === 'vector' ? (
                client.render()
              ) : (
                <img 
                  src={client.logo} 
                  alt={client.alt || client.name} 
                  className="marquee-client-img"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
