import React from "react";
import FilterBar from "@/shared/components/filters/FilterBar";
import FilterSelect from "@/shared/components/filters/filterSelect";

const ProductFilters = () => {
	const StatusOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "In Stock",
      value: "in-stock",
    },
    {
      label: "Low Stock",
      value: "low-stock",
    },
    {
      label: "Out Of Stock",
      value: "out-of-stock",
    },
  ];
  return (
   <>
   <FilterBar>
	<FilterSelect
	placeholder="STATUS: ALL"
	className="md:w-45"
	options={StatusOptions}
	/>
   </FilterBar>
   </>
  );
};

export default ProductFilters;
