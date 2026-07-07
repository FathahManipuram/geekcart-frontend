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
    <div
      className="
        mb-8
        flex
        flex-col
        gap-4

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* RESULTS */}
      <div>
        <p
          className="
            text-sm
            text-neutral-500
          "
        >
          Showing{" "}
          <span className="font-semibold text-black">{totalProducts}</span>{" "}
          products
        </p>
      </div>

      {/* SORT */}
      <div className="w-full sm:w-60">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="latest" className="cursor-pointer">
              Latest
            </SelectItem>
            <SelectItem value="oldest" className="cursor-pointer">
              Oldest
            </SelectItem>
            <SelectItem value="A-Z" className="cursor-pointer">
              Alphabetically A-Z
            </SelectItem>
            <SelectItem value="Z-A" className="cursor-pointer">
              Alphabetically Z-A
            </SelectItem>
            <SelectItem value="price-low" className="cursor-pointer">
              Price: Low To High
            </SelectItem>
            <SelectItem value="price-high" className="cursor-pointer">
              Price: High To Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CollectionsTopBar;
