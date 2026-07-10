import { useEffect, useState } from "react";

import { Button } from "@/shared/components/ui/button";

import StatusOptionCard from "../edit-page/StatusOptionCard";
import { ITEM_STATUS_TRANSITIONS } from "../../constants/itemStatusTransition";
import { ITEM_STATUS_LABELS } from "@/shared/constants/order/orderStatusLabel";

const UpdateItemStatusModal = ({ item, onSubmit, loading, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setSelectedStatus(item?.itemStatus || "");
  }, [item]);

  const availableStatuses = ITEM_STATUS_TRANSITIONS[item?.itemStatus] || [];

  const handleUpdate = () => {
    onSubmit?.({
      status: selectedStatus,
    });
  };

  if (!item) return null;
  return (
    <div>
      {item && (
        <div className="mb-4">
          <p className="text-muted-foreground text-sm">Product</p>

          <p className="font-medium">{item.name}</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {[item?.itemStatus, ...availableStatuses].map((status) => (
          <StatusOptionCard
            key={status}
            value={status}
            label={ITEM_STATUS_LABELS[status]}
            selected={selectedStatus === status}
            isCurrent={status === item?.itemStatus}
            onClick={setSelectedStatus}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button
          onClick={handleUpdate}
          disabled={loading || selectedStatus === item?.itemStatus}
        >
          Update Item
        </Button>
      </div>
    </div>
  );
};

export default UpdateItemStatusModal;
