import { Search, X } from "lucide-react";

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  className = "max-w-md",
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={16}
        className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
      />

      <input
        aria-label={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border bg-white pr-10 pl-10 text-sm outline-none"
      />

      {value && (
        <button
          aria-label="Clear search"
          type="button"
          onClick={onClear}
          className="absolute top-1/2 right-3 -translate-y-1/2"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
