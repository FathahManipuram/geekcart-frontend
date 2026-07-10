import { formatDateTime } from "@/shared/utils/date";

const ReturnCustomerCard = ({ returnRequest }) => {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Customer & Order Information
      </h2>

      <div className="space-y-5">
        {/* Customer */}
        <div>
          <p className="text-muted-foreground text-xs uppercase">Customer</p>

          <p className="mt-1 font-medium">{returnRequest?.user?.fullName}</p>

          <p className="text-muted-foreground text-sm">
            {returnRequest?.user?.email}
          </p>
        </div>

        {/* Order */}
        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Order Number
          </p>

          <p className="mt-1 font-medium">
            #{returnRequest?.order?.orderNumber}
          </p>
        </div>

        {/* Purchase Date */}
        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Purchase Date
          </p>

          <p className="mt-1 font-medium">
            {formatDateTime(returnRequest?.order?.createdAt)}
          </p>
        </div>

        {/* Purchase Price */}
        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Purchase Price
          </p>

          <p className="mt-1 font-bold">
            ₹
            {returnRequest?.itemSnapshot?.priceAtPurchase -
              returnRequest?.itemSnapshot?.couponDiscount}
          </p>
        </div>

        {/* Refund */}
        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Refund Amount
          </p>

          <p className="mt-1 font-medium">
            ₹{returnRequest?.refundAmount || 0}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="text-muted-foreground mb-2 text-xs uppercase">
            Payment Method
          </p>
          <p className="mt-1 font-medium">
            {returnRequest?.order?.paymentMethod}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs uppercase">
            Payment Status
          </p>
          <p className="mt-1 font-medium">
            {returnRequest?.order?.paymentStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnCustomerCard;
