import React, { useState, useEffect } from 'react';
import {
  X,
  Briefcase,
  Building2,
  MapPin,
  Clock,
  IndianRupee,
  Calendar,
  Layers,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Save,
  Send,
  Users,
  Code2,
  Cpu
} from 'lucide-react';
import './AdminJobModal.css';

const DEPARTMENT_OPTIONS = [
  'Software Development',
  'Engineering',
  'Site Operations & Commissioning',
  'Field Engineering & Commissioning',
  'Sales & Business Development',
  'Finance & Accounts',
  'Supply Chain & Logistics',
  'Quality Assurance & Compliance',
  'Marketing & Communications'
];

const CATEGORY_OPTIONS = ['Full-time', 'Internship', 'Contract'];
const EMPLOYMENT_TYPE_OPTIONS = ['Full-time', 'Hybrid', 'On-site', 'Remote', 'Part-time'];

const PRESET_JOBS = [
  {
    name: 'Full Stack Developer',
    icon: Code2,
    data: {
      title: 'Full Stack Developer',
      department: 'Software Development',
      job_category: 'Full-time',
      employment_type: 'Full-time',
      location: 'Navi Mumbai HQ / Hybrid',
      openings: 2,
      experience: '0–2 Years',
      salary_range: '₹4,00,000 – ₹7,50,000 P.A.',
      skills: 'React.js, JavaScript, Python, FastAPI, REST APIs, MySQL, HTML5/CSS3',
      description: 'Work on modern web applications, internal business systems, and automation platforms powering HTI\'s building management and cleanroom interlocking operations.',
      responsibilities: '• Develop and optimize responsive frontend interfaces with React.js.\n• Integrate FastAPI backend endpoints with MySQL/SQLite databases.\n• Troubleshoot applications, maintain existing systems, and enhance security.\n• Collaborate with engineering teams to digitize hardware telemetry & BMS dashboards.',
      qualifications: '• B.E. / B.Tech / BCA / MCA in Computer Science, IT, or equivalent practical experience.\n• Hands-on familiarity with React.js, Python, and RESTful architectures.\n• Passion for building rock-solid, production-grade applications.',
      deadline: '2026-12-31',
      status: 'Published'
    }
  },
  {
    name: 'Automation Engineer',
    icon: Cpu,
    data: {
      title: 'Automation Engineer',
      department: 'Engineering',
      job_category: 'Full-time',
      employment_type: 'Full-time',
      location: 'Navi Mumbai HQ + Field Deployments',
      openings: 3,
      experience: '1–3 Years',
      salary_range: '₹3,50,000 – ₹6,00,000 P.A.',
      skills: 'Industrial Automation, PLC Programming, Sensors, Control Systems, Relay Logic',
      description: 'Support the design, implementation, and maintenance of industrial automation solutions including cleanroom door interlocking, automatic sliding doors, and boom barrier security systems.',
      responsibilities: '• Program, calibrate, and test PLC logic and sensor interlocks for pharmaceutical cleanrooms.\n• Perform field installation, wiring termination, and loop testing at client facilities.\n• Troubleshoot low-voltage electrical controls, actuators, and motorized gate operators.\n• Generate technical commissioning sign-offs and provide customer operator training.',
      qualifications: '• Diploma or B.E. in Electrical, Electronics, Instrumentation, or Mechatronics Engineering.\n• Practical exposure to relay logic, sensor calibration, and DC/AC motor controllers.\n• Willingness to travel to client industrial plants across Maharashtra & pan-India.',
      deadline: '2026-12-31',
      status: 'Published'
    }
  }
];

export default function AdminJobModal({ isOpen, onClose, onSave, editingJob = null }) {
  const isEditing = Boolean(editingJob && editingJob.id);

  const initialForm = {
    title: '',
    department: 'Engineering',
    job_category: 'Full-time',
    employment_type: 'Full-time',
    location: 'Navi Mumbai HQ',
    openings: 1,
    experience: '1–3 Years',
    salary_range: '',
    skills: '',
    description: '',
    responsibilities: '',
    qualifications: '',
    deadline: '',
    status: 'Published'
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title || '',
        department: editingJob.department || 'Engineering',
        job_category: editingJob.job_category || 'Full-time',
        employment_type: editingJob.employment_type || 'Full-time',
        location: editingJob.location || 'Navi Mumbai HQ',
        openings: editingJob.openings || 1,
        experience: editingJob.experience || '1–3 Years',
        salary_range: editingJob.salary_range || '',
        skills: editingJob.skills || '',
        description: editingJob.description || '',
        responsibilities: editingJob.responsibilities || '',
        qualifications: editingJob.qualifications || '',
        deadline: editingJob.deadline || '',
        status: editingJob.status || 'Published'
      });
      setErrors({});
    } else {
      setFormData(initialForm);
      setErrors({});
    }
  }, [editingJob, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const applyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      ...preset.data
    }));
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience required is needed';
    if (!formData.skills.trim()) newErrors.skills = 'Please enter key technical skills';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (Number(formData.openings) < 1) newErrors.openings = 'Must have at least 1 opening';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (submitStatus) => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        status: submitStatus,
        id: editingJob?.id
      };
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error('Failed to submit job:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="adm-job-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="adm-job-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="adm-job-modal-header">
          <div className="adm-job-header-left">
            <div className="adm-job-icon-wrap">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="adm-job-badge-hti">
                <span className="adm-job-badge-dot" />
                <span>HTI Automation &amp; Security Careers Desk</span>
              </div>
              <h3 className="adm-job-modal-title">
                {isEditing ? 'Edit Job Vacancy' : 'Create New Job Vacancy'}
              </h3>
              <p className="adm-job-modal-subtitle">
                {isEditing
                  ? 'Update position specifications, qualifications, and live publication state.'
                  : 'Publish high-priority roles directly to the HTI Careers portal & candidate intake desk.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="adm-job-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Presets (Only when creating new job) */}
        {!isEditing && (
          <div className="adm-job-presets-bar">
            <div className="adm-job-presets-label">
              <Sparkles size={14} />
              <span>Suggested HTI Roles:</span>
            </div>
            <div className="adm-job-presets-btns">
              {PRESET_JOBS.map((preset, idx) => {
                const IconComponent = preset.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    className="adm-job-preset-pill"
                    onClick={() => applyPreset(preset)}
                  >
                    <IconComponent size={13} />
                    <span>Auto-fill {preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="adm-job-modal-body">
          <div className="adm-job-form-grid">
            {/* 1. Job Title */}
            <div className="adm-job-form-group col-span-2">
              <label className="adm-job-label" htmlFor="job-title">
                Job Title <span className="req-star">*</span>
              </label>
              <div className="adm-job-input-wrapper">
                <Briefcase size={16} className="adm-job-input-icon" />
                <input
                  id="job-title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer, Automation Engineer, Site Engineer"
                  className={`adm-job-input ${errors.title ? 'is-error' : ''}`}
                />
              </div>
              {errors.title && <span className="adm-job-error-text">{errors.title}</span>}
            </div>

            {/* 2. Department */}
            <div className="adm-job-form-group">
              <label className="adm-job-label" htmlFor="job-department">
                Department <span className="req-star">*</span>
              </label>
              <div className="adm-job-input-wrapper">
                <Building2 size={16} className="adm-job-input-icon" />
                <select
                  id="job-department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`adm-job-select ${errors.department ? 'is-error' : ''}`}
                >
                  {DEPARTMENT_OPTIONS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              {errors.department && <span className="adm-job-error-text">{errors.department}</span>}
            </div>

            {/* 3. Job Category */}
            <div className="adm-job-form-group">
              <label className="adm-job-label" htmlFor="job-category">
                Job Category <span className="req-star">*</span>
              </label>
              <div className="adm-job-input-wrapper">
                <Layers size={16} className="adm-job-input-icon" />
                <select
                  id="job-category"
                  name="job_category"
                  value={formData.job_category}
                  onChange={handleChange}
                  className="adm-job-select"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Employment Type */}
            <div className="adm-job-form-group">
              <label className="adm-job-label" htmlFor="job-employment-type">
                Employment Type <span className="req-star">*</span>
              </label>
              <div className="adm-job-input-wrapper">
                <Clock size={16} className="adm-job-input-icon" />
                <select
                  id="job-employment-type"
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  className="adm-job-select"
                >
                  {EMPLOYMENT_TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5. Work Location */}
            <div className="adm-job-form-group">
              <label className="adm-job-label" htmlFor="job-location">
                Work Location <span className="req-star">*</span>
              </label>
              <div className="adm-job-input-wrapper">
                <MapPin size={16} className="adm-job-input-icon" />
                <input
                  id="job-location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Navi Mumbai HQ, Mumbai + Pan-India"
                  className={`adm-job-input ${errors.location ? 'is-error' : ''}`}
                />
              </div>
              {errors.location && <span className="adm-job-error-text">{errors.location}</span>}
            </div>

            {/* 6. Number of Openings */}
            <div className="adm-job-form-group">
              <label className="adm-job-label" htmlFor="job-openings">
                Number of Openings <span className="req-star">*</span>
              </label>
              <div className="adm-job-input-wrapper">
                <Users size={16} className="adm-job-input-icon" />
                <input
                  id="job-openings"
                  type="number"
                  name="openings"
                  min="1"
                  max="100"
                  value={formData.openings}
                  onChange={handleChange}
                  className={`adm-job-input ${errors.openings ? 'is-error' : ''}`}
                />
              </div>
              {errors.openings && <span className="adm-job-error-text">{errors.openings}</span>}
            </div>

            {/* 7. Experience Required */}
            <div className="adm-job-form-group">
              <label className="adm-job-label" htmlFor="job-experience">
                Experience Required <span className="req-star">*</span>
              </label>
              <div className="adm-job-input-wrapper">
                <Clock size={16} className="adm-job-input-icon" />
                <input
                  id="job-experience"
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 0–2 Years, 1–3 Years, Freshers Welcome"
                  className={`adm-job-input ${errors.experience ? 'is-error' : ''}`}
                />
              </div>
              {errors.experience && <span className="adm-job-error-text">{errors.experience}</span>}
            </div>

            {/* 8. Salary Range (Optional) */}
            <div className="adm-job-form-group">
              <label className="adm-job-label" htmlFor="job-salary">
                Salary Range <span className="opt-label">(Optional)</span>
              </label>
              <div className="adm-job-input-wrapper">
                <IndianRupee size={16} className="adm-job-input-icon" />
                <input
                  id="job-salary"
                  type="text"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleChange}
                  placeholder="e.g. ₹4,00,000 – ₹7,50,000 P.A. or Commensurate"
                  className="adm-job-input"
                />
              </div>
            </div>

            {/* 9. Application Deadline */}
            <div className="adm-job-form-group">
              <label className="adm-job-label" htmlFor="job-deadline">
                Application Deadline <span className="opt-label">(Optional)</span>
              </label>
              <div className="adm-job-input-wrapper">
                <Calendar size={16} className="adm-job-input-icon" />
                <input
                  id="job-deadline"
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="adm-job-input"
                />
              </div>
            </div>

            {/* 10. Required Technical Skills */}
            <div className="adm-job-form-group col-span-2">
              <label className="adm-job-label" htmlFor="job-skills">
                Required Technical Skills <span className="req-star">*</span>
              </label>
              <div className="adm-job-input-wrapper">
                <Code2 size={16} className="adm-job-input-icon" />
                <input
                  id="job-skills"
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React.js, Python, FastAPI, MySQL, PLC, Sensors, Relay Control"
                  className={`adm-job-input ${errors.skills ? 'is-error' : ''}`}
                />
              </div>
              {errors.skills && <span className="adm-job-error-text">{errors.skills}</span>}
            </div>

            {/* 11. Job Description */}
            <div className="adm-job-form-group col-span-2">
              <label className="adm-job-label" htmlFor="job-desc">
                Job Description <span className="req-star">*</span>
              </label>
              <textarea
                id="job-desc"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed summary of the role, team objectives, and day-to-day context..."
                className={`adm-job-textarea ${errors.description ? 'is-error' : ''}`}
              />
              {errors.description && <span className="adm-job-error-text">{errors.description}</span>}
            </div>

            {/* 12. Key Responsibilities */}
            <div className="adm-job-form-group col-span-2">
              <label className="adm-job-label" htmlFor="job-responsibilities">
                Key Responsibilities <span className="opt-label">(One per line)</span>
              </label>
              <textarea
                id="job-responsibilities"
                name="responsibilities"
                rows="3"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="• Develop frontend interfaces with React.js&#10;• Integrate FastAPI REST endpoints&#10;• Troubleshoot and support live automation hardware"
                className="adm-job-textarea"
              />
            </div>

            {/* 13. Required Qualifications */}
            <div className="adm-job-form-group col-span-2">
              <label className="adm-job-label" htmlFor="job-qualifications">
                Required Qualifications <span className="opt-label">(One per line)</span>
              </label>
              <textarea
                id="job-qualifications"
                name="qualifications"
                rows="3"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="• B.E. / B.Tech in Computer Science or Electrical/Electronics Engineering&#10;• Hands-on experience with production systems&#10;• Strong communication and collaborative mindset"
                className="adm-job-textarea"
              />
            </div>

            {/* 14. Job Status (Draft vs Published) */}
            <div className="adm-job-form-group col-span-2">
              <label className="adm-job-label">Job Publication Status</label>
              <div className="adm-job-status-picker">
                <label className={`adm-job-status-pill ${formData.status === 'Published' ? 'is-active is-published' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="Published"
                    checked={formData.status === 'Published'}
                    onChange={handleChange}
                  />
                  <CheckCircle2 size={16} />
                  <div className="adm-job-status-text">
                    <span className="adm-job-status-title">Published (Live)</span>
                    <span className="adm-job-status-desc">Visible on public Career Page and Opportunities popup</span>
                  </div>
                </label>

                <label className={`adm-job-status-pill ${formData.status === 'Draft' ? 'is-active is-draft' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="Draft"
                    checked={formData.status === 'Draft'}
                    onChange={handleChange}
                  />
                  <Save size={16} />
                  <div className="adm-job-status-text">
                    <span className="adm-job-status-title">Draft (Admin Only)</span>
                    <span className="adm-job-status-desc">Hidden from public website visitors; visible to recruiters</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="adm-job-modal-footer">
          <button
            type="button"
            className="adm-job-btn-cancel"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <div className="adm-job-footer-right">
            <button
              type="button"
              className="adm-job-btn-draft"
              onClick={() => handleSubmit('Draft')}
              disabled={isSubmitting}
            >
              <Save size={15} />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              className="adm-job-btn-publish"
              onClick={() => handleSubmit('Published')}
              disabled={isSubmitting}
            >
              <Send size={15} />
              <span>{isEditing ? 'Save & Publish' : 'Publish Job'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

