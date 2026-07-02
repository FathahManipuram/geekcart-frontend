import { formatDateTime } from "@/shared/utils/date";
import ReturnStatusBadge from "../overview/ReturnStatusBadge";

const ReturnCustomerCard = ({ returnRequest }) => {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6">
        Customer & Order Information
      </h2>

      <div className="space-y-5">
        {/* Customer */}
        <div>
          <p className="text-xs uppercase text-muted-foreground">Customer</p>

          <p className="font-medium mt-1">{returnRequest?.user?.fullName}</p>

          <p className="text-sm text-muted-foreground">
            {returnRequest?.user?.email}
          </p>
        </div>

        {/* Order */}
        <div>
          <p className="text-xs uppercase text-muted-foreground">
            Order Number
          </p>

          <p className="font-medium mt-1">
            #{returnRequest?.order?.orderNumber}
          </p>
        </div>

        {/* Purchase Date */}
        <div>
          <p className="text-xs uppercase text-muted-foreground">
            Purchase Date
          </p>

          <p className="font-medium mt-1">
            {formatDateTime(returnRequest?.order?.createdAt)}
          </p>
        </div>

        {/* Purchase Price */}
        <div>
          <p className="text-xs uppercase text-muted-foreground">
            Purchase Price
          </p>

          <p className="font-bold mt-1">
            ₹
            {returnRequest?.itemSnapshot?.priceAtPurchase -
              returnRequest?.itemSnapshot?.couponDiscount}
          </p>
        </div>

        {/* Refund */}
        <div>
          <p className="text-xs uppercase text-muted-foreground">
            Refund Amount
          </p>

          <p className="font-medium mt-1">
            ₹{returnRequest?.refundAmount || 0}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="text-xs uppercase text-muted-foreground mb-2">
            Payment Method
          </p>
          <p className="font-medium mt-1">
            {returnRequest?.order?.paymentMethod}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-muted-foreground mb-2">
            Payment Status
          </p>
          <p className="font-medium mt-1">
            {returnRequest?.order?.paymentStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnCustomerCard;
