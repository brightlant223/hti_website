import React from 'react';
import { Phone, Mail, Globe, MapPin, ChevronRight, ShieldCheck, ExternalLink, ArrowUp } from 'lucide-react';
import { scrollToTop } from '../utils/scroll';
import './Footer.css';

// Resolved once when the module loads rather than on every render
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  const handleLinkClick = (page, sectionId = null) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    scrollToTop();
  };

  // Every entry maps to a route that actually exists. The previous build
  // passed section ids such as "access-control" / "cctv" that no page ever
  // rendered, so those links silently dropped the user on the category top.
  //
  // Each entry also carries its real path so the control is a genuine anchor:
  // middle-click / "open in new tab" / "copy link address" behave the way a
  // visitor expects, and assistive tech announces it as a link.
  const quickLinks = [
    { label: 'Home', page: 'home', href: '/', section: 'hero' },
    { label: 'About Us', page: 'about', href: '/about' },
    { label: 'Our Solutions', page: 'automation', href: '/automation' },
    { label: 'Projects', page: 'clients', href: '/clients' },
    { label: 'Careers', page: 'careers', href: '/careers' },
    { label: 'Contact Us', page: 'contact', href: '/contact' },
  ];

  const productSegments = [
    { label: 'Access Automation', page: 'automation', href: '/automation' },
    { label: 'Perimeter & Traffic', page: 'perimeter-defense', href: '/perimeter-defense' },
    { label: 'Cleanroom Interlocks', page: 'cleanroom-interlocks', href: '/cleanroom-interlocks' },
    { label: 'Fire & Life Safety', page: 'fire-protection', href: '/fire-protection' },
    { label: 'Security & Surveillance', page: 'security-systems', href: '/security-systems' },
    { label: 'Hygiene Solutions', page: 'hygiene', href: '/hygiene' },
  ];

  return (
    <footer className="footer-wrap">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Column 1: Company Profile & Trust */}
          <div className="footer-col col-brand-summary">
            <div className="footer-brand-title">
              <div className="footer-hti-brand-mark">
                <img
                  src="/hti-logo.png"
                  alt="HTI Automation and Security Systems"
                  className="footer-hti-white-logo"
                />
              </div>
              <span className="brand-head-sub">Automation &amp; Security Systems Pvt. Ltd.</span>
            </div>

            <p className="footer-summary-text">
              Reliable automation &amp; security system provider since 2014. Committed to quality and 24/7 service.
            </p>

            <div className="footer-trust-pill">
              <ShieldCheck size={11} className="footer-pill-icon" />
              <span>Certified Integrator • Since 2014</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="footer-col col-quick-links" aria-label="Quick links">
            <h3 className="footer-column-heading">Quick Links</h3>
            <ul className="footer-nav-list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.page, link.section); }}
                  >
                    <ChevronRight size={13} className="nav-arrow-icon" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Product Segments */}
          <nav className="footer-col col-product-segments" aria-label="Product segments">
            <h3 className="footer-column-heading">Product Segments</h3>
            <ul className="footer-nav-list">
              {productSegments.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.page); }}
                  >
                    <ChevronRight size={13} className="nav-arrow-icon" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Contact Us */}
          <div className="footer-col col-contact-details">
            <h3 className="footer-column-heading">Contact Us</h3>
            <div className="footer-contact-entries">
              <div className="contact-entry-item">
                <div className="contact-icon-box">
                  <Phone size={12} />
                </div>
                <div className="contact-entry-body">
                  <a href="tel:+919892756077" className="contact-link">9892756077</a>
                  <span className="contact-sep" aria-hidden="true">/</span>
                  <a href="tel:+919594917010" className="contact-link">9594917010</a>
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
                  <address>825, Goodwill Bizhubb, Next to Ikea, Turbhe MIDC, Navi Mumbai - 400703</address>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credits */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {CURRENT_YEAR} HTI Automation and Security System Pvt Ltd. All Rights Reserved.
          </div>

          <div className="footer-legal-links">
            {/* Real destinations so middle-click / "copy link" behaves sensibly.
                The SPA handler keeps the transition instant. */}
            <a
              href="/about"
              onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}
            >
              Privacy Policy
            </a>
            <span className="footer-dot-sep" aria-hidden="true">•</span>
            <a
              href="/about"
              onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}
            >
              Terms of Use
            </a>
            <span className="footer-dot-sep" aria-hidden="true">•</span>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
            >
              Sitemap
            </a>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={handleBackToTop}
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp size={13} />
              <span>Back to top</span>
            </button>
          </div>

          <div className="footer-credit">
            Designed with <span className="credit-heart" aria-label="love">❤️</span> by{' '}
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
    </footer>
  );
}
