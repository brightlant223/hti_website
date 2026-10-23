import React from 'react';
import IndustrialAccessProductPage from './IndustrialAccessProductPage';

export default function RapidAirlockPage({ onNavigate, onQuoteSubmit }) {
  return (
    <IndustrialAccessProductPage
      slug="rapid-airlock"
      onNavigate={onNavigate}
      onQuoteSubmit={onQuoteSubmit}
    />
  );
}
