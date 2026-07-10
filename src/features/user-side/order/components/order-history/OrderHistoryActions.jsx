import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

const OrderHistoryActions = ({ order }) => {
  const navigate = useNavigate();

  const delivered = order.orderStatus === "DELIVERED";

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button
        className="cursor-pointer"
        variant="outline"
        onClick={() => navigate(`/orders/${order._id}`)}
      >
        View Details
      </Button>

      {!delivered && (
        <Button
          className="cursor-pointer"
          onClick={() => navigate(`/orders/${order._id}/tracking`)}
        >
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
        </>
      )}
    </div>
  );
};

export default OrderHistoryActions;
