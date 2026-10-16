import React from 'react';
import { Handshake, Building2, Shield, Sparkles } from 'lucide-react';

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

  const displayPartners = partners && partners.length > 0 ? partners : defaultPartners;
  const displayClients = clients && clients.length > 0 ? clients : defaultClients;

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
            {displayPartners.map((p, idx) => (
              <div key={idx} className="glass-card partner-card">
                <div className="partner-name">{p.name}</div>
                <div className="partner-cat">{p.category || 'Technology Partner'}</div>
              </div>
            ))}
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

          <div className="clients-grid">
            {displayClients.map((client, idx) => (
              <div key={idx} className="glass-card client-card">
                <div className="client-avatar">
                  <span>{client.name.charAt(0)}</span>
                </div>
                <div className="client-info">
                  <h4 className="client-name">{client.name}</h4>
                  <span className="client-sector">{client.sector}</span>
                </div>
              </div>
            ))}
          </div>

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
              <span className="badge-pill badge-emerald">100% Audit Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
