import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Thermometer, ShieldCheck, DoorClosed, Wind, Layers, CheckCircle2 } from 'lucide-react';
import '../AutomaticDoorsDetail.css';

export default function ChillerCleanroomDoorDemo() {
  const [doorMode, setDoorMode] = useState('chiller'); // 'chiller' | 'cleanroom'
  const [doorState, setDoorState] = useState('sealed'); // 'sealed' | 'opening' | 'open' | 'closing'
  const [isPlaying, setIsPlaying] = useState(true);

  // Automatic sequence cycle
  useEffect(() => {
    if (!isPlaying) return;
    const sequence = ['sealed', 'opening', 'open', 'closing'];
    const timer = setInterval(() => {
      setDoorState(prev => {
        const nextIdx = (sequence.indexOf(prev) + 1) % sequence.length;
        return sequence[nextIdx];
      });
    }, 2400);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleToggleDoor = () => {
    setIsPlaying(false);
    if (doorState === 'sealed' || doorState === 'closing') {
      setDoorState('open');
    } else {
      setDoorState('sealed');
    }
  };

  const handleReset = () => {
    setDoorState('sealed');
    setIsPlaying(true);
    setDoorMode('chiller');
  };

  const isAjar = doorState === 'opening' || doorState === 'open';

  return (
    <div className="cleanroom-demo-panel door-demo-panel">
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
            aria-label={isPlaying ? 'Pause demonstration cycle' : 'Run demonstration cycle'}
            title={isPlaying ? 'Pause auto cycle' : 'Run auto cycle'}
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
            aria-label="Reset door demonstration"
            title="Reset to default state"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher: Chiller vs Cleanroom */}
      <div className="door-demo-mode-switcher">
        <button
          type="button"
          className={`door-mode-btn ${doorMode === 'chiller' ? 'active' : ''}`}
          onClick={() => {
            setDoorMode('chiller');
            setDoorState('sealed');
          }}
        >
          <Thermometer size={14} className="text-cyan-400" />
          <span>Chiller & Cold Storage Mode</span>
        </button>
        <button
          type="button"
          className={`door-mode-btn ${doorMode === 'cleanroom' ? 'active' : ''}`}
          onClick={() => {
            setDoorMode('cleanroom');
            setDoorState('sealed');
          }}
        >
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Cleanroom Flush Door Mode</span>
        </button>
      </div>

      {/* Door Visual Simulation Stage */}
      <div className={`door-sim-stage ${doorMode === 'chiller' ? 'stage-chiller' : 'stage-cleanroom'}`}>
        
        {/* Environment Telemetry Ribbon */}
        <div className="door-env-bar">
          {doorMode === 'chiller' ? (
            <>
              <div className="door-env-item">
                <Thermometer size={13} className="text-cyan-400" />
                <span>Storage Zone: <strong className="text-cyan-300">-22.0°C (Cold Bay)</strong></span>
              </div>
              <div className="door-env-item">
                <span>Insulation: <strong className="text-slate-200">80mm PUF Core</strong></span>
              </div>
              <div className="door-env-item">
                <span>Gasket: <strong className={isAjar ? 'text-amber-400' : 'text-emerald-400'}>{isAjar ? 'Seal Disengaged' : 'EPDM Compressed'}</strong></span>
              </div>
            </>
          ) : (
            <>
              <div className="door-env-item">
                <Wind size={13} className="text-emerald-400" />
                <span>Differential Pressure: <strong className="text-emerald-300">+25 Pa (Class ISO 7)</strong></span>
              </div>
              <div className="door-env-item">
                <span>Surface: <strong className="text-slate-200">SS 304 Flush Panel</strong></span>
              </div>
              <div className="door-env-item">
                <span>Drop Seal: <strong className={isAjar ? 'text-amber-400' : 'text-emerald-400'}>{isAjar ? 'Seal Lifted' : 'Airtight Sealed'}</strong></span>
              </div>
            </>
          )}
        </div>

        {/* Central Door Graphic & Motion */}
        <div className="door-sim-frame">
          {/* Outer Wall Structure */}
          <div className="door-wall-left">
            <span className="wall-tag">{doorMode === 'chiller' ? 'INSULATED WALL' : 'CLEAN PANEL'}</span>
          </div>

          {/* Doorway Opening & Leaf */}
          <div className={`door-leaf-container ${isAjar ? 'leaf-ajar' : 'leaf-sealed'}`}>
            <div className="door-leaf-body">
              {/* Vision Glass or Insulated Bevel */}
              {doorMode === 'cleanroom' ? (
                <div className="door-cleanroom-window">
                  <div className="window-glaze">
                    <span className="window-text">ZONE 104</span>
                  </div>
                </div>
              ) : (
                <div className="door-chiller-handle">
                  <div className="chiller-lever" />
                  <span className="chiller-label">HEAVY LATCH</span>
                </div>
              )}

              {/* Hardware Kickplate */}
              <div className="door-kickplate" />
            </div>

            {/* Status indicator badge floating on leaf */}
            <div className={`door-status-pill ${isAjar ? 'status-open' : 'status-sealed'}`}>
              <span className="status-dot" />
              <span>{doorState.toUpperCase()}</span>
            </div>
          </div>

          <div className="door-wall-right">
            <span className="wall-tag">{doorMode === 'chiller' ? 'CAM HINGE' : 'SEAMLESS'}</span>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="door-sim-actions">
          <button
            type="button"
            className="door-trigger-btn"
            onClick={handleToggleDoor}
          >
            <DoorClosed size={14} />
            <span>{isAjar ? 'Simulate Closing & Sealing' : 'Simulate Opening Door'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Key Technical Insights */}
      <div className="door-specs-strip">
        {doorMode === 'chiller' ? (
          <>
            <div className="door-spec-box">
              <span className="spec-label">THERMAL BARRIER</span>
              <span className="spec-val">CFC-Free High-Density PUF Core</span>
            </div>
            <div className="door-spec-box">
              <span className="spec-label">PERIMETER SEAL</span>
              <span className="spec-val">Resilient Multi-Lip EPDM Gasket</span>
            </div>
            <div className="door-spec-box">
              <span className="spec-label">HARDWARE</span>
              <span className="spec-val">Heavy-Duty Cam-Lift Rising Hinges</span>
            </div>
          </>
        ) : (
          <>
            <div className="door-spec-box">
              <span className="spec-label">HYGIENIC PROFILE</span>
              <span className="spec-val">Flush Seamless Face (No Dust Ledges)</span>
            </div>
            <div className="door-spec-box">
              <span className="spec-label">PRESSURE SEAL</span>
              <span className="spec-val">Automatic Concealed Bottom Drop Seal</span>
            </div>
            <div className="door-spec-box">
              <span className="spec-label">VISION PANEL</span>
              <span className="spec-val">Double-Glazed Flush Toughened Glass</span>
            </div>
          </>
        )}
      </div>

      {/* Technical Disclaimer Note */}
      <p className="demo-disclaimer-note">
        Illustrative product demonstration. Chiller doors and cleanroom doors are custom-engineered with project-specific panel thicknesses, thermal insulation cores, gasket profiles, and interlocking access controls according to facility requirements.
      </p>
    </div>
  );
}
