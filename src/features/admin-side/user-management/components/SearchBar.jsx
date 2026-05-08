import React, { useState } from 'react'

import { Input } from '@/shared/components/ui/input'
import { Search, X } from 'lucide-react';

const SearchBar = () => {
	
  const [search, setSearch] = useState("");

  return (
    <div className="relative max-w-md">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="
          h-11 w-full rounded-lg
          bg-white border
          pl-10 pr-10
          text-sm outline-none
        "
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar
