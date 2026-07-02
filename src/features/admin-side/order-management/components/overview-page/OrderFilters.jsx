import FilterSelect from "@/shared/components/filters/FilterSelect";
import SearchInput from "@/shared/components/SearchInput";

const ORDER_STATUSES = [
  { label: "ALL", value: "ALL" },
  { label: "PLACED", value: "PLACED" },
  { label: "PROCESSING", value: "PROCESSING" },
  { label: "SHIPPED", value: "SHIPPED" },
  { label: "OUT FOR DELIVERY", value: "OUT_FOR_DELIVERY"},
  { label: "DELIVERED", value: "DELIVERED" },
  { label: "CANCELLED", value: "CANCELLED" },
];

const OrderFilters = ({ search, setSearch, status, setStatus }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center">
      <SearchInput
        placeholder="Search order number..."
        value={search}
        onChange={setSearch}
		onClear={()=> setSearch("")}
      />

      <FilterSelect
        value={status}
        onValueChange={setStatus}
        options={ORDER_STATUSES}
		className="md:w-52"
      />
    </div>
  );
};

export default OrderFilters;
