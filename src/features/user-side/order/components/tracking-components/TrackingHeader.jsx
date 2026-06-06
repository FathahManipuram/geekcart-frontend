const TrackingHeader = ({ order }) => {
  return (
    <div>
      <p className="uppercase text-xs tracking-widest text-primary">
        Order Status
      </p>

      <h1 className="text-5xl font-bold mt-3">#{order?.orderNumber}</h1>

      <p className="text-muted-foreground mt-3">
        Placed on {new Date(order?.createdAt).toLocaleDateString()}
        {" • "}
        Expected Delivery: {order?.expectedDeliveryDate}
      </p>
    </div>
  );
};

export default TrackingHeader;
