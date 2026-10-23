import React from 'react';
import IndustrialAccessProductPage from './IndustrialAccessProductPage';

export default function DigitalClocksPage({ onNavigate, onQuoteSubmit }) {
  return (
    <IndustrialAccessProductPage
      slug="digital-clocks"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
