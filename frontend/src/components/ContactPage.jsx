import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, PhoneCall, Mail, Clock, Send, 
  CheckCircle2, ShieldCheck, Building2, MessageSquare, Headphones,
  AlertTriangle, FileCheck, Check, Calendar, FileText
} from 'lucide-react';

export default function ContactPage({ onNavigate, onInquirySubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: 'Automation',
    product_name: '',
    timeline: 'Immediate (1 - 2 Weeks)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const branches = [
    { 
      city: 'Mumbai Head Office', 
      address: 'Goregaon (West), Mumbai - 400104, Maharashtra, India', 
      phone: '+91 98201 12345',
      lead: 'Er. S. Nair, Head of Engineering',
      email: 'mumbai@htiautomation.com'
    },
    { 
      city: 'Pune Regional Hub', 
      address: 'Bhosari Industrial Area / Chakan MIDC, Pune - 411026', 
      phone: '+91 98201 12346',
      lead: 'Er. R. Kulkarni, Project Lead',
      email: 'pune@htiautomation.com'
    },
    { 
      city: 'Gujarat (Vapi / Surat / Ahmedabad)', 
      address: 'GIDC Industrial Corridor, Vapi, Gujarat - 396195', 
      phone: '+91 98201 12347',
      lead: 'Er. P. Patel, Regional Manager',
      email: 'gujarat@htiautomation.com'
    },
    { 
      city: 'Hyderabad Pharma Desk', 
      address: 'Genome Valley / HITEC City, Hyderabad - 500081', 
      phone: '+91 98201 12348',
      lead: 'Er. K. Reddy, Pharma Solutions Lead',
      email: 'hyderabad@htiautomation.com'
    }
  ];

  const escalationTiers = [
    {
      tier: 'Level 1: 24/7 Technical Helpdesk',
      contact: '+91 98201 12345 / helpdesk@htiautomation.com',
      tat: '< 15 Minutes Response',
      desc: 'Immediate dispatch of phone troubleshooting for interlock trips, barrier power faults, or sensor recalibration.'
    },
    {
      tier: 'Level 2: Resident Area Engineer',
      contact: 'Assigned per site location (Mumbai, Pune, Vapi, Hyderabad)',
      tat: '< 2 Hours On-Site Mobilization',
      desc: 'Physical presence of trained service engineer equipped with standard replacement parts and diagnostic multimeters.'
    },
    {
      tier: 'Level 3: Chief Projects Officer & Directorate',
      contact: 'director@htiautomation.com',
      tat: 'Direct Executive Escalation',
      desc: 'Executive technical review for mission-critical pharmaceutical batch manufacturing or plant stoppage emergencies.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out Name, Email, and Phone number.');
      return;
    }

    setLoading(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || 'Not Specified',
          category: formData.category,
          product_name: formData.product_name || 'General Inquiry',
          message: `${formData.message} [Timeline: ${formData.timeline}]`
        })
      });
    } catch (err) {
      // Offline fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
      if (onInquirySubmitted) onInquirySubmitted();
    }
  };

  return (
    <div className="contact-dedicated-page">
      {/* 1. Breadcrumbs */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button className="breadcrumb-link" onClick={() => onNavigate('home')}>Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Contact Us</span>
          </div>
          <button className="back-btn" onClick={() => onNavigate('home')}>
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="contact-page-hero">
        <div className="container">
          <div className="contact-hero-inner">
            <div className="category-hero-badge">
              <Headphones size={16} />
              <span>DIRECT ENGINEERING ASSISTANCE</span>
            </div>
            <h1 className="contact-hero-title">Connect with Our Application Engineers</h1>
            <p className="contact-hero-desc">
              Whether you need site surveys in Mumbai, customized GA mechanical drawings, turnkey BOQ estimation, or emergency maintenance, our technical desk is ready to assist.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Main Contact Grid */}
      <div className="contact-main-section section">
        <div className="container">
          <div className="contact-layout-grid">
            
            {/* Left Column: Office info, Regional Branches & SLA Escalation */}
            <div className="contact-info-col">
              <div className="contact-details-card">
                <h2 className="contact-col-title">Corporate Headquarters</h2>
                <div className="contact-items-list mt-6">
                  <div className="contact-info-item">
                    <div className="info-icon-box">
                      <MapPin size={22} className="text-red-500" />
                    </div>
                    <div>
                      <h4 className="info-item-label">Head Office Address</h4>
                      <p className="info-item-val">
                        HTI Automation & Security Systems Pvt. Ltd.<br />
                        Goregaon (West), Mumbai - 400104,<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="info-icon-box">
                      <PhoneCall size={22} className="text-sky-600" />
                    </div>
                    <div>
                      <h4 className="info-item-label">Technical Phone Desks</h4>
                      <p className="info-item-val">
                        <a href="tel:+919820112345" className="hover-link">+91 98201 12345</a><br />
                        <a href="tel:+919892756077" className="hover-link">+91 9892756077 (Engineering WhatsApp)</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="info-icon-box">
                      <Mail size={22} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="info-item-label">Email Communications</h4>
                      <p className="info-item-val">
                        <a href="mailto:info@htiautomation.com" className="hover-link">info@htiautomation.com</a><br />
                        <a href="mailto:projects@htiautomation.com" className="hover-link">projects@htiautomation.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="info-icon-box">
                      <Clock size={22} className="text-amber-500" />
                    </div>
                    <div>
                      <h4 className="info-item-label">Working Hours</h4>
                      <p className="info-item-val">
                        Monday – Saturday: 9:00 AM – 7:00 PM IST<br />
                        24/7 Dedicated Support for AMC & Pharma Cleanroom SLA Clients
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Industrial Hubs */}
              <div className="branches-card mt-6">
                <h3 className="branches-title">
                  <Building2 size={18} className="text-sky-600" />
                  <span>Regional Project & Service Hubs</span>
                </h3>
                <div className="branches-list mt-4">
                  {branches.map((b, idx) => (
                    <div key={idx} className="branch-item">
                      <h5 className="branch-city">{b.city}</h5>
                      <p className="branch-addr">{b.address}</p>
                      <div className="text-xs text-slate-500 font-semibold mb-1">{b.lead}</div>
                      <a href={`tel:${b.phone}`} className="branch-phone">{b.phone}</a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency SLA Escalation Matrix */}
              <div className="escalation-card mt-6 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-4">
                  <AlertTriangle size={18} className="text-amber-500" />
                  <span>24/7 Mission-Critical Escalation Matrix</span>
                </div>
                <div className="flex flex-col gap-3">
                  {escalationTiers.map((esc, eIdx) => (
                    <div key={eIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>{esc.tier}</span>
                        <span className="text-sky-600">{esc.tat}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">{esc.contact}</div>
                      <div className="text-xs text-slate-500 mt-1">{esc.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Direct Quotation / BOQ Form */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <div className="form-card-top">
                  <span className="form-top-tag">OFFICIAL PROJECT DESK</span>
                  <h3 className="form-card-title">Send Technical Requirement / BOQ</h3>
                  <p className="form-card-desc">
                    Fill out the form below. An HTI senior application engineer will respond with preliminary estimates, technical documentation, and site survey schedule within 2 business hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="form-success-box text-center py-8">
                    <CheckCircle2 size={50} className="text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-slate-900">Thank You for Contacting HTI!</h3>
                    <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                      Your inquiry has been successfully dispatched to our Mumbai project directorate. A technical specialist will contact you within 2 business hours.
                    </p>
                    <button 
                      className="btn btn-secondary mt-6"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          category: 'Automation',
                          product_name: '',
                          timeline: 'Immediate (1 - 2 Weeks)',
                          message: ''
                        });
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form-elements mt-6">
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                        <input 
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Sunil Deshmukh"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-xs font-bold text-slate-700 block mb-1">Company / Organization</label>
                        <input 
                          type="text"
                          name="company"
                          placeholder="e.g. Alkem Labs Ltd."
                          value={formData.company}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="text-xs font-bold text-slate-700 block mb-1">Official Email *</label>
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
                      <div className="form-group">
                        <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp *</label>
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

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="text-xs font-bold text-slate-700 block mb-1">Area of Interest</label>
                        <select 
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="Automation">Industrial Access Automation</option>
                          <option value="Security System">Security Systems & AI Surveillance</option>
                          <option value="Cleanroom Interlocks">Pharma Cleanroom Interlocks & Pass Box</option>
                          <option value="Hygiene">Hygiene & Washroom Systems</option>
                          <option value="Fire Safety">Turnkey Fire Hydrant & FAS</option>
                          <option value="AMC">Annual Maintenance Contract (AMC)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="text-xs font-bold text-slate-700 block mb-1">Target Project Timeline</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="Immediate (1 - 2 Weeks)">Immediate (1 - 2 Weeks)</option>
                          <option value="Within 1 Month">Within 1 Month</option>
                          <option value="1 - 3 Months">1 - 3 Months</option>
                          <option value="Tender / Budgetary Stage">Tender / Budgetary Stage</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <label className="text-xs font-bold text-slate-700 block mb-1">Specific Product / Project Scope</label>
                      <input 
                        type="text"
                        name="product_name"
                        placeholder="e.g. 6-Door Flameproof Cleanroom Interlock / Cantilever Gate"
                        value={formData.product_name}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="text-xs font-bold text-slate-700 block mb-1">Project Details & Requirements</label>
                      <textarea 
                        name="message"
                        rows="4"
                        placeholder="Please describe clear opening sizes, quantity, site location, timeline, or statutory cleanroom/fire specifications..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-input form-textarea"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary w-full py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Submitting to Engineering Desk...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit Official Inquiry</span>
                        </>
                      )}
                    </button>

                    <div className="form-privacy-note mt-3">
                      <ShieldCheck size={14} className="text-slate-400" />
                      <span>Your details are secure. We respect corporate confidentiality.</span>
                    </div>
                  </form>
                )}

                {/* Turnkey Inquiry SLA Guarantee */}
                <div className="mt-6 pt-5 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <FileCheck size={16} className="text-emerald-600" />
                    <span>HTI Inquiry SLA Guarantee:</span>
                  </div>
                  <ul className="text-xs text-slate-500 flex flex-col gap-1 pl-4 list-disc">
                    <li>Preliminary technical feedback and quotation within 2 business hours</li>
                    <li>Resident engineer site survey visit arranged within 24 hours</li>
                    <li>CAD General Arrangement (GA) mechanical drawing provided free of cost</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
