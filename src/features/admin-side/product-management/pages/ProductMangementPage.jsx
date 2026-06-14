import React, { useEffect, useState } from "react";

import ProductOverviewHeader from "../components/overview/ProductOverviewHeader";

import ProductStatsCards from "../components/overview/ProductStatsCards";

import ProductFilters from "../components/overview/ProductFilter";

import { useProductStore } from "../store/product.store";

import ProductTable from "../components/overview/ProductTable";

import { useSubcategoryStore } from "../../subcategory-management/store/subcategory.store";
import Loader from "@/shared/components/Loader";
import Pagination from "@/shared/components/Pagination";
import SearchInput from "@/shared/components/SearchInput";
import useDebounce from "@/shared/hooks/useDebounce";

const ProductMangementPage = () => {
  const {
    fetchProducts,

    loading,

    products,

    pagination,
    changePage,

    productStats,
  } = useProductStore();

  const {subcategories , fetchSubcategories} = useSubcategoryStore()

  const [productStatusFilter, setProductStatusFilter] = useState("all");

  const [subcategoryFilter, setSubcategoryFilter] = useState("all");

  const [stockFilter, setStockFilter] = useState("all");

  const [sortFilter, setSortFilter] = useState("latest");
  const [search, setSearch]= useState("")
   const debouncedValue = useDebounce(search, 500);


useEffect(() => {
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
      search: debouncedValue,
      sort,
      page: 1,
    });
  };

useEffect(()=>{
  applyFilters()
}, [debouncedValue])
  if(loading){
    return <Loader/>
  }

  return (
    <div className="space-y-6">
      <ProductOverviewHeader />

      <ProductStatsCards productStats={productStats} />

<SearchInput value={search} onChange={setSearch} onClear={()=> setSearch("")} placeholder="Search products"/>
      <ProductFilters
        subcategories={subcategories}
        subcategoryValue={subcategoryFilter}
        onSubcategoryChange={(value) => {
          setSubcategoryFilter(value);

          applyFilters({
            subcategory: value,
          });
        }}
       
         
        productStatusValue={productStatusFilter}
        onProductStatusChange={(value) => {
          setProductStatusFilter(value);

          applyFilters({
            productStatus: value,
          });
        }}
 
         // Stock Status

        stockStatusValue={stockFilter}
        onStockStatusChange={(value) => {
          setStockFilter(value);

          applyFilters({
            stock: value,
          });
        }}
      
        //  Sort
         
        sortValue={sortFilter}
        onSortChange={(value) => {
          setSortFilter(value);

          applyFilters({
            sort: value,
          });
        }}
      />

      <ProductTable products={products} loading={loading} />
      <Pagination currentPage={pagination?.currentPage || 1} totalPages={pagination?.totalPages || 1} onPageChange={changePage}/>
    </div>
  );
};

export default ProductMangementPage;
