import React, { useState, useEffect } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Database,
  LockKeyhole,
  AlertCircle,
  ArrowLeft,
  Server
} from 'lucide-react';
import './AdminLogin.css';
import { authenticateAdmin, clearAdminSession } from '../utils/adminAuth';

export default function AdminLogin({
  onLoginSuccess,
  onNavigate,
  theme = 'light'
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [capsLockActive, setCapsLockActive] = useState(false);

  const [existingSession, setExistingSession] = useState(null);

  useEffect(() => {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('hti_admin_token')
      : null;
    if (!token) return undefined;

    let active = true;
    fetch('/api/admin/session', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!active) return;
        if (response.ok) {
          const data = await response.json();
          setExistingSession({
            username: data.username || localStorage.getItem('hti_admin_user') || 'Administrator',
            role: data.role || 'Administrator',
          });
          return;
        }
        if (response.status === 401) {
          clearAdminSession();
          setExistingSession(null);
        }
      })
      .catch(() => {
        if (active) setExistingSession(null);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const uname = (username || '').trim().toLowerCase();
    const pwd = password || '';

    if (!uname) {
      setErrorMsg('Please enter your Administrator ID.');
      setLoading(false);
      return;
    }
    if (!pwd) {
      setErrorMsg('Please enter your password.');
      setLoading(false);
      return;
    }

    try {
      const data = await authenticateAdmin(uname, pwd);
      const token = data.token;
      const user = data.username || uname;
      const role = data.role || 'Administrator';

      localStorage.setItem('hti_admin_token', token);
      localStorage.setItem('hti_admin_user', user);
      localStorage.setItem('hti_admin_role', role);

      if (onLoginSuccess) {
        onLoginSuccess({ username: user, role, token });
      } else if (onNavigate) {
        onNavigate('admin');
      }
    } catch (err) {
      console.error('Admin authentication request failed:', err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnHome = () => {
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.href = '/';
    }
  };

  const handleProceedToDashboard = () => {
    if (onNavigate) {
      onNavigate('admin');
    } else {
      window.location.href = '/admin';
    }
  };

  const handleLogoutExisting = () => {
    clearAdminSession();
    setUsername('');
    setPassword('');
    window.location.reload();
  };

  return (
    <div className={`hti-admin-login-page-wrap theme-${theme}`}>
      {/* Background Ambience & Glow */}
      <div className="hti-login-bg-circuit" aria-hidden="true" />
      <div className="hti-login-glow-sphere sphere-1" aria-hidden="true" />
      <div className="hti-login-glow-sphere sphere-2" aria-hidden="true" />

      {/* Top Navbar / Back Link */}
      <div className="hti-login-top-bar">
        <button
          type="button"
          onClick={handleReturnHome}
          className="hti-login-back-home-btn"
          title="Return to HTI Public Website"
        >
          <ArrowLeft size={16} />
          <span>Return to Public Website</span>
        </button>

        <div className="hti-login-top-status">
          <span className="live-pulse-dot" />
          <span>HTI Production Gateway Active</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="hti-admin-login-card-container">
        {/* Already logged in banner if applicable */}
        {existingSession && (
          <div className="hti-already-logged-in-banner">
            <div className="banner-left">
              <ShieldCheck size={18} className="banner-icon" />
              <span>You have an active session as <strong>{existingSession.username}</strong></span>
            </div>
            <div className="banner-actions">
              <button
                type="button"
                className="banner-btn-dashboard"
                onClick={handleProceedToDashboard}
              >
                Go to Dashboard
              </button>
              <button
                type="button"
                className="banner-btn-logout"
                onClick={handleLogoutExisting}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        <div className="hti-admin-login-card">
          {/* Top Card Accent */}
          <div className="hti-login-card-top-stripe" />

          {/* Logo & Header */}
          <div className="hti-login-brand-header">
            <div className="hti-login-gateway-pill">
              <span className="gateway-dot" />
              <span>HTI ENTERPRISE GATEWAY</span>
            </div>

            <div className="hti-login-logo-box">
              <img
                src="/hti-logo.png"
                alt="HTI Logo"
                className="hti-login-logo-image"
              />
            </div>

            <div className="hti-login-brand-text">
              <span className="brand-bold">AUTOMATION</span>
              <span className="brand-sub">&amp; SECURITY SYSTEMS PVT. LTD.</span>
            </div>

            <h1 className="hti-login-title">
              Admin <span className="hti-title-blue">Login</span>
            </h1>
            <p className="hti-login-subtitle">
              Access the HTI Executive Console to manage jobs, applications, and system operations.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div id="admin-login-error" className="hti-login-error-alert" role="alert">
              <AlertCircle size={16} className="error-icon" />
              <div className="error-text">
                <span>{errorMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMsg('')}
                className="error-dismiss"
                aria-label="Dismiss error"
              >
                &times;
              </button>
            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="hti-login-form"
            aria-busy={loading}
          >
            {/* Field 1: Administrator ID */}
            <div className="hti-login-field-group">
              <div className="hti-login-label-row">
                <label htmlFor="admin-username-input" className="hti-login-label">
                  Administrator ID
                </label>
                <span className="hti-login-role-tag">Administrator</span>
              </div>
              <div className="hti-login-input-wrap">
                <User size={18} className="hti-login-input-icon icon-blue" />
                <input
                  id="admin-username-input"
                  name="username"
                  type="text"
                  required
                  placeholder="e.g. admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  aria-invalid={Boolean(errorMsg)}
                  aria-describedby={errorMsg ? 'admin-login-error' : undefined}
                  className="hti-login-input"
                />
              </div>
            </div>

            {/* Field 2: Password */}
            <div className="hti-login-field-group">
              <div className="hti-login-label-row">
                <label htmlFor="admin-password-input" className="hti-login-label">
                  Password
                </label>
                <div className="hti-login-label-right">
                  {capsLockActive && (
                    <span className="hti-caps-indicator">Caps Lock ON</span>
                  )}
                  <span className="hti-crypto-tag">Administrator Access</span>
                </div>
              </div>
              <div className="hti-login-input-wrap">
                <Lock size={18} className="hti-login-input-icon icon-muted" />
                <input
                  id="admin-password-input"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => setCapsLockActive(Boolean(e.getModifierState && e.getModifierState('CapsLock')))}
                  onKeyUp={(e) => setCapsLockActive(Boolean(e.getModifierState && e.getModifierState('CapsLock')))}
                  autoComplete="current-password"
                  aria-invalid={Boolean(errorMsg)}
                  aria-describedby={errorMsg ? 'admin-login-error' : undefined}
                  className="hti-login-input has-eye"
                />
                <button
                  type="button"
                  className="hti-login-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="hti-login-submit-btn"
            >
              {loading ? (
                <span className="hti-btn-spinner-wrap">
                  <span className="login-spinner" />
                  <span>Authenticating...</span>
                </span>
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight size={16} className="submit-arrow-icon" />
                </>
              )}
            </button>
          </form>

          {/* Footer access information */}
          <div className="hti-login-footer-security">
            <span className="sec-badge">
              <LockKeyhole size={12} className="text-emerald-500" />
              <span>Authorized Access</span>
            </span>
            <span className="sec-badge">
              <Database size={12} className="text-blue-500" />
              <span>Administration Portal</span>
            </span>
            <span className="sec-badge">
              <ShieldCheck size={12} className="text-indigo-500" />
              <span>HTI Console</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
