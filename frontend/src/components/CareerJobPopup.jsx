import React, { useState, useEffect } from 'react';
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Users,
  IndianRupee,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building2,
  Cpu,
  ShieldCheck,
  Code2
} from 'lucide-react';
import './CareerJobPopup.css';

export default function CareerJobPopup({ jobs = [], isOpen, onClose, onApplyJob }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only published jobs
  const publishedJobs = (jobs || []).filter(
    (j) => (j.status || '').toLowerCase() === 'published'
  );

  useEffect(() => {
    if (currentIndex >= publishedJobs.length) {
      setCurrentIndex(0);
    }
  }, [publishedJobs.length, currentIndex]);

  if (!isOpen || publishedJobs.length === 0) return null;

  const currentJob = publishedJobs[currentIndex] || publishedJobs[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : publishedJobs.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < publishedJobs.length - 1 ? prev + 1 : 0));
  };

  const handleCardClick = (job) => {
    if (onApplyJob) {
      onApplyJob(job);
    }
    onClose();
  };

  return (
    <div className="hti-job-popup-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="hti-job-popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Animated Background Orbs */}
        <div className="hti-job-popup-glow-orb orb-1" aria-hidden="true" />
        <div className="hti-job-popup-glow-orb orb-2" aria-hidden="true" />

        {/* Top Floating Close Button */}
        <button
          type="button"
          className="hti-job-popup-close"
          onClick={onClose}
          aria-label="Close opportunities popup"
        >
          <X size={20} />
        </button>

        {/* Header Hero Section */}
        <div className="hti-job-popup-hero">
          <div className="hti-job-popup-tag">
            <span className="hti-job-pulse-dot">
              <span className="pulse-ping" />
              <span className="pulse-core" />
            </span>
            <span>HTI CAREER INITIATIVE &bull; {publishedJobs.length} OPEN {publishedJobs.length === 1 ? 'POSITION' : 'POSITIONS'}</span>
          </div>

          <h2 className="hti-job-popup-heading">
            Build Your Future with <span className="hti-gradient-text">HTI</span>
          </h2>
          <p className="hti-job-popup-subheading">
            Be part of a team shaping the future of Automation, Engineering &amp; Security Solutions.
          </p>
        </div>

        {/* Main Job Showcase (Carousel / Featured Card) */}
        <div className="hti-job-showcase-wrapper">
          {/* Featured Job Card */}
          <div className="hti-job-card-featured">
            <div className="hti-job-card-top">
              <div className="hti-job-card-header-left">
                <div className="hti-job-card-icon-box">
                  {currentJob.department?.toLowerCase().includes('software') ? (
                    <Code2 size={24} />
                  ) : currentJob.department?.toLowerCase().includes('engineering') ? (
                    <Cpu size={24} />
                  ) : (
                    <Briefcase size={24} />
                  )}
                </div>
                <div>
                  <div className="hti-job-dept-badge">{currentJob.department}</div>
                  <h3 className="hti-job-card-title">{currentJob.title}</h3>
                </div>
              </div>

              {/* Status / Openings Pill */}
              <div className="hti-job-openings-pill">
                <Users size={13} />
                <span>{currentJob.openings || 1} {Number(currentJob.openings) === 1 ? 'Opening' : 'Openings'}</span>
              </div>
            </div>

            {/* Meta Tags Chips */}
            <div className="hti-job-meta-grid">
              <div className="hti-job-meta-chip">
                <MapPin size={13} className="meta-icon" />
                <span>{currentJob.location || 'Navi Mumbai HQ'}</span>
              </div>
              <div className="hti-job-meta-chip">
                <Clock size={13} className="meta-icon" />
                <span>{currentJob.experience || 'Experience: Specified in Job'}</span>
              </div>
              <div className="hti-job-meta-chip">
                <Briefcase size={13} className="meta-icon" />
                <span>{currentJob.employment_type || currentJob.job_category || 'Full-time'}</span>
              </div>
              {currentJob.salary_range && (
                <div className="hti-job-meta-chip highlight-salary">
                  <IndianRupee size={13} className="meta-icon" />
                  <span>{currentJob.salary_range}</span>
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="hti-job-card-desc">
              {currentJob.description ||
                'Join HTI Automation to design, engineer, and deploy high-reliability security and cleanroom interlocking infrastructure.'}
            </p>

            {/* Key Skills Tags if provided */}
            {currentJob.skills && (
              <div className="hti-job-skills-wrap">
                <span className="skills-label">Key Skills:</span>
                <div className="skills-pills">
                  {currentJob.skills
                    .split(',')
                    .slice(0, 5)
                    .map((s, sIdx) => (
                      <span key={sIdx} className="skill-pill">
                        {s.trim()}
                      </span>
                    ))}
                  {currentJob.skills.split(',').length > 5 && (
                    <span className="skill-pill more">
                      +{currentJob.skills.split(',').length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Card Action Row */}
            <div className="hti-job-card-action-bar">
              <div className="hti-job-pagination-indicator">
                {publishedJobs.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="hti-job-nav-btn"
                      onClick={handlePrev}
                      aria-label="Previous job opening"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="hti-job-dots">
                      {publishedJobs.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          className={`hti-job-dot ${dotIdx === currentIndex ? 'is-active' : ''}`}
                          onClick={() => setCurrentIndex(dotIdx)}
                          aria-label={`Go to job ${dotIdx + 1}`}
                        />
                      ))}
                    </span>
                    <button
                      type="button"
                      className="hti-job-nav-btn"
                      onClick={handleNext}
                      aria-label="Next job opening"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </div>

              <button
                type="button"
                className="hti-job-apply-primary-btn"
                onClick={() => handleCardClick(currentJob)}
              >
                <span>View Details &amp; Apply</span>
                <ArrowRight size={16} className="btn-arrow-icon" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Browse Note */}
        <div className="hti-job-popup-footer">
          <span>
            Explore all engineering, site deployment, and software roles directly below on this page.
          </span>
          <button
            type="button"
            className="hti-job-continue-link"
            onClick={onClose}
          >
            Continue browsing page &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

