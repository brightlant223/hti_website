import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Radio, Zap, Server } from 'lucide-react';
import '../AutomaticDoorsDetail.css';

export default function DigitalClockDemo() {
  // Lazy initialiser keeps `new Date()` out of the render body
  const [time, setTime] = useState(() => new Date());
  const [isPlaying, setIsPlaying] = useState(true);
  const [is24Hour, setIs24Hour] = useState(true);
  const [ledColor, setLedColor] = useState('red'); // 'red' | 'green'
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('GPS Synchronized · 8 Satellites');

  // Clock tick timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Format hours, minutes, seconds
  let hours = time.getHours();
  const rawMinutes = time.getMinutes();
  const rawSeconds = time.getSeconds();

  let ampm = '';
  if (!is24Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
  }

  const pad = (n) => String(n).padStart(2, '0');
  const displayHours = pad(hours);
  const displayMinutes = pad(rawMinutes);
  const displaySeconds = pad(rawSeconds);

  // Manual GPS/NTP sync pulse simulation
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setSyncStatus('Initiating GPS/NTP Master Sync...');
    setTimeout(() => {
      setTime(new Date());
      setIsSyncing(false);
      setSyncStatus('Sync Complete · Offset ±0.001s (Verified)');
      setTimeout(() => {
        setSyncStatus('GPS Synchronized · 8 Satellites');
      }, 3500);
    }, 900);
  };

  const handleReset = () => {
    setTime(new Date());
    setIsPlaying(true);
    setIs24Hour(true);
    setLedColor('red');
    setSyncStatus('GPS Synchronized · 8 Satellites');
  };

  const colorClass = ledColor === 'green' ? 'led-theme-green' : 'led-theme-red';

  return (
    <div className="cleanroom-demo-panel clock-demo-panel">
      {/* Top Header Bar */}
      <div className="demo-top-bar">
        <div className="demo-badge-wrap">
          <span className="demo-live-dot" />
          <span className="demo-pill-tag">ILLUSTRATIVE PRODUCT DEMONSTRATION</span>
        </div>
        <div className="demo-controls-btns">
          <button
            type="button"
            className="demo-ctrl-btn"
            onClick={() => setIsPlaying(p => !p)}
            aria-label={isPlaying ? 'Pause digital clock display' : 'Resume digital clock display'}
            title={isPlaying ? 'Pause display tick' : 'Resume live time'}
          >
            {isPlaying ? (
              <>
                <Pause size={12} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={12} />
                <span>Run</span>
              </>
            )}
          </button>
          <button
            type="button"
            className="demo-ctrl-btn"
            onClick={handleReset}
            aria-label="Reset digital clock demo to current time"
            title="Reset to current local time"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Industrial Master Clock Display Bezel */}
      <div className={`clock-master-frame ${colorClass}`}>
        {/* Frame Screws/Bolts Top Bar */}
        <div className="clock-frame-header">
          <div className="clock-brand-label">
            <span className="clock-brand-dot" />
            <span>HTI TIME SYSTEMS · MASTER UNIT</span>
          </div>
          <div className={`clock-sync-pill ${isSyncing ? 'pulse-sync' : ''}`}>
            <Radio size={11} className={isSyncing ? 'spin-icon' : ''} />
            <span>{isSyncing ? 'RECEIVING UTC SIGNAL...' : 'GPS LOCKED'}</span>
          </div>
        </div>

        {/* LED 7-Segment Digital Readout Display Screen */}
        <div className="clock-screen-bezel">
          <div className="clock-digit-group">
            <span className="clock-digit">{displayHours}</span>
          </div>
          <span className={`clock-colon ${isPlaying ? 'blink' : ''}`}>:</span>
          <div className="clock-digit-group">
            <span className="clock-digit">{displayMinutes}</span>
          </div>
          <span className={`clock-colon ${isPlaying ? 'blink' : ''}`}>:</span>
          <div className="clock-digit-group">
            <span className="clock-digit">{displaySeconds}</span>
          </div>

          {!is24Hour && (
            <div className="clock-ampm-badge">
              <span className="ampm-text">{ampm}</span>
            </div>
          )}
        </div>

        {/* Status Indicators & Metadata Ribbon */}
        <div className="clock-meta-ribbon">
          <div className="clock-meta-item">
            <span className="clock-meta-key">FORMAT:</span>
            <span className="clock-meta-val">{is24Hour ? '24-HOUR (HH:MM:SS)' : `12-HOUR (${ampm})`}</span>
          </div>
          <div className="clock-meta-item">
            <span className="clock-meta-key">STATUS:</span>
            <span className="clock-meta-val highlight">{syncStatus}</span>
          </div>
          <div className="clock-meta-item">
            <span className="clock-meta-key">POWER:</span>
            <span className="clock-meta-val">230V AC / RTC BACKUP</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar: 12/24H, Color, and Trigger Sync */}
      <div className="clock-interactive-toolbar">
        <div className="clock-toggle-group">
          <span className="clock-toolbar-label">Time Format:</span>
          <button
            type="button"
            className={`clock-tool-btn ${is24Hour ? 'active' : ''}`}
            onClick={() => setIs24Hour(true)}
          >
            24-Hour
          </button>
          <button
            type="button"
            className={`clock-tool-btn ${!is24Hour ? 'active' : ''}`}
            onClick={() => setIs24Hour(false)}
          >
            12-Hour
          </button>
        </div>

        <div className="clock-toggle-group">
          <span className="clock-toolbar-label">LED Color:</span>
          <button
            type="button"
            className={`clock-tool-btn color-red-btn ${ledColor === 'red' ? 'active' : ''}`}
            onClick={() => setLedColor('red')}
          >
            <span className="color-swatch swatch-red" />
            Red LED
          </button>
          <button
            type="button"
            className={`clock-tool-btn color-green-btn ${ledColor === 'green' ? 'active' : ''}`}
            onClick={() => setLedColor('green')}
          >
            <span className="color-swatch swatch-green" />
            Green LED
          </button>
        </div>

        <button
          type="button"
          className="clock-sync-trigger-btn"
          onClick={handleTriggerSync}
          disabled={isSyncing}
        >
          <Zap size={13} className="text-amber-400" />
          <span>Simulate GPS Sync</span>
        </button>
      </div>

      {/* Simulated Multi-Display Deployment Across Operational Zones */}
      <div className="clock-multi-zones-section">
        <div className="clock-multi-header">
          <div className="clock-multi-title">
            <Server size={13} className="text-sky-400" />
            <span>Simulated Multi-Display Deployment (Synchronized Slave Units)</span>
          </div>
          <span className="clock-multi-tag">ILLUSTRATIVE TOPOLOGY</span>
        </div>

        <div className="clock-zones-grid">
          {/* Zone 1: Shopfloor / Manufacturing */}
          <div className="clock-zone-card">
            <div className="clock-zone-header">
              <span className="zone-name">Zone 01 · Production Shopfloor</span>
              <span className="zone-badge">4-Inch Display</span>
            </div>
            <div className={`clock-zone-readout ${colorClass}`}>
              <span>{displayHours}:{displayMinutes}:{displaySeconds}</span>
              {!is24Hour && <span className="zone-ampm">{ampm}</span>}
            </div>
            <div className="zone-status-row">
              <span className="zone-dot active" />
              <span>Wall-Mount SS304 · Synced</span>
            </div>
          </div>

          {/* Zone 2: Cleanroom Airlock */}
          <div className="clock-zone-card">
            <div className="clock-zone-header">
              <span className="zone-name">Zone 02 · Cleanroom Corridor</span>
              <span className="zone-badge">2-Inch Flush Panel</span>
            </div>
            <div className={`clock-zone-readout ${colorClass}`}>
              <span>{displayHours}:{displayMinutes}:{displaySeconds}</span>
              {!is24Hour && <span className="zone-ampm">{ampm}</span>}
            </div>
            <div className="zone-status-row">
              <span className="zone-dot active" />
              <span>Flush Mount Panel · Synced</span>
            </div>
          </div>

          {/* Zone 3: Control Room / QC Lab */}
          <div className="clock-zone-card">
            <div className="clock-zone-header">
              <span className="zone-name">Zone 03 · Main Control Room</span>
              <span className="zone-badge">6-Inch Large Format</span>
            </div>
            <div className={`clock-zone-readout ${colorClass}`}>
              <span>{displayHours}:{displayMinutes}:{displaySeconds}</span>
              {!is24Hour && <span className="zone-ampm">{ampm}</span>}
            </div>
            <div className="zone-status-row">
              <span className="zone-dot active" />
              <span>NTP Network Linked · Synced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Disclaimer Note */}
      <p className="demo-disclaimer-note">
        Illustrative product demonstration. Digital clocks and time display systems can be configured with single or multi-display synchronized networks (GPS antenna receiver or NTP Ethernet), custom digit heights (2", 4", 6"), and industrial Stainless Steel or flameproof enclosures based on facility requirements.
      </p>
    </div>
  );
}
