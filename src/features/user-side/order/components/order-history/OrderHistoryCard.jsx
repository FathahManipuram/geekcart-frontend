import OrderHistoryActions from "./OrderHistoryActions";

const OrderHistoryCard = ({ order }) => {
  const firstItem = order?.items?.[0];
  console.log("firstItem: ", firstItem)
console.log("test: ", order)
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="flex justify-between gap-6">
        <div className="flex gap-5">
          <img
            src={firstItem?.image}
            alt={firstItem?.name}
            className="w-28 h-28 rounded-lg object-cover"
          />

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs bg-muted">
              {order.orderStatus}
            </span>

            <p className="mt-2 text-xs text-muted-foreground">
              #{order.orderNumber}
            </p>

            <h3 className="text-xl font-semibold mt-2">
              {firstItem?.name}
              {order.items.length > 1 && ` (+${order.items.length - 1} more)`}
            </h3>

            <p className="text-muted-foreground mt-2">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end">
          <div>
            <p className="text-xs uppercase text-muted-foreground">
              Order Total
            </p>

            <p className="text-3xl font-bold">₹{order.totalAmount}</p>
          </div>

          <OrderHistoryActions order={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;