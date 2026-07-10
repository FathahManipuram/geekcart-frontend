import FilterBar from "@/shared/components/filters/FilterBar";
import FilterSelect from "@/shared/components/filters/FilterSelect";
import SearchInput from "@/shared/components/SearchInput";
import {
  PROMOTION_STATUS_OPTIONS,
  PROMOTION_TYPE_OPTIONS,
} from "../../constants/coupon.constants";

const CouponFilters = ({
  status,
  type,
  onStatusChange,
  onTypeChange,
  search,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <FilterBar>
        <SearchInput
          value={search}
          onChange={onSearchChange}
          onClear={() => onSearchChange("")}
          placeholder="Search by coupon code or description..."
        />

        <FilterSelect
          value={status}
          onValueChange={onStatusChange}
          options={PROMOTION_STATUS_OPTIONS}
          placeholder="All Status"
          className="md:w-45"
        />

        <FilterSelect
          value={type}
          onValueChange={onTypeChange}
          options={PROMOTION_TYPE_OPTIONS}
          className="md:w-45"
          placeholder="All Types"
        />
      </FilterBar>
    </div>
  );
};

export default CouponFilters;
