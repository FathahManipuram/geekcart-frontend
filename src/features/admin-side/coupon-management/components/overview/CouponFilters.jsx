import FilterBar from "@/shared/components/filters/FilterBar";
import FilterSelect from "@/shared/components/filters/FilterSelect";
import SearchInput from "@/shared/components/SearchInput";
import { COUPON_STATUS_OPTIONS, COUPON_TYPE_OPTIONS } from "../../constants/coupon.constants";

const CouponFilters = ({
  status,
  type,
  onStatusChange,
  onTypeChange,
  search,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <FilterBar>
        <SearchInput value={search} onChange={onSearchChange} onClear={()=> onSearchChange("")} placeholder="Search coupon..." />

        <FilterSelect
          value={status}
          onValueChange={onStatusChange}
          options={COUPON_STATUS_OPTIONS}
          placeholder="All Status"
          className="md:w-45"
        />

        <FilterSelect
          value={type}
          onValueChange={onTypeChange}
          options={COUPON_TYPE_OPTIONS}
          className="md:w-45"
          placeholder="All Types"
        />
      </FilterBar>
    </div>
  );
};

export default CouponFilters;
