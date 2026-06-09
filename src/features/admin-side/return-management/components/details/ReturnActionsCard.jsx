import { Button } from "@/shared/components/ui/button";

const ReturnActionsCard = ({
  returnRequest,
  onApprove,
  onReject,
  onMarkReceived,
  onProcessRefund,
  loading,
}) => {
  const status = returnRequest?.status;

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-6">Administrative Actions</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {status === "RETURN_PENDING" && (
          <>
            <Button
              onClick={() => onApprove(returnRequest._id)}
              disabled={loading}
            >
              Approve Return
            </Button>

            <Button
              variant="destructive"
              onClick={() => onReject(returnRequest._id)}
              disabled={loading}
            >
              Reject Return
            </Button>
          </>
        )}

        {status === "RETURN_APPROVED" && (
          <Button
            onClick={() => onMarkReceived(returnRequest._id)}
            disabled={loading}
          >
            Mark As Received
          </Button>
        )}

        {status === "ITEM_RECEIVED" && (
          <Button
            onClick={() => onProcessRefund(returnRequest._id)}
            disabled={loading}
          >
            Process Refund
          </Button>
        )}

        {status === "RETURN_COMPLETED" && (
          <p className="text-sm text-green-600 font-medium">Return Completed</p>
        )}

        {status === "RETURN_REJECTED" && (
          <p className="text-sm text-red-600 font-medium">Return Rejected</p>
        )}
      </div>
    </div>
  );
};

export default ReturnActionsCard;
