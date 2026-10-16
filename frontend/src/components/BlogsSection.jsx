import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, User, ArrowRight, X, Tag } from 'lucide-react';

export default function BlogsSection({ blogs = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeBlog, setActiveBlog] = useState(null);

  // Extract unique categories
  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="blogs" className="section-padding blogs-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-pill inline-flex items-center gap-2">
            <BookOpen size={14} className="text-cyan" />
            <span>KNOWLEDGE BASE & INDUSTRY INSIGHTS</span>
          </div>
          <h2 className="section-title">
            Engineering Insights & <span className="text-red">Case Studies</span>
          </h2>
          <p className="section-subtitle">
            Explore industry guidelines, cleanroom interlock standards, and enterprise security automation insights written by HTI engineers.
          </p>
        </div>

        {/* Category Filter Tabs */}
        {categories.length > 1 && (
          <div className="blogs-category-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="empty-blogs-box">
            <BookOpen size={40} className="text-muted" />
            <h3>No articles found</h3>
            <p>Articles published from the Admin Panel will immediately appear here.</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {filteredBlogs.map(blog => (
              <article key={blog.id} className="blog-card" onClick={() => setActiveBlog(blog)}>
                <div className="blog-card-meta-top">
                  <span className="blog-category-badge">{blog.category}</span>
                  <span className="blog-read-time">
                    <Clock size={13} />
                    <span>{blog.read_time || '5 min read'}</span>
                  </span>
                </div>

                <h3 className="blog-card-title">{blog.title}</h3>

                <p className="blog-card-excerpt">{blog.excerpt}</p>

                <div className="blog-card-footer">
                  <div className="blog-author-info">
                    <div className="author-avatar">
                      <User size={14} />
                    </div>
                    <div>
                      <div className="author-name">{blog.author || 'HTI Team'}</div>
                      <div className="author-date">
                        <Calendar size={11} className="inline mr-1" />
                        {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Technical Article'}
                      </div>
                    </div>
                  </div>

                  <button className="read-more-btn" aria-label={`Read ${blog.title}`}>
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Blog Article Reader Modal */}
      {activeBlog && (
        <div className="modal-overlay" onClick={() => setActiveBlog(null)}>
          <div className="blog-reader-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="reader-modal-header">
              <div className="reader-meta">
                <span className="blog-category-badge">{activeBlog.category}</span>
                <span className="reader-read-time">
                  <Clock size={13} />
                  <span>{activeBlog.read_time || '5 min read'}</span>
                </span>
                <span className="reader-date">
                  <Calendar size={13} />
                  <span>{activeBlog.created_at ? new Date(activeBlog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'HTI Publication'}</span>
                </span>
              </div>
              <button className="btn-icon" onClick={() => setActiveBlog(null)} aria-label="Close article">
                <X size={20} />
              </button>
            </div>

            <div className="reader-content-body">
              <h1 className="reader-article-title">{activeBlog.title}</h1>
              <div className="reader-author-bar">
                <div className="author-avatar lg">
                  <User size={16} />
                </div>
                <div>
                  <div className="reader-author-name">{activeBlog.author || 'HTI Engineering Team'}</div>
                  <div className="reader-author-org">HTI Automation & Security Systems Pvt. Ltd.</div>
                </div>
              </div>

              <div className="reader-excerpt-highlight">
                <p>{activeBlog.excerpt}</p>
              </div>

              <div className="reader-markdown-content">
                {activeBlog.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={idx} className="reader-h3">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={idx} className="reader-h2">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(Boolean);
                    return (
                      <ul key={idx} className="reader-ul">
                        {items.map((item, iIdx) => (
                          <li key={iIdx}>{item.replace(/^[-\*]\s*/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} className="reader-p">{paragraph}</p>;
                })}
              </div>
            </div>

            <div className="reader-modal-footer">
              <div className="reader-footer-note">
                Need customized automation or cleanroom solutions for your facility?
              </div>
              <button
                className="btn btn-red"
                onClick={() => {
                  setActiveBlog(null);
                  const contactEl = document.getElementById('contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Inquire With Engineering Team
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
