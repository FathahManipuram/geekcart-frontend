import { useSearchParams } from "react-router-dom";

export const useCollectionFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") || "",
    subcategory: searchParams.getAll("subcategory"),
    sizes: searchParams.getAll("sizes"),
    colors: searchParams.getAll("colors"),
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "latest",
    page: Number(searchParams.get("page")) || 1,
  };

  const updateFilters = (updates = {}) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
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

    if (!("page" in updates)) {
      params.set("page", "1");
    }

    setSearchParams(params);
  };

  return {
    filters,
    updateFilters,
  };
};
