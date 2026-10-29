import React, { useState, useMemo } from 'react';
import './AdminCareersManager.css';
import './AdminEnquiries.css';
import AdminDropdown from './AdminDropdown';
import {
  MessageSquare,
  Users,
  Search,
  Filter,
  RefreshCw,
  Download,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  Calendar,
  Mail,
  Phone,
  Building2,
  Copy,
  ExternalLink,
  Database,
  Server,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Save,
  Check,
  Send,
  HelpCircle,
  Tag
} from 'lucide-react';

function getAvatarColorClass(id) {
  const colors = ['avatar-blue', 'avatar-green', 'avatar-pink', 'avatar-purple', 'avatar-amber'];
  return colors[((id || 0) * 7) % colors.length];
}

const STATUS_OPTIONS_WITH_COLORS = [
  { value: 'New', label: 'New', color: '#e11d48' },
  { value: 'In Review', label: 'In Review', color: '#d97706' },
  { value: 'Contacted', label: 'Contacted', color: '#0284c7' },
  { value: 'Qualified', label: 'Qualified', color: '#7c3aed' },
  { value: 'Converted', label: 'Converted', color: '#059669' },
  { value: 'Closed', label: 'Closed', color: '#64748b' }
];

function getStatusTheme(status) {
  const s = (status || '').toLowerCase();
  switch (s) {
    case 'new':
      return { bg: 'rgba(225, 29, 72, 0.1)', text: '#e11d48', border: 'rgba(225, 29, 72, 0.3)' };
    case 'in review':
      return { bg: 'rgba(217, 119, 6, 0.1)', text: '#d97706', border: 'rgba(217, 119, 6, 0.3)' };
    case 'contacted':
      return { bg: 'rgba(2, 132, 199, 0.1)', text: '#0284c7', border: 'rgba(2, 132, 199, 0.3)' };
    case 'qualified':
      return { bg: 'rgba(124, 58, 237, 0.1)', text: '#7c3aed', border: 'rgba(124, 58, 237, 0.3)' };
    case 'converted':
    case 'resolved':
      return { bg: 'rgba(5, 150, 105, 0.1)', text: '#059669', border: 'rgba(5, 150, 105, 0.3)' };
    case 'closed':
    case 'rejected':
      return { bg: 'rgba(100, 116, 139, 0.1)', text: '#64748b', border: 'rgba(100, 116, 139, 0.3)' };
    default:
      return { bg: 'rgba(2, 132, 199, 0.1)', text: '#0284c7', border: 'rgba(2, 132, 199, 0.3)' };
  }
}

function formatEnquiryDate(dateStr) {
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

function formatEnquiryTime(dateStr) {
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
  if (!name) return 'Customer';
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function AdminUserEnquiriesManager({
  enquiries = [],
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
  const [selectedArea, setSelectedArea] = useState('All');

  // Modal states
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiryNotes, setEnquiryNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const [showDbModal, setShowDbModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Row selection & pagination state
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredEnquiries.map((a) => a.id)));
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

  // 6 KPI Cards statistics
  const stats = useMemo(() => {
    const total = enquiries.length;
    const newCount = enquiries.filter((a) => (a.status || '').toLowerCase() === 'new').length;
    const inReviewCount = enquiries.filter((a) => (a.status || '').toLowerCase() === 'in review').length;
    const contactedCount = enquiries.filter((a) => (a.status || '').toLowerCase() === 'contacted').length;
    const qualifiedCount = enquiries.filter(
      (a) => (a.status || '').toLowerCase() === 'qualified' || (a.status || '').toLowerCase() === 'converted'
    ).length;
    const closedCount = enquiries.filter(
      (a) => (a.status || '').toLowerCase() === 'closed' || (a.status || '').toLowerCase() === 'resolved'
    ).length;

    return { total, newCount, inReviewCount, contactedCount, qualifiedCount, closedCount };
  }, [enquiries]);

  // Unique Area of Interest list for filtering
  const areasList = useMemo(() => {
    const set = new Set();
    enquiries.forEach((a) => {
      if (a.area_of_interest) set.add(a.area_of_interest);
    });
    return Array.from(set);
  }, [enquiries]);

  // Filtered enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        (item.full_name || '').toLowerCase().includes(query) ||
        (item.company || '').toLowerCase().includes(query) ||
        (item.email || '').toLowerCase().includes(query) ||
        (item.phone || '').includes(query) ||
        (item.area_of_interest || '').toLowerCase().includes(query) ||
        (item.project_details || '').toLowerCase().includes(query);

      const status = (item.status || '').toLowerCase();
      let matchStatus = false;
      if (selectedStatus === 'All') {
        matchStatus = true;
      } else if (selectedStatus === 'Qualified / Converted') {
        matchStatus = ['qualified', 'converted'].includes(status);
      } else if (selectedStatus === 'Closed / Resolved') {
        matchStatus = ['closed', 'resolved'].includes(status);
      } else {
        matchStatus = status === selectedStatus.toLowerCase();
      }

      const matchArea = selectedArea === 'All' || item.area_of_interest === selectedArea;

      return matchSearch && matchStatus && matchArea;
    });
  }, [enquiries, searchQuery, selectedStatus, selectedArea]);

  const totalEnqs = filteredEnquiries.length;
  const totalPages = Math.max(1, Math.ceil(totalEnqs / rowsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const paginatedEnquiries = useMemo(() => {
    const start = (validCurrentPage - 1) * rowsPerPage;
    return filteredEnquiries.slice(start, start + rowsPerPage);
  }, [filteredEnquiries, validCurrentPage, rowsPerPage]);

  const startNum = totalEnqs === 0 ? 0 : (validCurrentPage - 1) * rowsPerPage + 1;
  const endNum = Math.min(validCurrentPage * rowsPerPage, totalEnqs);

  // Open details modal
  const handleOpenDetails = (item) => {
    setSelectedEnquiry(item);
    setEnquiryNotes(item.notes || '');
  };

  // Save notes
  const handleSaveNotesSubmit = async () => {
    if (!selectedEnquiry) return;
    setIsSavingNotes(true);
    try {
      if (onSaveNotes) {
        await onSaveNotes(selectedEnquiry.id, enquiryNotes);
      }
      setSelectedEnquiry((prev) => (prev ? { ...prev, notes: enquiryNotes } : null));
      if (showFeedback) showFeedback('Follow-up notes saved to MySQL successfully!', 'success');
    } catch (err) {
      if (showFeedback) showFeedback('Failed to save notes to database', 'error');
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Status change handler
  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      if (onUpdateStatus) {
        await onUpdateStatus(enquiryId, newStatus);
      }
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      if (showFeedback) showFeedback(`Enquiry #${enquiryId} status updated to ${newStatus}`, 'success');
    } catch (err) {
      if (showFeedback) showFeedback('Failed to update status', 'error');
    }
  };

  // Delete handler
  const handleConfirmDelete = async () => {
    if (!enquiryToDelete) return;
    try {
      if (onDelete) {
        await onDelete(enquiryToDelete.id);
      }
      if (selectedEnquiry && selectedEnquiry.id === enquiryToDelete.id) {
        setSelectedEnquiry(null);
      }
      setEnquiryToDelete(null);
      if (showFeedback) showFeedback('User enquiry deleted from MySQL database', 'info');
    } catch (err) {
      if (showFeedback) showFeedback('Failed to delete enquiry', 'error');
    }
  };

  // Copy helper
  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="adm-enq-page">
      {/* =====================================================================
          1. SIX KPI CARDS (Matching Careers & Sales Enquiries)
          ===================================================================== */}
      <div className="adm-enq-kpi-row">
        {/* Card 1: All Enquiries */}
        <div
          className={`adm-enq-kpi-card card-all ${selectedStatus === 'All' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedStatus('All');
            setCurrentPage(1);
          }}
          title="Show all Contact Us user enquiries"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <MessageSquare size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">All Enquiries</span>
              <span className="adm-enq-kpi-number">{stats.total}</span>
              <span className="adm-enq-kpi-sub">Total Captured Leads</span>
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
          title="Filter by New user enquiries"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Sparkles size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">New</span>
              <span className="adm-enq-kpi-number">{stats.newCount}</span>
              <span className="adm-enq-kpi-sub">Awaiting Action</span>
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
          title="Filter by In Review enquiries"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Clock size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">In Review</span>
              <span className="adm-enq-kpi-number">{stats.inReviewCount}</span>
              <span className="adm-enq-kpi-sub">Under Technical Review</span>
            </div>
          </div>
          {selectedStatus === 'In Review' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 4: Contacted */}
        <div
          className={`adm-enq-kpi-card card-qualified ${selectedStatus === 'Contacted' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedStatus('Contacted');
            setCurrentPage(1);
          }}
          title="Filter by Contacted users"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Phone size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Contacted</span>
              <span className="adm-enq-kpi-number">{stats.contactedCount}</span>
              <span className="adm-enq-kpi-sub">Call / Email Made</span>
            </div>
          </div>
          {selectedStatus === 'Contacted' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 5: Qualified / Converted */}
        <div
          className={`adm-enq-kpi-card card-converted ${
            selectedStatus === 'Qualified / Converted' || ['qualified', 'converted'].includes(selectedStatus.toLowerCase())
              ? 'selected'
              : ''
          }`}
          onClick={() => {
            setSelectedStatus(
              selectedStatus === 'Qualified / Converted' || ['qualified', 'converted'].includes(selectedStatus.toLowerCase())
                ? 'All'
                : 'Qualified / Converted'
            );
            setCurrentPage(1);
          }}
          title="Filter by Qualified & Converted project leads"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <CheckCircle2 size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Qualified / Won</span>
              <span className="adm-enq-kpi-number">{stats.qualifiedCount}</span>
              <span className="adm-enq-kpi-sub">Commercial Pipeline</span>
            </div>
          </div>
          {(selectedStatus === 'Qualified / Converted' || ['qualified', 'converted'].includes(selectedStatus.toLowerCase())) && (
            <ChevronRight size={18} className="adm-enq-kpi-arrow" />
          )}
        </div>

        {/* Card 6: Closed / Resolved */}
        <div
          className={`adm-enq-kpi-card card-closed ${
            selectedStatus === 'Closed / Resolved' || ['closed', 'resolved'].includes(selectedStatus.toLowerCase())
              ? 'selected'
              : ''
          }`}
          onClick={() => {
            setSelectedStatus(
              selectedStatus === 'Closed / Resolved' || ['closed', 'resolved'].includes(selectedStatus.toLowerCase())
                ? 'All'
                : 'Closed / Resolved'
            );
            setCurrentPage(1);
          }}
          title="Filter by Closed or Resolved enquiries"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Check size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Closed / Resolved</span>
              <span className="adm-enq-kpi-number">{stats.closedCount}</span>
              <span className="adm-enq-kpi-sub">Archived</span>
            </div>
          </div>
          {(selectedStatus === 'Closed / Resolved' || ['closed', 'resolved'].includes(selectedStatus.toLowerCase())) && (
            <ChevronRight size={18} className="adm-enq-kpi-arrow" />
          )}
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
            name="admin_user_enquiries_query"
            id="admin_user_enquiries_query"
            autoComplete="off"
            className="adm-enq-search-input"
            placeholder="Search by contact name, company, email, phone, area or project details..."
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

          {/* Area of Interest Dropdown */}
          <AdminDropdown
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'All', label: 'All Areas of Interest' },
              ...areasList.map((area) => ({ value: area, label: area }))
            ]}
            prefixIcon={<Tag size={15} />}
            className="adm-enq-bs5-filter"
          />

          {/* Export to CSV Button */}
          <a
            href="/api/user-enquiries/export"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-enq-export-btn"
            title="Download full Contact Us enquiry dataset as Excel-compatible CSV"
          >
            <Download size={16} />
            <span>Export to CSV / Excel</span>
          </a>

          {/* Refresh Button */}
          {onRefresh && (
            <button
              type="button"
              className="topbar-btn adm-topbar-btn"
              onClick={onRefresh}
              title="Refresh User Enquiries"
              style={{ marginLeft: 6, padding: '7px 12px' }}
            >
              <RefreshCw size={15} />
              <span className="adm-btn-text">Sync</span>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          3. USER ENQUIRIES TABLE
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
                    checked={totalEnqs > 0 && selectedIds.size === totalEnqs}
                    onChange={handleSelectAll}
                    title="Select all enquiries"
                  />
                </th>
                <th className="col-id">ID</th>
                <th className="col-contact">USER / CLIENT</th>
                <th className="col-product">COMPANY / ORG</th>
                <th>AREA OF INTEREST</th>
                <th style={{ minWidth: '220px' }}>PROJECT DETAILS &amp; REQUIREMENTS</th>
                <th className="col-status">STATUS PIPELINE</th>
                <th className="col-date">SUBMISSION DATE</th>
                <th className="col-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <div className="adm-enq-empty-state">
                      <div className="adm-enq-empty-icon">
                        <MessageSquare size={28} />
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#10264F' }}>
                        No user enquiries found
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#607695' }}>
                        Enquiries submitted via the Contact Us form will automatically appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedEnquiries.map((item) => {
                  const initials = getInitials(item.full_name);
                  const avatarColor = getAvatarColorClass(item.id);
                  const isRowSelected = selectedIds.has(item.id);
                  const statusTheme = getStatusTheme(item.status);

                  return (
                    <tr key={item.id} className={isRowSelected ? 'row-selected' : ''}>
                      {/* Checkbox */}
                      <td className="col-cb">
                        <input
                          type="checkbox"
                          className="adm-enq-checkbox"
                          checked={isRowSelected}
                          onChange={() => handleToggleRow(item.id)}
                        />
                      </td>

                      {/* ID */}
                      <td className="col-id">
                        <span className="adm-enq-lead-id">#{item.id}</span>
                      </td>

                      {/* Contact Dossier */}
                      <td className="col-contact">
                        <div className="adm-enq-contact-cell">
                          <div className={`adm-enq-avatar ${avatarColor}`}>{initials}</div>
                          <div className="adm-enq-contact-info">
                            <span className="adm-enq-client-name">{formatDisplayName(item.full_name)}</span>
                            <span className="adm-enq-client-company">{item.email}</span>
                            <span className="adm-enq-client-phone">{item.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Company */}
                      <td className="col-product">
                        <div className="adm-enq-product-cell">
                          <span className="adm-enq-product-name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Building2 size={13} style={{ color: '#0284c7', flexShrink: 0 }} />
                            {item.company || 'Not Specified'}
                          </span>
                          <span className="adm-enq-product-badge">Client Organization</span>
                        </div>
                      </td>

                      {/* Area of Interest */}
                      <td>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '4px 10px',
                            borderRadius: '16px',
                            background: '#f1f5f9',
                            color: '#1e293b',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            border: '1px solid #cbd5e1'
                          }}
                        >
                          <Tag size={12} style={{ color: '#64748b' }} />
                          {item.area_of_interest || 'General Enquiry'}
                        </span>
                      </td>

                      {/* Project Details Preview */}
                      <td>
                        <div
                          style={{
                            fontSize: '0.82rem',
                            color: '#334155',
                            lineHeight: 1.45,
                            maxWidth: '300px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleOpenDetails(item)}
                          title="Click to view full message"
                        >
                          {item.project_details}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="col-status">
                        <AdminDropdown
                          value={item.status || 'New'}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          options={STATUS_OPTIONS_WITH_COLORS}
                          prefixIcon={
                            <span
                              style={{
                                display: 'inline-block',
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: statusTheme.text
                              }}
                            />
                          }
                          style={{
                            background: statusTheme.bg,
                            color: statusTheme.text,
                            borderColor: statusTheme.border,
                            fontWeight: 700,
                            minWidth: 125
                          }}
                          className="adm-enq-table-status-dd"
                        />
                      </td>

                      {/* Submission Date */}
                      <td className="col-date">
                        <div className="adm-enq-date-cell">
                          <span className="adm-enq-date-primary">
                            <Calendar size={13} style={{ color: '#64748b', marginRight: 4, verticalAlign: -1 }} />
                            {formatEnquiryDate(item.created_at)}
                          </span>
                          <span className="adm-enq-date-secondary">{formatEnquiryTime(item.created_at)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="col-actions">
                        <div className="adm-enq-actions-row">
                          <button
                            type="button"
                            className="adm-enq-action-btn view-btn"
                            onClick={() => handleOpenDetails(item)}
                            title="View Complete Contact Us Enquiry"
                            aria-label="View Enquiry"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            className="adm-enq-action-btn edit-btn"
                            onClick={() => handleOpenDetails(item)}
                            title="Add or Edit Internal Follow-up Notes"
                            aria-label="Edit Notes"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            className="adm-enq-action-btn delete-btn"
                            onClick={() => setEnquiryToDelete(item)}
                            title="Delete Enquiry from MySQL"
                            aria-label="Delete Enquiry"
                          >
                            <Trash2 size={15} />
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

        {/* Pagination & Summary Footer */}
        <div className="adm-enq-pagination">
          <div className="adm-enq-pagination-info">
            {selectedIds.size > 0 && (
              <span className="adm-enq-selected-count">
                {selectedIds.size} selected &bull;{' '}
              </span>
            )}
            Showing <strong>{startNum}</strong> to <strong>{endNum}</strong> of <strong>{totalEnqs}</strong> user enquiries
          </div>

          <div className="adm-enq-pagination-controls">
            <button
              type="button"
              className="adm-enq-page-btn"
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <span className="adm-enq-page-indicator">
              Page {validCurrentPage} of {totalPages}
            </span>

            <button
              type="button"
              className="adm-enq-page-btn"
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          4. VIEW DETAILS & NOTES MODAL
          ===================================================================== */}
      {selectedEnquiry && (
        <div className="adm-careers-dossier-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="adm-careers-dossier-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-careers-dossier-header">
              <div className="adm-dossier-title-wrap">
                <div className={`adm-enq-avatar ${getAvatarColorClass(selectedEnquiry.id)}`} style={{ width: 44, height: 44, fontSize: '1.05rem' }}>
                  {getInitials(selectedEnquiry.full_name)}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                    {formatDisplayName(selectedEnquiry.full_name)}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Building2 size={13} />
                      {selectedEnquiry.company || 'Not Specified'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>&bull;</span>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Enquiry #{selectedEnquiry.id}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AdminDropdown
                  value={selectedEnquiry.status || 'New'}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  options={STATUS_OPTIONS_WITH_COLORS}
                  style={{ minWidth: 140 }}
                />
                <button
                  type="button"
                  className="adm-modal-close-btn"
                  onClick={() => setSelectedEnquiry(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="adm-careers-dossier-body">
              {/* Contact Information Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 20 }}>
                {/* Email */}
                <div style={{ padding: '12px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: '#64748b' }}>Email Address</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                    <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                      {selectedEnquiry.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedEnquiry.email, 'email')}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}
                      title="Copy email"
                    >
                      {copiedField === 'email' ? <Check size={14} style={{ color: '#059669' }} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ padding: '12px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: '#64748b' }}>Phone Number</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                    <a href={`tel:${selectedEnquiry.phone}`} style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                      {selectedEnquiry.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedEnquiry.phone, 'phone')}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4 }}
                      title="Copy phone"
                    >
                      {copiedField === 'phone' ? <Check size={14} style={{ color: '#059669' }} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Area of Interest */}
                <div style={{ padding: '12px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: '#64748b' }}>Area of Interest</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontWeight: 700, color: '#1e293b' }}>
                    <Tag size={14} style={{ color: '#0284c7' }} />
                    {selectedEnquiry.area_of_interest || 'General Enquiry'}
                  </div>
                </div>

                {/* Date */}
                <div style={{ padding: '12px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: '#64748b' }}>Received On</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontWeight: 600, color: '#1e293b' }}>
                    <Calendar size={14} style={{ color: '#64748b' }} />
                    {formatEnquiryDate(selectedEnquiry.created_at)} at {formatEnquiryTime(selectedEnquiry.created_at)}
                  </div>
                </div>
              </div>

              {/* Project Details & Requirements Message */}
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 8 }}>
                  Project Details &amp; Requirements (From Contact Us Form):
                </span>
                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: 10,
                    padding: '16px 18px',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {selectedEnquiry.project_details}
                </div>
              </div>

              {/* Direct Actions: Call, Email */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Response to HTI Project Enquiry - ${selectedEnquiry.area_of_interest || ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '9px 16px',
                    borderRadius: 8,
                    background: '#0284c7',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.86rem'
                  }}
                >
                  <Send size={15} />
                  <span>Send Direct Email</span>
                </a>

                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '9px 16px',
                    borderRadius: 8,
                    background: '#f1f5f9',
                    color: '#1e293b',
                    border: '1px solid #cbd5e1',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.86rem'
                  }}
                >
                  <Phone size={15} />
                  <span>Call Contact</span>
                </a>
              </div>

              {/* Internal Follow-up Notes (MySQL Stored) */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 18 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Pencil size={14} style={{ color: '#0284c7' }} />
                  Administrative Follow-up Notes (Saved to MySQL):
                </span>
                <textarea
                  className="adm-notes-textarea"
                  rows={4}
                  placeholder="Enter internal engineer/recruiter notes, discussion details, or quote references..."
                  value={enquiryNotes}
                  onChange={(e) => setEnquiryNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    fontFamily: 'inherit',
                    lineHeight: 1.5,
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <button
                    type="button"
                    className="adm-save-notes-btn"
                    onClick={handleSaveNotesSubmit}
                    disabled={isSavingNotes}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 18px',
                      borderRadius: 6,
                      background: '#0284c7',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.86rem'
                    }}
                  >
                    <Save size={15} />
                    <span>{isSavingNotes ? 'Saving to MySQL...' : 'Save Notes'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. DELETE CONFIRMATION MODAL
          ===================================================================== */}
      {enquiryToDelete && (
        <div className="adm-confirm-overlay" onClick={() => setEnquiryToDelete(null)}>
          <div className="adm-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: 700 }}>
                  Delete User Enquiry?
                </h4>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  This will permanently delete this enquiry from the MySQL database.
                </span>
              </div>
            </div>

            <p style={{ margin: '0 0 18px 0', fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              Are you sure you want to delete the enquiry from{' '}
              <strong>{enquiryToDelete.full_name}</strong> ({enquiryToDelete.company || 'Not Specified'})? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                className="adm-btn-secondary"
                onClick={() => setEnquiryToDelete(null)}
                style={{ padding: '8px 16px', borderRadius: 6, background: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-btn-danger"
                onClick={handleConfirmDelete}
                style={{ padding: '8px 16px', borderRadius: 6, background: '#dc2626', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Delete from MySQL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
