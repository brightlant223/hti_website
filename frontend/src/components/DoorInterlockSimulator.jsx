import React, { useState } from 'react';
import { 
  ArrowRight, 
  Lock, 
  Unlock, 
  RotateCcw, 
  Compass, 
  Shield, 
  Users, 
  Camera, 
  PhoneCall, 
  Check 
} from 'lucide-react';

export default function DoorInterlockSimulator({ onInquireInterlock }) {
  const [doorAOpen, setDoorAOpen] = useState(false);
  const [doorBOpen, setDoorBOpen] = useState(false);
  const [differentialPressure, setDifferentialPressure] = useState(10);
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
    if (doorBOpen) {
      setTerminalLogs(prev => [
        `${getTimeString()} Interlock Interlock Lock Active: Door B is open. Door A access denied!`,
        ...prev.slice(0, 3)
      ]);
      return;
    }
    const newA = !doorAOpen;
    setDoorAOpen(newA);
    if (newA) {
      setDifferentialPressure(15);
      setTerminalLogs(prev => [
        `${getTimeString()} Door A opened. Door B magnetic lock energized.`,
        `${getTimeString()} Differential pressure increased to +15 Pa.`,
        ...prev.slice(0, 2)
      ]);
    } else {
      setDifferentialPressure(10);
      setTerminalLogs(prev => [
        `${getTimeString()} Door A closed. Airlock loop restored to standby (+10 Pa).`,
        ...prev.slice(0, 3)
      ]);
    }
  };

  const handleOpenDoorB = () => {
    if (doorAOpen) {
      setTerminalLogs(prev => [
        `${getTimeString()} Interlock Lock Active: Door A is open. Door B access denied!`,
        ...prev.slice(0, 3)
      ]);
      return;
    }
    const newB = !doorBOpen;
    setDoorBOpen(newB);
    if (newB) {
      setDifferentialPressure(15);
      setTerminalLogs(prev => [
        `${getTimeString()} Door B opened. Door A magnetic lock energized.`,
        `${getTimeString()} Differential pressure increased to +15 Pa.`,
        ...prev.slice(0, 2)
      ]);
    } else {
      setDifferentialPressure(10);
      setTerminalLogs(prev => [
        `${getTimeString()} Door B closed. Airlock loop restored to standby (+10 Pa).`,
        ...prev.slice(0, 3)
      ]);
    }
  };

  const handleSimulateCycle = () => {
    setDoorBOpen(false);
    setDoorAOpen(true);
    setDifferentialPressure(15);
    setTerminalLogs([
      `${getTimeString()} Request to open Door A.`,
      `${getTimeString()} Checking interlock conditions...`,
      `${getTimeString()} Door A opened. Other doors locked.`
    ]);

    setTimeout(() => {
      setDoorAOpen(false);
      setDifferentialPressure(10);
      setTerminalLogs(prev => [
        `${getTimeString()} Door A air cycle complete. Door sealed.`,
        ...prev.slice(0, 2)
      ]);
    }, 2800);
  };

  const whyChooseItems = [
    {
      icon: Compass,
      title: 'Turnkey Design & Execution',
      desc: 'End-to-end project management'
    },
    {
      icon: Shield,
      title: 'Quality Products',
      desc: 'Top global brands'
    },
    {
      icon: Users,
      title: 'Experienced Engineering Team',
      desc: 'Domain expertise & technical support'
    },
    {
      icon: Camera,
      title: 'Compliance Ready',
      desc: 'USFDA, cGMP, WHO-GMP environments'
    },
    {
      icon: PhoneCall,
      title: 'After Sales Support',
      desc: 'Reliable and dedicated service'
    }
  ];

  return (
    <section id="interlock-and-why" className="interlock-why-section">
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
                  </div>
                </div>
                <button 
                  className={`btn-door-status ${doorAOpen ? 'status-open' : 'status-btn-action'}`}
                  onClick={handleOpenDoorA}
                >
                  {doorAOpen ? <Unlock size={14} /> : <Lock size={14} />}
                  <span>{doorAOpen ? 'Close Door' : 'Open'}</span>
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
                  </div>
                </div>
                <button 
                  className={`btn-door-status ${doorBOpen ? 'status-open' : doorAOpen ? 'status-locked' : 'status-btn-action'}`}
                  onClick={handleOpenDoorB}
                >
                  {doorBOpen ? <Unlock size={14} /> : <Lock size={14} />}
                  <span>{doorBOpen ? 'Close Door' : doorAOpen ? 'Locked' : 'Open'}</span>
                </button>
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
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
                alt="Corporate Architecture" 
                className="why-backdrop-img"
              />
              <div className="why-backdrop-overlay"></div>
            </div>

            <div className="why-choose-content">
              <h2 className="why-choose-heading">Why Choose HTI?</h2>

              <div className="why-choose-list">
                {whyChooseItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="why-item-row">
                      <div className="why-icon-bubble">
                        <Icon size={19} />
                      </div>
                      <div className="why-text-box">
                        <h4 className="why-item-title">{item.title}</h4>
                        <p className="why-item-desc">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
