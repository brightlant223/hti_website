import React from 'react';
import IndustrialAccessProductPage from './IndustrialAccessProductPage';

export default function SafetyOverrideBuzzersPage({ onNavigate, onQuoteSubmit }) {
  return (
    <IndustrialAccessProductPage
      slug="safety-override-buzzers"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
