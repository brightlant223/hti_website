import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Headset,
  ArrowRight
} from 'lucide-react';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  // Mobile accordion collapse/expand state
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (name) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  const handleLinkClick = (page, sectionId = null) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', page: 'home', href: '/', section: 'hero' },
    { label: 'About Us', page: 'about', href: '/about' },
    { label: 'Our Products', page: 'catalog', href: '/catalog' },
    { label: 'Services', page: 'automation', href: '/automation' },
    { label: 'Projects', page: 'clients', href: '/clients' },
    { label: 'Careers', page: 'careers', href: '/careers' },
    { label: 'Contact Us', page: 'contact', href: '/contact' },
  ];

  const productSegments = [
    { label: 'CCTV Surveillance & Biometrics', page: 'security-systems', href: '/security-systems' },
    { label: 'Access Control Systems', page: 'automation', href: '/automation' },
    { label: 'Intrusion Alarm Systems', page: 'security-systems', href: '/security-systems' },
    { label: 'Fire Detection & Alarm Systems', page: 'fire-protection', href: '/fire-protection' },
    { label: 'Public Address Systems', page: 'security-systems', href: '/security-systems' },
    { label: 'Networking & IT Infrastructure', page: 'server-room-monitoring', href: '/server-room-monitoring' },
    { label: 'Building Automation Systems', page: 'automation', href: '/automation' },
    { label: 'AMC & Support Services', page: 'contact', href: '/contact' },
  ];

  return (
    <footer className="footer-wrap">
      {/* Background Graphic: Modern CCTV & Shield Cyber Hologram */}
      <div className="footer-bg-graphic" aria-hidden="true">
        <div className="footer-cctv-img-layer" />
        <div className="footer-cyber-glow" />
      </div>

      <div className="container footer-container">
        <div className="footer-grid">
          {/* =========================================================
              Column 1: Company Information & CTA
             ========================================================= */}
          <div className="footer-col col-brand-summary">
            {/* Logo & Company Name */}
            <div className="footer-brand-title">
              <div className="footer-hti-brand-mark">
                <img
                  src="/hti-logo.png"
                  alt="HTI Automation and Security Systems"
                  className="footer-hti-logo footer-hti-white-logo"
                />
              </div>
              <h2 className="brand-head-company">
                HTI Automation &amp; Security Systems Pvt. Ltd.
              </h2>
            </div>

            <p className="footer-summary-text">
              Delivering innovative automation and security solutions for a safer, smarter and more connected tomorrow.
            </p>

            {/* Badge & Social Icons Row (Side-by-Side on Mobile) */}
            <div className="footer-trust-social-row">
              {/* Certification Badge */}
              <div className="footer-trust-pill">
                <ShieldCheck size={12} className="footer-pill-icon" />
                <span>Certified Integrator • Since 2014</span>
              </div>

              {/* Social Media Icons */}
              <div className="footer-social-links" aria-label="Social media links">
                <a
                  href="https://www.linkedin.com/company/hti-automation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/htiautomation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/htiautomation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@htiautomation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Talk to Our Experts CTA Card */}
            <div
              className="footer-cta-card"
              onClick={() => handleLinkClick('contact')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLinkClick('contact'); }}
              aria-label="Talk to our security solution experts"
            >
              <div className="footer-cta-icon-wrap">
                <Headset size={16} className="footer-cta-headset-icon" />
              </div>
              <div className="footer-cta-content">
                <span className="footer-cta-sub">Need a Security Solution?</span>
                <span className="footer-cta-title">Talk to Our Experts</span>
              </div>
              <div className="footer-cta-btn" aria-hidden="true">
                <ArrowRight size={12} />
              </div>
            </div>
          </div>

          {/* =========================================================
              Column 2: Quick Links (Collapsible Accordion on Mobile)
             ========================================================= */}
          <nav className="footer-col col-quick-links" aria-label="Quick links">
            <button
              type="button"
              className={`footer-column-heading accordion-trigger ${openSection === 'links' ? 'is-active' : ''}`}
              onClick={() => toggleSection('links')}
              aria-expanded={openSection === 'links'}
            >
              <div className="heading-text-wrap">
                <span>Quick Links</span>
                <span className="heading-cyan-bar" />
              </div>
              <span className="accordion-toggle-icon" aria-hidden="true">
                <ChevronRight size={14} className={`accordion-chevron ${openSection === 'links' ? 'rotated' : ''}`} />
              </span>
            </button>
            <ul className={`footer-nav-list ${openSection === 'links' ? 'is-open' : ''}`}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.page, link.section);
                    }}
                    className="footer-nav-item"
                  >
                    <span className="nav-item-text">{link.label}</span>
                    <ChevronRight size={12} className="nav-item-chevron" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* =========================================================
              Column 3: Product Segments (Collapsible Accordion on Mobile)
             ========================================================= */}
          <nav className="footer-col col-product-segments" aria-label="Product segments">
            <button
              type="button"
              className={`footer-column-heading accordion-trigger ${openSection === 'products' ? 'is-active' : ''}`}
              onClick={() => toggleSection('products')}
              aria-expanded={openSection === 'products'}
            >
              <div className="heading-text-wrap">
                <span>Product Segments</span>
                <span className="heading-cyan-bar" />
              </div>
              <span className="accordion-toggle-icon" aria-hidden="true">
                <ChevronRight size={14} className={`accordion-chevron ${openSection === 'products' ? 'rotated' : ''}`} />
              </span>
            </button>
            <ul className={`footer-nav-list ${openSection === 'products' ? 'is-open' : ''}`}>
              {productSegments.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.page);
                    }}
                    className="footer-nav-item"
                  >
                    <span className="nav-item-text">{link.label}</span>
                    <ChevronRight size={12} className="nav-item-chevron" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* =========================================================
              Column 4: Contact Us
             ========================================================= */}
          <div className="footer-col col-contact-details">
            <div className="footer-column-heading static-heading">
              <div className="heading-text-wrap">
                <span>Contact Us</span>
                <span className="heading-cyan-bar" />
              </div>
            </div>

            <div className="footer-contact-entries">
              {/* Phone */}
              <div className="contact-entry-item">
                <div className="contact-icon-box" aria-hidden="true">
                  <Phone size={13} />
                </div>
                <div className="contact-entry-body">
                  <a href="tel:+919892756077" className="contact-link">
                    +91 98927 56077
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-entry-item">
                <div className="contact-icon-box" aria-hidden="true">
                  <Mail size={13} />
                </div>
                <div className="contact-entry-body">
                  <a href="mailto:info@htisystems.in" className="contact-link">
                    info@htisystems.in
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="contact-entry-item">
                <div className="contact-icon-box" aria-hidden="true">
                  <Globe size={13} />
                </div>
                <div className="contact-entry-body">
                  <a
                    href="https://www.hti-automation.com"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-link"
                  >
                    www.hti-automation.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="contact-entry-item contact-address-item">
                <div className="contact-icon-box contact-pin-box" aria-hidden="true">
                  <MapPin size={13} />
                </div>
                <div className="contact-entry-body contact-address-text">
                  <address>
                    HTI Automation &amp; Security Systems Pvt. Ltd.,<br />
                    Amravati, Maharashtra, India
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            Bottom Copyright Bar & Legal Links
           ========================================================= */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-accent-strip" />

          <div className="footer-bottom-row">
            <div className="footer-copyright">
              © {CURRENT_YEAR} HTI Automation &amp; Security Systems Pvt. Ltd. All Rights Reserved.
            </div>

            <div className="footer-legal-links">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('about');
                }}
              >
                Privacy Policy
              </a>
              <span className="footer-dot-sep" aria-hidden="true">|</span>
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('about');
                }}
              >
                Terms of Use
              </a>
              <span className="footer-dot-sep" aria-hidden="true">|</span>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('home');
                }}
              >
                Sitemap
              </a>
              <span className="footer-dot-sep" aria-hidden="true">|</span>
              <a
                href="/admin"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('admin');
                }}
                className="footer-admin-link"
                title="HTI Control Administrative Console"
              >
                Admin Login
              </a>
              <span className="footer-dot-sep" aria-hidden="true">|</span>
              <div className="footer-credit">
                Designed &amp; Developed by{' '}
                <a
                  href="https://brightlant.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brightlant-credit-link"
                  title="Brightlant - Innovative Web Engineering & Design"
                >
                  Brightlant
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
