import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import StatusOptionCard from "./StatusOptionCard";
import { ORDER_STATUS_LABELS } from "@/shared/constants/order/orderStatusLabel";
import { ORDER_STATUS_TRANSITIONS } from "@/shared/constants/order/orderStatusTransitions";
import { ORDER_STATUSES } from "@/shared/constants/order/orderStatus";

const UpdateOrderStatusModal = ({ order, onSubmit, loading, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
 // const [notifyCustomer, setNotifyCustomer] = useState(true);

  useEffect(() => {
    setSelectedStatus(order?.orderStatus || "");
  }, [order]);


const availableStatuses = ORDER_STATUS_TRANSITIONS[order?.orderStatus] || [];

  const handleUpdate = () => {
    onSubmit?.({
		orderId: order._id,
      orderStatus: selectedStatus,
    //   notifyCustomer,
    });
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.values(ORDER_STATUSES).map((status) => {
          const isCurrent = status === order?.orderStatus;

          const isAllowed = availableStatuses.includes(status);

          return (
            <StatusOptionCard
              key={status}
              value={status}
              label={ORDER_STATUS_LABELS[status]}
              selected={selectedStatus === status}
              isCurrent={isCurrent}
              disabled={!isCurrent && !isAllowed}
              onClick={setSelectedStatus}
            />
          );
        })}
      </div>

      {/* <div className="border-t pt-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Notify Customer</h4>

            <p className="text-sm text-muted-foreground">
              Send status update email
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifyCustomer}
            onChange={(e) => setNotifyCustomer(e.target.checked)}
          />
        </div>
      </div> */}

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={handleUpdate} disabled={loading}>
          Update Order
        </Button>
      </div>
    </div>
  );
};

export default UpdateOrderStatusModal;
