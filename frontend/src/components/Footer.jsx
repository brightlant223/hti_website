import React from 'react';
import { Phone, Mail, Globe, MapPin, ChevronRight } from 'lucide-react';

export default function Footer({ onCategoryClick, onNavigate }) {
  const handleLinkClick = (page, sectionId = null) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-wrap">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Column 1: Company Profile & Description matching Image 2 */}
          <div className="footer-col col-brand-summary">
            <div className="footer-logo-row">
              <img 
                src="/hti-logo.png" 
                alt="HTI Logo" 
                className="footer-hti-logo" 
              />
              <div className="footer-brand-title">
                <span className="brand-head-bold">HTI</span>
                <span className="brand-head-sub">Automation & Security Systems Pvt. Ltd.</span>
              </div>
            </div>

            <p className="footer-summary-text">
              A reliable automation and security system provider, serving clients since 2014. Committed to quality, innovation and exceptional service.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-column-heading">Quick Links</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => handleLinkClick('home', 'hero')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('automation')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  Our Solutions
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('clients')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('careers')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Segments */}
          <div className="footer-col">
            <h4 className="footer-column-heading">Product Segments</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => handleLinkClick('automation')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  Automation
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('security-systems')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  Security Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('hygiene')}>
                  <ChevronRight size={13} className="inline mr-1 text-slate-400" />
                  Hygiene Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col col-contact-details">
            <h4 className="footer-column-heading">Contact Us</h4>
            <div className="footer-contact-entries">
              <div className="contact-entry-item">
                <Phone size={15} className="contact-entry-icon text-orange-500" />
                <a href="tel:9892756077" className="hover:text-white">9892756077</a>
                <span>/</span>
                <a href="tel:9594917010" className="hover:text-white">9594917010</a>
              </div>

              <div className="contact-entry-item">
                <Mail size={15} className="contact-entry-icon text-orange-500" />
                <a href="mailto:hti@htisystems.in" className="hover:text-white">hti@htisystems.in</a>
              </div>

              <div className="contact-entry-item">
                <Globe size={15} className="contact-entry-icon text-orange-500" />
                <a href="https://www.htisystems.in" target="_blank" rel="noreferrer" className="hover:text-white">
                  www.htisystems.in
                </a>
              </div>

              <div className="contact-entry-item">
                <MapPin size={15} className="contact-entry-icon text-orange-500 flex-shrink-0 mt-1" />
                <span>
                  Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2024 HTI Automation and Security System Pvt Ltd. All Rights Reserved.
          </div>

          <div className="footer-legal-links">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>Privacy Policy</a>
            <span className="footer-dot-sep">|</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>Terms of Use</a>
            <span className="footer-dot-sep">|</span>
            <a href="#sitemap" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
