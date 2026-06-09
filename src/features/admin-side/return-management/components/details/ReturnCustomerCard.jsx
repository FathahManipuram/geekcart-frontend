import { formatDate } from "@/shared/utils/date";

const ReturnCustomerCard = ({ returnRequest }) => {
  const customer = returnRequest?.user;
  const order = returnRequest?.order;
  const item = returnRequest?.orderItem;

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-6">Customer Information</h2>

      <div className="space-y-5">
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">
            Customer
          </p>

          <p className="font-medium">{customer?.name}</p>

          <p className="text-sm text-muted-foreground">{customer?.email}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">
            Order Number
          </p>

          <p className="font-medium">#{order?.orderNumber}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">
            Order Date
          </p>

          <p>{formatDate(order?.createdAt)}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">
            Purchase Price
          </p>

          <p className="font-semibold">₹{item?.salePrice ?? item?.price}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">
            Return Status
          </p>

          <p className="font-medium">
            {returnRequest?.status?.replaceAll("_", " ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnCustomerCard;
