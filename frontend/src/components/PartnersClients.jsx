import React from 'react';
import { Handshake, Building2, Shield, ArrowRight } from 'lucide-react';
import { clientsData } from '../data/clientsData';

export default function PartnersClients({ partners, clients, onViewAllClients }) {
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

  const displayPartners = partners && partners.length > 0 ? partners : defaultPartners;

  // Format clients ensuring authentic logos and names from Image 2
  const displayClients = clientsData.map(canon => {
    if (clients && clients.length > 0) {
      const match = clients.find(c => (c.name || '').trim().toLowerCase() === canon.name.toLowerCase());
      if (match) {
        return {
          ...canon,
          sector: match.sector || canon.sector
        };
      }
    }
    return canon;
  });

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
                          if (e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.style.display = 'block';
                          }
                        }}
                      />
                    ) : null}

                    <span style={{ display: logo ? 'none' : 'block' }}>
                      {p.name}
                    </span>
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

            {/* Closing text */}
            <div className="client-gallery-footer">
              <p className="client-closing-text">And many more satisfied clients...</p>
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
