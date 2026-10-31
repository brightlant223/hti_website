import React, { useState, useMemo, useEffect, useCallback } from 'react';
import './AdminReviewsManager.css';
import {
  Star,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Building,
  MapPin,
  X,
  MessageSquare,
  Award,
  Sparkles,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Check,
  Mail,
  Database
} from 'lucide-react';

export default function AdminReviewsManager({
  websiteContent = {},
  onSaveContent,
  showFeedback = () => {},
  currentUser = 'admin',
  clients = [],
  embedded = false,
  externalModalOpen = false,
  onCloseExternalModal = () => {}
}) {
  const rawTestimonials = websiteContent?.testimonials?.data;
  const initialTestimonials = useMemo(() => {
    return Array.isArray(rawTestimonials) ? rawTestimonials : [];
  }, [rawTestimonials]);

  const [reviewsList, setReviewsList] = useState(initialTestimonials);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'pending' | 'published' | 'rejected' | '5' | '4'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDataServiceConnected, setIsDataServiceConnected] = useState(true);

  const [formData, setFormData] = useState({
    author: '',
    company: '',
    location: '',
    email: '',
    rating: 5,
    quote: '',
    date: '',
    status: 'Approved',
    is_published: true,
    client_id: '',
    client_name: ''
  });

  // Fetch administrator reviews from the data service
  const fetchAdminReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/reviews?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.reviews)) {
          setReviewsList(data.reviews);
          setIsDataServiceConnected(data.database === 'sqlite');
          return;
        }
      }
    } catch (e) {
      console.warn('Note: Admin reviews fetched from props cache', e);
    }

    // Fallback to websiteContent props
    if (Array.isArray(rawTestimonials) && rawTestimonials.length > 0) {
      setReviewsList(rawTestimonials);
    }
  }, [rawTestimonials]);

  useEffect(() => {
    fetchAdminReviews();
  }, [fetchAdminReviews]);

  // External open trigger from parent tab toolbar
  useEffect(() => {
    if (externalModalOpen) {
      handleOpenAdd();
      if (onCloseExternalModal) onCloseExternalModal();
    }
  }, [externalModalOpen]);

  // Calculate metrics
  const totalReviews = reviewsList.length;
  const pendingCount = reviewsList.filter((item) => item.status === 'Pending').length;
  const publishedCount = reviewsList.filter(
    (item) => item.status === 'Approved' || (item.is_published !== false && item.status !== 'Pending' && item.status !== 'Rejected')
  ).length;
  const rejectedCount = reviewsList.filter((item) => item.status === 'Rejected' || item.status === 'Hidden').length;

  const approvedList = reviewsList.filter((r) => r.status === 'Approved' || (r.is_published !== false && r.status !== 'Rejected'));
  const avgRating = approvedList.length > 0
    ? (approvedList.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) / approvedList.length).toFixed(1)
    : '5.0';
  const fiveStarCount = reviewsList.filter((item) => Number(item.rating || 5) === 5).length;

  // Filtered reviews list
  const filteredList = useMemo(() => {
    return reviewsList.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.author || '').toLowerCase().includes(q) ||
        (item.company || '').toLowerCase().includes(q) ||
        (item.email || '').toLowerCase().includes(q) ||
        (item.location || '').toLowerCase().includes(q) ||
        (item.quote || '').toLowerCase().includes(q) ||
        (item.client_name || '').toLowerCase().includes(q);

      let matchesFilter = true;
      if (filterMode === 'pending') {
        matchesFilter = item.status === 'Pending';
      } else if (filterMode === 'published') {
        matchesFilter = item.status === 'Approved' || (item.is_published !== false && item.status !== 'Pending' && item.status !== 'Rejected');
      } else if (filterMode === 'rejected') {
        matchesFilter = item.status === 'Rejected' || item.status === 'Hidden';
      } else if (filterMode === '5' || filterMode === '4') {
        matchesFilter = String(item.rating || 5) === filterMode;
      }

      return matchesSearch && matchesFilter;
    });
  }, [reviewsList, searchQuery, filterMode]);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      author: '',
      company: '',
      location: '',
      email: '',
      rating: 5,
      quote: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Approved',
      is_published: true,
      client_id: '',
      client_name: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item, idx) => {
    setEditingIndex(idx);
    setFormData({
      author: item.author || '',
      company: item.company || '',
      location: item.location || '',
      email: item.email || '',
      rating: Number(item.rating) || 5,
      quote: item.quote || '',
      date: item.date || '',
      status: item.status || (item.is_published !== false ? 'Approved' : 'Rejected'),
      is_published: item.is_published !== false,
      client_id: item.client_id || '',
      client_name: item.client_name || ''
    });
    setModalOpen(true);
  };

  // Direct status update handler (Approve / Reject)
  const handleUpdateStatus = async (item, newStatus) => {
    const targetId = item.id || item.author;
    const isPub = (newStatus === 'Approved');

    try {
      const res = await fetch(`/api/admin/reviews/${encodeURIComponent(targetId)}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        showFeedback('success', newStatus === 'Approved'
          ? `Review by "${item.author}" approved and published live on the homepage!`
          : `Review by "${item.author}" has been rejected.`);
      } else {
        // Fallback sync via onSaveContent
        const updatedList = reviewsList.map((t) => {
          if ((t.id && t.id === item.id) || t.author === item.author) {
            return { ...t, status: newStatus, is_published: isPub };
          }
          return t;
        });
        if (onSaveContent) {
          await onSaveContent('testimonials', updatedList);
        }
        showFeedback('success', `Review marked as ${newStatus}.`);
      }

      await fetchAdminReviews();
      window.dispatchEvent(new CustomEvent('hti_content_updated', { detail: { sectionKey: 'testimonials' } }));
    } catch (err) {
      showFeedback('error', 'Failed to update review status: ' + (err.message || 'Unknown error'));
    }
  };

  const handleTogglePublished = async (item) => {
    const isCurrentlyPublished = item.status === 'Approved' || (item.is_published !== false && item.status !== 'Rejected');
    const newStatus = isCurrentlyPublished ? 'Rejected' : 'Approved';
    await handleUpdateStatus(item, newStatus);
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.quote.trim()) {
      showFeedback('error', 'Please enter both the reviewer name/title and quote content.');
      return;
    }

    const updatedList = [...reviewsList];
    const newEntry = {
      author: formData.author.trim(),
      company: formData.company.trim(),
      location: formData.location.trim(),
      email: formData.email.trim(),
      rating: Number(formData.rating) || 5,
      quote: formData.quote.trim(),
      date: (formData.date || '').trim() || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: formData.status || (formData.is_published ? 'Approved' : 'Rejected'),
      is_published: formData.is_published !== false && formData.status !== 'Rejected',
      client_id: formData.client_id ? String(formData.client_id) : undefined,
      client_name: formData.client_name ? String(formData.client_name).trim() : undefined
    };

    if (editingIndex !== null) {
      updatedList[editingIndex] = { ...updatedList[editingIndex], ...newEntry };
    } else {
      updatedList.unshift(newEntry);
    }

    try {
      if (onSaveContent) {
        const ok = await onSaveContent('testimonials', updatedList);
        if (ok !== false) {
          showFeedback('success', editingIndex !== null ? 'Review updated successfully!' : 'New review added live to website!');
          setModalOpen(false);
          await fetchAdminReviews();
          window.dispatchEvent(new CustomEvent('hti_content_updated', { detail: { sectionKey: 'testimonials' } }));
        }
      }
    } catch (err) {
      showFeedback('error', 'Failed to save review: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDelete = async (itemToDelete) => {
    if (!window.confirm(`Delete review from "${itemToDelete.author || 'Reviewer'}"? This will remove it from the system.`)) {
      return;
    }

    const updatedList = reviewsList.filter((item) => {
      if (item.id && itemToDelete.id) return item.id !== itemToDelete.id;
      return item.author !== itemToDelete.author;
    });

    try {
      if (onSaveContent) {
        await onSaveContent('testimonials', updatedList);
      }
      showFeedback('success', 'Review deleted from system.');
      await fetchAdminReviews();
      window.dispatchEvent(new CustomEvent('hti_content_updated', { detail: { sectionKey: 'testimonials' } }));
    } catch (err) {
      showFeedback('error', 'Failed to delete review: ' + (err.message || 'Unknown error'));
    }
  };

  const getInitials = (name) => {
    if (!name) return 'HT';
    const cleaned = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Er\.)\s*/i, '').trim();
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return cleaned.slice(0, 2).toUpperCase();
  };

  return (
    <div className="adm-rev-container">
      {/* 1. Header Banner (Only shown if not embedded in unified module) */}
      {!embedded && (
        <div className="adm-rev-header">
          <div className="adm-rev-title-group">
            <div className="adm-rev-title-icon">
              <Star size={24} />
            </div>
            <div>
              <h2 className="adm-rev-title">Reviews &amp; Customer Testimonials</h2>
              <p className="adm-rev-subtitle">
                Manage client reviews, verify pending homepage submissions, and moderate 5-star endorsements.
              </p>
            </div>
          </div>
          <button className="adm-rev-btn-add" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add New Review</span>
          </button>
        </div>
      )}

      {/* 2. Top KPI Metrics */}
      <div className="adm-rev-kpi-grid">
        <div className="adm-rev-kpi-card">
          <span className="adm-rev-kpi-label">
            <MessageSquare size={14} className="text-amber-400" />
            Total Reviews
          </span>
          <span className="adm-rev-kpi-value">{totalReviews}</span>
          <span className="adm-rev-kpi-sub">Customer submissions</span>
        </div>

        {/* Highlighted Pending Review Metric */}
        <div
          className={`adm-rev-kpi-card ${pendingCount > 0 ? 'adm-rev-kpi-pending-card' : ''}`}
          onClick={() => setFilterMode('pending')}
          style={{ cursor: 'pointer' }}
          title="Click to view reviews pending approval"
        >
          <span className="adm-rev-kpi-label">
            <Clock size={14} className={pendingCount > 0 ? 'text-amber-500 animate-pulse' : 'text-slate-400'} />
            Pending Approval
          </span>
          <span className="adm-rev-kpi-value" style={{ color: pendingCount > 0 ? '#d97706' : '#64748b' }}>
            {pendingCount}
          </span>
          <span className="adm-rev-kpi-sub">
            {pendingCount > 0 ? 'Action required: Review & approve' : 'All reviews reviewed'}
          </span>
        </div>

        <div className="adm-rev-kpi-card">
          <span className="adm-rev-kpi-label">
            <CheckCircle size={14} className="text-emerald-400" />
            Live on Website
          </span>
          <span className="adm-rev-kpi-value" style={{ color: '#10b981' }}>{publishedCount}</span>
          <span className="adm-rev-kpi-sub">{avgRating} ★ satisfaction score</span>
        </div>

        <div className="adm-rev-kpi-card">
          <span className="adm-rev-kpi-label">
            <Database size={14} className="text-sky-400" />
            Data Service
          </span>
          <span className="adm-rev-kpi-value" style={{ color: isDataServiceConnected ? '#0284c7' : '#f59e0b', fontSize: '1.25rem' }}>
            {isDataServiceConnected ? 'Connected' : 'Unavailable'}
          </span>
          <span className="adm-rev-kpi-sub">
            {isDataServiceConnected ? 'Ready for review management' : 'Service unavailable'}
          </span>
        </div>
      </div>

      {/* 3. Toolbar / Search & Filter */}
      <div className="adm-rev-toolbar">
        <div className="adm-rev-search-wrap">
          <Search size={16} className="adm-rev-search-icon" />
          <input
            type="text"
            className="adm-rev-search-input"
            placeholder="Search by reviewer, email, organization, quote or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="adm-rev-filter-group">
          <button
            type="button"
            className={`adm-rev-filter-btn ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            All ({totalReviews})
          </button>

          <button
            type="button"
            className={`adm-rev-filter-btn adm-rev-filter-pending ${filterMode === 'pending' ? 'active' : ''} ${pendingCount > 0 ? 'has-pending' : ''}`}
            onClick={() => setFilterMode('pending')}
          >
            <Clock size={12} />
            <span>Pending ({pendingCount})</span>
          </button>

          <button
            type="button"
            className={`adm-rev-filter-btn ${filterMode === 'published' ? 'active' : ''}`}
            onClick={() => setFilterMode('published')}
          >
            Live ({publishedCount})
          </button>

          <button
            type="button"
            className={`adm-rev-filter-btn ${filterMode === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilterMode('rejected')}
          >
            Rejected ({rejectedCount})
          </button>

          <button
            type="button"
            className={`adm-rev-filter-btn ${filterMode === '5' ? 'active' : ''}`}
            onClick={() => setFilterMode('5')}
          >
            5 Stars ({fiveStarCount})
          </button>
        </div>

        <button type="button" className="adm-rev-btn-add" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Add Review</span>
        </button>
      </div>

      {/* 4. Reviews Cards Grid */}
      {filteredList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(15,23,42,0.4)', borderRadius: '12px' }}>
          <Star size={40} style={{ margin: '0 auto 12px', color: '#64748b' }} />
          <h4 style={{ color: '#94a3b8', margin: '0 0 6px' }}>No reviews found</h4>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 16px' }}>
            {searchQuery || filterMode !== 'all'
              ? 'Try adjusting your search query or filter mode.'
              : 'Click "Add Review" to create your first customer review.'}
          </p>
          <button type="button" className="adm-rev-btn-add" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add Review Now</span>
          </button>
        </div>
      ) : (
        <div className="adm-rev-cards-grid">
          {filteredList.map((item) => {
            const actualIndex = reviewsList.indexOf(item);
            const ratingNum = Math.min(5, Math.max(1, Number(item.rating) || 5));
            const isPending = item.status === 'Pending';
            const isApproved = item.status === 'Approved' || (item.is_published !== false && !isPending && item.status !== 'Rejected');
            const isRejected = item.status === 'Rejected' || item.status === 'Hidden';

            return (
              <div
                key={item.id || actualIndex}
                className={`adm-rev-card ${isPending ? 'is-pending-card' : ''} ${isRejected ? 'is-hidden-card' : ''}`}
              >
                <div>
                  <div className="adm-rev-card-top">
                    <div className="adm-rev-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={15}
                          fill={s <= ratingNum ? '#f59e0b' : 'transparent'}
                          color={s <= ratingNum ? '#f59e0b' : '#475569'}
                        />
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.date && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.72rem',
                          color: '#64748b',
                          background: 'rgba(100, 116, 139, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}>
                          <Calendar size={11} />
                          {item.date}
                        </span>
                      )}

                      {/* Status Badges */}
                      {isPending && (
                        <span className="adm-rev-status-pill pending" title="Submitted by customer; awaiting admin approval">
                          <Clock size={11} />
                          <span>Pending Approval</span>
                        </span>
                      )}

                      {isApproved && (
                        <button
                          type="button"
                          className="adm-rev-status-pill published"
                          onClick={() => handleTogglePublished(item)}
                          title="Published live on public website. Click to unpublish."
                        >
                          <Eye size={11} />
                          <span>Live on Web</span>
                        </button>
                      )}

                      {isRejected && (
                        <button
                          type="button"
                          className="adm-rev-status-pill hidden"
                          onClick={() => handleTogglePublished(item)}
                          title="Rejected/Hidden. Click to approve and publish."
                        >
                          <EyeOff size={11} />
                          <span>Rejected</span>
                        </button>
                      )}

                      <span className="adm-rev-verified-pill">
                        <CheckCircle size={11} />
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Customer Email Row (especially helpful for verifying pending reviews) */}
                  {item.email && (
                    <div className="adm-rev-email-row" title={`Reviewer email: ${item.email}`}>
                      <Mail size={12} className="text-sky-400" />
                      <span>{item.email}</span>
                    </div>
                  )}

                  <p className="adm-rev-quote-text">"{item.quote}"</p>

                  {item.client_name && (
                    <div className="adm-rev-client-badge-row">
                      <span className="adm-rev-client-pill" title={`Associated with client: ${item.client_name}`}>
                        <Building size={11} />
                        <span>Client: {item.client_name}</span>
                      </span>
                    </div>
                  )}

                  {/* PROMINENT ACTION BUTTONS FOR PENDING REVIEWS */}
                  {isPending && (
                    <div className="adm-rev-pending-action-bar">
                      <button
                        type="button"
                        className="adm-rev-btn-approve-action"
                        onClick={() => handleUpdateStatus(item, 'Approved')}
                        title="Approve this review and display it live on the homepage"
                      >
                        <Check size={14} />
                        <span>Approve &amp; Publish Live</span>
                      </button>

                      <button
                        type="button"
                        className="adm-rev-btn-reject-action"
                        onClick={() => handleUpdateStatus(item, 'Rejected')}
                        title="Reject this review"
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="adm-rev-author-box">
                    <div className="adm-rev-avatar">{getInitials(item.author)}</div>
                    <div className="adm-rev-author-details">
                      <div className="adm-rev-author-name">{item.author || 'Anonymous Client'}</div>
                      <div className="adm-rev-author-company">
                        {item.company}
                        {item.location ? ` • ${item.location}` : ''}
                      </div>
                    </div>

                    <div className="adm-rev-card-actions">
                      <button
                        type="button"
                        className="adm-rev-icon-btn"
                        onClick={() => handleOpenEdit(item, actualIndex)}
                        title="Edit Review"
                        aria-label="Edit review"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className="adm-rev-icon-btn danger"
                        onClick={() => handleDelete(item)}
                        title="Delete Review"
                        aria-label="Delete review"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Add / Edit Modal */}
      {modalOpen && (
        <div className="adm-rev-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="adm-rev-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="adm-rev-modal-header">
              <div className="adm-rev-modal-header-info">
                <span className="adm-rev-modal-tag">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  {editingIndex !== null ? 'EDIT MODE' : 'NEW TESTIMONIAL'}
                </span>
                <h3 className="adm-rev-modal-title">
                  {editingIndex !== null ? 'Edit Customer Review' : 'Add New Customer Review'}
                </h3>
              </div>
              <button
                type="button"
                className="adm-rev-modal-close"
                onClick={() => setModalOpen(false)}
                title="Close dialog"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="adm-rev-modal-form">
              <div className="adm-rev-modal-body">
                {/* Row 1: Client Name & Company Name */}
                <div className="adm-rev-form-row">
                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">Client Name / Designation *</label>
                    <input
                      type="text"
                      className="adm-rev-input"
                      placeholder="e.g. Mr. Kunal Deshmukh (VP Engg)"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>

                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">Organization / Company Name</label>
                    <input
                      type="text"
                      className="adm-rev-input"
                      placeholder="e.g. Cipla Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 2: Email & Location */}
                <div className="adm-rev-form-row">
                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">Reviewer Email Address</label>
                    <input
                      type="email"
                      className="adm-rev-input"
                      placeholder="e.g. kunal.d@cipla.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">City / Location</label>
                    <input
                      type="text"
                      className="adm-rev-input"
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 3: Rating & Linked Client */}
                <div className="adm-rev-form-row">
                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">Rating (1 to 5 Stars)</label>
                    <div className="adm-rev-star-selector">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`adm-rev-star-btn ${s <= formData.rating ? 'filled' : ''}`}
                          onClick={() => setFormData({ ...formData, rating: s })}
                        >
                          <Star
                            size={18}
                            fill={s <= formData.rating ? '#f59e0b' : 'transparent'}
                            color={s <= formData.rating ? '#f59e0b' : '#94a3b8'}
                          />
                        </button>
                      ))}
                      <span className="adm-rev-rating-label">
                        {formData.rating} Stars
                      </span>
                    </div>
                  </div>

                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">Link to Client (Optional)</label>
                    <select
                      className="adm-rev-input"
                      value={formData.client_id || ''}
                      onChange={(e) => {
                        const selId = e.target.value;
                        const matched = clients.find((c) => String(c.id) === String(selId));
                        setFormData({
                          ...formData,
                          client_id: selId,
                          client_name: matched ? matched.name : '',
                          company: matched && !formData.company ? matched.name : formData.company
                        });
                      }}
                    >
                      <option value="">-- No linked client --</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.sector ? `(${c.sector})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Review Date & Status */}
                <div className="adm-rev-form-row">
                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">Review Date</label>
                    <input
                      type="text"
                      className="adm-rev-input"
                      placeholder="e.g. 10 Oct 2025"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">Review Status</label>
                    <select
                      className="adm-rev-input"
                      value={formData.status || 'Approved'}
                      onChange={(e) => {
                        const st = e.target.value;
                        setFormData({
                          ...formData,
                          status: st,
                          is_published: st === 'Approved'
                        });
                      }}
                    >
                      <option value="Approved">Approved (Live on Website)</option>
                      <option value="Pending">Pending (Awaiting Approval)</option>
                      <option value="Rejected">Rejected (Hidden from Website)</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Review Quote Content */}
                <div className="adm-rev-form-group">
                  <label className="adm-rev-label">Review / Testimonial Quote *</label>
                  <textarea
                    className="adm-rev-textarea"
                    placeholder="Enter the customer's verified feedback regarding HTI products or service..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                {/* Row 6: Visibility Toggle */}
                <div className="adm-rev-checkbox-wrap">
                  <label className="adm-rev-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.is_published !== false && formData.status !== 'Rejected'}
                      onChange={(e) => setFormData({
                        ...formData,
                        is_published: e.target.checked,
                        status: e.target.checked ? 'Approved' : 'Rejected'
                      })}
                    />
                    <span>Publish live on public website (Visible on Homepage &amp; Clients page)</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="adm-rev-modal-footer">
                <button
                  type="button"
                  className="adm-rev-btn-cancel"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-rev-btn-publish">
                  <CheckCircle size={15} />
                  <span>{editingIndex !== null ? 'Save Changes' : 'Publish Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
