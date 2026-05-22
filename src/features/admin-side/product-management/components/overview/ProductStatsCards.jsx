import StatsCard from '@/shared/components/StatsCard';
import React from 'react'

const ProductStatsCards = () => {

	const stats = [
    {
      title: "Total SKU Units",
      value: "2,840",
    },

    {
      title: "Low Stock Alerts",
      value: "12",
      valueClassName: "text-red-600",
    },

    {
      title: "Active Subcategories",
      value: "4",
    },

    {
      title: "Inventory Value",
      value: "₹4,28,000",
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
