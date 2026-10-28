import React, { useState } from 'react';
import './AdminSidebar.css';
import {
  LayoutDashboard,
  FileText,
  Users,
  Globe,
  MessageSquare,
  ShieldCheck,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  currentUser = 'Admin',
  userRole = 'Administrator',
  handleLogout,
  blogs = [],
  clients = [],
  partners = [],
  inquiries = [],
  unansweredInquiries = [],
  adminUsers = [],
  careerApplications = []
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const totalClientsAndPartners = clients.length + partners.length;
  const newInquiriesCount = unansweredInquiries.length > 0
    ? unansweredInquiries.length
    : inquiries.filter(i => (i.status || '').toLowerCase() === 'new').length;
  const newCareerCount = careerApplications.filter(a => (a.status || '').toLowerCase() === 'new').length;

  const avatarInitials = (currentUser || 'AD').slice(0, 2).toUpperCase();

  const navigationSections = [
    {
      section: 'EXECUTIVE NEXUS',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: 'blogs',
          label: 'Blogs',
          icon: FileText,
          badge: null
        },
        {
          id: 'clients_partners',
          label: 'Clients & Partners',
          icon: Users,
          badge: null
        },
        {
          id: 'content',
          label: 'Website Content',
          icon: Globe,
          badge: {
            text: 'CMS',
            isAttention: false
          }
        }
      ]
    },
    {
      section: 'OPERATIONS & CONTROL',
      items: [
        {
          id: 'inquiries',
          label: 'Enquiries & Leads',
          icon: MessageSquare,
          badge: newInquiriesCount > 0
            ? { text: `${newInquiriesCount} New`, isAttention: true }
            : { text: inquiries.length || 4, isAttention: false }
        },
        {
          id: 'careers',
          label: 'Careers & Talent',
          icon: UserCheck,
          badge: newCareerCount > 0
            ? { text: `${newCareerCount} New`, isAttention: true }
            : { text: careerApplications.length || 0, isAttention: false }
        },
        {
          id: 'users',
          label: 'Users & Security',
          icon: ShieldCheck,
          badge: null
        }
      ]
    }
  ];

  return (
    <aside
      className={`concept2-glass-sidebar adm-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}
      aria-label="Admin Navigation"
    >
      {/* 1. BRAND / HEADER BLOCK */}
      <div className="adm-sidebar-header">
        <div className="adm-brand-block">
          <div className="adm-brand-logo-wrap">
            <img src="/hti-logo.png" alt="HTI Logo" className="adm-brand-logo" />
          </div>

          {!isCollapsed && (
            <div className="adm-brand-text">
              <span className="adm-brand-title">HTI CONTROL</span>

            </div>
          )}
        </div>

        <button
          type="button"
          className="adm-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      {/* 2. SCROLLABLE NAVIGATION LIST */}
      <nav className="adm-sidebar-nav" aria-label="Modules Navigation">
        {navigationSections.map((sec, secIdx) => (
          <div key={sec.section} className="adm-section-group">
            {!isCollapsed && secIdx > 0 && (
              <div className="adm-section-label">
                {sec.section}
              </div>
            )}

            <div className="adm-items-list">
              {sec.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                const badgeText = item.badge?.text;
                const isAttention = item.badge?.isAttention;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`adm-nav-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.label}
                    title={isCollapsed ? (badgeText ? `${item.label} (${badgeText})` : item.label) : undefined}
                  >
                    <IconComponent size={18} className="adm-nav-icon" aria-hidden="true" />

                    {!isCollapsed && (
                      <span className="adm-nav-label">
                        {item.label}
                      </span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className={`adm-badge ${isAttention ? 'badge-attention' : 'badge-neutral'}`}>
                        {badgeText}
                      </span>
                    )}

                    {isCollapsed && item.badge && (
                      <span
                        className={`adm-collapsed-dot ${isAttention ? 'dot-attention' : 'dot-neutral'}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. PROFILE ROW AT BOTTOM */}
      <div className="adm-sidebar-footer">
        <div className="adm-profile-row">
          <div className="adm-profile-avatar" title={`Admin: ${currentUser}`} aria-hidden="true">
            <span>{avatarInitials}</span>
          </div>

          {!isCollapsed && (
            <div className="adm-profile-info">
              <div className="adm-profile-name" title={currentUser}>
                {currentUser}
              </div>
              <div className="adm-profile-role" title={userRole}>
                {userRole}
              </div>
            </div>
          )}

          <button
            type="button"
            className="adm-logout-btn"
            onClick={handleLogout}
            title="Log out"
            aria-label="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
