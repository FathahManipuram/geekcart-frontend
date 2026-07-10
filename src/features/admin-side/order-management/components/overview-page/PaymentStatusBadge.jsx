const STATUS_STYLES = {
  PAID: "bg-green-100 text-green-700",

  PENDING: "bg-yellow-100 text-yellow-700",

  FAILED: "bg-red-100 text-red-700",

  REFUNDED: "bg-blue-100 text-blue-700",
};

const PaymentStatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default PaymentStatusBadge;
