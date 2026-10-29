import React, { useState, useMemo } from 'react';
import {
  Users,
  FileText,
  Phone,
  Filter,
  CheckCircle2,
  ChevronRight,
  Search,
  Download,
  User,
  Calendar,
  Eye,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  ChevronLeft,
  Mail,
  MessageCircle,
  Save,
  Building,
  Tag,
  AlertTriangle,
  RotateCcw,
  Handshake,
  Database,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Clock,
  ExternalLink
} from 'lucide-react';
import './AdminEnquiries.css';
import './AdminCareersManager.css';
import AdminDropdown from './AdminDropdown';

/**
 * Format relative time description
 */
function getRelativeTime(dateString) {
  if (!dateString) return '';
  try {
    const cleanDate = String(dateString).trim().replace(' ', 'T');
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch (e) {
    return '';
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

/**
 * Extract 2-letter initials from name, ignoring honorifics
 */
function getInitials(fullName) {
  if (!fullName) return 'LE';
  const parts = fullName
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s+/i, '')
    .trim()
    .split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Assign consistent avatar color based on id
 */
function getAvatarColorClass(id) {
  const colors = ['avatar-blue', 'avatar-green', 'avatar-pink', 'avatar-purple', 'avatar-amber'];
  return colors[((id || 0) * 7) % colors.length];
}

/**
 * Return normalized CSS class for a status value
 */
function getStatusThemeClass(status = '', id) {
  const s = String(status).toLowerCase();
  if (id === 1 || s === 'in review' || s === 'closed' || s === 'resolved') return 'status-closed';
  if (s === 'new') return 'status-new';
  if (s === 'contacted') return 'status-contacted';
  if (s === 'qualified') return 'status-qualified';
  if (s === 'converted') return 'status-converted';
  return 'status-closed';
}

const STATUS_DROPDOWN_OPTIONS = [
  { value: 'New', label: 'New', color: '#16a34a' },
  { value: 'Contacted', label: 'Contacted', color: '#0284c7' },
  { value: 'Qualified', label: 'Qualified', color: '#9333ea' },
  { value: 'Converted', label: 'Converted', color: '#059669' },
  { value: 'Closed', label: 'Closed', color: '#64748b' }
];

const STATUS_FILTER_OPTIONS = [
  { value: 'All', label: 'All Status' },
  { value: 'New', label: 'New', color: '#16a34a' },
  { value: 'Contacted', label: 'Contacted', color: '#0284c7' },
  { value: 'Qualified', label: 'Qualified', color: '#9333ea' },
  { value: 'Converted', label: 'Converted', color: '#059669' },
  { value: 'Closed', label: 'Closed', color: '#64748b' }
];

const ROWS_PER_PAGE_OPTIONS = [
  { value: 10, label: '10 per page' },
  { value: 25, label: '25 per page' },
  { value: 50, label: '50 per page' }
];

export default function AdminEnquiriesManager({
  inquiries = [],
  dbStatus = null,
  onUpdateStatus,
  onAssign,
  onDelete,
  onSaveNotes,
  onExportCSV,
  onRefresh,
  showFeedback = () => {},
  currentUser = 'Admin'
}) {
  // State for Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');

  // Table selection & Pagination
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modals
  const [viewLead, setViewLead] = useState(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [editLead, setEditLead] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirmLead, setDeleteConfirmLead] = useState(null);
  const [showDbModal, setShowDbModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Available Specialization Assignees
  const assigneeOptions = [
    'Unassigned',
    'Lead Systems Engineer',
    'Commercial Sales Directorate',
    'Cleanroom Technical Support',
    'Turnkey Projects Lead'
  ];

  // 1. Dynamic KPI Counts calculated from actual backend data
  const counts = useMemo(() => {
    let total = inquiries.length;
    let countNew = 0;
    let countContacted = 0;
    let countQualified = 0;
    let countConverted = 0;
    let countClosed = 0;

    inquiries.forEach(i => {
      const s = (i.status || '').toLowerCase();
      if (s === 'new') countNew++;
      else if (s === 'contacted') countContacted++;
      else if (s === 'qualified') countQualified++;
      else if (s === 'converted') countConverted++;
      else if (s === 'closed' || s === 'resolved' || s === 'in review') countClosed++;
    });

    return { total, countNew, countContacted, countQualified, countConverted, countClosed };
  }, [inquiries]);

  // Extract unique Areas of Interest / Categories
  const categoriesList = useMemo(() => {
    const set = new Set();
    inquiries.forEach(i => {
      const cat = i.category || i.product_name;
      if (cat && cat !== 'N/A' && cat !== 'General' && cat !== 'General Inquiry') {
        set.add(cat);
      }
    });
    return Array.from(set);
  }, [inquiries]);

  // 2. Filter Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      // Search matching
      const s = search.toLowerCase().trim();
      const matchesSearch =
        s === '' ||
        (inq.full_name && inq.full_name.toLowerCase().includes(s)) ||
        (inq.company && inq.company.toLowerCase().includes(s)) ||
        (inq.email && inq.email.toLowerCase().includes(s)) ||
        (inq.phone && inq.phone.toLowerCase().includes(s)) ||
        (inq.product_name && inq.product_name.toLowerCase().includes(s)) ||
        (inq.category && inq.category.toLowerCase().includes(s)) ||
        (inq.message && inq.message.toLowerCase().includes(s));

      // Status matching
      let matchesStatus = true;
      if (statusFilter !== 'All') {
        const inqStatus = (inq.status || '').toLowerCase();
        const target = statusFilter.toLowerCase();
        if (target === 'closed') {
          matchesStatus = inqStatus === 'closed' || inqStatus === 'resolved' || inqStatus === 'in review';
        } else {
          matchesStatus = inqStatus === target;
        }
      }

      // Category / Area of interest matching
      let matchesCategory = true;
      if (categoryFilter !== 'All') {
        matchesCategory =
          (inq.category && inq.category.toLowerCase() === categoryFilter.toLowerCase()) ||
          (inq.product_name && inq.product_name.toLowerCase() === categoryFilter.toLowerCase());
      }

      // Assignee matching
      let matchesAssignee = true;
      if (assigneeFilter !== 'All') {
        matchesAssignee = (inq.assigned_to || 'Unassigned') === assigneeFilter;
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesAssignee;
    });
  }, [inquiries, search, statusFilter, categoryFilter, assigneeFilter]);

  // 3. Pagination Slicing
  const totalLeads = filteredInquiries.length;
  const totalPages = Math.max(1, Math.ceil(totalLeads / rowsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedInquiries = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * rowsPerPage;
    return filteredInquiries.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredInquiries, validCurrentPage, rowsPerPage]);

  const startLeadNum = totalLeads === 0 ? 0 : (validCurrentPage - 1) * rowsPerPage + 1;
  const endLeadNum = Math.min(validCurrentPage * rowsPerPage, totalLeads);

  // Checkbox handlers
  const handleSelectAll = e => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredInquiries.map(i => i.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleRow = id => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Open Lead Dossier
  const handleOpenView = inq => {
    setViewLead(inq);
    setLeadNotes(inq.followup_notes || '');
  };

  // Save Followup Notes from Dossier
  const handleSaveNotesSubmit = async () => {
    if (!viewLead) return;
    setIsSaving(true);
    try {
      if (onSaveNotes) {
        await onSaveNotes(viewLead.id, leadNotes);
      } else {
        const res = await fetch(`/api/inquiries/${viewLead.id}/notes?admin_user=${encodeURIComponent(currentUser)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes: leadNotes })
        });
        if (res.ok) {
          showFeedback('success', `Notes saved for Enquiry #${viewLead.id}`);
          if (onRefresh) onRefresh();
        }
      }
      setViewLead(prev => (prev ? { ...prev, followup_notes: leadNotes } : null));
    } catch (err) {
      showFeedback('error', 'Failed to save follow-up notes.');
    } finally {
      setIsSaving(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = inq => {
    setEditLead(inq);
    setEditForm({
      full_name: inq.full_name || '',
      company: inq.company || '',
      email: inq.email || '',
      phone: inq.phone || '',
      product_name: inq.product_name || '',
      category: inq.category || '',
      message: inq.message || '',
      status: inq.status || 'New',
      assigned_to: inq.assigned_to || 'Unassigned'
    });
  };

  // Save Lead Edits
  const handleSaveEditSubmit = async e => {
    e.preventDefault();
    if (!editLead) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/inquiries/${editLead.id}?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        showFeedback('success', `Enquiry #${editLead.id} updated successfully.`);
        setEditLead(null);
        if (onRefresh) await onRefresh();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to update enquiry.');
      }
    } catch (err) {
      showFeedback('error', 'Network error updating enquiry.');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Lead
  const handleConfirmDelete = async () => {
    if (!deleteConfirmLead) return;
    try {
      if (onDelete) {
        await onDelete(deleteConfirmLead.id);
      } else {
        const res = await fetch(`/api/inquiries/${deleteConfirmLead.id}?admin_user=${encodeURIComponent(currentUser)}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          showFeedback('success', `Enquiry #${deleteConfirmLead.id} deleted.`);
          if (onRefresh) await onRefresh();
        }
      }
      if (viewLead && viewLead.id === deleteConfirmLead.id) {
        setViewLead(null);
      }
      setDeleteConfirmLead(null);
    } catch (err) {
      showFeedback('error', 'Failed to delete enquiry.');
    }
  };

  // Copy helper
  const handleCopy = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showFeedback('success', `Copied ${text} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="adm-enq-page">
      {/* =====================================================================
          1. SIX KPI CARDS (Matching Careers & Sales Enquiries Layout)
          ===================================================================== */}
      <div className="adm-enq-kpi-row">
        {/* Card 1: All Leads */}
        <div
          className={`adm-enq-kpi-card card-all ${statusFilter === 'All' ? 'selected' : ''}`}
          onClick={() => {
            setStatusFilter('All');
            setCurrentPage(1);
          }}
          title="Show all Contact Us and commercial enquiries"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Users size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">All Enquiries</span>
              <span className="adm-enq-kpi-number">{counts.total}</span>
              <span className="adm-enq-kpi-sub">Total Submissions</span>
            </div>
          </div>
          {statusFilter === 'All' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 2: New */}
        <div
          className={`adm-enq-kpi-card card-new ${statusFilter === 'New' ? 'selected' : ''}`}
          onClick={() => {
            setStatusFilter('New');
            setCurrentPage(1);
          }}
          title="Filter by New enquiries"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <FileText size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">New</span>
              <span className="adm-enq-kpi-number">{counts.countNew}</span>
              <span className="adm-enq-kpi-sub">Recent Enquiries</span>
            </div>
          </div>
          {statusFilter === 'New' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 3: Contacted */}
        <div
          className={`adm-enq-kpi-card card-contacted ${statusFilter === 'Contacted' ? 'selected' : ''}`}
          onClick={() => {
            setStatusFilter('Contacted');
            setCurrentPage(1);
          }}
          title="Filter by Contacted leads"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Phone size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Contacted</span>
              <span className="adm-enq-kpi-number">{counts.countContacted}</span>
              <span className="adm-enq-kpi-sub">Reached Out</span>
            </div>
          </div>
          {statusFilter === 'Contacted' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 4: Qualified */}
        <div
          className={`adm-enq-kpi-card card-qualified ${statusFilter === 'Qualified' ? 'selected' : ''}`}
          onClick={() => {
            setStatusFilter('Qualified');
            setCurrentPage(1);
          }}
          title="Filter by Qualified leads"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Filter size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Qualified</span>
              <span className="adm-enq-kpi-number">{counts.countQualified}</span>
              <span className="adm-enq-kpi-sub">Under Evaluation</span>
            </div>
          </div>
          {statusFilter === 'Qualified' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 5: Converted */}
        <div
          className={`adm-enq-kpi-card card-converted ${statusFilter === 'Converted' ? 'selected' : ''}`}
          onClick={() => {
            setStatusFilter('Converted');
            setCurrentPage(1);
          }}
          title="Filter by Converted leads"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <Handshake size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Converted</span>
              <span className="adm-enq-kpi-number">{counts.countConverted}</span>
              <span className="adm-enq-kpi-sub">Orders Won</span>
            </div>
          </div>
          {statusFilter === 'Converted' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
        </div>

        {/* Card 6: Closed */}
        <div
          className={`adm-enq-kpi-card card-closed ${statusFilter === 'Closed' ? 'selected' : ''}`}
          onClick={() => {
            setStatusFilter('Closed');
            setCurrentPage(1);
          }}
          title="Filter by Closed leads"
        >
          <div className="adm-enq-kpi-left">
            <div className="adm-enq-kpi-icon-box">
              <CheckCircle2 size={22} />
            </div>
            <div className="adm-enq-kpi-body">
              <span className="adm-enq-kpi-title">Closed</span>
              <span className="adm-enq-kpi-number">{counts.countClosed}</span>
              <span className="adm-enq-kpi-sub">Completed</span>
            </div>
          </div>
          {statusFilter === 'Closed' && <ChevronRight size={18} className="adm-enq-kpi-arrow" />}
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
            name="admin_lead_query"
            id="admin_lead_query"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-lpignore="true"
            data-form-type="other"
            className="adm-enq-search-input"
            placeholder="Search by name, company, email, phone, area of interest, or project details..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filters Group & Export Button */}
        <div className="adm-enq-filter-group">
          {/* Status Dropdown */}
          <AdminDropdown
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            options={STATUS_FILTER_OPTIONS}
            prefixIcon={<Filter size={15} />}
            className="adm-enq-bs5-filter"
          />

          {/* Area of Interest / Category Dropdown */}
          <AdminDropdown
            value={categoryFilter}
            onChange={e => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'All', label: 'All Areas of Interest' },
              ...categoriesList.map(cat => ({ value: cat, label: cat }))
            ]}
            prefixIcon={<Tag size={15} />}
            className="adm-enq-bs5-filter"
          />

          {/* Assignment Dropdown */}
          <AdminDropdown
            value={assigneeFilter}
            onChange={e => {
              setAssigneeFilter(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'All', label: 'All Specialists' },
              ...assigneeOptions.map(opt => ({ value: opt, label: opt }))
            ]}
            prefixIcon={<User size={15} />}
            className="adm-enq-bs5-filter"
          />

          {/* Live MySQL Database Pill */}
          <button
            type="button"
            className="adm-enq-db-badge-btn"
            onClick={() => setShowDbModal(true)}
            title="View Live MySQL Database Telemetry & Architecture"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '7px 12px',
              background: dbStatus?.is_connected ? '#ecfdf5' : '#eff6ff',
              border: `1px solid ${dbStatus?.is_connected ? '#a7f3d0' : '#bfdbfe'}`,
              borderRadius: '9px',
              fontSize: '0.80rem',
              fontWeight: '700',
              color: dbStatus?.is_connected ? '#047857' : '#0369a1',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: dbStatus?.is_connected ? '#10b981' : '#0284c7',
                boxShadow: dbStatus?.is_connected ? '0 0 6px #10b981' : 'none'
              }}
            />
            <Database size={14} />
            <span>{dbStatus?.is_connected ? `MySQL Live (${dbStatus.database || 'hti_careers_db'})` : 'Dual-Engine Protection'}</span>
          </button>

          {/* Export to CSV / Excel Button (Solid Blue matching Careers) */}
          <a
            href="/api/inquiries/export"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-enq-export-btn"
            title="Download full enquiry dataset as Excel-compatible CSV"
          >
            <Download size={16} />
            <span>Export to CSV / Excel</span>
          </a>
        </div>
      </div>

      {/* =====================================================================
          3. ENQUIRIES TABLE
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
                    checked={totalLeads > 0 && selectedIds.size === totalLeads}
                    onChange={handleSelectAll}
                    title="Select all enquiries"
                  />
                </th>
                <th className="col-id">ID</th>
                <th className="col-contact">Client Contact</th>
                <th className="col-product">Area of Interest</th>
                <th style={{ minWidth: '220px' }}>Project Details &amp; Requirements</th>
                <th className="col-status">Status Pipeline</th>
                <th className="col-assigned">Assigned Specialist</th>
                <th className="col-date">Date Received</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInquiries.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <div className="adm-enq-empty-state">
                      <div className="adm-enq-empty-icon">
                        <Users size={28} />
                      </div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#10264F' }}>
                        No website enquiries found
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#607695' }}>
                        Enquiries submitted via Contact Us form will automatically appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedInquiries.map(inq => {
                  const initials = getInitials(inq.full_name);
                  const avatarColor = getAvatarColorClass(inq.id);
                  const statusTheme = getStatusThemeClass(inq.status, inq.id);
                  const isRowSelected = selectedIds.has(inq.id);

                  return (
                    <tr key={inq.id} className={isRowSelected ? 'row-selected' : ''}>
                      {/* Checkbox */}
                      <td className="col-cb">
                        <input
                          type="checkbox"
                          className="adm-enq-checkbox"
                          checked={isRowSelected}
                          onChange={() => handleToggleRow(inq.id)}
                        />
                      </td>

                      {/* ID */}
                      <td className="col-id">
                        <span className="adm-enq-lead-id">#{inq.id}</span>
                      </td>

                      {/* Client Contact */}
                      <td className="col-contact">
                        <div className="adm-enq-contact-cell">
                          <div className={`adm-enq-avatar ${avatarColor}`}>{initials}</div>
                          <div className="adm-enq-contact-info">
                            <span className="adm-enq-client-name">{inq.full_name}</span>
                            <span className="adm-enq-client-company">
                              {inq.company || 'Enterprise Customer'}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '1px' }}>
                              <span className="adm-enq-client-email">{inq.email}</span>
                              {inq.email && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(inq.email, `email_${inq.id}`)}
                                  title="Copy Email Address"
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: '#94a3b8' }}
                                >
                                  {copiedField === `email_${inq.id}` ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                                </button>
                              )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <span className="adm-enq-client-phone">{inq.phone}</span>
                              {inq.phone && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(inq.phone, `phone_${inq.id}`)}
                                  title="Copy Phone Number"
                                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: '#94a3b8' }}
                                >
                                  {copiedField === `phone_${inq.id}` ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Area of Interest */}
                      <td className="col-product">
                        <div className="adm-enq-product-cell">
                          <span
                            className="adm-enq-category-badge"
                            style={{
                              display: 'inline-block',
                              padding: '5px 11px',
                              borderRadius: '6px',
                              fontSize: '0.80rem',
                              fontWeight: '700',
                              background: 'rgba(8, 117, 249, 0.08)',
                              color: '#0875f9',
                              border: '1px solid rgba(8, 117, 249, 0.2)'
                            }}
                          >
                            {inq.category || inq.product_name || 'General Enquiry'}
                          </span>
                        </div>
                      </td>

                      {/* Project Details & Requirements Message Preview */}
                      <td>
                        <div
                          style={{
                            fontSize: '0.83rem',
                            color: '#334155',
                            lineHeight: '1.45',
                            maxWidth: '300px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            background: '#f8fafc',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0'
                          }}
                          title={inq.message}
                        >
                          "{inq.message || 'No specific requirements message noted'}"
                        </div>
                      </td>

                      {/* Status Pipeline Dropdown Pill */}
                      <td className="col-status">
                        <AdminDropdown
                          value={(inq.id === 1 && inq.status === 'In Review') ? 'New' : (inq.status || 'New')}
                          onChange={e => onUpdateStatus(inq.id, e.target.value)}
                          options={STATUS_DROPDOWN_OPTIONS}
                          size="sm"
                          isPill={true}
                          customColorTheme={statusTheme}
                          title="Update lead pipeline status"
                        />
                      </td>

                      {/* Assigned Specialist */}
                      <td className="col-assigned">
                        <AdminDropdown
                          value={inq.assigned_to || 'Unassigned'}
                          onChange={e => onAssign(inq.id, e.target.value)}
                          options={assigneeOptions.map(opt => ({ value: opt, label: opt }))}
                          prefixIcon={<User size={13} />}
                          size="sm"
                          title="Reassign specialist"
                        />
                      </td>

                      {/* Date Received */}
                      <td className="col-date">
                        <div className="adm-enq-date-cell">
                          <Calendar size={14} className="adm-enq-date-icon" />
                          <div className="adm-enq-date-info">
                            <span className="adm-enq-date-str" style={{ fontWeight: '600', color: '#1e293b' }}>
                              {formatAppDate(inq.created_at)}
                            </span>
                            <span className="adm-enq-date-rel" style={{ fontSize: '0.73rem', color: '#64748b' }}>
                              {formatAppTime(inq.created_at) || getRelativeTime(inq.created_at)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="col-actions">
                        <div className="adm-enq-actions-cell">
                          {/* View Button */}
                          <button
                            type="button"
                            className="adm-enq-btn-action btn-view"
                            onClick={() => handleOpenView(inq)}
                            title="View Full Contact & Project Dossier"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Edit Button */}
                          <button
                            type="button"
                            className="adm-enq-btn-action btn-edit"
                            onClick={() => handleOpenEdit(inq)}
                            title="Edit Enquiry Details"
                          >
                            <Pencil size={15} />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            className="adm-enq-btn-action btn-delete"
                            onClick={() => setDeleteConfirmLead(inq)}
                            title="Permanently Delete Enquiry"
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

        {/* =====================================================================
            4. TABLE FOOTER AND PAGINATION
            ===================================================================== */}
        <div className="adm-enq-table-footer">
          <div className="adm-enq-footer-summary">
            Showing {startLeadNum} to {endLeadNum} of {totalLeads} enquiries
          </div>

          <div className="adm-enq-footer-controls">
            {/* Rows Per Page */}
            <div className="adm-enq-rows-per-page">
              <AdminDropdown
                value={rowsPerPage}
                onChange={e => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                options={ROWS_PER_PAGE_OPTIONS}
                size="sm"
              />
            </div>

            {/* Pagination Buttons */}
            <div className="adm-enq-pagination-btns">
              <button
                type="button"
                className="adm-enq-page-btn"
                disabled={validCurrentPage <= 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                title="Previous page"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
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
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                title="Next page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          5. MODAL 1: VIEW ENQUIRY DOSSIER & FOLLOW-UP NOTES
          ===================================================================== */}
      {viewLead && (
        <div className="adm-enq-modal-overlay" onClick={() => setViewLead(null)}>
          <div className="adm-enq-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="adm-enq-modal-header">
              <div className="adm-enq-modal-header-left">
                <div
                  className={`adm-enq-avatar ${getAvatarColorClass(viewLead.id)}`}
                >
                  {getInitials(viewLead.full_name)}
                </div>
                <div>
                  <h3 className="adm-enq-modal-title">
                    Contact Us Enquiry #{viewLead.id}
                  </h3>
                  <p className="adm-enq-modal-subtitle">
                    Recorded in MySQL Database • {viewLead.category || 'General Enquiry'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="adm-enq-modal-close-btn"
                onClick={() => setViewLead(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="adm-enq-modal-body">
              {/* Contact Box */}
              <div className="adm-enq-modal-contact-box">
                <div className="adm-enq-modal-contact-top">
                  <div>
                    <h4
                      style={{
                        margin: '0 0 3px 0',
                        fontSize: '1.15rem',
                        color: 'var(--hti-navy)'
                      }}
                    >
                      {viewLead.full_name}
                    </h4>
                    <div
                      style={{
                        color: 'var(--hti-blue)',
                        fontSize: '0.90rem',
                        fontWeight: '700'
                      }}
                    >
                      {viewLead.company || 'Enterprise Customer'}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--hti-muted)' }}>
                    Received: {formatAppDate(viewLead.created_at)} at {formatAppTime(viewLead.created_at)}
                  </span>
                </div>

                {/* Direct Contact Links */}
                <div className="adm-enq-modal-quick-links">
                  <a href={`tel:${viewLead.phone}`} className="adm-enq-quick-link-btn">
                    <Phone size={14} color="#10B981" />
                    <span>Call: {viewLead.phone}</span>
                  </a>
                  <a href={`mailto:${viewLead.email}`} className="adm-enq-quick-link-btn">
                    <Mail size={14} color="#0875F9" />
                    <span>Email: {viewLead.email}</span>
                  </a>
                  {viewLead.phone && (
                    <a
                      href={`https://wa.me/${viewLead.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="adm-enq-quick-link-btn wa-btn"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp Direct</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Area of Interest */}
              <div className="adm-enq-form-group">
                <label className="adm-enq-form-label">Area of Interest / Selected Category</label>
                <div
                  style={{
                    padding: '10px 14px',
                    background: '#F8FAFD',
                    borderRadius: '8px',
                    border: '1px solid var(--hti-border)',
                    fontWeight: '700',
                    fontSize: '0.90rem',
                    color: 'var(--hti-navy)'
                  }}
                >
                  {viewLead.category || viewLead.product_name || 'General Contact Enquiry'}
                </div>
              </div>

              {/* Requirement Message */}
              <div className="adm-enq-form-group">
                <label className="adm-enq-form-label">Project Details &amp; Requirements</label>
                <div
                  style={{
                    padding: '12px 14px',
                    background: '#F8FAFD',
                    borderRadius: '8px',
                    border: '1px solid var(--hti-border)',
                    fontSize: '0.88rem',
                    lineHeight: '1.55',
                    color: '#334155',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {viewLead.message || 'No project description provided.'}
                </div>
              </div>

              {/* Pipeline Status & Assignee Selector */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px'
                }}
              >
                <div className="adm-enq-form-group">
                  <label className="adm-enq-form-label">Pipeline Status</label>
                  <AdminDropdown
                    value={viewLead.status || 'New'}
                    onChange={e => {
                      const newSt = e.target.value;
                      setViewLead(prev => ({ ...prev, status: newSt }));
                      onUpdateStatus(viewLead.id, newSt);
                    }}
                    options={STATUS_DROPDOWN_OPTIONS}
                    size="md"
                  />
                </div>

                <div className="adm-enq-form-group">
                  <label className="adm-enq-form-label">Assigned Specialist</label>
                  <AdminDropdown
                    value={viewLead.assigned_to || 'Unassigned'}
                    onChange={e => {
                      const newAssignee = e.target.value;
                      setViewLead(prev => ({ ...prev, assigned_to: newAssignee }));
                      onAssign(viewLead.id, newAssignee);
                    }}
                    options={assigneeOptions.map(opt => ({ value: opt, label: opt }))}
                    size="md"
                  />
                </div>
              </div>

              {/* Follow-up Notes & Contact Log */}
              <div className="adm-enq-form-group">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}
                >
                  <label className="adm-enq-form-label" style={{ margin: 0 }}>
                    Follow-up Notes &amp; Client Timeline
                  </label>
                  {viewLead.last_contacted_at && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--hti-muted)' }}>
                      Last contacted: {viewLead.last_contacted_at}
                    </span>
                  )}
                </div>
                <textarea
                  className="adm-enq-form-textarea"
                  rows={4}
                  value={leadNotes}
                  onChange={e => setLeadNotes(e.target.value)}
                  placeholder="Record site inspection notes, quotation details, follow-up dates..."
                />
                <button
                  type="button"
                  className="adm-enq-btn-primary"
                  style={{ alignSelf: 'flex-start', marginTop: '6px' }}
                  onClick={handleSaveNotesSubmit}
                  disabled={isSaving}
                >
                  <Save size={15} />
                  <span>{isSaving ? 'Saving Notes...' : 'Save Notes & Timestamp'}</span>
                </button>
              </div>
            </div>

            <div className="adm-enq-modal-footer">
              <button
                type="button"
                className="adm-enq-btn-action btn-delete"
                style={{
                  width: 'auto',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  display: 'inline-flex',
                  gap: '6px'
                }}
                onClick={() => {
                  setDeleteConfirmLead(viewLead);
                  setViewLead(null);
                }}
              >
                <Trash2 size={14} />
                <span>Delete Enquiry</span>
              </button>
              <button
                type="button"
                className="adm-enq-btn-secondary"
                onClick={() => setViewLead(null)}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. MODAL 2: EDIT LEAD DETAILS
          ===================================================================== */}
      {editLead && (
        <div className="adm-enq-modal-overlay" onClick={() => setEditLead(null)}>
          <div className="adm-enq-modal-card" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSaveEditSubmit}>
              <div className="adm-enq-modal-header">
                <div className="adm-enq-modal-header-left">
                  <div className="adm-enq-kpi-icon-box" style={{ background: '#EFF6FF', color: 'var(--hti-blue)' }}>
                    <Pencil size={20} />
                  </div>
                  <div>
                    <h3 className="adm-enq-modal-title">Edit Enquiry #{editLead.id}</h3>
                    <p className="adm-enq-modal-subtitle">
                      Modify commercial contact details and specifications
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="adm-enq-modal-close-btn"
                  onClick={() => setEditLead(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="adm-enq-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="adm-enq-form-group">
                    <label className="adm-enq-form-label">Client Full Name *</label>
                    <input
                      type="text"
                      className="adm-enq-form-input"
                      required
                      value={editForm.full_name}
                      onChange={e => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                    />
                  </div>

                  <div className="adm-enq-form-group">
                    <label className="adm-enq-form-label">Company / Institution</label>
                    <input
                      type="text"
                      className="adm-enq-form-input"
                      value={editForm.company}
                      onChange={e => setEditForm(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="adm-enq-form-group">
                    <label className="adm-enq-form-label">Email Address *</label>
                    <input
                      type="email"
                      className="adm-enq-form-input"
                      required
                      value={editForm.email}
                      onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="adm-enq-form-group">
                    <label className="adm-enq-form-label">Phone Number *</label>
                    <input
                      type="text"
                      className="adm-enq-form-input"
                      required
                      value={editForm.phone}
                      onChange={e => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="adm-enq-form-group">
                    <label className="adm-enq-form-label">Area of Interest / Category</label>
                    <input
                      type="text"
                      className="adm-enq-form-input"
                      value={editForm.category}
                      onChange={e => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>

                  <div className="adm-enq-form-group">
                    <label className="adm-enq-form-label">Product / Solution Requested</label>
                    <input
                      type="text"
                      className="adm-enq-form-input"
                      value={editForm.product_name}
                      onChange={e =>
                        setEditForm(prev => ({ ...prev, product_name: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="adm-enq-form-group">
                    <label className="adm-enq-form-label">Pipeline Status</label>
                    <AdminDropdown
                      value={editForm.status}
                      onChange={e => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                      options={STATUS_DROPDOWN_OPTIONS}
                      size="md"
                    />
                  </div>

                  <div className="adm-enq-form-group">
                    <label className="adm-enq-form-label">Assigned Specialist</label>
                    <AdminDropdown
                      value={editForm.assigned_to}
                      onChange={e =>
                        setEditForm(prev => ({ ...prev, assigned_to: e.target.value }))
                      }
                      options={assigneeOptions.map(opt => ({ value: opt, label: opt }))}
                      size="md"
                    />
                  </div>
                </div>

                <div className="adm-enq-form-group">
                  <label className="adm-enq-form-label">Customer Requirements Message</label>
                  <textarea
                    className="adm-enq-form-textarea"
                    rows={4}
                    value={editForm.message}
                    onChange={e => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
              </div>

              <div className="adm-enq-modal-footer">
                <button
                  type="button"
                  className="adm-enq-btn-secondary"
                  onClick={() => setEditLead(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-enq-btn-primary" disabled={isSaving}>
                  <Save size={16} />
                  <span>{isSaving ? 'Saving Changes...' : 'Save Enquiry Details'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          7. MODAL 3: DELETE CONFIRMATION
          ===================================================================== */}
      {deleteConfirmLead && (
        <div className="adm-enq-modal-overlay" onClick={() => setDeleteConfirmLead(null)}>
          <div
            className="adm-enq-modal-card"
            style={{ maxWidth: '460px' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="adm-enq-modal-header" style={{ background: '#FFF1F2' }}>
              <div className="adm-enq-modal-header-left">
                <div
                  className="adm-enq-kpi-icon-box"
                  style={{ background: '#FFE4E6', color: 'var(--hti-red)' }}
                >
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h3 className="adm-enq-modal-title" style={{ color: 'var(--hti-red)' }}>
                    Delete Website Enquiry?
                  </h3>
                  <p className="adm-enq-modal-subtitle">
                    This action is permanent and removes the lead from MySQL
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="adm-enq-modal-close-btn"
                onClick={() => setDeleteConfirmLead(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="adm-enq-modal-body">
              <p style={{ margin: 0, fontSize: '0.90rem', color: 'var(--hti-navy)' }}>
                Are you sure you want to permanently remove enquiry{' '}
                <strong>#{deleteConfirmLead.id}</strong> from{' '}
                <strong>{deleteConfirmLead.full_name}</strong> (
                {deleteConfirmLead.company || 'Enterprise Customer'})?
              </p>
            </div>

            <div className="adm-enq-modal-footer">
              <button
                type="button"
                className="adm-enq-btn-secondary"
                onClick={() => setDeleteConfirmLead(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-enq-btn-action btn-delete"
                style={{
                  width: 'auto',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  display: 'inline-flex',
                  gap: '8px'
                }}
                onClick={handleConfirmDelete}
              >
                <Trash2 size={16} />
                <span>Delete Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          8. MODAL 4: DATABASE TELEMETRY & MYSQL STATUS
          ===================================================================== */}
      {showDbModal && (
        <div className="adm-modal-backdrop" onClick={() => setShowDbModal(false)}>
          <div className="adm-modal-card" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Database size={20} color="#0284c7" />
                <h3 className="adm-modal-title">MySQL Database Telemetry &amp; Config</h3>
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
                    'Contact Us enquiries and commercial leads are immediately recorded and secured in MySQL database.'}
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
                  <span className="adm-dossier-label">Active Table</span>
                  <span className="adm-dossier-val">{dbStatus?.table || 'inquiries'}</span>
                </div>
                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">MySQL User</span>
                  <span className="adm-dossier-val">{dbStatus?.user || 'root'}</span>
                </div>
                <div className="adm-dossier-item">
                  <span className="adm-dossier-label">Fallback Storage Path</span>
                  <span className="adm-dossier-val" style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>
                    backend/hti.db [Table: inquiries]
                  </span>
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-careers-btn"
                style={{ background: '#f1f5f9', color: '#334155' }}
                onClick={() => setShowDbModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
