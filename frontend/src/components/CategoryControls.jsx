import React from 'react';
import { Search } from 'lucide-react';

/**
 * Shared search + filter bar used by every service-division category page.
 *
 * The filter chips used to be one flat list that mixed two different
 * dimensions - "which application" and "which specification" - so the
 * second row of chips appeared with no heading at all. They are now split
 * into two labelled groups that can be combined, e.g. "Industrial Access"
 * AND "Heavy Duty".
 */
export default function CategoryControls({
  searchId,
  searchLabel,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  resultsLabel,
  applicationFilters = [],
  specificationFilters = [],
  activeFilter,
  onFilterChange,
  activeSpec,
  onSpecChange
}) {
  const hasSpecificationFilters = specificationFilters.length > 1;

  const renderChipGroup = (filters, activeValue, onChange, labelId, label) => {
    if (!filters || filters.length === 0) return null;
    return (
      <div className="auto-filters-container">
        <div className="auto-filter-label" id={labelId}>{label}</div>
        <div className="auto-filter-chips-list" role="group" aria-labelledby={labelId}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`auto-filter-chip ${activeValue === filter ? 'active' : ''}`}
              onClick={() => onChange(filter)}
              aria-pressed={activeValue === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="auto-controls-section">
      <div className="auto-search-bar-row">
        <div className="auto-search-input-wrap">
          <Search size={17} className="auto-search-icon" />
          <label className="sr-only" htmlFor={searchId}>{searchLabel}</label>
          <input
            id={searchId}
            type="search"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="auto-search-field"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              className="auto-search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="auto-results-count" role="status" aria-live="polite">
          <span>{resultsLabel}</span>
        </div>
      </div>

      {renderChipGroup(
        applicationFilters,
        activeFilter,
        onFilterChange,
        `${searchId}-app-filter-label`,
        'FILTER BY APPLICATION'
      )}

      {hasSpecificationFilters && renderChipGroup(
        specificationFilters,
        activeSpec,
        onSpecChange,
        `${searchId}-spec-filter-label`,
        'FILTER BY SPECIFICATION'
      )}
    </section>
  );
}
