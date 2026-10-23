import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const CollectionsTopBar = ({
  totalProducts = 0,
  sortBy = "latest",
  onSortChange,
}) => {
  return (
    <div className="mb-6 flex flex-row items-center justify-between gap-3 sm:mb-8 sm:flex-row sm:justify-between">
      {/* RESULTS */}
      <div>
        <p className="text-xs text-neutral-500 sm:text-sm">
          Showing{" "}
          <span className="font-semibold text-black">{totalProducts}</span>{" "}
          products
        </p>
      </div>

      {/* SORT BUTTON */}
      <div className="w-auto min-w-[140px] sm:w-60">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="h-9 w-full rounded-sm border bg-neutral-50 px-3.5 text-xs font-medium text-neutral-800 shadow-xs transition-colors hover:bg-neutral-100 focus:ring-1 focus:ring-black/20 sm:h-10 sm:px-4 sm:text-sm">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent className="rounded-sm border-neutral-100 p-1 shadow-lg">
            <SelectItem
              value="latest"
              className="cursor-pointer rounded-sm text-xs sm:text-sm"
            >
              Latest
            </SelectItem>
            <SelectItem
              value="oldest"
              className="cursor-pointer rounded-sm text-xs sm:text-sm"
            >
              Oldest
            </SelectItem>
            <SelectItem
              value="A-Z"
              className="cursor-pointer rounded-sm text-xs sm:text-sm"
            >
              Alphabetically A-Z
            </SelectItem>
            <SelectItem
              value="Z-A"
              className="cursor-pointer rounded-sm text-xs sm:text-sm"
            >
              Alphabetically Z-A
            </SelectItem>
            <SelectItem
              value="price-low"
              className="cursor-pointer rounded-sm text-xs sm:text-sm"
            >
              Price: Low To High
            </SelectItem>
            <SelectItem
              value="price-high"
              className="cursor-pointer rounded-sm text-xs sm:text-sm"
            >
              Price: High To Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CollectionsTopBar;
