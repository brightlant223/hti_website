import React, { useState, useMemo } from 'react';
import './AdminCareersManager.css';
import {
  Briefcase,
  Users,
  Search,
  Filter,
  RefreshCw,
  Download,
  FileText,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  Copy,
  ExternalLink,
  Database,
  Server,
  MessageSquare,
  Sparkles,
  UserCheck,
  ChevronRight,
  X,
  Save,
  Check
} from 'lucide-react';

const STATUS_OPTIONS = [
  'New',
  'In Review',
  'Shortlisted',
  'Interview Scheduled',
  'Offer Extended',
  'Rejected'
];

function formatAppDate(dateStr) {
  if (!dateStr) return 'Just now';
  try {
    const cleanStr = String(dateStr).trim().replace(' ', 'T');
    const d = new Date(cleanStr);
    if (isNaN(d.getTime())) return dateStr.split(' ')[0] || dateStr;
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr.split(' ')[0] || dateStr;
  }
}

function formatAppTime(dateStr) {
  if (!dateStr) return '';
  try {
    const cleanStr = String(dateStr).trim().replace(' ', 'T');
    const d = new Date(cleanStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return '';
  }
}

function getInitials(name) {
  if (!name || !name.trim()) return 'HT';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

function formatDisplayName(name) {
  if (!name) return 'Candidate';
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function AdminCareersManager({
  applications = [],
  dbStatus = null,
  onUpdateStatus,
  onSaveNotes,
  onDelete,
  onRefresh,
  showFeedback,
  currentUser = 'Admin'
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPosition, setSelectedPosition] = useState('All');

  // Modal states
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applicantNotes, setApplicantNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState(null);
  const [showDbModal, setShowDbModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = applications.length;
    const newCount = applications.filter((a) => (a.status || '').toLowerCase() === 'new').length;
    const reviewingCount = applications.filter(
      (a) => (a.status || '').toLowerCase() === 'in review' || (a.status || '').toLowerCase() === 'shortlisted'
    ).length;
    const interviewCount = applications.filter(
      (a) =>
        (a.status || '').toLowerCase() === 'interview scheduled' ||
        (a.status || '').toLowerCase() === 'offer extended'
    ).length;

    return { total, newCount, reviewingCount, interviewCount };
  }, [applications]);

  // Unique job positions for filter
  const positionsList = useMemo(() => {
    const set = new Set();
    applications.forEach((a) => {
      if (a.position) set.add(a.position);
    });
    return Array.from(set);
  }, [applications]);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        !searchQuery.trim() ||
        (app.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.phone || '').includes(searchQuery) ||
        (app.position || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === 'All' ||
        (app.status || '').toLowerCase() === selectedStatus.toLowerCase();

      const matchPosition =
        selectedPosition === 'All' || app.position === selectedPosition;

      return matchSearch && matchStatus && matchPosition;
    });
  }, [applications, searchQuery, selectedStatus, selectedPosition]);

  // Open dossier modal
  const handleOpenDossier = (app) => {
    setSelectedApplicant(app);
    setApplicantNotes(app.notes || '');
  };

  // Save notes
  const handleSaveNotesSubmit = async () => {
    if (!selectedApplicant) return;
    setIsSavingNotes(true);
    try {
      if (onSaveNotes) {
        await onSaveNotes(selectedApplicant.id, applicantNotes);
      }
      setSelectedApplicant((prev) => (prev ? { ...prev, notes: applicantNotes } : null));
      if (showFeedback) showFeedback('Recruiter notes saved successfully!', 'success');
    } catch (err) {
      if (showFeedback) showFeedback('Failed to save notes', 'error');
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Status change handler
  const handleStatusChange = async (appId, newStatus) => {
    try {
      if (onUpdateStatus) {
        await onUpdateStatus(appId, newStatus);
      }
      if (selectedApplicant && selectedApplicant.id === appId) {
        setSelectedApplicant((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      if (showFeedback) showFeedback(`Status updated to ${newStatus}`, 'success');
    } catch (err) {
      if (showFeedback) showFeedback('Failed to update status', 'error');
    }
  };

  // Delete handler
  const handleConfirmDelete = async () => {
    if (!applicantToDelete) return;
    try {
      if (onDelete) {
        await onDelete(applicantToDelete.id);
      }
      if (selectedApplicant && selectedApplicant.id === applicantToDelete.id) {
        setSelectedApplicant(null);
      }
      setApplicantToDelete(null);
      if (showFeedback) showFeedback('Application deleted from database', 'info');
    } catch (err) {
      if (showFeedback) showFeedback('Failed to delete application', 'error');
    }
  };

  // Copy helper
  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="adm-careers-container">
      {/* ── 1. HEADER CARD ───────────────────────────────────────────────── */}
      <div className="adm-careers-header-card">
        <div className="adm-careers-header-top">
          <div>
            <div className="adm-careers-eyebrow">
              <UserCheck size={14} />
              <span>Talent Acquisition &amp; Careers</span>
            </div>
            <h2 className="adm-careers-title">Candidate Pipeline &amp; Database</h2>
            <p className="adm-careers-sub">
              Live candidate applications, resume evaluations, and dual-engine MySQL/SQLite pipeline telemetry.
            </p>
          </div>

          <div className="adm-careers-header-actions">
            {/* Database Engine Pill */}
            <button
              type="button"
              className={`adm-careers-db-pill ${dbStatus?.is_connected ? 'mysql' : 'sqlite'}`}
              onClick={() => setShowDbModal(true)}
              title="Click to view database connection diagnostics"
            >
              <span className="adm-careers-db-dot" />
              <span>
                {dbStatus?.is_connected ? 'MySQL 8.0 Connected' : 'SQLite Fallback Active'}
              </span>
            </button>

            {/* Refresh Button */}
            <button
              type="button"
              className="adm-careers-btn secondary"
              onClick={onRefresh}
              title="Refresh candidate applications"
            >
              <RefreshCw size={15} />
              <span>Refresh</span>
            </button>

            {/* Export CSV */}
            <a
              href="/api/careers/applications/export"
              target="_blank"
              rel="noopener noreferrer"
              className="adm-careers-btn secondary"
              title="Download CSV report of applications"
            >
              <Download size={15} />
              <span>Export CSV</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. STAT / KPI CARDS ─────────────────────────────────────────── */}
      <div className="adm-careers-stats-grid">
        <div className="adm-careers-stat-card">
          <div className="adm-careers-stat-icon-wrap blue">
            <Users size={22} />
          </div>
          <div className="adm-careers-stat-info">
            <span className="adm-careers-stat-label">Total Applicants</span>
            <span className="adm-careers-stat-val">{stats.total}</span>
            <span className="adm-careers-stat-sub">Across all job postings</span>
          </div>
        </div>

        <div className="adm-careers-stat-card">
          <div className="adm-careers-stat-icon-wrap coral">
            <Sparkles size={22} />
          </div>
          <div className="adm-careers-stat-info">
            <span className="adm-careers-stat-label">New / Unreviewed</span>
            <span className="adm-careers-stat-val">{stats.newCount}</span>
            <span className="adm-careers-stat-sub">Require initial screening</span>
          </div>
        </div>

        <div className="adm-careers-stat-card">
          <div className="adm-careers-stat-icon-wrap emerald">
            <CheckCircle2 size={22} />
          </div>
          <div className="adm-careers-stat-info">
            <span className="adm-careers-stat-label">In Review / Shortlist</span>
            <span className="adm-careers-stat-val">{stats.reviewingCount}</span>
            <span className="adm-careers-stat-sub">Passed initial profile check</span>
          </div>
        </div>

        <div className="adm-careers-stat-card">
          <div className="adm-careers-stat-icon-wrap purple">
            <Database size={22} />
          </div>
          <div className="adm-careers-stat-info">
            <span className="adm-careers-stat-label">Interview / Offers</span>
            <span className="adm-careers-stat-val">{stats.interviewCount}</span>
            <span className="adm-careers-stat-sub">Scheduled technical discussions</span>
          </div>
        </div>
      </div>

      {/* ── 3. TOOLBAR (SEARCH & FILTERS) ───────────────────────────────── */}
      <div className="adm-careers-toolbar">
        <div className="adm-careers-search-wrap">
          <Search size={16} className="adm-careers-search-icon" />
          <input
            type="text"
            className="adm-careers-search-input"
            placeholder="Search candidate name, email, phone, position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="adm-careers-filter-group">
          <AdminDropdown
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            options={[
              { value: 'All', label: `All Statuses (${applications.length})` },
              ...STATUS_OPTIONS.map(st => ({ value: st, label: st }))
            ]}
            className="adm-careers-bs5-filter"
          />

          <AdminDropdown
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            options={[
              { value: 'All', label: 'All Positions' },
              ...positionsList.map(pos => ({ value: pos, label: pos }))
            ]}
            className="adm-careers-bs5-filter"
          />
        </div>
      </div>

      {/* ── 4. APPLICATIONS TABLE ───────────────────────────────────────── */}
      <div className="adm-careers-table-wrap">
        {filteredApplications.length === 0 ? (
          <div className="adm-empty-state">
            <div className="adm-empty-icon">
              <Briefcase size={28} />
            </div>
            <h4>No Career Applications Found</h4>
            <p>
              {searchQuery || selectedStatus !== 'All' || selectedPosition !== 'All'
                ? 'Try adjusting your search criteria or filter tags.'
                : 'Job applications submitted via the website Careers page will appear here instantly.'}
            </p>
          </div>
        ) : (
          <table className="adm-careers-table">
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>ID</th>
                <th>Candidate Dossier</th>
                <th>Applied Role</th>
                <th>Experience &amp; Notice</th>
                <th style={{ width: '95px', textAlign: 'center' }}>Resume</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Status</th>
                <th style={{ width: '105px', whiteSpace: 'nowrap' }}>Applied On</th>
                <th style={{ width: '70px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => {
                const initials = getInitials(app.full_name);
                const displayName = formatDisplayName(app.full_name);
                const cleanPosition = (app.position || 'Open Application').replace(/[?]/g, '-').trim();
                const statusClass = (app.status || 'New').replace(/\s+/g, '-');

                return (
                  <tr key={app.id}>
                    <td style={{ textAlign: 'center' }}>
                      <span className="adm-row-id">
                        #{app.id}
                      </span>
                    </td>

                    <td>
                      <div className="adm-candidate-cell">
                        <div className="adm-candidate-avatar">{initials}</div>
                        <div className="adm-candidate-meta">
                          <span className="adm-candidate-name">{displayName}</span>
                          <div className="adm-candidate-contacts">
                            <a
                              href={`mailto:${app.email}`}
                              className="adm-candidate-link"
                              title="Send email to applicant"
                            >
                              <Mail size={12} />
                              <span>{app.email}</span>
                            </a>
                            <span className="adm-contact-sep">·</span>
                            <a
                              href={`tel:${app.phone}`}
                              className="adm-candidate-link"
                              title="Call applicant"
                            >
                              <Phone size={12} />
                              <span>{app.phone}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="adm-position-pill">{cleanPosition}</span>
                    </td>

                    <td>
                      <div className="adm-exp-notice-cell">
                        <span className="adm-exp-val">
                          {app.experience || 'Fresher / 0 Years'}
                        </span>
                        <span className="adm-notice-val">
                          Notice: <strong>{app.notice_period || 'Immediately Available'}</strong>
                        </span>
                      </div>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      {app.resume_url ? (
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="adm-resume-btn"
                          title="Open uploaded CV document in new tab"
                        >
                          <FileText size={13} />
                          <span>View CV</span>
                        </a>
                      ) : (
                        <span className="adm-no-resume-pill">No file</span>
                      )}
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <AdminDropdown
                        value={app.status || 'New'}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        options={STATUS_OPTIONS.map(st => ({ value: st, label: st }))}
                        size="sm"
                        isPill={true}
                        customColorTheme={statusClass}
                        className="adm-careers-table-dropdown"
                      />
                    </td>

                    <td className="adm-date-cell">
                      <span className="adm-date-main">{formatAppDate(app.created_at)}</span>
                      {formatAppTime(app.created_at) && (
                        <span className="adm-date-sub">{formatAppTime(app.created_at)}</span>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className="adm-row-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="adm-action-icon-btn"
                          onClick={() => handleOpenDossier(app)}
                          title="View Full Profile & Recruiter Notes"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          className="adm-action-icon-btn delete"
                          onClick={() => setApplicantToDelete(app)}
                          title="Delete application"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── 5. CANDIDATE DOSSIER & NOTES MODAL ───────────────────────────── */}
      {selectedApplicant && (
        <div className="adm-modal-backdrop" onClick={() => setSelectedApplicant(null)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' }}>
                  Candidate Dossier #{selectedApplicant.id}
                </span>
                <h3 className="adm-modal-title">{selectedApplicant.full_name}</h3>
              </div>
              <button
                type="button"
                className="adm-modal-close-btn"
                onClick={() => setSelectedApplicant(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="adm-modal-body">
              {/* Profile Details Grid */}
              <div className="adm-dossier-grid">
                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Position Applied</span>
                  <span className="adm-dossier-val" style={{ color: '#0284c7' }}>
                    {selectedApplicant.position}
                  </span>
                </div>

                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Application Status</span>
                  <AdminDropdown
                    value={selectedApplicant.status || 'New'}
                    onChange={(e) => handleStatusChange(selectedApplicant.id, e.target.value)}
                    options={STATUS_OPTIONS.map(st => ({ value: st, label: st }))}
                    size="sm"
                    isPill={true}
                    className="adm-careers-drawer-dropdown"
                  />
                </div>

                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Email Address</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="adm-dossier-val">{selectedApplicant.email}</span>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7' }}
                      onClick={() => handleCopy(selectedApplicant.email, 'email')}
                      title="Copy email"
                    >
                      {copiedField === 'email' ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Phone Number</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="adm-dossier-val">{selectedApplicant.phone}</span>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7' }}
                      onClick={() => handleCopy(selectedApplicant.phone, 'phone')}
                      title="Copy phone"
                    >
                      {copiedField === 'phone' ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Experience</span>
                  <span className="adm-dossier-val">{selectedApplicant.experience || 'Not specified'}</span>
                </div>

                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Notice Period</span>
                  <span className="adm-dossier-val">{selectedApplicant.notice_period || 'Immediate'}</span>
                </div>
              </div>

              {/* Cover Letter / Remarks */}
              {selectedApplicant.cover_letter && (
                <div>
                  <span className="adm-dossier-label">Candidate Remarks / Cover Letter</span>
                  <div
                    style={{
                      background: 'rgba(2, 132, 199, 0.04)',
                      border: '1px solid rgba(2, 132, 199, 0.15)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap',
                      marginTop: '6px'
                    }}
                  >
                    {selectedApplicant.cover_letter}
                  </div>
                </div>
              )}

              {/* Attached Resume */}
              <div>
                <span className="adm-dossier-label">Curriculum Vitae</span>
                <div style={{ marginTop: '6px' }}>
                  {selectedApplicant.resume_url ? (
                    <a
                      href={selectedApplicant.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="adm-careers-btn primary"
                      style={{ display: 'inline-flex' }}
                    >
                      <FileText size={15} />
                      <span>Download / View Resume Document</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                      No resume uploaded directly. Candidate may provide physical copy or send via email.
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div>
                <span className="adm-dossier-label">Reach Candidate</span>
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <a
                    href={`mailto:${selectedApplicant.email}?subject=HTI Automation Careers — Update on ${selectedApplicant.position}`}
                    className="adm-careers-btn secondary"
                  >
                    <Mail size={14} />
                    <span>Send Email</span>
                  </a>
                  <a href={`tel:${selectedApplicant.phone}`} className="adm-careers-btn secondary">
                    <Phone size={14} />
                    <span>Call Phone</span>
                  </a>
                  <a
                    href={`https://wa.me/91${selectedApplicant.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="adm-careers-btn secondary"
                    style={{ color: '#10b981' }}
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Recruiter Notes */}
              <div>
                <span className="adm-dossier-label">Recruiter Internal Evaluation &amp; Interview Notes</span>
                <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: '2px 0 8px' }}>
                  Private notes visible only to HTI HR &amp; management.
                </p>
                <textarea
                  className="adm-notes-textarea"
                  placeholder="Record interview notes, technical screening feedback, salary expectations, or next steps..."
                  value={applicantNotes}
                  onChange={(e) => setApplicantNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-careers-btn secondary"
                onClick={() => setSelectedApplicant(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="adm-careers-btn primary"
                disabled={isSavingNotes}
                onClick={handleSaveNotesSubmit}
              >
                <Save size={14} />
                <span>{isSavingNotes ? 'Saving...' : 'Save Recruiter Notes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. DELETE CONFIRMATION MODAL ─────────────────────────────────── */}
      {applicantToDelete && (
        <div className="adm-modal-backdrop" onClick={() => setApplicantToDelete(null)}>
          <div className="adm-modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3 className="adm-modal-title" style={{ color: '#ef4444' }}>
                Delete Application
              </h3>
              <button
                type="button"
                className="adm-modal-close-btn"
                onClick={() => setApplicantToDelete(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="adm-modal-body">
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                Are you sure you want to permanently delete the career application for{' '}
                <strong>{applicantToDelete.full_name}</strong> (#{applicantToDelete.id})?
              </p>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '8px 0 0' }}>
                This record and its audit trail will be removed from the database.
              </p>
            </div>
            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-careers-btn secondary"
                onClick={() => setApplicantToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-careers-btn"
                style={{ background: '#ef4444', color: '#ffffff' }}
                onClick={handleConfirmDelete}
              >
                <Trash2 size={14} />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 7. DATABASE STATUS MODAL ─────────────────────────────────────── */}
      {showDbModal && (
        <div className="adm-modal-backdrop" onClick={() => setShowDbModal(false)}>
          <div className="adm-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Database size={20} color="#0284c7" />
                <h3 className="adm-modal-title">Database Telemetry &amp; Config</h3>
              </div>
              <button
                type="button"
                className="adm-modal-close-btn"
                onClick={() => setShowDbModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="adm-modal-body">
              <div
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: dbStatus?.is_connected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                  border: `1px solid ${dbStatus?.is_connected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(2, 132, 199, 0.2)'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                  <span
                    className="adm-careers-db-dot"
                    style={{ background: dbStatus?.is_connected ? '#10b981' : '#0284c7' }}
                  />
                  <span>
                    {dbStatus?.is_connected
                      ? 'MySQL 8.0 Primary Engine Connected'
                      : 'Dual-Engine Protection: SQLite Local DB Active'}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', margin: '6px 0 0', color: '#64748b' }}>
                  {dbStatus?.message ||
                    'Candidate data is immediately recorded and secured. Dual-engine architecture guarantees zero application data loss.'}
                </p>
              </div>

              <div className="adm-dossier-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Configured Host &amp; Port</span>
                  <span className="adm-dossier-val">
                    {dbStatus?.host || 'localhost'}:{dbStatus?.port || '3306'}
                  </span>
                </div>
                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Database Name</span>
                  <span className="adm-dossier-val">{dbStatus?.database || 'hti_careers_db'}</span>
                </div>
                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">MySQL User</span>
                  <span className="adm-dossier-val">{dbStatus?.user || 'root'}</span>
                </div>
                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Fallback Storage Path</span>
                  <span className="adm-dossier-val" style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>
                    backend/hti.db [Table: career_applications]
                  </span>
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-careers-btn primary"
                onClick={() => setShowDbModal(false)}
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
