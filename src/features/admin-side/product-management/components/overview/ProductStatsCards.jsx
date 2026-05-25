import StatsCard from '@/shared/components/StatsCard';
import React from 'react'

const ProductStatsCards = ({productStats}) => {

	const stats = [
    {
      title: "Total SKU Units",
      value: productStats?.totalSkuUnits,
    },

    {
      title: "Low Stock Alerts",
      value: productStats?.lowStockAlerts,
      valueClassName: "text-red-600",
    },

    {
      title: "Active Subcategories",
      value: productStats?.activeSubcategories,
    },

    {
      title: "Inventory Value",
      value: productStats?.inventoryValue,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
     {stats.map((stat)=>(
		<StatsCard key={stat.title} title={stat.title} value={stat.value} className={stat.valueClassName}/>
	 ))}
    </div>
  );
}

export default ProductStatsCards
