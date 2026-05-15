import StatsCard from '@/shared/components/StatsCard';
import React from 'react'

const CategoryStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard title="Total Categories" value="0"  />
      <StatsCard title="Active Categories" value="0"/>
      <StatsCard title="Total subCategories" value="0"/>
    </div>
  );
}

export default CategoryStats
