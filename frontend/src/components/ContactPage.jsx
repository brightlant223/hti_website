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

  // 14 Global Technology Partners split into two uniform rows for the train marquee animation
  const partnerBrandsRow1 = [
    { name: 'Honeywell', logo: '/logos/honeywell.png' },
    { name: 'Bosch', logo: '/logos/bosch.png' },
    { name: 'Cisco', logo: '/logos/cisco.png' },
    { name: 'Eaton', logo: '/logos/eaton.png' },
    { name: 'ABB', type: 'text', markClass: 'mark-abb', color: '#ff000f', text: 'ABB' },
    { name: 'GE', type: 'text', markClass: 'mark-ge', color: '#005eb8', text: 'GE' },
    { name: 'Hitachi', type: 'text', markClass: 'mark-hitachi', color: '#e60012', text: 'HITACHI' }
  ];

  const partnerBrandsRow2 = [
    { name: 'SICK', type: 'text', markClass: 'mark-sick', color: '#007bc0', text: 'SICK' },
    { name: 'Legrand', type: 'text', markClass: 'mark-legrand', color: '#e60000', text: 'legrand' },
    { name: 'Nice', logo: '/logos/nice.png' },
    { name: 'Avtech', logo: '/logos/avtech.png' },
    { name: 'Johnson Controls', logo: '/logos/johnson-controls.png' },
    { name: 'Siemens', logo: '/logos/Siemens.png' },
    { name: 'Vanderlande', type: 'text', markClass: 'mark-vanderlande', color: '#d4111e', text: 'VANDERLANDE' }
  ];

  // Quadruple to guarantee a perfectly seamless infinite loop when translating -50%
  const trainList1 = [...partnerBrandsRow1, ...partnerBrandsRow1, ...partnerBrandsRow1, ...partnerBrandsRow1];
  const trainList2 = [...partnerBrandsRow2, ...partnerBrandsRow2, ...partnerBrandsRow2, ...partnerBrandsRow2];

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

              {/* 1. Head Office */}
              <div className="contact-card-headoffice">
                <div className="contact-card-top-row">
                  <div className="contact-card-header-left">
                    <div className="contact-card-icon icon-orange">
                      <MapPin size={18} />
                    </div>
                    <h3 className="contact-card-title">Head Office</h3>
                  </div>
                  <a
                    href={gmapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-card-arrow"
                    title="View on Google Maps"
                  >
                    <ChevronRight size={14} />
                  </a>
                </div>
                <p className="contact-card-desc">
                  HTI Automation and Security System Pvt Ltd<br />
                  Unit No - 825, Plot No C-3C, Goodwill Bizhubb,<br />
                  Next to Ikea, TTC Industrial Area Estate,<br />
                  Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703
                </p>
              </div>

              {/* 3 Quick Action Cards in 1 Line (Square) */}
              <div className="contact-action-squares-row">
                {/* 2. Call Us */}
                <a href="tel:9892756077" className="contact-card-square card-call" title="Call HTI Systems: 9892756077">
                  <div className="contact-card-icon icon-blue">
                    <Phone size={18} />
                  </div>
                  <span className="square-card-title">Call Us</span>
                  <span className="square-card-val">9892756077</span>
                </a>

                {/* 3. Email Us */}
                <a href="mailto:hti@htisystems.in" className="contact-card-square card-email" title="Email HTI Systems: hti@htisystems.in">
                  <div className="contact-card-icon icon-purple">
                    <Mail size={18} />
                  </div>
                  <span className="square-card-title">Email Us</span>
                  <span className="square-card-val">hti@htisystems.in</span>
                </a>

                {/* 4. Website */}
                <a href="https://www.htisystems.in" target="_blank" rel="noreferrer" className="contact-card-square card-website" title="Visit Website: www.htisystems.in">
                  <div className="contact-card-icon icon-green">
                    <Globe size={18} />
                  </div>
                  <span className="square-card-title">Website</span>
                  <span className="square-card-val">htisystems.in</span>
                </a>
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
                            style={{ paddingLeft: '38px' }}
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
                            style={{ paddingLeft: '38px' }}
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
                            style={{ paddingLeft: '38px' }}
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
                            style={{ paddingLeft: '38px' }}
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
          4. SECTION 4: VISIT OUR HEAD OFFICE (Unified Banner matching Screenshot)
          ========================================================================= */}
      <section className="contact-location-section">
        <div className="contact-container">
          <div className="head-office-unified-banner">
            {/* Left Side: Dark Navy Info Block */}
            <div className="office-banner-info-pane">
              <div className="office-pane-header">
                <div className="office-header-title-row">
                  <div className="office-pin-circle">
                    <MapPin size={18} />
                  </div>
                  <h2 className="office-pane-title">Visit Our Head Office</h2>
                </div>
                <p className="office-pane-sub">
                  Plan a visit to discuss your project requirements with our experts.
                </p>
              </div>

              <div className="office-pane-body-row">
                <div className="office-building-thumb-wrap">
                  <img
                    src="/head-office-building.jpg"
                    alt="HTI Corporate Head Office Building"
                    className="office-building-thumb"
                  />
                </div>

                <div className="office-details-content">
                  <div className="office-name-row">
                    <MapPin size={18} className="office-orange-pin" />
                    <div>
                      <h3 className="office-company-name">
                        HTI Automation &amp; Security Systems Pvt. Ltd.
                      </h3>
                      <p className="office-address-lines">
                        Unit No - 825, Plot No C-3C, Goodwill Bizhubb,<br />
                        Next to Ikea, TTC Industrial Area Estate,<br />
                        Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Goodwill+Bizhubb+Next+to+Ikea+Turbhe+MIDC+Navi+Mumbai+Maharashtra+400703"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gmaps-pill"
                    title="Open location in Google Maps"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="gmaps-color-icon">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
                      <path d="M12 2C10.5 2 9.1 2.5 8 3.3L12 11.5L16 3.3C14.9 2.5 13.5 2 12 2z" fill="#EA4335"/>
                      <path d="M5 9c0 2.2 1.2 4.6 2.7 7L12 9H5z" fill="#FBBC05"/>
                      <path d="M12 9l4.3 7c1.5-2.4 2.7-4.8 2.7-7h-7z" fill="#34A853"/>
                      <circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
                    </svg>
                    <span>View on Google Maps</span>
                    <span className="gmaps-arrow-char">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Seamless Map Graphic */}
            <div className="office-banner-map-pane">
              <div className="custom-map-container">
                {/* SVG Map Canvas with Roads, Green Area, Water */}
                <svg className="map-svg-canvas" viewBox="0 0 540 280" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Land */}
                  <rect width="540" height="280" fill="#f1f5f9" />

                  {/* Parsik Hills / Thane Creek Green Belt */}
                  <path d="M430,0 L540,0 L540,280 L440,280 C400,200 420,100 430,0 Z" fill="#dcfce7" />

                  {/* Thane-Belapur Road (Primary Industrial Arterial Highway) */}
                  <path d="M340,0 L360,280" stroke="#fef08a" strokeWidth="12" strokeLinecap="round" />
                  <path d="M340,0 L360,280" stroke="#eab308" strokeWidth="7" strokeLinecap="round" />

                  {/* Sion-Panvel Highway */}
                  <path d="M190,0 L210,280" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
                  <path d="M190,0 L210,280" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />

                  {/* Turbhe MIDC Internal Spine */}
                  <path d="M60,0 L80,280" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />

                  {/* TTC Industrial Corridor */}
                  <path d="M20,120 Q 200,115 350,115 T 540,130" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" />
                  <path d="M20,120 Q 200,115 350,115 T 540,130" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" />

                  {/* Secondary Connecting Roads */}
                  <path d="M30,60 L300,70" stroke="#ffffff" strokeWidth="4" />
                  <path d="M150,40 L170,240" stroke="#ffffff" strokeWidth="3" />
                  <path d="M260,80 L280,260" stroke="#ffffff" strokeWidth="4" />
                  <path d="M360,160 L520,240" stroke="#ffffff" strokeWidth="4" />

                  {/* Harbour Railway Corridor */}
                  <path d="M245,0 L265,280" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 4" />
                </svg>

                {/* POI Labels matching Turbhe / Navi Mumbai */}
                <div className="map-poi-item poi-goregaon-west">
                  <span>TURBHE MIDC</span>
                </div>

                <div className="map-poi-item poi-oberoi">
                  <span>🏬 IKEA Navi Mumbai</span>
                </div>

                <div className="map-poi-item poi-aarey">
                  <span>TTC INDUSTRIAL AREA</span>
                </div>

                <div className="map-poi-item poi-oarey">
                  <span>THANE-BELAPUR RD</span>
                </div>

                <div className="map-poi-item poi-gare-galony">
                  <span>TURBHE STATION</span>
                </div>

                <div className="map-poi-item poi-filmcity">
                  <span>GOODWILL BIZHUBB</span>
                </div>

                {/* HTI Red Pin with Label */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Goodwill+Bizhubb+Next+to+Ikea+Turbhe+MIDC+Navi+Mumbai+Maharashtra+400703"
                  target="_blank"
                  rel="noreferrer"
                  className="map-hti-marker"
                  title="Click to view Goodwill Bizhubb in Google Maps"
                >
                  <MapPin size={28} className="map-pin-red" fill="#dc2626" color="#ffffff" />
                  <div className="map-marker-label">
                    <span>HTI Automation &amp;<br />Security Systems Pvt. Ltd.</span>
                  </div>
                </a>

                {/* Map Controls (+ / -) */}
                <div className="map-zoom-controls">
                  <button className="map-zoom-btn" type="button" aria-label="Zoom in">+</button>
                  <button className="map-zoom-btn" type="button" aria-label="Zoom out">−</button>
                </div>

                {/* Google Logo */}
                <div className="map-google-logo">
                  Google
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. TECHNOLOGY PARTNERSHIPS (Smooth Train Marquee Animation)
          ===================================================================== */}
      <section className="contact-partners-section">
        <div className="contact-container">
          <div className="partners-section-header">
            <div className="section-kicker-red">
              <span className="kicker-line"></span>
              <span>TECHNOLOGY PARTNERSHIPS</span>
            </div>
            <p className="partners-section-sub">
              We collaborate with globally trusted technology partners to deliver world-class automation and security solutions.
            </p>
          </div>
        </div>

        {/* Full-width continuous train marquee */}
        <div className="partners-train-wrapper">
          <div className="partners-train-fade-left"></div>
          <div className="partners-train-fade-right"></div>

          {/* Rail 1 - Train moving smoothly to the Left */}
          <div className="partners-train-rail">
            <div className="partners-train-track train-left">
              {trainList1.map((brand, bIdx) => (
                <div key={`contact-r1-${bIdx}`} className="partner-logo-tile" title={brand.name}>
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="partner-tile-img" 
                      loading="lazy"
                    />
                  ) : (
                    <span 
                      className={`partner-text-mark ${brand.markClass || ''}`}
                      style={{ color: brand.color }}
                    >
                      {brand.text || brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rail 2 - Train moving smoothly to the Right */}
          <div className="partners-train-rail">
            <div className="partners-train-track train-right">
              {trainList2.map((brand, bIdx) => (
                <div key={`contact-r2-${bIdx}`} className="partner-logo-tile" title={brand.name}>
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="partner-tile-img" 
                      loading="lazy"
                    />
                  ) : (
                    <span 
                      className={`partner-text-mark ${brand.markClass || ''}`}
                      style={{ color: brand.color }}
                    >
                      {brand.text || brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
