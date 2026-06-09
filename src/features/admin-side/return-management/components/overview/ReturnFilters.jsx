import { Search } from 'lucide-react';
import React from 'react'
import { RETURN_FILTERS } from '../../constants/return.constants';
import SearchInput from '@/shared/components/SearchInput';

const ReturnFilters = ({ search, onSearchChange, status, onStatusChange }) => {
  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          onClear={() => onSearchChange("")}
          placeholder="Search returns..."
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {RETURN_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onStatusChange(filter.value)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium
              transition-colors
              ${
                status === filter.value
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReturnFilters
