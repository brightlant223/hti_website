import React, { useState, useMemo } from 'react';
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
  Sparkles
} from 'lucide-react';

export default function AdminReviewsManager({
  websiteContent = {},
  onSaveContent,
  showFeedback = () => {},
  currentUser = 'admin'
}) {
  const rawTestimonials = websiteContent?.testimonials?.data;
  const testimonialsList = useMemo(() => {
    return Array.isArray(rawTestimonials) ? rawTestimonials : [];
  }, [rawTestimonials]);

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    author: '',
    company: '',
    location: '',
    rating: 5,
    quote: ''
  });

  // Calculate metrics
  const totalReviews = testimonialsList.length;
  const avgRating = totalReviews > 0
    ? (testimonialsList.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) / totalReviews).toFixed(1)
    : '5.0';
  const fiveStarCount = testimonialsList.filter((item) => Number(item.rating || 5) === 5).length;

  // Filtered reviews
  const filteredList = useMemo(() => {
    return testimonialsList.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.author || '').toLowerCase().includes(q) ||
        (item.company || '').toLowerCase().includes(q) ||
        (item.location || '').toLowerCase().includes(q) ||
        (item.quote || '').toLowerCase().includes(q);

      const matchesRating =
        ratingFilter === 'all' ||
        String(item.rating || 5) === String(ratingFilter);

      return matchesSearch && matchesRating;
    });
  }, [testimonialsList, searchQuery, ratingFilter]);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      author: '',
      company: '',
      location: '',
      rating: 5,
      quote: ''
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
      quote: item.quote || ''
    });
    setModalOpen(true);
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
      quote: formData.quote.trim()
    };

    if (editingIndex !== null) {
      updatedList[editingIndex] = newEntry;
    } else {
      updatedList.unshift(newEntry);
    }

    try {
      if (onSaveContent) {
        await onSaveContent('testimonials', updatedList);
      }
      showFeedback('success', editingIndex !== null ? 'Review updated successfully!' : 'New review added live to website!');
      setModalOpen(false);
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
      {/* Header Banner */}
      <div className="adm-rev-header">
        <div className="adm-rev-title-group">
          <div className="adm-rev-title-icon">
            <Star size={24} />
          </div>
          <div>
            <h2 className="adm-rev-title">Reviews & Customer Testimonials</h2>
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

      {/* Top 4 KPI Metrics */}
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

      {/* Toolbar / Search & Filter */}
      <div className="adm-rev-toolbar">
        <div className="adm-rev-search-wrap">
          <Search size={16} className="adm-rev-search-icon" />
          <input
            type="text"
            className="adm-rev-search-input"
            placeholder="Search by client name, company, location or quote..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="adm-rev-filter-group">
          <button
            className={`adm-rev-filter-btn ${ratingFilter === 'all' ? 'active' : ''}`}
            onClick={() => setRatingFilter('all')}
          >
            All Ratings ({testimonialsList.length})
          </button>
          <button
            className={`adm-rev-filter-btn ${ratingFilter === '5' ? 'active' : ''}`}
            onClick={() => setRatingFilter('5')}
          >
            5 Stars ({fiveStarCount})
          </button>
          <button
            className={`adm-rev-filter-btn ${ratingFilter === '4' ? 'active' : ''}`}
            onClick={() => setRatingFilter('4')}
          >
            4 Stars ({testimonialsList.filter(t => Number(t.rating) === 4).length})
          </button>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      {filteredList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(15,23,42,0.4)', borderRadius: '12px' }}>
          <Star size={40} style={{ margin: '0 auto 12px', color: '#64748b' }} />
          <h4 style={{ color: '#94a3b8', margin: '0 0 6px' }}>No reviews found</h4>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 16px' }}>
            {searchQuery ? 'Try matching another search term.' : 'Click "Add New Review" to publish your first customer testimonial.'}
          </p>
          <button className="adm-rev-btn-add" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add Review Now</span>
          </button>
        </div>
      ) : (
        <div className="adm-rev-cards-grid">
          {filteredList.map((item, idx) => {
            const actualIndex = testimonialsList.indexOf(item);
            const ratingNum = Math.min(5, Math.max(1, Number(item.rating) || 5));
            return (
              <div key={actualIndex} className="adm-rev-card">
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
                    <span className="adm-rev-verified-pill">
                      <CheckCircle size={11} />
                      Verified
                    </span>
                  </div>

                  <p className="adm-rev-quote-text">"{item.quote}"</p>
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
                        className="adm-rev-icon-btn"
                        onClick={() => handleOpenEdit(item, actualIndex)}
                        title="Edit Review"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="adm-rev-icon-btn danger"
                        onClick={() => handleDelete(actualIndex)}
                        title="Delete Review"
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="adm-rev-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="adm-rev-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="adm-rev-modal-header">
              <h3 className="adm-rev-modal-title">
                {editingIndex !== null ? 'Edit Customer Review' : 'Add New Customer Review'}
              </h3>
              <button className="adm-rev-modal-close" onClick={() => setModalOpen(false)}>
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
