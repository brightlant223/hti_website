import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  User, 
  ExternalLink,
  Minimize2,
  Lock,
  Cpu,
  Flame,
  ShieldAlert,
  Clock,
  RotateCcw
} from 'lucide-react';

const WHATSAPP_NUMBER = '919892756077';
const WHATSAPP_DEFAULT_MSG = 'Hello HTI Automation, I would like to inquire about your automation, cleanroom interlocks and security systems.';

// Smart Knowledge Base for Instant Interactive Answers
const KNOWLEDGE_RESPONSES = [
  {
    triggers: ['interlock', 'cleanroom', 'pass box', 'door interlock', 'usfda', 'cgmp', 'airlock'],
    response: `HTI specializes in USFDA 21 CFR Part 11 and cGMP compliant Door Interlocking & Pass Box Systems!

Key capabilities:
• 2 to 8 Door cascade interlocking logic (Ex-d Flameproof & Safe Area options)
• Dual & multi-tier cleanroom airlock control with differential pressure retention (+10 to +15 Pa)
• Static & Dynamic Pass Boxes with UV decontamination interlocking
• GPS synchronized Master-Slave digital clocks

Would you like a formal technical quotation or to talk with our cleanroom engineer?`,
    pills: ['Request Interlock Quote', 'Chat on WhatsApp', 'Cleanroom Brochure']
  },
  {
    triggers: ['gate', 'sliding gate', 'boom barrier', 'turnstile', 'barrier', 'cantilever', 'telescopic', 'shutter'],
    response: `HTI manufactures heavy-duty access automation systems for logistics warehouses, factory estates, and corporate lobbies:

• Automatic Sliding & Swing Gates (Telescopic & trackless cantilever available)
• High-Speed PVC Roll-Up Doors & Industrial Sectional Doors
• Electro-hydraulic & high-frequency Boom Barriers (up to 8m boom)
• Biometric Turnstiles & Speed Flap Barriers for reception access

All systems include optical safety photobeams and remote smartphone/PLC trigger compatibility.`,
    pills: ['Get Gate Proposal', 'Chat on WhatsApp', 'Explore Product Catalog']
  },
  {
    triggers: ['fire', 'alarm', 'cctv', 'security', 'surveillance', 'biometric', 'camera', 'hydrant'],
    response: `HTI provides complete Turnkey Fire & Life-Safety infrastructure:

• Addressable & Conventional Fire Alarm Systems with central mimic panel
• Turnkey Fire Hydrant & Automatic Sprinkler Networks
• 4K AI Surveillance IP CCTV with Multi-Campus Video Management (VMS)
• Multi-spectral Biometric Time Attendance & Video Door Phone intercoms
• Certified 120/240 min Fire-Rated Doors & Motorized Fire Shutters`,
    pills: ['Get Fire Safety Quote', 'Speak to Engineer', 'Our Mumbai Office']
  },
  {
    triggers: ['contact', 'address', 'location', 'phone', 'email', 'office', 'mumbai'],
    response: `You can reach our corporate engineering headquarters directly:

🏢 **Office Address:**
HTI Automation and Security System Pvt Ltd
Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703.

📞 **Phone / WhatsApp:** +91 9892756077
✉️ **Email:** info@htisystems.in
⏱️ **Hours:** Mon - Sat: 9:00 AM - 7:00 PM IST (24/7 SLA on-call emergency support)`,
    pills: ['Open WhatsApp Chat', 'Fill Inquiry Form', 'Browse 33+ Systems']
  },
  {
    triggers: ['quote', 'price', 'pricing', 'proposal', 'cost', 'quotation', 'brochure'],
    response: `We provide custom turnkey design, BOQ estimations and commercial proposals within 2-4 hours. 

To give you an exact price estimation, which system are you looking for:
1. Cleanroom Door Interlock or Pass Box
2. Industrial Automatic Gates & Barriers
3. Fire Fighting / Fire Alarm System
4. Complete Turnkey Facility Package

You can also send your architectural CAD layout or BOQ directly via WhatsApp!`,
    pills: ['Share BOQ on WhatsApp', 'Request Proposal Form', 'Call Sales Team']
  }
];

export default function WhatsAppAndChatbot({ onNavigate, onQuoteClick }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! 👋 Welcome to HTI Automation & Security Systems. How can I assist you with your industrial or pharma facility today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [chatOpen, messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: getTime()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Analyze query and match response
    setTimeout(() => {
      const lower = query.toLowerCase();

      // Handle specific quick button clicks
      if (lower.includes('whatsapp')) {
        openWhatsApp(query);
        setIsTyping(false);
        return;
      }

      if (lower.includes('proposal') || lower.includes('quote') || lower.includes('inquiry form')) {
        if (onQuoteClick) onQuoteClick();
        else if (onNavigate) onNavigate('contact');
      }

      let matched = KNOWLEDGE_RESPONSES.find(item => 
        item.triggers.some(t => lower.includes(t))
      );

      const botReply = matched 
        ? matched.response 
        : `Thank you for your inquiry about "${query}". HTI has executed 500+ automation and cleanroom projects across India. 

For customized sizing, CAD engineering review, or instant pricing, our Senior Automation Specialist is available right now on WhatsApp or phone at +91 9892756077.`;

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: getTime(),
        pills: matched ? matched.pills : ['Chat on WhatsApp ↗', 'Request Tech Quote', 'Explore Products']
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handlePillClick = (pill) => {
    if (pill.toLowerCase().includes('whatsapp')) {
      openWhatsApp(`Inquiring about ${pill}`);
    } else if (pill.toLowerCase().includes('quote') || pill.toLowerCase().includes('proposal')) {
      if (onQuoteClick) onQuoteClick();
      else if (onNavigate) onNavigate('contact');
      setChatOpen(false);
    } else if (pill.toLowerCase().includes('catalog') || pill.toLowerCase().includes('products')) {
      if (onNavigate) onNavigate('home', 'catalog');
      setChatOpen(false);
    } else {
      handleSend(pill);
    }
  };

  const openWhatsApp = (customText = null) => {
    const url = customText
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customText)}`
      : `https://wa.me/${WHATSAPP_NUMBER}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'Chat history cleared. How else can HTI Automation assist your project?',
        time: getTime()
      }
    ]);
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING ACTION WIDGETS (WhatsApp + Chatbot Launcher)
          ========================================================================= */}
      <div className="hti-floating-actions-container">
        {/* WhatsApp Quick Launcher Button with Rich Official 3D Glossy Glow */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hti-float-btn hti-whatsapp-float"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp (+91 9892756077)"
        >
          <div className="wa-icon-glow-wrap">
            <svg className="whatsapp-svg-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.9C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.68 12.05 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.37C16.32 14.25 15.1 13.65 14.87 13.56C14.65 13.48 14.48 13.44 14.32 13.69C14.15 13.94 13.68 14.49 13.53 14.66C13.39 14.82 13.24 14.84 12.99 14.72C12.74 14.6 11.94 14.33 11 13.49C10.26 12.83 9.77 12.02 9.63 11.77C9.48 11.52 9.61 11.39 9.74 11.26C9.85 11.15 9.99 10.97 10.11 10.83C10.24 10.69 10.28 10.58 10.36 10.42C10.44 10.26 10.4 10.11 10.34 9.99C10.28 9.87 9.79 8.67 9.58 8.18C9.38 7.7 9.18 7.76 9.02 7.75C8.88 7.74 8.71 7.74 8.55 7.74C8.38 7.74 8.12 7.8 7.89 8.05C7.67 8.3 7.03 8.9 7.03 10.12C7.03 11.34 7.92 12.51 8.04 12.68C8.16 12.84 9.78 15.34 12.26 16.41C12.85 16.66 13.31 16.82 13.67 16.93C14.26 17.12 14.8 17.09 15.22 17.03C15.7 16.96 16.69 16.43 16.9 15.84C17.11 15.25 17.11 14.74 17.04 14.63C16.97 14.52 16.82 14.45 16.57 14.37Z" />
            </svg>
          </div>
          <span className="float-tooltip">Chat on WhatsApp</span>
        </a>

        {/* AI Chatbot Floating Trigger with Electric Gradient & Ambient Glow */}
        <button
          className={`hti-float-btn hti-chatbot-float ${chatOpen ? 'is-active-chat' : ''}`}
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open HTI Virtual Assistant"
          title="HTI Virtual Engineering Assistant"
        >
          {chatOpen ? (
            <X size={26} className="chat-btn-icon rotate-in" />
          ) : (
            <>
              <div className="bot-icon-wrapper">
                <Bot size={28} className="chat-btn-icon" />
                <span className="bot-sparkle-dot"></span>
              </div>
              {hasUnread && <span className="chat-unread-badge">1</span>}
              <span className="float-tooltip">Need Help? Ask AI</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          2. INTERACTIVE CHATBOT POPUP WINDOW
          ========================================================================= */}
      {chatOpen && (
        <div className="hti-chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-brand-col">
              <div className="bot-avatar-badge">
                <Bot size={20} />
                <span className="avatar-online-dot"></span>
              </div>
              <div className="bot-meta">
                <div className="bot-name-row">
                  <span className="bot-name">HTI Engineering Assistant</span>
                  <span className="bot-verified-tag">AI LIVE</span>
                </div>
                <div className="bot-status-text">
                  <span>● Online</span> · Instant Specs, Quotes & Compliance
                </div>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                className="btn-chat-action"
                onClick={handleResetChat}
                title="Restart Conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                className="btn-chat-action"
                onClick={() => setChatOpen(false)}
                title="Minimize Chat"
              >
                <Minimize2 size={16} />
              </button>
            </div>
          </div>

          {/* Quick Notice Bar */}
          <div className="chatbot-sub-bar">
            <span>Direct WhatsApp Helpline:</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sub-bar-wa-link"
              aria-label="Chat with us on WhatsApp"
            >
              <span>+91 9892756077</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Messages Body */}
          <div className="chatbot-messages-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-row ${msg.sender === 'user' ? 'row-user' : 'row-bot'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="bot-bubble-avatar">
                    <Bot size={14} />
                  </div>
                )}

                <div className="bubble-content-wrap">
                  <div className={`chat-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
                    <div className="bubble-text">{msg.text}</div>
                  </div>

                  <span className="bubble-time">{msg.time}</span>

                  {/* Suggestion Pills */}
                  {msg.pills && msg.pills.length > 0 && (
                    <div className="bubble-pills-row">
                      {msg.pills.map((pill, pIdx) => (
                        <button
                          key={pIdx}
                          className="chat-pill-btn"
                          onClick={() => handlePillClick(pill)}
                        >
                          <span>{pill}</span>
                          <ArrowRight size={11} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row row-bot">
                <div className="bot-bubble-avatar">
                  <Bot size={14} />
                </div>
                <div className="chat-bubble bubble-bot typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Bar */}
          <div className="chatbot-quick-chips">
            <button
              className="quick-chip"
              onClick={() => handleSend('Tell me about cleanroom door interlocks & USFDA compliance')}
            >
              🔒 Cleanroom Interlocks
            </button>
            <button
              className="quick-chip"
              onClick={() => handleSend('What automatic gates & boom barriers do you offer?')}
            >
              ⚡ Industrial Gates
            </button>
            <button
              className="quick-chip"
              onClick={() => handleSend('How can I get a technical proposal and pricing?')}
            >
              📄 Request Quote
            </button>
          </div>

          {/* Footer Input */}
          <form
            className="chatbot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="chat-input"
              placeholder="Ask anything about HTI products & specs..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="btn-chat-send"
              disabled={!inputText.trim()}
              aria-label="Send Message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
