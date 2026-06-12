import { useEffect, useState } from "react";

const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Blue", "Brown", "Green"];

const FilterSidebar = ({
  subcategories = [],
  filters,
  updateFilters,
  onClose,
}) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

 
  useEffect(() => {
    setSelectedSubcategories(filters.subcategory || []);
    setSelectedSizes(filters.sizes || []);
    setSelectedColors(filters.colors || []);
    setMinPrice(filters.minPrice || "");
    setMaxPrice(filters.maxPrice || "");
  }, [filters]);

  const toggleValue = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleApplyFilters = () => {
    updateFilters({
      subcategory: selectedSubcategories,
      sizes: selectedSizes,
      colors: selectedColors,
      minPrice,
      maxPrice,
    });

    onClose?.();
  };

  const handleClearFilters = () => {
    setSelectedSubcategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice("");
    setMaxPrice("");

    updateFilters({
      subcategory: [],
      sizes: [],
      colors: [],
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleCancel = () => {
  
    setSelectedSubcategories(filters.subcategory || []);
    setSelectedSizes(filters.sizes || []);
    setSelectedColors(filters.colors || []);
    setMinPrice(filters.minPrice || "");
    setMaxPrice(filters.maxPrice || "");

    onClose?.();
  };

  return (
    <div className="rounded-3xl border bg-white p-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-400">
          Filters
        </p>

        <h2 className="mt-2 text-sm font-semibold uppercase tracking-wide">
          Refine Selection
        </h2>
      </div>

      <div className="mt-10 space-y-10">
        {/* Category */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase">Category</h3>

          <div className="space-y-3">
            {subcategories.map((subcategory) => (
              <label
                key={subcategory._id}
                className="flex items-center gap-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(subcategory._id)}
                  onChange={() =>
                    toggleValue(
                      subcategory._id,
                      selectedSubcategories,
                      setSelectedSubcategories,
                    )
                  }
                />

                {subcategory.name}
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase">Size</h3>

          <div className="space-y-3">
            {sizes.map((size) => (
              <label key={size} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() =>
                    toggleValue(size, selectedSizes, setSelectedSizes)
                  }
                />

                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase">Color</h3>

          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  toggleValue(color, selectedColors, setSelectedColors)
                }
                className={`h-8 w-8 rounded-full border-2 ${
                  selectedColors.includes(color)
                    ? "border-black"
                    : "border-transparent"
                }`}
                style={{
                  backgroundColor: color.toLowerCase(),
                }}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase">Price Range</h3>

          <div className="space-y-3">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleApplyFilters}
            className="
              w-full
              rounded-xl
              bg-black
              py-3
              text-white
            "
          >
            Apply Filters
          </button>

          <button
            onClick={handleClearFilters}
            className="
              w-full
              rounded-xl
              border
              py-3
            "
          >
            Clear Filters
          </button>
          {onClose && (
            <button
              onClick={handleCancel}
              className="
      w-full
      rounded-xl
      border
      py-3
    "
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
