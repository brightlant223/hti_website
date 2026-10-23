import React from 'react';
import IndustrialAccessProductPage from './IndustrialAccessProductPage';

export default function HeavySecurityPage({ onNavigate, onQuoteSubmit }) {
  return (
    <IndustrialAccessProductPage
      slug="heavy-security"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
