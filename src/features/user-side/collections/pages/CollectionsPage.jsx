import { useEffect, useState } from "react";

import { Sheet, SheetContent } from "@/shared/components/ui/sheet";
import { Button } from "@/shared/components/ui/button";

import SearchInput from "@/shared/components/SearchInput";
import useDebounce from "@/shared/hooks/useDebounce";

import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import CollectionsTopBar from "../components/CollectionsTopBar";

import { useCollectionsStore } from "../store/collections.store";
import { useSubcategoryStore } from "@/features/admin-side/subcategory-management/store/subcategory.store";

import Pagination from "@/shared/components/Pagination";
import Breadcrumbs from "@/shared/components/Breadcrumbs";

import { useCollectionFilters } from "../hooks/useCollectionFilters";

const CollectionsPage = () => {
  const { filters, updateFilters } = useCollectionFilters();

  const [search, setSearch] = useState(filters.search);

  const debouncedSearch = useDebounce(search, 500);

  const { products, pagination, loading, fetchCollections } =
    useCollectionsStore();

  const subcategories = useSubcategoryStore((state) => state.subcategories);

  const fetchSubcategories = useSubcategoryStore(
    (state) => state.fetchSubcategories,
  );

  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  useEffect(() => {
    updateFilters({
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCollections(filters);
  }, [JSON.stringify(filters)]);

  const handleSortChange = (value) => {
    updateFilters({
      sortBy: value,
    });
  };

  return (
    <section className="px-4 py-8 md:px-8 lg:px-12">
      <div
        className="flex
          gap-8
        "
      >
        {/* Desktop sidebar */}
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
            filters={filters}
            updateFilters={updateFilters}
          />
        </aside>

        <div className="flex-1">
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

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <SearchInput
                value={search}
                onChange={setSearch}
                onClear={() => setSearch("")}
                placeholder="Search products..."
                className="w-full md:w-80"
              />

              <Button
                variant="outline"
                className="lg:hidden cursor-pointer"
                onClick={() => setOpenFilters(true)}
              >
                Filters
              </Button>
            </div>
          </div>

          <CollectionsTopBar
            totalProducts={pagination?.totalProducts}
            sortBy={filters.sortBy}
            onSortChange={handleSortChange}
          />

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
              <ProductGrid products={products} />

              <Pagination
                currentPage={pagination?.currentPage || 1}
                totalPages={pagination?.totalPages || 1}
                onPageChange={(page) =>
                  updateFilters({
                    page,
                  })
                }
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
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
            filters={filters}
            updateFilters={updateFilters}
            onClose={() => setOpenFilters(false)}
          />
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default CollectionsPage;
