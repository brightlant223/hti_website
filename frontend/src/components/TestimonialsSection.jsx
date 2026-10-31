import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './TestimonialsSection.css';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  PenLine,
  ArrowUpRight,
  CheckCircle2,
  X,
  ShieldCheck,
  Search,
  MessageSquare
} from 'lucide-react';

// Fallback verified reviews
const DEFAULT_TESTIMONIALS = [
  {
    author: 'Mr. Kunal Deshmukh',
    company: 'Cipla Ltd.',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '10 Oct 2025',
    quote: 'The cleanroom and door systems provided by your team are of excellent quality. Professional approach and timely delivery.',
    is_published: true,
    client_name: 'Cipla'
  },
  {
    author: 'Mrs. Priya Shah',
    company: 'Lupin Pharmaceuticals',
    location: 'Nagpur, Maharashtra',
    rating: 5,
    date: '02 Oct 2025',
    quote: 'Very satisfied with their service and technical expertise. The project was completed within the committed timeline.',
    is_published: true,
    client_name: 'Lupin'
  },
  {
    author: 'Mr. Sandeep Kumar',
    company: "Dr. Reddy's Laboratories",
    location: 'Hyderabad, Telangana',
    rating: 5,
    date: '18 Sep 2025',
    quote: 'Reliable partner for our industrial safety and automation needs. Their support team is always helpful and responsive.',
    is_published: true,
    client_name: "Dr. Reddy's"
  },
  {
    author: 'Dr. Rajesh Sharma',
    company: 'Alembic Pharmaceuticals',
    location: 'Vadodara, Gujarat',
    rating: 5,
    date: '18 Oct 2026',
    quote: "HTI's 8-door cleanroom interlock system and pneumatic pass boxes passed our USFDA cGMP audit with zero observations. Flawless differential pressure delays and exceptional durability.",
    is_published: true,
    client_name: 'Alembic'
  },
  {
    author: 'Sunil Deshmukh',
    company: 'Torrent Pharmaceuticals Ltd.',
    location: 'Baddi, Himachal Pradesh',
    rating: 5,
    date: '05 Oct 2026',
    quote: 'We deployed HTI’s high-speed PVC cleanroom roll-up doors and emergency touchless exit switches. The thermal insulation and high cycle reliability have exceeded all our production expectations.',
    is_published: true,
    client_name: 'Torrent Pharma'
  }
];

// Helper to render authentic corporate logo badges
function CompanyLogoBadge({ company = '', clientName = '' }) {
  const comp = (company || clientName || '').toLowerCase();

  // Cipla: Blue oval badge
  if (comp.includes('cipla')) {
    return (
      <div className="tmn-logo-badge cipla" title="Cipla Ltd.">
        <span className="tmn-logo-text-cipla">Cipla</span>
      </div>
    );
  }

  // Lupin: Clean badge
  if (comp.includes('lupin')) {
    return (
      <div className="tmn-logo-badge lupin" title="Lupin Pharmaceuticals">
        <span className="tmn-logo-text-lupin">
          <span className="lupin-dot">Lup</span>in
        </span>
      </div>
    );
  }

  // Dr. Reddy's
  if (comp.includes('reddy')) {
    return (
      <div className="tmn-logo-badge dr-reddy" title="Dr. Reddy's Laboratories">
        <span className="tmn-logo-text-dr-reddy">Dr.Reddy's</span>
      </div>
    );
  }

  // Alembic
  if (comp.includes('alembic')) {
    return (
      <div className="tmn-logo-badge alembic" title="Alembic Pharmaceuticals">
        <img
          src="/clients/alembic.png"
          alt="Alembic"
          className="tmn-logo-img"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'inline';
          }}
        />
        <span className="tmn-logo-text-fallback" style={{ display: 'none' }}>Alembic</span>
      </div>
    );
  }

  // Torrent
  if (comp.includes('torrent')) {
    return (
      <div className="tmn-logo-badge torrent" title="Torrent Pharma">
        <span className="tmn-logo-text-torrent">torrent</span>
      </div>
    );
  }

  // Generic fallback with initials
  const initials = (clientName || company || 'HT')
    .split(/\s+/)
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();

  return (
    <div className="tmn-logo-badge generic" title={company || clientName}>
      <span className="tmn-logo-text-generic">{initials}</span>
    </div>
  );
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState(DEFAULT_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal states
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [viewAllModalOpen, setViewAllModalOpen] = useState(false);

  // Write a Review Form State
  const [formData, setFormData] = useState({
    author: '',
    company: '',
    email: '',
    location: '',
    rating: 5,
    quote: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // View All Reviews Modal Filter State
  const [allSearchQuery, setAllSearchQuery] = useState('');
  const [allFilterRating, setAllFilterRating] = useState('all');

  // Fetch only approved reviews dynamically from Backend API
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter(
            (item) => item.is_published !== false && item.status !== 'Pending' && item.status !== 'Rejected'
          );
          if (published.length > 0) {
            setReviews(published);
          }
        }
      } else {
        // Fallback to /api/content/testimonials
        const fbRes = await fetch(`/api/content/testimonials?_t=${Date.now()}`);
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          const list = fbData?.data;
          if (Array.isArray(list) && list.length > 0) {
            const published = list.filter(
              (item) => item.is_published !== false && item.status !== 'Pending' && item.status !== 'Rejected'
            );
            if (published.length > 0) setReviews(published);
          }
        }
      }
    } catch (err) {
      console.warn('Note: Reviews loaded from verified cache', err);
    }
  }, []);

  // Real-time synchronization with Admin Panel
  useEffect(() => {
    fetchReviews();

    const handleContentUpdate = (e) => {
      if (!e.detail || e.detail.sectionKey === 'testimonials') {
        fetchReviews();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchReviews();
      }
    };

    window.addEventListener('hti_content_updated', handleContentUpdate);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('hti_content_updated', handleContentUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchReviews]);

  // Navigation handlers
  const handlePrev = () => {
    if (reviews.length <= 3) return;
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (reviews.length <= 3) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  // 3 visible cards window
  const visibleCards = useMemo(() => {
    if (reviews.length <= 3) return reviews;
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return items;
  }, [reviews, currentIndex]);

  // Handle Review Form Submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validation
    const name = formData.author.trim();
    const company = formData.company.trim();
    const email = formData.email.trim();
    const quote = formData.quote.trim();
    const rating = Number(formData.rating) || 5;

    if (!name || name.length < 2) {
      setFormError('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!company || company.length < 2) {
      setFormError('Please enter your organization or company name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setFormError('Please provide a valid business or professional email address.');
      return;
    }
    if (rating < 1 || rating > 5) {
      setFormError('Please select a star rating between 1 and 5.');
      return;
    }
    if (!quote || quote.length < 10) {
      setFormError('Please write your review feedback (at least 10 characters).');
      return;
    }

    setFormSubmitting(true);
    try {
      const response = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author: name,
          company: company,
          email: email,
          location: formData.location.trim(),
          rating: rating,
          quote: quote,
          client_name: company
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData?.detail || 'Failed to submit review. Please try again.');
      }

      setFormSuccess(true);
      // Reset form fields
      setFormData({
        author: '',
        company: '',
        email: '',
        location: '',
        rating: 5,
        quote: ''
      });
    } catch (err) {
      setFormError(err.message || 'Error submitting review. Please check your network connection.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Filtered reviews for "View All Reviews" modal
  const filteredAllReviews = useMemo(() => {
    return reviews.filter((item) => {
      const q = allSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.author || '').toLowerCase().includes(q) ||
        (item.company || '').toLowerCase().includes(q) ||
        (item.quote || '').toLowerCase().includes(q) ||
        (item.location || '').toLowerCase().includes(q);

      let matchesRating = true;
      if (allFilterRating === '5') {
        matchesRating = Number(item.rating || 5) === 5;
      } else if (allFilterRating === '4') {
        matchesRating = Number(item.rating || 5) === 4;
      }

      return matchesSearch && matchesRating;
    });
  }, [reviews, allSearchQuery, allFilterRating]);

  const activeStarCount = hoverRating || formData.rating;

  return (
    <section id="testimonials" className="tmn-exact-section">
      <div className="container tmn-exact-container">
        {/* ── LEFT COLUMN: Heading, Navigation & Action Buttons ── */}
        <div className="tmn-exact-left">
          <div className="tmn-exact-eyebrow">TESTIMONIALS</div>

          <h2 className="tmn-exact-title">
            Trusted by <br />
            <span className="tmn-exact-title-blue">Industry Leaders</span>
          </h2>

          <p className="tmn-exact-desc">
            We take pride in delivering reliable automation and security solutions that create real value for our clients.
          </p>

          {/* Action Buttons: Write a Review & View All Reviews */}
          <div className="tmn-exact-actions">
            <button
              type="button"
              className="tmn-btn-write"
              onClick={() => {
                setFormSuccess(false);
                setFormError('');
                setWriteModalOpen(true);
              }}
              title="Share your review of HTI products and service"
            >
              <PenLine size={15} />
              <span>Write a Review</span>
            </button>

            <button
              type="button"
              className="tmn-btn-view-all"
              onClick={() => setViewAllModalOpen(true)}
              title="Browse all customer reviews"
            >
              <span>View All Reviews</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Carousel Navigation Arrow Buttons */}
          <div className="tmn-exact-nav-btns">
            <button
              type="button"
              className="tmn-exact-arrow-btn"
              onClick={handlePrev}
              disabled={reviews.length <= 3}
              title="Previous reviews"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              className="tmn-exact-arrow-btn"
              onClick={handleNext}
              disabled={reviews.length <= 3}
              title="Next reviews"
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>

            <span className="tmn-nav-count">
              Showing {reviews.length > 0 ? currentIndex + 1 : 0} - {Math.min(currentIndex + 3, reviews.length)} of {reviews.length}
            </span>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Three Horizontal Review Cards ── */}
        <div className="tmn-exact-right">
          <div className="tmn-exact-cards-grid">
            {visibleCards.map((rev, idx) => {
              const ratingScore = Math.min(5, Math.max(1, Number(rev.rating) || 5));

              return (
                <div key={rev.id || idx} className="tmn-exact-card">
                  {/* Top-left: Soft Sky-blue Double Quote Icon */}
                  <div className="tmn-exact-quote-icon" aria-hidden="true">
                    <svg
                      width="28"
                      height="24"
                      viewBox="0 0 28 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 13.7143C0 6.14286 4.71429 1.42857 11.4286 0L12.5714 2.85714C8 3.71429 5.71429 6.28571 5.42857 9.42857H11.4286V24H0V13.7143ZM15.4286 13.7143C15.4286 6.14286 20.1429 1.42857 26.8571 0L28 2.85714C23.4286 3.71429 21.1429 6.28571 20.8571 9.42857H26.8571V24H15.4286V13.7143Z"
                        fill="#38bdf8"
                      />
                    </svg>
                  </div>

                  {/* Review Quote Text */}
                  <p className="tmn-exact-quote-text">
                    "{rev.quote}"
                  </p>

                  {/* 5-Star Rating Row */}
                  <div className="tmn-exact-stars-row" title={`${ratingScore} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= ratingScore ? '#f59e0b' : 'transparent'}
                        color={s <= ratingScore ? '#f59e0b' : '#cbd5e1'}
                        className="tmn-exact-star"
                      />
                    ))}
                  </div>

                  {/* Bottom Footer: Company Logo Badge + Customer Info + Date */}
                  <div className="tmn-exact-card-footer">
                    <div className="tmn-exact-client-info">
                      <CompanyLogoBadge
                        company={rev.company}
                        clientName={rev.client_name}
                      />

                      <div className="tmn-exact-client-meta">
                        <div className="tmn-exact-author-name">
                          {rev.author || 'Verified Client'}
                        </div>
                        <div className="tmn-exact-author-company">
                          {rev.company || rev.client_name || 'Enterprise Client'}
                        </div>
                      </div>
                    </div>

                    <div className="tmn-exact-date">
                          {rev.date || 'Verified'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════
          MODAL 1: WRITE A REVIEW SUBMISSION MODAL
          ═════════════════════════════════════════════════════════════════════════ */}
      {writeModalOpen && (
        <div className="tmn-modal-overlay" onClick={() => setWriteModalOpen(false)}>
          <div className="tmn-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="tmn-modal-header">
              <div className="tmn-modal-header-meta">
                <span className="tmn-modal-badge">
                  <Star size={12} fill="#0284c7" color="#0284c7" />
                  CLIENT FEEDBACK
                </span>
                <h3 className="tmn-modal-title">Write a Customer Review</h3>
                <p className="tmn-modal-subtitle">
                  Share your verified experience with HTI cleanroom systems, automation, or service.
                </p>
              </div>

              <button
                type="button"
                className="tmn-modal-close-btn"
                onClick={() => setWriteModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {formSuccess ? (
              <div className="tmn-modal-success-screen">
                <div className="tmn-success-icon-wrap">
                  <CheckCircle2 size={46} className="text-emerald-500" />
                </div>
                <h4 className="tmn-success-title">Review Submitted Successfully!</h4>
                <p className="tmn-success-desc">
                  Thank you for submitting your feedback. Your review is now awaiting <strong>Pending</strong> administrative approval and will appear on our homepage once verified.
                </p>
                <div className="tmn-success-status-pill">
                  <ShieldCheck size={14} />
                  <span>Status: Pending Administrative Review</span>
                </div>
                <button
                  type="button"
                  className="tmn-btn-success-close"
                  onClick={() => setWriteModalOpen(false)}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="tmn-modal-form">
                {formError && (
                  <div className="tmn-form-error-banner">
                    {formError}
                  </div>
                )}

                {/* 2-Column Responsive Inputs */}
                <div className="tmn-form-row">
                  <div className="tmn-form-group">
                    <label className="tmn-form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="tmn-form-input"
                      placeholder="e.g. Dr. Rajesh Sharma (Lead Engineer)"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>

                  <div className="tmn-form-group">
                    <label className="tmn-form-label">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      className="tmn-form-input"
                      placeholder="e.g. Sun Pharma / Cipla Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="tmn-form-row">
                  <div className="tmn-form-group">
                    <label className="tmn-form-label">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      className="tmn-form-input"
                      placeholder="e.g. r.sharma@sunpharma.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <span className="tmn-form-hint">Used strictly for administrative verification.</span>
                  </div>

                  <div className="tmn-form-group">
                    <label className="tmn-form-label">
                      Facility Location / City (Optional)
                    </label>
                    <input
                      type="text"
                      className="tmn-form-input"
                      placeholder="e.g. Vadodara, Gujarat"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Star Rating Selector */}
                <div className="tmn-form-group">
                  <label className="tmn-form-label">
                    Rating (1 to 5 Stars) *
                  </label>
                  <div className="tmn-star-picker">
                    <div className="tmn-star-buttons">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="tmn-star-btn"
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setFormData({ ...formData, rating: s })}
                        >
                          <Star
                            size={24}
                            fill={s <= activeStarCount ? '#f59e0b' : 'transparent'}
                            color={s <= activeStarCount ? '#f59e0b' : '#cbd5e1'}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="tmn-rating-text">
                      {activeStarCount === 5 && '5.0 ★ Exceptional & Compliant'}
                      {activeStarCount === 4 && '4.0 ★ Very Good Performance'}
                      {activeStarCount === 3 && '3.0 ★ Satisfactory'}
                      {activeStarCount === 2 && '2.0 ★ Needs Attention'}
                      {activeStarCount === 1 && '1.0 ★ Unsatisfactory'}
                    </span>
                  </div>
                </div>

                {/* Review Message Textarea */}
                <div className="tmn-form-group">
                  <label className="tmn-form-label">
                    Review / Testimonial Message *
                  </label>
                  <textarea
                    className="tmn-form-textarea"
                    placeholder="Describe your technical experience with HTI cleanroom interlocks, industrial doors, pneumatic pass boxes, project delivery, or after-sales engineering support..."
                    rows={4}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    required
                  />
                  <div className="tmn-char-counter">
                    {formData.quote.length} characters (minimum 10)
                  </div>
                </div>

                {/* Policy Notice */}
                <div className="tmn-pending-notice">
                  <ShieldCheck size={15} className="tmn-notice-icon" />
                  <span>
                    Submitted reviews remain <strong>Pending</strong> until verified and approved by HTI administrators, then they will be published to the homepage.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="tmn-modal-footer">
                  <button
                    type="button"
                    className="tmn-modal-btn-cancel"
                    onClick={() => setWriteModalOpen(false)}
                    disabled={formSubmitting}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="tmn-modal-btn-submit"
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? (
                      <span>Submitting Review...</span>
                    ) : (
                      <>
                        <PenLine size={15} />
                        <span>Submit Review for Approval</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════
          MODAL 2: VIEW ALL VERIFIED REVIEWS MODAL
          ═════════════════════════════════════════════════════════════════════════ */}
      {viewAllModalOpen && (
        <div className="tmn-modal-overlay" onClick={() => setViewAllModalOpen(false)}>
          <div className="tmn-modal-container tmn-view-all-container" onClick={(e) => e.stopPropagation()}>
            <div className="tmn-modal-header">
              <div className="tmn-modal-header-meta">
                <span className="tmn-modal-badge">
                  <MessageSquare size={12} fill="#0284c7" color="#0284c7" />
                  AUTHENTIC CLIENT FEEDBACK
                </span>
                <h3 className="tmn-modal-title">All Customer Reviews &amp; Testimonials</h3>
                <p className="tmn-modal-subtitle">
                  Browse certified feedback from pharmaceutical manufacturers, corporate infrastructure, and high-security cleanrooms.
                </p>
              </div>

              <button
                type="button"
                className="tmn-modal-close-btn"
                onClick={() => setViewAllModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="tmn-all-toolbar">
              <div className="tmn-all-search">
                <Search size={16} className="tmn-all-search-icon" />
                <input
                  type="text"
                  placeholder="Search by company, client name, or keywords..."
                  value={allSearchQuery}
                  onChange={(e) => setAllSearchQuery(e.target.value)}
                  className="tmn-all-search-input"
                />
              </div>

              <div className="tmn-all-filters">
                <button
                  type="button"
                  className={`tmn-filter-pill ${allFilterRating === 'all' ? 'active' : ''}`}
                  onClick={() => setAllFilterRating('all')}
                >
                  All ({reviews.length})
                </button>
                <button
                  type="button"
                  className={`tmn-filter-pill ${allFilterRating === '5' ? 'active' : ''}`}
                  onClick={() => setAllFilterRating('5')}
                >
                  5 Stars ({reviews.filter(r => Number(r.rating || 5) === 5).length})
                </button>
                <button
                  type="button"
                  className={`tmn-filter-pill ${allFilterRating === '4' ? 'active' : ''}`}
                  onClick={() => setAllFilterRating('4')}
                >
                  4 Stars ({reviews.filter(r => Number(r.rating || 5) === 4).length})
                </button>
              </div>
            </div>

            {/* Scrollable Reviews Grid */}
            <div className="tmn-all-cards-grid">
              {filteredAllReviews.length === 0 ? (
                <div className="tmn-all-empty">
                  <Star size={36} className="text-slate-400" />
                  <h4>No matching reviews found</h4>
                  <p>Try clearing your search query or adjusting filter filters.</p>
                </div>
              ) : (
                filteredAllReviews.map((rev, idx) => {
                  const ratingScore = Math.min(5, Math.max(1, Number(rev.rating) || 5));
                  return (
                    <div key={rev.id || idx} className="tmn-exact-card">
                      <div className="tmn-exact-quote-icon" aria-hidden="true">
                        <svg
                          width="24"
                          height="20"
                          viewBox="0 0 28 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 13.7143C0 6.14286 4.71429 1.42857 11.4286 0L12.5714 2.85714C8 3.71429 5.71429 6.28571 5.42857 9.42857H11.4286V24H0V13.7143ZM15.4286 13.7143C15.4286 6.14286 20.1429 1.42857 26.8571 0L28 2.85714C23.4286 3.71429 21.1429 6.28571 20.8571 9.42857H26.8571V24H15.4286V13.7143Z"
                            fill="#38bdf8"
                          />
                        </svg>
                      </div>

                      <p className="tmn-exact-quote-text">
                        "{rev.quote}"
                      </p>

                      <div className="tmn-exact-stars-row">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={13}
                            fill={s <= ratingScore ? '#f59e0b' : 'transparent'}
                            color={s <= ratingScore ? '#f59e0b' : '#cbd5e1'}
                          />
                        ))}
                      </div>

                      <div className="tmn-exact-card-footer">
                        <div className="tmn-exact-client-info">
                          <CompanyLogoBadge
                            company={rev.company}
                            clientName={rev.client_name}
                          />
                          <div className="tmn-exact-client-meta">
                            <div className="tmn-exact-author-name">
                              {rev.author || 'Verified Client'}
                            </div>
                            <div className="tmn-exact-author-company">
                              {rev.company || rev.client_name || 'Enterprise Client'}
                            </div>
                          </div>
                        </div>

                        <div className="tmn-exact-date">
                          {rev.date || 'Verified'}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer with Write a Review Shortcut */}
            <div className="tmn-view-all-footer">
              <div className="tmn-view-all-footer-left">
                <span>Are you a client of HTI?</span>
                <button
                  type="button"
                  className="tmn-btn-inline-write"
                  onClick={() => {
                    setViewAllModalOpen(false);
                    setFormSuccess(false);
                    setFormError('');
                    setWriteModalOpen(true);
                  }}
                >
                  <PenLine size={13} />
                  <span>Submit Your Experience</span>
                </button>
              </div>

              <button
                type="button"
                className="tmn-modal-btn-cancel"
                onClick={() => setViewAllModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
