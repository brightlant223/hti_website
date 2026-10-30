import React, { useState, useMemo } from 'react';
import './AdminCareersManager.css';
import './AdminEnquiries.css';
import AdminDropdown from './AdminDropdown';
import {
  Briefcase,
  Users,
  Search,
  Filter,
  RefreshCw,
  Download,
  FileText,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  Plus,
  AlertCircle,
  Clock,
  Calendar,
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
  ChevronLeft,
  X,
  Save,
  Check
} from 'lucide-react';

function getAvatarColorClass(id) {
  const colors = ['avatar-blue', 'avatar-green', 'avatar-pink', 'avatar-purple', 'avatar-amber'];
  return colors[((id || 0) * 7) % colors.length];
}

const STATUS_OPTIONS = [
  'New',
  'In Review',
  'Shortlisted',
  'Interview Scheduled',
  'Offer Extended',
  'Rejected'
];

const STATUS_OPTIONS_WITH_COLORS = [
  { value: 'New', label: 'New', color: '#e11d48' },
  { value: 'In Review', label: 'In Review', color: '#d97706' },
  { value: 'Shortlisted', label: 'Shortlisted', color: '#7c3aed' },
  { value: 'Interview Scheduled', label: 'Interview Scheduled', color: '#0284c7' },
  { value: 'Offer Extended', label: 'Offer Extended', color: '#059669' },
  { value: 'Rejected', label: 'Rejected', color: '#64748b' }
];

function getStatusTheme(status) {
  const s = (status || '').toLowerCase();
  switch (s) {
    case 'new':
      return { bg: 'rgba(225, 29, 72, 0.1)', text: '#e11d48', border: 'rgba(225, 29, 72, 0.3)' };
    case 'in review':
      return { bg: 'rgba(217, 119, 6, 0.1)', text: '#d97706', border: 'rgba(217, 119, 6, 0.3)' };
    case 'shortlisted':
      return { bg: 'rgba(124, 58, 237, 0.1)', text: '#7c3aed', border: 'rgba(124, 58, 237, 0.3)' };
    case 'interview scheduled':
      return { bg: 'rgba(2, 132, 199, 0.1)', text: '#0284c7', border: 'rgba(2, 132, 199, 0.3)' };
    case 'offer extended':
      return { bg: 'rgba(5, 150, 105, 0.1)', text: '#059669', border: 'rgba(5, 150, 105, 0.3)' };
    case 'rejected':
      return { bg: 'rgba(100, 116, 139, 0.1)', text: '#64748b', border: 'rgba(100, 116, 139, 0.3)' };
    default:
      return { bg: 'rgba(2, 132, 199, 0.1)', text: '#0284c7', border: 'rgba(2, 132, 199, 0.3)' };
  }
}

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
  jobs = [],
  onUpdateStatus,
  onSaveNotes,
  onDelete,
  onRefresh,
  showFeedback,
  currentUser = 'Admin',
  onOpenJobModal,
  onToggleJobStatus,
  onDeleteJob
}) {
  const [subTab, setSubTab] = useState('applications'); // 'applications' | 'jobs'
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState('All');
  const [jobDeptFilter, setJobDeptFilter] = useState('All');
  const [jobToDelete, setJobToDelete] = useState(null);
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

  // Row selection & pagination state
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredApplications.map((a) => a.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Calculate statistics (6 pipeline stages matching Sales Enquiries)
  const stats = useMemo(() => {
    const total = applications.length;
    const newCount = applications.filter((a) => (a.status || '').toLowerCase() === 'new').length;
    const inReviewCount = applications.filter((a) => (a.status || '').toLowerCase() === 'in review').length;
    const shortlistedCount = applications.filter((a) => (a.status || '').toLowerCase() === 'shortlisted').length;
    const interviewOffersCount = applications.filter(
      (a) =>
        (a.status || '').toLowerCase() === 'interview scheduled' ||
        (a.status || '').toLowerCase() === 'offer extended'
    ).length;
    const rejectedCount = applications.filter((a) => (a.status || '').toLowerCase() === 'rejected').length;

    return { total, newCount, inReviewCount, shortlistedCount, interviewOffersCount, rejectedCount };
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

      const appStatus = (app.status || '').toLowerCase();
      let matchStatus = false;
      if (selectedStatus === 'All') {
        matchStatus = true;
      } else if (selectedStatus === 'Interview / Offers') {
        matchStatus = ['interview scheduled', 'offer extended'].includes(appStatus);
      } else {
        matchStatus = appStatus === selectedStatus.toLowerCase();
      }

      const matchPosition =
        selectedPosition === 'All' || app.position === selectedPosition;

      return matchSearch && matchStatus && matchPosition;
    });
  }, [applications, searchQuery, selectedStatus, selectedPosition]);

  const totalApps = filteredApplications.length;
  const totalPages = Math.max(1, Math.ceil(totalApps / rowsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const paginatedApplications = useMemo(() => {
    const start = (validCurrentPage - 1) * rowsPerPage;
    return filteredApplications.slice(start, start + rowsPerPage);
  }, [filteredApplications, validCurrentPage, rowsPerPage]);

  const startAppNum = totalApps === 0 ? 0 : (validCurrentPage - 1) * rowsPerPage + 1;
  const endAppNum = Math.min(validCurrentPage * rowsPerPage, totalApps);

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


  // Job Postings Statistics & Filtering
  const jobStats = useMemo(() => {
    const total = jobs.length;
    const published = jobs.filter((j) => (j.status || '').toLowerCase() === 'published').length;
    const drafts = jobs.filter((j) => (j.status || '').toLowerCase() === 'draft').length;
    const totalOpenings = jobs.reduce((acc, curr) => acc + (Number(curr.openings) || 1), 0);
    return { total, published, drafts, totalOpenings };
  }, [jobs]);

  const uniqueDepartments = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => {
      if (j.department) set.add(j.department);
    });
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        !jobSearchQuery.trim() ||
        (job.title || '').toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
        (job.department || '').toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
        (job.skills || '').toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
        (job.location || '').toLowerCase().includes(jobSearchQuery.toLowerCase());

      const matchStatus =
        jobStatusFilter === 'All' ||
        (job.status || '').toLowerCase() === jobStatusFilter.toLowerCase();

      const matchDept =
        jobDeptFilter === 'All' || job.department === jobDeptFilter;

      return matchSearch && matchStatus && matchDept;
    });
  }, [jobs, jobSearchQuery, jobStatusFilter, jobDeptFilter]);

  return (
    <div className="adm-enq-page">
      {/* ── SUB-TABS NAVIGATION: Applications vs Job Vacancies ── */}
      <div className="adm-careers-subtabs-bar">
        <button
          type="button"
          className={`adm-careers-subtab-btn ${subTab === 'applications' ? 'is-active' : ''}`}
          onClick={() => setSubTab('applications')}
        >
          <Users size={16} />
          <span>Candidate Applications</span>
          <span className="adm-careers-tab-count">{applications.length}</span>
        </button>

        <button
          type="button"
          className={`adm-careers-subtab-btn ${subTab === 'jobs' ? 'is-active' : ''}`}
          onClick={() => setSubTab('jobs')}
        >
          <Briefcase size={16} />
          <span>Posted Job Vacancies</span>
          <span className="adm-careers-tab-count">{jobs.length}</span>
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="adm-btn-post-job-primary"
            onClick={() => onOpenJobModal && onOpenJobModal(null)}
          >
            <Plus size={15} />
            <span>Post a Job</span>
          </button>
        </div>
      </div>

      {subTab === 'applications' && (
        <>
      {/* =====================================================================
          1. SIX KPI CARDS (Exact match to Sales Enquiries)
          ===================================================================== */}
      <div className="adm-enq-kpi-row">
        {/* Card 1: All Candidates */}
        <div
          className={`adm-enq-kpi-card card-all ${selectedStatus === 'All' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedStatus('All');
            setCurrentPage(1);
          }}
          title="Show all candidate applications"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Users size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">All Candidates</span>
              <span className="adm-enq-kpi-number">{stats.total}</span>
              <span className="adm-enq-kpi-sub">Total Applications</span>
            </div>
          </div>
          {selectedStatus === 'All' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 2: New */}
        <div
          className={`adm-enq-kpi-card card-new ${selectedStatus === 'New' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedStatus('New');
            setCurrentPage(1);
          }}
          title="Filter by New applications"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Sparkles size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">New</span>
              <span className="adm-enq-kpi-number">{stats.newCount}</span>
              <span className="adm-enq-kpi-sub">Recent Applications</span>
            </div>
          </div>
          {selectedStatus === 'New' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 3: In Review */}
        <div
          className={`adm-enq-kpi-card card-contacted ${selectedStatus === 'In Review' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedStatus('In Review');
            setCurrentPage(1);
          }}
          title="Filter by In Review applications"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Clock size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">In Review</span>
              <span className="adm-enq-kpi-number">{stats.inReviewCount}</span>
              <span className="adm-enq-kpi-sub">Profile Screening</span>
            </div>
          </div>
          {selectedStatus === 'In Review' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 4: Shortlisted */}
        <div
          className={`adm-enq-kpi-card card-qualified ${selectedStatus === 'Shortlisted' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedStatus('Shortlisted');
            setCurrentPage(1);
          }}
          title="Filter by Shortlisted candidates"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Filter size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Shortlisted</span>
              <span className="adm-enq-kpi-number">{stats.shortlistedCount}</span>
              <span className="adm-enq-kpi-sub">Under Evaluation</span>
            </div>
          </div>
          {selectedStatus === 'Shortlisted' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 5: Interview / Offers */}
        <div
          className={`adm-enq-kpi-card card-converted ${
            selectedStatus === 'Interview / Offers' || ['interview scheduled', 'offer extended'].includes(selectedStatus.toLowerCase())
              ? 'selected'
              : ''
          }`}
          onClick={() => {
            setSelectedStatus(
              selectedStatus === 'Interview / Offers' || ['interview scheduled', 'offer extended'].includes(selectedStatus.toLowerCase())
                ? 'All'
                : 'Interview / Offers'
            );
            setCurrentPage(1);
          }}
          title="Filter by Interview & Offer stage"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <CheckCircle2 size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Interview / Offers</span>
              <span className="adm-enq-kpi-number">{stats.interviewOffersCount}</span>
              <span className="adm-enq-kpi-sub">Successful</span>
            </div>
          </div>
          {(selectedStatus === 'Interview / Offers' || ['interview scheduled', 'offer extended'].includes(selectedStatus.toLowerCase())) && (
            <ChevronRight size={18} className="adm-enq-kpi-arrow" />
          )}
        </div>

        {/* Card 6: Rejected */}
        <div
          className={`adm-enq-kpi-card card-closed ${selectedStatus === 'Rejected' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedStatus('Rejected');
            setCurrentPage(1);
          }}
          title="Filter by Rejected applications"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <X size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Rejected</span>
              <span className="adm-enq-kpi-number">{stats.rejectedCount}</span>
              <span className="adm-enq-kpi-sub">Completed</span>
            </div>
          </div>
          {selectedStatus === 'Rejected' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>
      </div>

      {/* =====================================================================
          2. SEARCH, FILTERS, AND EXPORT TOOLBAR
          ===================================================================== */}
      <div className="adm-enq-toolbar">
        {/* Search Input with Blue Magnifying Glass */}
        <div className="adm-enq-search-wrap">
          <Search size={18} className="adm-enq-search-icon" />
          <input
            type="search"
            name="admin_careers_query"
            id="admin_careers_query"
            autoComplete="off"
            className="adm-enq-search-input"
            placeholder="Search by client, company, email, phone or product..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filters Group & Export Button */}
        <div className="adm-enq-filter-group">
          {/* Status Dropdown */}
          <AdminDropdown
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'All', label: 'All Status' },
              ...STATUS_OPTIONS_WITH_COLORS
            ]}
            prefixIcon={<Filter size={15} />}
            className="adm-enq-bs5-filter"
          />

          {/* Position Dropdown */}
          <AdminDropdown
            value={selectedPosition}
            onChange={(e) => {
              setSelectedPosition(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'All', label: 'All Positions' },
              ...positionsList.map((pos) => ({ value: pos, label: pos }))
            ]}
            prefixIcon={<Briefcase size={15} />}
            className="adm-enq-bs5-filter"
          />

          {/* Export to CSV / Excel Button (Solid Blue matching screenshot) */}
          <a
            href="/api/careers/applications/export"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-enq-export-btn"
            title="Download full candidate dataset as Excel-compatible CSV"
          >
            <Download size={16} />
            <span>Export to CSV / Excel</span>
          </a>
        </div>
      </div>

      {/* =====================================================================
          3. CANDIDATES TABLE
          ===================================================================== */}
      <div className="adm-enq-table-card">
        <div className="adm-enq-table-responsive">
          <table className="adm-enq-table">
            <thead>
              <tr>
                <th className="col-cb">
                  <input
                    type="checkbox"
                    className="adm-enq-checkbox"
                    checked={totalApps > 0 && selectedIds.size === totalApps}
                    onChange={handleSelectAll}
                    title="Select all applicants"
                  />
                </th>
                <th className="col-id">ID</th>
                <th className="col-contact">CANDIDATE DOSSIER</th>
                <th className="col-product">APPLIED ROLE</th>
                <th>EXPERIENCE &amp; NOTICE</th>
                <th style={{ width: '95px', textAlign: 'center' }}>RESUME</th>
                <th className="col-status">STATUS PIPELINE</th>
                <th className="col-date">APPLIED ON</th>
                <th className="col-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedApplications.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <div className="adm-enq-empty-state">
                      <div className="adm-enq-empty-icon">
                        <Users size={28} />
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#10264F' }}>
                        No career applications found
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#607695' }}>
                        Try clearing search terms or status filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedApplications.map((app) => {
                  const initials = getInitials(app.full_name);
                  const avatarColor = getAvatarColorClass(app.id);
                  const isRowSelected = selectedIds.has(app.id);
                  const cleanPosition = (app.position || 'Open Application').replace(/[?]/g, '-').trim();

                  return (
                    <tr key={app.id} className={isRowSelected ? 'row-selected' : ''}>
                      {/* Checkbox */}
                      <td className="col-cb">
                        <input
                          type="checkbox"
                          className="adm-enq-checkbox"
                          checked={isRowSelected}
                          onChange={() => handleToggleRow(app.id)}
                        />
                      </td>

                      {/* ID */}
                      <td className="col-id">
                        <span className="adm-enq-lead-id">#{app.id}</span>
                      </td>

                      {/* Candidate Contact */}
                      <td className="col-contact">
                        <div className="adm-enq-contact-cell">
                          <div className={`adm-enq-avatar ${avatarColor}`}>{initials}</div>
                          <div className="adm-enq-contact-info">
                            <span className="adm-enq-client-name">{formatDisplayName(app.full_name)}</span>
                            <span className="adm-enq-client-company">{app.email}</span>
                            <span className="adm-enq-client-phone">{app.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Applied Role */}
                      <td className="col-product">
                        <div className="adm-enq-product-cell">
                          <span className="adm-enq-product-name">{cleanPosition}</span>
                          <span className="adm-enq-product-badge">Automation &amp; Engineering</span>
                        </div>
                      </td>

                      {/* Experience & Notice */}
                      <td>
                        <div className="adm-exp-notice-cell">
                          <span className="adm-exp-val">{app.experience || 'Fresher / 0 Years'}</span>
                          <span className="adm-notice-val">Notice: <strong>{app.notice_period || 'Immediately Available'}</strong></span>
                        </div>
                      </td>

                      {/* Resume CV */}
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

                      {/* Status Dropdown */}
                      <td className="col-status">
                        <AdminDropdown
                          value={app.status || 'New'}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          options={STATUS_OPTIONS_WITH_COLORS}
                          size="sm"
                          isPill={true}
                          customColorTheme={getStatusTheme(app.status)}
                          className="adm-careers-table-dropdown"
                        />
                      </td>

                      {/* Date Received / Applied */}
                      <td className="col-date">
                        <div className="adm-enq-date-cell">
                          <Calendar size={13} className="adm-enq-date-icon" />
                          <div className="adm-enq-date-info">
                            <span className="adm-enq-date-str">{formatAppDate(app.created_at)}</span>
                            <span className="adm-enq-date-rel">{formatAppTime(app.created_at) || 'Recent'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="col-actions">
                        <div className="adm-enq-actions-cell">
                          <button
                            type="button"
                            className="adm-enq-btn-action btn-view"
                            onClick={() => handleOpenDossier(app)}
                            title="View Full Candidate Dossier"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            type="button"
                            className="adm-enq-btn-action btn-edit"
                            onClick={() => handleOpenDossier(app)}
                            title="Edit Notes & Details"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            type="button"
                            className="adm-enq-btn-action btn-delete"
                            onClick={() => setApplicantToDelete(app)}
                            title="Delete Application"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Table Footer & Pagination */}
        <div className="adm-enq-table-footer">
          <div className="adm-enq-footer-summary">
            Showing {startAppNum} to {endAppNum} of {totalApps} applicants
          </div>

          <div className="adm-enq-footer-controls">
            <div className="adm-enq-rows-per-page">
              <AdminDropdown
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                options={[
                  { value: 10, label: '10 per page' },
                  { value: 25, label: '25 per page' },
                  { value: 50, label: '50 per page' }
                ]}
                size="sm"
              />
            </div>

            <div className="adm-enq-pagination-btns">
              <button
                type="button"
                className="adm-enq-page-btn"
                disabled={validCurrentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                title="Previous page"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`adm-enq-page-btn ${pageNum === validCurrentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className="adm-enq-page-btn"
                disabled={validCurrentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                title="Next page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
        </>
      )}

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
                    options={STATUS_OPTIONS_WITH_COLORS}
                    size="sm"
                    isPill={true}
                    customColorTheme={getStatusTheme(selectedApplicant.status)}
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

      {/* =====================================================================
          JOB VACANCY POSTINGS MANAGEMENT VIEW
          ===================================================================== */}
      {subTab === 'jobs' && (
        <div className="adm-jobs-view-wrapper">
          {/* 4 Job Stats KPI cards */}
          <div className="adm-enq-kpi-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div
              className={`adm-enq-kpi-card card-all ${jobStatusFilter === 'All' ? 'selected' : ''}`}
              onClick={() => setJobStatusFilter('All')}
            >
              <div className="adm-enq-kpi-left">
                <div className="adm-enq-kpi-icon-box">
                  <Briefcase size={22} />
                </div>
                <div className="adm-enq-kpi-body">
                  <span className="adm-enq-kpi-title">All Positions</span>
                  <span className="adm-enq-kpi-number">{jobStats.total}</span>
                  <span className="adm-enq-kpi-sub">Total Job Postings</span>
                </div>
              </div>
            </div>

            <div
              className={`adm-enq-kpi-card card-converted ${jobStatusFilter === 'Published' ? 'selected' : ''}`}
              onClick={() => setJobStatusFilter('Published')}
            >
              <div className="adm-enq-kpi-left">
                <div className="adm-enq-kpi-icon-box">
                  <CheckCircle2 size={22} />
                </div>
                <div className="adm-enq-kpi-body">
                  <span className="adm-enq-kpi-title">Published (Live)</span>
                  <span className="adm-enq-kpi-number">{jobStats.published}</span>
                  <span className="adm-enq-kpi-sub">Active on Careers Portal</span>
                </div>
              </div>
            </div>

            <div
              className={`adm-enq-kpi-card card-contacted ${jobStatusFilter === 'Draft' ? 'selected' : ''}`}
              onClick={() => setJobStatusFilter('Draft')}
            >
              <div className="adm-enq-kpi-left">
                <div className="adm-enq-kpi-icon-box">
                  <Clock size={22} />
                </div>
                <div className="adm-enq-kpi-body">
                  <span className="adm-enq-kpi-title">Drafts</span>
                  <span className="adm-enq-kpi-number">{jobStats.drafts}</span>
                  <span className="adm-enq-kpi-sub">Internal / Unlisted</span>
                </div>
              </div>
            </div>

            <div className="adm-enq-kpi-card card-qualified">
              <div className="adm-enq-kpi-left">
                <div className="adm-enq-kpi-icon-box">
                  <Users size={22} />
                </div>
                <div className="adm-enq-kpi-body">
                  <span className="adm-enq-kpi-title">Total Openings</span>
                  <span className="adm-enq-kpi-number">{jobStats.totalOpenings}</span>
                  <span className="adm-enq-kpi-sub">Cumulative Headcount</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="adm-enq-controls-card" style={{ marginTop: '16px' }}>
            <div className="adm-enq-search-box">
              <Search size={18} className="adm-enq-search-icon" />
              <input
                type="text"
                placeholder="Search jobs by title, department, skills, or location..."
                value={jobSearchQuery}
                onChange={(e) => setJobSearchQuery(e.target.value)}
                className="adm-enq-search-input"
              />
              {jobSearchQuery && (
                <button
                  type="button"
                  className="adm-enq-clear-search-btn"
                  onClick={() => setJobSearchQuery('')}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="adm-enq-dropdowns-group">
              {/* Department Filter */}
              <div className="adm-enq-filter-item">
                <span className="adm-enq-filter-label">Department:</span>
                <select
                  value={jobDeptFilter}
                  onChange={(e) => setJobDeptFilter(e.target.value)}
                  className="adm-enq-select"
                >
                  <option value="All">All Departments</option>
                  {uniqueDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="adm-enq-filter-item">
                <span className="adm-enq-filter-label">Status:</span>
                <select
                  value={jobStatusFilter}
                  onChange={(e) => setJobStatusFilter(e.target.value)}
                  className="adm-enq-select"
                >
                  <option value="All">All Statuses</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length === 0 ? (
            <div className="adm-empty-state" style={{ marginTop: '30px' }}>
              <div className="adm-empty-icon">
                <Briefcase size={28} />
              </div>
              <h4 style={{ margin: '4px 0', fontSize: '1.1rem', fontWeight: 700 }}>
                No Job Vacancies Found
              </h4>
              <p style={{ margin: 0, fontSize: '0.86rem', color: '#64748b' }}>
                {jobSearchQuery || jobStatusFilter !== 'All' || jobDeptFilter !== 'All'
                  ? 'Try clearing your filters or search term to see more positions.'
                  : 'Start by posting your first job vacancy to the HTI Careers portal.'}
              </p>
              <button
                type="button"
                className="adm-btn-post-job-primary"
                style={{ marginTop: '12px' }}
                onClick={() => onOpenJobModal && onOpenJobModal(null)}
              >
                <Plus size={15} />
                <span>Post a Job Vacancy</span>
              </button>
            </div>
          ) : (
            <div className="adm-jobs-grid">
              {filteredJobs.map((job) => {
                const isPublished = (job.status || '').toLowerCase() === 'published';
                const isDraft = (job.status || '').toLowerCase() === 'draft';
                const statusClass = isPublished ? 'published' : isDraft ? 'draft' : 'expired';

                return (
                  <div key={job.id} className="adm-job-item-card">
                    <div>
                      <div className="adm-job-item-top">
                        <div>
                          <div className="adm-job-item-dept">{job.department}</div>
                          <h4 className="adm-job-item-title">{job.title}</h4>
                        </div>
                        <span className={`adm-job-status-badge ${statusClass}`}>
                          <span className="status-dot" />
                          <span>{job.status}</span>
                        </span>
                      </div>

                      {/* Meta Chips */}
                      <div className="adm-job-chips-wrap">
                        <span className="adm-job-chip">
                          <MapPin size={12} />
                          {job.location || 'Navi Mumbai HQ'}
                        </span>
                        <span className="adm-job-chip">
                          <Clock size={12} />
                          {job.experience || '1–3 Years'}
                        </span>
                        <span className="adm-job-chip">
                          <Users size={12} />
                          {job.openings || 1} {Number(job.openings) === 1 ? 'Opening' : 'Openings'}
                        </span>
                        {job.salary_range && (
                          <span className="adm-job-chip salary">
                            <IndianRupee size={12} />
                            {job.salary_range}
                          </span>
                        )}
                        {job.deadline && (
                          <span className="adm-job-chip">
                            <Calendar size={12} />
                            Exp: {job.deadline}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="adm-job-item-desc">{job.description}</p>

                      {/* Skills Tags */}
                      {job.skills && (
                        <div className="adm-job-item-skills">
                          {job.skills
                            .split(',')
                            .slice(0, 4)
                            .map((s, idx) => (
                              <span key={idx} className="adm-job-skill-pill">
                                {s.trim()}
                              </span>
                            ))}
                          {job.skills.split(',').length > 4 && (
                            <span className="adm-job-skill-pill" style={{ opacity: 0.75 }}>
                              +{job.skills.split(',').length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="adm-job-item-footer">
                      <button
                        type="button"
                        className="adm-job-applicant-link"
                        onClick={() => {
                          setSelectedPosition(job.title);
                          setSubTab('applications');
                        }}
                        title="View candidates who applied for this position"
                      >
                        <Users size={13} />
                        <span>{job.applications_count || 0} {Number(job.applications_count) === 1 ? 'Applicant' : 'Applicants'}</span>
                      </button>

                      <div className="adm-job-actions-group">
                        <button
                          type="button"
                          className="adm-job-action-btn edit"
                          onClick={() => onOpenJobModal && onOpenJobModal(job)}
                          title="Edit Job Details"
                        >
                          <Pencil size={13} />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          className="adm-job-action-btn toggle"
                          onClick={() => onToggleJobStatus && onToggleJobStatus(job.id, job.status)}
                          title={isPublished ? 'Unpublish to Draft' : 'Publish to live website'}
                        >
                          {isPublished ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          type="button"
                          className="adm-job-action-btn delete"
                          onClick={() => setJobToDelete(job)}
                          title="Delete this job posting"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Job Delete Confirmation Modal */}
      {jobToDelete && (
        <div className="adm-modal-backdrop" onClick={() => setJobToDelete(null)}>
          <div className="adm-modal-box" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header" style={{ background: '#fee2e2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertCircle size={22} color="#dc2626" />
                <h4 style={{ margin: 0, color: '#991b1b', fontSize: '1.05rem', fontWeight: 800 }}>
                  Confirm Delete Vacancy
                </h4>
              </div>
              <button className="topbar-close-btn" onClick={() => setJobToDelete(null)}>
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: 1.5 }}>
                Are you sure you want to permanently delete the job vacancy{' '}
                <strong>"{jobToDelete.title}"</strong> ({jobToDelete.department})?
              </p>
              <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                This job will immediately be removed from the public Career Page and Opportunities popup.
              </p>
            </div>
            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-careers-btn"
                onClick={() => setJobToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-careers-btn"
                style={{ background: '#dc2626', color: '#fff', border: 'none' }}
                onClick={() => {
                  if (onDeleteJob) onDeleteJob(jobToDelete.id);
                  setJobToDelete(null);
                }}
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
