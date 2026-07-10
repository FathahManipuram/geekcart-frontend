import { formatDateTime } from "@/shared/utils/date";
import ReturnStatusBadge from "../overview/ReturnStatusBadge";
import Header from "@/shared/components/Header";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

const ReturnDetailsHeader = ({
  returnRequest,
  onApprove,
  onReject,
  loading,
}) => {
  const navigate = useNavigate();
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      {/* Left Side */}
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs tracking-wider break-all uppercase">
          <span
            className="hover:text-primary cursor-pointer"
            onClick={() => navigate("/admin/returns")}
          >
            Returns /
          </span>
          <span className="ml-1 font-medium">{returnRequest?._id}</span>
        </p>

        <Header title="Return Request" />

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <p className="text-muted-foreground text-sm">
            Initiated on {formatDateTime(returnRequest?.requestedAt)}
          </p>

          <ReturnStatusBadge status={returnRequest?.status} />
        </div>
      </div>

      {/* Right Side */}
      {returnRequest?.status === "RETURN_PENDING" && (
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-row">
          <Button
            variant="outline"
            onClick={onReject}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Reject Request
          </Button>

          <Button
            onClick={onApprove}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Approve Return
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReturnDetailsHeader;
