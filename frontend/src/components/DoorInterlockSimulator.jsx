import React, { useState } from 'react';
import { 
  ArrowRight, 
  Lock, 
  Unlock, 
  RotateCcw, 
  Compass, 
  Shield, 
  Users, 
  PhoneCall, 
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Activity,
  Wind,
  Radio
} from 'lucide-react';

export default function DoorInterlockSimulator({ onInquireInterlock }) {
  const [doorAOpen, setDoorAOpen] = useState(false);
  const [doorBOpen, setDoorBOpen] = useState(false);
  const [differentialPressure, setDifferentialPressure] = useState(10);
  const [isEmergency, setIsEmergency] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    '[10:24:11] Request to open Door A.',
    '[10:24:11] Checking interlock conditions...',
    '[10:24:11] Door A opened. Other doors locked.'
  ]);

  const getTimeString = () => {
    const now = new Date();
    return `[${now.toTimeString().split(' ')[0]}]`;
  };

  const handleOpenDoorA = () => {
    if (isEmergency) {
      setTerminalLogs(prev => [
        `${getTimeString()} [MANUAL] Emergency override is engaged. Door A status toggled.`,
        ...prev.slice(0, 3)
      ]);
      setDoorAOpen(!doorAOpen);
      return;
    }
    if (doorBOpen) {
      setTerminalLogs(prev => [
        `${getTimeString()} [INTERLOCK ACTIVE] Door B is currently open. Door A access denied!`,
        ...prev.slice(0, 3)
      ]);
      return;
    }
    const newA = !doorAOpen;
    setDoorAOpen(newA);
    if (newA) {
      setDifferentialPressure(15);
      setTerminalLogs(prev => [
        `${getTimeString()} Door A opened. Door B 600lbs EM-Lock energized.`,
        `${getTimeString()} Cleanroom differential pressure peaked to +15 Pa.`,
        ...prev.slice(0, 2)
      ]);
    } else {
      setDifferentialPressure(10);
      setTerminalLogs(prev => [
        `${getTimeString()} Door A closed & hermetically sealed. Airlock restored (+10 Pa).`,
        ...prev.slice(0, 3)
      ]);
    }
  };

  const handleOpenDoorB = () => {
    if (isEmergency) {
      setTerminalLogs(prev => [
        `${getTimeString()} [MANUAL] Emergency override is engaged. Door B status toggled.`,
        ...prev.slice(0, 3)
      ]);
      setDoorBOpen(!doorBOpen);
      return;
    }
    if (doorAOpen) {
      setTerminalLogs(prev => [
        `${getTimeString()} [INTERLOCK ACTIVE] Door A is currently open. Door B access denied!`,
        ...prev.slice(0, 3)
      ]);
      return;
    }
    const newB = !doorBOpen;
    setDoorBOpen(newB);
    if (newB) {
      setDifferentialPressure(15);
      setTerminalLogs(prev => [
        `${getTimeString()} Door B opened. Door A 600lbs EM-Lock energized.`,
        `${getTimeString()} Cleanroom differential pressure peaked to +15 Pa.`,
        ...prev.slice(0, 2)
      ]);
    } else {
      setDifferentialPressure(10);
      setTerminalLogs(prev => [
        `${getTimeString()} Door B closed & hermetically sealed. Airlock restored (+10 Pa).`,
        ...prev.slice(0, 3)
      ]);
    }
  };

  const handleToggleEmergency = () => {
    if (!isEmergency) {
      setIsEmergency(true);
      setDoorAOpen(true);
      setDoorBOpen(true);
      setDifferentialPressure(0);
      setTerminalLogs(prev => [
        `${getTimeString()} ⚠️ [PANIC TRIP] Fire / Evacuation Signal Triggered!`,
        `${getTimeString()} ⚠️ [FAIL-SAFE] All electromagnetic locks released for life safety.`,
        ...prev.slice(0, 2)
      ]);
    } else {
      setIsEmergency(false);
      setDoorAOpen(false);
      setDoorBOpen(false);
      setDifferentialPressure(10);
      setTerminalLogs(prev => [
        `${getTimeString()} [RESTORE] Emergency trip cleared. Logic returned to Standby (+10 Pa).`,
        ...prev.slice(0, 3)
      ]);
    }
  };

  const handleResetAll = () => {
    setIsEmergency(false);
    setDoorAOpen(false);
    setDoorBOpen(false);
    setDifferentialPressure(10);
    setTerminalLogs([
      `${getTimeString()} Interlock System re-initialized. Standby mode active (+10 Pa).`,
      `${getTimeString()} Both doors sealed & monitored by HTI Cleanroom Controller.`
    ]);
  };

  const handleSimulateCycle = () => {
    setIsEmergency(false);
    setDoorBOpen(false);
    setDoorAOpen(true);
    setDifferentialPressure(15);
    setTerminalLogs([
      `${getTimeString()} Personnel transit cycle initiated.`,
      `${getTimeString()} Checking interlock conditions... Door B magnetic lock ENERGIZED.`,
      `${getTimeString()} Door A opened. Personnel entered airlock chamber.`
    ]);

    setTimeout(() => {
      setDoorAOpen(false);
      setDifferentialPressure(10);
      setTerminalLogs(prev => [
        `${getTimeString()} Door A sealed. UV purge delay complete.`,
        `${getTimeString()} Door B access authorized. Cleanroom entry permitted.`,
        ...prev.slice(0, 2)
      ]);
    }, 2800);
  };

  const whyChooseItems = [
    {
      icon: Compass,
      title: 'Turnkey Design & Execution',
      desc: 'Complete end-to-end site survey, architecture blueprint, installation & commissioning.',
      badge: 'END-TO-END',
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.1)',
      border: 'rgba(2, 132, 199, 0.25)'
    },
    {
      icon: Shield,
      title: 'Top Tier Global OEM Brands',
      desc: 'Tested industrial hardware with heavy-duty duty cycles & rugged zero-downtime motors.',
      badge: 'CERTIFIED OEM',
      color: '#e63946',
      bg: 'rgba(230, 57, 70, 0.1)',
      border: 'rgba(230, 57, 70, 0.25)'
    },
    {
      icon: Users,
      title: 'Experienced Engineering Team',
      desc: 'Deep domain expertise across pharma cleanrooms, multi-tier corporate IT & industrial gates.',
      badge: '12+ YRS EXP',
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.1)',
      border: 'rgba(5, 150, 105, 0.25)'
    },
    {
      icon: ShieldCheck,
      title: 'Strict USFDA & cGMP Compliance',
      desc: 'Pre-validated 21 CFR Part 11 compliant logic, flameproof Ex-d enclosures & audit documentations.',
      badge: 'REGULATORY READY',
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.1)',
      border: 'rgba(124, 58, 237, 0.25)'
    },
    {
      icon: PhoneCall,
      title: '24/7 Rapid After-Sales SLA Support',
      desc: 'Prompt on-site emergency call-out, comprehensive AMC contracts & original spare parts support.',
      badge: '24/7 RAPID SLA',
      color: '#d97706',
      bg: 'rgba(217, 119, 6, 0.1)',
      border: 'rgba(217, 119, 6, 0.25)'
    }
  ];

  return (
    <section id="interlock-demo" className="interlock-why-section">
      <div className="container">
        <div className="interlock-why-grid">
          {/* Left Column: Door Interlock Logic Simulator */}
          <div className="interlock-column-card">
            <div className="pill-badge-blue">INTERACTIVE DEMO</div>
            <h2 className="section-title-large">
              Door Interlock <span className="title-highlight-blue">Logic Simulator</span>
            </h2>
            <p className="interlock-subtitle">
              Experience how multi-door interlocking works in a clean room environment.
            </p>

            {/* 3 Simulation Modules */}
            <div className="interlock-stages-row">
              {/* Door A Box */}
              <div className={`door-module-box ${doorAOpen ? 'is-open' : 'is-locked'}`}>
                <div className="door-module-name">DOOR A</div>
                <div className="door-graphic-frame">
                  <div className={`door-graphic-leaf ${doorAOpen ? 'graphic-open' : ''}`}>
                    <div className="door-glass-window"></div>
                    <div className="door-handle"></div>
                  </div>
                </div>
                <button 
                  className={`btn-door-status ${doorAOpen ? 'status-open' : 'status-btn-action'}`}
                  onClick={handleOpenDoorA}
                >
                  {doorAOpen ? <Unlock size={12} /> : <Lock size={12} />}
                  <span>{doorAOpen ? 'Close' : 'Open'}</span>
                </button>
              </div>

              {/* Central Controller Box */}
              <div className="interlock-center-module">
                <div className="interlock-brand-tag">INTERLOCK SYSTEM</div>
                <div className="pressure-number-display">+{differentialPressure} Pa</div>
                <div className="pressure-sub-label">
                  Maintain Required<br />Pressure Differential
                </div>
                <div className="indicator-dots-row">
                  <span className={`dot-led ${doorAOpen ? 'active-green' : 'idle-blue'}`}></span>
                  <span className="dot-led active-blue"></span>
                  <span className={`dot-led ${doorBOpen ? 'active-green' : 'idle-blue'}`}></span>
                </div>
              </div>

              {/* Door B Box */}
              <div className={`door-module-box ${doorBOpen ? 'is-open' : 'is-locked'}`}>
                <div className="door-module-name">DOOR B</div>
                <div className="door-graphic-frame">
                  <div className={`door-graphic-leaf ${doorBOpen ? 'graphic-open' : ''}`}>
                    <div className="door-glass-window"></div>
                    <div className="door-handle"></div>
                  </div>
                </div>
                <button 
                  className={`btn-door-status ${doorBOpen ? 'status-open' : doorAOpen ? 'status-locked' : 'status-btn-action'}`}
                  onClick={handleOpenDoorB}
                >
                  {doorBOpen ? <Unlock size={12} /> : <Lock size={12} />}
                  <span>{doorBOpen ? 'Close' : doorAOpen ? 'Locked' : 'Open'}</span>
                </button>
              </div>
            </div>

            {/* Realtime PLC Diagnostics & Air Barrier Telemetry (Fills vertical void with interactive engineering controls) */}
            <div className="interlock-telemetry-dashboard">
              <div className="telemetry-header">
                <div className="telemetry-live-indicator">
                  <span className="telemetry-ping-dot"></span>
                  <span className="telemetry-tag">REALTIME PLC LOGIC & PRESSURE TELEMETRY</span>
                </div>
                <div className="telemetry-mode-badge">
                  <Activity size={12} />
                  <span>21 CFR PART 11 READY</span>
                </div>
              </div>

              <div className="telemetry-metrics-grid">
                <div className="telemetry-metric-item">
                  <div className="metric-icon-wrap text-blue">
                    <Wind size={16} />
                  </div>
                  <div className="metric-data">
                    <span className="metric-val">{differentialPressure > 0 ? `+${differentialPressure} Pa` : '0 Pa (Neutral)'}</span>
                    <span className="metric-label">Cascade Differential</span>
                  </div>
                  <div className={`metric-status-pill ${differentialPressure > 10 ? 'status-peak' : 'status-nominal'}`}>
                    {differentialPressure > 10 ? 'Peak Pressure' : 'Nominal Barrier'}
                  </div>
                </div>

                <div className="telemetry-metric-item">
                  <div className="metric-icon-wrap text-emerald">
                    <Radio size={16} />
                  </div>
                  <div className="metric-data">
                    <span className="metric-val">{isEmergency ? 'DE-ENERGIZED' : (doorAOpen || doorBOpen ? 'ACTIVE (600 LBS)' : 'STANDBY')}</span>
                    <span className="metric-label">Magnetic Interlock</span>
                  </div>
                  <div className={`metric-status-pill ${isEmergency ? 'status-alarm' : (doorAOpen || doorBOpen ? 'status-locked' : 'status-ready')}`}>
                    {isEmergency ? 'Fire Override' : (doorAOpen || doorBOpen ? 'Airlock Sealed' : 'Armed & Ready')}
                  </div>
                </div>

                <div className="telemetry-metric-item">
                  <div className="metric-icon-wrap text-purple">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="metric-data">
                    <span className="metric-val">ISO Class 5</span>
                    <span className="metric-label">Cleanroom Compliance</span>
                  </div>
                  <div className="metric-status-pill status-cert">
                    cGMP Grade A/B
                  </div>
                </div>
              </div>

              {/* Dynamic Logic Status Narrative & Emergency Override Toolbar */}
              <div className="telemetry-control-strip">
                <div className="telemetry-status-narrative">
                  <span className="narrative-bullet"></span>
                  <span className="narrative-text">
                    {isEmergency 
                      ? '⚠️ FIRE / PANIC OVERRIDE ACTIVE: All magnetic locks released for emergency life-safety egress.'
                      : doorAOpen 
                        ? '🔒 Door A open: Door B magnetic lock ENERGIZED. Differential positive air barrier maintained.'
                        : doorBOpen 
                          ? '🔒 Door B open: Door A magnetic lock ENERGIZED. Contamination cascade prevented.'
                          : '✅ Standby State: Both doors closed & hermetically sealed. Ready for single-person transit.'}
                  </span>
                </div>

                <div className="telemetry-action-buttons">
                  <button 
                    className={`btn-telemetry-toggle ${isEmergency ? 'btn-active-emergency' : ''}`}
                    onClick={handleToggleEmergency}
                    title="Simulate Fire Alarm / Panic Release"
                  >
                    <AlertTriangle size={13} />
                    <span>{isEmergency ? 'Restore System' : 'Fire Alarm Trip'}</span>
                  </button>

                  <button 
                    className="btn-telemetry-reset"
                    onClick={handleResetAll}
                    title="Reset Simulator to Standby"
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dark Console Terminal Log Box */}
            <div className="terminal-event-box">
              <div className="terminal-lines-col">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="terminal-line">{log}</div>
                ))}
              </div>

              <button className="btn-terminal-action" onClick={handleSimulateCycle}>
                <span>Try Live Simulation</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Column: Why Choose HTI? */}
          <div className="why-choose-column-card">
            <div className="why-choose-backdrop-wrap">
              <img
                src="/hero-hti-building-collage.png"
                alt="HTI corporate facility and engineering team"
                className="why-backdrop-img"
                loading="lazy"
              />
              <div className="why-backdrop-overlay"></div>
            </div>

            <div className="why-choose-content">
              <div className="why-header-top">
                <span className="pill-badge-red">
                  <Sparkles size={12} className="badge-sparkle-icon" />
                  THE HTI ADVANTAGE
                </span>
                <span className="why-iso-badge">ISO 9001:2015 READY</span>
              </div>

              <h2 className="section-title-large why-title">
                Why Choose <span className="title-highlight-red">HTI?</span>
              </h2>
              <p className="why-choose-subtitle">
                Engineered for high-throughput corporate facilities & sterile pharmaceutical cleanrooms.
              </p>

              <div className="why-choose-list">
                {whyChooseItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="why-item-card">
                      <div 
                        className="why-icon-bubble" 
                        style={{ backgroundColor: item.bg, color: item.color, borderColor: item.border }}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="why-text-box">
                        <div className="why-title-row">
                          <h4 className="why-item-title">{item.title}</h4>
                          <span 
                            className="why-item-badge" 
                            style={{ color: item.color, backgroundColor: item.bg, borderColor: item.border }}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <p className="why-item-desc">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Interactive Engineering Banner */}
              <div className="why-bottom-banner">
                <div className="why-banner-meta">
                  <div className="why-meta-stat">
                    <span className="why-stat-number">100+</span>
                    <span className="why-stat-text">Pharma & Industrial Sites</span>
                  </div>
                  <div className="why-meta-sep"></div>
                  <div className="why-meta-stat">
                    <span className="why-stat-number">24/7</span>
                    <span className="why-stat-text">Dedicated SLA Dispatch</span>
                  </div>
                </div>

                <button 
                  className="btn-why-consult"
                  onClick={() => onInquireInterlock && onInquireInterlock('Free Technical Consultation')}
                >
                  <span>Request Engineering Proposal</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
