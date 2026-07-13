import StatsCard from "@/shared/components/StatsCard";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import React from "react";

const OrderStatsCard = ({ orderStats }) => {
  const stats = [
    {
      title: "Total Orders",
      value: orderStats?.totalOrders || 0,
    },

    {
      title: "Pending Shipments",
      value: orderStats?.pendingShipments || 0,
    },

    {
      title: "Total Revenue",
      value: `₹${formatCurrency(orderStats?.totalRevenue) || 0}`,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          className={stat.valueClassName}
        />
      ))}
    </div>
  );
};

export default OrderStatsCard;
