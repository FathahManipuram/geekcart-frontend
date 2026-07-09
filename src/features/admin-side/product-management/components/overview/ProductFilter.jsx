import React from "react";

import FilterBar from "@/shared/components/filters/FilterBar";
import FilterSelect from "@/shared/components/filters/FilterSelect";


const ProductFilters = ({
  subcategories = [],

  subcategoryValue,

  onSubcategoryChange,

  productStatusValue,

  onProductStatusChange,

  stockStatusValue,

  onStockStatusChange,

  sortValue,

  onSortChange,
}) => {
  
  const subcategoryOptions = [
    {
      label: "All Subcategories",

      value: "all",
    },

    ...subcategories.map((subcategory) => ({
      label: subcategory.name,

      value: subcategory._id,
    })),
  ];

 
  const productStatusOptions = [
    {
      label: "All Status",

      value: "all",
    },

    {
      label: "Active",

      value: "active",
    },

    {
      label: "Inactive",

      value: "inactive",
    },
  ];


  const stockStatusOptions = [
    {
      label: "All Stock",

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

 
  const sortOptions = [
    {
      label: "Latest",

      value: "latest",
    },

    {
      label: "Oldest",

      value: "oldest",
    },
  ];

  return (
    <FilterBar>
      {/* SUBCATEGORY */}
      <FilterSelect
        value={subcategoryValue}
        onValueChange={onSubcategoryChange}
        placeholder="SUBCATEGORY"
        options={subcategoryOptions}
      />

      {/* PRODUCT STATUS */}
      <FilterSelect
        value={productStatusValue}
        onValueChange={onProductStatusChange}
        placeholder="STATUS"
        options={productStatusOptions}
      />

      {/* STOCK STATUS */}
      <FilterSelect
        value={stockStatusValue}
        onValueChange={onStockStatusChange}
        placeholder="STOCK"
        options={stockStatusOptions}
      />

      {/* SORT */}
      <FilterSelect
        value={sortValue}
        onValueChange={onSortChange}
        placeholder="SORT"
        options={sortOptions}
      />
    </FilterBar>
  );
};

export default ProductFilters;
