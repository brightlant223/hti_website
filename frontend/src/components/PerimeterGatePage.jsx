import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

export default function PerimeterGatePage({ onNavigate, onQuoteSubmit }) {
  return (
    <ServiceDetailPage
      slug="perimeter-gate"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
