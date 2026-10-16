import React, { useState, useEffect } from 'react';
import { ShieldAlert, KeyRound, Lock, Unlock, Wind, AlertTriangle, CheckCircle, RotateCcw, Cpu } from 'lucide-react';

export default function DoorInterlockSimulator({ onInquireInterlock }) {
  // states: 'IDLE', 'DOOR_A_OPEN', 'PRESSURE_DELAY', 'DOOR_B_OPEN', 'EMERGENCY'
  const [systemState, setSystemState] = useState('IDLE');
  const [pressureTimer, setPressureTimer] = useState(0);
  const [log, setLog] = useState([
    'System Initialized: All doors closed. Interlock loop energized.'
  ]);

  const addLog = (msg) => {
    setLog((prev) => [msg, ...prev.slice(0, 4)]);
  };

  useEffect(() => {
    let interval = null;
    if (systemState === 'PRESSURE_DELAY') {
      interval = setInterval(() => {
        setPressureTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            setSystemState('IDLE');
            addLog('Pressure balanced (+30 Pa). Interlock loop ready for next cycle.');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [systemState]);

  const handleRequestDoorA = () => {
    if (systemState === 'EMERGENCY') {
      addLog('Action Rejected: System is in EMERGENCY OVERRIDE mode.');
      return;
    }
    if (systemState === 'DOOR_B_OPEN') {
      addLog('Access Denied at Door A: Door B is currently OPEN! Interlock prohibits simultaneous entry.');
      return;
    }
    if (systemState === 'PRESSURE_DELAY') {
      addLog('Wait: Pressure differential stabilization timer active.');
      return;
    }

    setSystemState('DOOR_A_OPEN');
    addLog('Step 1-3 Verified: Door B verified CLOSED. Door A lock energized & OPENED.');
  };

  const handleRequestDoorB = () => {
    if (systemState === 'EMERGENCY') {
      addLog('Action Rejected: System is in EMERGENCY OVERRIDE mode.');
      return;
    }
    if (systemState === 'DOOR_A_OPEN') {
      addLog('Access Denied at Door B: Door A is currently OPEN! Interlock prohibits simultaneous entry.');
      return;
    }
    if (systemState === 'PRESSURE_DELAY') {
      addLog('Wait: Pressure differential stabilization timer active.');
      return;
    }

    setSystemState('DOOR_B_OPEN');
    addLog('Step 1-3 Verified: Door A verified CLOSED. Door B lock energized & OPENED.');
  };

  const handleCloseActiveDoor = () => {
    if (systemState === 'DOOR_A_OPEN' || systemState === 'DOOR_B_OPEN') {
      setSystemState('PRESSURE_DELAY');
      setPressureTimer(3);
      addLog('Door closed. Programmable delay timer running (3s) to normalize cleanroom air pressure.');
    }
  };

  const handleEmergencyOverride = () => {
    if (systemState === 'EMERGENCY') {
      setSystemState('IDLE');
      addLog('Emergency Override Reset: Interlock restored to normal automatic mode.');
    } else {
      setSystemState('EMERGENCY');
      addLog('EMERGENCY OVERRIDE ACTIVATED: All electromagnetic locks released for immediate evacuation.');
    }
  };

  const handleReset = () => {
    setSystemState('IDLE');
    setPressureTimer(0);
    addLog('System manual reset. All doors secured.');
  };

  const isDoorAOpen = systemState === 'DOOR_A_OPEN' || systemState === 'EMERGENCY';
  const isDoorBOpen = systemState === 'DOOR_B_OPEN' || systemState === 'EMERGENCY';

  return (
    <section id="interlock-demo" className="section interlock-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Interactive Cleanroom Engineering</span>
          </div>
          <h2 className="section-heading">
            Door Interlock <span className="gradient-text-red">Logic Simulator</span>
          </h2>
          <p className="section-desc">
            Test the real-world 2-to-12 door electrical interlocking logic engineered by HTI for ISO pharmaceutical clean rooms, airlocks, and pass boxes.
          </p>
        </div>

        <div className="interlock-container glass-card">
          {/* Top Control Header */}
          <div className="interlock-header">
            <div className="header-left">
              <span className={`status-led ${systemState === 'EMERGENCY' ? 'alarm-led' : 'online'}`}></span>
              <div>
                <div className="system-title">HTI Multi-Door Controller • Model DIS-12</div>
                <div className="system-sub">Flameproof (Ex-d) & Non-Flameproof Certified Logic</div>
              </div>
            </div>

            <div className="header-right">
              <button
                className={`btn-emergency ${systemState === 'EMERGENCY' ? 'emergency-active' : ''}`}
                onClick={handleEmergencyOverride}
                title="Emergency Key Switch Override"
              >
                <KeyRound size={16} />
                <span>{systemState === 'EMERGENCY' ? 'Reset Override' : 'Emergency Key Override'}</span>
              </button>
              <button className="btn-icon-reset" onClick={handleReset} title="Reset System">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Airlock Chamber Representation */}
          <div className="airlock-stage">
            {/* Door A Box */}
            <div className={`door-station-box ${isDoorAOpen ? 'door-open' : 'door-locked'}`}>
              <div className="door-station-header">
                <span className="door-name">DOOR A</span>
                <span className="door-zone">Corridor Entry</span>
              </div>

              <div className="door-visual-frame">
                <div className="door-leaf-wrap">
                  <div className={`door-leaf ${isDoorAOpen ? 'leaf-open' : 'leaf-closed'}`}>
                    <div className="door-glass-window"></div>
                    <div className="door-handle"></div>
                  </div>
                </div>

                <div className="door-status-badge">
                  {isDoorAOpen ? (
                    <span className="badge-pill badge-emerald flex items-center gap-1">
                      <Unlock size={12} /> OPEN
                    </span>
                  ) : (
                    <span className="badge-pill badge-red flex items-center gap-1">
                      <Lock size={12} /> LOCKED
                    </span>
                  )}
                </div>
              </div>

              <div className="door-actions">
                {systemState === 'DOOR_A_OPEN' ? (
                  <button className="btn-close-door" onClick={handleCloseActiveDoor}>
                    Close Door A
                  </button>
                ) : (
                  <button
                    className="btn-trigger-door"
                    onClick={handleRequestDoorA}
                    disabled={systemState === 'DOOR_B_OPEN' || systemState === 'PRESSURE_DELAY'}
                  >
                    <span>Request Entry (Door A)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Central Airlock Differential Chamber */}
            <div className="chamber-center">
              <div className="chamber-air-badge">
                <Wind size={20} className={systemState === 'PRESSURE_DELAY' ? 'spinning' : 'text-cyan'} />
                <span>Cleanroom Airlock Chamber</span>
              </div>

              <div className="pressure-gauge-box">
                <div className="gauge-val">
                  {systemState === 'PRESSURE_DELAY' ? `Normalizing (${pressureTimer}s)` : '+30 Pa'}
                </div>
                <div className="gauge-label">Differential Air Pressure</div>
                <div className="gauge-bar">
                  <div
                    className="gauge-progress"
                    style={{
                      width: systemState === 'PRESSURE_DELAY' ? `${((3 - pressureTimer) / 3) * 100}%` : '100%',
                      backgroundColor: systemState === 'PRESSURE_DELAY' ? '#f59e0b' : '#06b6d4'
                    }}
                  ></div>
                </div>
              </div>

              <div className="interlock-rule-box">
                <div className="rule-title">HTI Interlock Safety Rule:</div>
                <div className="rule-text">
                  "When one door is OPEN, all other doors are electrically secured. Delayed timing restores positive room pressure."
                </div>
              </div>
            </div>

            {/* Door B Box */}
            <div className={`door-station-box ${isDoorBOpen ? 'door-open' : 'door-locked'}`}>
              <div className="door-station-header">
                <span className="door-name">DOOR B</span>
                <span className="door-zone">ISO Clean Room Area</span>
              </div>

              <div className="door-visual-frame">
                <div className="door-leaf-wrap">
                  <div className={`door-leaf ${isDoorBOpen ? 'leaf-open' : 'leaf-closed'}`}>
                    <div className="door-glass-window"></div>
                    <div className="door-handle"></div>
                  </div>
                </div>

                <div className="door-status-badge">
                  {isDoorBOpen ? (
                    <span className="badge-pill badge-emerald flex items-center gap-1">
                      <Unlock size={12} /> OPEN
                    </span>
                  ) : (
                    <span className="badge-pill badge-red flex items-center gap-1">
                      <Lock size={12} /> LOCKED
                    </span>
                  )}
                </div>
              </div>

              <div className="door-actions">
                {systemState === 'DOOR_B_OPEN' ? (
                  <button className="btn-close-door" onClick={handleCloseActiveDoor}>
                    Close Door B
                  </button>
                ) : (
                  <button
                    className="btn-trigger-door"
                    onClick={handleRequestDoorB}
                    disabled={systemState === 'DOOR_A_OPEN' || systemState === 'PRESSURE_DELAY'}
                  >
                    <span>Request Entry (Door B)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Controller Event Terminal Log */}
          <div className="interlock-terminal">
            <div className="terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot amber"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">Controller Logic Events & Hardware Audit Log</span>
            </div>
            <div className="terminal-body">
              {log.map((entry, idx) => (
                <div key={idx} className="terminal-line">
                  <span className="term-prompt">&gt;</span>
                  <span className="term-text">{entry}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="interlock-footer">
            <div className="interlock-specs-note">
              Supports 2 to 12 doors • Flameproof / Non-flameproof options • Fire Alarm auto-release link.
            </div>
            <button className="btn-cyan" onClick={() => onInquireInterlock('Door Interlock System')}>
              Request Interlock System Specs & Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
