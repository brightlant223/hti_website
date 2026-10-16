import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, Clock, Settings } from 'lucide-react';

export default function Navbar({ currentPage = 'home', onNavigate, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page, sectionId = null) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Quick Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="top-item">
              <MapPin size={13} className="text-cyan" />
              <span>Goregaon (West), Mumbai - 400104</span>
            </span>
            <span className="top-divider">|</span>
            <span className="top-item">
              <Clock size={13} className="text-cyan" />
              <span>Serving Clients Since 2014</span>
            </span>
          </div>

          <div className="top-bar-right">
            <a href="tel:+919892756077" className="top-item hover-cyan">
              <Phone size={13} className="text-red" />
              <span>+91 9892756077</span>
            </a>
            <span className="top-divider">|</span>
            <a href="tel:+919594917010" className="top-item hover-cyan">
              <span>+91 9594917010</span>
            </a>
            <span className="top-divider">|</span>
            <a href="mailto:hti@htisystems.in" className="top-item hover-cyan">
              <Mail size={13} className="text-cyan" />
              <span>hti@htisystems.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`main-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="container main-nav-content">
          {/* Brand Logo */}
          <a
            href="/"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home', 'hero');
            }}
          >
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
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-links desktop-only">
            <button
              className={`nav-link-btn ${currentPage === 'home' ? 'active-nav-link' : ''}`}
              onClick={() => handleNavClick('home', 'hero')}
            >
              Home
            </button>
            <button
              className="nav-link-btn"
              onClick={() => handleNavClick('home', 'segments')}
            >
              Segments
            </button>
            <button
              className="nav-link-btn"
              onClick={() => handleNavClick('home', 'catalog')}
            >
              Products
            </button>
            <button
              className="nav-link-btn"
              onClick={() => handleNavClick('home', 'interlock-demo')}
            >
              Interlock Demo
            </button>
            <button
              className="nav-link-btn"
              onClick={() => handleNavClick('home', 'partners')}
            >
              Partners
            </button>
            <button
              className={`nav-link-btn ${currentPage === 'clients' ? 'active-nav-link active-clients-btn' : ''}`}
              onClick={() => handleNavClick('clients')}
            >
              Clients
            </button>
            <button
              className="nav-link-btn"
              onClick={() => handleNavClick('home', 'blogs')}
            >
              Blogs
            </button>
            <button
              className="nav-link-btn"
              onClick={() => handleNavClick('home', 'about')}
            >
              About Us
            </button>
          </div>

          {/* Action CTAs - Admin Panel */}
          <div className="nav-actions desktop-only">
            <button className="admin-btn" onClick={onOpenAdmin} title="Open CMS Admin Panel">
              <Settings size={16} />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown">
            <button
              className={`mobile-link ${currentPage === 'home' ? 'active-mobile-link' : ''}`}
              onClick={() => handleNavClick('home', 'hero')}
            >
              Home
            </button>
            <button
              className="mobile-link"
              onClick={() => handleNavClick('home', 'segments')}
            >
              Product Segments
            </button>
            <button
              className="mobile-link"
              onClick={() => handleNavClick('home', 'catalog')}
            >
              Full Product Catalog
            </button>
            <button
              className="mobile-link"
              onClick={() => handleNavClick('home', 'interlock-demo')}
            >
              Clean Room Interlock Demo
            </button>
            <button
              className="mobile-link"
              onClick={() => handleNavClick('home', 'partners')}
            >
              Technology Partners
            </button>
            <button
              className={`mobile-link ${currentPage === 'clients' ? 'active-mobile-link' : ''}`}
              onClick={() => handleNavClick('clients')}
            >
              Our Clients
            </button>
            <button
              className="mobile-link"
              onClick={() => handleNavClick('home', 'blogs')}
            >
              Technical Blogs
            </button>
            <button
              className="mobile-link"
              onClick={() => handleNavClick('home', 'about')}
            >
              About HTI
            </button>
            <div className="mobile-cta-group">
              <button
                className="admin-btn w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
              >
                <Settings size={16} />
                <span>Open Admin Panel (CMS)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
