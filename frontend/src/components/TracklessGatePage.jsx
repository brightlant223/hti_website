import React from 'react';
import IndustrialAccessProductPage from './IndustrialAccessProductPage';

export default function TracklessGatePage({ onNavigate, onQuoteSubmit }) {
  return (
    <IndustrialAccessProductPage
      slug="trackless-gate"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
