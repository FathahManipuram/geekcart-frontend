import StatsCard from '@/shared/components/StatsCard';
import React from 'react'

const SubcategoryStats = ({activeSubcategories, totalSubcategories, totalCategories}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard title="Total Subcategories" value={totalSubcategories} />
      <StatsCard title="Total Categories" value={totalCategories} />
      <StatsCard title="Active Subcategories" value={activeSubcategories} />
    </div>
  );
}

export default SubcategoryStats
