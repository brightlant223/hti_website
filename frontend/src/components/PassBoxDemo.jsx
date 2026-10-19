import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertCircle, Package } from 'lucide-react';

export default function PassBoxDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [warningMsg, setWarningMsg] = useState(null);

  const PASS_BOX_STEPS = [
    {
      stepNum: 1,
      shortTitle: '01 Load Material',
      label: 'Stage 1: Operator Places Materials inside Pass Box (Door A Open)',
      detail: 'An operator in the preparation or corridor area opens Door A and places material containers inside the pass box chamber. Door B remains firmly interlocked.',
      controllerText: 'DOOR A OPEN: Materials placed into pass box chamber. Door B electromagnetic interlock active to prevent simultaneous opening.',
      doorA: { state: 'open', statusText: 'Unlocked & Open', isAjar: true, emLock: 'EM-Lock Released', led: 'green' },
      doorB: { state: 'locked', statusText: 'Interlocked & Locked', isAjar: false, emLock: 'EM-Lock Active (Locked)', led: 'red' },
      activePill: 'DOOR A OPEN · DOOR B INTERLOCKED'
    },
    {
      stepNum: 2,
      shortTitle: '02 Close Door A',
      label: 'Stage 2: Operator Closes Door A (Chamber Sealed)',
      detail: 'Door A is closed against the cleanroom gasket. Magnetic reed switches verify that Door A is fully closed before any further operation.',
      controllerText: 'DOOR A CLOSED: Magnetic contacts engaged. Door A locked. Both doors verified closed and sealed.',
      doorA: { state: 'closed', statusText: 'Closed & Locked', isAjar: false, emLock: 'EM-Lock Engaged', led: 'red' },
      doorB: { state: 'locked', statusText: 'Interlocked & Locked', isAjar: false, emLock: 'EM-Lock Active (Locked)', led: 'red' },
      activePill: 'BOTH DOORS CLOSED & SEALED'
    },
    {
      stepNum: 3,
      shortTitle: '03 Condition Check',
      label: 'Stage 3: System Checks Configured Door-Status Conditions',
      detail: 'Central controller confirms Door A is sealed and evaluates configured conditions (safety interlock check, optional UV-C decontamination timer or purge delay).',
      controllerText: 'CONDITION CHECK: Evaluating mutual exclusion interlock status and configured transfer cycle conditions...',
      doorA: { state: 'locked', statusText: 'Interlocked & Locked', isAjar: false, emLock: 'EM-Lock Active (Locked)', led: 'red' },
      doorB: { state: 'locked', statusText: 'Standby / Interlocked', isAjar: false, emLock: 'EM-Lock Active (Locked)', led: 'red' },
      activePill: 'INTERLOCK CONDITIONS CHECK'
    },
    {
      stepNum: 4,
      shortTitle: '04 Interlock Hold',
      label: 'Stage 4: Opposite Door (Door B) Remains Interlocked while Conditions Process',
      detail: 'Opposite door (Door B) remains securely locked while conditions are active or until transfer cycle requirements are satisfied, preventing cross-contamination.',
      controllerText: 'INTERLOCK HELD: Door B held locked. Door A locked. Air separation between cleanroom zones maintained without breach.',
      doorA: { state: 'locked', statusText: 'Interlocked & Locked', isAjar: false, emLock: 'EM-Lock Active (Locked)', led: 'red' },
      doorB: { state: 'locked', statusText: 'Held Locked (Interlocked)', isAjar: false, emLock: 'EM-Lock Active (Locked)', led: 'red' },
      activePill: 'TRANSFER CONDITIONS SATISFIED'
    },
    {
      stepNum: 5,
      shortTitle: '05 Retrieve Material',
      label: 'Stage 5: Configured Conditions Met — Access through Door B Permitted',
      detail: 'Configured conditions satisfied: Door B EM-lock releases; cleanroom operator retrieves material safely while Door A remains locked.',
      controllerText: 'ACCESS PERMITTED: Door B unlocked. Cleanroom operator retrieves material. Door A firmly locked.',
      doorA: { state: 'locked', statusText: 'Interlocked & Locked', isAjar: false, emLock: 'EM-Lock Active (Locked)', led: 'red' },
      doorB: { state: 'open', statusText: 'Unlocked & Open', isAjar: true, emLock: 'EM-Lock Released', led: 'green' },
      activePill: 'DOOR B OPEN · CLEANROOM TRANSFER COMPLETE'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev >= 5 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStage = PASS_BOX_STEPS[currentStep - 1];

  const handleTestDoorClick = (doorLetter) => {
    if (doorLetter === 'B' && currentStep === 1) {
      setWarningMsg('INTERLOCK ACTIVE: Door B is locked while Door A is open to prevent cross-draft!');
      setTimeout(() => setWarningMsg(null), 2500);
      return;
    }
    if (doorLetter === 'A' && currentStep === 5) {
      setWarningMsg('INTERLOCK ACTIVE: Door A is locked while Door B is open to protect cleanroom sterility!');
      setTimeout(() => setWarningMsg(null), 2500);
      return;
    }
    if (doorLetter === 'A') {
      setCurrentStep(1);
    } else {
      setCurrentStep(5);
    }
  };

  const handleReplay = () => {
    setCurrentStep(1);
    setIsPlaying(true);
  };

  return (
    <div className="cleanroom-demo-panel">
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
            aria-label={isPlaying ? 'Pause pass box demonstration' : 'Play pass box demonstration'}
          >
            {isPlaying ? (
              <>
                <Pause size={12} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={12} />
                <span>Play</span>
              </>
            )}
          </button>
          <button
            type="button"
            className="demo-ctrl-btn"
            onClick={handleReplay}
            aria-label="Replay pass box demonstration sequence"
          >
            <RotateCcw size={12} />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* Warning Alert if User Tests Blocked Condition */}
      {warningMsg && (
        <div className="demo-warning-banner" role="alert">
          <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
          <span>{warningMsg}</span>
        </div>
      )}

      {/* Two-Door Pass Box Stage: Door A - Chamber - Door B */}
      <div className="demo-airlock-stage">
        
        {/* Door A (Corridor / Preparation Side) */}
        <div className={`demo-door-box ${activeStage.doorA.isAjar ? 'is-open' : 'is-locked'}`}>
          <div className="demo-door-header">
            <span className="demo-door-label">DOOR A · CORRIDOR</span>
            <span 
              className={`demo-door-led ${activeStage.doorA.led === 'green' ? 'led-green' : 'led-red'}`} 
              title={activeStage.doorA.isAjar ? 'Door A Unlocked (Green LED)' : 'Door A Locked (Red LED)'}
            />
          </div>

          <div className="demo-door-graphic">
            <div className={`demo-door-leaf ${activeStage.doorA.isAjar ? 'open' : ''}`} />
          </div>

          <span className={`demo-door-status-text ${activeStage.doorA.led === 'green' ? 'text-green' : 'text-red'}`}>
            {activeStage.doorA.statusText}
          </span>
          <span className="demo-door-em-lock">{activeStage.doorA.emLock}</span>

          <button
            type="button"
            className="demo-door-trigger-btn"
            onClick={() => handleTestDoorClick('A')}
            title="Click to simulate opening Door A"
          >
            Trigger Door A
          </button>
        </div>

        {/* Central Pass Box Chamber & Controller */}
        <div className="demo-chamber-box">
          <div className="demo-chamber-top">
            <span className="demo-chamber-badge">PASS BOX HATCH</span>
            <div className="demo-pressure-badge">
              <Package size={12} />
              <span>SS 304 Chamber</span>
            </div>
          </div>

          <div className="demo-controller-screen">
            <p className="demo-controller-text">{activeStage.controllerText}</p>
          </div>

          <div className="demo-sequence-pill">
            <span>{activeStage.activePill}</span>
          </div>
        </div>

        {/* Door B (Cleanroom Side) */}
        <div className={`demo-door-box ${activeStage.doorB.isAjar ? 'is-open' : 'is-locked'}`}>
          <div className="demo-door-header">
            <span className="demo-door-label">DOOR B · CLEANROOM</span>
            <span 
              className={`demo-door-led ${activeStage.doorB.led === 'green' ? 'led-green' : 'led-red'}`} 
              title={activeStage.doorB.isAjar ? 'Door B Unlocked (Green LED)' : 'Door B Locked (Red LED)'}
            />
          </div>

          <div className="demo-door-graphic">
            <div className={`demo-door-leaf ${activeStage.doorB.isAjar ? 'open' : ''}`} />
          </div>

          <span className={`demo-door-status-text ${activeStage.doorB.led === 'green' ? 'text-green' : 'text-red'}`}>
            {activeStage.doorB.statusText}
          </span>
          <span className="demo-door-em-lock">{activeStage.doorB.emLock}</span>

          <button
            type="button"
            className="demo-door-trigger-btn"
            onClick={() => handleTestDoorClick('B')}
            title="Click to simulate opening Door B"
          >
            Trigger Door B
          </button>
        </div>

      </div>

      {/* Step Description Row */}
      <div className="demo-stage-desc-row">
        <span className="demo-stage-title">{activeStage.label}</span>
        <p className="demo-stage-detail">{activeStage.detail}</p>
      </div>

      {/* 5-Step Timeline Navigation Rail */}
      <div className="demo-steps-rail" role="tablist" aria-label="Pass Box Sequence Steps">
        {PASS_BOX_STEPS.map(s => (
          <button
            key={s.stepNum}
            type="button"
            role="tab"
            aria-selected={currentStep === s.stepNum}
            className={`demo-step-pill-btn ${currentStep === s.stepNum ? 'active' : ''}`}
            onClick={() => {
              setCurrentStep(s.stepNum);
              setIsPlaying(false);
            }}
          >
            {s.shortTitle}
          </button>
        ))}
      </div>

      {/* Technical Disclaimer Note */}
      <p className="demo-disclaimer-note">
        Illustrative product demonstration. Pass box systems are configurable as Static or Dynamic models with electromagnetic or mechanical interlocking, optional UV sterilization, and differential pressure monitoring according to cleanroom specifications.
      </p>
    </div>
  );
}
