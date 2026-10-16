import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Download, Send, PhoneCall, 
  MessageSquare, Layers, Cpu, Flame, Wrench, Share2, Sparkles, Building2,
  Check, FileText, ExternalLink, ArrowRight, AlertTriangle, BatteryCharging,
  Settings, CheckSquare, Zap, Clock
} from 'lucide-react';
import { productsData } from '../data/productsData';

export default function ProductDetailPage({ 
  product, 
  onNavigate, 
  onQuoteSubmit 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    quantity: '1 Unit / Turnkey Site',
    accessories: [],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Available add-ons / engineering accessories
  const availableAccessories = [
    'Emergency Battery Backup Unit',
    'Active Infrared Presence & Safety Sensor',
    'Certified Flameproof (Ex-d) Enclosure',
    'FACP Fire Alarm Auto-Trip Interface Relay',
    'Touchless Wave Sensor / Proximity Switch',
    'Annual Maintenance Contract (AMC 24/7 SLA)'
  ];

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmitted(false);
    setFormData(prev => ({
      ...prev,
      accessories: [],
      message: `Hello HTI Engineering, please share technical data sheet, GA drawing, and turnkey quotation for ${product?.name || 'this system'}.`
    }));
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-page section">
        <div className="container text-center py-16">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Product Not Found</h2>
          <p className="text-slate-500 mb-6">The product you are looking for is either archived or unavailable.</p>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('home', 'catalog')}
          >
            <ArrowLeft size={16} /> Return to Products Catalog
          </button>
        </div>
      </div>
    );
  }

  // Find related products in the same category (excluding current)
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccessoryToggle = (acc) => {
    setFormData(prev => {
      const exists = prev.accessories.includes(acc);
      return {
        ...prev,
        accessories: exists ? prev.accessories.filter(a => a !== acc) : [...prev.accessories, acc]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in your Name, Email, and Phone number.');
      return;
    }
    
    // Simulate inquiry dispatch
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not specified',
        category: product.category,
        product_name: product.name,
        message: `${formData.message} [Location: ${formData.location || 'Mumbai'}] [Qty: ${formData.quantity}] [Selected Add-ons: ${formData.accessories.join(', ') || 'Standard'}]`
      })
    }).catch(() => {
      // Offline fallback
    });

    setSubmitted(true);
    if (onQuoteSubmit) onQuoteSubmit();
  };

  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleBrochureDownload = () => {
    alert(`Technical specification sheet for "${product.name}" has been requested. Our system will generate and email the PDF engineering package to you shortly.`);
  };

  return (
    <div className="product-detail-page">
      {/* 1. Breadcrumb Bar */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button 
              className="breadcrumb-link" 
              onClick={() => onNavigate('home')}
            >
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <button 
              className="breadcrumb-link"
              onClick={() => {
                const catPage = product.category.toLowerCase().includes('automation') 
                  ? 'automation' 
                  : product.category.toLowerCase().includes('security') 
                  ? 'security-systems' 
                  : 'hygiene';
                onNavigate(catPage);
              }}
            >
              {product.category}
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>

          <button 
            className="back-btn"
            onClick={() => onNavigate('home', 'catalog')}
          >
            <ArrowLeft size={15} />
            <span>Back to All Products</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Banner (Light Theme) */}
      <div className="detail-hero-banner">
        <div className="container">
          <div className="detail-hero-grid">
            <div className="detail-hero-content">
              <div className="detail-tag-row">
                <span className="detail-category-badge">{product.category}</span>
                <span className="detail-subcat-badge">{product.subcategory}</span>
                {product.badge && (
                  <span className="detail-highlight-badge">
                    <Sparkles size={13} />
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="detail-title">{product.name}</h1>
              <p className="detail-tagline">{product.tagline}</p>

              <div className="detail-hero-cta-row">
                <a 
                  href="#quote-form"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Send size={16} />
                  <span>Request Instant Quotation</span>
                </a>

                <button 
                  className="btn btn-secondary"
                  onClick={handleBrochureDownload}
                >
                  <Download size={16} />
                  <span>Download Specs PDF</span>
                </button>

                <button 
                  className="btn-share-icon" 
                  onClick={handleCopyShare}
                  title="Share Product Page"
                >
                  {copiedLink ? <Check size={18} className="text-emerald-600" /> : <Share2 size={18} />}
                </button>
              </div>

              <div className="detail-quick-stats">
                <div className="quick-stat-item">
                  <ShieldCheck size={18} className="text-sky-600" />
                  <span>ISO & CE Certified Quality</span>
                </div>
                <div className="quick-stat-item">
                  <Wrench size={18} className="text-sky-600" />
                  <span>Turnkey PAN-India Installation</span>
                </div>
                <div className="quick-stat-item">
                  <Cpu size={18} className="text-sky-600" />
                  <span>OEM Warranty & Service Support</span>
                </div>
              </div>
            </div>

            {/* Visual Engineering Preview Card */}
            <div className="detail-preview-visual">
              <div className="preview-glass-box">
                <div className="preview-icon-badge">
                  {product.category === 'Automation' ? (
                    <Cpu size={44} className="text-sky-600" />
                  ) : product.category === 'Security System' ? (
                    <ShieldCheck size={44} className="text-red-500" />
                  ) : (
                    <Layers size={44} className="text-emerald-600" />
                  )}
                </div>
                <h3 className="preview-box-title">{product.name}</h3>
                <p className="preview-box-summary">{product.workSummary}</p>
                
                <div className="preview-status-pill">
                  <span className="status-dot"></span>
                  <span>Active Engineering Specification Available</span>
                </div>

                <div className="preview-meta-row">
                  <div className="preview-meta-col">
                    <span className="meta-label">Category</span>
                    <span className="meta-val">{product.category}</span>
                  </div>
                  <div className="preview-meta-col">
                    <span className="meta-label">Lead Time</span>
                    <span className="meta-val">Ready Stock / Custom</span>
                  </div>
                  <div className="preview-meta-col">
                    <span className="meta-label">Compliance</span>
                    <span className="meta-val">USFDA / NBC 2016</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Body & Specs */}
      <div className="detail-main-body section">
        <div className="container">
          <div className="detail-columns-grid">
            
            {/* Left 65%: Overview, Features, Specs, Safety & Applications */}
            <div className="detail-info-column">
              
              {/* Engineering Overview */}
              <div className="detail-card">
                <h2 className="detail-section-title">
                  <FileText size={20} className="text-sky-600" />
                  <span>Engineering & Technical Overview</span>
                </h2>
                <p className="detail-description-text">{product.description}</p>
              </div>

              {/* Key Features & System Capabilities */}
              <div className="detail-card mt-6">
                <h2 className="detail-section-title">
                  <CheckCircle2 size={20} className="text-sky-600" />
                  <span>Key Engineering Features</span>
                </h2>
                <div className="detail-features-grid">
                  {product.features && product.features.map((feat, idx) => (
                    <div key={idx} className="detail-feature-item">
                      <div className="feature-check-icon">
                        <Check size={16} />
                      </div>
                      <span className="feature-text">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Technical Specifications Table */}
              <div className="detail-card mt-6">
                <h2 className="detail-section-title">
                  <Cpu size={20} className="text-sky-600" />
                  <span>Technical Specifications & Standards</span>
                </h2>
                <div className="specs-table-wrapper">
                  <table className="specs-table">
                    <tbody>
                      {product.specs && Object.entries(product.specs).map(([specKey, specVal], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'tr-even' : 'tr-odd'}>
                          <td className="spec-key-col">{specKey}</td>
                          <td className="spec-val-col">{specVal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fail-Safe & Life Safety Mechanisms */}
              <div className="detail-card mt-6">
                <h2 className="detail-section-title">
                  <ShieldCheck size={20} className="text-red-500" />
                  <span>Fail-Safe & Statutory Life-Safety Mechanisms</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <BatteryCharging size={18} className="text-emerald-600" />
                      <span>Emergency Power Auto-Release</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Integrated 24V linear battery reserve automatically operates or holds open the door/gate leaf during sudden grid failure.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <Flame size={18} className="text-red-500" />
                      <span>Fire Alarm Panel (FACP) Trip Relay</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Direct integration with building fire alarm panels ensures instantaneous lock drop and barrier opening upon smoke detection.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <Zap size={18} className="text-amber-500" />
                      <span>Anti-Pinch Obstacle Auto-Reverse</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Microprocessor-driven electronic torque monitoring detects the slightest resistance and reverses curtain or leaf traversal in &lt;0.2 sec.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <Wrench size={18} className="text-sky-600" />
                      <span>Personalized Key Manual Override</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      High-security keyed clutch disengagement lever allows smooth manual operation during planned maintenance or electrical outages.
                    </p>
                  </div>
                </div>
              </div>

              {/* Target Industrial Applications */}
              <div className="detail-card mt-6">
                <h2 className="detail-section-title">
                  <Building2 size={20} className="text-sky-600" />
                  <span>Target Applications & Deployments</span>
                </h2>
                <div className="applications-badge-grid">
                  {product.applications && product.applications.map((app, idx) => (
                    <div key={idx} className="application-badge-item">
                      <CheckCircle2 size={15} className="text-sky-600" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Consultation Callout */}
              <div className="engineer-callout-banner mt-6">
                <div className="callout-icon">
                  <PhoneCall size={30} />
                </div>
                <div>
                  <h4 className="callout-title">Need Custom Clearances or CAD Drawings?</h4>
                  <p className="callout-desc">
                    Our technical application engineers in Mumbai provide site visits, bespoke mechanical design, CAD drawings, and fire/pharma statutory consultation.
                  </p>
                </div>
                <a 
                  href="tel:+919820112345" 
                  className="btn btn-primary"
                >
                  <PhoneCall size={16} />
                  <span>+91 98201 12345</span>
                </a>
              </div>
            </div>

            {/* Right 35%: Sticky Quote Inquiry Form */}
            <div className="detail-sidebar-column">
              <div id="quote-form" className="quote-sticky-card">
                <div className="quote-card-header">
                  <div className="quote-header-tag">DIRECT TECHNICAL DESK</div>
                  <h3 className="quote-card-title">Request Official Quotation</h3>
                  <p className="quote-card-subtitle">
                    Get customized pricing, GA drawings, and lead times within 2 business hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="quote-success-state">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={44} className="text-emerald-500 mx-auto" />
                    </div>
                    <h4>Inquiry Submitted!</h4>
                    <p>
                      Thank you for your interest in <strong>{product.name}</strong>. An HTI senior application engineer will contact you shortly with the official quotation.
                    </p>
                    <button 
                      className="btn btn-secondary mt-4 w-full"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="quote-form-body">
                    <div className="form-group-sm">
                      <label>Target Product</label>
                      <input 
                        type="text" 
                        value={product.name} 
                        readOnly 
                        className="form-input readonly-input" 
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-group-sm">
                        <label>Your Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          placeholder="e.g. Rajesh Sharma"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group-sm">
                        <label>Company / Organization</label>
                        <input 
                          type="text" 
                          name="company" 
                          placeholder="e.g. Glenmark Pharma"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group-sm">
                        <label>Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group-sm">
                        <label>Phone / Mobile *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          placeholder="+91 98201 12345"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group-sm">
                        <label>Site Location / City</label>
                        <input 
                          type="text" 
                          name="location" 
                          placeholder="e.g. Mumbai, Pune, Vapi"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group-sm">
                        <label>Estimated Quantity</label>
                        <select 
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="1 Unit / Turnkey Site">1 Unit / Turnkey Site</option>
                          <option value="2 - 5 Units">2 - 5 Units</option>
                          <option value="6 - 15 Units">6 - 15 Units</option>
                          <option value="15+ Multi-Site Project">15+ Multi-Site Project</option>
                          <option value="Annual Maintenance Contract (AMC)">Annual Maintenance (AMC)</option>
                        </select>
                      </div>
                    </div>

                    {/* Optional Accessories Selector */}
                    <div className="form-group-sm">
                      <label className="block mb-2">Select Optional Engineering Accessories:</label>
                      <div className="flex flex-col gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-lg max-h-36 overflow-y-auto">
                        {availableAccessories.map((acc, aIdx) => {
                          const isChecked = formData.accessories.includes(acc);
                          return (
                            <label key={aIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={() => handleAccessoryToggle(acc)}
                                className="rounded text-sky-600"
                              />
                              <span>{acc}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="form-group-sm">
                      <label>Specific Technical Requirements</label>
                      <textarea 
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-input form-textarea"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full quote-submit-btn">
                      <Send size={16} />
                      <span>Send Technical Inquiry</span>
                    </button>

                    <div className="quote-trust-footer">
                      <ShieldCheck size={14} className="text-slate-400" />
                      <span>Direct response from Mumbai engineering desk. Zero spam.</span>
                    </div>
                  </form>
                )}
              </div>

              {/* Direct Technical Hotline Support Card */}
              <div className="support-quick-card mt-6">
                <h4 className="support-title">Direct Technical Helpline</h4>
                <div className="support-list">
                  <div className="support-item">
                    <PhoneCall size={16} className="text-red-500 flex-shrink-0" />
                    <div>
                      <div className="support-role">Sales & Engineering Desk</div>
                      <a href="tel:+919820112345" className="support-contact-link">+91 98201 12345</a>
                    </div>
                  </div>
                  <div className="support-item">
                    <MessageSquare size={16} className="text-sky-600 flex-shrink-0" />
                    <div>
                      <div className="support-role">Official Project Email</div>
                      <a href="mailto:info@htiautomation.com" className="support-contact-link">info@htiautomation.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section section">
          <div className="container">
            <div className="section-title-wrap">
              <div className="section-tag">
                <Layers size={14} />
                <span>Related Solutions</span>
              </div>
              <h3 className="section-heading text-2xl font-bold text-slate-900 mt-2">
                Explore More in <span className="gradient-text-red">{product.category}</span>
              </h3>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="related-card">
                  <div className="related-card-badge">{rel.subcategory}</div>
                  <h4 className="related-card-title">{rel.name}</h4>
                  <p className="related-card-summary">{rel.workSummary}</p>
                  <button 
                    className="btn btn-outline-cyan btn-sm mt-4 w-full"
                    onClick={() => {
                      onNavigate('product', rel.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span>View Specifications</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
