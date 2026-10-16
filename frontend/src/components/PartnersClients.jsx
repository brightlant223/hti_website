import React from 'react';
import { Handshake, Building2, Shield } from 'lucide-react';

export default function PartnersClients({ partners, clients }) {
  const defaultPartners = [
    { name: 'Honeywell', category: 'Fire & Automation' },
    { name: 'BOSCH', category: 'Security & PA Systems' },
    { name: 'metaflex', category: 'Hermetic Clean Doors' },
    { name: 'CISCO', category: 'IP Telephony & Networks' },
    { name: 'EATON', category: 'Power & Life Safety' },
    { name: 'HIKVISION', category: 'CCTV & AI Surveillance' },
    { name: 'L&T', category: 'Switchgear & Automation' },
    { name: 'FAAC', category: 'Hydraulic Gate Automation' },
    { name: 'Ravel', category: 'Addressable Fire Panels' },
    { name: 'DORMA', category: 'Architectural Access Hardware' },
    { name: 'Nice', category: 'Smart Gate Automation' },
    { name: 'AVTECH', category: 'Server Room Monitoring' },
    { name: 'Johnson Controls', category: 'Building Controls & BMS' },
    { name: 'SIEMENS', category: 'Industrial Safety & Sensors' },
    { name: 'ZOLOTO', category: 'Fire Hydrant & Pipeline Valves' }
  ];

  const defaultClients = [
    { name: 'Glenmark', sector: 'Pharmaceuticals & Healthcare' },
    { name: 'Indoco Remedies', sector: 'Pharmaceuticals' },
    { name: 'Venus Remedies', sector: 'Pharmaceuticals & Injectables' },
    { name: 'Cadila Pharmaceuticals', sector: 'Pharmaceuticals' },
    { name: 'Shreya Life Sciences', sector: 'Pharmaceuticals' },
    { name: 'Pidilite', sector: 'Industrial Adhesives & Chemicals' },
    { name: 'P&G (Procter & Gamble)', sector: 'Global FMCG & Consumer Goods' },
    { name: 'Alkem Laboratories', sector: 'Pharmaceuticals' },
    { name: 'FSC (Future Supply Chain)', sector: 'Contract Logistics & Warehousing' },
    { name: 'IIT Bombay', sector: 'Premier National Research & Technology' },
    { name: 'Alembic Pharmaceuticals', sector: 'Healthcare (Touching Lives 100+ Years)' },
    { name: 'FERRERO', sector: 'Global Confectionery & Food Manufacturing' }
  ];

  const clientMetaMap = {
    'glenmark': {
      name: 'Glenmark',
      sector: 'Pharmaceuticals & Healthcare',
      logo: '/clients/glenmark.png',
      alt: 'Glenmark Pharmaceuticals authentic logo'
    },
    'indoco remedies': {
      name: 'Indoco Remedies',
      sector: 'Pharmaceuticals',
      logo: '/clients/indoco.png',
      alt: 'Indoco Remedies Limited authentic logo'
    },
    'venus remedies': {
      name: 'Venus Remedies',
      sector: 'Pharmaceuticals & Injectables',
      logo: '/clients/venus.png',
      alt: 'Venus Remedies authentic logo'
    },
    'cadila pharmaceuticals': {
      name: 'Cadila Pharmaceuticals',
      sector: 'Pharmaceuticals',
      logo: '/clients/cadila.png',
      alt: 'Cadila Pharmaceuticals Limited authentic logo'
    },
    'shreya life sciences': {
      name: 'Shreya Life Sciences',
      sector: 'Pharmaceuticals',
      logo: '/clients/shreya.png',
      alt: 'Shreya Life Sciences authentic logo'
    },
    'pidilite': {
      name: 'Pidilite',
      sector: 'Industrial Adhesives & Chemicals',
      logo: '/clients/pidilite.png',
      alt: 'Pidilite Industries authentic logo'
    },
    'p&g (procter & gamble)': {
      name: 'P&G (Procter & Gamble)',
      sector: 'Global FMCG & Consumer Goods',
      logo: '/clients/pg.png',
      alt: 'Procter & Gamble (P&G) authentic logo'
    },
    'p&g': {
      name: 'P&G (Procter & Gamble)',
      sector: 'Global FMCG & Consumer Goods',
      logo: '/clients/pg.png',
      alt: 'Procter & Gamble (P&G) authentic logo'
    },
    'alkem laboratories': {
      name: 'Alkem Laboratories',
      sector: 'Pharmaceuticals',
      logo: '/clients/alkem.png',
      alt: 'Alkem Laboratories authentic logo'
    },
    'fsc (future supply chain)': {
      name: 'FSC (Future Supply Chain)',
      sector: 'Contract Logistics & Warehousing',
      logo: '/clients/fsc.png',
      alt: 'FSC (Future Supply Chain) authentic logo'
    },
    'fsc': {
      name: 'FSC (Future Supply Chain)',
      sector: 'Contract Logistics & Warehousing',
      logo: '/clients/fsc.png',
      alt: 'FSC (Future Supply Chain) authentic logo'
    },
    'iit bombay': {
      name: 'IIT Bombay',
      sector: 'Premier National Research & Technology',
      logo: '/clients/iit-bombay.png',
      alt: 'IIT Bombay authentic seal logo'
    },
    'alembic pharmaceuticals': {
      name: 'Alembic Pharmaceuticals',
      sector: 'Healthcare (Touching Lives 100+ Years)',
      logo: '/clients/alembic.png',
      alt: 'Alembic Pharmaceuticals authentic logo'
    },
    'ferrero': {
      name: 'Ferrero',
      sector: 'Global Confectionery & Food Manufacturing',
      logo: '/clients/ferrero.png',
      alt: 'Ferrero authentic logo'
    }
  };

  const canonicalClients = [
    { name: 'Glenmark', sector: 'Pharmaceuticals & Healthcare', logo: '/clients/glenmark.png', alt: 'Glenmark Pharmaceuticals authentic logo' },
    { name: 'Indoco Remedies', sector: 'Pharmaceuticals', logo: '/clients/indoco.png', alt: 'Indoco Remedies Limited authentic logo' },
    { name: 'Venus Remedies', sector: 'Pharmaceuticals & Injectables', logo: '/clients/venus.png', alt: 'Venus Remedies authentic logo' },
    { name: 'Cadila Pharmaceuticals', sector: 'Pharmaceuticals', logo: '/clients/cadila.png', alt: 'Cadila Pharmaceuticals Limited authentic logo' },
    { name: 'Shreya Life Sciences', sector: 'Pharmaceuticals', logo: '/clients/shreya.png', alt: 'Shreya Life Sciences authentic logo' },
    { name: 'Pidilite', sector: 'Industrial Adhesives & Chemicals', logo: '/clients/pidilite.png', alt: 'Pidilite Industries authentic logo' },
    { name: 'P&G (Procter & Gamble)', sector: 'Global FMCG & Consumer Goods', logo: '/clients/pg.png', alt: 'Procter & Gamble (P&G) authentic logo' },
    { name: 'Alkem Laboratories', sector: 'Pharmaceuticals', logo: '/clients/alkem.png', alt: 'Alkem Laboratories authentic logo' },
    { name: 'FSC (Future Supply Chain)', sector: 'Contract Logistics & Warehousing', logo: '/clients/fsc.png', alt: 'FSC (Future Supply Chain) authentic logo' },
    { name: 'IIT Bombay', sector: 'Premier National Research & Technology', logo: '/clients/iit-bombay.png', alt: 'IIT Bombay authentic seal logo' },
    { name: 'Alembic Pharmaceuticals', sector: 'Healthcare (Touching Lives 100+ Years)', logo: '/clients/alembic.png', alt: 'Alembic Pharmaceuticals authentic logo' },
    { name: 'Ferrero', sector: 'Global Confectionery & Food Manufacturing', logo: '/clients/ferrero.png', alt: 'Ferrero authentic logo' }
  ];

  const partnerLogos = {
    Honeywell: '/logos/honeywell.png',
    Bosch: '/logos/bosch.png',
    Metaflex: '/logos/metaflex.png',
    Cisco: '/logos/cisco.png',
    Eaton: '/logos/eaton.png',
    Hikvision: '/logos/hikvision.png',
    'L&T': '/logos/lt.png',
    FAAC: '/logos/faac.jpg',
    Ravel: '/logos/ravel.png',
    Dorma: '/logos/dorma.jpg',
    Nice: '/logos/nice.png',
    Avtech: '/logos/avtech.png',
    'Johnson Controls': '/logos/johnson-controls.png',
    Siemens: '/logos/siemens.png',
    'Zoloto Valves': '/logos/zoloto.jpg'
  };

  const displayPartners =
    partners && partners.length > 0 ? partners : defaultPartners;

  const displayClients =
    clients && clients.length > 0 ? clients : defaultClients;

  return (
    <section id="partners" className="section partners-clients-section">
      <div className="container">
        {/* Technology Partners */}
        <div className="partners-block">
          <div className="section-title-wrap">
            <div className="section-tag">
              <Handshake size={14} />
              <span>Authorized Integration Ecosystem</span>
            </div>

            <h2 className="section-heading">
              Global Technology <span className="gradient-text-red">Partners</span>
            </h2>

            <p className="section-desc">
              We engineer our systems utilizing field-tested hardware and certified components from the world's premier automation, safety, and surveillance innovators.
            </p>
          </div>

          <div className="partners-grid">
            {displayPartners.map((p, idx) => {
              const logo = partnerLogos[p.name];

              return (
                <div key={idx} className="glass-card partner-card">
                  <div className="partner-name">
                    {logo ? (
                      <img
                        src={logo}
                        alt={`${p.name} logo`}
                        style={{
                          width: '100%',
                          maxWidth: '180px',
                          height: '60px',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'block';
                        }}
                      />
                    ) : null}

                    <span style={{ display: logo ? 'none' : 'block' }}>
                      {p.name}
                    </span>

                    {logo && (
                      <span style={{ display: 'none' }}>
                        {p.name}
                      </span>
                    )}
                  </div>

                  <div className="partner-cat">
                    {p.category || 'Technology Partner'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <span className="text-muted text-sm italic">
              And many more top-notch international equipment brands...
            </span>
          </div>
        </div>

        {/* Client Segment */}
        <div id="clients" className="clients-block mt-24">
          <div className="section-title-wrap">
            <div className="section-tag">
              <Building2 size={14} />
              <span>Proven Track Record</span>
            </div>

            <h2 className="section-heading">
              Our Esteemed <span className="gradient-text-cyan">Client Segment</span>
            </h2>

            <p className="section-desc">
              Trusted by multinational pharmaceutical formulation hubs, FMCG manufacturing facilities, and premier institutions across India.
            </p>
          </div>

          {/* White/Light-Gray Client Gallery Matching Image 2 */}
          <div className="client-gallery-container">
            {/* Prominent speech-bubble heading from Image 2 */}
            <div className="client-segment-speech-wrap">
              <div className="client-segment-bubble">
                <h2 className="client-segment-heading">Our Client Segment...</h2>
                <div className="bubble-tail" aria-hidden="true"></div>
              </div>
            </div>


            {/* Responsive 4-column authentic logo grid */}
            <div className="client-logo-gallery-grid">
              {displayClients.map((client, idx) => (
                <div key={idx} className="client-gallery-card">
                  <div className="client-logo-box">
                    <img
                      src={client.logo}
                      alt={client.alt || `${client.name} logo`}
                      className="client-logo-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="client-meta-box">
                    <h4 className="client-name-title">{client.name}</h4>
                    {client.sector && (
                      <span className="client-sector-text">{client.sector}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Trust Banner */}
          <div className="client-trust-banner glass-card mt-12">
            <div className="trust-icon-box">
              <Shield size={28} className="text-cyan" />
            </div>

            <div className="trust-text-box">
              <h4>Zero-Tolerance Quality for Regulated Facilities</h4>
              <p>
                From cleanroom door interlocking in sterile pharmaceutical environments to turnkey fire hydrant installations, satisfied clients are our greatest testament.
              </p>
            </div>

            <div className="trust-badge">
              <span className="badge-pill badge-emerald">
                100% Audit Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
