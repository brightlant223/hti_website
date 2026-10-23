import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

export default function LogisticsBridgePage({ onNavigate, onQuoteSubmit }) {
  return (
    <ServiceDetailPage
      slug="logistics-bridge"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
