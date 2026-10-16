import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';

export default function Footer({ onCategoryClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Company Column */}
          <div className="footer-col col-brand">
            <div className="brand-logo footer-logo">
              <div className="logo-symbol">
                <div className="logo-bars">
                  <span className="bar red-bar"></span>
                  <span className="bar red-bar"></span>
                  <span className="bar red-bar"></span>
                </div>
              </div>
              <div className="logo-text">
                <div className="brand-name">
                  <span className="text-white font-bold">HTI</span>
                  <span className="text-red font-semibold"> AUTOMATION</span>
                </div>
                <div className="brand-sub">& SECURITY SYSTEMS PVT. LTD.</div>
              </div>
            </div>

            <p className="footer-about-text">
              Providing reliable automation, life-safety fire systems, cleanroom door interlocks, and industrial hygiene solutions to India's corporate sector since 2014.
            </p>

            <div className="footer-compliance-pill">
              <ShieldCheck size={16} className="text-emerald" />
              <span>ISO & USFDA 21 CFR Ready Engineering</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => scrollTo('hero')}>Home</button></li>
              <li><button onClick={() => scrollTo('segments')}>Product Segments</button></li>
              <li><button onClick={() => scrollTo('catalog')}>Full Catalog</button></li>
              <li><button onClick={() => scrollTo('interlock-demo')}>Interlock Simulator</button></li>
              <li><button onClick={() => scrollTo('partners')}>Technology Partners</button></li>
              <li><button onClick={() => scrollTo('clients')}>Client Segment</button></li>
              <li><button onClick={() => scrollTo('about')}>About Us</button></li>
              <li><button onClick={() => scrollTo('contact')}>Contact & Inquiries</button></li>
            </ul>
          </div>

          {/* Product Segments */}
          <div className="footer-col">
            <h4 className="footer-heading">Solution Domains</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onCategoryClick('Automation')}>Automatic Sliding & Swing Doors</button></li>
              <li><button onClick={() => onCategoryClick('Automation')}>Cantilever & Telescopic Gates</button></li>
              <li><button onClick={() => onCategoryClick('Automation')}>Boom Barriers & Dock Levellers</button></li>
              <li><button onClick={() => onCategoryClick('Security System')}>Clean Room Door Interlock Systems</button></li>
              <li><button onClick={() => onCategoryClick('Security System')}>Turnkey Fire Hydrant Systems</button></li>
              <li><button onClick={() => onCategoryClick('Security System')}>CCTV Surveillance & Access Control</button></li>
              <li><button onClick={() => onCategoryClick('Hygiene')}>High-Speed Dual Hand Dryers</button></li>
              <li><button onClick={() => onCategoryClick('Hygiene')}>Thermo-Zone Air Curtains & Taps</button></li>
            </ul>
          </div>

          {/* Mumbai Office Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Corporate Office</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-row">
                <MapPin size={16} className="text-red flex-shrink-0" />
                <span>407 DR-4 Ram Mandir Road, Goregaon (West), Mumbai 400104, India</span>
              </div>
              <div className="footer-contact-row">
                <Phone size={16} className="text-cyan flex-shrink-0" />
                <span>+91 9892756077 / 9594917010</span>
              </div>
              <div className="footer-contact-row">
                <Mail size={16} className="text-emerald flex-shrink-0" />
                <span>hti@htisystems.in<br />sales@htisystems.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} HTI Automation & Security Systems Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="footer-back-to-top">
            <button className="btn-back-to-top" onClick={scrollToTop}>
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
