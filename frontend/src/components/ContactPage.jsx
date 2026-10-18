import React, { useState } from 'react';
<<<<<<< HEAD
import { 
  ArrowLeft, MapPin, PhoneCall, Mail, Clock, Send, 
  CheckCircle2, ShieldCheck, Building2, MessageSquare, Headphones,
  AlertTriangle, FileCheck, Check, Calendar, FileText, Sparkles,
  ExternalLink, Calculator, Layers, Zap, Download, Compass,
  ChevronDown, ChevronUp, Loader2, ArrowRight, Phone, Wrench, Handshake,
  Paperclip, Trash2, CheckCircle, Award, Shield, FileSpreadsheet,
  Globe, UserCheck, Timer, Cpu, Plus, Minus, CheckSquare, ChevronRight
} from 'lucide-react';
import './Contact.css';

// Regional Industrial & Service Hubs Data
const REGIONAL_HUBS = [
  {
    id: 'mumbai',
    name: 'Mumbai Central HQ & R&D Hub',
    city: 'Mumbai Headquarters',
    tagline: 'Primary Technical Directorate & Engineering Center',
    address: '401 CR-4, Ram Mandir Road, Goregaon (West), Mumbai – 400104, Maharashtra',
    lead: 'Er. S. Nair (Head of Operations & Commissioning)',
    phone: '+91 9992756077',
    altPhone: '+91 9594917010',
    email: 'mumbai@htisystems.in',
    tat: '< 2 Hours Mobilization',
    engineersOnDuty: 6,
    coverage: 'Mumbai MMR, Navi Mumbai, Thane, Palghar, Taloja & Raigad Belt',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.895318182283!2d72.84365797585093!3d19.156059249454157!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3be7b7b3b3a6c23f%3A0x7d6f5f3e4f3a4b0!2sRam%20Mandir%20Rd%2C%20Goregaon%20West%2C%20Mumbai%2C%20Maharashtra%20400104!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin',
    mapQuery: 'https://maps.google.com/?q=Ram+Mandir+Road+Goregaon+West+Mumbai+400104'
  },
  {
    id: 'pune',
    name: 'Pune Industrial & Auto Corridor Desk',
    city: 'Pune MIDC',
    tagline: 'Automotive & Heavy Engineering Project Cell',
    address: 'Bhosari Industrial Estate, PCMC / Chakan Auto Corridor, Pune – 411026',
    lead: 'Er. R. Kulkarni (Regional Project Lead)',
    phone: '+91 9892756077',
    altPhone: '+91 9992756077',
    email: 'pune@htisystems.in',
    tat: '< 3 Hours Mobilization',
    engineersOnDuty: 4,
    coverage: 'Chakan MIDC, Bhosari, Talegaon, Ranjangaon, Hinjawadi & Shirwal',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121058.92836647493!2d73.780565!3d18.629783!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3bc2b842918933b9%3A0xb3e1c6b3b0d2d3a0!2sBhosari%20Industrial%20Area%2C%20Pune!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin',
    mapQuery: 'https://maps.google.com/?q=Bhosari+Industrial+Area+Pune'
  },
  {
    id: 'gujarat',
    name: 'Gujarat Chemical & Pharma Hub',
    city: 'Vapi / Sanand GIDC',
    tagline: 'Pharmaceutical API & Chemical Corridor Hub',
    address: 'GIDC Industrial Corridor, Vapi – 396195 / Sanand GIDC, Ahmedabad',
    lead: 'Er. P. Patel (Western Regional Manager)',
    phone: '+91 9992756077',
    altPhone: '+91 9594917010',
    email: 'gujarat@htisystems.in',
    tat: '< 4 Hours Mobilization',
    engineersOnDuty: 3,
    coverage: 'Vapi, Valsad, Ankleshwar, Bharuch, Vadodara, Dahej & Sanand',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119565.05051952402!2d72.858276!3d20.372551!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3be0cfb1e4f4c2c7%3A0x7d3e91129b82875a!2sGIDC%2C%20Vapi%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin',
    mapQuery: 'https://maps.google.com/?q=GIDC+Industrial+Area+Vapi'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad Pharma & Tech Desk',
    city: 'Hyderabad Pharma City',
    tagline: 'Biotech Cleanroom & Genome Valley Cell',
    address: 'Genome Valley / HITEC City Corridor, Hyderabad – 500081, Telangana',
    lead: 'Er. K. Reddy (Pharma Cleanroom Specialist)',
    phone: '+91 9594917010',
    altPhone: '+91 9892756077',
    email: 'hyderabad@htisystems.in',
    tat: '< 4 Hours Technical SLA',
    engineersOnDuty: 3,
    coverage: 'Genome Valley, Shamirpet, Pashamylaram, Cherlapally & HITEC City',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121774.55627885744!2d78.508581!3d17.653424!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3bcb870428d0111f%3A0x89b6572e90c65d64!2sGenome%20Valley%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin',
    mapQuery: 'https://maps.google.com/?q=Genome+Valley+Hyderabad'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru & South India Project Cell',
    city: 'Bengaluru Industrial Cell',
    tagline: 'Precision Automation & Aerospace Corridor',
    address: 'Peenya Industrial Area / Whitefield Tech Corridor, Bengaluru – 560058',
    lead: 'Er. M. Venkatesh (Southern Projects Desk)',
    phone: '+91 9992756077',
    altPhone: '+91 9594917010',
    email: 'south@htisystems.in',
    tat: 'Scheduled & Emergency Support',
    engineersOnDuty: 3,
    coverage: 'Peenya, Bommasandra, Electronic City, Hosur, Whitefield & Mysuru',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124403.46907578338!2d77.491321!3d13.028751!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3bae3d19128f78d9%3A0x673c683b5f928e4e!2sPeenya%20Industrial%20Area%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin',
    mapQuery: 'https://maps.google.com/?q=Peenya+Industrial+Area+Bengaluru'
  }
];

// Escalation Matrix Data
const ESCALATION_TIERS = [
  {
    level: 'Tier 1',
    tier: '24/7 Tele-Diagnostics Desk',
    tat: '< 15 Min SLA',
    contact: '+91 9892756077',
    role: 'Remote Logic & Electrical Engineering',
    desc: 'Instant diagnostic triage for interlock sequence alarms, power surges, radar sensor alignments, or CCTV telemetry drops.'
  },
  {
    level: 'Tier 2',
    tier: 'Resident Area Engineer Mobilization',
    tat: '< 2 Hours On-Site',
    contact: 'Regional Hub Dispatcher',
    role: 'Field Service & Spares Mobilization',
    desc: 'Certified field technician dispatches with OEM control boards, heavy-duty mag-locks, and diagnostics equipment.'
  },
  {
    level: 'Tier 3',
    tier: 'Chief Projects Officer & Directorate',
    tat: 'Executive Direct Line',
    contact: 'director@htisystems.in',
    role: 'Executive Technical Escalation',
    desc: 'Direct board-level intervention for active pharmaceutical batch audits (USFDA/MHRA/GMP) or critical plant shutdowns.'
  }
];

// Technical Procurement FAQs
const CONTACT_FAQS = [
  {
    q: 'How fast can HTI provide a preliminary BOQ and CAD GA drawing?',
    a: 'For standard setups (automatic sliding doors, boom barriers, cleanroom interlocks up to 6 doors), our engineering desk prepares preliminary BOQs and CAD GA drawings within 2 business hours of receiving clear opening dimensions and specifications.'
  },
  {
    q: 'Are on-site technical surveys free of charge?',
    a: 'Yes. We provide complimentary on-site engineering surveys for corporate facilities, pharmaceutical manufacturing plants, logistics hubs, and commercial campuses across Mumbai MMR, Pune MIDC, Gujarat (Vapi/Sanand), and Hyderabad Genome Valley.'
  },
  {
    q: 'Are HTI cleanroom door interlocks USFDA & GMP compliant?',
    a: 'Absolutely. HTI cleanroom door interlock controllers are engineered specifically for pharmaceutical GMP cleanrooms (Grade A, B, C, D) and comply with USFDA 21 CFR Part 11 audit trails, emergency break-glass override standards, and HVAC air-handling cross-contamination prevention.'
  },
  {
    q: 'Can HTI systems integrate with third-party BMS and SCADA platforms?',
    a: 'Yes. Our automation panels, interlock controllers, and fire alarm interfaces feature Modbus RTU/TCP, BACnet, dry-contact relay outputs, and RESTful telemetry, enabling seamless integration with Honeywell, Siemens, Johnson Controls, Schneider Electric, or custom enterprise BMS platforms.'
  },
  {
    q: 'What warranty and AMC (Annual Maintenance Contract) packages do you offer?',
    a: 'All new HTI installations come with a comprehensive 12-month manufacturer warranty covering parts and labor. We offer customized Comprehensive and Non-Comprehensive AMCs with guaranteed 2-hour breakdown mobilization, quarterly preventive health audits, and spare parts stocking.'
  },
  {
    q: 'Can you participate in government tenders and enterprise RFP/e-tenders?',
    a: 'Yes. HTI is an MSME and ISO 9001:2015 certified company with full statutory compliance (GST, PAN, ESI/PF, GeM portal registration, CA-audited balance sheets). We regularly participate in state and central enterprise tenders across India.'
  }
];

// Enterprise Trust Logos / Clients List
const ENTERPRISE_CLIENTS = [
  { name: 'Cipla', sector: 'Pharmaceuticals' },
  { name: 'Sun Pharma', sector: 'Biotech & API' },
  { name: 'Dr. Reddy’s', sector: 'Life Sciences' },
  { name: 'Larsen & Toubro', sector: 'EPC & Infrastructure' },
  { name: 'Tata Motors', sector: 'Automotive' },
  { name: 'Reliance', sector: 'Energy & Tech' },
  { name: 'Godrej & Boyce', sector: 'Industrial Engineering' },
  { name: 'Alkem Labs', sector: 'Formulations' }
];
=======
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
>>>>>>> 0710e05f1bed027cc54916be9923c844d7e90dec

export default function ContactPage({ onNavigate, onInquirySubmitted }) {
  // Intent Tabs: 'quote' | 'service' | 'survey' | 'partner'
  const [activeIntent, setActiveIntent] = useState('quote');

  // Selected Regional Hub Tab
  const [selectedHub, setSelectedHub] = useState('mumbai');

  // Interactive Scope Builder State
  const [selectedFacility, setSelectedFacility] = useState('Pharma Cleanroom');
  const [selectedSolution, setSelectedSolution] = useState('Cleanroom Interlock System');
  const [doorUnits, setDoorUnits] = useState(4);
  const [selectedTimeline, setSelectedTimeline] = useState('Immediate (< 2 Weeks)');

  // Urgent Emergency Toggle
  const [isEmergencyBreakdown, setIsEmergencyBreakdown] = useState(false);

  // Attachment Simulation State
  const [attachedFiles, setAttachedFiles] = useState([]);

  // Callback Scheduler State
  const [callbackNumber, setCallbackNumber] = useState('');
  const [callbackTime, setCallbackTime] = useState('Within 15 Mins');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
<<<<<<< HEAD
    company: '',
    category: 'Automation',
    product_name: '',
    timeline: 'Immediate (1 - 2 Weeks)',
    siteLocation: '',
    urgencyLevel: 'Standard',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(prev => prev === idx ? null : idx);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
=======
    areaOfInterest: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
>>>>>>> 0710e05f1bed027cc54916be9923c844d7e90dec
  };

  // Quick Scope Injector
  const handleApplyConfig = (facility, solution, units, timeline) => {
    setSelectedFacility(facility);
    setSelectedSolution(solution);
    setDoorUnits(units);
    setSelectedTimeline(timeline);

    const isInterlock = solution.toLowerCase().includes('interlock');
    const computedCategory = isInterlock ? 'Cleanroom Interlocks' : 'Automation';
    const computedProduct = `${solution} (${units} Openings) for ${facility}`;

    setFormData(prev => ({
      ...prev,
      category: computedCategory,
      product_name: computedProduct,
      timeline: timeline,
      urgencyLevel: isEmergencyBreakdown ? 'Emergency Breakdown' : 'Standard',
      message: `Requirement Specifications:
• Facility Type: ${facility}
• Primary Solution: ${solution}
• Total Openings / Doors: ${units} Units
• Execution Window: ${timeline}
• Priority: ${isEmergencyBreakdown ? 'CRITICAL EMERGENCY BREAKDOWN (< 2 Hr SLA)' : 'Standard Project Procurement'}
• Please provide preliminary BOQ, CAD GA Layout, and Compliance Dossier.`
    }));

    const formElement = document.getElementById('contact-action-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intent Tab Switcher
  const handleSelectIntent = (intentKey) => {
    setActiveIntent(intentKey);
    let categoryMap = 'Automation';
    let defaultMsg = '';

    if (intentKey === 'quote') {
      categoryMap = 'Automation';
      defaultMsg = 'Please provide preliminary BOQ, equipment itemization, and CAD general arrangement drawing.';
    } else if (intentKey === 'service') {
      categoryMap = 'AMC';
      defaultMsg = 'Service / Breakdown ticket: Please dispatch an application engineer for on-site diagnostic inspection.';
    } else if (intentKey === 'survey') {
      categoryMap = 'Automation';
      defaultMsg = 'Complimentary Site Survey Request: Please schedule an engineer to inspect dimensions and readiness.';
    } else if (intentKey === 'partner') {
      categoryMap = 'Automation';
      defaultMsg = 'Architect / MEP Consultant / Contractor alliance inquiry regarding project integration.';
    }

    setFormData(prev => ({
      ...prev,
      category: categoryMap,
      message: prev.message || defaultMsg
    }));
  };

  // File Upload Simulator
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const mapped = files.map(f => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB'
    }));
    setAttachedFiles(prev => [...prev, ...mapped]);
  };

  const handleAddSampleAttachment = (filename, size) => {
    if (attachedFiles.some(f => f.name === filename)) return;
    setAttachedFiles(prev => [...prev, { name: filename, size }]);
  };

  const handleRemoveAttachment = (idx) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // Callback Form
  const handleScheduleCallback = (e) => {
    e.preventDefault();
    if (!callbackNumber.trim() || callbackNumber.trim().length < 8) {
      alert('Please enter a valid phone number for callback.');
      return;
    }
    setCallbackSubmitted(true);
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid official email address.';
    }
    const cleanPhone = formData.phone.replace(/[\s\-\(\)\.]/g, '');
    if (!formData.phone.trim() || cleanPhone.length < 7 || cleanPhone.length > 15) {
      errors.phone = 'Please provide a valid phone number with area code.';
    }
    return errors;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstField = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstField}`);
      if (el) el.focus();
=======
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in your name, email, and phone number.');
>>>>>>> 0710e05f1bed027cc54916be9923c844d7e90dec
      return;
    }

    setLoading(true);
    setFormErrors({});

    const intentLabels = {
      quote: 'BOQ Quotation',
      service: 'Service / AMC Ticket',
      survey: 'Site Survey Request',
      partner: 'Partner / Consultant Inquiry'
    };

    const filesNote = attachedFiles.length > 0 
      ? `[Drawings/Specs Attached: ${attachedFiles.map(f => f.name).join(', ')}]` 
      : null;

    const combinedMessage = [
      `[Intent: ${intentLabels[activeIntent] || 'General Inquiry'}]`,
      isEmergencyBreakdown ? `[STATUS: URGENT EMERGENCY BREAKDOWN (<2H SLA)]` : null,
      formData.siteLocation ? `[Site Location: ${formData.siteLocation}]` : null,
      formData.urgencyLevel ? `[Urgency: ${formData.urgencyLevel}]` : null,
      formData.timeline ? `[Timeline: ${formData.timeline}]` : null,
      filesNote,
      formData.message || 'No additional note'
    ].filter(Boolean).join(' ');

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          company: formData.company || 'Not Specified',
          email: formData.email,
          phone: formData.phone,
<<<<<<< HEAD
          company: formData.company || 'Not Specified',
          category: formData.category,
          product_name: formData.product_name || `Direct ${intentLabels[activeIntent]}`,
          message: combinedMessage
        })
      });
    } catch (err) {
      console.warn('Backend offline fallback: Inquiry preserved locally.');
=======
          category: formData.areaOfInterest || 'General Enquiry',
          product_name: formData.areaOfInterest || 'Official Contact Desk',
          message: formData.message || 'Contact Office Website Enquiry'
        })
      });
    } catch (err) {
      console.warn('Note: Inquiry stored or API offline fallback', err);
>>>>>>> 0710e05f1bed027cc54916be9923c844d7e90dec
    } finally {
      setLoading(false);
      setSubmitted(true);
      if (onInquirySubmitted) onInquirySubmitted();
    }
  };

<<<<<<< HEAD
  // WhatsApp Dispatch Helper
  const handleWhatsAppDispatch = () => {
    const text = [
      `*Technical Inquiry: HTI Automation Directorate*`,
      `• *Client Name:* ${formData.name || 'Not provided'}`,
      `• *Organization:* ${formData.company || 'Corporate Client'}`,
      `• *Email:* ${formData.email || 'N/A'}`,
      `• *Phone:* ${formData.phone || 'N/A'}`,
      `• *Category:* ${formData.category}`,
      `• *Requirement:* ${formData.product_name || 'Turnkey Automation & Security'}`,
      `• *Breakdown Status:* ${isEmergencyBreakdown ? 'CRITICAL EMERGENCY (<2H SLA)' : 'Standard Project'}`,
      `• *Location:* ${formData.siteLocation || 'Mumbai / Pan-India'}`,
      attachedFiles.length > 0 ? `• *Attached Specs:* ${attachedFiles.map(f => f.name).join(', ')}` : null,
      `• *Details:* ${formData.message || 'Please connect regarding preliminary estimate & CAD GA drawing.'}`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/919892756077?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Pre-filled Email Dispatch Helper
  const handleEmailDispatch = () => {
    const subject = `Technical Requirement: ${formData.product_name || formData.category} - ${formData.company || formData.name}`;
    const body = [
      `Dear HTI Automation Engineering Directorate,`,
      ``,
      `Please find our technical requirement details below:`,
      ``,
      `• Contact Person: ${formData.name}`,
      `• Organization: ${formData.company || 'N/A'}`,
      `• Email: ${formData.email}`,
      `• Phone: ${formData.phone}`,
      `• Primary Category: ${formData.category}`,
      `• Scope of Work: ${formData.product_name || 'General Project'}`,
      `• Priority: ${isEmergencyBreakdown ? 'CRITICAL BREAKDOWN (< 2 HOUR SLA)' : 'Standard Project'}`,
      `• Site Location: ${formData.siteLocation || 'Not specified'}`,
      `• Target Timeline: ${formData.timeline}`,
      attachedFiles.length > 0 ? `• Attached Specifications: ${attachedFiles.map(f => f.name).join(', ')}` : '',
      ``,
      `Project Specifications:`,
      formData.message || 'Please share product datasheets, CAD GA layout, and estimate.',
      ``,
      `Best regards,`,
      formData.name
    ].filter(Boolean).join('\n');

    window.location.href = `mailto:projects@htisystems.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const activeHubData = REGIONAL_HUBS.find(h => h.id === selectedHub) || REGIONAL_HUBS[0];

  return (
    <div className="contact-dedicated-page">

      {/* ── 1. BREADCRUMBS ───────────────────────────── */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button className="breadcrumb-link" onClick={() => onNavigate && onNavigate('home')}>Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Engineering Directorate &amp; Technical Desk</span>
          </div>
          <button className="back-btn" onClick={() => onNavigate && onNavigate('home')} aria-label="Back to Home">
            <ArrowLeft size={14} /><span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* ── 2. EXECUTIVE HERO COMMAND CENTER ─────────── */}
      <section className="contact-hero-section" aria-label="Contact Technical Support">
        <div className="contact-hero-ambient-glow" aria-hidden="true" />
        <div className="contact-hero-grid-mesh" aria-hidden="true" />
        
        <div className="container">
          <div className="contact-hero-split">
            
            {/* Left Hero Narrative */}
            <div className="hero-left-column">
              <div className="hero-live-badge">
                <span className="live-radar-ping">
                  <span className="ping-dot" />
                </span>
                <span className="badge-txt-primary">TECHNICAL DESK LIVE</span>
                <span className="badge-sep">•</span>
                <span className="badge-txt-secondary">18 Pan-India Field Engineers Ready</span>
              </div>

              <h1 className="hero-headline">
                Enterprise Automation &amp; Security{' '}
                <span className="hero-gradient-highlight">Engineered for Zero Downtime</span>
              </h1>

              <p className="hero-summary">
                Direct access to HTI’s Mumbai application engineering cell. Get verified preliminary BOQs,
                CAD general arrangement (GA) drawings, USFDA 21 CFR Part 11 compliance dossiers,
                and guaranteed &lt; 2-hour breakdown mobilization.
              </p>

              {/* Quick Metrics Strip */}
              <div className="hero-metrics-grid">
                <div className="metric-box">
                  <div className="metric-num">100+</div>
                  <div className="metric-label">Enterprise Facilities</div>
                </div>
                <div className="metric-box">
                  <div className="metric-num">&lt; 2 Hrs</div>
                  <div className="metric-label">Field Mobilization</div>
                </div>
                <div className="metric-box">
                  <div className="metric-num">24/7</div>
                  <div className="metric-label">Engineering Desk</div>
                </div>
                <div className="metric-box">
                  <div className="metric-num">ISO 9001</div>
                  <div className="metric-label">Certified Quality</div>
=======
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
                        Goregaon (West), Mumbai – 400104,<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Goregaon+West+Mumbai+400104"
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
>>>>>>> 0710e05f1bed027cc54916be9923c844d7e90dec
                </div>
              </div>
            </div>

<<<<<<< HEAD
            {/* Right Hero Direct Connection Console */}
            <div className="hero-right-console">
              <div className="console-card">
                <div className="console-header">
                  <div className="console-title-group">
                    <Headphones size={20} className="console-icon" />
                    <div>
                      <h2 className="console-heading">Direct Engineering Access</h2>
                      <span className="console-sub">Connect immediately with application specialists</span>
                    </div>
                  </div>
                  <span className="console-status-pill">Active Now</span>
                </div>

                <div className="console-actions-stack">
                  
                  {/* WhatsApp Direct Action */}
                  <a href="https://wa.me/919892756077?text=Hello%20HTI%20Engineering%20Desk%2C%20I%20have%20an%20urgent%20inquiry%20regarding%20facility%20automation."
                    target="_blank" rel="noopener noreferrer" className="console-action-row wa-row">
                    <div className="action-icon-circle wa-circle">
                      <MessageSquare size={20} />
                    </div>
                    <div className="action-text-cell">
                      <span className="action-tag">Instant WhatsApp Desk</span>
                      <span className="action-value">+91 9892756077</span>
                      <span className="action-hint">Instant photo, drawing &amp; spec review</span>
                    </div>
                    <ChevronRight size={18} className="action-arrow" />
                  </a>

                  {/* Calling Hotline */}
                  <a href="tel:+919992756077" className="console-action-row phone-row">
                    <div className="action-icon-circle phone-circle">
                      <PhoneCall size={20} />
                    </div>
                    <div className="action-text-cell">
                      <span className="action-tag">Direct Calling Hotline</span>
                      <span className="action-value">+91 9992756077</span>
                      <span className="action-hint">Mon–Sat: 9:00 AM – 7:00 PM IST</span>
                    </div>
                    <ChevronRight size={18} className="action-arrow" />
                  </a>

                  {/* Email & Tenders */}
                  <a href="mailto:projects@htisystems.in" className="console-action-row email-row">
                    <div className="action-icon-circle email-circle">
                      <Mail size={20} />
                    </div>
                    <div className="action-text-cell">
                      <span className="action-tag">Projects Directorate</span>
                      <span className="action-value">projects@htisystems.in</span>
                      <span className="action-hint">Tender submissions &amp; RFP dossiers</span>
                    </div>
                    <ChevronRight size={18} className="action-arrow" />
                  </a>

                  {/* Urgent Breakdown Trigger */}
                  <div className="console-action-row urgent-row" onClick={() => {
                    setIsEmergencyBreakdown(true);
                    const el = document.getElementById('contact-action-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <div className="action-icon-circle urgent-circle">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="action-text-cell">
                      <span className="action-tag urgent-tag">Emergency Breakdown Desk</span>
                      <span className="action-value urgent-value">&lt; 2 Hr SLA Mobilization</span>
                      <span className="action-hint">Pharma batch halt &amp; critical site repairs</span>
                    </div>
                    <ChevronRight size={18} className="action-arrow" />
                  </div>

                </div>

                {/* Instant Callback Form Strip */}
                <div className="console-callback-strip">
                  {callbackSubmitted ? (
                    <div className="cb-success-state">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span>Callback queued for <strong>{callbackNumber}</strong> within 15 minutes!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleScheduleCallback} className="cb-inline-form">
                      <input 
                        type="tel" 
                        placeholder="Request callback: Mobile number"
                        value={callbackNumber}
                        onChange={(e) => setCallbackNumber(e.target.value)}
                        className="cb-inline-input"
                        required
                      />
                      <button type="submit" className="cb-inline-btn">
                        <PhoneCall size={13} />
                        <span>Call Me</span>
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* Enterprise Clients Trust Marquee */}
          <div className="hero-trust-bar">
            <span className="trust-bar-eyebrow">APPROVED VENDOR &amp; OEM TO INDUSTRY LEADERS:</span>
            <div className="trust-logos-row">
              {ENTERPRISE_CLIENTS.map((c, i) => (
                <div key={i} className="trust-client-badge">
                  <span className="client-name">{c.name}</span>
                  <span className="client-sector">{c.sector}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. MAIN WORKSPACE: OPERATIONS COMMAND & FORM ── */}
      <section className="contact-workspace-section" id="contact-action-form" aria-label="Inquiry and Hubs">
        <div className="container">
          <div className="workspace-grid">

            {/* LEFT COLUMN: Operations Hub, Interactive Map, Escalation Matrix */}
            <div className="workspace-left">

              {/* Regional Hub Operations Console */}
              <div className="ops-card">
                <div className="ops-card-header">
                  <div className="header-icon-box">
                    <Compass size={22} className="text-sky-500" />
                  </div>
                  <div className="header-meta">
                    <h3 className="ops-card-title">Pan-India Operations Radar</h3>
                    <span className="ops-card-sub">5 Dedicated Service &amp; Commissioning Hubs</span>
                  </div>
                  <span className="ops-live-badge">18 Engineers Active</span>
                </div>

                {/* Interactive Map Embed */}
                <div className="ops-map-container">
                  <iframe 
                    title="HTI Operations Radar"
                    src={activeHubData.mapUrl}
                    width="100%" 
                    height="200" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="map-glass-badge">
                    <MapPin size={13} className="text-red-500" />
                    <span>{activeHubData.city} Center</span>
                  </div>
                </div>

                {/* Regional Tabs Pill Bar */}
                <div className="hub-pills-bar" role="tablist">
                  {REGIONAL_HUBS.map(hub => (
                    <button 
                      key={hub.id} 
                      type="button" 
                      role="tab"
                      className={`hub-pill-btn ${selectedHub === hub.id ? 'active-pill' : ''}`}
                      onClick={() => setSelectedHub(hub.id)}
                    >
                      {hub.city}
                    </button>
                  ))}
                </div>

                {/* Active Hub Detailed Card */}
                <div className="active-hub-detail-box">
                  <div className="hub-detail-top">
                    <div>
                      <h4 className="hub-name-heading">{activeHubData.name}</h4>
                      <span className="hub-tagline-text">{activeHubData.tagline}</span>
                    </div>
                    <span className="hub-tat-pill">{activeHubData.tat}</span>
                  </div>

                  <p className="hub-full-address">{activeHubData.address}</p>

                  <div className="hub-corridor-row">
                    <span className="corridor-title">Coverage:</span>
                    <span className="corridor-list">{activeHubData.coverage}</span>
                  </div>

                  <div className="hub-lead-row">
                    <span className="lead-tag">Regional Lead:</span>
                    <span className="lead-name">{activeHubData.lead}</span>
                  </div>

                  {/* Hub Actions */}
                  <div className="hub-buttons-grid">
                    <a href={`tel:${activeHubData.phone}`} className="btn-hub-action btn-hub-call">
                      <PhoneCall size={14} />
                      <span>Call {activeHubData.phone}</span>
                    </a>
                    <a href={`https://wa.me/${activeHubData.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(activeHubData.lead)}%2C%20I%20have%20an%20inquiry%20for%20the%20${encodeURIComponent(activeHubData.city)}%20hub.`}
                      target="_blank" rel="noopener noreferrer" className="btn-hub-action btn-hub-wa">
                      <MessageSquare size={14} />
                      <span>WhatsApp Hub Desk</span>
                    </a>
                  </div>
                </div>

                {/* Corporate HQ Direct Address & Directions */}
                <div className="hq-registered-foot">
                  <Building2 size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <div className="hq-foot-text">
                    <strong>Corporate Headquarters:</strong> 401 CR-4, Ram Mandir Road, Goregaon (West), Mumbai – 400104.
                    <a href="https://maps.google.com/?q=Ram+Mandir+Road+Goregaon+West+Mumbai+400104" target="_blank" rel="noopener noreferrer" className="hq-directions-link">
                      <span>Get Driving Directions</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>

              {/* 24/7 SLA Escalation Matrix */}
              <div className="ops-card escalation-card" id="escalation-matrix">
                <div className="ops-card-header">
                  <div className="header-icon-box amber-box">
                    <AlertTriangle size={22} className="text-amber-500" />
                  </div>
                  <div className="header-meta">
                    <h3 className="ops-card-title">24/7 SLA Escalation Matrix</h3>
                    <span className="ops-card-sub">Guaranteed Mobilization Protocols</span>
                  </div>
                  <span className="badge-critical">Mission-Critical</span>
                </div>

                <div className="escalation-ladder">
                  {ESCALATION_TIERS.map((tier, idx) => (
                    <div key={idx} className="ladder-step">
                      <div className="step-tag-col">
                        <span className="step-lvl-badge">{tier.level}</span>
                        <span className="step-tat-badge">{tier.tat}</span>
                      </div>
                      <div className="step-content-col">
                        <div className="step-title-row">
                          <span className="step-name">{tier.tier}</span>
                          <span className="step-contact">{tier.contact}</span>
                        </div>
                        <p className="step-desc">{tier.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Modern Turnkey Inquiry & BOQ Suite */}
            <div className="workspace-right">
              <div className="procurement-form-card">

                {/* Top Intent Navigation Tabs */}
                <div className="intent-switch-bar" role="tablist">
                  <button 
                    type="button" 
                    role="tab"
                    className={`intent-switch-btn ${activeIntent === 'quote' ? 'active-tab' : ''}`}
                    onClick={() => handleSelectIntent('quote')}
                  >
                    <FileText size={16} />
                    <span>BOQ Quotation</span>
                  </button>

                  <button 
                    type="button" 
                    role="tab"
                    className={`intent-switch-btn ${activeIntent === 'service' ? 'active-tab' : ''}`}
                    onClick={() => handleSelectIntent('service')}
                  >
                    <Wrench size={16} />
                    <span>Service &amp; AMC</span>
                  </button>

                  <button 
                    type="button" 
                    role="tab"
                    className={`intent-switch-btn ${activeIntent === 'survey' ? 'active-tab' : ''}`}
                    onClick={() => handleSelectIntent('survey')}
                  >
                    <Compass size={16} />
                    <span>Site Survey</span>
                  </button>

                  <button 
                    type="button" 
                    role="tab"
                    className={`intent-switch-btn ${activeIntent === 'partner' ? 'active-tab' : ''}`}
                    onClick={() => handleSelectIntent('partner')}
                  >
                    <Handshake size={16} />
                    <span>Partner / MEP</span>
                  </button>
                </div>

                {/* Form Title & Subtitle */}
                <div className="form-heading-block">
                  <div className="form-category-eyebrow">
                    {activeIntent === 'quote' && 'Commercial Estimation & preliminary BOQ'}
                    {activeIntent === 'service' && 'Rapid breakdown & maintenance response'}
                    {activeIntent === 'survey' && 'Complimentary engineering inspection'}
                    {activeIntent === 'partner' && 'Architect & Turnkey consultant alliance'}
                  </div>
                  <h2 className="form-title-text">
                    {activeIntent === 'quote' && 'Request Turnkey Quotation & CAD Drawing'}
                    {activeIntent === 'service' && 'Book Immediate Service / AMC Ticket'}
                    {activeIntent === 'survey' && 'Schedule Free Engineering Site Survey'}
                    {activeIntent === 'partner' && 'Architect & Consultant Project Alliance'}
                  </h2>
                  <p className="form-sub-text">
                    {activeIntent === 'quote' && 'Share your facility specs or clear opening measurements. Receive itemized estimates within 2 business hours.'}
                    {activeIntent === 'service' && 'Describe your breakdown symptom. Nearest resident service engineers are dispatched immediately.'}
                    {activeIntent === 'survey' && 'Have an HTI engineer inspect structural readiness, electrical drops, and lintel dimensions at zero charge.'}
                    {activeIntent === 'partner' && 'Integrate HTI OEM controllers, BIM blocks, and CAD specs directly into enterprise master tenders.'}
                  </p>
                </div>

                {/* Interactive Fast Scope Configurator Header */}
                <div className="quick-config-bar">
                  <div className="qc-label">
                    <Sparkles size={14} className="text-sky-500" />
                    <span>Fast Project Pre-sets:</span>
                  </div>
                  <div className="qc-pills-row">
                    <button 
                      type="button" 
                      className="qc-pill"
                      onClick={() => handleApplyConfig('Pharma Cleanroom Grade B', 'Cleanroom Door Interlock', 4, 'Immediate (< 2 Weeks)')}
                    >
                      💊 4-Door Cleanroom Interlock
                    </button>
                    <button 
                      type="button" 
                      className="qc-pill"
                      onClick={() => handleApplyConfig('Warehouse / Logistics', 'High-Speed Rapid Roll Up Door', 2, 'Within 1 Month')}
                    >
                      ⚡ Rapid Roll-Up Door
                    </button>
                    <button 
                      type="button" 
                      className="qc-pill"
                      onClick={() => handleApplyConfig('Corporate Campus', 'Perimeter Boom Barrier & Crash Bollards', 2, 'Immediate (< 2 Weeks)')}
                    >
                      🛡️ Perimeter Barrier &amp; Bollard
                    </button>
                  </div>
                </div>

                {/* Critical Emergency Breakdown Toggle Alert */}
                <div className={`urgent-breakdown-banner ${isEmergencyBreakdown ? 'banner-active' : ''}`}>
                  <label className="urgent-banner-label">
                    <input 
                      type="checkbox" 
                      checked={isEmergencyBreakdown} 
                      onChange={(e) => setIsEmergencyBreakdown(e.target.checked)} 
                      className="urgent-banner-check"
                    />
                    <div className="urgent-banner-text">
                      <div className="urgent-banner-title">
                        🚨 Critical Production Halt / Emergency Breakdown?
                      </div>
                      <div className="urgent-banner-desc">
                        Enabling this automatically flags your inquiry as <strong>Tier-2 Severity</strong> with immediate priority phone triage and guaranteed &lt; 2-hour field engineer mobilization.
                      </div>
                    </div>
                  </label>
                </div>

                {submitted ? (
                  <div className="submit-success-state" role="alert">
                    <div className="success-icon-pulse">
                      <CheckCircle2 size={46} />
                    </div>
                    <h3 className="success-title">Requirement Successfully Dispatched!</h3>
                    <p className="success-desc">
                      Thank you for contacting HTI Automation. Your technical requirement has been registered with our Mumbai Project Directorate. An application engineer will contact you within <strong>2 business hours</strong>.
                    </p>

                    {isEmergencyBreakdown && (
                      <div className="success-emergency-notice">
                        <AlertTriangle size={16} />
                        <span>High-Priority Emergency Ticket Active: Field service coordinator notified.</span>
                      </div>
                    )}

                    <div className="success-buttons-row">
                      <button type="button" className="btn-succ-wa" onClick={handleWhatsAppDispatch}>
                        <MessageSquare size={16} />
                        <span>Also Forward via WhatsApp</span>
                      </button>
                      <button type="button" className="btn-succ-reset" onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '', email: '', phone: '', company: '',
                          category: 'Automation', product_name: '',
                          timeline: 'Immediate (1 - 2 Weeks)', siteLocation: '',
                          urgencyLevel: 'Standard', message: ''
                        });
                        setAttachedFiles([]);
                        setIsEmergencyBreakdown(false);
                      }}>
                        Submit Another Requirement
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="procurement-form">

                    {/* Row 1: Name & Company */}
                    <div className="form-row-2">
                      <div className="form-input-group">
                        <label htmlFor="field-name" className="input-label">
                          <span>Full Name <span className="asterisk">*</span></span>
                        </label>
                        <input 
                          type="text" 
                          id="field-name" 
                          name="name"
                          className={`form-field ${formErrors.name ? 'field-error' : ''}`}
                          placeholder="e.g. Sunil Deshmukh"
                          value={formData.name} 
                          onChange={handleInputChange} 
                          disabled={loading} 
                        />
                        {formErrors.name && (
                          <span className="field-err-msg"><AlertTriangle size={12} />{formErrors.name}</span>
                        )}
                      </div>

                      <div className="form-input-group">
                        <label htmlFor="field-company" className="input-label">
                          <span>Organization / Company <span className="hint-pill">Recommended</span></span>
                        </label>
                        <input 
                          type="text" 
                          id="field-company" 
                          name="company" 
                          className="form-field"
                          placeholder="e.g. Sun Pharma / Larsen &amp; Toubro"
                          value={formData.company} 
                          onChange={handleInputChange} 
                          disabled={loading} 
                        />
                      </div>
                    </div>

                    {/* Row 2: Official Email & Phone */}
                    <div className="form-row-2">
                      <div className="form-input-group">
                        <label htmlFor="field-email" className="input-label">
                          <span>Official Email Address <span className="asterisk">*</span></span>
                        </label>
                        <input 
                          type="email" 
                          id="field-email" 
                          name="email"
                          className={`form-field ${formErrors.email ? 'field-error' : ''}`}
                          placeholder="name@company.com"
                          value={formData.email} 
                          onChange={handleInputChange} 
                          disabled={loading} 
                        />
                        {formErrors.email && (
                          <span className="field-err-msg"><AlertTriangle size={12} />{formErrors.email}</span>
                        )}
                      </div>

                      <div className="form-input-group">
                        <label htmlFor="field-phone" className="input-label">
                          <span>Phone / WhatsApp <span className="asterisk">*</span></span>
                        </label>
                        <input 
                          type="tel" 
                          id="field-phone" 
                          name="phone"
                          className={`form-field ${formErrors.phone ? 'field-error' : ''}`}
                          placeholder="+91 98201 12345"
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          disabled={loading} 
                        />
                        {formErrors.phone && (
                          <span className="field-err-msg"><AlertTriangle size={12} />{formErrors.phone}</span>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Category & Specific Equipment */}
                    <div className="form-row-2">
                      <div className="form-input-group">
                        <label htmlFor="field-category" className="input-label">
                          <span>Solution Domain</span>
                        </label>
                        <select 
                          id="field-category" 
                          name="category" 
                          className="form-field form-select"
                          value={formData.category} 
                          onChange={handleInputChange} 
                          disabled={loading}
                        >
                          <option value="Automation">Industrial Doors &amp; Access Automation</option>
                          <option value="Cleanroom Interlocks">Pharma Cleanroom Interlocks &amp; Pass Boxes</option>
                          <option value="Security System">Security Systems &amp; AI Surveillance</option>
                          <option value="Fire Safety">Turnkey Fire Alarm &amp; Suppression (IS 2189)</option>
                          <option value="Hygiene">Hygiene &amp; Touchless Washroom Systems</option>
                          <option value="Perimeter Defense">Boom Barriers &amp; Crash Rated Bollards</option>
                          <option value="AMC">Annual Maintenance Contract (AMC) &amp; Repairs</option>
                        </select>
                      </div>

                      <div className="form-input-group">
                        <label htmlFor="field-product" className="input-label">
                          <span>Specific Equipment / Scope <span className="hint-pill">Optional</span></span>
                        </label>
                        <input 
                          type="text" 
                          id="field-product" 
                          name="product_name" 
                          className="form-field"
                          placeholder="e.g. 4-Door Cleanroom Interlock / 6m Boom Barrier"
                          value={formData.product_name} 
                          onChange={handleInputChange} 
                          disabled={loading} 
                        />
                      </div>
                    </div>

                    {/* Row 4: Site Location & Timeline */}
                    <div className="form-row-2">
                      <div className="form-input-group">
                        <label htmlFor="field-location" className="input-label">
                          <span>Facility Location / Industrial Area</span>
                        </label>
                        <input 
                          type="text" 
                          id="field-location" 
                          name="siteLocation" 
                          className="form-field"
                          placeholder="e.g. Pune Chakan / Vapi GIDC / Mumbai MMR"
                          value={formData.siteLocation} 
                          onChange={handleInputChange} 
                          disabled={loading} 
                        />
                      </div>

                      <div className="form-input-group">
                        <label htmlFor="field-timeline" className="input-label">
                          <span>Target Project Timeline</span>
                        </label>
                        <select 
                          id="field-timeline" 
                          name="timeline" 
                          className="form-field form-select"
                          value={formData.timeline} 
                          onChange={handleInputChange} 
                          disabled={loading}
                        >
                          <option value="Immediate (1 - 2 Weeks)">Immediate (1 – 2 Weeks)</option>
                          <option value="Within 1 Month">Within 1 Month</option>
                          <option value="1 – 3 Months (Tender / Planning)">1 – 3 Months (Planning / Tender)</option>
                          <option value="Emergency Breakdown Repair">Emergency Breakdown Repair (&lt; 24h)</option>
                          <option value="Annual Maintenance Contract">Annual Maintenance Contract</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 5: Detailed Specifications / Message */}
                    <div className="form-input-group">
                      <label htmlFor="field-message" className="input-label">
                        <span>Technical Details &amp; Dimensions <span className="hint-pill">Clear openings / Quantities</span></span>
                      </label>
                      <textarea 
                        id="field-message" 
                        name="message" 
                        rows={4} 
                        className="form-field form-textarea"
                        placeholder="Please specify clear opening dimensions (W x H), door quantities, cleanroom grade (A/B/C/D), BMS protocols, or statutory compliance standards..."
                        value={formData.message} 
                        onChange={handleInputChange} 
                        disabled={loading} 
                      />
                    </div>

                    {/* CAD / Drawing Attachment Strip */}
                    <div className="file-attach-card">
                      <div className="attach-card-header">
                        <div className="attach-title-group">
                          <Paperclip size={16} className="text-sky-500" />
                          <span className="attach-title">Attach Architectural CAD Drawing / PDF Spec Sheet</span>
                        </div>
                        <span className="attach-types-tag">.dwg, .dxf, .pdf, .zip (Up to 25MB)</span>
                      </div>

                      <div className="attach-drop-area">
                        <input 
                          type="file" 
                          id="spec-upload-input" 
                          className="hidden-file-input" 
                          multiple 
                          accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.zip"
                          onChange={handleFileUpload}
                        />
                        <label htmlFor="spec-upload-input" className="attach-label-box">
                          <Download size={16} className="text-slate-400" />
                          <span>Click to browse project files or CAD blueprints</span>
                        </label>
                        
                        <div className="sample-chips-row">
                          <span className="sample-hint">or attach sample:</span>
                          <button 
                            type="button" 
                            className="btn-sample-chip" 
                            onClick={() => handleAddSampleAttachment('Cleanroom_Interlock_GA_Rev3.dwg', '3.4 MB')}
                          >
                            + Sample CAD Layout (.dwg)
                          </button>
                          <button 
                            type="button" 
                            className="btn-sample-chip" 
                            onClick={() => handleAddSampleAttachment('Door_Automation_Spec_Dossier.pdf', '1.8 MB')}
                          >
                            + Sample Spec Dossier (.pdf)
                          </button>
                        </div>
                      </div>

                      {attachedFiles.length > 0 && (
                        <div className="attached-chips-container">
                          {attachedFiles.map((file, idx) => (
                            <div key={idx} className="file-chip">
                              <FileCheck size={14} className="text-emerald-500" />
                              <span className="file-name">{file.name}</span>
                              <span className="file-size">({file.size})</span>
                              <button 
                                type="button" 
                                className="btn-del-file" 
                                onClick={() => handleRemoveAttachment(idx)} 
                                title="Remove file"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* High-Impact 3-Way Action Row */}
                    <div className="form-actions-row">
                      <button type="submit" className="btn-submit-main" disabled={loading}>
                        {loading ? (
                          <><Loader2 size={18} className="spin-icon" /><span>Connecting to Engineering Directorate...</span></>
                        ) : (
                          <><Send size={18} /><span>Submit Official Requirement</span></>
                        )}
                      </button>

                      <button type="button" className="btn-submit-wa" onClick={handleWhatsAppDispatch} title="Direct WhatsApp connection to Senior Application Engineer">
                        <MessageSquare size={18} />
                        <span>WhatsApp Desk</span>
                      </button>

                      <button type="button" className="btn-submit-email" onClick={handleEmailDispatch} title="Open Outlook/Mail with formatted RFQ">
                        <Mail size={18} />
                        <span>Email Desk</span>
                      </button>
                    </div>

                    {/* Privacy & Confidentiality Guarantee */}
                    <div className="form-privacy-note">
                      <ShieldCheck size={15} className="text-emerald-600 flex-shrink-0" />
                      <span>Corporate NDA confidentiality strictly respected. Official response within 2 business hours.</span>
                    </div>

                    {/* SLA Commitments Bar */}
                    <div className="form-sla-guarantees-bar">
                      <div className="sla-pill-item">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span>Preliminary BOQ &amp; Cost Sheet in 2 Hours</span>
                      </div>
                      <div className="sla-pill-item">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span>Complimentary CAD GA Layout Drawings</span>
                      </div>
                      <div className="sla-pill-item">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span>Complimentary On-Site Survey Across Covered Belts</span>
                      </div>
                      <div className="sla-pill-item">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span>USFDA 21 CFR Part 11 &amp; EN 16005 Compliance Dossier</span>
                      </div>
                    </div>

                  </form>
                )}

=======
            {/* Right Side: Seamless Map Graphic */}
            <div className="office-banner-map-pane">
              <div className="custom-map-container">
                {/* SVG Map Canvas with Roads, Green Area, Water */}
                <svg className="map-svg-canvas" viewBox="0 0 540 280" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Land */}
                  <rect width="540" height="280" fill="#f1f5f9" />

                  {/* Aarey Colony Green Area */}
                  <path d="M430,0 L540,0 L540,280 L440,280 C400,200 420,100 430,0 Z" fill="#dcfce7" />

                  {/* Western Express Highway (Yellow/Golden central corridor) */}
                  <path d="M340,0 L360,280" stroke="#fef08a" strokeWidth="12" strokeLinecap="round" />
                  <path d="M340,0 L360,280" stroke="#eab308" strokeWidth="7" strokeLinecap="round" />

                  {/* S.V. Road */}
                  <path d="M190,0 L210,280" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
                  <path d="M190,0 L210,280" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />

                  {/* Link Road */}
                  <path d="M60,0 L80,280" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />

                  {/* Ram Mandir Road */}
                  <path d="M20,120 Q 200,115 350,115 T 540,130" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" />
                  <path d="M20,120 Q 200,115 350,115 T 540,130" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" />

                  {/* Secondary Streets */}
                  <path d="M30,60 L300,70" stroke="#ffffff" strokeWidth="4" />
                  <path d="M150,40 L170,240" stroke="#ffffff" strokeWidth="3" />
                  <path d="M260,80 L280,260" stroke="#ffffff" strokeWidth="4" />
                  <path d="M360,160 L520,240" stroke="#ffffff" strokeWidth="4" />

                  {/* Western Railway Line */}
                  <path d="M245,0 L265,280" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 4" />
                </svg>

                {/* POI Labels matching Screenshot */}
                <div className="map-poi-item poi-goregaon-west">
                  <span>GOREGAON WEST</span>
                </div>

                <div className="map-poi-item poi-oberoi">
                  <span>🛍️ Oberoi Mall</span>
                </div>

                <div className="map-poi-item poi-aarey">
                  <span>AAREY COLONY</span>
                </div>

                <div className="map-poi-item poi-oarey">
                  <span>OAREY COLONY</span>
                </div>

                <div className="map-poi-item poi-gare-galony">
                  <span>GARE GALONY</span>
                </div>

                <div className="map-poi-item poi-filmcity">
                  <span>🎬 Film City</span>
                </div>

                {/* HTI Red Pin with Label matching Screenshot */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Goregaon+West+Mumbai+400104"
                  target="_blank"
                  rel="noreferrer"
                  className="map-hti-marker"
                  title="Click to view in Google Maps"
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
>>>>>>> 0710e05f1bed027cc54916be9923c844d7e90dec
              </div>
            </div>
          </div>
        </div>
      </section>
<<<<<<< HEAD

      {/* ── 4. TECHNICAL PROCUREMENT FAQS ───────────── */}
      <section className="contact-faq-section" aria-label="Technical Procurement FAQs">
        <div className="container">
          <div className="faq-section-header">
            <span className="faq-eyebrow">PROCUREMENT &amp; STATUTORY COMPLIANCE</span>
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-sub">Common technical and commercial questions from MEP consultants, facility directors, pharmaceutical plant heads, and procurement teams.</p>
          </div>

          <div className="c-faq-grid">
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`c-faq-card ${isOpen ? 'is-expanded' : ''}`}>
                  <button type="button" className="c-faq-trigger" onClick={() => toggleFaq(idx)} aria-expanded={isOpen}>
                    <span className="c-faq-q-text">{faq.q}</span>
                    <ChevronDown size={18} className="c-faq-icon" />
                  </button>
                  <div className="c-faq-answer-panel">
                    <div className="c-faq-answer-inner">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

=======
>>>>>>> 0710e05f1bed027cc54916be9923c844d7e90dec
    </div>
  );
}
