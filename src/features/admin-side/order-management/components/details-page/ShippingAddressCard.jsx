const ShippingAddressCard = ({ address }) => {
  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-semibold mb-4">Shipping Address</h3>

      <div className="space-y-1">
        <p>{address?.fullName}</p>

        <p>{address?.addressLine}</p>

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
