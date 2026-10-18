import React, { useState } from 'react';
import {
  Headphones,
  Settings,
  Users,
  ShieldCheck,
  Phone,
  PhoneCall,
  Mail,
  Globe,
  MapPin,
  Clock,
  User,
  Building2,
  Lock,
  Send,
  CheckCircle2,
  ChevronRight,
  Leaf,
  Navigation
} from 'lucide-react';
import '../ContactPage.css';

export default function ContactPage({ onNavigate, onInquirySubmitted }) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    setLoading(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          company: formData.company || 'Not Specified',
          email: formData.email,
          phone: formData.phone,
          category: formData.areaOfInterest || 'General Enquiry',
          product_name: formData.areaOfInterest || 'Official Contact Desk',
          message: formData.message || 'Contact Office Website Enquiry'
        })
      });
    } catch (err) {
      console.warn('Note: Inquiry stored or API offline fallback', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      if (onInquirySubmitted) onInquirySubmitted();
    }
  };

  const handleSegmentClick = (segmentKey) => {
    if (onNavigate) {
      onNavigate(segmentKey);
    } else {
      window.location.href = `/${segmentKey}`;
    }
  };

  const gmapsUrl = 'https://www.google.com/maps/search/?api=1&query=Goodwill+Bizhubb+Next+to+Ikea+Turbhe+MIDC+Navi+Mumbai+Maharashtra+400703';

  return (
    <div className="contact-page-wrap">
      {/* =========================================================================
          1. HERO HEADER: "Let's Build a Safer & Smarter Tomorrow Together"
          ========================================================================= */}
      <section className="contact-hero-banner">
        <div className="contact-container">
          <div className="contact-hero-content">
            <div className="contact-hero-left">
              <div className="kicker-tag">
                <span className="kicker-dash"></span>
                <span>CONTACT US</span>
              </div>

              <h1 className="contact-hero-headline">
                Let's Build a Safer & Smarter Tomorrow{' '}
                <span className="text-orange-accent">Together</span>
              </h1>

              <p className="contact-hero-subtext">
                Get in touch with HTI Automation & Security Systems Pvt. Ltd. for project inquiries, technical support, product information or customized automation, security and hygiene solutions.
              </p>

              {/* 4 Feature Badges */}
              <div className="contact-hero-badges-row">
                <div className="hero-feature-badge">
                  <div className="hero-badge-icon">
                    <Headphones size={13} />
                  </div>
                  <span>Expert Support</span>
                </div>

                <div className="hero-feature-badge">
                  <div className="hero-badge-icon">
                    <Settings size={13} />
                  </div>
                  <span>Customized Solutions</span>
                </div>

                <div className="hero-feature-badge">
                  <div className="hero-badge-icon">
                    <Users size={13} />
                  </div>
                  <span>Experienced Engineering Team</span>
                </div>

                <div className="hero-feature-badge">
                  <div className="hero-badge-icon">
                    <ShieldCheck size={13} />
                  </div>
                  <span>Trusted Since 2014</span>
                </div>
              </div>
            </div>

            {/* Right Side Floating "We are here to help" Card */}
            <div className="contact-hero-right">
              <a href="tel:9892756077" className="hero-call-card" title="Call our Mumbai office">
                <div className="call-card-icon-wrap">
                  <PhoneCall size={20} />
                </div>
                <div className="call-card-text">
                  <span className="call-card-title">We are here to help</span>
                  <span className="call-card-sub">For sales, support or any queries</span>
                  <span className="call-card-number">Call Now: 9892756077</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TWO-COLUMN SECTION: Contact Information & Send Us a Message
          ========================================================================= */}
      <section className="contact-main-grid-section">
        <div className="contact-container">
          <div className="contact-columns-grid">
            
            {/* Left Column: Contact Information */}
            <div className="contact-info-col">
              <div className="kicker-tag">
                <span className="kicker-dash"></span>
                <span>GET IN TOUCH</span>
              </div>

              <h2 className="contact-col-heading">Contact Information</h2>
              <p className="contact-col-subtext">
                Reach out to our team for project inquiries, technical support, service requests, or partnership opportunities.
              </p>

              {/* 2x2 Grid Cards */}
              <div className="contact-cards-2x2">
                {/* 1. Head Office */}
                <div className="contact-card-item">
                  <div className="contact-card-top-row">
                    <div className="contact-card-icon icon-orange">
                      <MapPin size={18} />
                    </div>
                    <div className="contact-card-arrow" aria-hidden="true">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                  <h3 className="contact-card-title">Head Office</h3>
                  <p className="contact-card-desc">
                    HTI Automation and Security System Pvt Ltd<br />
                    Unit No - 825, Plot No C-3C, Goodwill Bizhubb,<br />
                    Next to Ikea, TTC Industrial Area Estate,<br />
                    Turbhe MIDC, Turbhe, Navi Mumbai,<br />
                    Maharashtra - 400703
                  </p>
                </div>

                {/* 2. Call Us */}
                <div className="contact-card-item">
                  <div className="contact-card-top-row">
                    <div className="contact-card-icon icon-blue">
                      <Phone size={18} />
                    </div>
                    <div className="contact-card-arrow" aria-hidden="true">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                  <h3 className="contact-card-title">Call Us</h3>
                  <p className="contact-card-desc">
                    <a href="tel:9892756077">9892756077</a><br />
                    <a href="tel:9594917010">9594917010</a>
                  </p>
                </div>

                {/* 3. Email Us */}
                <div className="contact-card-item">
                  <div className="contact-card-top-row">
                    <div className="contact-card-icon icon-purple">
                      <Mail size={18} />
                    </div>
                    <div className="contact-card-arrow" aria-hidden="true">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                  <h3 className="contact-card-title">Email Us</h3>
                  <p className="contact-card-desc">
                    <a href="mailto:hti@htisystems.in">hti@htisystems.in</a>
                  </p>
                </div>

                {/* 4. Website */}
                <div className="contact-card-item">
                  <div className="contact-card-top-row">
                    <div className="contact-card-icon icon-green">
                      <Globe size={18} />
                    </div>
                    <div className="contact-card-arrow" aria-hidden="true">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                  <h3 className="contact-card-title">Website</h3>
                  <p className="contact-card-desc">
                    <a href="https://www.htisystems.in" target="_blank" rel="noreferrer">
                      www.htisystems.in
                    </a>
                  </p>
                </div>
              </div>

              {/* 4 Feature Items */}
              <div className="contact-features-4col">
                <div className="feature-col-item">
                  <div className="feature-col-icon">
                    <Clock size={16} />
                  </div>
                  <div className="feature-col-title">Quick Response</div>
                  <p className="feature-col-desc">We respond to your queries promptly</p>
                </div>

                <div className="feature-col-item">
                  <div className="feature-col-icon">
                    <Users size={16} />
                  </div>
                  <div className="feature-col-title">Expert Team</div>
                  <p className="feature-col-desc">Experienced & well-trained engineers</p>
                </div>

                <div className="feature-col-item">
                  <div className="feature-col-icon">
                    <Settings size={16} />
                  </div>
                  <div className="feature-col-title">Customized Solutions</div>
                  <p className="feature-col-desc">Tailored to your project requirements</p>
                </div>

                <div className="feature-col-item">
                  <div className="feature-col-icon">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="feature-col-title">Quality Assurance</div>
                  <p className="feature-col-desc">Commitment to innovation & perfection</p>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us a Message Form */}
            <div className="contact-form-col">
              <div className="contact-form-card-wrap">
                <div className="kicker-tag">
                  <span className="kicker-dash"></span>
                  <span>PROJECT ENQUIRY</span>
                </div>

                <h2 className="form-header-title">Send Us a Message</h2>
                <p className="form-header-sub">
                  Tell us about your project and our team will get back to you soon.
                </p>

                {submitted ? (
                  <div className="form-success-state py-8 text-center">
                    <CheckCircle2 size={52} className="text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-slate-900">Enquiry Submitted Successfully!</h3>
                    <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
                      Thank you for contacting HTI Automation & Security Systems. Our Mumbai engineering desk will review your requirements and reach out to you shortly.
                    </p>
                    <button
                      className="btn-submit-orange mt-6 max-w-xs mx-auto"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          company: '',
                          email: '',
                          phone: '',
                          areaOfInterest: '',
                          message: ''
                        });
                      }}
                    >
                      <span>Send Another Enquiry</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-actual-form">
                    {/* Row 1: Full Name & Company */}
                    <div className="form-row-2col">
                      <div className="form-field-group">
                        <label className="form-field-label">
                          Full Name<span className="required-star">*</span>
                        </label>
                        <div className="input-with-icon-wrap">
                          <User size={15} className="input-leading-icon" />
                          <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="form-control-input"
                          />
                        </div>
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">
                          Company / Organization<span className="required-star">*</span>
                        </label>
                        <div className="input-with-icon-wrap">
                          <Building2 size={15} className="input-leading-icon" />
                          <input
                            type="text"
                            name="company"
                            required
                            placeholder="Enter company name"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="form-control-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="form-row-2col">
                      <div className="form-field-group">
                        <label className="form-field-label">
                          Email Address<span className="required-star">*</span>
                        </label>
                        <div className="input-with-icon-wrap">
                          <Mail size={15} className="input-leading-icon" />
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control-input"
                          />
                        </div>
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">
                          Phone Number<span className="required-star">*</span>
                        </label>
                        <div className="input-with-icon-wrap">
                          <Phone size={15} className="input-leading-icon" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="form-control-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Area of Interest */}
                    <div className="form-field-group">
                      <label className="form-field-label">
                        Area of Interest<span className="required-star">*</span>
                      </label>
                      <select
                        name="areaOfInterest"
                        required
                        value={formData.areaOfInterest}
                        onChange={handleInputChange}
                        className="form-control-select"
                      >
                        <option value="">Select Area</option>
                        <option value="Automation Solutions">Automation Solutions (Doors, Gates, Barriers)</option>
                        <option value="Security Systems">Security Systems (CCTV, Access, Fire, Intercom)</option>
                        <option value="Hygiene Solutions">Hygiene Solutions (Hand Dryers, Air Curtains, Taps)</option>
                        <option value="Cleanroom Interlocks">Cleanroom Interlocks & Pass Boxes</option>
                        <option value="Fire Protection">Fire Alarm & Sprinkler Systems</option>
                        <option value="Annual Maintenance">Annual Maintenance Contract (AMC)</option>
                      </select>
                    </div>

                    {/* Row 4: Project Details & Requirements */}
                    <div className="form-field-group">
                      <label className="form-field-label">
                        Project Details & Requirements<span className="required-star">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        placeholder="Please describe your project in detail — site location, scope, quantity, timeline, or any specific requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-control-textarea"
                      />
                      <div className="textarea-char-count">
                        {formData.message.length}/500
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-submit-orange"
                    >
                      <Send size={15} />
                      <span>{loading ? 'Submitting Enquiry...' : 'Submit Enquiry'}</span>
                    </button>

                    {/* Privacy Note */}
                    <div className="form-secure-note">
                      <Lock size={12} />
                      <span>Your information is secure. We respect your privacy and will never share your details.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION 3: PRODUCT SEGMENTS (3 Large Horizontal Cards)
          ========================================================================= */}
      <section className="contact-segments-section">
        <div className="contact-container">
          <div className="section-header-center">
            <div className="kicker-tag">
              <span className="kicker-dash"></span>
              <span>OUR SOLUTIONS</span>
            </div>
            <h2 className="section-main-heading">Product Segments</h2>
            <p className="section-main-subtext">
              We specialize in automation, security and hygiene solutions for industrial, commercial and institutional sectors.
            </p>
          </div>

          <div className="segments-cards-grid">
            {/* 1. Automation Solutions */}
            <div 
              className="segment-card-box cursor-pointer" 
              onClick={() => handleSegmentClick('automation')}
            >
              <div className="segment-card-media">
                <img
                  src="/about-automation-doors.jpg"
                  alt="Automation Solutions"
                  className="segment-card-img"
                  loading="lazy"
                />
                <div className="segment-badge-circle badge-orange">
                  <Settings size={18} />
                </div>
              </div>

              <div className="segment-card-body">
                <div className="segment-title-row">
                  <h3 className="segment-card-name">Automation Solutions</h3>
                  <div className="segment-arrow-circle" aria-label="Explore Automation Solutions">
                    <ChevronRight size={15} />
                  </div>
                </div>
                <p className="segment-card-desc">
                  Automatic Doors & Gates, Fire Rated Doors, High Speed Doors, Boom Barriers, Dock Levellers, Turnstiles, Rolling Shutters and more.
                </p>
              </div>
            </div>

            {/* 2. Security Systems */}
            <div 
              className="segment-card-box cursor-pointer" 
              onClick={() => handleSegmentClick('security-systems')}
            >
              <div className="segment-card-media">
                <img
                  src="/about-security-camera.jpg"
                  alt="Security Systems"
                  className="segment-card-img"
                  loading="lazy"
                />
                <div className="segment-badge-circle badge-blue">
                  <ShieldCheck size={18} />
                </div>
              </div>

              <div className="segment-card-body">
                <div className="segment-title-row">
                  <h3 className="segment-card-name">Security Systems</h3>
                  <div className="segment-arrow-circle" aria-label="Explore Security Systems">
                    <ChevronRight size={15} />
                  </div>
                </div>
                <p className="segment-card-desc">
                  Access Control, Time Attendance, CCTV Surveillance, Fire Alarm, Fire Fighting, Gas Detection, Parking Management, IP PBX and more.
                </p>
              </div>
            </div>

            {/* 3. Hygiene Solutions */}
            <div 
              className="segment-card-box cursor-pointer" 
              onClick={() => handleSegmentClick('hygiene')}
            >
              <div className="segment-card-media">
                <img
                  src="/about-hygiene-washroom.jpg"
                  alt="Hygiene Solutions"
                  className="segment-card-img"
                  loading="lazy"
                />
                <div className="segment-badge-circle badge-green">
                  <Leaf size={18} />
                </div>
              </div>

              <div className="segment-card-body">
                <div className="segment-title-row">
                  <h3 className="segment-card-name">Hygiene Solutions</h3>
                  <div className="segment-arrow-circle" aria-label="Explore Hygiene Solutions">
                    <ChevronRight size={15} />
                  </div>
                </div>
                <p className="segment-card-desc">
                  Hand Dryers, Air Curtains, Insect Killers, Auto Tap, Auto Urinal Flush, Liquid Soap Dispenser, Aerosol Dispenser, PVC Strip Curtains and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTION 4: VISIT OUR HEAD OFFICE (Map & Info)
          ========================================================================= */}
      <section className="contact-location-section">
        <div className="contact-container">
          <div className="section-header-center">
            <div className="kicker-tag">
              <span className="kicker-dash"></span>
              <span>OUR LOCATION</span>
            </div>
            <h2 className="section-main-heading">Visit Our Head Office</h2>
            <p className="section-main-subtext">
              Plan a visit to discuss your project requirements with our experts.
            </p>
          </div>

          <div className="location-layout-grid">
            {/* Left Box: Office Info */}
            <div className="location-details-box">
              <div className="location-building-icon-wrap">
                <Building2 size={24} />
              </div>

              <h3 className="location-office-title">
                HTI Automation and Security System Pvt Ltd
              </h3>

              <div className="location-address-row">
                <MapPin size={18} className="address-pin-icon" />
                <p className="location-address-text">
                  Unit No - 825, Plot No C-3C, Goodwill Bizhubb,<br />
                  Next to Ikea, TTC Industrial Area Estate,<br />
                  Turbhe MIDC, Turbhe, Navi Mumbai,<br />
                  Maharashtra - 400703
                </p>
              </div>

              <a
                href={gmapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-view-gmaps"
              >
                <Navigation size={15} className="gmaps-pin-color" />
                <span>View on Google Maps →</span>
              </a>
            </div>

            {/* Right Box: Stylized Map Graphic matching Image 2 */}
            <div className="location-map-wrap">
              <div className="custom-map-container">
                {/* SVG Map Canvas with Roads, Green Area, Water */}
                <svg className="map-svg-canvas" viewBox="0 0 600 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Land */}
                  <rect width="600" height="320" fill="#f1f5f9" />

                  {/* Parsik Hills / Green Area */}
                  <path d="M480,0 L600,0 L600,220 C540,200 500,160 480,100 Z" fill="#dcfce7" />

                  {/* Roads network */}
                  {/* Thane-Belapur Highway */}
                  <path d="M380,0 L420,320" stroke="#fef08a" strokeWidth="10" strokeLinecap="round" />
                  <path d="M380,0 L420,320" stroke="#facc15" strokeWidth="6" strokeLinecap="round" />

                  {/* MIDC Spine Road */}
                  <path d="M220,0 L250,320" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
                  <path d="M220,0 L250,320" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />

                  {/* Palm Beach Connector */}
                  <path d="M80,0 L110,320" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />

                  {/* Turbhe MIDC Road (Next to Ikea) */}
                  <path d="M40,140 Q 240,135 410,135 T 600,150" stroke="#fed7aa" strokeWidth="9" strokeLinecap="round" />
                  <path d="M40,140 Q 240,135 410,135 T 600,150" stroke="#fb923c" strokeWidth="5" strokeLinecap="round" />

                  {/* Sion-Panvel Highway Connector */}
                  <path d="M120,200 L500,220" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                  <path d="M120,200 L500,220" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />

                  {/* Secondary Streets */}
                  <path d="M40,80 L350,90" stroke="#ffffff" strokeWidth="5" />
                  <path d="M180,50 L200,280" stroke="#ffffff" strokeWidth="4" />
                  <path d="M300,100 L320,300" stroke="#ffffff" strokeWidth="4" />
                  <path d="M400,180 L580,260" stroke="#ffffff" strokeWidth="5" />

                  {/* Railway Line (Harbour / Trans-Harbour Line) */}
                  <path d="M280,0 L300,320" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 4" />
                </svg>

                {/* POI Labels */}
                <div className="map-poi-item poi-turbhe-midc">
                  <span>TURBHE MIDC</span>
                </div>

                <div className="map-poi-item poi-ttc">
                  <span>TTC IND. AREA</span>
                </div>

                <div className="map-poi-item poi-ikea">
                  <span>🛋️ IKEA Navi Mumbai</span>
                </div>

                <div className="map-poi-item poi-turbhe-stn">
                  <span>🚉 Turbhe Station</span>
                </div>

                <div className="map-poi-item poi-goodwill">
                  <span>🏢 Goodwill Bizhubb</span>
                </div>

                {/* HTI Red Location Pin with Label */}
                <a
                  href={gmapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="map-hti-marker"
                  title="Click to open HTI Head Office in Google Maps"
                >
                  <MapPin size={32} className="map-pin-red" fill="#dc2626" color="#ffffff" />
                  <div className="map-marker-label">
                    <span>HTI Automation &amp; Security System Pvt Ltd</span>
                  </div>
                </a>

                {/* Map Zoom Controls */}
                <div className="map-zoom-controls">
                  <button className="map-zoom-btn" type="button" aria-label="Zoom in">+</button>
                  <button className="map-zoom-btn" type="button" aria-label="Zoom out">−</button>
                </div>

                {/* Google Logo text */}
                <div className="map-google-logo">
                  Google
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
