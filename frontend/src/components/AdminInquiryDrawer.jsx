import React, { useState, useEffect } from 'react';
import { X, Shield, RefreshCw, Trash2, CheckCircle, Clock, Mail, Phone, Building, Calendar, Check } from 'lucide-react';

export default function AdminInquiryDrawer({ isOpen, onClose, onCountUpdate }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const url = filterStatus === 'All' ? '/api/inquiries' : `/api/inquiries?status_filter=${filterStatus}`;
      const res = await fetch(url);
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
      if (onCountUpdate && filterStatus === 'All') {
        onCountUpdate(data.length);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen, filterStatus]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        setFeedbackMsg(`Inquiry #${id} status changed to ${newStatus}`);
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to remove inquiry #${id}?`)) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
        if (onCountUpdate) onCountUpdate(inquiries.length - 1);
        setFeedbackMsg(`Inquiry #${id} deleted.`);
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container glass-card" onClick={e => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <div className="drawer-icon-box">
              <Shield size={22} className="text-cyan" />
            </div>
            <div>
              <h3 className="drawer-title">Commercial Inquiries Portal</h3>
              <p className="drawer-sub">Stored in SQLite backend: <code className="text-cyan font-mono">backend/hti.db</code></p>
            </div>
          </div>

          <div className="drawer-actions">
            <button className="btn-icon" onClick={fetchInquiries} title="Refresh inquiries list">
              <RefreshCw size={18} className={loading ? 'spinning' : ''} />
            </button>
            <button className="btn-icon" onClick={onClose} aria-label="Close portal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="drawer-toolbar">
          <div className="status-filter-pills">
            {['All', 'New', 'In Review', 'Contacted', 'Resolved'].map(st => (
              <button
                key={st}
                className={`filter-pill-btn ${filterStatus === st ? 'pill-active' : ''}`}
                onClick={() => setFilterStatus(st)}
              >
                {st}
              </button>
            ))}
          </div>

          {feedbackMsg && (
            <div className="drawer-feedback-toast">
              <Check size={14} />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>

        {/* Inquiries List */}
        <div className="drawer-body">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Fetching inquiries from SQLite database...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="drawer-empty-state">
              <Mail size={40} className="text-dim" />
              <h4>No inquiries in this view</h4>
              <p>Submit an inquiry through the contact form on the home page to see it appear here immediately.</p>
            </div>
          ) : (
            <div className="inquiry-cards-list">
              {inquiries.map(inq => {
                const statusBadgeClass =
                  inq.status === 'New'
                    ? 'badge-red'
                    : inq.status === 'In Review'
                    ? 'badge-amber'
                    : inq.status === 'Contacted'
                    ? 'badge-cyan'
                    : 'badge-emerald';

                return (
                  <div key={inq.id} className="inquiry-item-card glass-card">
                    <div className="inquiry-top">
                      <div className="inquiry-id-box">
                        <span className="inquiry-ref">#HTI-{inq.id}</span>
                        <span className="inquiry-prod-pill">{inq.product_name}</span>
                      </div>
                      <div className="inquiry-status-control">
                        <AdminDropdown
                          value={inq.status}
                          onChange={e => handleUpdateStatus(inq.id, e.target.value)}
                          options={[
                            { value: 'New', label: 'New', color: '#16a34a' },
                            { value: 'In Review', label: 'In Review', color: '#eab308' },
                            { value: 'Contacted', label: 'Contacted', color: '#0284c7' },
                            { value: 'Resolved', label: 'Resolved', color: '#059669' }
                          ]}
                          size="sm"
                          isPill={true}
                          className="inquiry-bs5-dropdown"
                        />
                        <button
                          className="btn-trash"
                          onClick={() => handleDelete(inq.id)}
                          title="Delete inquiry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="inquiry-user-info">
                      <h4 className="inquiry-name">{inq.full_name}</h4>
                      <div className="inquiry-details-row">
                        <span className="detail-tag">
                          <Building size={13} className="text-cyan" />
                          <span>{inq.company}</span>
                        </span>
                        <span className="detail-tag">
                          <Mail size={13} className="text-cyan" />
                          <a href={`mailto:${inq.email}`}>{inq.email}</a>
                        </span>
                        <span className="detail-tag">
                          <Phone size={13} className="text-cyan" />
                          <a href={`tel:${inq.phone}`}>{inq.phone}</a>
                        </span>
                      </div>
                    </div>

                    <div className="inquiry-message-box">
                      <p className="inquiry-message-text">"{inq.message}"</p>
                    </div>

                    <div className="inquiry-footer">
                      <span className="inquiry-time">
                        <Calendar size={12} />
                        <span>Logged: {inq.created_at}</span>
                      </span>
                      <span className="inquiry-category-tag">{inq.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="drawer-footer">
          <div className="footer-tip">
            SQLite Database File Location: <code>hti_website/backend/hti.db</code>
          </div>
          <button className="btn-secondary" onClick={onClose}>
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
}
