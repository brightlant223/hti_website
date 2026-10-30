import React, { useState, useMemo, useEffect } from 'react';
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
  EyeOff
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
  const testimonialsList = useMemo(() => {
    return Array.isArray(rawTestimonials) ? rawTestimonials : [];
  }, [rawTestimonials]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | '5' | '4' | 'published' | 'hidden'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    author: '',
    company: '',
    location: '',
    rating: 5,
    quote: '',
    is_published: true,
    client_id: '',
    client_name: ''
  });

  // External open trigger from parent tab toolbar
  useEffect(() => {
    if (externalModalOpen) {
      handleOpenAdd();
      if (onCloseExternalModal) onCloseExternalModal();
    }
  }, [externalModalOpen]);

  // Calculate metrics
  const totalReviews = testimonialsList.length;
  const avgRating = totalReviews > 0
    ? (testimonialsList.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) / totalReviews).toFixed(1)
    : '5.0';
  const fiveStarCount = testimonialsList.filter((item) => Number(item.rating || 5) === 5).length;
  const publishedCount = testimonialsList.filter((item) => item.is_published !== false).length;
  const hiddenCount = testimonialsList.filter((item) => item.is_published === false).length;

  // Filtered reviews
  const filteredList = useMemo(() => {
    return testimonialsList.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.author || '').toLowerCase().includes(q) ||
        (item.company || '').toLowerCase().includes(q) ||
        (item.location || '').toLowerCase().includes(q) ||
        (item.quote || '').toLowerCase().includes(q) ||
        (item.client_name || '').toLowerCase().includes(q);

      let matchesFilter = true;
      if (filterMode === '5' || filterMode === '4') {
        matchesFilter = String(item.rating || 5) === filterMode;
      } else if (filterMode === 'published') {
        matchesFilter = item.is_published !== false;
      } else if (filterMode === 'hidden') {
        matchesFilter = item.is_published === false;
      }

      return matchesSearch && matchesFilter;
    });
  }, [testimonialsList, searchQuery, filterMode]);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      author: '',
      company: '',
      location: '',
      rating: 5,
      quote: '',
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
      rating: Number(item.rating) || 5,
      quote: item.quote || '',
      is_published: item.is_published !== false,
      client_id: item.client_id || '',
      client_name: item.client_name || ''
    });
    setModalOpen(true);
  };

  const handleTogglePublished = async (indexToToggle) => {
    const updatedList = [...testimonialsList];
    const current = updatedList[indexToToggle];
    const newStatus = current.is_published === false ? true : false;
    updatedList[indexToToggle] = {
      ...current,
      is_published: newStatus
    };
    try {
      if (onSaveContent) {
        const ok = await onSaveContent('testimonials', updatedList);
        if (ok !== false) {
          showFeedback('success', newStatus ? 'Review published live on website!' : 'Review hidden from public website.');
        }
      }
    } catch (err) {
      showFeedback('error', 'Failed to update review visibility: ' + (err.message || 'Unknown error'));
    }
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.quote.trim()) {
      showFeedback('error', 'Please enter both the reviewer name/title and quote content.');
      return;
    }

    const updatedList = [...testimonialsList];
    const newEntry = {
      author: formData.author.trim(),
      company: formData.company.trim(),
      location: formData.location.trim(),
      rating: Number(formData.rating) || 5,
      quote: formData.quote.trim(),
      is_published: formData.is_published !== false,
      client_id: formData.client_id ? String(formData.client_id) : undefined,
      client_name: formData.client_name ? String(formData.client_name).trim() : undefined
    };

    if (editingIndex !== null) {
      updatedList[editingIndex] = newEntry;
    } else {
      updatedList.unshift(newEntry);
    }

    try {
      if (onSaveContent) {
        const ok = await onSaveContent('testimonials', updatedList);
        if (ok !== false) {
          showFeedback('success', editingIndex !== null ? 'Review updated successfully!' : 'New review added live to website!');
          setModalOpen(false);
        }
      }
    } catch (err) {
      showFeedback('error', 'Failed to save review: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDelete = async (indexToDelete) => {
    const item = testimonialsList[indexToDelete];
    if (!window.confirm(`Delete review from "${item.author || 'Reviewer'}"? This will remove it from the public website.`)) {
      return;
    }

    const updatedList = testimonialsList.filter((_, idx) => idx !== indexToDelete);
    try {
      if (onSaveContent) {
        await onSaveContent('testimonials', updatedList);
      }
      showFeedback('success', 'Review deleted from public website.');
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
                Manage client endorsements, 5-star feedback, and verified recommendations shown across HTI website.
              </p>
            </div>
          </div>
          <button className="adm-rev-btn-add" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add New Review</span>
          </button>
        </div>
      )}

      {/* 2. Top 4 KPI Metrics (Only shown if not embedded) */}
      {!embedded && (
        <div className="adm-rev-kpi-grid">
          <div className="adm-rev-kpi-card">
            <span className="adm-rev-kpi-label">
              <MessageSquare size={14} className="text-amber-400" />
              Total Reviews
            </span>
            <span className="adm-rev-kpi-value">{totalReviews}</span>
            <span className="adm-rev-kpi-sub">Verified customer submissions</span>
          </div>

          <div className="adm-rev-kpi-card">
            <span className="adm-rev-kpi-label">
              <Star size={14} className="text-amber-400" />
              Average Rating
            </span>
            <span className="adm-rev-kpi-value">{avgRating} ★</span>
            <span className="adm-rev-kpi-sub">Out of 5.0 satisfaction score</span>
          </div>

          <div className="adm-rev-kpi-card">
            <span className="adm-rev-kpi-label">
              <Award size={14} className="text-amber-400" />
              5-Star Endorsements
            </span>
            <span className="adm-rev-kpi-value">{fiveStarCount}</span>
            <span className="adm-rev-kpi-sub">{totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 100}% top ratings</span>
          </div>

          <div className="adm-rev-kpi-card">
            <span className="adm-rev-kpi-label">
              <Sparkles size={14} className="text-emerald-400" />
              Public Web Status
            </span>
            <span className="adm-rev-kpi-value" style={{ color: '#10b981' }}>Live</span>
            <span className="adm-rev-kpi-sub">Synced with SQLite content store</span>
          </div>
        </div>
      )}

      {/* 3. Toolbar / Search & Filter */}
      <div className="adm-rev-toolbar">
        <div className="adm-rev-search-wrap">
          <Search size={16} className="adm-rev-search-icon" />
          <input
            type="text"
            className="adm-rev-search-input"
            placeholder="Search by reviewer, organization, location, quote or client..."
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
            All ({testimonialsList.length})
          </button>
          <button
            type="button"
            className={`adm-rev-filter-btn ${filterMode === 'published' ? 'active' : ''}`}
            onClick={() => setFilterMode('published')}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            className={`adm-rev-filter-btn ${filterMode === 'hidden' ? 'active' : ''}`}
            onClick={() => setFilterMode('hidden')}
          >
            Hidden ({hiddenCount})
          </button>
          <button
            type="button"
            className={`adm-rev-filter-btn ${filterMode === '5' ? 'active' : ''}`}
            onClick={() => setFilterMode('5')}
          >
            5 Stars ({fiveStarCount})
          </button>
          <button
            type="button"
            className={`adm-rev-filter-btn ${filterMode === '4' ? 'active' : ''}`}
            onClick={() => setFilterMode('4')}
          >
            4 Stars ({testimonialsList.filter(t => Number(t.rating) === 4).length})
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
            {searchQuery || filterMode !== 'all' ? 'Try adjusting your search query or filter mode.' : 'Click "Add Review" to publish your first verified customer review.'}
          </p>
          <button type="button" className="adm-rev-btn-add" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add Review Now</span>
          </button>
        </div>
      ) : (
        <div className="adm-rev-cards-grid">
          {filteredList.map((item) => {
            const actualIndex = testimonialsList.indexOf(item);
            const ratingNum = Math.min(5, Math.max(1, Number(item.rating) || 5));
            const isPub = item.is_published !== false;
            return (
              <div key={actualIndex} className={`adm-rev-card ${!isPub ? 'is-hidden-card' : ''}`}>
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
                      <button
                        type="button"
                        className={`adm-rev-status-pill ${isPub ? 'published' : 'hidden'}`}
                        onClick={() => handleTogglePublished(actualIndex)}
                        title={isPub ? 'Click to unpublish from website' : 'Click to publish on website'}
                      >
                        {isPub ? <Eye size={11} /> : <EyeOff size={11} />}
                        <span>{isPub ? 'Live on Web' : 'Hidden'}</span>
                      </button>
                      <span className="adm-rev-verified-pill">
                        <CheckCircle size={11} />
                        Verified
                      </span>
                    </div>
                  </div>

                  <p className="adm-rev-quote-text">"{item.quote}"</p>

                  {item.client_name && (
                    <div className="adm-rev-client-badge-row">
                      <span className="adm-rev-client-pill" title={`Associated with client: ${item.client_name}`}>
                        <Building size={11} />
                        <span>Client: {item.client_name}</span>
                      </span>
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
                        onClick={() => handleDelete(actualIndex)}
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
              <h3 className="adm-rev-modal-title">
                {editingIndex !== null ? 'Edit Customer Review' : 'Add New Customer Review'}
              </h3>
              <button type="button" className="adm-rev-modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModal}>
              <div className="adm-rev-modal-body">
                <div className="adm-rev-form-group">
                  <label className="adm-rev-label">Client Name / Designation *</label>
                  <input
                    type="text"
                    className="adm-rev-input"
                    placeholder="e.g. Dr. Hiren Patel (VP Engineering)"
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
                    placeholder="e.g. Sun Pharma Cleanroom Division"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                {/* Optional Link to Enterprise Client */}
                {clients.length > 0 && (
                  <div className="adm-rev-form-group">
                    <label className="adm-rev-label">Link to Enterprise Client (Optional)</label>
                    <select
                      className="adm-rev-input"
                      value={formData.client_id || ''}
                      onChange={(e) => {
                        const selId = e.target.value;
                        const matched = clients.find(c => String(c.id) === String(selId));
                        setFormData({
                          ...formData,
                          client_id: selId,
                          client_name: matched ? matched.name : '',
                          company: matched && !formData.company ? matched.name : formData.company
                        });
                      }}
                    >
                      <option value="">-- No linked client (General testimonial) --</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.sector ? `(${c.sector})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="adm-rev-form-group">
                  <label className="adm-rev-label">City / Location</label>
                  <input
                    type="text"
                    className="adm-rev-input"
                    placeholder="e.g. Navi Mumbai, Maharashtra"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

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
                          size={22}
                          fill={s <= formData.rating ? '#f59e0b' : 'transparent'}
                          color={s <= formData.rating ? '#f59e0b' : '#64748b'}
                        />
                      </button>
                    ))}
                    <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 600, marginLeft: '6px' }}>
                      {formData.rating} Stars
                    </span>
                  </div>
                </div>

                <div className="adm-rev-form-group">
                  <label className="adm-rev-label">Review / Testimonial Quote *</label>
                  <textarea
                    className="adm-rev-textarea"
                    placeholder="Enter the customer's verified feedback regarding HTI products or service..."
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    required
                  />
                </div>

                {/* Visibility Toggle */}
                <div className="adm-rev-form-group adm-rev-checkbox-group">
                  <label className="adm-rev-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.is_published !== false}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    />
                    <span>Publish live on public website (Visible on public Clients page)</span>
                  </label>
                </div>
              </div>

              <div className="adm-rev-modal-footer">
                <button
                  type="button"
                  className="adm-rev-btn-cancel"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-rev-btn-add">
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
