import React from "react";

const StatusOptionCard = ({
  value,
  label,
  selected,
  isCurrent,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick(value)}
      className={`min-w-[120px] rounded-lg border p-4 transition-all ${
        isCurrent
          ? "border-green-500 bg-green-50"
          : selected
            ? "border-primary bg-primary/5"
            : "border-gray-200"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
    >
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
export default StatusOptionCard;
