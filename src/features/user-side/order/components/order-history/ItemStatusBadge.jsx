import React from "react";
import { STATUS_STYLES } from "../../constants/statusStyles";

const ItemStatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[status] || "bg-gray-100 text-gray-700"} `}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
};

export default ItemStatusBadge;
