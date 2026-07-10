import { Search } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

import FilterSelect from "@/shared/components/filters/FilterSelect";
import SearchInput from "@/shared/components/SearchInput";

const REPORT_FILTERS = [
  { label: "Today", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
  { label: "Custom", value: "custom" },
];

const SalesReportFilters = ({
  filters,
  onChange,
  onApply,
  onReset,
  onDownloadPdf,
  onDownloadExcel,
}) => {
  const isApplyDisabled = !filters.startDate || !filters.endDate;

  return (
    <div className="space-y-5 rounded-xl border bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold">Sales Report</h2>

        <p className="text-muted-foreground text-sm">
          Filter and export your sales reports.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <SearchInput
            value={filters.search}
            onChange={(value) =>
              onChange({
                ...filters,
                search: value,
              })
            }
            onClear={() =>
              onChange({
                ...filters,
                search: "",
              })
            }
          />
        </div>

        <div className="space-y-1">
          <Label>Report Type</Label>

          <FilterSelect
            value={filters.type}
            options={REPORT_FILTERS}
            onValueChange={(value) =>
              onChange({
                ...filters,
                type: value,
              })
            }
          />
        </div>
      </div>

      {filters.type === "custom" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Start Date</Label>

            <Input
              type="date"
              value={filters.startDate}
              max={filters.endDate || undefined}
              onChange={(e) =>
                onChange({
                  ...filters,
                  startDate: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>End Date</Label>

            <Input
              type="date"
              value={filters.endDate}
              min={filters.startDate || undefined}
              onChange={(e) =>
                onChange({
                  ...filters,
                  endDate: e.target.value,
                })
              }
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {filters.type === "custom" && (
          <Button disabled={isApplyDisabled} onClick={onApply}>
            Apply
          </Button>
        )}
        <Button variant="outline" onClick={onReset}>
          Reset
        </Button>

        <Button variant="outline" onClick={onDownloadPdf}>
          Download PDF
        </Button>

        <Button variant="outline" onClick={onDownloadExcel}>
          Download Excel
        </Button>
      </div>
    </div>
  );
};

export default SalesReportFilters;
