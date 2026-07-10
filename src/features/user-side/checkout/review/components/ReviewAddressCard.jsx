import React from "react";

const ReviewAddressCard = ({ address, onEdit }) => {
  return (
    <div className="rounded-xl border p-5">
      <div className="mb-4 flex justify-between">
        <h3 className="font-semibold">Shipping Address</h3>

        <button onClick={onEdit} className="text-primary cursor-pointer">
          Edit
        </button>
      </div>

      <p className="font-medium">{address?.fullName}</p>

      <p>{address?.addressLine}</p>

      <p>
        {address?.city}, {address?.state}
      </p>

      <p>{address?.pincode}</p>
    </div>
  );
};

export default ReviewAddressCard;
