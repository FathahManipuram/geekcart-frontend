// features/admin/product-management/components/ProductStatusPanel.jsx

import React from "react";
import { Controller} from "react-hook-form";
import { Sparkles } from "lucide-react";

import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";


const ProductStatusPanel = ({control}) => {

  const toggles = [
    {
      name: "isActive",
      label: "Active",
      description: "Product is visible in the store.",
    },
    {
      name: "isFeatured",
      label: "Featured",
      description:
        "Show this product in featured sections.",
    },
    {
      name: "isLimited",
      label:
        "Limited Edition",
      description:
        "Mark this product as a special release.",
    },
  ];
if (!control) return null;
  return (
    <div className="rounded-lg border bg-white p-8 space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3">
        <Sparkles size={18} className="text-amber-700" />
        <h2 className="text-lg font-semibold">Product Status</h2>
      </div>

      {/* Toggle List */}
      <div className="space-y-5">
        {toggles.map((toggle) => (
          <Controller
            key={toggle.name}
            name={toggle.name}
            control={control}
            render={({ field }) => (
              <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
                <div>
                  <Label className="text-sm font-semibold">
                    {toggle.label}
                  </Label>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {toggle.description}
                  </p>
                </div>

                <Switch
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductStatusPanel;