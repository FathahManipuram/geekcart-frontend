import FilterBar from "@/shared/components/filters/FilterBar";
import FilterSelect from "@/shared/components/filters/FilterSelect";
import SearchInput from "@/shared/components/SearchInput";
import { OFFER_SCOPE_OPTIONS, OFFER_STATUS_OPTIONS } from "../../constants/offer.constants";

const OfferFilters = ({
  status,
  offerType,
  onStatusChange,
  onTypeChange,
  search,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <FilterBar>
        <SearchInput
          value={search}
          onChange={onSearchChange}
          onClear={() => onSearchChange("")}
          placeholder="Search coupon..."
        />

        <FilterSelect
          value={status}
          onValueChange={onStatusChange}
          options={OFFER_STATUS_OPTIONS}
          placeholder="All Status"
          className="md:w-45"
        />

        <FilterSelect
          value={offerType}
          onValueChange={onTypeChange}
          options={OFFER_SCOPE_OPTIONS}
          className="md:w-45"
          placeholder="All Types"
        />
      </FilterBar>
    </div>
  );
};

export default OfferFilters;
