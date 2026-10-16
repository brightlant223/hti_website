import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Building, Clock, Globe } from 'lucide-react';

export default function ContactInquiry({
  selectedProduct,
  selectedCategory,
  onInquirySubmitted
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    category: selectedCategory || 'Automation',
    productName: selectedProduct || '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync if selected product changes externally
  React.useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productName: selectedProduct,
        category: selectedCategory || prev.category
      }));
    }
  }, [selectedProduct, selectedCategory]);

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
    setSuccessResponse(null);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || 'Not Specified',
          category: formData.category,
          product_name: formData.productName || 'General Turnkey Inquiry',
          message: formData.message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to submit inquiry. Please check your inputs.');
      }

      setSuccessResponse(data);
      if (onInquirySubmitted) {
        onInquirySubmitted(data.inquiry);
      }

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        category: 'Automation',
        productName: '',
        message: ''
      });
    } catch (err) {
      setErrorMsg(err.message || 'Network error occurred while connecting to HTI SQLite backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-tag">
            <Mail size={14} />
            <span>Direct Commercial Engagement</span>
          </div>
          <h2 className="section-heading">
            Request a Technical <span className="gradient-text-red">Proposal & Quote</span>
          </h2>
          <p className="section-desc">
            Have a project requirement or questions regarding our products? Connect with our Mumbai engineering headquarters for turnkey specifications and commercial pricing.
          </p>
        </div>

        <div className="contact-layout">
          {/* Contact Details Card */}
          <div className="glass-card contact-info-card">
            <h3 className="contact-card-title">Corporate Headquarters</h3>
            <p className="contact-card-sub">
              HTI Automation & Security Systems Pvt. Ltd.
            </p>

            <div className="contact-details-list">
              <div className="contact-item">
                <div className="contact-icon-box bg-red-glass">
                  <MapPin size={20} className="text-red" />
                </div>
                <div>
                  <div className="contact-label">Registered Office & Work Centre</div>
                  <div className="contact-val">
                    407 DR-4 Ram Mandir Road,<br />
                    Goregaon (West), Mumbai - 400104,<br />
                    Maharashtra, India
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box bg-cyan-glass">
                  <Phone size={20} className="text-cyan" />
                </div>
                <div>
                  <div className="contact-label">Direct Lines & Engineering Support</div>
                  <div className="contact-val">
                    <a href="tel:+919892756077" className="hover-cyan">+91 9892756077</a>
                    <span className="mx-2">•</span>
                    <a href="tel:+919594917010" className="hover-cyan">+91 9594917010</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box bg-emerald-glass">
                  <Mail size={20} className="text-emerald" />
                </div>
                <div>
                  <div className="contact-label">Email Inquiries</div>
                  <div className="contact-val">
                    <a href="mailto:hti@htisystems.in" className="hover-cyan">hti@htisystems.in</a>
                    <br />
                    <a href="mailto:sales@htisystems.in" className="hover-cyan">sales@htisystems.in</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box bg-amber-glass">
                  <Globe size={20} className="text-amber" />
                </div>
                <div>
                  <div className="contact-label">Official Domain</div>
                  <div className="contact-val">
                    <a href="https://www.htisystems.in" target="_blank" rel="noreferrer" className="hover-cyan">
                      www.htisystems.in
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box bg-blue-glass">
                  <Clock size={20} className="text-blue" />
                </div>
                <div>
                  <div className="contact-label">Operating Hours</div>
                  <div className="contact-val">
                    Monday – Saturday: 9:00 AM – 6:30 PM IST
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-prompt-banner">
              <strong>Need emergency on-site service?</strong> Our field engineers respond promptly to facility maintenance and system retrofits across Greater Mumbai and pan-India.
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="glass-card contact-form-card">
            <h3 className="form-card-title">Commercial & Project Inquiry Form</h3>
            <p className="form-card-sub">
              All inquiries are logged directly into the HTI engineering database for rapid review.
            </p>

            {successResponse ? (
              <div className="success-banner">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={36} className="text-emerald" />
                </div>
                <h4>Inquiry Successfully Logged!</h4>
                <p>{successResponse.message}</p>
                <div className="inquiry-reference-box">
                  <span>Reference ID: </span>
                  <strong>#HTI-{successResponse.inquiry?.id}</strong>
                  <span className="mx-2">•</span>
                  <span>Product: </span>
                  <strong>{successResponse.inquiry?.product_name}</strong>
                </div>
                <button
                  className="btn-cyan mt-6"
                  onClick={() => setSuccessResponse(null)}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form">
                {errorMsg && (
                  <div className="error-alert">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      className="form-input"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Work Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. name@company.com"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98200 12345"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company / Institution Name</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Glenmark Pharma / P&G"
                      className="form-input"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Product Segment</label>
                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="Automation">Automation (Doors, Gates, Barriers)</option>
                      <option value="Security System">Security Systems (Interlocks, Fire, CCTV)</option>
                      <option value="Hygiene">Hygiene Solutions (Air Curtains, Hand Dryers, Taps)</option>
                      <option value="Turnkey Multi-Discipline">Turnkey Integrated Multi-Discipline</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Specific Product / Equipment</label>
                    <input
                      type="text"
                      name="productName"
                      placeholder="e.g. Door Interlock System / Fire Hydrant"
                      className="form-input"
                      value={formData.productName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Scope & Technical Details *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Please specify site location, number of units/doors, required ratings (e.g., flameproof, cleanroom ISO class), or delivery timelines..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full submit-btn"
                >
                  {loading ? (
                    <span>Submitting to Database...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Transmit Inquiry to HTI Engineering</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
