import React from "react";
const STATUS_LABELS = {
  active: "ACTIVE",
  inactive: "INACTIVE",
};

const STATUS_STYLES = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-700",
};

const StatusBadge = ({
  status,
  statusLabels = STATUS_LABELS,
  statusStyles = STATUS_STYLES,
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold ${statusStyles[status]} `}
    >
      ● {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;
