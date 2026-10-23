import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

export default function TracklessGatePage({ onNavigate, onQuoteSubmit }) {
  return (
    <ServiceDetailPage
      slug="trackless-gate"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
