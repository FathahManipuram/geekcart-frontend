import StatsCard from "@/shared/components/StatsCard";
import React from "react";

const DashboardStats = ({ data }) => {
  const cards = [
    {
      title: "Total Users",
      value: data?.totalUsers || 0,
    },
    {
      title: "Active Users",
      value: data?.activeUsers || 0,
    },
    {
      title: "Categories",
      value: data?.totalCategories || 0,
    },
    {
      title: "Subcategories",
      value: data?.totalSubcategories || 0,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {cards.map((card, index) => (
        <StatsCard key={index} title={card.title} value={card.value} />
      ))}
    </div>
  );
};

export default DashboardStats;
