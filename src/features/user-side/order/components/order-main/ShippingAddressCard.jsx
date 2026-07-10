const ShippingAddressCard = ({ address }) => {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>

      <div className="space-y-2 text-sm">
        <p className="font-medium">{address?.fullName}</p>

        <p>{address?.phoneNumber}</p>

        <p>
          {address?.addressLine}
          {address?.landmark && `, ${address?.landmark}`}
        </p>

        <p>
          {address?.city}, {address?.state}
        </p>

        <p>{address?.pincode}</p>

        <p>{address?.country}</p>
      </div>
    </div>
  );
};

export default ShippingAddressCard;
