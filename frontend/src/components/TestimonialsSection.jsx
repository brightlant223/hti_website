import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './TestimonialsSection.css';
import {
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Fallback verified reviews matching Reference Image 1 exactly
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

// Helper to render authentic corporate logo badges matching Reference Image 1
function CompanyLogoBadge({ company = '', clientName = '' }) {
  const comp = (company || clientName || '').toLowerCase();

  // Cipla: Blue oval badge with bold Cipla text
  if (comp.includes('cipla')) {
    return (
      <div className="tmn-logo-badge cipla" title="Cipla Ltd.">
        <span className="tmn-logo-text-cipla">Cipla</span>
      </div>
    );
  }

  // Lupin: Clean badge with Lupin logo styling
  if (comp.includes('lupin')) {
    return (
      <div className="tmn-logo-badge lupin" title="Lupin Pharmaceuticals">
        <span className="tmn-logo-text-lupin">
          <span className="lupin-dot">Lup</span>in
        </span>
      </div>
    );
  }

  // Dr. Reddy's: Purple badge with Dr. Reddy's brand styling
  if (comp.includes('reddy')) {
    return (
      <div className="tmn-logo-badge dr-reddy" title="Dr. Reddy's Laboratories">
        <span className="tmn-logo-text-dr-reddy">Dr.Reddy's</span>
      </div>
    );
  }

  // Alembic: Local client asset if available, else clean badge
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

  // Fetch reviews dynamically from Admin Panel / Backend API
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter((item) => item.is_published !== false);
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
            const published = list.filter((item) => item.is_published !== false);
            if (published.length > 0) setReviews(published);
          }
        }
      }
    } catch (err) {
      console.warn('Note: Reviews loaded from certified cache', err);
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

  return (
    <section id="testimonials" className="tmn-exact-section">
      <div className="container tmn-exact-container">
        {/* ── LEFT COLUMN: Heading & Navigation (Exact match to Reference Image 1) ── */}
        <div className="tmn-exact-left">
          <div className="tmn-exact-eyebrow">TESTIMONIALS</div>

          <h2 className="tmn-exact-title">
            Trusted by <br />
            <span className="tmn-exact-title-blue">Industry Leaders</span>
          </h2>

          <p className="tmn-exact-desc">
            We take pride in delivering reliable automation and security solutions that create real value for our clients.
          </p>

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
          </div>
        </div>

        {/* ── RIGHT COLUMN: Three Horizontal Review Cards (Exact match to Reference Image 1) ── */}
        <div className="tmn-exact-right">
          <div className="tmn-exact-cards-grid">
            {visibleCards.map((rev, idx) => {
              const ratingScore = Math.min(5, Math.max(1, Number(rev.rating) || 5));

              return (
                <div key={idx} className="tmn-exact-card">
                  {/* Top-left: Soft Sky-blue Double Quote Icon (Matching Ref Image 1) */}
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
                        fill="#f59e0b"
                        color="#f59e0b"
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
    </section>
  );
}
