
import FilterBar from "@/shared/components/filters/FilterBar";
import FilterSelect from "@/shared/components/filters/FilterSelect";
import SearchInput from "@/shared/components/SearchInput";

const TRANSACTION_TYPES = [
  { value: "ALL", label: "All" },
  { value: "CREDIT", label: "Credits" },
  { value: "DEBIT", label: "Debits" },
];

const WalletFilters = ({ type, onTypeChange, search, onSearchChange }) => {
  return (
    <FilterBar>
      <FilterSelect
        placeholder="All"
        value={type}
        onValueChange={onTypeChange}
        options={TRANSACTION_TYPES}
        className="w-full md:w-48"
      />
      <SearchInput
        value={search}
        onChange={onSearchChange}
        onClear={()=> onSearchChange("")}
        placeholder="Search reason..."
        className="max-w-full"
      />
    </FilterBar>
  );
};

export default WalletFilters;
