import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

const OrderHistoryActions = ({ order }) => {
  const navigate = useNavigate();

  const delivered = order.orderStatus === "DELIVERED";

  return (
    <div className="flex gap-2 flex-wrap justify-end">
      <Button
        variant="outline"
        onClick={() => navigate(`/orders/${order._id}`)}
      >
        View Details
      </Button>

      {!delivered && (
        <Button onClick={() => navigate(`/orders/${order._id}/tracking`)}>
          Track Order
        </Button>
      )}

      {delivered && (
        <>
          <Button
            variant="outline"
            onClick={() => navigate(`/orders/${order._id}/return`)}
          >
            Return Item
          </Button>

          <Button variant="outline">Buy Again</Button>
        </>
      )}
    </div>
  );
};

export default OrderHistoryActions;
