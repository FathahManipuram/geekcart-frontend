import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import StatusOptionCard from "@/features/admin-side/order-management/components/edit-page/StatusOptionCard";
import { RETURN_STATUS_TRANSITIONS } from "@/shared/constants/return/returnRequestStatus";

const STATUS_LABELS = {
  RETURN_APPROVED: "Approve Return",
  RETURN_REJECTED: "Reject Return",
  ITEM_RECEIVED: "Mark Item Received",
  RETURN_COMPLETED: "Complete Refund",
};

const UpdateReturnStatusModal = ({
  returnRequest,
  loading,
  onSubmit,
  onClose,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    setSelectedStatus("");
    setAdminNote("");
  }, [returnRequest]);

  if (!returnRequest) return null;

  const availableStatuses =
    RETURN_STATUS_TRANSITIONS[returnRequest.status] || [];

  const requiresReason = selectedStatus === "RETURN_REJECTED";

  const handleSubmit = () => {
    onSubmit?.({
      status: selectedStatus,
      adminNote,
    });
  };

  return (
    <div>
      <div className="grid gap-4">
        {availableStatuses.map((status) => (
          <StatusOptionCard
            key={status}
            value={status}
            label={STATUS_LABELS[status]}
            selected={selectedStatus === status}
            onClick={setSelectedStatus}
          />
        ))}
      </div>

      {requiresReason && (
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Rejection Reason
          </label>

          <textarea
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            rows={4}
            className="w-full border rounded-lg p-3"
            placeholder="Enter rejection reason..."
          />
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button
          disabled={
            !selectedStatus || loading || (requiresReason && !adminNote.trim())
          }
          onClick={handleSubmit}
        >
          Update Status
        </Button>
      </div>
    </div>
  );
};

export default UpdateReturnStatusModal;
