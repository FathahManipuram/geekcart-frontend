import React from 'react'


const PaymentMethodCard = ({ method, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(method.id)}
      className={`
        w-full
        p-5
        border
        rounded-xl
        text-left
        transition
        ${selected ? "border-primary bg-primary/5" : ""}
      `}
    >
      <div className="flex gap-3 items-center">
        <input type="radio" checked={selected} readOnly className='accent-primary'/>

        <div>
          <h3 className="font-medium">{method.title}</h3>

          <p className="text-sm text-muted-foreground">{method.description}</p>
        </div>
      </div>
    </button>
  );
};
export default PaymentMethodCard
