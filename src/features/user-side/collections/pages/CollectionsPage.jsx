import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { Sheet, SheetContent } from "@/shared/components/ui/sheet";

import { Button } from "@/shared/components/ui/button";

import SearchInput from "@/shared/components/SearchInput";

import useDebounce from "@/shared/hooks/useDebounce";

import FilterSidebar from "../components/FilterSidebar";

import ProductGrid from "../components/ProductGrid";

import CollectionsTopBar from "../components/CollectionsTopBar";

import CollectionsPagination from "../components/CollectionsPagination";

import { useCollectionsStore } from "../store/collections.store";

import { useSubcategoryStore } from "@/features/admin-side/subcategory-management/store/subcategory.store";
import Pagination from "@/shared/components/Pagination";
import Breadcrumbs from "@/shared/components/Breadcrumbs";

const CollectionsPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const debouncedSearch = useDebounce(search, 500);

  const {
    products,

    pagination,

    loading,

    queryParams,

    fetchCollections,
    changePage,
  } = useCollectionsStore();

console.log("page: ", pagination)
  const subcategories = useSubcategoryStore((state) => state.subcategories);

  const fetchSubcategories = useSubcategoryStore(
    (state) => state.fetchSubcategories,
  );

  const [openFilters, setOpenFilters] = useState(false);

  
  useEffect(() => {
    fetchSubcategories();
  }, []);

 
  const updateFilters = (updates = {}) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
     
      if (value === "" || value === null || value === undefined) {
        params.delete(key);

        return;
      }

      
      if (Array.isArray(value)) {
        params.delete(key);

        value.forEach((item) => {
          params.append(key, item);
        });

        return;
      }


      params.set(key, value);
    });


    if (Object.keys(updates).some((key) => key !== "page")) {
      params.set("page", 1);
    }

    setSearchParams(params);
  };

 
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

  
    params.set("page", 1);

    setSearchParams(params);
  }, [debouncedSearch]);

 

  useEffect(() => {
    const params = {
      search: searchParams.get("search") || "",

      subcategory: searchParams.getAll("subcategory"),

      sizes: searchParams.getAll("sizes"),

      colors: searchParams.getAll("colors"),

      minPrice: searchParams.get("minPrice") || "",

      maxPrice: searchParams.get("maxPrice") || "",

      sortBy: searchParams.get("sortBy") || "latest",

      page: Number(searchParams.get("page")) || 1,
    };

    fetchCollections(params);
  }, [searchParams]);

  
  const handleSortChange = (value) => {
    updateFilters({
      sortBy: value,
    });
  };

  return (
    <section
      className="
        px-4
        py-8

        md:px-8

        lg:px-12
      "
    >
      <div
        className="
          flex
          gap-8
        "
      >
        {/* DESKTOP SIDEBAR */}
        <aside
          className="
            hidden
            w-72
            shrink-0

            lg:block
          "
        >
          <FilterSidebar
            subcategories={subcategories}
            updateFilters={updateFilters}
          />
        </aside>

        {/* CONTENT */}
        <div className="flex-1">
          {/* HEADER */}
          <Breadcrumbs
            items={[
              {
                label: "Home",
                link: "/",
              },
              {
                label: "Collections",
              },
            ]}
          />

          <div
            className="
              mb-8
              mt-4
              flex
              flex-col
              gap-4

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* LEFT */}
            <div>
              <h1
                className="
                  text-3xl
                  font-bold

                  md:text-5xl
                "
              >
                Collections
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-neutral-500
                "
              >
                Discover premium fashion curated for modern style.
              </p>
            </div>

            {/* RIGHT */}
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              {/* SEARCH */}
              <SearchInput
                value={search}
                onChange={setSearch}
                onClear={() => setSearch("")}
                placeholder="Search products..."
                className="w-full md:w-80"
              />

              {/* MOBILE FILTER */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setOpenFilters(true)}
              >
                Filters
              </Button>
            </div>
          </div>

          {/* TOPBAR */}
          <CollectionsTopBar
            totalProducts={pagination?.totalProducts}
            sortBy={queryParams?.sortBy}
            onSortChange={handleSortChange}
          />

          {/* LOADING */}
          {loading ? (
            <div
              className="
                flex
                min-h-[500px]
                items-center
                justify-center
              "
            >
              <p
                className="
                  text-sm
                  text-neutral-500
                "
              >
                Loading products...
              </p>
            </div>
          ) : (
            <>
              {/* GRID */}
              <ProductGrid products={products} />

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={(page) => changePage(page)}
              />
            </>
          )}
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <Sheet open={openFilters} onOpenChange={setOpenFilters}>
        <SheetContent
          side="left"
          className="
            w-80
            overflow-y-auto
          "
        >
          <FilterSidebar
            subcategories={subcategories}
            updateFilters={updateFilters}
          />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default CollectionsPage;
