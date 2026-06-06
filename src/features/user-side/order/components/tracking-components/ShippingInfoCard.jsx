const ShippingInfoCard = ({ address, deliveryMethod }) => {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <h3 className="uppercase text-xs tracking-widest mb-6">
        Shipping Information
      </h3>

      <div>
        <p className="font-semibold">{address?.fullName}</p>

        <p className="text-sm mt-2">{address?.addressLine}</p>

        <p className="text-sm">
          {address?.city}, {address?.state}
        </p>

        <p className="text-sm">{address?.country}</p>
      </div>

      <div className="mt-6">
        <p className="text-xs text-muted-foreground">Delivery Method</p>

        <p className="font-medium mt-1">{deliveryMethod}</p>
      </div>
    </div>
  );
};

export default ShippingInfoCard;
