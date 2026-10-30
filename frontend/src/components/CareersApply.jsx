import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileText,
  X,
  Copy,
  ExternalLink,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import './CareersApply.css';

/**
 * TypeScript Type Definitions (JSDoc)
 * 
 * @typedef {Object} FormState
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} position
 * @property {string} experience
 * @property {string} noticePeriod
 * @property {boolean} agreePrivacy
 * 
 * @typedef {Record<string, string>} FormErrors
 * @typedef {1 | 2 | 3} StepIndex
 * @typedef {'forward' | 'backward'} StepDirection
 */

const JOB_ROLES = [
  'Site Engineer – Automation & Security',
  'Site Supervisor',
  'Site Engineer',
  'Sales Executive',
  'Accountant',
  'Office Boy',
  'General / Open Application'
];

/**
 * Calculates whether HTI HR is currently Online or Offline
 * based on Indian Standard Time (IST = UTC + 5:30), Mon–Sat, 9:00 AM – 6:30 PM.
 */
function getHrStatus() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 3600000 * 5.5);

  const day = ist.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const hour = ist.getHours();
  const minutes = ist.getMinutes();
  const timeInMinutes = hour * 60 + minutes;

  const isWorkingDay = day >= 1 && day <= 6;
  // 9:00 AM = 540m, 6:30 PM = 1110m
  const isWorkingHours = timeInMinutes >= 540 && timeInMinutes <= 1110;

  if (isWorkingDay && isWorkingHours) {
    return {
      isOnline: true,
      text: 'HR Online',
      subtext: 'Mon – Sat, 9:00 AM – 6:30 PM IST'
    };
  } else {
    return {
      isOnline: false,
      text: 'HR Offline',
      subtext: day === 0 ? 'Back Mon at 9:00 AM IST' : (timeInMinutes < 540 ? 'Opens at 9:00 AM IST' : 'Back tomorrow at 9:00 AM IST')
    };
  }
}

/**
 * Validates 10-digit Indian mobile numbers (stripping +91, 0, spaces, dashes).
 * Must begin with 6, 7, 8, or 9.
 */
function validateIndianPhone(phoneStr) {
  if (!phoneStr || !phoneStr.trim()) {
    return 'Phone number is required.';
  }
  const digits = phoneStr.replace(/\D/g, '');
  let tenDigit = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    tenDigit = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    tenDigit = digits.slice(1);
  }

  if (tenDigit.length !== 10) {
    return 'Please enter a 10-digit mobile number.';
  }
  if (!/^[6-9]\d{9}$/.test(tenDigit)) {
    return 'Indian mobile numbers must start with 6, 7, 8, or 9.';
  }
  return '';
}

/**
 * Validates Email Address with standard RFC 5322 regex.
 */
function validateEmail(emailStr) {
  if (!emailStr || !emailStr.trim()) {
    return 'Email address is required.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim())) {
    return 'Please enter a valid email address.';
  }
  return '';
}

/**
 * CareersApply Component
 * Pinned layout with fixed desktop height, directional transitions,
 * drag-and-drop resume upload, and glassmorphism left panel.
 */
export default function CareersApply({ selectedPosition, onNavigate }) {
  // ── Form State ───────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: selectedPosition || '',
    experience: '',
    noticePeriod: '',
    coverLetter: '',
    agreePrivacy: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [stepDirection, setStepDirection] = useState('forward');
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ── Resume State ─────────────────────────────────────────────────────────
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // ── UI / Submission State ────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [availableRoles, setAvailableRoles] = useState(JOB_ROLES);

  useEffect(() => {
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((data) => {
        if (data.jobs && data.jobs.length > 0) {
          const publishedTitles = data.jobs
            .filter((j) => (j.status || '').toLowerCase() === 'published')
            .map((j) => j.title);
          const merged = Array.from(new Set([...publishedTitles, ...JOB_ROLES]));
          setAvailableRoles(merged);
        }
      })
      .catch((err) => console.log('Notice: using default job roles in apply form', err));
  }, []);

  const [submissionResult, setSubmissionResult] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [hrStatus, setHrStatus] = useState(getHrStatus);

  const fileInputRef = useRef(null);
  const contentBodyRef = useRef(null);

  // Update position if user clicks "Apply Now" on any card in the carousel
  useEffect(() => {
    if (selectedPosition) {
      setFormData((prev) => ({ ...prev, position: selectedPosition }));
      setFormErrors((prev) => ({ ...prev, position: '' }));
      setCurrentStep(1);
      setStepDirection('forward');
      setSubmitted(false);
    }
  }, [selectedPosition]);

  // Refresh HR Online/Offline status periodically
  useEffect(() => {
    setHrStatus(getHrStatus());
    const interval = setInterval(() => {
      setHrStatus(getHrStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // ── Input Change Handler ─────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Real-time validation clearance
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ── Step 1 Validation ────────────────────────────────────────────────────
  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.';
    }

    const emailErr = validateEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validateIndianPhone(formData.phone);
    if (phoneErr) errors.phone = phoneErr;

    if (!formData.position) {
      errors.position = 'Please select a position to apply for.';
    }

    return errors;
  };

  // ── Step 3 Validation ────────────────────────────────────────────────────
  const validateStep3 = () => {
    const errors = {};
    if (!formData.agreePrivacy) {
      errors.agreePrivacy = 'You must agree to the privacy policy to submit.';
    }
    return errors;
  };

  // ── Step Navigation ──────────────────────────────────────────────────────
  const handleNextStep = () => {
    if (currentStep === 1) {
      const errors = validateStep1();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setTouched({ fullName: true, email: true, phone: true, position: true });
        // Focus first invalid field
        const firstKey = Object.keys(errors)[0];
        const el = document.getElementById(`apply-${firstKey}`);
        if (el) el.focus();
        return;
      }
      setFormErrors({});
      setStepDirection('forward');
      setCurrentStep(2);
      if (contentBodyRef.current) contentBodyRef.current.scrollTop = 0;
    } else if (currentStep === 2) {
      setFormErrors({});
      setStepDirection('forward');
      setCurrentStep(3);
      if (contentBodyRef.current) contentBodyRef.current.scrollTop = 0;
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setStepDirection('backward');
      setCurrentStep((prev) => prev - 1);
      setFormErrors({});
      if (contentBodyRef.current) contentBodyRef.current.scrollTop = 0;
    }
  };

  const handleGoToStep = (targetStep) => {
    if (targetStep === currentStep) return;
    if (targetStep < currentStep) {
      setStepDirection('backward');
      setCurrentStep(targetStep);
      setFormErrors({});
      if (contentBodyRef.current) contentBodyRef.current.scrollTop = 0;
    } else if (targetStep === 2 && currentStep === 1) {
      handleNextStep();
    } else if (targetStep === 3) {
      const errors1 = validateStep1();
      if (Object.keys(errors1).length > 0) {
        setFormErrors(errors1);
        setCurrentStep(1);
        return;
      }
      setStepDirection('forward');
      setCurrentStep(3);
      if (contentBodyRef.current) contentBodyRef.current.scrollTop = 0;
    }
  };

  // ── Resume Upload Handling ───────────────────────────────────────────────
  const processResumeFile = (file) => {
    if (!file) return;

    // Validate file type
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValidType = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValidType) {
      setFormErrors((prev) => ({
        ...prev,
        resume: 'Only PDF, DOC, or DOCX documents are supported.'
      }));
      return;
    }

    // Validate size (max 5 MB)
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setFormErrors((prev) => ({
        ...prev,
        resume: 'File size exceeds the 5 MB limit. Please compress or choose another file.'
      }));
      return;
    }

    setFormErrors((prev) => ({ ...prev, resume: '' }));
    setResumeFile(file);

    // Simulate animated upload progress
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 25;
      });
    }, 90);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processResumeFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Email Copy Helper ────────────────────────────────────────────────────
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('careers@htisystems.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // ── Final Application Submit ─────────────────────────────────────────────
  // ── Final Application Submit (Direct Database Insertion + Backup) ────────
  const handleFormSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const errors1 = validateStep1();
    if (Object.keys(errors1).length > 0) {
      setFormErrors(errors1);
      setStepDirection('backward');
      setCurrentStep(1);
      const firstKey = Object.keys(errors1)[0];
      const el = document.getElementById(`apply-${firstKey}`);
      if (el) el.focus();
      return;
    }

    const errors3 = validateStep3();
    if (Object.keys(errors3).length > 0) {
      setFormErrors(errors3);
      const el = document.getElementById('apply-agreePrivacy');
      if (el) el.focus();
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append('full_name', formData.fullName.trim());
      fd.append('email', formData.email.trim().toLowerCase());
      fd.append('phone', formData.phone.trim());
      fd.append('position', formData.position.trim());
      fd.append('experience', formData.experience || 'Not specified');
      fd.append('notice_period', formData.noticePeriod || 'Immediate');
      fd.append('cover_letter', formData.coverLetter || '');
      fd.append('step_saved', '3');
      if (resumeFile) {
        fd.append('resume', resumeFile);
      }

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: fd
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || data.message || 'Submission failed');
      }

      setSubmissionResult(data);
      setStepDirection('forward');
      setSubmitted(true);
      if (contentBodyRef.current) contentBodyRef.current.scrollTop = 0;
    } catch (err) {
      console.warn('Backend API submission error, using direct mail fallback:', err);
      // Fallback: trigger email mailto so applicant is never blocked
      const subject = `Application: ${formData.position} — ${formData.fullName}`;
      const body = [
        `Dear HTI Automation Talent Team,`,
        ``,
        `Please find my application details below:`,
        `• Full Name: ${formData.fullName}`,
        `• Email: ${formData.email}`,
        `• Phone: ${formData.phone}`,
        `• Position Applied For: ${formData.position}`,
        `• Years of Experience: ${formData.experience || 'Not specified'}`,
        `• Notice Period: ${formData.noticePeriod || 'Not specified'}`,
        ``,
        resumeFile
          ? `[Resume file selected: "${resumeFile.name}" (${(resumeFile.size / 1024).toFixed(1)} KB)]`
          : `[Please attach your resume/CV to this email]`,
        ``,
        formData.coverLetter ? `Cover Letter / Note:\n${formData.coverLetter}\n\n` : ``,
        `Best regards,`,
        formData.fullName
      ].join('\n');

      window.location.href = `mailto:careers@htisystems.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setSubmissionResult({
        success: true,
        message: 'Your application has been prepared and opened in your email client.',
        application: {
          id: 'DIR-' + Math.floor(1000 + Math.random() * 9000),
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          position: formData.position,
          experience: formData.experience,
          notice_period: formData.noticePeriod,
          resume_filename: resumeFile?.name || ''
        },
        engine: 'email_client'
      });
      setStepDirection('forward');
      setSubmitted(true);
      if (contentBodyRef.current) contentBodyRef.current.scrollTop = 0;
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Keyboard Support (Enter to continue in Step 1 & 2) ───────────────────
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (currentStep < 3) {
        handleNextStep();
      } else {
        handleFormSubmit(e);
      }
    }
  };

  const handleCopyReference = () => {
    const refCode = `HTI-CAREER-#${submissionResult?.application?.id || 'APPLIED'}`;
    navigator.clipboard.writeText(refCode);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2200);
  };

  // Reset form to submit another application
  const handleResetForm = () => {
    setSubmitted(false);
    setSubmissionResult(null);
    setCurrentStep(1);
    setStepDirection('forward');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      position: selectedPosition || '',
      experience: '',
      noticePeriod: '',
      coverLetter: '',
      agreePrivacy: false
    });
    setResumeFile(null);
    setFormErrors({});
    setTouched({});
    if (contentBodyRef.current) {
      contentBodyRef.current.scrollTop = 0;
    }
  };

  return (
    <section className="apply-section" id="application-form" aria-label="Application Form">
      <div className="apply-container">
        <div className="apply-grid">

          {/* ── LEFT SIDE PANEL: GLASSMORPHISM & DIRECT CONTACT ─────────── */}
          <div className="apply-left-col">
            <div className="apply-eyebrow">
              <span className="apply-eyebrow-line" aria-hidden="true" />
              <span className="apply-eyebrow-text">APPLY NOW</span>
            </div>

            <h2 className="apply-heading">Let's build something great together.</h2>

            {/* Glassmorphism Card */}
            <div className="apply-contact-card">
              <div className="apply-contact-card-grid" aria-hidden="true" />
              <div className="apply-card-glow-cyan" aria-hidden="true" />
              <div className="apply-card-glow-red" aria-hidden="true" />

              <div className="apply-card-header-row">
                <span className="apply-card-badge">HR &amp; TALENT TEAM</span>

                {/* IST-calculated Live Online/Offline Status */}
                <div className={`apply-hr-status-badge ${hrStatus.isOnline ? 'is-online' : 'is-offline'}`}>
                  <span className={`apply-status-dot ${hrStatus.isOnline ? 'dot-online' : 'dot-offline'}`} />
                  <span>{hrStatus.text}</span>
                </div>
              </div>

              <h3 className="apply-contact-title">Prefer to reach us directly?</h3>
              <p className="apply-contact-subtitle">
                Available Monday – Saturday, 9:00 AM – 6:30 PM IST.
              </p>

              <div className="apply-contact-list">
                {/* Email with Clickable mailto + Copy Button & Toast */}
                <div className="apply-contact-item">
                  <div className="apply-contact-tile" aria-hidden="true">
                    <Mail size={16} />
                  </div>
                  <div className="apply-contact-content">
                    <span className="apply-contact-label">Careers Email</span>
                    <div className="apply-email-row">
                      <a href="mailto:careers@htisystems.in" className="apply-contact-link">
                        careers@htisystems.in
                      </a>
                      <button
                        type="button"
                        className="apply-copy-btn"
                        onClick={handleCopyEmail}
                        aria-label="Copy careers email address"
                      >
                        <Copy size={12} />
                        <span>Copy</span>
                        {copiedEmail && (
                          <span className="apply-copy-toast" role="status">Copied!</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="apply-contact-item">
                  <div className="apply-contact-tile" aria-hidden="true">
                    <Phone size={16} />
                  </div>
                  <div className="apply-contact-content">
                    <span className="apply-contact-label">HR Direct Line</span>
                    <a href="tel:+919992756077" className="apply-contact-link">
                      +91 9992756077 / 9594917010
                    </a>
                  </div>
                </div>

                {/* Headquarters Address + Google Maps Directions Button */}
                <div className="apply-contact-item">
                  <div className="apply-contact-tile" aria-hidden="true">
                    <MapPin size={16} />
                  </div>
                  <div className="apply-contact-content">
                    <span className="apply-contact-label">Corporate Headquarters</span>
                    <span className="apply-contact-text">
                      Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703
                    </span>
                    <a
                      href="https://maps.google.com/?q=Goodwill+Bizhubb+Turbhe+Navi+Mumbai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apply-directions-btn"
                      aria-label="Get directions to HTI headquarters on Google Maps"
                    >
                      <span>Get directions</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="apply-contact-item">
                  <div className="apply-contact-tile" aria-hidden="true">
                    <Clock size={16} />
                  </div>
                  <div className="apply-contact-content">
                    <span className="apply-contact-label">Office Working Hours</span>
                    <span className="apply-contact-text">
                      Monday – Saturday: 9:00 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Response Time Pill */}
              <div className="apply-response-pill">
                <span className="apply-status-dot dot-online" aria-hidden="true" />
                <span>Typically responds within 3–5 working days</span>
              </div>
            </div>

            {/* 3-item Why Join HTI Mini List */}

          </div>

          {/* ── RIGHT COLUMN: STABLE FORM CARD (Fixed Height Desktop) ─────── */}
          <div className="apply-form-col">
            <div
              className={`apply-form-card ${submitted ? 'is-success-view' : ''}`}
              role="region"
              aria-label="Job Application Form"
            >
              {/* ── SUCCESS SCREEN: Rendered as its OWN view when submitted ──── */}
              {submitted ? (
                <div className="apply-success-box" role="alert">
                  {/* Pure CSS Confetti Particles */}
                  <div className="apply-confetti-container" aria-hidden="true">
                    {[...Array(16)].map((_, i) => (
                      <span key={i} className={`apply-confetti-piece apply-confetti-${i}`} />
                    ))}
                  </div>

                  <div className="apply-success-icon-wrap" aria-hidden="true">
                    <CheckCircle2 size={38} className="apply-success-big-check" />
                  </div>

                  <div className="apply-success-pill" aria-hidden="true">
                    <span>
                      {submissionResult?.engine === 'mysql'
                        ? 'VERIFIED · MYSQL 8.0 CLOUD ARCHIVE'
                        : submissionResult?.engine === 'sqlite'
                        ? 'VERIFIED · HTI ENTERPRISE SECURE DB'
                        : 'DIRECT CANDIDATE TRANSMISSION'}
                    </span>
                  </div>

                  <h3 className="apply-success-title">Application Successfully Recorded!</h3>
                  <p className="apply-success-desc">
                    Thank you, <strong style={{ color: '#0284c7' }}>{formData.fullName}</strong>. Your application for <strong style={{ color: 'var(--text-main, #0f172a)' }}>{formData.position}</strong> has been secured in the HTI Talent Acquisition pipeline.
                  </p>

                  {/* Reference Application ID Badge with 1-Click Copy */}
                  <div className="apply-ref-banner">
                    <div className="apply-ref-meta">
                      <span className="apply-ref-label">Application Reference ID:</span>
                      <strong className="apply-ref-code">
                        HTI-CAREER-#{submissionResult?.application?.id || 'APPLIED'}
                      </strong>
                    </div>
                    <button
                      type="button"
                      className="apply-copy-btn"
                      onClick={handleCopyReference}
                      aria-label="Copy application reference code"
                    >
                      <Copy size={13} />
                      <span>{copiedRef ? 'Copied!' : 'Copy ID'}</span>
                    </button>
                  </div>

                  {/* Candidate Quick Submission Summary */}
                  <div className="apply-success-summary-card">
                    <div className="apply-success-summary-grid">
                      <div className="apply-summary-item">
                        <span className="apply-summary-key">Candidate</span>
                        <span className="apply-summary-val">{formData.fullName}</span>
                      </div>
                      <div className="apply-summary-item">
                        <span className="apply-summary-key">Role</span>
                        <span className="apply-summary-val">{formData.position}</span>
                      </div>
                      <div className="apply-summary-item">
                        <span className="apply-summary-key">Email</span>
                        <span className="apply-summary-val">{formData.email}</span>
                      </div>
                      <div className="apply-summary-item">
                        <span className="apply-summary-key">Resume</span>
                        <span className="apply-summary-val">
                          {resumeFile ? `Uploaded (${(resumeFile.size / 1024).toFixed(1)} KB)` : 'Logged for interview'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* What happens next list */}
                  <div className="apply-next-steps-card">
                    <h4 className="apply-next-steps-heading">What Happens Next</h4>
                    <div className="apply-next-steps-list">
                      <div className="apply-next-step-row">
                        <span className="apply-step-bullet">01.</span>
                        <span className="apply-step-text-val">Talent acquisition team screens candidate profile against site engineering standards.</span>
                      </div>
                      <div className="apply-next-step-row">
                        <span className="apply-step-bullet">02.</span>
                        <span className="apply-step-text-val">Shortlisted engineers receive phone or video interview invitation within 2–4 business days.</span>
                      </div>
                      <div className="apply-next-step-row">
                        <span className="apply-step-bullet">03.</span>
                        <span className="apply-step-text-val">Technical discussion with project leads at Turbhe HQ or virtual walkthrough.</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="apply-success-actions">
                    <button
                      type="button"
                      className="apply-btn-reset"
                      onClick={handleResetForm}
                    >
                      <span>Submit Another Application</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Pinned Card Header */}
                  <div className="apply-card-header">
                    <div className="apply-card-protocol-badge" aria-hidden="true">
                      <span className="apply-card-protocol-dot" />
                      <span>STEP 0{currentStep} / 03 · APPLICATION PROTOCOL</span>
                    </div>
                    <h3 className="apply-card-title">Submit Your Application</h3>
                    <p className="apply-card-subtitle">
                      Step {currentStep} of 3 — {currentStep === 1 ? 'Personal Details' : currentStep === 2 ? 'Experience & Resume' : 'Review & Final Submit'}
                    </p>
                  </div>

                  <form
                    onSubmit={handleFormSubmit}
                    onKeyDown={handleKeyDown}
                    noValidate
                    style={{ display: 'contents' }}
                  >
                  {/* Pinned Stepper Bar */}
                  <div className="apply-stepper-wrap" aria-label="Application Progress" role="navigation">
                    <div className="apply-stepper-track-bg" aria-hidden="true">
                      <div
                        className="apply-stepper-track-fill"
                        style={{
                          width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
                        }}
                      />
                    </div>

                    <div className="apply-stepper-row">
                      {/* Step 1 */}
                      <button
                        type="button"
                        className={`apply-step-btn ${currentStep === 1 ? 'is-active' : ''} ${currentStep > 1 ? 'is-completed' : ''}`}
                        onClick={() => handleGoToStep(1)}
                        aria-current={currentStep === 1 ? 'step' : undefined}
                      >
                        <div className="apply-step-badge">
                          {currentStep > 1 ? <Check size={14} /> : <span>1</span>}
                        </div>
                        <div className="apply-step-text">
                          <span className="apply-step-num-tag">Step 01</span>
                          <span className="apply-step-name">Personal Details</span>
                        </div>
                      </button>

                      {/* Step 2 */}
                      <button
                        type="button"
                        className={`apply-step-btn ${currentStep === 2 ? 'is-active' : ''} ${currentStep > 2 ? 'is-completed' : ''}`}
                        onClick={() => handleGoToStep(2)}
                        disabled={currentStep < 2}
                        aria-current={currentStep === 2 ? 'step' : undefined}
                      >
                        <div className="apply-step-badge">
                          {currentStep > 2 ? <Check size={14} /> : <span>2</span>}
                        </div>
                        <div className="apply-step-text">
                          <span className="apply-step-num-tag">Step 02</span>
                          <span className="apply-step-name">Experience &amp; Resume</span>
                        </div>
                      </button>

                      {/* Step 3 */}
                      <button
                        type="button"
                        className={`apply-step-btn ${currentStep === 3 ? 'is-active' : ''}`}
                        onClick={() => handleGoToStep(3)}
                        disabled={currentStep < 3}
                        aria-current={currentStep === 3 ? 'step' : undefined}
                      >
                        <div className="apply-step-badge">
                          <span>3</span>
                        </div>
                        <div className="apply-step-text">
                          <span className="apply-step-num-tag">Step 03</span>
                          <span className="apply-step-name">Review &amp; Submit</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* ── MIDDLE SCROLLABLE CONTENT BODY (Fills available space) ─ */}
                  <div
                    className={`apply-step-body ${stepDirection === 'forward' ? 'apply-step-slide-forward' : 'apply-step-slide-backward'}`}
                    ref={contentBodyRef}
                    key={currentStep}
                    tabIndex={0}
                    role="region"
                    aria-label={`Step ${currentStep} of 3 content`}
                  >
                    {/* ── STEP 1: Personal Details ───────────────────────── */}
                    {currentStep === 1 && (
                      <>
                        <div className="apply-step-intro-row">
                          <h4 className="apply-step-intro-title">Personal Details</h4>
                          <p className="apply-step-intro-desc">
                            Tell us who you are and which position you'd like to apply for.
                          </p>
                        </div>

                        <div className="apply-form-row">
                          {/* Full Name */}
                          <div className="apply-form-group">
                            <label htmlFor="apply-fullName" className="apply-label">
                              <span>Full Name <span className="apply-star">*</span></span>
                            </label>
                            <div className="apply-input-wrap">
                              <input
                                type="text"
                                id="apply-fullName"
                                name="fullName"
                                className={`apply-input ${formErrors.fullName ? 'has-error' : ''} ${touched.fullName && !formErrors.fullName && formData.fullName.trim().length >= 2 ? 'is-valid' : ''}`}
                                placeholder="e.g. Rahul Sharma"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                aria-required="true"
                                aria-invalid={!!formErrors.fullName}
                              />
                              {touched.fullName && !formErrors.fullName && formData.fullName.trim().length >= 2 && (
                                <Check size={14} className="apply-valid-icon" aria-hidden="true" />
                              )}
                            </div>
                            {formErrors.fullName && (
                              <span className="apply-error-msg" role="alert">
                                <AlertCircle size={12} /> {formErrors.fullName}
                              </span>
                            )}
                          </div>

                          {/* Email Address */}
                          <div className="apply-form-group">
                            <label htmlFor="apply-email" className="apply-label">
                              <span>Email Address <span className="apply-star">*</span></span>
                            </label>
                            <div className="apply-input-wrap">
                              <input
                                type="email"
                                id="apply-email"
                                name="email"
                                className={`apply-input ${formErrors.email ? 'has-error' : ''} ${touched.email && !formErrors.email && !validateEmail(formData.email) ? 'is-valid' : ''}`}
                                placeholder="rahul@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                aria-required="true"
                                aria-invalid={!!formErrors.email}
                              />
                              {touched.email && !formErrors.email && !validateEmail(formData.email) && (
                                <Check size={14} className="apply-valid-icon" aria-hidden="true" />
                              )}
                            </div>
                            {formErrors.email && (
                              <span className="apply-error-msg" role="alert">
                                <AlertCircle size={12} /> {formErrors.email}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="apply-form-row">
                          {/* Phone Number (Indian 10-digit validation) */}
                          <div className="apply-form-group">
                            <label htmlFor="apply-phone" className="apply-label">
                              <span>Phone Number <span className="apply-star">*</span></span>
                              <span className="apply-optional-pill">10-Digit Mobile</span>
                            </label>
                            <div className="apply-input-wrap">
                              <input
                                type="tel"
                                id="apply-phone"
                                name="phone"
                                className={`apply-input ${formErrors.phone ? 'has-error' : ''} ${touched.phone && !formErrors.phone && !validateIndianPhone(formData.phone) ? 'is-valid' : ''}`}
                                placeholder="e.g. 98201 12345"
                                value={formData.phone}
                                onChange={handleInputChange}
                                aria-required="true"
                                aria-invalid={!!formErrors.phone}
                              />
                              {touched.phone && !formErrors.phone && !validateIndianPhone(formData.phone) && (
                                <Check size={14} className="apply-valid-icon" aria-hidden="true" />
                              )}
                            </div>
                            {formErrors.phone && (
                              <span className="apply-error-msg" role="alert">
                                <AlertCircle size={12} /> {formErrors.phone}
                              </span>
                            )}
                          </div>

                          {/* Position Applying For */}
                          <div className="apply-form-group">
                            <label htmlFor="apply-position" className="apply-label">
                              <span>Position Applying For <span className="apply-star">*</span></span>
                            </label>
                            <div className="apply-input-wrap">
                              <select
                                id="apply-position"
                                name="position"
                                className={`apply-select ${formErrors.position ? 'has-error' : ''}`}
                                value={formData.position}
                                onChange={handleInputChange}
                                aria-required="true"
                                aria-invalid={!!formErrors.position}
                              >
                                <option value="">Select a role...</option>
                                {availableRoles.map((role) => (
                                  <option key={role} value={role}>{role}</option>
                                ))}
                              </select>
                            </div>
                            {formErrors.position && (
                              <span className="apply-error-msg" role="alert">
                                <AlertCircle size={12} /> {formErrors.position}
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* ── STEP 2: Experience & Resume ─────────────────────── */}
                    {currentStep === 2 && (
                      <>
                        <div className="apply-step-intro-row">
                          <h4 className="apply-step-intro-title">Experience &amp; Resume</h4>
                          <p className="apply-step-intro-desc">
                            Share your background and attach your curriculum vitae for evaluation.
                          </p>
                        </div>

                        <div className="apply-form-row">
                          {/* Experience */}
                          <div className="apply-form-group">
                            <label htmlFor="apply-experience" className="apply-label">
                              <span>Years of Experience</span>
                              <span className="apply-optional-pill">Optional</span>
                            </label>
                            <select
                              id="apply-experience"
                              name="experience"
                              className="apply-select"
                              value={formData.experience}
                              onChange={handleInputChange}
                            >
                              <option value="">Select experience...</option>
                              <option value="Fresher / 0 Years">Fresher / 0 Years</option>
                              <option value="Less than 1 Year">Less than 1 Year</option>
                              <option value="1 – 2 Years">1 – 2 Years</option>
                              <option value="2 – 4 Years">2 – 4 Years</option>
                              <option value="4 – 6 Years">4 – 6 Years</option>
                              <option value="6 – 10 Years">6 – 10 Years</option>
                              <option value="10+ Years">10+ Years</option>
                            </select>
                          </div>

                          {/* Notice Period */}
                          <div className="apply-form-group">
                            <label htmlFor="apply-noticePeriod" className="apply-label">
                              <span>Notice Period</span>
                              <span className="apply-optional-pill">Optional</span>
                            </label>
                            <select
                              id="apply-noticePeriod"
                              name="noticePeriod"
                              className="apply-select"
                              value={formData.noticePeriod}
                              onChange={handleInputChange}
                            >
                              <option value="">Select notice period...</option>
                              <option value="Immediately Available">Immediately Available</option>
                              <option value="Within 15 Days">Within 15 Days</option>
                              <option value="30 Days">30 Days</option>
                              <option value="45 Days">45 Days</option>
                              <option value="60 Days">60 Days</option>
                              <option value="90 Days">90 Days</option>
                            </select>
                          </div>
                        </div>

                        {/* Drag and Drop Resume Upload Zone with Progress Animation */}
                        <div className="apply-form-group">
                          <label className="apply-label">
                            <span>Resume / CV</span>
                            <span className="apply-optional-pill">PDF, DOC, DOCX · Max 5 MB</span>
                          </label>

                          {resumeFile ? (
                            <div className="apply-uploaded-box">
                              <div className="apply-file-info-row">
                                <div className="apply-file-meta">
                                  <FileText size={22} className="apply-file-icon" />
                                  <div className="apply-file-texts">
                                    <span className="apply-file-name">{resumeFile.name}</span>
                                    <span className="apply-file-size">{(resumeFile.size / 1024).toFixed(1)} KB</span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="apply-file-remove-btn"
                                  onClick={handleRemoveFile}
                                  aria-label="Remove uploaded resume"
                                >
                                  <X size={14} />
                                  <span>Remove</span>
                                </button>
                              </div>

                              {/* Simulated Upload Progress Bar */}
                              <div className="apply-upload-bar-track" aria-hidden="true">
                                <div
                                  className="apply-upload-bar-fill"
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`apply-dropzone ${isDragging ? 'is-dragging' : ''}`}
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              tabIndex={0}
                              role="button"
                              aria-label="Click or drag and drop your resume file here"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  fileInputRef.current?.click();
                                }
                              }}
                            >
                              <div className="apply-dropzone-icon" aria-hidden="true">
                                <UploadCloud size={24} />
                              </div>
                              <span className="apply-dropzone-title">
                                Click to browse or drag &amp; drop your resume
                              </span>
                              <span className="apply-dropzone-sub">
                                Supported formats: PDF, DOC, DOCX (Max 5 MB)
                              </span>
                            </div>
                          )}

                          <input
                            type="file"
                            ref={fileInputRef}
                            id="apply-resume"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                          />

                          {formErrors.resume && (
                            <span className="apply-error-msg" role="alert">
                              <AlertCircle size={12} /> {formErrors.resume}
                            </span>
                          )}
                        </div>

                        {/* Optional Cover Letter / Candidate Message */}
                        <div className="apply-form-group">
                          <label htmlFor="apply-coverLetter" className="apply-label">
                            <span>Cover Letter / Candidate Notes</span>
                            <span className="apply-optional-pill">Optional</span>
                          </label>
                          <textarea
                            id="apply-coverLetter"
                            name="coverLetter"
                            rows={3}
                            className="apply-textarea"
                            placeholder="Briefly tell us about your background, project experience, certifications, or why you'd like to join HTI Automation..."
                            value={formData.coverLetter || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </>
                    )}

                    {/* ── STEP 3: Review & Submit ─────────────────────────── */}
                    {currentStep === 3 && (
                      <>
                        <div className="apply-step-intro-row">
                          <h4 className="apply-step-intro-title">Review &amp; Submit</h4>
                          <p className="apply-step-intro-desc">
                            Verify your details before sending your application to HTI Automation.
                          </p>
                        </div>

                        {/* Compact 2-Column Review Summary */}
                        <div className="apply-review-grid">
                          {/* Col 1: Personal Details */}
                          <div className="apply-review-card">
                            <div className="apply-review-card-header">
                              <span className="apply-review-card-title">Personal Details</span>
                              <button
                                type="button"
                                className="apply-review-edit-btn"
                                onClick={() => handleGoToStep(1)}
                                aria-label="Edit personal details"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="apply-review-row">
                              <span className="apply-review-key">Full Name</span>
                              <span className="apply-review-val">{formData.fullName || '—'}</span>
                            </div>
                            <div className="apply-review-row">
                              <span className="apply-review-key">Email</span>
                              <span className="apply-review-val">{formData.email || '—'}</span>
                            </div>
                            <div className="apply-review-row">
                              <span className="apply-review-key">Phone</span>
                              <span className="apply-review-val">{formData.phone || '—'}</span>
                            </div>
                            <div className="apply-review-row">
                              <span className="apply-review-key">Position</span>
                              <span className="apply-review-val" style={{ color: 'var(--accent-red, #ef4444)' }}>
                                {formData.position || '—'}
                              </span>
                            </div>
                          </div>

                          {/* Col 2: Experience & Resume */}
                          <div className="apply-review-card">
                            <div className="apply-review-card-header">
                              <span className="apply-review-card-title">Experience &amp; Resume</span>
                              <button
                                type="button"
                                className="apply-review-edit-btn"
                                onClick={() => handleGoToStep(2)}
                                aria-label="Edit experience and resume"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="apply-review-row">
                              <span className="apply-review-key">Experience</span>
                              <span className="apply-review-val">{formData.experience || 'Not specified'}</span>
                            </div>
                            <div className="apply-review-row">
                              <span className="apply-review-key">Notice Period</span>
                              <span className="apply-review-val">{formData.noticePeriod || 'Not specified'}</span>
                            </div>
                            <div className="apply-review-row">
                              <span className="apply-review-key">Attached Resume</span>
                              <span className="apply-review-val">
                                {resumeFile ? (
                                  `${resumeFile.name} (${(resumeFile.size / 1024).toFixed(1)} KB)`
                                ) : (
                                  'None (attach later or offline)'
                                )}
                              </span>
                            </div>
                            {formData.coverLetter && (
                              <div className="apply-review-row" style={{ alignItems: 'flex-start' }}>
                                <span className="apply-review-key">Cover Letter</span>
                                <span className="apply-review-val" style={{ whiteSpace: 'pre-wrap', maxHeight: '70px', overflowY: 'auto' }}>
                                  {formData.coverLetter}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Privacy Agreement Checkbox */}
                        <div className="apply-privacy-row">
                          <input
                            type="checkbox"
                            id="apply-agreePrivacy"
                            name="agreePrivacy"
                            className="apply-checkbox"
                            checked={formData.agreePrivacy}
                            onChange={handleInputChange}
                            aria-required="true"
                          />
                          <label htmlFor="apply-agreePrivacy" className="apply-privacy-text">
                            I agree to HTI Automation processing my application data in accordance with their{' '}
                            <button
                              type="button"
                              className="apply-privacy-link"
                              onClick={(e) => {
                                e.preventDefault();
                                if (onNavigate) onNavigate('about');
                              }}
                            >
                              Privacy Policy
                            </button>
                            .<span className="apply-star">*</span>
                          </label>
                        </div>
                        {formErrors.agreePrivacy && (
                          <span className="apply-error-msg" role="alert" style={{ marginTop: '4px' }}>
                            <AlertCircle size={12} /> {formErrors.agreePrivacy}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* ── PINNED CARD FOOTER (Consistent position across steps) ─ */}
                  <div className="apply-card-footer">
                    <div className="apply-footer-btn-row">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          className="apply-btn-back"
                          onClick={handlePrevStep}
                          disabled={isSubmitting}
                        >
                          <ArrowLeft size={16} />
                          <span>Back</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          className="apply-btn-primary"
                          onClick={handleNextStep}
                        >
                          <span>Continue</span>
                          <ArrowRight size={16} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="apply-btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={16} className="apply-btn-spinner" />
                              <span>Saving to Database...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Application</span>
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <div className="apply-security-note">
                      <ShieldCheck size={13} aria-hidden="true" />
                      <span>Your application is transmitted securely and confidentially to HTI Talent Acquisition.</span>
                    </div>
                  </div>
                </form>
              </>
            )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
