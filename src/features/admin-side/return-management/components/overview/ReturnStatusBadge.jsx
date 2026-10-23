import React from "react";
import { STATUS_STYLES } from "../../constants/return.constants";

const ReturnStatusBadge = ({ status = "" }) => {
  const currentStyle =
    STATUS_STYLES?.[status] || "bg-neutral-100 text-neutral-700";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap sm:px-3 sm:py-1 sm:text-xs ${currentStyle}`}
    >
      {status ? status.replaceAll("_", " ").toUpperCase() : "N/A"}
    </span>
  );
};

export default ReturnStatusBadge;
