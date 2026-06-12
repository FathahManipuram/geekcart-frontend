import PaymentStatusBadge from "../overview-page/PaymentStatusBadge";


const PaymentInfoCard = ({ order }) => {
  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-semibold mb-4">Payment & Delivery Information</h3>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Payment Method</p>

          <p>{order?.paymentMethod}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Payment Status</p>

          <PaymentStatusBadge status={order?.paymentStatus} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Delivery Method</p>

          <p>{order?.deliveryMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
