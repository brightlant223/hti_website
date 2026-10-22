import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function InsightsAndQuote({ onInquirySubmitted, onNavigate }) {
  // 3 Articles from the reference image with instant local high-speed assets
  const articles = [
    {
      id: 1,
      title: 'Optimizing Cleanroom Differential Pressure with Multi-Door Interlock',
      category: 'Pharmaceutical Cleanroom',
      image: '/case-studies/case-cleanroom.jpg',
      slug: 'optimizing-cleanroom-differential-pressure'
    },
    {
      id: 2,
      title: 'High Speed Industrial Doors for Pharmaceutical Facilities',
      category: 'Pharma Manufacturing Logistics',
      image: '/case-studies/case-industrial-doors.jpg',
      slug: 'high-speed-sectional-doors-pharma'
    },
    {
      id: 3,
      title: 'Turnkey Fire Hydrant & FAS Compliance under NBC 2016',
      category: 'Commercial & Industrial Fire Safety',
      image: '/case-studies/case-fire-hydrant.jpg',
      slug: 'turnkey-fire-hydrant-fas-nbc-compliance'
    }
  ];

  // Quote Form State
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productCategory: '',
    projectLocation: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg(false);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          company: formData.companyName || 'Not Specified',
          email: formData.email,
          phone: formData.phone,
          category: formData.productCategory || 'General Inquiry',
          product_name: formData.projectLocation ? `Location: ${formData.projectLocation}` : 'Turnkey Proposal',
          message: formData.message
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Could not send inquiry.');
      }

      setSuccessMsg(true);
      if (onInquirySubmitted) onInquirySubmitted(data.inquiry);

      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        productCategory: '',
        projectLocation: '',
        message: ''
      });
    } catch (err) {
      setErrorMsg(err.message || 'Error submitting proposal request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="insights-and-quote" className="insights-quote-row-section">
      <div className="container">
        <div className="insights-quote-grid">
          {/* Left Column: Engineering Insights & Case Studies */}
          <div className="insights-column-panel">
            <div className="insights-header-row">
              <div className="insights-header-text">
                <h3 className="panel-title-main">Engineering Insights & Case Studies</h3>
                <p className="panel-subtitle">
                  Explore industry insights, latest projects and best practices in automation, security and hygiene.
                </p>
              </div>

              <button 
                className="btn-panel-action"
                onClick={() => onNavigate && onNavigate('blogs')}
              >
                <span>View All Articles</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* 3 Articles Grid with Instant Local Images */}
            <div className="articles-tri-grid reveal-stagger">
              {articles.map((art) => (
                <div key={art.id} className="article-preview-card">
                  <div className="article-thumb-wrap">
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className="article-thumb-img"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>

                  <div className="article-card-body">
                    <h4 className="article-title">{art.title}</h4>
                    <div className="article-category-link">{art.category}</div>

                    <button 
                      className="btn-read-article"
                      onClick={() => onNavigate && onNavigate('blogs')}
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Request a Technical Proposal / Quote */}
          <div className="quote-form-card">
            <h3 className="quote-form-title">
              Request a Technical Proposal / <span className="title-quote-red">Quote</span>
            </h3>
            <p className="quote-form-subtitle">
              Fill in your requirements and our team will get back to you shortly.
            </p>

            {successMsg && (
              <div className="quote-success-banner">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Thank you! Your proposal request has been received. Our engineering team will contact you shortly.</span>
              </div>
            )}

            {errorMsg && (
              <div className="quote-error-banner">
                <AlertCircle size={18} className="text-red" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="quote-form-element" noValidate={false}>
              {/* Row 1: Full Name & Company Name */}
              <div className="form-two-col">
                <div className="form-field-group">
                  <label htmlFor="quote-full-name">Full Name *</label>
                  <input
                    id="quote-full-name"
                    type="text"
                    name="fullName"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field-group">
                  <label htmlFor="quote-company">Company Name *</label>
                  <input
                    id="quote-company"
                    type="text"
                    name="companyName"
                    required
                    autoComplete="organization"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2: Email Address & Phone Number */}
              <div className="form-two-col">
                <div className="form-field-group">
                  <label htmlFor="quote-email">Email Address *</label>
                  <input
                    id="quote-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field-group">
                  <label htmlFor="quote-phone">Phone Number *</label>
                  <input
                    id="quote-phone"
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Contact / WhatsApp"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 3: Product Interest & Project Location */}
              <div className="form-two-col">
                <div className="form-field-group">
                  <label htmlFor="quote-category">Product Interest</label>
                  <select
                    id="quote-category"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                  >
                    <option value="">Select product category</option>
                    <option value="Industrial Access Automation">Industrial Access Automation</option>
                    <option value="Cleanroom Interlocks & Pass Boxes">Cleanroom Interlocks & Pass Boxes</option>
                    <option value="Security Systems & CCTV">Security Systems & CCTV</option>
                    <option value="Fire Protection & FAS">Fire Protection & FAS</option>
                    <option value="Industrial Hygiene & Air Barrier">Industrial Hygiene & Air Barrier</option>
                  </select>
                </div>
                <div className="form-field-group">
                  <label htmlFor="quote-location">Project Location *</label>
                  <input
                    id="quote-location"
                    type="text"
                    name="projectLocation"
                    required
                    autoComplete="address-level2"
                    placeholder="City / Site Location"
                    value={formData.projectLocation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="form-field-group">
                <label htmlFor="quote-message">Message</label>
                <textarea
                  id="quote-message"
                  name="message"
                  rows={3}
                  placeholder="Tell us about your requirement..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-submit-proposal"
                disabled={loading}
              >
                <span>{loading ? 'Sending Request...' : 'Send Proposal Request'}</span>
                <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
