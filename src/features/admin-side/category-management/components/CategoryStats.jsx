import StatsCard from '@/shared/components/StatsCard';
import React from 'react'

const CategoryStats = ({activeCategories, totalCategories}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard title="Total Categories" value={totalCategories} />
      <StatsCard title="Active Categories" value={activeCategories} />
      <StatsCard title="Total subCategories" value="0" />
    </div>
  );
}

export default CategoryStats
