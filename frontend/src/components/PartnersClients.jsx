import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PartnersClients({ partners = [], clients = [], onViewAllClients, onNavigate }) {
  const brandPartners = [
    { name: 'Honeywell', logo: '/logos/honeywell.png' },
    { name: 'BOSCH', logo: '/logos/bosch.png' },
    { name: 'metaflex', logo: '/logos/metaflex.png' },
    { name: 'CISCO', logo: '/logos/cisco.png' },
    { name: 'EATON', logo: '/logos/eaton.png' },
    { name: 'HIKVISION', logo: '/logos/hikvision.png' },
    { name: 'FAAC', logo: '/logos/faac.jpg' },
    { name: 'Revel', logo: '/logos/ravel.png' },
    { name: 'DORMA', logo: '/logos/dorma.jpg' },
    { name: 'Nice', logo: '/logos/nice.png' },
    { name: 'AVTECH', logo: '/logos/avtech.png' },
    { name: 'SIEMENS', logo: '/logos/Siemens.png' }
  ];

  return (
    <section id="partners-and-clients" className="partners-clients-row-section">
      <div className="container">
        <div className="partners-clients-grid">
          {/* Left Column: Global Technology Partners */}
          <div className="brand-panel-card">
            <div className="brand-panel-header">
              <div className="brand-header-text">
                <div className="pill-badge-blue">INTERACTIVE DEMO</div>
                <h3 className="brand-section-title">Global Technology Partners</h3>
                <p className="brand-section-desc">
                  We work with top global brands to deliver reliable and innovative solutions.
                </p>
              </div>

              <button 
                className="btn-panel-action"
                onClick={() => onNavigate && onNavigate('partners')}
              >
                <span>View All Brands</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* 12-Brand Grid (6 x 2) */}
            <div className="brand-logo-grid partners-12-grid">
              {brandPartners.map((brand, idx) => (
                <div key={idx} className="brand-tile">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="brand-tile-img"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Our Esteemed Clients */}
          <div className="brand-panel-card">
            <div className="brand-panel-header">
              <div className="brand-header-text">
                <div className="pill-badge-blue">TRUSTED BY 500+</div>
                <h3 className="brand-section-title">Our Esteemed Clients</h3>
                <p className="brand-section-desc">
                  Driving success for leading corporate, healthcare, pharmaceutical and industrial clients.
                </p>
              </div>

              <button 
                className="btn-panel-action"
                onClick={() => onViewAllClients ? onViewAllClients() : (onNavigate && onNavigate('clients'))}
              >
                <span>View All Clients</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* 8-Client Grid (4 x 2) with Fast Native SVGs Matching Screenshot */}
            <div className="brand-logo-grid clients-8-grid">
              {/* 1. Reliance */}
              <div className="brand-tile client-tile">
                <div className="client-brand-flex">
                  <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="46" fill="#F59E0B" />
                    <circle cx="50" cy="50" r="28" fill="#1E3A8A" />
                    <polygon points="50,15 58,38 82,38 63,52 70,75 50,60 30,75 37,52 18,38 42,38" fill="#FFFFFF" />
                  </svg>
                  <span className="client-text-reliance">Reliance</span>
                </div>
              </div>

              {/* 2. TATA */}
              <div className="brand-tile client-tile">
                <div className="client-brand-flex">
                  <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="46" stroke="#0284C7" strokeWidth="8" fill="none" />
                    <path d="M28 36 H72 M50 36 V72" stroke="#0284C7" strokeWidth="9" strokeLinecap="round" />
                  </svg>
                  <span className="client-text-tata">TATA</span>
                </div>
              </div>

              {/* 3. Adani */}
              <div className="brand-tile client-tile">
                <span className="client-text-adani">adani</span>
              </div>

              {/* 4. Larsen & Toubro */}
              <div className="brand-tile client-tile">
                <div className="client-brand-flex">
                  <div className="lt-badge-seal">L&T</div>
                  <span className="client-text-lt">LARSEN & TOUBRO</span>
                </div>
              </div>

              {/* 5. Godrej */}
              <div className="brand-tile client-tile">
                <span className="client-text-godrej">Godrej</span>
              </div>

              {/* 6. Mahindra */}
              <div className="brand-tile client-tile">
                <div className="client-brand-flex">
                  <svg width="18" height="14" viewBox="0 0 40 30" fill="none">
                    <path d="M4 26 L16 4 L22 14 L28 4 L40 26" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="client-text-mahindra">mahindra</span>
                </div>
              </div>

              {/* 7. Cadila */}
              <div className="brand-tile client-tile">
                <span className="client-text-cadila">Cadila</span>
              </div>

              {/* 8. Sun Pharma */}
              <div className="brand-tile client-tile">
                <div className="client-brand-flex">
                  <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="24" fill="#EA580C" />
                    <line x1="50" y1="12" x2="50" y2="2" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                    <line x1="50" y1="98" x2="50" y2="88" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                    <line x1="12" y1="50" x2="2" y2="50" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                    <line x1="98" y1="50" x2="88" y2="50" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                    <line x1="22" y1="22" x2="15" y2="15" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                    <line x1="85" y1="85" x2="78" y2="78" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                    <line x1="22" y1="78" x2="15" y2="85" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                    <line x1="85" y1="15" x2="78" y2="22" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                  <span className="client-text-sunpharma">Sun Pharma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
