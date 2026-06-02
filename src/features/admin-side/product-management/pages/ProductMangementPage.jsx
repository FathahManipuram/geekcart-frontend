import React, { useEffect, useState } from "react";

import ProductOverviewHeader from "../components/overview/ProductOverviewHeader";

import ProductStatsCards from "../components/overview/ProductStatsCards";

import ProductFilters from "../components/overview/ProductFilter";

import { useProductStore } from "../store/product.store";

import ProductTable from "../components/overview/ProductTable";

import { useSubcategoryStore } from "../../subcategory-management/store/subcategory.store";
import Loader from "@/shared/components/Loader";

const ProductMangementPage = () => {
  const {
    fetchProducts,

    loading,

    products,

    productStats,
  } = useProductStore();

  const {subcategories , fetchSubcategories} = useSubcategoryStore()

  const [productStatusFilter, setProductStatusFilter] = useState("all");

  const [subcategoryFilter, setSubcategoryFilter] = useState("all");

  const [stockFilter, setStockFilter] = useState("all");

  const [sortFilter, setSortFilter] = useState("latest");

useEffect(() => {
  fetchProducts();
  fetchSubcategories();
}, []);


  
  const applyFilters = ({
    productStatus = productStatusFilter,

    subcategory = subcategoryFilter,

    stock = stockFilter,

    sort = sortFilter,
  } = {}) => {
    fetchProducts({
      
      productStatus: productStatus === "all" ? "" : productStatus,

      subcategory: subcategory === "all" ? "" : subcategory,
      stockStatus: stock === "all" ? "" : stock,
      sort,
      page: 1,
    });
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div className="space-y-6">
      <ProductOverviewHeader />

      <ProductStatsCards productStats={productStats} />

      <ProductFilters
       
        subcategories={subcategories}
        subcategoryValue={subcategoryFilter}
        onSubcategoryChange={(value) => {
          setSubcategoryFilter(value);

          applyFilters({
            subcategory: value,
          });
        }}
        /**
         * Product Status
         */
        productStatusValue={productStatusFilter}
        onProductStatusChange={(value) => {
          setProductStatusFilter(value);

          applyFilters({
            productStatus: value,
          });
        }}
        /**
         * Stock Status
         */
        stockStatusValue={stockFilter}
        onStockStatusChange={(value) => {
          setStockFilter(value);

          applyFilters({
            stock: value,
          });
        }}
        /**
         * Sort
         */
        sortValue={sortFilter}
        onSortChange={(value) => {
          setSortFilter(value);

          applyFilters({
            sort: value,
          });
        }}
      />

      <ProductTable products={products} loading={loading} />
    </div>
  );
};

export default ProductMangementPage;
