import React from 'react';
import IndustrialAccessProductPage from './IndustrialAccessProductPage';

export default function PerimeterGatePage({ onNavigate, onQuoteSubmit }) {
  return (
    <IndustrialAccessProductPage
      slug="perimeter-gate"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
