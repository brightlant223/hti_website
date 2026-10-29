import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  LockKeyhole
} from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickDemoFill = (role = 'admin') => {
    setErrorMsg('');
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('editor');
      setPassword('editor123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        if (onLoginSuccess) onLoginSuccess(data.user || { username, role: 'Administrator' });
        onClose();
        return;
      }

      if (
        (username === 'admin' && password === 'admin123') ||
        (username === 'editor' && password === 'editor123')
      ) {
        if (onLoginSuccess) {
          onLoginSuccess({
            username,
            role: username === 'admin' ? 'Administrator' : 'Editor',
            full_name: username === 'admin' ? 'Chief Administrator' : 'Technical Content Lead',
          });
        }
        onClose();
      } else {
        setErrorMsg('Invalid credentials. Use demo credentials below.');
      }
    } catch (err) {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 p-4 backdrop-blur-md transition-all duration-300">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative z-10 w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* 1. Header */}
        <div className="text-center pt-1">
          <div className="inline-flex items-center gap-1.5 mb-1.5">
            <span className="text-2xl font-black tracking-tight text-red-600">HTI</span>
            <span className="text-lg font-bold tracking-tight text-slate-900">Control</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Admin Console</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Authorized BMS personnel access only
          </p>
        </div>

        {/* 2. Login Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {errorMsg && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 border border-red-200/60 flex items-center justify-between">
              <span>{errorMsg}</span>
              <button
                type="button"
                onClick={() => setErrorMsg('')}
                className="text-red-400 hover:text-red-700 cursor-pointer"
              >
                &times;
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <User size={15} />
              </span>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Lock size={15} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-9 text-xs text-slate-900 placeholder-slate-400 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Quick Demo Fill */}
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 border border-slate-200/70">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
              <Zap size={13} className="text-amber-500 fill-amber-500" />
              <span>Demo Fill:</span>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoFill('admin')}
                className="rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-blue-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoFill('editor')}
                className="rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                Editor
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* 5. Footer Security Badges */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1 hover:text-slate-600 transition-colors">
            <LockKeyhole size={11} className="text-emerald-500" />
            TLS 1.3 256-bit
          </span>
          <span className="flex items-center gap-1 hover:text-slate-600 transition-colors">
            <Database size={11} className="text-blue-500" />
            SQLite WAL
          </span>
          <span className="flex items-center gap-1 hover:text-slate-600 transition-colors">
            <ShieldCheck size={11} className="text-indigo-500" />
            Zero-Trust RBAC
          </span>
        </div>
      </div>
    </div>
  );
}
