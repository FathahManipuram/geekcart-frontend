import { Search, X } from "lucide-react";

const SearchInput = ({
	value,
	onChange,
	onClear,
	placeholder="Search...",
	className=""
}) => {


  return (
    <div className={`relative max-w-md ${className}`}>
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        aria-label={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-11 w-full rounded-lg
          bg-white border
          pl-10 pr-10
          text-sm outline-none
        "
      />

      {value && (
        <button
          aria-label="Clear search"
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
