import React from "react";

const AttributeBadges = ({ attributes = [] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {attributes.map((attribute) => (
        <span
          key={attribute}
          className="bg-muted rounded-full px-3 py-1 text-xs font-medium"
        >
          {attribute}
        </span>
      ))}
    </div>
  );
};

export default AttributeBadges;
