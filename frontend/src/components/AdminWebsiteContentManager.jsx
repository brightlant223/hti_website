import React, { useState } from 'react';
import './AdminWebsiteContent.css';
import {
  Award, Type, FileText, Compass, MessageSquare, BarChart3,
  CheckCircle2, CheckCircle, RefreshCw, Calendar, Layers,
  Building2, Phone, PhoneCall, Mail, LifeBuoy, MapPin,
  Building, Hash, Clock, Plus, Edit3, Trash2, Star, X
} from 'lucide-react';

export default function AdminWebsiteContentManager({
  websiteContent = {},
  contentSubTab = 'homepage_hero',
  setContentSubTab,
  onSaveSection,
  showFeedback,
  currentUser = 'admin'
}) {
  const [internalTab, setInternalTab] = useState('homepage_hero');
  const activeTab = contentSubTab || internalTab;

  const handleTabChange = (tab) => {
    if (setContentSubTab) {
      setContentSubTab(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  // Testimonials state for Tab 4
  const [testimonialsModalOpen, setTestimonialsModalOpen] = useState(false);
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState(null); // null for new, number for edit
  const [testimonialForm, setTestimonialForm] = useState({
    author: '',
    company: '',
    location: '',
    rating: 5,
    quote: ''
  });

  // Extract current section data
  const heroData = websiteContent['homepage_hero']?.data || {};
  const profileData = websiteContent['company_profile']?.data || {};
  const contactData = websiteContent['contact_details']?.data || {};
  const rawTestimonials = websiteContent['testimonials']?.data;
  const testimonialsList = Array.isArray(rawTestimonials) ? rawTestimonials : [];

  // Form submit handler for standard sections
  const handleFormSubmit = async (e, sectionKey, extraFields = {}) => {
    e.preventDefault();
    setIsSaving(true);
    const form = e.target;
    const formData = new FormData(form);
    const currentData = websiteContent[sectionKey]?.data || {};

    const updated = {
      ...currentData,
      ...extraFields
    };

    formData.forEach((val, key) => {
      updated[key] = typeof val === 'string' ? val.trim() : val;
    });

    try {
      if (onSaveSection) {
        await onSaveSection(sectionKey, updated);
      }
    } catch (err) {
      if (showFeedback) showFeedback('error', 'Failed to save section content.');
    } finally {
      setIsSaving(false);
    }
  };

  // Testimonials Management
  const handleOpenAddTestimonial = () => {
    setEditingTestimonialIndex(null);
    setTestimonialForm({
      author: '',
      company: '',
      location: '',
      rating: 5,
      quote: ''
    });
    setTestimonialsModalOpen(true);
  };

  const handleOpenEditTestimonial = (item, index) => {
    setEditingTestimonialIndex(index);
    setTestimonialForm({
      author: item.author || '',
      company: item.company || '',
      location: item.location || '',
      rating: item.rating || 5,
      quote: item.quote || ''
    });
    setTestimonialsModalOpen(true);
  };

  const handleSaveTestimonialModal = async (e) => {
    e.preventDefault();
    if (!testimonialForm.author.trim() || !testimonialForm.quote.trim()) {
      if (showFeedback) showFeedback('error', 'Please enter both an author/title and quote content.');
      return;
    }

    const updatedList = [...testimonialsList];
    const newEntry = {
      author: testimonialForm.author.trim(),
      company: testimonialForm.company.trim(),
      location: testimonialForm.location.trim(),
      rating: Number(testimonialForm.rating) || 5,
      quote: testimonialForm.quote.trim()
    };

    if (editingTestimonialIndex !== null) {
      updatedList[editingTestimonialIndex] = newEntry;
    } else {
      updatedList.push(newEntry);
    }

    setIsSaving(true);
    try {
      if (onSaveSection) {
        await onSaveSection('testimonials', updatedList);
      }
      setTestimonialsModalOpen(false);
    } catch (err) {
      if (showFeedback) showFeedback('error', 'Failed to update testimonials.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTestimonial = async (indexToDelete) => {
    if (!window.confirm('Are you sure you want to remove this client endorsement?')) return;
    const updatedList = testimonialsList.filter((_, idx) => idx !== indexToDelete);
    setIsSaving(true);
    try {
      if (onSaveSection) {
        await onSaveSection('testimonials', updatedList);
      }
    } catch (err) {
      if (showFeedback) showFeedback('error', 'Failed to delete testimonial.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="adm-wc-container">
      {/* -----------------------------------------------------------------------
          1. CONTENT SECTION TABS (CONCEPT 1 HORIZONTAL PILLS)
          ----------------------------------------------------------------------- */}
      <div className="adm-wc-tabs-bar">
        <button
          type="button"
          className={`adm-wc-tab-btn ${activeTab === 'homepage_hero' ? 'active' : ''}`}
          onClick={() => handleTabChange('homepage_hero')}
        >
          <span>1. Homepage Hero & Headlines</span>
        </button>

        <button
          type="button"
          className={`adm-wc-tab-btn ${activeTab === 'company_profile' ? 'active' : ''}`}
          onClick={() => handleTabChange('company_profile')}
        >
          <span>2. About Us & Achievements</span>
        </button>

        <button
          type="button"
          className={`adm-wc-tab-btn ${activeTab === 'contact_details' ? 'active' : ''}`}
          onClick={() => handleTabChange('contact_details')}
        >
          <span>3. Headquarters & Contact Info</span>
        </button>

        <button
          type="button"
          className={`adm-wc-tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
          onClick={() => handleTabChange('testimonials')}
        >
          <span>4. Client Testimonials</span>
        </button>
      </div>

      {/* -----------------------------------------------------------------------
          TAB 1: HOMEPAGE HERO SECTION & VALUE PROPOSITION (EXACT CONCEPT 1 MATCH)
          ----------------------------------------------------------------------- */}
      {activeTab === 'homepage_hero' && (
        <div className="adm-wc-card">
          <div className="adm-wc-card-header">
            <h2 className="adm-wc-title">Homepage Hero Section & Value Proposition</h2>
            <p className="adm-wc-subtitle">
              Update headlines, hero badges, and primary action buttons live without code deployments.
            </p>
          </div>

          <form key="form-hero" onSubmit={(e) => handleFormSubmit(e, 'homepage_hero')}>
            {/* Row 1: Hero Badge & Primary Headline */}
            <div className="adm-wc-grid-2col">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Hero Badge / Accreditation</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Award size={18} />
                  </div>
                  <input
                    name="badge"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={heroData.badge || 'ISO 9001:2015 & CE Certified Cleanroom & Security Systems'}
                    placeholder="e.g. ISO 9001:2015 & CE Certified"
                    required
                  />
                </div>
                <span className="adm-wc-helper">e.g. ISO certification, CE certified, industry standards</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Primary Headline</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Type size={18} />
                  </div>
                  <input
                    name="title"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={heroData.title || 'Intelligent Cleanroom Automation, Fire Safety & Security Systems'}
                    placeholder="e.g. Intelligent Cleanroom Automation"
                    required
                  />
                </div>
                <span className="adm-wc-helper">Main headline for the homepage hero section</span>
              </div>
            </div>

            {/* Row 2: Hero Subtitle / Paragraph */}
            <div className="adm-wc-row-full">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Hero Subtitle / Paragraph</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon top-align">
                    <FileText size={18} />
                  </div>
                  <textarea
                    name="subtitle"
                    rows={3}
                    className="adm-wc-textarea-control"
                    defaultValue={heroData.subtitle || ''}
                    placeholder="Short description about your core value proposition..."
                    required
                  />
                </div>
                <span className="adm-wc-helper">Short description about your core value proposition</span>
              </div>
            </div>

            {/* Row 3: Primary CTA Button & Secondary CTA Button */}
            <div className="adm-wc-grid-2col">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Primary CTA Button</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Compass size={18} />
                  </div>
                  <input
                    name="cta_primary_text"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={heroData.cta_primary_text || 'Explore Product Catalogue'}
                    placeholder="e.g. Explore Product Catalogue"
                  />
                </div>
                <span className="adm-wc-helper">Text for primary call-to-action button</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Secondary CTA Button</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <MessageSquare size={18} />
                  </div>
                  <input
                    name="cta_secondary_text"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={heroData.cta_secondary_text || 'Request Engineering Quote'}
                    placeholder="e.g. Request Engineering Quote"
                  />
                </div>
                <span className="adm-wc-helper">Text for secondary call-to-action button</span>
              </div>
            </div>

            {/* Row 4: Installations Stat & Satisfaction Stat */}
            <div className="adm-wc-grid-2col">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Installations Stat</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <BarChart3 size={18} />
                  </div>
                  <input
                    name="stat_installations"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={heroData.stat_installations || '450+'}
                    placeholder="e.g. 450+"
                  />
                </div>
                <span className="adm-wc-helper">e.g. 450+, 1000+ installations</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Satisfaction Stat</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <CheckCircle2 size={18} />
                  </div>
                  <input
                    name="stat_satisfaction"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={heroData.stat_satisfaction || '99.8%'}
                    placeholder="e.g. 99.8%"
                  />
                </div>
                <span className="adm-wc-helper">e.g. 99.8% customer satisfaction</span>
              </div>
            </div>

            {/* Publish Button */}
            <button type="submit" className="adm-wc-btn-publish" disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw size={17} className="adm-wc-spinner" />
                  <span>Publishing Changes...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={17} />
                  <span>Publish Hero Changes Live</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TAB 2: ABOUT US & ACHIEVEMENTS (COMPANY PROFILE)
          ----------------------------------------------------------------------- */}
      {activeTab === 'company_profile' && (
        <div className="adm-wc-card">
          <div className="adm-wc-card-header">
            <h2 className="adm-wc-title">About Us & Company Engineering Credentials</h2>
            <p className="adm-wc-subtitle">
              Manage official corporate mission, certifications, and track record counters.
            </p>
          </div>

          <form key="form-profile" onSubmit={(e) => handleFormSubmit(e, 'company_profile')}>
            {/* Row 1: About Us Headline */}
            <div className="adm-wc-row-full">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>About Us Headline</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Type size={18} />
                  </div>
                  <input
                    name="headline"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={profileData.headline || 'Engineering Precision & Industrial Reliability'}
                    placeholder="e.g. Engineering Precision & Industrial Reliability"
                    required
                  />
                </div>
                <span className="adm-wc-helper">Main headline for the company profile and about us section</span>
              </div>
            </div>

            {/* Row 2: Company Overview Description */}
            <div className="adm-wc-row-full">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Company Overview Description</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon top-align">
                    <FileText size={18} />
                  </div>
                  <textarea
                    name="description"
                    rows={4}
                    className="adm-wc-textarea-control"
                    defaultValue={profileData.description || ''}
                    placeholder="Detailed corporate background and engineering ethos..."
                    required
                  />
                </div>
                <span className="adm-wc-helper">Comprehensive corporate background narrative</span>
              </div>
            </div>

            {/* Row 3: Years in Business & Cleanrooms Secured */}
            <div className="adm-wc-grid-2col">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Years in Business</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Calendar size={18} />
                  </div>
                  <input
                    name="years_in_business"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={profileData.years_in_business || '12'}
                    placeholder="e.g. 12"
                  />
                </div>
                <span className="adm-wc-helper">Years of manufacturing and integration experience</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Cleanrooms Secured</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Layers size={18} />
                  </div>
                  <input
                    name="cleanrooms_secured"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={profileData.cleanrooms_secured || '850+'}
                    placeholder="e.g. 850+"
                  />
                </div>
                <span className="adm-wc-helper">Cleanroom airlock and pass box installations</span>
              </div>
            </div>

            {/* Row 4: Corporate Clients & Certifications Text */}
            <div className="adm-wc-grid-2col">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Corporate Clients</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Building2 size={18} />
                  </div>
                  <input
                    name="corporate_clients"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={profileData.corporate_clients || '120+'}
                    placeholder="e.g. 120+"
                  />
                </div>
                <span className="adm-wc-helper">Active pharma, industrial and institutional clients</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Certifications Text</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Award size={18} />
                  </div>
                  <input
                    name="certifications"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={profileData.certifications || 'ISO 9001:2015, CE Certified'}
                    placeholder="e.g. ISO 9001:2015, CE Certified"
                  />
                </div>
                <span className="adm-wc-helper">Standard industry accreditation badges</span>
              </div>
            </div>

            {/* Publish Button */}
            <button type="submit" className="adm-wc-btn-publish" disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw size={17} className="adm-wc-spinner" />
                  <span>Updating Profile...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={17} />
                  <span>Update Corporate Profile</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TAB 3: HEADQUARTERS & CONTACT INFO (CONTACT DETAILS)
          ----------------------------------------------------------------------- */}
      {activeTab === 'contact_details' && (
        <div className="adm-wc-card">
          <div className="adm-wc-card-header">
            <h2 className="adm-wc-title">Official Contact Details & Physical Headquarters</h2>
            <p className="adm-wc-subtitle">
              Keep telephone lines, support inboxes, and postal addresses up to date.
            </p>
          </div>

          <form key="form-contact" onSubmit={(e) => handleFormSubmit(e, 'contact_details')}>
            {/* Row 1: Primary Hotline & Secondary Phone */}
            <div className="adm-wc-grid-2col">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Primary Hotline</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Phone size={18} />
                  </div>
                  <input
                    name="primary_phone"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={contactData.primary_phone || '+91 9892756077'}
                    placeholder="+91 9892756077"
                  />
                </div>
                <span className="adm-wc-helper">Main sales and corporate inquiry line</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Secondary / Direct Phone</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <PhoneCall size={18} />
                  </div>
                  <input
                    name="secondary_phone"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={contactData.secondary_phone || '+91 9594917010'}
                    placeholder="+91 9594917010"
                  />
                </div>
                <span className="adm-wc-helper">Secondary direct line or mobile dispatch</span>
              </div>
            </div>

            {/* Row 2: Sales Inquiries Email & Technical Support Email */}
            <div className="adm-wc-grid-2col">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Sales Inquiries Email</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Mail size={18} />
                  </div>
                  <input
                    name="sales_email"
                    type="email"
                    className="adm-wc-input-control"
                    defaultValue={contactData.sales_email || 'sales@htisystems.in'}
                    placeholder="sales@htisystems.in"
                  />
                </div>
                <span className="adm-wc-helper">Quotation requests and tender inquiries</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Technical Support Email</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <LifeBuoy size={18} />
                  </div>
                  <input
                    name="support_email"
                    type="email"
                    className="adm-wc-input-control"
                    defaultValue={contactData.support_email || 'hti@htisystems.in'}
                    placeholder="hti@htisystems.in"
                  />
                </div>
                <span className="adm-wc-helper">Post-commissioning engineering and AMC assistance</span>
              </div>
            </div>

            {/* Row 3: Street Address, City, PIN Code */}
            <div className="adm-wc-grid-3col">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Street Address</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <MapPin size={18} />
                  </div>
                  <input
                    name="address_line"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={contactData.address_line || 'Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC'}
                    placeholder="Facility/office street address"
                  />
                </div>
                <span className="adm-wc-helper">Official registered and corporate address</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>City</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Building size={18} />
                  </div>
                  <input
                    name="city"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={contactData.city || 'Turbhe, Navi Mumbai'}
                    placeholder="Turbhe, Navi Mumbai"
                  />
                </div>
                <span className="adm-wc-helper">City & State</span>
              </div>

              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>PIN Code</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Hash size={18} />
                  </div>
                  <input
                    name="pincode"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={contactData.pincode || '400703'}
                    placeholder="400703"
                  />
                </div>
                <span className="adm-wc-helper">Postal code</span>
              </div>
            </div>

            {/* Row 4: Operating Working Hours */}
            <div className="adm-wc-row-full">
              <div className="adm-wc-field-group">
                <label className="adm-wc-label">
                  <span>Operating Working Hours</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Clock size={18} />
                  </div>
                  <input
                    name="working_hours"
                    type="text"
                    className="adm-wc-input-control"
                    defaultValue={contactData.working_hours || 'Monday - Saturday: 9:00 AM - 6:30 PM'}
                    placeholder="Monday - Saturday: 9:00 AM - 6:30 PM"
                  />
                </div>
                <span className="adm-wc-helper">Operating hours displayed on public contact pages</span>
              </div>
            </div>

            {/* Publish Button */}
            <button type="submit" className="adm-wc-btn-publish" disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw size={17} className="adm-wc-spinner" />
                  <span>Updating Details...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={17} />
                  <span>Update Contact Information</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TAB 4: CLIENT TESTIMONIALS (CONCEPT 1 MODERN ENDORSEMENTS LIST)
          ----------------------------------------------------------------------- */}
      {activeTab === 'testimonials' && (
        <div className="adm-wc-card">
          <div className="adm-wc-card-header">
            <div className="adm-wc-testimonials-header">
              <div>
                <h2 className="adm-wc-title">Customer Endorsements & Client Testimonials</h2>
                <p className="adm-wc-subtitle">
                  Published recommendations from engineering directors and plant heads.
                </p>
              </div>
              <button
                type="button"
                className="adm-wc-btn-secondary"
                onClick={handleOpenAddTestimonial}
              >
                <Plus size={15} />
                <span>Add Testimonial</span>
              </button>
            </div>
          </div>

          {testimonialsList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
              <FileText size={40} style={{ color: '#cbd5e1', marginBottom: '10px' }} />
              <p style={{ margin: 0, fontSize: '0.92rem' }}>No client testimonials currently published.</p>
              <button
                type="button"
                className="adm-wc-btn-secondary"
                style={{ marginTop: '14px' }}
                onClick={handleOpenAddTestimonial}
              >
                <Plus size={14} />
                <span>Create First Endorsement</span>
              </button>
            </div>
          ) : (
            <div className="adm-wc-testimonials-grid">
              {testimonialsList.map((t, idx) => (
                <div key={idx} className="adm-wc-testimonial-card">
                  <div>
                    <div className="adm-wc-testimonial-top">
                      <div>
                        <div className="adm-wc-testimonial-author">{t.author}</div>
                        <div className="adm-wc-testimonial-company">{t.company}</div>
                      </div>
                      <div className="adm-wc-testimonial-stars" title={`${t.rating || 5} Stars`}>
                        {Array.from({ length: t.rating || 5 }).map((_, sIdx) => (
                          <Star key={sIdx} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>

                    <p className="adm-wc-testimonial-quote">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="adm-wc-testimonial-footer">
                    <span className="adm-wc-testimonial-loc">
                      {t.location ? (
                        <>
                          <MapPin size={12} />
                          <span>{t.location}</span>
                        </>
                      ) : (
                        <span>Verified Client</span>
                      )}
                    </span>

                    <div className="adm-wc-testimonial-actions">
                      <button
                        type="button"
                        className="adm-wc-icon-btn"
                        onClick={() => handleOpenEditTestimonial(t, idx)}
                        title="Edit Testimonial"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        type="button"
                        className="adm-wc-icon-btn danger"
                        onClick={() => handleDeleteTestimonial(idx)}
                        title="Delete Testimonial"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TESTIMONIAL ADD / EDIT MODAL (CLEAN LIGHT DESIGN)
          ----------------------------------------------------------------------- */}
      {testimonialsModalOpen && (
        <div className="adm-wc-modal-backdrop" onClick={() => setTestimonialsModalOpen(false)}>
          <div className="adm-wc-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="adm-wc-modal-header">
              <h3 className="adm-wc-modal-title">
                {editingTestimonialIndex !== null ? 'Edit Client Testimonial' : 'Add New Client Endorsement'}
              </h3>
              <button
                type="button"
                className="adm-wc-modal-close"
                onClick={() => setTestimonialsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonialModal}>
              <div className="adm-wc-field-group" style={{ marginBottom: '14px' }}>
                <label className="adm-wc-label">
                  <span>Author / Executive Title</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Type size={17} />
                  </div>
                  <input
                    type="text"
                    className="adm-wc-input-control"
                    placeholder="e.g. Vice President - Engineering"
                    value={testimonialForm.author}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="adm-wc-field-group" style={{ marginBottom: '14px' }}>
                <label className="adm-wc-label">
                  <span>Organization / Company Name</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon">
                    <Building2 size={17} />
                  </div>
                  <input
                    type="text"
                    className="adm-wc-input-control"
                    placeholder="e.g. Leading Pharmaceutical Multinational"
                    value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="adm-wc-grid-2col" style={{ marginBottom: '14px' }}>
                <div className="adm-wc-field-group">
                  <label className="adm-wc-label">
                    <span>Location</span>
                  </label>
                  <div className="adm-wc-input-box">
                    <div className="adm-wc-input-icon">
                      <MapPin size={17} />
                    </div>
                    <input
                      type="text"
                      className="adm-wc-input-control"
                      placeholder="e.g. Navi Mumbai, Maharashtra"
                      value={testimonialForm.location}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="adm-wc-field-group">
                  <label className="adm-wc-label">
                    <span>Rating (Stars)</span>
                  </label>
                  <div className="adm-wc-input-box">
                    <div className="adm-wc-input-icon">
                      <Star size={17} fill="#f59e0b" color="#f59e0b" />
                    </div>
                    <select
                      className="adm-wc-input-control"
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                    >
                      <option value={5}>5 Stars (Exceptional)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Satisfactory)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="adm-wc-field-group" style={{ marginBottom: '16px' }}>
                <label className="adm-wc-label">
                  <span>Client Endorsement / Quote</span>
                </label>
                <div className="adm-wc-input-box">
                  <div className="adm-wc-input-icon top-align">
                    <FileText size={17} />
                  </div>
                  <textarea
                    rows={4}
                    className="adm-wc-textarea-control"
                    placeholder="Enter the client's official recommendation..."
                    value={testimonialForm.quote}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="adm-wc-modal-actions">
                <button
                  type="button"
                  className="adm-wc-btn-cancel"
                  onClick={() => setTestimonialsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="adm-wc-btn-publish"
                  style={{ marginTop: 0 }}
                  disabled={isSaving}
                >
                  <CheckCircle size={16} />
                  <span>{editingTestimonialIndex !== null ? 'Save Changes' : 'Add Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
