import React from 'react';
import {
  DoorOpen,
  PanelsTopLeft,
  ShieldCheck,
  Fence,
  AlignJustify,
  Maximize2,
  ShieldAlert,
  Construction,
  Truck,
  ScanLine,
  CircleSlash,
  Radio,
  Camera,
  Fingerprint,
  Flame,
  Droplets,
  Activity,
  Clock,
  Volume2,
  PhoneCall,
  Server,
  Wind,
  Airplay,
  Droplet,
  RefreshCw,
  Sparkles,
  FileText,
  Zap,
  Layers,
  Disc,
  PackageCheck,
  DoorClosed,
  VolumeX,
  Bell,
  Cpu,
  Boxes
} from 'lucide-react';

/**
 * Category-based color palettes matching the reference screenshot:
 * - Access Automation: Blue (#0066FF) on pale-blue (#EFF6FF), border #DBEAFE
 * - Traffic & Perimeter: Orange (#EA580C) on pale-orange (#FFF7ED), border #FFEDD5
 * - Pharma Cleanroom: Teal (#0D9488) on pale-teal (#F0FDFA), border #CCFBF1
 * - Fire & Life Safety: Red (#DC2626) on pale-red (#FEF2F2), border #FEE2E2
 * - Surveillance & Alerts: Purple (#7C3AED) on pale-purple (#F5F3FF), border #EDE9FE
 * - Hygiene: Cyan (#0284C7) on pale-cyan (#F0F9FF), border #E0F2FE
 */
export const CATEGORY_PALETTES = {
  automation: {
    key: 'automation',
    label: 'Automation',
    iconColor: '#0066FF',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    badgeText: '#EA580C',
    badgeBg: '#FFF7ED',
    badgeBorder: '#FFEDD5'
  },
  traffic: {
    key: 'traffic',
    label: 'Traffic & Perimeter',
    iconColor: '#EA580C',
    bgColor: '#FFF7ED',
    borderColor: '#FFEDD5',
    badgeText: '#EA580C',
    badgeBg: '#FFF7ED',
    badgeBorder: '#FFEDD5'
  },
  cleanroom: {
    key: 'cleanroom',
    label: 'Cleanroom',
    iconColor: '#0D9488',
    bgColor: '#F0FDFA',
    borderColor: '#CCFBF1',
    badgeText: '#0D9488',
    badgeBg: '#CCFBF1',
    badgeBorder: '#99F6E4'
  },
  fire: {
    key: 'fire',
    label: 'Life Safety',
    iconColor: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FEE2E2',
    badgeText: '#DC2626',
    badgeBg: '#FEE2E2',
    badgeBorder: '#FECACA'
  },
  security: {
    key: 'security',
    label: 'Security System',
    iconColor: '#7C3AED',
    bgColor: '#F5F3FF',
    borderColor: '#EDE9FE',
    badgeText: '#7C3AED',
    badgeBg: '#F3E8FF',
    badgeBorder: '#E9D5FF'
  },
  hygiene: {
    key: 'hygiene',
    label: 'Hygiene',
    iconColor: '#0284C7',
    bgColor: '#F0F9FF',
    borderColor: '#E0F2FE',
    badgeText: '#0284C7',
    badgeBg: '#F0F9FF',
    badgeBorder: '#E0F2FE'
  }
};

/**
 * Returns the matching category palette for any product
 */
export function getProductCategoryTheme(product = {}) {
  const cat = (product.category || '').toLowerCase();
  const sub = (product.subcategory || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  const slug = (product.slug || '').toLowerCase();

  // 1. Hygiene
  if (cat.includes('hyg') || sub.includes('wash') || slug.includes('hand-dryer') || slug.includes('soap')) {
    return CATEGORY_PALETTES.hygiene;
  }

  // 2. Traffic & Perimeter Defense
  if (
    cat.includes('traffic') ||
    cat.includes('perim') ||
    sub.includes('perimeter') ||
    sub.includes('vehicle') ||
    slug.includes('boom-barrier') ||
    slug.includes('cantilever') ||
    slug.includes('bollard') ||
    slug.includes('car-lift') ||
    name.includes('boom barrier') ||
    name.includes('cantilever') ||
    name.includes('bollards')
  ) {
    return CATEGORY_PALETTES.traffic;
  }

  // 3. Cleanroom & Pharma
  if (
    cat.includes('cleanroom') ||
    cat.includes('pharma') ||
    sub.includes('clean room') ||
    sub.includes('material transfer') ||
    slug.includes('pass-box') ||
    slug.includes('interlock') ||
    slug.includes('chiller') ||
    slug.includes('acoustic') ||
    slug.includes('buzzer') ||
    slug.includes('clock') ||
    name.includes('pass box') ||
    name.includes('door interlock') ||
    name.includes('cleanroom')
  ) {
    return CATEGORY_PALETTES.cleanroom;
  }

  // 4. Fire & Life Safety
  if (
    cat.includes('fire') ||
    cat.includes('life') ||
    sub.includes('fire') ||
    sub.includes('life safety') ||
    slug.includes('fire') ||
    slug.includes('gas-detection') ||
    name.includes('fire') ||
    name.includes('gas detection')
  ) {
    return CATEGORY_PALETTES.fire;
  }

  // 5. CCTV, Surveillance & Biometrics
  if (
    cat.includes('sec') ||
    sub.includes('video') ||
    sub.includes('access & identity') ||
    sub.includes('telephony') ||
    sub.includes('it infra') ||
    slug.includes('cctv') ||
    slug.includes('biometric') ||
    slug.includes('public-address') ||
    slug.includes('server-room') ||
    name.includes('cctv') ||
    name.includes('biometric') ||
    name.includes('public address') ||
    name.includes('server room') ||
    name.includes('ip-pbx')
  ) {
    return CATEGORY_PALETTES.security;
  }

  // 6. Default to Access Automation
  return CATEGORY_PALETTES.automation;
}

/**
 * Returns a unique, meaningful Lucide React icon component for every product
 */
export function getProductIconComponent(product = {}) {
  const id = Number(product.id);
  const slug = (product.slug || '').toLowerCase();
  const name = (product.name || '').toLowerCase();

  // 1. Direct Stable ID Mapping (from SQLite Database)
  switch (id) {
    case 1:
      return DoorOpen; // Door Interlock System
    case 2:
      return PanelsTopLeft; // Automatic Sliding & Swing Doors
    case 3:
      return ShieldCheck; // Automatic Sliding & Swing Gates
    case 4:
      return Fence; // Telescopic & Cantilever Gates
    case 5:
      return AlignJustify; // PVC Rapid Roll Up Door
    case 6:
      return Maximize2; // Sectional Overhead Door
    case 7:
      return ShieldAlert; // Fire Rated Doors & Shutters
    case 8:
      return Construction; // Automatic Boom Barrier
    case 9:
      return Truck; // Dock Levellers & Dock Shelters
    case 10:
      return ScanLine; // Turnstiles & Flap Barriers
    case 11:
      return CircleSlash; // Bollards, Tyre Killers & Car Lifts
    case 12:
      return Radio; // RFID Long Range Readers & Barcode Scanners
    case 13:
      return Camera; // CCTV Surveillance System
    case 14:
      return Fingerprint; // Biometric Access Control & Time Attendance
    case 15:
      return Flame; // Fire Alarm System (Conventional & Addressable)
    case 16:
      return Droplets; // Turnkey Fire Fighting Systems
    case 17:
      return Activity; // Gas Detection System
    case 18:
      return Clock; // Digital & GPS Synchronized Clocks
    case 19:
      return Volume2; // Public Address (PA) System
    case 20:
      return PhoneCall; // IP-PBX & EPABX Unified Communications
    case 21:
      return Server; // Server Room Environmental Monitoring
    case 22:
      return Wind; // Automatic High Speed Hand Dryers
    case 23:
      return Airplay; // Industrial & Commercial Air Curtains
    case 24:
      return Droplet; // Automatic Sensor Taps
    case 25:
      return RefreshCw; // Automatic Urinal Flush Valves
    case 26:
      return Sparkles; // Automatic Liquid Soap & Sanitizer Dispenser
    case 27:
      return FileText; // Automatic Paper Tissue Dispenser
    case 28:
      return Zap; // Automatic Shoe Shine Machine
    case 29:
      return Layers; // PVC Strip Curtains (Grade A+)
    case 30:
      return Disc; // Spot Extractor & Industrial Blowers
    default:
      break;
  }

  // 2. Slug & Keyword Fallback for Dynamic or Custom Products
  if (slug.includes('interlock') || name.includes('interlock')) return DoorOpen;
  if (slug.includes('sliding') || name.includes('sliding')) return PanelsTopLeft;
  if (slug.includes('cantilever') || name.includes('cantilever') || name.includes('telescopic')) return Fence;
  if (slug.includes('roll-up') || name.includes('roll up') || name.includes('rapid')) return AlignJustify;
  if (slug.includes('sectional') || name.includes('sectional')) return Maximize2;
  if (slug.includes('boom-barrier') || name.includes('boom barrier')) return Construction;
  if (slug.includes('dock') || name.includes('dock')) return Truck;
  if (slug.includes('turnstile') || slug.includes('barrier') || name.includes('turnstile') || name.includes('flap')) return ScanLine;
  if (slug.includes('bollard') || slug.includes('tyre') || name.includes('bollard')) return CircleSlash;
  if (slug.includes('rfid') || name.includes('rfid')) return Radio;
  if (slug.includes('cctv') || name.includes('cctv') || name.includes('camera')) return Camera;
  if (slug.includes('biometric') || name.includes('biometric') || name.includes('fingerprint')) return Fingerprint;
  if (slug.includes('fire-alarm') || name.includes('fire alarm')) return Flame;
  if (slug.includes('fire-fighting') || name.includes('fighting') || name.includes('sprinkler')) return Droplets;
  if (slug.includes('gas') || name.includes('gas detection')) return Activity;
  if (slug.includes('clock') || name.includes('clock')) return Clock;
  if (slug.includes('public-address') || name.includes('public address') || name.includes('pa system')) return Volume2;
  if (slug.includes('epabx') || slug.includes('pbx') || name.includes('epabx')) return PhoneCall;
  if (slug.includes('server') || name.includes('server room')) return Server;
  if (slug.includes('pass-box') || name.includes('pass box')) return PackageCheck;
  if (slug.includes('chiller') || name.includes('chiller')) return DoorClosed;
  if (slug.includes('acoustic') || name.includes('acoustic')) return VolumeX;
  if (slug.includes('buzzer') || name.includes('buzzer')) return Bell;
  if (slug.includes('hand-dryer') || name.includes('dryer')) return Wind;
  if (slug.includes('air-curtain') || name.includes('curtain')) return Airplay;
  if (slug.includes('tap') || name.includes('tap')) return Droplet;
  if (slug.includes('flush') || name.includes('flush')) return RefreshCw;
  if (slug.includes('soap') || name.includes('soap')) return Sparkles;
  if (slug.includes('tissue') || name.includes('tissue')) return FileText;
  if (slug.includes('shoe') || name.includes('shoe')) return Zap;

  return Cpu;
}

/**
 * Reusable Product Icon Box Component
 * Renders the unique product SVG icon centered inside a category-styled rounded container
 */
export function ProductIconBox({ product = {}, size = 44, iconSize = 22, className = '' }) {
  const theme = getProductCategoryTheme(product);
  const IconComponent = getProductIconComponent(product);

  return (
    <div
      className={`adm-product-icon-container ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        backgroundColor: theme.bgColor,
        borderColor: theme.borderColor,
        color: theme.iconColor
      }}
      title={`${product.name} (${theme.label})`}
    >
      <IconComponent size={iconSize} strokeWidth={2} />
    </div>
  );
}

export default ProductIconBox;
