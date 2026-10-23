import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

export default function RapidAirlockPage({ onNavigate, onQuoteSubmit }) {
  return (
    <ServiceDetailPage
      slug="rapid-airlock"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
