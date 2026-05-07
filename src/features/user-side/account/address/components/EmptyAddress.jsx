import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const EmptyAddress = ({ onAdd }) => {
  return (
    <div className="border border-dashed rounded-2xl p-10 text-center bg-muted/20">
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-muted">
          <MapPin className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>

      <h2 className="text-xl font-semibold">No Addresses Found</h2>

      <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
        You haven’t added any delivery addresses yet. Add a new address to
        continue shopping faster.
      </p>
    </div>
  );
};

export default EmptyAddress;
