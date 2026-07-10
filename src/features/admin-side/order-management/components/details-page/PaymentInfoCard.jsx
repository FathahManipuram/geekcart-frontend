import PaymentStatusBadge from "../overview-page/PaymentStatusBadge";

const PaymentInfoCard = ({ order }) => {
  return (
    <div className="rounded-lg border p-5">
      <h3 className="mb-4 font-semibold">Payment & Delivery Information</h3>

      <div className="space-y-3">
        <div>
          <p className="text-muted-foreground text-sm">Payment Method</p>

          <p>{order?.paymentMethod}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Payment Status</p>

          <PaymentStatusBadge status={order?.paymentStatus} />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Delivery Method</p>

          <p>{order?.deliveryMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
