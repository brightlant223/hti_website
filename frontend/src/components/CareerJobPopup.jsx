import React, { useState, useEffect } from 'react';
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Users,
  IndianRupee,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  Cpu,
  ShieldCheck,
  Code2,
  Wrench,
  Truck,
  TrendingUp,
  Layers,
  Award,
  FileText,
  UploadCloud,
  Check,
  Eye,
  Send,
  Sparkle
} from 'lucide-react';
import './CareerJobPopup.css';

// Department icon helper
function getDepartmentIcon(dept = '') {
  const d = dept.toLowerCase();
  if (d.includes('admin')) return <Building2 size={16} />;
  if (d.includes('account') || d.includes('finance')) return <IndianRupee size={16} />;
  if (d.includes('hr') || d.includes('human')) return <Users size={16} />;
  if (d.includes('technical') || d.includes('service')) return <Cpu size={16} />;
  if (d.includes('engineer')) return <Wrench size={16} />;
  if (d.includes('sales') || d.includes('market')) return <TrendingUp size={16} />;
  if (d.includes('operation')) return <Layers size={16} />;
  if (d.includes('security')) return <ShieldCheck size={16} />;
  if (d.includes('housekeep') || d.includes('clean')) return <Sparkles size={16} />;
  if (d.includes('software') || d.includes('it')) return <Code2 size={16} />;
  if (d.includes('logistics')) return <Truck size={16} />;
  return <Award size={16} />;
}

export default function CareerJobPopup({
  jobs = [],
  isOpen,
  onClose,
  onApplyJob
}) {
  const [liveJobs, setLiveJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Sub-modal states
  const [viewingJob, setViewingJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  // Application form states
  const [appForm, setAppForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentLocation: '',
    experience: 'Fresher',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [appErrors, setAppErrors] = useState({});
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [appSuccessMessage, setAppSuccessMessage] = useState(null);

  // Fetch live published jobs directly if not provided or to ensure fresh data
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        const published = (data.jobs || []).filter(
          (j) => (j.status || '').toLowerCase() === 'published'
        );
        setLiveJobs(published);
      }
    } catch (err) {
      console.error('Failed to load published jobs in popup:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (jobs && jobs.length > 0) {
        const published = jobs.filter((j) => (j.status || '').toLowerCase() === 'published');
        setLiveJobs(published);
      } else {
        fetchJobs();
      }
    }
  }, [isOpen, jobs]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (applyingJob) setApplyingJob(null);
        else if (viewingJob) setViewingJob(null);
        else if (isOpen) onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, viewingJob, applyingJob, onClose]);

  if (!isOpen) return null;

  // Filter jobs by department if selected
  const displayJobs =
    selectedDeptFilter === 'All'
      ? liveJobs
      : liveJobs.filter((j) => (j.department || '').toLowerCase().includes(selectedDeptFilter.toLowerCase()));

  // Extract distinct departments for filter pills
  const departmentsList = [
    'All',
    ...Array.from(new Set(liveJobs.map((j) => j.department).filter(Boolean)))
  ];

  // Open apply form
  const handleOpenApply = (job) => {
    setViewingJob(null);
    setApplyingJob(job);
    setAppForm({
      fullName: '',
      email: '',
      phone: '',
      currentLocation: job.location || '',
      experience: job.experience || 'Fresher',
      coverLetter: ''
    });
    setResumeFile(null);
    setAppErrors({});
    setAppSuccessMessage(null);
  };

  // Handle application form change
  const handleAppChange = (e) => {
    const { name, value } = e.target;
    setAppForm((prev) => ({ ...prev, [name]: value }));
    if (appErrors[name]) {
      setAppErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'doc', 'docx'].includes(ext)) {
        setAppErrors((prev) => ({ ...prev, resume: 'Please upload a PDF, DOC, or DOCX file.' }));
        setResumeFile(null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setAppErrors((prev) => ({ ...prev, resume: 'File size must be under 10MB.' }));
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setAppErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  // Validate and submit application
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!appForm.fullName.trim() || appForm.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name';
    }
    if (!appForm.email.trim() || !appForm.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    if (!appForm.phone.trim() || appForm.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!appForm.currentLocation.trim()) {
      errors.currentLocation = 'Please provide your current city/location';
    }

    if (Object.keys(errors).length > 0) {
      setAppErrors(errors);
      return;
    }

    setIsSubmittingApp(true);
    try {
      const formData = new FormData();
      formData.append('full_name', appForm.fullName.trim());
      formData.append('email', appForm.email.trim());
      formData.append('phone', appForm.phone.trim());
      formData.append('position', applyingJob ? applyingJob.title : 'General Application');
      formData.append('experience', appForm.experience || 'Fresher');
      formData.append('current_location', appForm.currentLocation.trim());
      if (applyingJob && applyingJob.id) {
        formData.append('job_id', applyingJob.id);
      }
      if (appForm.coverLetter) {
        formData.append('cover_letter', appForm.coverLetter.trim());
      }
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Application submission failed. Please try again.');
      }

      setAppSuccessMessage(
        `Thank you, ${appForm.fullName.trim()}! Your application for "${applyingJob?.title || 'Open Position'}" has been successfully submitted. Our recruitment team will review your profile and contact you soon.`
      );

      // Also trigger optional callback to parent
      if (onApplyJob && applyingJob) {
        onApplyJob(applyingJob.title);
      }
    } catch (err) {
      console.error('Application submit error:', err);
      setAppErrors((prev) => ({
        ...prev,
        submit: err.message || 'Failed to submit application. Please check your connection.'
      }));
    } finally {
      setIsSubmittingApp(false);
    }
  };

  return (
    <div
      className="hti-careers-popup-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-popup-main-title"
    >
      <div
        className="hti-careers-popup-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow orb accents */}
        <div className="hti-popup-glow-orb glow-top-left" aria-hidden="true" />
        <div className="hti-popup-glow-orb glow-bottom-right" aria-hidden="true" />

        {/* POPUP HEADER */}
        <header className="hti-careers-popup-header">
          <div className="hti-popup-header-content">
            {/* Header Visual Illustration Badge */}
            <div className="hti-popup-hero-visual">
              <div className="hti-recruitment-illustration-box">
                <Briefcase size={32} className="hero-briefcase-icon" />
                <div className="hero-sparkle-pill">
                  <Sparkles size={13} />
                  <span>WE ARE HIRING</span>
                </div>
              </div>
            </div>

            <div className="hti-popup-header-info">
              <div className="hti-popup-brand-badge">
                <span className="brand-dot-live" />
                <span className="brand-tag-name">HTI CAREERS</span>
              </div>
              <h2 id="career-popup-main-title" className="hti-popup-main-title">
                Build Your Career With HTI
              </h2>
              <p className="hti-popup-main-subtitle">
                Discover exciting opportunities and become part of our growing team.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="hti-popup-close-button"
            onClick={onClose}
            aria-label="Close career popup"
          >
            <X size={20} />
          </button>
        </header>

        {/* POPUP BODY CONTENT */}
        <div className="hti-careers-popup-body">
          {/* SECTION HEADING */}
          <div className="hti-openings-section-title-wrap">
            <div className="section-title-left">
              <h3 className="hti-openings-heading">Current Job Openings</h3>
              <p className="hti-openings-subheading">
                Explore available opportunities at HTI Automation &amp; Security Systems.
              </p>
            </div>
            <div className="openings-live-count-badge">
              <span className="count-number">{liveJobs.length}</span>
              <span className="count-label">Active Vacancies</span>
            </div>
          </div>

          {/* Department Filter Tabs (if more than 1 department) */}
          {departmentsList.length > 2 && (
            <div className="hti-popup-dept-filter-bar">
              {departmentsList.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  className={`hti-dept-filter-btn ${selectedDeptFilter === dept ? 'is-active' : ''}`}
                  onClick={() => setSelectedDeptFilter(dept)}
                >
                  <span>{dept}</span>
                  {dept !== 'All' && (
                    <span className="dept-tag-count">
                      {liveJobs.filter((j) => j.department === dept).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* LOADING SKELETON */}
          {isLoading && (
            <div className="hti-popup-skeleton-grid">
              {[1, 2, 3].map((n) => (
                <div key={n} className="hti-job-card-skeleton">
                  <div className="skeleton-line title" />
                  <div className="skeleton-line dept" />
                  <div className="skeleton-line meta" />
                  <div className="skeleton-line desc" />
                  <div className="skeleton-line buttons" />
                </div>
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!isLoading && displayJobs.length === 0 && (
            <div className="hti-popup-empty-state">
              <div className="empty-state-icon-wrap">
                <Briefcase size={36} />
              </div>
              <h4>No Active Openings in this Department</h4>
              <p>
                We do not have active vacancies in "{selectedDeptFilter}" right now, but we are always eager to meet talented individuals.
              </p>
              {selectedDeptFilter !== 'All' && (
                <button
                  type="button"
                  className="empty-state-action-btn"
                  onClick={() => setSelectedDeptFilter('All')}
                >
                  View All Openings ({liveJobs.length})
                </button>
              )}
            </div>
          )}

          {/* JOB CARDS GRID */}
          {!isLoading && displayJobs.length > 0 && (
            <div className="hti-popup-jobs-grid">
              {displayJobs.map((job, index) => {
                const deptIcon = getDepartmentIcon(job.department);
                const hasSalary = Boolean(job.salary_range && job.salary_range.trim());
                const hasDeadline = Boolean(job.deadline && job.deadline.trim());

                return (
                  <article
                    key={job.id || index}
                    className="hti-popup-job-card"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Card Top: Department & Openings */}
                    <div className="hti-card-top-row">
                      <div className="hti-card-dept-badge">
                        <span className="dept-icon">{deptIcon}</span>
                        <span className="dept-name">{job.department}</span>
                      </div>
                      <div className="hti-card-openings-badge">
                        <Users size={12} />
                        <span>
                          {job.openings || 1} {Number(job.openings) === 1 ? 'Opening' : 'Openings'}
                        </span>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h4 className="hti-card-job-title">{job.title}</h4>

                    {/* Meta Chips */}
                    <div className="hti-card-chips-cluster">
                      <span className="card-chip">
                        <MapPin size={12} />
                        <span>{job.location || 'Navi Mumbai HQ'}</span>
                      </span>

                      <span className="card-chip">
                        <Briefcase size={12} />
                        <span>{job.employment_type || 'Full-time'}</span>
                      </span>

                      <span className="card-chip">
                        <Clock size={12} />
                        <span>{job.experience || 'Fresher'}</span>
                      </span>

                      {hasSalary && (
                        <span className="card-chip salary-highlight">
                          <IndianRupee size={12} />
                          <span>{job.salary_range}</span>
                        </span>
                      )}

                      {hasDeadline && (
                        <span className="card-chip deadline-chip">
                          <Calendar size={12} />
                          <span>Deadline: {job.deadline}</span>
                        </span>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="hti-card-description">
                      {job.description ||
                        'Exciting career opportunity at HTI Automation & Security Systems. Join our passionate engineering and support family.'}
                    </p>

                    {/* Skills pills if provided */}
                    {job.skills && (
                      <div className="hti-card-skills-row">
                        {job.skills
                          .split(',')
                          .slice(0, 3)
                          .map((skill, sIdx) => (
                            <span key={sIdx} className="card-skill-tag">
                              {skill.trim()}
                            </span>
                          ))}
                        {job.skills.split(',').length > 3 && (
                          <span className="card-skill-tag more">
                            +{job.skills.split(',').length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Card Action Buttons: View Details & Apply Now */}
                    <div className="hti-card-actions-row">
                      <button
                        type="button"
                        className="hti-btn-view-details"
                        onClick={() => setViewingJob(job)}
                        title={`View complete details for ${job.title}`}
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>

                      <button
                        type="button"
                        className="hti-btn-apply-now"
                        onClick={() => handleOpenApply(job)}
                        title={`Apply for ${job.title}`}
                      >
                        <span>Apply Now</span>
                        <ArrowRight size={14} className="apply-btn-arrow" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* POPUP FOOTER */}
        <footer className="hti-careers-popup-footer">
          <div className="hti-popup-footer-left">
            <span className="footer-company-note">
              HTI Automation &amp; Security Systems Pvt. Ltd. • ISO 9001:2015 Certified
            </span>
          </div>
          <div className="hti-popup-footer-right">
            <span className="footer-direct-contact">
              Direct HR desk: <strong>careers@htisystems.in</strong>
            </span>
          </div>
        </footer>

        {/* =====================================================================
            PART 4: VIEW DETAILS MODAL
            ===================================================================== */}
        {viewingJob && (
          <div
            className="hti-nested-modal-backdrop"
            onClick={() => setViewingJob(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="hti-nested-modal-box job-details-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nested-modal-header">
                <div className="nested-modal-title-group">
                  <div className="hti-card-dept-badge">
                    <span className="dept-icon">{getDepartmentIcon(viewingJob.department)}</span>
                    <span className="dept-name">{viewingJob.department}</span>
                  </div>
                  <h3 className="nested-modal-job-title">{viewingJob.title}</h3>
                  <div className="nested-modal-meta-row">
                    <span className="nested-meta-item">
                      <MapPin size={13} /> {viewingJob.location || 'Navi Mumbai HQ'}
                    </span>
                    <span className="nested-meta-item">
                      <Briefcase size={13} /> {viewingJob.employment_type || 'Full-time'}
                    </span>
                    <span className="nested-meta-item">
                      <Clock size={13} /> {viewingJob.experience || 'Fresher'}
                    </span>
                    <span className="nested-meta-item">
                      <Users size={13} /> {viewingJob.openings || 1}{' '}
                      {Number(viewingJob.openings) === 1 ? 'Opening' : 'Openings'}
                    </span>
                    {viewingJob.salary_range && (
                      <span className="nested-meta-item salary">
                        <IndianRupee size={13} /> {viewingJob.salary_range}
                      </span>
                    )}
                    {viewingJob.deadline && (
                      <span className="nested-meta-item deadline">
                        <Calendar size={13} /> Deadline: {viewingJob.deadline}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="nested-modal-close-btn"
                  onClick={() => setViewingJob(null)}
                  aria-label="Close Job Details"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="nested-modal-body">
                {/* Complete Job Description */}
                <div className="detail-content-block">
                  <h4 className="detail-block-title">Complete Job Description</h4>
                  <p className="detail-block-paragraph">{viewingJob.description}</p>
                </div>

                {/* Key Responsibilities */}
                {viewingJob.responsibilities && (
                  <div className="detail-content-block">
                    <h4 className="detail-block-title">Key Responsibilities</h4>
                    <ul className="detail-points-list">
                      {viewingJob.responsibilities
                        .split('\n')
                        .filter((line) => line.trim().length > 0)
                        .map((line, idx) => (
                          <li key={idx} className="detail-point-item">
                            <CheckCircle2 size={15} className="detail-check-icon" />
                            <span>{line.replace(/^[-•*]\s*/, '').trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Required Qualifications */}
                {viewingJob.qualifications && (
                  <div className="detail-content-block">
                    <h4 className="detail-block-title">Required Qualifications</h4>
                    <ul className="detail-points-list">
                      {viewingJob.qualifications
                        .split('\n')
                        .filter((line) => line.trim().length > 0)
                        .map((line, idx) => (
                          <li key={idx} className="detail-point-item">
                            <CheckCircle2 size={15} className="detail-check-icon" />
                            <span>{line.replace(/^[-•*]\s*/, '').trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Required Skills */}
                {viewingJob.skills && (
                  <div className="detail-content-block">
                    <h4 className="detail-block-title">Required Skills</h4>
                    <div className="detail-skills-tags-cluster">
                      {viewingJob.skills.split(',').map((s, idx) => (
                        <span key={idx} className="detail-skill-badge">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Requirements */}
                {viewingJob.additional_requirements && (
                  <div className="detail-content-block">
                    <h4 className="detail-block-title">Additional Requirements</h4>
                    <div className="detail-additional-callout">
                      <Sparkles size={16} className="callout-icon" />
                      <span>{viewingJob.additional_requirements}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="nested-modal-footer">
                <button
                  type="button"
                  className="nested-footer-back-btn"
                  onClick={() => setViewingJob(null)}
                >
                  Back to Openings
                </button>
                <button
                  type="button"
                  className="nested-footer-apply-btn"
                  onClick={() => handleOpenApply(viewingJob)}
                >
                  <span>Apply for this Position</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PART 4: APPLY NOW MODAL
            ===================================================================== */}
        {applyingJob && (
          <div
            className="hti-nested-modal-backdrop"
            onClick={() => !isSubmittingApp && setApplyingJob(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="hti-nested-modal-box job-apply-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nested-modal-header">
                <div>
                  <div className="applying-for-badge">
                    <span>APPLYING FOR</span>
                  </div>
                  <h3 className="nested-modal-job-title">{applyingJob.title}</h3>
                  <span className="applying-dept-hint">
                    Department: {applyingJob.department} • {applyingJob.location}
                  </span>
                </div>
                <button
                  type="button"
                  className="nested-modal-close-btn"
                  onClick={() => !isSubmittingApp && setApplyingJob(null)}
                  disabled={isSubmittingApp}
                  aria-label="Close application form"
                >
                  <X size={18} />
                </button>
              </div>

              {appSuccessMessage ? (
                <div className="apply-success-view">
                  <div className="success-icon-container">
                    <CheckCircle2 size={48} className="success-check-icon" />
                  </div>
                  <h4 className="success-headline">Application Submitted!</h4>
                  <p className="success-message-text">{appSuccessMessage}</p>
                  <div className="success-actions">
                    <button
                      type="button"
                      className="btn-success-done"
                      onClick={() => setApplyingJob(null)}
                    >
                      Done &amp; View Other Openings
                    </button>
                  </div>
                </div>
              ) : (
                <form className="apply-form-container" onSubmit={handleSubmitApplication}>
                  <div className="apply-form-grid">
                    {/* 1. Full Name */}
                    <div className="apply-field-group">
                      <label className="apply-label">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        className={`apply-input ${appErrors.fullName ? 'is-error' : ''}`}
                        placeholder="e.g. Ramesh Kumar"
                        value={appForm.fullName}
                        onChange={handleAppChange}
                      />
                      {appErrors.fullName && (
                        <span className="apply-err-msg">{appErrors.fullName}</span>
                      )}
                    </div>

                    {/* 2. Email Address */}
                    <div className="apply-field-group">
                      <label className="apply-label">
                        Email Address <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className={`apply-input ${appErrors.email ? 'is-error' : ''}`}
                        placeholder="e.g. ramesh.kumar@example.com"
                        value={appForm.email}
                        onChange={handleAppChange}
                      />
                      {appErrors.email && (
                        <span className="apply-err-msg">{appErrors.email}</span>
                      )}
                    </div>

                    {/* 3. Mobile Number */}
                    <div className="apply-field-group">
                      <label className="apply-label">
                        Mobile Number <span className="req">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className={`apply-input ${appErrors.phone ? 'is-error' : ''}`}
                        placeholder="e.g. 9876543210"
                        value={appForm.phone}
                        onChange={handleAppChange}
                      />
                      {appErrors.phone && (
                        <span className="apply-err-msg">{appErrors.phone}</span>
                      )}
                    </div>

                    {/* 4. Current Location */}
                    <div className="apply-field-group">
                      <label className="apply-label">
                        Current Location <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        name="currentLocation"
                        className={`apply-input ${appErrors.currentLocation ? 'is-error' : ''}`}
                        placeholder="e.g. Navi Mumbai / Thane / Pune"
                        value={appForm.currentLocation}
                        onChange={handleAppChange}
                      />
                      {appErrors.currentLocation && (
                        <span className="apply-err-msg">{appErrors.currentLocation}</span>
                      )}
                    </div>

                    {/* 5. Experience */}
                    <div className="apply-field-group">
                      <label className="apply-label">
                        Experience <span className="req">*</span>
                      </label>
                      <select
                        name="experience"
                        className="apply-select"
                        value={appForm.experience}
                        onChange={handleAppChange}
                      >
                        <option value="Fresher">Fresher (0 Years)</option>
                        <option value="0–1 Years">0–1 Years</option>
                        <option value="1–3 Years">1–3 Years</option>
                        <option value="3–5 Years">3–5 Years</option>
                        <option value="5–8 Years">5–8 Years</option>
                        <option value="8+ Years">8+ Years</option>
                      </select>
                    </div>

                    {/* 6. Resume Upload */}
                    <div className="apply-field-group">
                      <label className="apply-label">
                        Resume Upload <span className="opt">(PDF, DOC, DOCX up to 10MB)</span>
                      </label>
                      <div className="apply-file-dropzone">
                        <input
                          type="file"
                          id="candidate-resume"
                          className="file-hidden-input"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="candidate-resume" className="file-dropzone-label">
                          <UploadCloud size={20} className="upload-icon" />
                          <span className="file-name-text">
                            {resumeFile ? resumeFile.name : 'Choose or Drag & Drop Resume File'}
                          </span>
                          <span className="browse-badge">Browse File</span>
                        </label>
                      </div>
                      {appErrors.resume && (
                        <span className="apply-err-msg">{appErrors.resume}</span>
                      )}
                    </div>
                  </div>

                  {/* 7. Cover Letter (Optional) */}
                  <div className="apply-field-group full-width" style={{ marginTop: '14px' }}>
                    <label className="apply-label">
                      Cover Letter / Note to Hiring Manager <span className="opt">(Optional)</span>
                    </label>
                    <textarea
                      name="coverLetter"
                      rows="3"
                      className="apply-textarea"
                      placeholder="Briefly describe why you are interested in this position and why you are a great fit for HTI..."
                      value={appForm.coverLetter}
                      onChange={handleAppChange}
                    />
                  </div>

                  {appErrors.submit && (
                    <div className="apply-submit-error">
                      <AlertCircle size={16} />
                      <span>{appErrors.submit}</span>
                    </div>
                  )}

                  {/* Submit Actions */}
                  <div className="apply-form-footer">
                    <button
                      type="button"
                      className="apply-cancel-btn"
                      onClick={() => setApplyingJob(null)}
                      disabled={isSubmittingApp}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="apply-submit-btn"
                      disabled={isSubmittingApp}
                    >
                      {isSubmittingApp ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
