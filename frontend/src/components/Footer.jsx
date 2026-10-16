import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

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
          {/* Column 1: Company Profile & Core Contacts */}
          <div className="footer-col col-brand-summary">
            <div className="footer-logo-row">
              <img 
                src="/hti-logo.png" 
                alt="HTI Logo" 
                className="footer-hti-logo" 
              />
              <div className="footer-brand-title">
                <span className="brand-head-bold">AUTOMATION & SECURITY</span>
                <span className="brand-head-sub">SYSTEMS PVT. LTD.</span>
              </div>
            </div>

            <p className="footer-summary-text">
              Your trusted partner in automation, security and hygiene solutions since 2014. Delivering quality products with a focus on service, backed by experienced engineering expertise.
            </p>

            <div className="footer-direct-contacts">
              <a href="mailto:info@htisystems.in" className="footer-contact-link">
                <Mail size={15} className="footer-icon-blue" />
                <span>info@htisystems.in</span>
              </a>
              <a href="tel:+919992756077" className="footer-contact-link">
                <Phone size={15} className="footer-icon-blue" />
                <span>+91 9992756077</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-column-heading">Quick Links</h4>
            <div className="footer-links-two-col">
              <ul className="footer-nav-list">
                <li><button onClick={() => handleLinkClick('home', 'hero')}>Home</button></li>
                <li><button onClick={() => handleLinkClick('about')}>About Us</button></li>
                <li><button onClick={() => handleLinkClick('home', 'catalog')}>Products</button></li>
                <li><button onClick={() => handleLinkClick('partners')}>Brands</button></li>
                <li><button onClick={() => handleLinkClick('clients')}>Clients</button></li>
              </ul>
              <ul className="footer-nav-list">
                <li><button onClick={() => handleLinkClick('home', 'capabilities')}>Services</button></li>
                <li><button onClick={() => handleLinkClick('home', 'contact')}>Brochure</button></li>
                <li><button onClick={() => handleLinkClick('blogs')}>Case Studies</button></li>
                <li><button onClick={() => handleLinkClick('contact')}>Contact</button></li>
                <li><button onClick={() => handleLinkClick('home', 'insights-and-quote')}>Enquire Now</button></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Our Products */}
          <div className="footer-col">
            <h4 className="footer-column-heading">Our Products</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => onCategoryClick && onCategoryClick('Automation')}>Automation</button></li>
              <li><button onClick={() => onCategoryClick && onCategoryClick('Security System')}>Security Systems</button></li>
              <li><button onClick={() => onCategoryClick && onCategoryClick('Hygiene')}>Hygiene Solutions</button></li>
              <li><button onClick={() => onCategoryClick && onCategoryClick('Security System')}>Fire & Life Safety</button></li>
              <li><button onClick={() => onCategoryClick && onCategoryClick('Automation')}>Cleanroom Solutions</button></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col col-contact-details">
            <h4 className="footer-column-heading">Contact Us</h4>
            <div className="footer-contact-entries">
              <div className="contact-entry-item">
                <MapPin size={16} className="contact-entry-icon" />
                <span>401 CR-4, Ram Mandir Road, Goregaon (West), Mumbai - 400104</span>
              </div>
              <div className="contact-entry-item">
                <Phone size={16} className="contact-entry-icon" />
                <span>+91 9992756077 / 9594917010</span>
              </div>
              <div className="contact-entry-item">
                <Mail size={16} className="contact-entry-icon" />
                <span>info@htisystems.in</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="footer-social-icons-row">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © 2024 HTI Automation & Security Systems Pvt. Ltd. All Rights Reserved.
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
