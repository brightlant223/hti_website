import React from 'react';
import { Phone, Mail, Globe, MapPin, ChevronRight, ShieldCheck, ExternalLink } from 'lucide-react';
import './Footer.css';

export default function Footer({ onCategoryClick, onNavigate }) {
  const currentYear = new Date().getFullYear();

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
          {/* Column 1: Company Profile & Trust */}
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
              Reliable automation & security system provider since 2014. Committed to quality and 24/7 service.
            </p>

            <div className="footer-trust-pill">
              <ShieldCheck size={11} className="footer-pill-icon" />
              <span>Certified Integrator • Since 2014</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col col-quick-links">
            <h4 className="footer-column-heading">Quick Links</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => handleLinkClick('home', 'hero')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('automation')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Our Solutions</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('clients')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Projects</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('careers')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Careers</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Segments */}
          <div className="footer-col col-product-segments">
            <h4 className="footer-column-heading">Product Segments</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => handleLinkClick('automation')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Automation</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('security-systems')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Security Systems</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('hygiene')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Hygiene Solutions</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('automation', 'access-control')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Access Control</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('security-systems', 'cctv')}>
                  <ChevronRight size={13} className="nav-arrow-icon" />
                  <span>Surveillance & CCTV</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col col-contact-details">
            <h4 className="footer-column-heading">Contact Us</h4>
            <div className="footer-contact-entries">
              <div className="contact-entry-item">
                <div className="contact-icon-box">
                  <Phone size={12} />
                </div>
                <div className="contact-entry-body">
                  <a href="tel:9892756077" className="contact-link">9892756077</a>
                  <span className="contact-sep">/</span>
                  <a href="tel:9594917010" className="contact-link">9594917010</a>
                </div>
              </div>

              <div className="contact-entry-item">
                <div className="contact-icon-box">
                  <Mail size={12} />
                </div>
                <div className="contact-entry-body">
                  <a href="mailto:hti@htisystems.in" className="contact-link">hti@htisystems.in</a>
                </div>
              </div>

              <div className="contact-entry-item">
                <div className="contact-icon-box">
                  <Globe size={12} />
                </div>
                <div className="contact-entry-body">
                  <a href="https://www.htisystems.in" target="_blank" rel="noreferrer" className="contact-link">
                    www.htisystems.in
                    <ExternalLink size={10} className="contact-ext-icon" />
                  </a>
                </div>
              </div>

              <div className="contact-entry-item contact-address-item">
                <div className="contact-icon-box contact-pin-box">
                  <MapPin size={11} />
                </div>
                <div className="contact-entry-body contact-address-text">
                  825, Goodwill Bizhubb, Next to Ikea, Turbhe MIDC, Navi Mumbai - 400703
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {currentYear} HTI Automation and Security System Pvt Ltd. All Rights Reserved.
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
