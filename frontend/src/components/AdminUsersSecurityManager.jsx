import React, { useState, useMemo } from 'react';
import {
  Shield,
  ShieldCheck,
  Users,
  FileText,
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  Edit3,
  UserPlus,
  KeyRound,
  LogOut,
  X,
  AlertTriangle,
  Crown,
  Eye,
  RefreshCw,
  Save,
  Check
} from 'lucide-react';
import './AdminUsersSecurity.css';

/**
 * Format relative time (e.g. "2 minutes ago", "1 hour ago", "Yesterday")
 */
function getRelativeTime(timestamp) {
  if (!timestamp) return '';
  try {
    const cleanDate = timestamp.replace(' ', 'T');
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) return timestamp;

    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch (e) {
    return timestamp;
  }
}

/**
 * Format date for timeline display (e.g., "Oct 17, 2026 10:24 AM")
 */
function formatTimelineDate(timestamp) {
  if (!timestamp) return '';
  try {
    const cleanDate = timestamp.replace(' ', 'T');
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) return timestamp;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return timestamp;
  }
}

/**
 * Map an audit action to visual styling (marker class, icon, readable title, badge)
 */
function getAuditVisualInfo(action = '', module = '') {
  const act = String(action).toUpperCase();
  const mod = String(module).toLowerCase();

  if (act.includes('LOGIN') && !act.includes('FAILED')) {
    return {
      markerClass: 'marker-login',
      badgeClass: 'badge-login',
      badgeLabel: 'Login',
      title: 'User login',
      icon: <Lock size={12} />
    };
  }

  if (act.includes('LOGOUT')) {
    return {
      markerClass: 'marker-logout',
      badgeClass: 'badge-logout',
      badgeLabel: 'Logout',
      title: 'User logout',
      icon: <LogOut size={12} />
    };
  }

  if (act.includes('CREATE') || act.includes('ADD')) {
    return {
      markerClass: 'marker-create',
      badgeClass: 'badge-create',
      badgeLabel: 'Create',
      title: act.includes('USER') ? 'New account created' : 'New record created',
      icon: <UserPlus size={12} />
    };
  }

  if (act.includes('ROLE') || act.includes('ASSIGN')) {
    return {
      markerClass: 'marker-role',
      badgeClass: 'badge-role',
      badgeLabel: 'Role Update',
      title: 'Role changed',
      icon: <KeyRound size={12} />
    };
  }

  if (act.includes('FAILED') || act.includes('DELETE')) {
    return {
      markerClass: 'marker-logout',
      badgeClass: 'badge-logout',
      badgeLabel: act.includes('FAILED') ? 'Security' : 'Delete',
      title: act.includes('FAILED') ? 'Failed login attempt' : 'Record deleted',
      icon: <AlertTriangle size={12} />
    };
  }

  // Generic Update
  return {
    markerClass: 'marker-update',
    badgeClass: 'badge-update',
    badgeLabel: 'Update',
    title: act.includes('USER') ? 'Account updated' : 'Content updated',
    icon: <Edit3 size={12} />
  };
}

/**
 * Avatar class helper for administrator accounts
 */
function getUserAvatarInfo(user) {
  const role = (user.role || '').toLowerCase();
  const username = (user.username || '').toLowerCase();

  let initials = 'US';
  if (user.full_name) {
    const parts = user.full_name.trim().split(/\s+/);
    if (parts.length === 1) initials = parts[0].slice(0, 2).toUpperCase();
    else initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (user.username) {
    initials = user.username.slice(0, 2).toUpperCase();
  }

  if (role === 'administrator' || username === 'admin') {
    return { initials, avatarClass: 'avatar-admin' };
  }
  return { initials, avatarClass: 'avatar-admin' };
}

export default function AdminUsersSecurityManager({
  adminUsers = [],
  auditLogs = [],
  currentUser = 'Admin',
  onRefresh,
  showFeedback = () => {}
}) {
  // Tab: 'users' (Administrative Accounts) vs 'audit_logs' (Immutable Audit Log)
  const [subTab, setSubTab] = useState('users');

  // Filters & Search
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [auditSearch, setAuditSearch] = useState('');
  const [auditModuleFilter, setAuditModuleFilter] = useState('All');

  // Table selection & Pagination
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());
  const [userPage, setUserPage] = useState(1);
  const [userRowsPerPage, setUserRowsPerPage] = useState(10);

  const [auditPage, setAuditPage] = useState(1);
  const [auditRowsPerPage, setAuditRowsPerPage] = useState(15);

  // Modals
  const [editingUser, setEditingUser] = useState(null); // 'new' or user object
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
    role: 'Administrator',
    is_active: true
  });
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Dynamic Counts for the 4 Summary Cards
  const summaryCounts = useMemo(() => {
    const totalUsers = adminUsers.length;
    const activeUsers = adminUsers.filter(u => Boolean(u.is_active)).length;
    const adminCount = adminUsers.filter(u => (u.role || '').toLowerCase() === 'administrator').length;
    const totalAudit = auditLogs.length;

    return { totalUsers, activeUsers, adminCount, totalAudit };
  }, [adminUsers, auditLogs]);

  // 2. Filtered Users
  const filteredUsers = useMemo(() => {
    return adminUsers.filter(u => {
      const s = userSearch.toLowerCase().trim();
      const matchesSearch =
        s === '' ||
        (u.username && u.username.toLowerCase().includes(s)) ||
        (u.full_name && u.full_name.toLowerCase().includes(s)) ||
        (u.email && u.email.toLowerCase().includes(s)) ||
        (u.role && u.role.toLowerCase().includes(s));

      const matchesRole = roleFilter === 'All' || (u.role || '').toLowerCase() === roleFilter.toLowerCase();
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'active' && Boolean(u.is_active)) ||
        (statusFilter === 'disabled' && !u.is_active);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [adminUsers, userSearch, roleFilter, statusFilter]);

  // 3. User Pagination
  const totalUsersCount = filteredUsers.length;
  const totalUserPages = Math.max(1, Math.ceil(totalUsersCount / userRowsPerPage));
  const validUserPage = Math.min(userPage, totalUserPages);

  const paginatedUsers = useMemo(() => {
    const start = (validUserPage - 1) * userRowsPerPage;
    return filteredUsers.slice(start, start + userRowsPerPage);
  }, [filteredUsers, validUserPage, userRowsPerPage]);

  const startUserNum = totalUsersCount === 0 ? 0 : (validUserPage - 1) * userRowsPerPage + 1;
  const endUserNum = Math.min(validUserPage * userRowsPerPage, totalUsersCount);

  // 4. Filtered Audit Logs
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const s = auditSearch.toLowerCase().trim();
      const matchesSearch =
        s === '' ||
        (log.username && log.username.toLowerCase().includes(s)) ||
        (log.module && log.module.toLowerCase().includes(s)) ||
        (log.action && log.action.toLowerCase().includes(s)) ||
        (log.details && log.details.toLowerCase().includes(s));

      const matchesModule =
        auditModuleFilter === 'All' ||
        (log.module || '').toLowerCase().includes(auditModuleFilter.toLowerCase());

      return matchesSearch && matchesModule;
    });
  }, [auditLogs, auditSearch, auditModuleFilter]);

  // 5. Audit Pagination
  const totalAuditCount = filteredAuditLogs.length;
  const totalAuditPages = Math.max(1, Math.ceil(totalAuditCount / auditRowsPerPage));
  const validAuditPage = Math.min(auditPage, totalAuditPages);

  const paginatedAuditLogs = useMemo(() => {
    const start = (validAuditPage - 1) * auditRowsPerPage;
    return filteredAuditLogs.slice(start, start + auditRowsPerPage);
  }, [filteredAuditLogs, validAuditPage, auditRowsPerPage]);

  // 6. Recent Audit Activity (Top 5 for the right-hand timeline)
  const recentTimelineEvents = useMemo(() => {
    return auditLogs.slice(0, 5);
  }, [auditLogs]);

  // Handlers for User CRUD
  const handleOpenAdd = () => {
    setUserForm({
      username: '',
      password: '',
      full_name: '',
      email: '',
      role: 'Administrator',
      is_active: true
    });
    setEditingUser('new');
  };

  const handleOpenEdit = u => {
    setUserForm({
      username: u.username,
      password: '',
      full_name: u.full_name || '',
      email: u.email || '',
      role: 'Administrator',
      is_active: Boolean(u.is_active)
    });
    setEditingUser(u);
  };

  const handleSaveUserSubmit = async e => {
    e.preventDefault();
    if (!userForm.username || !userForm.full_name || !userForm.email) {
      showFeedback('error', 'Please fill in Username, Full Name, and Email.');
      return;
    }
    if (editingUser === 'new' && (!userForm.password || userForm.password.length < 3)) {
      showFeedback('error', 'Password must be at least 3 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const url =
        editingUser === 'new'
          ? `/api/admin/users?admin_user=${encodeURIComponent(currentUser)}`
          : `/api/admin/users/${editingUser.id}?admin_user=${encodeURIComponent(currentUser)}`;
      const method = editingUser === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      });

      if (res.ok) {
        showFeedback(
          'success',
          editingUser === 'new'
            ? `User account '${userForm.username}' created successfully!`
            : `User account '${userForm.username}' updated!`
        );
        setEditingUser(null);
        if (onRefresh) await onRefresh();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save account.');
      }
    } catch (err) {
      showFeedback('error', 'Network error saving user account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUserSubmit = async () => {
    if (!deleteConfirmUser) return;
    if (deleteConfirmUser.username === 'admin') {
      showFeedback('error', 'Cannot delete the primary root Administrator account.');
      setDeleteConfirmUser(null);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `/api/admin/users/${deleteConfirmUser.id}?admin_user=${encodeURIComponent(currentUser)}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        showFeedback('success', `User account '${deleteConfirmUser.username}' deleted.`);
        setDeleteConfirmUser(null);
        if (onRefresh) await onRefresh();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to delete account.');
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting user account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="adm-sec-page">
      {/* =====================================================================
          TWO-COLUMN MAIN LAYOUT (~70% LEFT / ~30% RIGHT)
          ===================================================================== */}
      <div className="adm-sec-grid">
        {/* ===================================================================
            LEFT COLUMN: Security Overview Banner, 4 Summary Cards, Table
            =================================================================== */}
        <div className="adm-sec-col-main">
          {/* 1. Compact Security Header */}
          <div className="adm-sec-header">
            <div className="adm-sec-header-left">
              <div className="adm-sec-header-icon-box">
                <ShieldCheck size={24} />
              </div>
              <div className="adm-sec-header-text">
                <h3 className="adm-sec-header-title">Users &amp; Security</h3>
                <p className="adm-sec-header-sub">
                Manage administrator accounts and system activity.
                </p>
              </div>
            </div>

            <div className="adm-sec-header-right">
              <div className="adm-sec-status-chip">
                <span className="adm-sec-live-dot" />
                <span>RBAC OPERATIONAL</span>
              </div>
              <div className="adm-sec-crypto-chip">
                <Lock size={13} />
                <span>AES-256</span>
              </div>
            </div>
          </div>

          {/* 2. Four Summary Cards */}
          <div className="adm-sec-summary-row">
            {/* Card 1: Total Accounts */}
            <div
              className={`adm-sec-summary-card card-users ${subTab === 'users' && roleFilter === 'All' && statusFilter === 'All' ? 'selected' : ''}`}
              onClick={() => {
                setSubTab('users');
                setRoleFilter('All');
                setStatusFilter('All');
                setUserPage(1);
              }}
              title="View all administrative accounts"
            >
              <div className="adm-sec-summary-icon-box">
                <Users size={22} />
              </div>
              <div className="adm-sec-summary-body">
                <span className="adm-sec-summary-title">Total Accounts</span>
                <span className="adm-sec-summary-number">{summaryCounts.totalUsers}</span>
                <span className="adm-sec-summary-sub">System Users</span>
              </div>
            </div>

            {/* Card 2: Active Accounts */}
            <div
              className={`adm-sec-summary-card card-active ${subTab === 'users' && statusFilter === 'active' ? 'selected' : ''}`}
              onClick={() => {
                setSubTab('users');
                setStatusFilter('active');
                setRoleFilter('All');
                setUserPage(1);
              }}
              title="Filter by active accounts"
            >
              <div className="adm-sec-summary-icon-box">
                <ShieldCheck size={22} />
              </div>
              <div className="adm-sec-summary-body">
                <span className="adm-sec-summary-title">Active Accounts</span>
                <span className="adm-sec-summary-number">{summaryCounts.activeUsers}</span>
                <span className="adm-sec-summary-sub">Currently Active</span>
              </div>
            </div>

            {/* Card 3: Administrators */}
            <div
              className={`adm-sec-summary-card card-admins ${subTab === 'users' && roleFilter === 'Administrator' ? 'selected' : ''}`}
              onClick={() => {
                setSubTab('users');
                setRoleFilter('Administrator');
                setUserPage(1);
              }}
              title="Filter by Administrator accounts"
            >
              <div className="adm-sec-summary-icon-box">
                <Crown size={22} />
              </div>
              <div className="adm-sec-summary-body">
                <span className="adm-sec-summary-title">Administrators</span>
                <span className="adm-sec-summary-number">{summaryCounts.adminCount}</span>
                <span className="adm-sec-summary-sub">Full Access</span>
              </div>
            </div>

            {/* Card 4: Audit Events */}
            <div
              className={`adm-sec-summary-card card-audit ${subTab === 'audit_logs' ? 'selected' : ''}`}
              onClick={() => {
                setSubTab('audit_logs');
                setAuditPage(1);
              }}
              title="View immutable audit log"
            >
              <div className="adm-sec-summary-icon-box">
                <FileText size={22} />
              </div>
              <div className="adm-sec-summary-body">
                <span className="adm-sec-summary-title">Audit Events</span>
                <span className="adm-sec-summary-number">{summaryCounts.totalAudit}</span>
                <span className="adm-sec-summary-sub">Total Records</span>
              </div>
            </div>
          </div>

          {/* 3. Account Management Tabs & Create Account Button */}
          <div className="adm-sec-tabs-bar">
            <div className="adm-sec-tabs-group">
              <button
                type="button"
                className={`adm-sec-tab-btn ${subTab === 'users' ? 'active' : 'inactive'}`}
                onClick={() => setSubTab('users')}
              >
                <Users size={16} />
                <span>Administrative Accounts ({summaryCounts.totalUsers})</span>
              </button>

              <button
                type="button"
                className={`adm-sec-tab-btn ${subTab === 'audit_logs' ? 'active' : 'inactive'}`}
                onClick={() => setSubTab('audit_logs')}
              >
                <ShieldCheck size={16} />
                <span>Immutable Audit Log ({summaryCounts.totalAudit})</span>
              </button>
            </div>

            {subTab === 'users' && (
              <button
                type="button"
                className="adm-sec-create-btn"
                onClick={handleOpenAdd}
                title="Create new administrative user account"
                aria-label="Create new administrative user account"
              >
                <Plus size={16} />
                <span>Create Account</span>
              </button>
            )}
          </div>

          {/* 4. Subview: Administrative Accounts Table */}
          {subTab === 'users' && (
            <>
              {/* Search and Filters Toolbar */}
              <div className="adm-sec-toolbar">
                <div className="adm-sec-search-wrap">
                  <Search size={16} className="adm-sec-search-icon" />
                  <input
                    type="text"
                    className="adm-sec-search-input"
                    placeholder="Search by username, full name, or email..."
                    value={userSearch}
                    onChange={e => {
                      setUserSearch(e.target.value);
                      setUserPage(1);
                    }}
                    aria-label="Search users"
                  />
                </div>

                <div className="adm-sec-filters-wrap">
                  {/* The console has one role: Administrator. */}
                  <div className="adm-sec-filter-pill">
                    <Filter size={14} className="filter-icon" />
                    <select
                      value={roleFilter}
                      onChange={e => {
                        setRoleFilter(e.target.value);
                        setUserPage(1);
                      }}
                      aria-label="Administrator role"
                    >
                      <option value="All">All Roles</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                    <ChevronDown size={13} className="chevron-icon" />
                  </div>

                  {/* Status Dropdown Filter */}
                  <div className="adm-sec-filter-pill">
                    <span style={{ color: '#10B981', marginRight: '6px', fontSize: '0.85rem' }}>●</span>
                    <select
                      value={statusFilter}
                      onChange={e => {
                        setStatusFilter(e.target.value);
                        setUserPage(1);
                      }}
                      aria-label="Filter by status"
                    >
                      <option value="All">All Status</option>
                      <option value="active">Active</option>
                      <option value="disabled">Disabled</option>
                    </select>
                    <ChevronDown size={13} className="chevron-icon" />
                  </div>

                  <button
                    type="button"
                    className="adm-sec-slider-btn"
                    onClick={() => {
                      setUserSearch('');
                      setRoleFilter('All');
                      setStatusFilter('All');
                      setUserPage(1);
                    }}
                    title="Reset user filters"
                    aria-label="Reset user filters"
                  >
                    <SlidersHorizontal size={15} />
                  </button>
                </div>
              </div>

              {/* Table Card */}
              <div className="adm-sec-table-card">
                <div className="adm-sec-table-responsive">
                  <table className="adm-sec-table">
                    <thead>
                      <tr>
                        <th className="col-cb">
                          <input
                            type="checkbox"
                            checked={totalUsersCount > 0 && selectedUserIds.size === totalUsersCount}
                            onChange={e => {
                              if (e.target.checked) setSelectedUserIds(new Set(filteredUsers.map(u => u.id)));
                              else setSelectedUserIds(new Set());
                            }}
                          />
                        </th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Assigned Role</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--hti-muted)' }}>
                            No administrative accounts match your search filters.
                          </td>
                        </tr>
                      ) : (
                        paginatedUsers.map(u => {
                          const { initials, avatarClass } = getUserAvatarInfo(u);
                          const roleKey = (u.role || '').toLowerCase();
                          const isRootAdmin = u.username === 'admin';

                          return (
                            <tr key={u.id}>
                              <td className="col-cb">
                                <input
                                  type="checkbox"
                                  checked={selectedUserIds.has(u.id)}
                                  onChange={() => {
                                    setSelectedUserIds(prev => {
                                      const next = new Set(prev);
                                      if (next.has(u.id)) next.delete(u.id);
                                      else next.add(u.id);
                                      return next;
                                    });
                                  }}
                                />
                              </td>

                              {/* Username with Circular Avatar */}
                              <td>
                                <div className="adm-sec-user-cell">
                                  <div className={`adm-sec-avatar ${avatarClass}`}>{initials}</div>
                                  <span className="adm-sec-username-text">{u.username}</span>
                                </div>
                              </td>

                              {/* Full Name */}
                              <td>
                                <span className="adm-sec-fullname-text">{u.full_name}</span>
                              </td>

                              {/* Email Address */}
                              <td>
                                <span className="adm-sec-email-text">{u.email}</span>
                              </td>

                              {/* Assigned Role */}
                              <td>
                                <span className={`adm-sec-role-badge role-${roleKey}`}>
                                  {u.role}
                                </span>
                              </td>

                              {/* Status */}
                              <td>
                                <span className={`adm-sec-status-cell ${u.is_active ? 'active' : 'disabled'}`}>
                                  <span>{u.is_active ? '●' : '○'}</span>
                                  <span>{u.is_active ? 'Active' : 'Disabled'}</span>
                                </span>
                              </td>

                              {/* Actions */}
                              <td>
                                <div className="adm-sec-actions-wrap">
                                  <button
                                    type="button"
                                    className="adm-sec-action-btn btn-edit"
                                    onClick={() => handleOpenEdit(u)}
                                    title="Edit Account Details & Permissions"
                                  >
                                    <Pencil size={15} />
                                  </button>

                                  <button
                                    type="button"
                                    className="adm-sec-action-btn btn-delete"
                                    disabled={isRootAdmin}
                                    onClick={() => {
                                      if (!isRootAdmin) setDeleteConfirmUser(u);
                                    }}
                                    title={isRootAdmin ? 'Primary root Administrator cannot be deleted' : 'Delete Account'}
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

                {/* Table Footer */}
                <div className="adm-sec-table-footer">
                  <div className="adm-sec-footer-summary">
                    Showing {startUserNum} to {endUserNum} of {totalUsersCount} users
                  </div>

                  <div className="adm-sec-footer-controls">
                    <div className="adm-sec-rows-dropdown">
                      <select
                        value={userRowsPerPage}
                        onChange={e => {
                          setUserRowsPerPage(Number(e.target.value));
                          setUserPage(1);
                        }}
                      >
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                      </select>
                      <ChevronDown size={13} />
                    </div>

                    <div className="adm-sec-pagination-btns">
                      <button
                        type="button"
                        className="adm-sec-page-btn"
                        disabled={validUserPage <= 1}
                        onClick={() => setUserPage(p => Math.max(1, p - 1))}
                      >
                        <ChevronLeft size={15} />
                      </button>

                      {Array.from({ length: totalUserPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          type="button"
                          className={`adm-sec-page-btn ${p === validUserPage ? 'active' : ''}`}
                          onClick={() => setUserPage(p)}
                        >
                          {p}
                        </button>
                      ))}

                      <button
                        type="button"
                        className="adm-sec-page-btn"
                        disabled={validUserPage >= totalUserPages}
                        onClick={() => setUserPage(p => Math.min(totalUserPages, p + 1))}
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 5. Subview: Immutable Audit Log Full Table */}
          {subTab === 'audit_logs' && (
            <>
              {/* Audit Toolbar */}
              <div className="adm-sec-toolbar">
                <div className="adm-sec-search-wrap">
                  <Search size={16} className="adm-sec-search-icon" />
                  <input
                    type="text"
                    className="adm-sec-search-input"
                    placeholder="Search audit logs by operator, module or action..."
                    value={auditSearch}
                    onChange={e => {
                      setAuditSearch(e.target.value);
                      setAuditPage(1);
                    }}
                  />
                </div>

                <div className="adm-sec-filters-wrap">
                  <div className="adm-sec-filter-pill">
                    <Filter size={14} className="filter-icon" />
                    <select
                      value={auditModuleFilter}
                      onChange={e => {
                        setAuditModuleFilter(e.target.value);
                        setAuditPage(1);
                      }}
                    >
                      <option value="All">All Modules</option>
                      <option value="Security">Security</option>
                      <option value="Website Content">Website Content</option>
                      <option value="Products">Products</option>
                      <option value="Inquiries">Inquiries</option>
                      <option value="System Health">System Health</option>
                    </select>
                    <ChevronDown size={13} className="chevron-icon" />
                  </div>

                  <button
                    type="button"
                    className="adm-sec-slider-btn"
                    onClick={() => {
                      setAuditSearch('');
                      setAuditModuleFilter('All');
                    }}
                    title="Reset audit log filters"
                  >
                    <SlidersHorizontal size={15} />
                  </button>
                </div>
              </div>

              {/* Audit Table Card */}
              <div className="adm-sec-table-card">
                <div className="adm-sec-table-responsive">
                  <table className="adm-sec-table">
                    <thead>
                      <tr>
                        <th style={{ width: '60px' }}>ID</th>
                        <th style={{ minWidth: '150px' }}>Timestamp</th>
                        <th style={{ minWidth: '120px' }}>Operator</th>
                        <th style={{ minWidth: '130px' }}>Module</th>
                        <th style={{ minWidth: '150px' }}>Action</th>
                        <th style={{ minWidth: '240px' }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedAuditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--hti-muted)' }}>
                            No audit log records match your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        paginatedAuditLogs.map(log => {
                          const visual = getAuditVisualInfo(log.action, log.module);
                          return (
                            <tr key={log.id}>
                              <td style={{ color: 'var(--hti-muted)', fontWeight: 600 }}>#{log.id}</td>
                              <td style={{ fontSize: '0.80rem', color: 'var(--hti-navy)', whiteSpace: 'nowrap' }}>
                                {log.timestamp}
                              </td>
                              <td>
                                <strong style={{ color: 'var(--hti-blue)', fontSize: '0.86rem' }}>
                                  {log.username}
                                </strong>
                              </td>
                              <td>
                                <span
                                  style={{
                                    fontSize: '0.74rem',
                                    padding: '3px 9px',
                                    borderRadius: '6px',
                                    background: '#EFF6FF',
                                    color: '#0284C7',
                                    fontWeight: 600
                                  }}
                                >
                                  {log.module}
                                </span>
                              </td>
                              <td>
                                <span className={`adm-sec-timeline-badge ${visual.badgeClass}`}>
                                  {log.action}
                                </span>
                              </td>
                              <td style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                                {log.details}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Audit Footer */}
                <div className="adm-sec-table-footer">
                  <div className="adm-sec-footer-summary">
                    Showing {(validAuditPage - 1) * auditRowsPerPage + 1} to{' '}
                    {Math.min(validAuditPage * auditRowsPerPage, totalAuditCount)} of {totalAuditCount} audit events
                  </div>

                  <div className="adm-sec-footer-controls">
                    <div className="adm-sec-rows-dropdown">
                      <select
                        value={auditRowsPerPage}
                        onChange={e => {
                          setAuditRowsPerPage(Number(e.target.value));
                          setAuditPage(1);
                        }}
                      >
                        <option value={15}>15 per page</option>
                        <option value={30}>30 per page</option>
                        <option value={50}>50 per page</option>
                      </select>
                      <ChevronDown size={13} />
                    </div>

                    <div className="adm-sec-pagination-btns">
                      <button
                        type="button"
                        className="adm-sec-page-btn"
                        disabled={validAuditPage <= 1}
                        onClick={() => setAuditPage(p => Math.max(1, p - 1))}
                      >
                        <ChevronLeft size={15} />
                      </button>

                      {Array.from({ length: totalAuditPages }, (_, i) => i + 1).slice(0, 5).map(p => (
                        <button
                          key={p}
                          type="button"
                          className={`adm-sec-page-btn ${p === validAuditPage ? 'active' : ''}`}
                          onClick={() => setAuditPage(p)}
                        >
                          {p}
                        </button>
                      ))}

                      <button
                        type="button"
                        className="adm-sec-page-btn"
                        disabled={validAuditPage >= totalAuditPages}
                        onClick={() => setAuditPage(p => Math.min(totalAuditPages, p + 1))}
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ===================================================================
            RIGHT COLUMN: Recent Audit Activity Card & Security Guidelines
            =================================================================== */}
        <div className="adm-sec-col-side">
          {/* Card 1: Recent Audit Activity */}
          <div className="adm-sec-timeline-card">
            <div className="adm-sec-card-header">
              <div className="adm-sec-card-header-left">
                <div className="adm-sec-header-icon-box">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="adm-sec-card-title">Recent Audit Activity</h4>
                  <p className="adm-sec-card-sub">Latest system access and account changes</p>
                </div>
              </div>

              <button
                type="button"
                className="adm-sec-view-all-btn"
                onClick={() => setSubTab('audit_logs')}
                title="View full immutable audit ledger"
              >
                View All
              </button>
            </div>

            {/* Vertical Timeline */}
            <div className="adm-sec-timeline-wrap">
              {recentTimelineEvents.length === 0 ? (
                <p style={{ margin: 0, fontSize: '0.80rem', color: 'var(--hti-muted)' }}>
                  No recent audit activity recorded yet.
                </p>
              ) : (
                recentTimelineEvents.map(event => {
                  const visual = getAuditVisualInfo(event.action, event.module);

                  return (
                    <div key={event.id} className="adm-sec-timeline-item">
                      <div className={`adm-sec-timeline-marker ${visual.markerClass}`}>
                        {visual.icon}
                      </div>

                      <div className="adm-sec-timeline-content">
                        <span className="adm-sec-timeline-title">{visual.title}</span>
                        <span className="adm-sec-timeline-desc">
                          {event.details || `${event.username} performed ${event.action}`}
                        </span>
                        <span className="adm-sec-timeline-ago">
                          {getRelativeTime(event.timestamp)}
                        </span>
                      </div>

                      <div className="adm-sec-timeline-meta">
                        <span className="adm-sec-timeline-date">
                          {formatTimelineDate(event.timestamp)}
                        </span>
                        <span className={`adm-sec-timeline-badge ${visual.badgeClass}`}>
                          {visual.badgeLabel}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Card 2: Security Guidelines */}
          <div className="adm-sec-guidelines-card">
            <div className="adm-sec-guidelines-header">
              <div className="adm-sec-header-icon-box">
                <Shield size={18} />
              </div>
              <h4 className="adm-sec-card-title">Security Guidelines</h4>
            </div>

            <div className="adm-sec-guidelines-list">
              <div className="adm-sec-guideline-item">
                <CheckCircle2 size={14} className="adm-sec-guideline-icon" />
                <span>Use strong, unique passwords</span>
              </div>
              <div className="adm-sec-guideline-item">
                <CheckCircle2 size={14} className="adm-sec-guideline-icon" />
                <span>Grant minimum required permissions</span>
              </div>
              <div className="adm-sec-guideline-item">
                <CheckCircle2 size={14} className="adm-sec-guideline-icon" />
                <span>Regularly review access logs</span>
              </div>
              <div className="adm-sec-guideline-item">
                <CheckCircle2 size={14} className="adm-sec-guideline-icon" />
                <span>Keep administrator accounts secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL 1: CREATE / EDIT ACCOUNT MODAL
          ===================================================================== */}
      {editingUser && (
        <div className="adm-sec-modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="adm-sec-modal-card" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSaveUserSubmit}>
              <div className="adm-sec-modal-header">
                <div className="adm-sec-modal-header-left">
                  <div
                    className="adm-sec-header-icon-box"
                    style={{ background: '#EFF6FF', color: 'var(--hti-blue)' }}
                  >
                    {editingUser === 'new' ? <Plus size={18} /> : <Pencil size={18} />}
                  </div>
                  <div>
                    <h3 className="adm-sec-modal-title">
                      {editingUser === 'new' ? 'Create Administrative Account' : `Edit Account: ${editingUser.username}`}
                    </h3>
                    <p className="adm-sec-modal-subtitle">
                      Configure enterprise credentials, permissions, and security role.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="adm-sec-modal-close-btn"
                  onClick={() => setEditingUser(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="adm-sec-modal-body">
                <div className="adm-sec-form-group">
                  <label className="adm-sec-form-label">Username (System Identifier) *</label>
                  <input
                    type="text"
                    className="adm-sec-form-input"
                    required
                    disabled={editingUser !== 'new'}
                    value={userForm.username}
                    onChange={e => setUserForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="e.g. jsmith or opslead"
                  />
                </div>

                <div className="adm-sec-form-group">
                  <label className="adm-sec-form-label">Full Name *</label>
                  <input
                    type="text"
                    className="adm-sec-form-input"
                    required
                    value={userForm.full_name}
                    onChange={e => setUserForm(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="e.g. Dr. John Smith"
                  />
                </div>

                <div className="adm-sec-form-group">
                  <label className="adm-sec-form-label">Email Address *</label>
                  <input
                    type="email"
                    className="adm-sec-form-input"
                    required
                    value={userForm.email}
                    onChange={e => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. jsmith@htisystems.in"
                  />
                </div>

                <div className="adm-sec-form-group">
                  <label className="adm-sec-form-label">Role Clearance *</label>
                  <select
                    className="adm-sec-form-select"
                    value={userForm.role}
                    onChange={e => setUserForm(prev => ({ ...prev, role: e.target.value }))}
                  >
                    <option value="Administrator">Administrator (Complete System Access)</option>
                  </select>
                </div>

                <div className="adm-sec-form-group">
                  <label className="adm-sec-form-label">
                    {editingUser === 'new' ? 'Initial Password *' : 'New Password (leave blank to keep current)'}
                  </label>
                  <input
                    type="password"
                    className="adm-sec-form-input"
                    required={editingUser === 'new'}
                    value={userForm.password}
                    onChange={e => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                  />
                </div>

                <label className="adm-sec-toggle-row">
                  <input
                    type="checkbox"
                    checked={userForm.is_active}
                    onChange={e => setUserForm(prev => ({ ...prev, is_active: e.target.checked }))}
                  />
                  <div>
                    <strong style={{ fontSize: '0.84rem', color: 'var(--hti-navy)', display: 'block' }}>
                      Account Active & Authorized
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--hti-muted)' }}>
                      When checked, user can authenticate and access authorized administrative modules.
                    </span>
                  </div>
                </label>
              </div>

              <div className="adm-sec-modal-footer">
                <button
                  type="button"
                  className="adm-sec-btn-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-sec-btn-primary" disabled={isSubmitting}>
                  <Save size={16} />
                  <span>{isSubmitting ? 'Saving...' : editingUser === 'new' ? 'Create Account' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: DELETE CONFIRMATION MODAL
          ===================================================================== */}
      {deleteConfirmUser && (
        <div className="adm-sec-modal-overlay" onClick={() => setDeleteConfirmUser(null)}>
          <div className="adm-sec-modal-card" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
            <div className="adm-sec-modal-header" style={{ background: '#FFF1F2' }}>
              <div className="adm-sec-modal-header-left">
                <div
                  className="adm-sec-header-icon-box"
                  style={{ background: '#FFE4E6', color: 'var(--hti-red)' }}
                >
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="adm-sec-modal-title" style={{ color: 'var(--hti-red)' }}>
                    Delete User Account?
                  </h3>
                  <p className="adm-sec-modal-subtitle">Permanent action — account credentials will be purged</p>
                </div>
              </div>
              <button
                type="button"
                className="adm-sec-modal-close-btn"
                onClick={() => setDeleteConfirmUser(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="adm-sec-modal-body">
              <p style={{ margin: 0, fontSize: '0.90rem', color: 'var(--hti-navy)', lineHeight: 1.5 }}>
                Are you sure you want to permanently remove user account{' '}
                <strong>"{deleteConfirmUser.username}"</strong> ({deleteConfirmUser.full_name})?
              </p>
            </div>

            <div className="adm-sec-modal-footer">
              <button
                type="button"
                className="adm-sec-btn-secondary"
                onClick={() => setDeleteConfirmUser(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-sec-action-btn btn-delete"
                style={{
                  width: 'auto',
                  padding: '9px 18px',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  display: 'inline-flex',
                  gap: '8px'
                }}
                disabled={isSubmitting}
                onClick={handleDeleteUserSubmit}
              >
                <Trash2 size={16} />
                <span>{isSubmitting ? 'Deleting...' : 'Delete Account'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
