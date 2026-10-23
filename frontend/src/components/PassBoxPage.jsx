import React from 'react';
import IndustrialAccessProductPage from './IndustrialAccessProductPage';

export default function PassBoxPage({ onNavigate, onQuoteSubmit }) {
  return (
    <IndustrialAccessProductPage
      slug="pass-box-systems"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
