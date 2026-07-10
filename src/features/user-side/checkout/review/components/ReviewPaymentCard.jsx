import React from "react";

const ReviewPaymentCard = ({ selectedPaymentMethod, onEdit }) => {
  return (
    <div className="rounded-xl border p-5">
      <div className="mb-4 flex justify-between">
        <h3 className="font-semibold">Payment Method</h3>

        <button onClick={onEdit} className="text-primary cursor-pointer">
          Edit
        </button>
      </div>

      <p>{selectedPaymentMethod}</p>
    </div>
  );
};

export default ReviewPaymentCard;
