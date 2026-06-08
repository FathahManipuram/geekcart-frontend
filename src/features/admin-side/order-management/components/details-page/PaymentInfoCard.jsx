import PaymentStatusBadge from "../overview-page/PaymentStatusBadge";


const PaymentInfoCard = ({ order }) => {
  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-semibold mb-4">Payment Information</h3>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Method</p>

          <p>{order?.paymentMethod}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Status</p>

          <PaymentStatusBadge status={order?.paymentStatus} />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
