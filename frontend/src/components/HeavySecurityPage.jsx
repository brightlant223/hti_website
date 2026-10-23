import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

export default function HeavySecurityPage({ onNavigate, onQuoteSubmit }) {
  return (
    <ServiceDetailPage
      slug="heavy-security"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
