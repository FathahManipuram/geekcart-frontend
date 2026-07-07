import React from 'react'

const ReviewPaymentCard = ({ selectedPaymentMethod, onEdit }) => {
  return (
    <div className="border rounded-xl p-5">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Payment Method</h3>

        <button onClick={onEdit} className="text-primary cursor-pointer">
          Edit
        </button>
      </div>

      <p>{selectedPaymentMethod}</p>
    </div>
  );
};


export default ReviewPaymentCard
