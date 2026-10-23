import React from 'react';
import IndustrialAccessProductPage from './IndustrialAccessProductPage';

export default function LogisticsBridgePage({ onNavigate, onQuoteSubmit }) {
  return (
    <IndustrialAccessProductPage
      slug="logistics-bridge"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
