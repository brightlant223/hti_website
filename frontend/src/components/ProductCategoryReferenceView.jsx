import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Settings,
  MapPin,
  ArrowRight,
  Download,
  FileText,
  Wrench,
  Headphones,
  ChevronDown,
  ChevronUp,
  Cpu,
  Lock,
  Flame,
  Camera,
  Activity,
  Award,
  Bell,
  SlidersHorizontal
} from 'lucide-react';
import './ProductCategoryReferenceView.css';

// SVG Blueprint/Schematic illustrations tailored for each product/solution
const SolutionSchematics = {
  'automatic-sliding-doors': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="10" y="8" width="80" height="54" rx="3" stroke="#0B1B3A" strokeWidth="2.5" />
      <line x1="10" y1="16" x2="90" y2="16" stroke="#075BE8" strokeWidth="3" />
      <rect x="24" y="16" width="24" height="46" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <rect x="52" y="16" width="24" height="46" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <line x1="36" y1="22" x2="36" y2="56" stroke="#93C5FD" strokeDasharray="3 3" />
      <line x1="64" y1="22" x2="64" y2="56" stroke="#93C5FD" strokeDasharray="3 3" />
      <path d="M 20 38 L 14 38 M 17 35 L 14 38 L 17 41" stroke="#075BE8" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 38 L 86 38 M 83 35 L 86 38 L 83 41" stroke="#075BE8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'automatic-swing-doors': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="12" y="10" width="76" height="50" rx="3" stroke="#0B1B3A" strokeWidth="2.5" />
      <line x1="12" y1="18" x2="88" y2="18" stroke="#075BE8" strokeWidth="2.5" />
      <line x1="28" y1="18" x2="28" y2="60" stroke="#0B1B3A" strokeWidth="2" />
      <line x1="28" y1="18" x2="52" y2="38" stroke="#075BE8" strokeWidth="2.5" />
      <path d="M 52 38 A 30 30 0 0 1 28 48" stroke="#93C5FD" strokeDasharray="3 3" />
      <circle cx="28" cy="18" r="3.5" fill="#075BE8" />
    </svg>
  ),
  'high-speed-doors': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="14" y="10" width="72" height="52" rx="3" stroke="#0B1B3A" strokeWidth="2.5" />
      <rect x="18" y="13" width="64" height="10" rx="5" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <line x1="20" y1="28" x2="80" y2="28" stroke="#93C5FD" strokeWidth="1.8" />
      <line x1="20" y1="36" x2="80" y2="36" stroke="#93C5FD" strokeWidth="1.8" />
      <line x1="20" y1="44" x2="80" y2="44" stroke="#93C5FD" strokeWidth="1.8" />
      <rect x="34" y="32" width="32" height="8" rx="2" fill="#DBEAFE" stroke="#075BE8" strokeWidth="1.5" />
      <path d="M 50 56 L 50 48 M 47 51 L 50 48 L 53 51" stroke="#075BE8" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  'roll-up-doors': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="14" y="10" width="72" height="52" rx="3" stroke="#0B1B3A" strokeWidth="2.5" />
      <rect x="18" y="13" width="64" height="8" rx="4" fill="#E2E8F0" stroke="#0B1B3A" strokeWidth="2" />
      <line x1="18" y1="25" x2="82" y2="25" stroke="#075BE8" strokeWidth="1.8" />
      <line x1="18" y1="31" x2="82" y2="31" stroke="#075BE8" strokeWidth="1.8" />
      <line x1="18" y1="37" x2="82" y2="37" stroke="#075BE8" strokeWidth="1.8" />
      <line x1="18" y1="43" x2="82" y2="43" stroke="#075BE8" strokeWidth="1.8" />
      <line x1="18" y1="49" x2="82" y2="49" stroke="#075BE8" strokeWidth="1.8" />
      <rect x="18" y="55" width="64" height="6" fill="#0B1B3A" />
    </svg>
  ),
  'dock-levellers': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M 10 52 L 32 52 L 32 60 L 90 60" stroke="#0B1B3A" strokeWidth="2.5" />
      <polygon points="32,52 74,40 74,44 32,54" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <polygon points="74,40 88,44 88,47 74,44" fill="#DBEAFE" stroke="#075BE8" strokeWidth="2" />
      <line x1="48" y1="53" x2="56" y2="46" stroke="#0B1B3A" strokeWidth="3" />
      <rect x="74" y="47" width="5" height="10" fill="#0B1B3A" rx="1" />
    </svg>
  ),
  'turnstiles-access-control': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="16" y="16" width="16" height="44" rx="3" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="#075BE8" />
      <rect x="68" y="16" width="16" height="44" rx="3" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2" />
      <circle cx="76" cy="24" r="3" fill="#075BE8" />
      <line x1="32" y1="36" x2="48" y2="36" stroke="#075BE8" strokeWidth="3" strokeLinecap="round" />
      <line x1="68" y1="36" x2="52" y2="36" stroke="#075BE8" strokeWidth="3" strokeLinecap="round" />
      <path d="M 46 20 L 54 20 L 54 28 L 46 28 Z" fill="#DBEAFE" stroke="#075BE8" strokeWidth="1.5" />
      <circle cx="50" cy="24" r="1.5" fill="#075BE8" />
    </svg>
  ),
  'telescopic-cantilever-gates': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="56" x2="92" y2="56" stroke="#94A3B8" strokeWidth="2" />
      <rect x="14" y="20" width="46" height="32" rx="2" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <rect x="38" y="24" width="44" height="28" rx="2" fill="#F8FAFC" stroke="#0B1B3A" strokeWidth="2" />
      <line x1="14" y1="20" x2="60" y2="52" stroke="#93C5FD" strokeWidth="1.5" />
      <line x1="38" y1="24" x2="82" y2="52" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="10" y="32" width="6" height="24" fill="#0B1B3A" rx="1" />
    </svg>
  ),
  'sectional-doors': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="10" width="64" height="52" rx="2" stroke="#0B1B3A" strokeWidth="2.5" />
      <line x1="18" y1="23" x2="82" y2="23" stroke="#075BE8" strokeWidth="2" />
      <line x1="18" y1="36" x2="82" y2="36" stroke="#075BE8" strokeWidth="2" />
      <line x1="18" y1="49" x2="82" y2="49" stroke="#075BE8" strokeWidth="2" />
      <circle cx="24" cy="16.5" r="2.5" fill="#93C5FD" />
      <circle cx="24" cy="29.5" r="2.5" fill="#93C5FD" />
      <circle cx="24" cy="42.5" r="2.5" fill="#93C5FD" />
    </svg>
  ),
  'boom-barriers': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="24" width="16" height="38" rx="3" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2.5" />
      <circle cx="26" cy="34" r="3.5" fill="#075BE8" />
      <line x1="26" y1="34" x2="88" y2="34" stroke="#075BE8" strokeWidth="4" strokeLinecap="round" />
      <line x1="42" y1="32" x2="48" y2="36" stroke="#E53935" strokeWidth="4" />
      <line x1="58" y1="32" x2="64" y2="36" stroke="#E53935" strokeWidth="4" />
      <line x1="74" y1="32" x2="80" y2="36" stroke="#E53935" strokeWidth="4" />
    </svg>
  ),
  'crash-bollards': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="10" y1="52" x2="90" y2="52" stroke="#0B1B3A" strokeWidth="2.5" />
      <rect x="22" y="24" width="16" height="28" rx="3" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <line x1="22" y1="30" x2="38" y2="30" stroke="#E53935" strokeWidth="2" />
      <rect x="44" y="18" width="16" height="34" rx="3" fill="#DBEAFE" stroke="#075BE8" strokeWidth="2.5" />
      <line x1="44" y1="24" x2="60" y2="24" stroke="#E53935" strokeWidth="2" />
      <rect x="66" y="24" width="16" height="28" rx="3" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <line x1="66" y1="30" x2="82" y2="30" stroke="#E53935" strokeWidth="2" />
    </svg>
  ),
  'tyre-killers': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="12" y="44" width="76" height="14" rx="2" fill="#0B1B3A" />
      <polygon points="22,44 26,24 30,44" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <polygon points="38,44 42,24 46,44" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <polygon points="54,44 58,24 62,44" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <polygon points="70,44 74,24 78,44" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
    </svg>
  ),
  'parking-management': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="20" y="16" width="22" height="44" rx="3" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2" />
      <rect x="25" y="22" width="12" height="10" rx="1" fill="#075BE8" />
      <line x1="25" y1="40" x2="37" y2="40" stroke="#0B1B3A" strokeWidth="2" />
      <line x1="42" y1="34" x2="82" y2="34" stroke="#075BE8" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="42" cy="34" r="3" fill="#0B1B3A" />
    </svg>
  ),
  'car-lift': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="14" width="8" height="48" fill="#0B1B3A" rx="1" />
      <rect x="74" y="14" width="8" height="48" fill="#0B1B3A" rx="1" />
      <rect x="22" y="36" width="56" height="6" fill="#EFF6FF" stroke="#075BE8" strokeWidth="2" />
      <line x1="30" y1="60" x2="50" y2="42" stroke="#93C5FD" strokeWidth="2" />
      <line x1="50" y1="60" x2="30" y2="42" stroke="#93C5FD" strokeWidth="2" />
      <line x1="50" y1="60" x2="70" y2="42" stroke="#93C5FD" strokeWidth="2" />
      <line x1="70" y1="60" x2="50" y2="42" stroke="#93C5FD" strokeWidth="2" />
    </svg>
  ),
  'visitor-management': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="28" y="12" width="44" height="34" rx="4" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2" />
      <circle cx="50" cy="24" r="6" fill="#075BE8" />
      <path d="M 40 38 A 10 10 0 0 1 60 38" stroke="#075BE8" strokeWidth="2" fill="none" />
      <rect x="47" y="46" width="6" height="16" fill="#0B1B3A" />
      <rect x="36" y="60" width="28" height="4" fill="#0B1B3A" rx="1" />
    </svg>
  ),
  'interlock-systems': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="14" y="12" width="72" height="48" rx="3" stroke="#0B1B3A" strokeWidth="2" fill="#F8FAFC" />
      <rect x="14" y="24" width="6" height="24" fill="#075BE8" />
      <circle cx="28" cy="20" r="3.5" fill="#EF4444" />
      <line x1="86" y1="24" x2="74" y2="38" stroke="#075BE8" strokeWidth="2.5" />
      <circle cx="72" cy="20" r="3.5" fill="#10B981" />
      <rect x="42" y="26" width="16" height="20" rx="2" fill="#EFF6FF" stroke="#075BE8" strokeWidth="1.8" />
      <path d="M 28 36 L 42 36 M 58 36 L 72 36" stroke="#93C5FD" strokeDasharray="2 2" strokeWidth="1.5" />
    </svg>
  ),
  'pass-box-systems': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="14" width="64" height="44" rx="3" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2.5" />
      <rect x="26" y="20" width="48" height="32" rx="2" fill="#DBEAFE" stroke="#075BE8" strokeWidth="1.8" />
      <line x1="34" y1="26" x2="66" y2="26" stroke="#8B5CF6" strokeWidth="2.5" />
      <line x1="22" y1="32" x2="22" y2="40" stroke="#0B1B3A" strokeWidth="2.5" />
      <line x1="78" y1="32" x2="78" y2="40" stroke="#0B1B3A" strokeWidth="2.5" />
    </svg>
  ),
  'digital-clocks': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="14" y="18" width="72" height="34" rx="4" fill="#0B1B3A" stroke="#075BE8" strokeWidth="2" />
      <text x="50" y="41" fill="#EF4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">12:45:08</text>
      <circle cx="78" cy="26" r="2" fill="#10B981" />
    </svg>
  ),
  'chiller-cleanroom-doors': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="10" width="64" height="52" rx="3" stroke="#0B1B3A" strokeWidth="2.5" fill="#EFF6FF" />
      <rect x="24" y="15" width="52" height="42" rx="2" fill="#DBEAFE" stroke="#075BE8" strokeWidth="2" />
      <line x1="50" y1="28" x2="50" y2="44" stroke="#075BE8" strokeWidth="2" />
      <line x1="42" y1="36" x2="58" y2="36" stroke="#075BE8" strokeWidth="2" />
      <line x1="44" y1="30" x2="56" y2="42" stroke="#075BE8" strokeWidth="1.5" />
      <line x1="56" y1="30" x2="44" y2="42" stroke="#075BE8" strokeWidth="1.5" />
    </svg>
  ),
  'acoustic-sound-doors': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="10" width="64" height="52" rx="3" stroke="#0B1B3A" strokeWidth="2.5" />
      <line x1="30" y1="12" x2="30" y2="60" stroke="#075BE8" strokeWidth="2" />
      <line x1="40" y1="12" x2="40" y2="60" stroke="#93C5FD" strokeWidth="2" />
      <line x1="50" y1="12" x2="50" y2="60" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M 60 28 A 10 10 0 0 1 60 44" stroke="#075BE8" strokeWidth="2" fill="none" />
      <path d="M 68 22 A 18 18 0 0 1 68 50" stroke="#93C5FD" strokeWidth="2" fill="none" />
    </svg>
  ),
  'safety-buzzers': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="24" y="16" width="52" height="40" rx="4" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2" />
      <circle cx="50" cy="34" r="10" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <path d="M 20 28 L 14 24 M 20 40 L 14 44" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 28 L 86 24 M 80 40 L 86 44" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'fire-alarms': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="20" y="12" width="60" height="48" rx="4" fill="#EFF6FF" stroke="#DC2626" strokeWidth="2.5" />
      <rect x="26" y="18" width="48" height="12" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" rx="2" />
      <circle cx="34" cy="40" r="4" fill="#DC2626" />
      <circle cx="46" cy="40" r="4" fill="#F59E0B" />
      <circle cx="58" cy="40" r="4" fill="#10B981" />
    </svg>
  ),
  'fire-hydrants': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="44" y="24" width="12" height="38" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
      <circle cx="50" cy="18" r="8" fill="#DC2626" stroke="#0B1B3A" strokeWidth="1.8" />
      <line x1="32" y1="36" x2="68" y2="36" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="18" r="4" fill="#ffffff" />
    </svg>
  ),
  'fire-doors': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="20" y="10" width="60" height="52" rx="3" stroke="#DC2626" strokeWidth="2.5" fill="#FEF2F2" />
      <line x1="28" y1="38" x2="72" y2="38" stroke="#0B1B3A" strokeWidth="4" strokeLinecap="round" />
      <rect x="40" y="20" width="20" height="8" rx="2" fill="#DC2626" />
      <text x="50" y="26" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">240M</text>
    </svg>
  ),
  'public-address': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="26,26 44,20 44,50 26,44" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2.2" />
      <rect x="18" y="30" width="8" height="10" rx="1" fill="#075BE8" />
      <path d="M 52 26 A 14 14 0 0 1 52 44" stroke="#075BE8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 60 20 A 24 24 0 0 1 60 50" stroke="#075BE8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 68 14 A 34 34 0 0 1 68 56" stroke="#93C5FD" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  'gas-detection': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="50" cy="30" r="18" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2.5" />
      <rect x="42" y="24" width="16" height="10" rx="1" fill="#075BE8" />
      <text x="50" y="31" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">PPM</text>
      <rect x="44" y="48" width="12" height="14" rx="2" fill="#0B1B3A" />
      <line x1="44" y1="54" x2="56" y2="54" stroke="#075BE8" strokeWidth="1.5" />
    </svg>
  ),
  'emergency-auto-trip': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="20" y="16" width="60" height="40" rx="4" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
      <circle cx="50" cy="36" r="11" fill="#DC2626" />
      <polygon points="51,28 45,36 50,36 49,44 55,35 50,35" fill="#ffffff" />
    </svg>
  ),
  'ai-cctv': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M 24 22 L 64 22 L 74 34 L 74 44 L 24 44 Z" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2.5" />
      <circle cx="70" cy="39" r="6" fill="#075BE8" stroke="#0B1B3A" strokeWidth="1.5" />
      <circle cx="70" cy="39" r="2.5" fill="#ffffff" />
      <rect x="14" y="20" width="10" height="18" fill="#0B1B3A" rx="2" />
      <line x1="76" y1="34" x2="90" y2="24" stroke="#93C5FD" strokeDasharray="2 2" strokeWidth="1.5" />
      <line x1="76" y1="44" x2="90" y2="54" stroke="#93C5FD" strokeDasharray="2 2" strokeWidth="1.5" />
    </svg>
  ),
  'biometric-access': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="26" y="12" width="48" height="48" rx="4" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2.5" />
      <circle cx="50" cy="20" r="3.5" fill="#075BE8" />
      <rect x="36" y="28" width="28" height="24" rx="3" fill="#DBEAFE" stroke="#075BE8" strokeWidth="1.5" />
      <path d="M 44 42 A 6 6 0 0 1 56 42" stroke="#075BE8" strokeWidth="1.5" fill="none" />
      <path d="M 41 44 A 9 9 0 0 1 59 44" stroke="#075BE8" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  'video-door-phones': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="14" width="46" height="38" rx="3" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2.2" />
      <rect x="23" y="19" width="36" height="22" fill="#DBEAFE" stroke="#075BE8" strokeWidth="1.5" rx="1" />
      <circle cx="41" cy="46" r="2.5" fill="#075BE8" />
      <rect x="70" y="20" width="16" height="32" rx="2" fill="#0B1B3A" />
      <circle cx="78" cy="28" r="3" fill="#075BE8" />
      <circle cx="78" cy="42" r="3" fill="#EF4444" />
    </svg>
  ),
  'vms-command': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="14" width="30" height="18" fill="#EFF6FF" stroke="#075BE8" strokeWidth="1.8" rx="1" />
      <rect x="52" y="14" width="30" height="18" fill="#EFF6FF" stroke="#075BE8" strokeWidth="1.8" rx="1" />
      <rect x="18" y="36" width="30" height="18" fill="#EFF6FF" stroke="#075BE8" strokeWidth="1.8" rx="1" />
      <rect x="52" y="36" width="30" height="18" fill="#EFF6FF" stroke="#075BE8" strokeWidth="1.8" rx="1" />
      <line x1="33" y1="23" x2="33" y2="23" stroke="#075BE8" strokeWidth="3" />
    </svg>
  ),
  'thermal-beams': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="16" width="12" height="42" fill="#0B1B3A" rx="2" />
      <circle cx="24" cy="28" r="2.5" fill="#EF4444" />
      <circle cx="24" cy="44" r="2.5" fill="#EF4444" />
      <rect x="70" y="16" width="12" height="42" fill="#0B1B3A" rx="2" />
      <circle cx="76" cy="28" r="2.5" fill="#10B981" />
      <circle cx="76" cy="44" r="2.5" fill="#10B981" />
      <line x1="30" y1="28" x2="70" y2="28" stroke="#EF4444" strokeDasharray="3 2" strokeWidth="2" />
      <line x1="30" y1="44" x2="70" y2="44" stroke="#EF4444" strokeDasharray="3 2" strokeWidth="2" />
    </svg>
  ),
  'intrusion-detection': () => (
    <svg viewBox="0 0 100 70" width="76" height="54" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="24" y="14" width="52" height="44" rx="4" fill="#EFF6FF" stroke="#0B1B3A" strokeWidth="2.5" />
      <rect x="30" y="20" width="40" height="12" fill="#075BE8" rx="1" />
      <circle cx="36" cy="40" r="2.5" fill="#0B1B3A" />
      <circle cx="44" cy="40" r="2.5" fill="#0B1B3A" />
      <circle cx="52" cy="40" r="2.5" fill="#0B1B3A" />
      <circle cx="60" cy="40" r="2.5" fill="#0B1B3A" />
      <circle cx="36" cy="48" r="2.5" fill="#0B1B3A" />
      <circle cx="44" cy="48" r="2.5" fill="#0B1B3A" />
      <circle cx="52" cy="48" r="2.5" fill="#0B1B3A" />
      <circle cx="60" cy="48" r="2.5" fill="#0B1B3A" />
    </svg>
  )
};

export const CATEGORY_PAGES_CONFIG = {
  automation: {
    key: 'automation',
    badgeLabel: 'PRODUCT',
    breadcrumbName: 'Industrial Access Automation',
    titleLine1: 'Industrial Access',
    titleBlue: 'Automation',
    description:
      'High-performance entrance automation for industrial, commercial and infrastructure facilities. Designed for safety, efficiency and seamless operations.',
    heroImage: '/hero-building-automation-ref.jpg',
    heroAlt: 'HTI Industrial Access Automation Headquarters & Entrance Gate',
    stats: [
      { id: 'p', icon: ShieldCheck, val: '450+', lbl: 'Projects Completed' },
      { id: 's', icon: HardHat, val: '100%', lbl: 'Safety Focused' },
      { id: 'c', icon: Settings, val: 'Custom', lbl: 'Engineered Solutions' },
      { id: 'm', icon: MapPin, val: 'PAN India', lbl: 'Service Support' }
    ],
    solutionsTitle: 'Our Solutions',
    solutionsSubtitle: 'Reliable and innovative access automation solutions for every industrial and commercial need.',
    solutions: [
      {
        id: 'sliding-doors',
        title: 'Automatic Sliding Doors',
        slug: 'automatic-sliding-swing-doors',
        image: '/products/automatic-doors.jpg',
        schematicKey: 'automatic-sliding-doors'
      },
      {
        id: 'high-speed-doors',
        title: 'High Speed Doors',
        slug: 'pvc-rapid-roll-up-doors',
        image: '/products/rapid-doors.jpg',
        schematicKey: 'high-speed-doors'
      },
      {
        id: 'dock-levellers',
        title: 'Dock Levellers',
        slug: 'dock-levellers-dock-shelters',
        image: '/services/services-logistics-bridge.jpg',
        schematicKey: 'dock-levellers'
      },
      {
        id: 'turnstiles',
        title: 'Turnstiles & Access Control',
        slug: 'turnstiles-flap-barriers-speed-gates',
        image: '/products/optical-speed-turnstiles.jpg',
        schematicKey: 'turnstiles-access-control'
      },
      {
        id: 'swing-doors',
        title: 'Automatic Swing Doors',
        slug: 'automatic-sliding-swing-doors',
        image: '/products/automatic-doors-swing.jpg',
        schematicKey: 'automatic-swing-doors'
      },
      {
        id: 'roll-up-doors',
        title: 'Roll Up Doors',
        slug: 'motorized-rolling-shutters',
        image: '/products/motorized-rolling-shutters.jpg',
        schematicKey: 'roll-up-doors'
      },
      {
        id: 'cantilever-gates',
        title: 'Telescopic & Cantilever Gates',
        slug: 'telescopic-cantilever-gates',
        image: '/services/services-trackless-gate.jpg',
        schematicKey: 'telescopic-cantilever-gates'
      },
      {
        id: 'sectional-doors',
        title: 'Sectional Overhead Doors',
        slug: 'sectional-overhead-doors',
        image: '/services/service-sectional-doors.jpg',
        schematicKey: 'sectional-doors'
      }
    ],
    faqs: [
      {
        q: 'Can automatic sliding doors operate during a power failure?',
        a: 'Yes. All HTI automatic pedestrian doors are equipped with a built-in intelligent battery backup system that ensures fail-safe opening or normal cycle operation for up to 200 opening cycles during power loss. Industrial sliding and swing gates feature a personalized mechanical clutch release key allowing smooth manual operation.'
      },
      {
        q: 'What is the maximum width supported for telescopic gates?',
        a: 'Our telescopic sliding gates support clear spans up to 25 meters by synchronizing multiple overlapping leaves. Cantilever gates operate without any ground track, floating completely above driveways up to 18 meters wide, ideal for sloped, uneven, or debris-prone sites.'
      },
      {
        q: 'Are high-speed PVC roll-up doors suitable for cleanrooms?',
        a: 'Absolutely. HTI rapid roll-up doors operate at speeds up to 1.5 m/sec, drastically reducing air exchange time between rooms. They feature airtight zipper side tracks, self-repairing curtains after accidental impact, and smooth non-porous surfaces compliant with GMP norms.'
      },
      {
        q: 'What is the duty cycle rating of HTI boom barriers and dock levellers?',
        a: 'HTI boom barriers feature brushless DC motors rated for 100% continuous duty (exceeding 5 million cycles) without thermal shutdown. Our hydraulic dock levellers support dynamic forklift loads from 6,000 kg to 8,000 kg compliant with EN 1398.'
      }
    ]
  },

  perimeter: {
    key: 'perimeter-defense',
    badgeLabel: 'PRODUCT',
    breadcrumbName: 'Traffic & Perimeter',
    titleLine1: 'Traffic &',
    titleBlue: 'Perimeter',
    description:
      'Heavy-duty perimeter defense, high-frequency electromechanical boom barriers, crash-rated hostile vehicle mitigation, and automated parking access control systems.',
    heroImage: '/case-studies/case-boom-barrier.jpg',
    heroAlt: 'HTI Automatic Boom Barriers & Perimeter Defense Installation',
    stats: [
      { id: 'p', icon: ShieldCheck, val: '320+', lbl: 'Projects Completed' },
      { id: 's', icon: Activity, val: '100%', lbl: 'Continuous BLDC Duty' },
      { id: 'c', icon: Settings, val: 'Crash Rated', lbl: 'K4 / K12 / PAS 68' },
      { id: 'm', icon: MapPin, val: 'PAN India', lbl: 'Service Support' }
    ],
    solutionsTitle: 'Our Solutions',
    solutionsSubtitle: 'Heavy-duty perimeter defense and automated traffic control solutions for secure facilities.',
    solutions: [
      {
        id: 'boom-barriers',
        title: 'Automatic Boom Barriers',
        slug: 'boom-barriers',
        image: '/products/boom-barriers.jpg',
        schematicKey: 'boom-barriers'
      },
      {
        id: 'crash-bollards',
        title: 'Hydraulic Crash Bollards',
        slug: 'bollards-tyre-killers-car-lifts',
        image: '/products/hydraulic-crash-bollards.jpg',
        schematicKey: 'crash-bollards'
      },
      {
        id: 'tyre-killers',
        title: 'Tyre Killers & Blockers',
        slug: 'bollards-tyre-killers-car-lifts',
        image: '/products/tyre-killers-road-blockers.jpg',
        schematicKey: 'tyre-killers'
      },
      {
        id: 'turnstiles-speed',
        title: 'Turnstiles & Speed Gates',
        slug: 'turnstiles-flap-barriers-speed-gates',
        image: '/products/optical-speed-turnstiles.jpg',
        schematicKey: 'turnstiles-access-control'
      },
      {
        id: 'parking-mgmt',
        title: 'Parking Management Systems',
        slug: 'parking-management-systems',
        image: '/services/service-parking-management.jpg',
        schematicKey: 'parking-management'
      },
      {
        id: 'car-lifts',
        title: 'Hydraulic Car Lifts',
        slug: 'car-lift-systems',
        image: '/services/service-car-lift-systems.jpg',
        schematicKey: 'car-lift'
      },
      {
        id: 'cantilever',
        title: 'Telescopic Cantilever Gates',
        slug: 'telescopic-cantilever-gates',
        image: '/services/services-trackless-gate.jpg',
        schematicKey: 'telescopic-cantilever-gates'
      },
      {
        id: 'visitor-mgmt',
        title: 'Visitor Management Systems',
        slug: 'visitor-management-system',
        image: '/services/service-visitor-management.jpg',
        schematicKey: 'visitor-management'
      }
    ],
    faqs: [
      {
        q: 'What makes HTI automatic boom barriers suitable for 24/7 continuous traffic?',
        a: 'Our boom barriers feature brushless DC (BLDC) motors and heavy-duty planetary gearboxes rated for 100% continuous duty (exceeding 5 million cycles) without thermal overload. They integrate auto-reversing safety loops and optical photocells for complete accident prevention.'
      },
      {
        q: 'Are HTI bollards and tyre killers crash-rated for high-security applications?',
        a: 'Yes. Our rising hydraulic bollards are available in K4, K8, and K12 crash ratings compliant with ASTM and PAS 68 standards, capable of stopping a 7.5-ton truck travelling up to 80 km/h. Tyre killers feature bidirectional hardened steel spikes designed to shred heavy vehicle tyres instantaneously.'
      },
      {
        q: 'How do optical turnstiles and flap barriers prevent tailgating?',
        a: 'HTI speed gates and optical turnstiles feature multi-beam infrared sensor matrices (6 to 12 pairs) along the passage corridor. The logic detects uncredentialed individuals attempting to follow an authorized user, triggers an audible warning alarm, and closes the acrylic wings.'
      },
      {
        q: 'Can the parking management system integrate with Indian FASTag RFID?',
        a: 'Yes. Our automated parking systems integrate long-range UHF RFID readers compatible with NPCI FASTag protocol, enabling seamless automated entry and exit without paper tickets or manual operator intervention.'
      }
    ]
  },

  cleanroom: {
    key: 'cleanroom-interlocks',
    badgeLabel: 'PRODUCT',
    breadcrumbName: 'Pharma Cleanroom',
    titleLine1: 'Pharma',
    titleBlue: 'Cleanroom',
    description:
      'USFDA 21 CFR Part 11 compliant 2 to 12 door interlocking logic, dynamic HEPA pass boxes, GPS synchronized clocks & sterile containment doors.',
    heroImage: '/hero-cleanroom-interlock-chamber.jpg',
    heroAlt: 'HTI Pharma Cleanroom Airlock Interlock & Pass Box Infrastructure',
    stats: [
      { id: 'p', icon: ShieldCheck, val: '180+', lbl: 'Pharma Blocks Protected' },
      { id: 's', icon: Lock, val: 'USFDA', lbl: '21 CFR Part 11 Compliant' },
      { id: 'c', icon: SlidersHorizontal, val: '2 to 12', lbl: 'Door Interlock Cascades' },
      { id: 'm', icon: MapPin, val: 'PAN India', lbl: 'Service Support' }
    ],
    solutionsTitle: 'Our Solutions',
    solutionsSubtitle: 'Precision differential pressure interlocking and contamination control systems for cleanrooms.',
    solutions: [
      {
        id: 'door-interlocks',
        title: 'Door Interlock Systems',
        slug: 'door-interlock-systems',
        image: '/products/cleanroom-interlocks.jpg',
        schematicKey: 'interlock-systems'
      },
      {
        id: 'pass-boxes',
        title: 'Dynamic & Static Pass Boxes',
        slug: 'pass-box-systems',
        image: '/products/pass-box-system.jpg',
        schematicKey: 'pass-box-systems'
      },
      {
        id: 'gps-clocks',
        title: 'Digital GPS Master Clocks',
        slug: 'digital-gps-clocks',
        image: '/products/digital-clock-hero.jpg',
        schematicKey: 'digital-clocks'
      },
      {
        id: 'chiller-doors',
        title: 'Chiller & Cleanroom Doors',
        slug: 'chiller-clean-room-doors',
        image: '/products/chiller-door-hero.jpg',
        schematicKey: 'chiller-cleanroom-doors'
      },
      {
        id: 'acoustic-doors',
        title: 'Acoustic Sound Doors',
        slug: 'acoustic-sound-doors',
        image: '/services/service-acoustic-sound-doors.jpg',
        schematicKey: 'acoustic-sound-doors'
      },
      {
        id: 'safety-buzzers',
        title: 'Safety Override Buzzers',
        slug: 'safety-override-buzzers',
        image: '/services/service-safety-override-buzzers.jpg',
        schematicKey: 'safety-buzzers'
      },
      {
        id: 'high-speed-pvc',
        title: 'Cleanroom Rapid Roll-Up Doors',
        slug: 'pvc-rapid-roll-up-doors',
        image: '/products/rapid-doors.jpg',
        schematicKey: 'high-speed-doors'
      },
      {
        id: 'sliding-interlock',
        title: 'Airlock Automatic Sliding Doors',
        slug: 'automatic-sliding-swing-doors',
        image: '/products/cleanroom-door-pharma.jpg',
        schematicKey: 'automatic-sliding-doors'
      }
    ],
    faqs: [
      {
        q: 'How does the programmable delay timer preserve cleanroom differential pressure?',
        a: 'When an airlock door is opened, pressure momentarily drops. Our controller introduces an engineered delay (typically 3 to 6 seconds) after door closure before releasing the lock on the adjoining door, allowing the AHU sufficient time to re-establish the differential pressure barrier (+15 to +30 Pascals).'
      },
      {
        q: 'What is the difference between Static and Dynamic Pass Boxes?',
        a: 'Static pass boxes are designed for material transfer between cleanrooms of identical air classification. Dynamic pass boxes are equipped with an internal motorized blower, mini-pleat HEPA filter (99.997% at 0.3μm), and Magnehelic pressure gauge, creating a clean vertical laminar shower during transfer.'
      },
      {
        q: 'Can the door interlock system be installed in flameproof solvent dispensing areas?',
        a: 'Yes. HTI manufactures certified Flameproof (Ex-d Group IIA, IIB) door stations with heavy cast aluminum enclosures and explosion-proof push buttons specifically designed for solvent storage, granulation, and fluid-bed drying blocks.'
      },
      {
        q: 'How do GPS synchronized digital clocks help during pharmaceutical audits?',
        a: 'By synchronizing all digital clocks across production blocks, QC testing labs, and packaging lines via GPS satellite, all batch manufacturing records (BMR) reflect identical, verifiable time stamps, satisfying USFDA 21 CFR Part 11 data integrity guidelines.'
      }
    ]
  },

  fire: {
    key: 'fire-protection',
    badgeLabel: 'PRODUCT',
    breadcrumbName: 'Fire & Life Safety',
    titleLine1: 'Fire & Life',
    titleBlue: 'Safety',
    description:
      'NBC 2016 Part 4 compliant addressable fire alarm networks, industrial hydrant and sprinkler pump skids, certified 240-min fire doors, and toxic gas leak detection.',
    heroImage: '/products/fire-life-safety-hero.jpg',
    heroAlt: 'HTI Turnkey Fire Hydrant, Sprinkler & Life Safety Infrastructure',
    stats: [
      { id: 'p', icon: ShieldCheck, val: '280+', lbl: 'Turnkey Projects Completed' },
      { id: 's', icon: Flame, val: 'NBC 2016', lbl: 'Part 4 Compliant' },
      { id: 'c', icon: Award, val: '240 Min', lbl: 'Fire Integrity Rating' },
      { id: 'm', icon: MapPin, val: 'PAN India', lbl: 'Service Support' }
    ],
    solutionsTitle: 'Our Solutions',
    solutionsSubtitle: 'Comprehensive life safety, automated fire suppression, and emergency alert infrastructure.',
    solutions: [
      {
        id: 'fire-alarms',
        title: 'Addressable Fire Alarm Systems',
        slug: 'fire-alarm-system',
        image: '/products/fire-alarm-system.jpg',
        schematicKey: 'fire-alarms'
      },
      {
        id: 'fire-hydrants',
        title: 'Hydrant & Sprinkler Arrays',
        slug: 'fire-hydrant-sprinkler-systems',
        image: '/products/fire-hydrant-sprinklers.jpg',
        schematicKey: 'fire-hydrants'
      },
      {
        id: 'fire-doors',
        title: 'Fire Rated Doors & Shutters',
        slug: 'fire-rated-doors-shutters',
        image: '/products/fire-rated-steel-doors.jpg',
        schematicKey: 'fire-doors'
      },
      {
        id: 'public-address',
        title: 'Public Address & Voice Evac',
        slug: 'public-address-system',
        image: '/products/public-address-evac.jpg',
        schematicKey: 'public-address'
      },
      {
        id: 'gas-leak',
        title: 'Gas Leak Detection Systems',
        slug: 'gas-leak-detection',
        image: '/services/service-gas-leak-detector.jpg',
        schematicKey: 'gas-detection'
      },
      {
        id: 'auto-trip',
        title: 'Emergency Auto Trip Interlocks',
        slug: 'emergency-auto-trip',
        image: '/services/service-emergency-trip.jpg',
        schematicKey: 'emergency-auto-trip'
      },
      {
        id: 'fire-shutters',
        title: 'Auto-Descent Fire Shutters',
        slug: 'fire-rated-doors-shutters',
        image: '/products/fire-rated-steel-doors.jpg',
        schematicKey: 'fire-doors'
      },
      {
        id: 'clean-agent',
        title: 'Clean Agent Gas Suppression',
        slug: 'clean-agent-gas-suppression',
        image: '/products/clean-agent-gas-suppression.jpg',
        schematicKey: 'gas-detection'
      }
    ],
    faqs: [
      {
        q: 'How does the Fire Alarm System integrate with cleanroom door interlocks and access doors?',
        a: 'All HTI addressable and conventional fire alarm panels feature certified potential-free dry relay trip contacts wired directly into door interlocking controllers and access control power supplies. Upon a verified detector or manual pull station trigger, power drops instantaneously to release all electromagnetic locks for unhindered emergency egress.'
      },
      {
        q: 'What statutory standards do HTI Fire Hydrant and Sprinkler systems conform to?',
        a: 'Our installations strictly comply with the National Building Code of India (NBC 2016), Tariff Advisory Committee (TAC) guidelines, and local Chief Fire Officer (CFO) statutory mandates, utilizing UL/FM approved sprinkler heads and heavy-class ISI certified piping.'
      },
      {
        q: 'What is the fire resistance rating of HTI Fire Doors and Shutters?',
        a: 'Our hollow metal fire doors and motorized fire shutters are independently tested and certified for 60, 120, and 240 minutes fire integrity in accordance with IS 3614 and BS 476 Part 20/22. They feature intumescent perimeter seals that expand under heat to block smoke infiltration.'
      },
      {
        q: 'Can the gas detection system trigger ventilation blowers automatically?',
        a: 'Yes. HTI gas transmitters feature configurable dual alarm setpoints (Warning at 20% LEL, Danger at 40% LEL). When gas thresholds are breached, onboard SPDT relays immediately trip industrial exhaust blowers, sound warning horns, and shut off fuel solenoid valves.'
      }
    ]
  },

  security: {
    key: 'security-systems',
    badgeLabel: 'PRODUCT',
    breadcrumbName: 'Surveillance & Alerts',
    titleLine1: 'Surveillance &',
    titleBlue: 'Alerts',
    description:
      'Enterprise 4K AI video surveillance, contactless biometrics, centralized VMS command centers, video door phones, and critical perimeter alert systems.',
    heroImage: '/products/surveillance-alerts-hero.jpg',
    heroAlt: 'HTI AI Surveillance & Integrated Security Command Center',
    stats: [
      { id: 'p', icon: Camera, val: '12,000+', lbl: 'CCTV Nodes Deployed' },
      { id: 's', icon: Cpu, val: 'Deep Learning', lbl: 'AI Video Analytics' },
      { id: 'c', icon: Bell, val: '0.5s', lbl: 'Critical Alert Dispatch' },
      { id: 'm', icon: MapPin, val: 'PAN India', lbl: 'Service Support' }
    ],
    solutionsTitle: 'Our Solutions',
    solutionsSubtitle: 'Intelligent AI surveillance, multi-factor biometric access, and 24/7 security monitoring.',
    solutions: [
      {
        id: 'ai-cctv',
        title: '4K AI CCTV Surveillance',
        slug: 'cctv-surveillance-systems',
        image: '/products/cctv-ip-4k-surveillance.jpg',
        schematicKey: 'ai-cctv'
      },
      {
        id: 'biometrics',
        title: 'Biometric Access & Attendance',
        slug: 'biometric-access-attendance',
        image: '/products/biometric-access-terminal.jpg',
        schematicKey: 'biometric-access'
      },
      {
        id: 'vdp',
        title: 'Video Door Phones & Intercoms',
        slug: 'video-door-phones',
        image: '/services/service-video-door-phones.jpg',
        schematicKey: 'video-door-phones'
      },
      {
        id: 'vms',
        title: 'Central VMS Command Systems',
        slug: 'central-vms-command-systems',
        image: '/hero-security-command-center.jpg',
        schematicKey: 'vms-command'
      },
      {
        id: 'thermal-beams',
        title: 'Thermal Perimeter Beams',
        slug: 'thermal-perimeter-beams',
        image: '/cctv-hero-ai.jpg',
        schematicKey: 'thermal-beams'
      },
      {
        id: 'intrusion-alarms',
        title: 'Intrusion Detection Alarms',
        slug: 'intrusion-detection-alarms',
        image: '/products/wireless-intrusion-detection.jpg',
        schematicKey: 'intrusion-detection'
      },
      {
        id: 'turnstiles-sec',
        title: 'Optical Speed Gates',
        slug: 'turnstiles-flap-barriers-speed-gates',
        image: '/products/optical-speed-turnstiles.jpg',
        schematicKey: 'turnstiles-access-control'
      },
      {
        id: 'flameproof-cctv',
        title: 'Flameproof ATEX Cameras',
        slug: 'cctv-surveillance-systems',
        image: '/products/cctv-biometrics.jpg',
        schematicKey: 'ai-cctv'
      }
    ],
    faqs: [
      {
        q: 'Do HTI CCTV surveillance systems include explosion-proof / flameproof cameras?',
        a: 'Yes. For pharmaceutical solvent storage, chemical synthesis, and hazardous areas, we supply ATEX and IECEx certified Flameproof (Ex-d Group IIA, IIB, IIC) camera housings in cast aluminum or stainless steel SS316.'
      },
      {
        q: 'How does AI Video Analytics (VCA) reduce false alarms in enterprise CCTV?',
        a: 'Our deep-learning algorithms classify movement into humans, vehicles, and non-target environmental noise (such as foliage, animals, or weather shadows). This reduces false alarms by over 95% while triggering instant security hooters upon virtual line crossing or perimeter intrusion.'
      },
      {
        q: 'Are your biometric access systems compliant with USFDA 21 CFR Part 11?',
        a: 'Yes. Our software provides encrypted, immutable audit trails, time-stamped entry logs, role-based operator permissions, dual-custody authorization, and automated compliance export capabilities required for USFDA and WHO-GMP audit scrutiny.'
      },
      {
        q: 'Can IP Video Door Phones integrate with the central command center?',
        a: 'Yes. HTI multi-apartment and industrial IP video door intercoms integrate seamlessly via SIP and ONVIF protocols into central VMS control rooms, guard consoles, and mobile apps for remote video verification and automated gate release.'
      }
    ]
  }
};

export default function ProductCategoryReferenceView({
  categoryKey,
  onNavigate,
  onQuickQuote
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Normalize categoryKey to match one of the 5 configs
  const cleanKey = (categoryKey || '').toLowerCase();
  let config = CATEGORY_PAGES_CONFIG.automation;
  if (cleanKey.includes('perim') || cleanKey.includes('traffic')) {
    config = CATEGORY_PAGES_CONFIG.perimeter;
  } else if (cleanKey.includes('cleanroom') || cleanKey.includes('pharma') || cleanKey.includes('interlock')) {
    config = CATEGORY_PAGES_CONFIG.cleanroom;
  } else if (cleanKey.includes('fire')) {
    config = CATEGORY_PAGES_CONFIG.fire;
  } else if (cleanKey.includes('sec') || cleanKey.includes('surveil') || cleanKey.includes('cctv')) {
    config = CATEGORY_PAGES_CONFIG.security;
  }

  const handleDownloadBrochure = () => {
    setToastMessage(`Official technical brochure for ${config.breadcrumbName} has been downloaded.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="hti-ref-page-wrapper">
      {/* Dynamic curved background swoosh matching reference mockup */}
      <div className="hti-ref-hero-swoosh-bg" aria-hidden="true">
        <svg viewBox="0 0 1440 520" fill="none" preserveAspectRatio="none" className="hti-ref-swoosh-svg">
          <path
            d="M 620 0 C 510 80 480 200 580 320 C 660 410 820 470 1120 490 L 1440 490 L 1440 0 Z"
            fill="url(#htiHeroSwooshGrad)"
          />
          <defs>
            <linearGradient id="htiHeroSwooshGrad" x1="15%" y1="20%" x2="95%" y2="5%">
              <stop offset="0%" stopColor="#EBF4FE" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#CBE2FD" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#82B7F4" stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Download Toast Notification */}
      {toastMessage && (
        <div className="hti-ref-toast" role="status">
          <CheckCircle2 size={18} className="hti-ref-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="hti-ref-container">
        {/* A. BREADCRUMB NAVIGATION */}
        <nav className="hti-ref-breadcrumbs" aria-label="Breadcrumb">
          <button
            type="button"
            className="hti-ref-breadcrumb-link"
            onClick={() => onNavigate && onNavigate('home')}
          >
            Home
          </button>
          <span className="hti-ref-breadcrumb-sep">&gt;</span>
          <button
            type="button"
            className="hti-ref-breadcrumb-link"
            onClick={() => onNavigate && onNavigate('catalog')}
          >
            Products
          </button>
          <span className="hti-ref-breadcrumb-sep">&gt;</span>
          <span className="hti-ref-breadcrumb-active">{config.breadcrumbName}</span>
        </nav>

        {/* B. SPLIT HERO SECTION */}
        <section className="hti-ref-hero">
          <div className="hti-ref-hero-left">
            <div className="hti-ref-product-badge">
              <span>{config.badgeLabel}</span>
            </div>

            <h1 className="hti-ref-hero-title">
              {config.titleLine1} <br />
              <span className="hti-ref-title-blue">{config.titleBlue}</span>
            </h1>

            <p className="hti-ref-hero-desc">{config.description}</p>

            <div className="hti-ref-hero-ctas">
              <button
                type="button"
                className="hti-ref-btn-quote"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <span>Get a Quote</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="hti-ref-btn-brochure"
                onClick={handleDownloadBrochure}
              >
                <FileText size={16} />
                <span>Download Brochure</span>
              </button>
            </div>
          </div>

          <div className="hti-ref-hero-right">
            <div className="hti-ref-hero-image-wrap">
              <img
                src={config.heroImage}
                alt={config.heroAlt}
                className="hti-ref-hero-image"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* C. TRUST & STATISTICS STRIP */}
        <section className="hti-ref-stats-strip" aria-label="Trust and key performance metrics">
          {config.stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="hti-ref-stat-card">
                <div className="hti-ref-stat-icon-wrap">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className="hti-ref-stat-info">
                  <div className="hti-ref-stat-val">{item.val}</div>
                  <div className="hti-ref-stat-lbl">{item.lbl}</div>
                </div>
              </div>
            );
          })}
        </section>

        {/* D. SOLUTIONS SECTION */}
        <section className="hti-ref-solutions-section">
          <div className="hti-ref-solutions-header">
            <div>
              <h2 className="hti-ref-solutions-heading">{config.solutionsTitle}</h2>
              <p className="hti-ref-solutions-subheading">{config.solutionsSubtitle}</p>
            </div>
            <button
              type="button"
              className="hti-ref-view-all-btn"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('catalog', config.key);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <span>View All Solutions</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="hti-ref-solutions-grid">
            {config.solutions.map((item) => {
              const SchematicRenderer = SolutionSchematics[item.schematicKey] || SolutionSchematics['automatic-sliding-doors'];
              return (
                <div
                  key={item.id}
                  className="hti-ref-solution-card"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('product', item.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (onNavigate) onNavigate('product', item.slug);
                    }
                  }}
                >
                  <div className="hti-ref-schematic-box">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="hti-ref-card-product-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <SchematicRenderer />
                    )}
                  </div>
                  <div className="hti-ref-card-bottom-row">
                    <h3 className="hti-ref-card-title">{item.title}</h3>
                    <div className="hti-ref-card-arrow-circle" aria-hidden="true">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* E. 4-PHASE TURNKEY ENGINEERING LIFECYCLE */}
        <section className="hti-ref-lifecycle-card">
          <h3 className="hti-ref-lifecycle-title">Our 4-Phase Turnkey Engineering Lifecycle</h3>
          <p className="hti-ref-lifecycle-subtitle">
            From concept to commissioning, we deliver a complete and hassle-free experience.
          </p>

          <div className="hti-ref-lifecycle-track">
            {/* Phase 01 */}
            <div className="hti-ref-phase-step">
              <div className="hti-ref-phase-top">
                <div className="hti-ref-phase-badge">01</div>
                <div className="hti-ref-phase-icon">
                  <FileText size={20} />
                </div>
              </div>
              <h4 className="hti-ref-phase-name">Site Analysis</h4>
              <p className="hti-ref-phase-desc">Understand requirements &amp; site conditions</p>
            </div>

            <div className="hti-ref-phase-arrow" aria-hidden="true">
              <ArrowRight size={18} />
            </div>

            {/* Phase 02 */}
            <div className="hti-ref-phase-step">
              <div className="hti-ref-phase-top">
                <div className="hti-ref-phase-badge">02</div>
                <div className="hti-ref-phase-icon">
                  <Settings size={20} />
                </div>
              </div>
              <h4 className="hti-ref-phase-name">Solution Design</h4>
              <p className="hti-ref-phase-desc">Design &amp; product selection</p>
            </div>

            <div className="hti-ref-phase-arrow" aria-hidden="true">
              <ArrowRight size={18} />
            </div>

            {/* Phase 03 */}
            <div className="hti-ref-phase-step">
              <div className="hti-ref-phase-top">
                <div className="hti-ref-phase-badge">03</div>
                <div className="hti-ref-phase-icon">
                  <Wrench size={20} />
                </div>
              </div>
              <h4 className="hti-ref-phase-name">Installation &amp; Testing</h4>
              <p className="hti-ref-phase-desc">Professional installation and rigorous testing</p>
            </div>

            <div className="hti-ref-phase-arrow" aria-hidden="true">
              <ArrowRight size={18} />
            </div>

            {/* Phase 04 */}
            <div className="hti-ref-phase-step">
              <div className="hti-ref-phase-top">
                <div className="hti-ref-phase-badge">04</div>
                <div className="hti-ref-phase-icon">
                  <Headphones size={20} />
                </div>
              </div>
              <h4 className="hti-ref-phase-name">Ongoing Support</h4>
              <p className="hti-ref-phase-desc">Maintenance and AMC support</p>
            </div>
          </div>
        </section>

        {/* F. FREQUENTLY ASKED QUESTIONS */}
        <section className="hti-ref-faq-section">
          <h2 className="hti-ref-faq-heading">Frequently Asked Questions</h2>
          <p className="hti-ref-faq-subheading">
            Key information about our {config.breadcrumbName.toLowerCase()} solutions.
          </p>

          <div className="hti-ref-faq-list">
            {config.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`hti-ref-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="hti-ref-faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <div className="hti-ref-faq-chevron">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="hti-ref-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
