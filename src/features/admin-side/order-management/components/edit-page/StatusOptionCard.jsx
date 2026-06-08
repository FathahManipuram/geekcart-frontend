import React from 'react'

const StatusOptionCard = ({ value, label, selected, isCurrent, disabled, onClick }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(value)}
      className={`
  border rounded-lg p-4
  min-w-[120px]
  transition-all

  ${
    isCurrent
      ? "border-green-500 bg-green-50"
      : selected
        ? "border-primary bg-primary/5"
        : "border-gray-200"
  }

  ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
`}
    >
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
export default StatusOptionCard
