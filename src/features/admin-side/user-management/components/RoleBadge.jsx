import React from "react";

const RoleBadge = ({ role }) => {
  const isAdmin = role === "admin";
  return (
    <span
      className={`rounded-full px-4 py-1 text-xs font-bold tracking-wide uppercase ${isAdmin ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"} `}
    >
      {role}
    </span>
  );
};

export default RoleBadge;
