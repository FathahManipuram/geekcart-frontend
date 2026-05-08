import React from "react";

const StatsCard = ({ title, value, icon }) => {
  const Icon = icon;

  return (
    <div className="bg-white rounded-2xl border p-6">
      <Icon size={20} className="text-[#8B5E3C]" />

      <h2 className="text-3xl font-bold mt-4">{value}</h2>

      <p className="text-sm text-muted-foreground uppercase tracking-wider">
        {title}
      </p>
    </div>
  );
};

export default StatsCard;
