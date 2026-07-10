const ShippingInfoCard = ({ address, deliveryMethod }) => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-6 text-xs tracking-widest uppercase">
        Shipping Information
      </h3>

      <div>
        <p className="font-semibold">{address?.fullName}</p>

        <p className="mt-2 text-sm">{address?.addressLine}</p>

        <p className="text-sm">
          {address?.city}, {address?.state}
        </p>

        <p className="text-sm">{address?.country}</p>
      </div>

      <div className="mt-6">
        <p className="text-muted-foreground text-xs">Delivery Method</p>

        <p className="mt-1 font-medium">{deliveryMethod}</p>
      </div>
    </div>
  );
};

export default ShippingInfoCard;
