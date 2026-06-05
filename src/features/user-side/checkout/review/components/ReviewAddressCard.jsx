import React from 'react'

const ReviewAddressCard = ({ address, onEdit }) => {
  return (
    <div className="border rounded-xl p-5">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Shipping Address</h3>

        <button onClick={onEdit} className="text-primary">
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


export default ReviewAddressCard
