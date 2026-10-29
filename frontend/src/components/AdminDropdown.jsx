import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './AdminDropdown.css';

export default function AdminDropdown({
  value,
  onChange,
  options = [],
  prefixIcon = null,
  className = '',
  size = 'md',
  isPill = false,
  customColorTheme = null,
  title = '',
  disabled = false,
  placeholder = 'Select option...'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Normalize options: can be array of strings or { value, label, color }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find(opt => String(opt.value) === String(value));
  const displayLabel = selectedOption ? selectedOption.label : (value || placeholder);

  const handleSelect = (optValue) => {
    if (onChange) {
      onChange({ target: { value: optValue } });
    }
    setIsOpen(false);
  };

  const pillStyles = customColorTheme ? {
    backgroundColor: customColorTheme.bg || customColorTheme.background,
    color: customColorTheme.text || customColorTheme.color,
    borderColor: customColorTheme.border
  } : {};

  return (
    <div
      ref={containerRef}
      className={`adm-dropdown-container ${size} ${isPill ? 'is-pill' : ''} ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''} ${className}`}
      title={title}
    >
      <button
        type="button"
        className="adm-dropdown-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={pillStyles}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {prefixIcon && <span className="adm-dropdown-prefix-icon">{prefixIcon}</span>}
        {selectedOption?.color && (
          <span className="adm-dropdown-dot" style={{ backgroundColor: selectedOption.color }} />
        )}
        <span className="adm-dropdown-label">{displayLabel}</span>
        <ChevronDown size={size === 'sm' ? 12 : 14} className={`adm-dropdown-arrow ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="adm-dropdown-menu" role="listbox">
          {normalizedOptions.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <button
                key={opt.value}
                type="button"
                className={`adm-dropdown-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
                role="option"
                aria-selected={isSelected}
              >
                {opt.color && (
                  <span className="adm-dropdown-dot" style={{ backgroundColor: opt.color }} />
                )}
                <span className="adm-dropdown-item-label">{opt.label}</span>
                {isSelected && <Check size={14} className="adm-dropdown-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
