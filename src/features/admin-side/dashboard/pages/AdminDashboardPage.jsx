import React, { useEffect, useState } from "react";
import { useDashboardStore } from "../store/dashboard.store";

import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import UserGrowthChart from "../components/UserGrowthChart";
import SalesChart from "../components/SalesChart";
import TopProducts from "../components/TopProducts";
import TopSubcategories from "../components/TopSubcategories";
import SubcategoryBreakdown from "../components/SubcategoryBreakdown";

const AdminDashboardPage = () => {
  const [salesFilter, setSalesFilter] = useState("monthly");

  const {
    fetchDashboard,
    userDetails,
    userGrowth,
    salesChart,
    topProducts,
    topSubcategories,
    subcategoryBreakdown,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboard(salesFilter);
  }, [salesFilter, fetchDashboard]);

  return (
    // Max width wrapper with explicit horizontal padding adjustments for mobile screens
    <div className="w-full max-w-7xl mx-auto space-y-6 px-2 sm:px-4 md:px-6 py-4">
      <DashboardHeader />

      <DashboardStats data={userDetails} />

      <div className="w-full overflow-hidden">
        <UserGrowthChart data={userGrowth} />
      </div>

      {/* Primary Row: Sales & Products Charts */}
      {/* Defaults to 1 column on mobile, drops to 3 columns on large desktop viewports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 w-full overflow-hidden">
          <SalesChart
            data={salesChart}
            activeFilter={salesFilter}
            onFilterChange={setSalesFilter}
          />
        </div>

        <div className="w-full">
          <TopProducts data={topProducts} />
        </div>
      </div>

      {/* Secondary Row: Subcategory Aggregations */}
      {/* Stacks on mobile, splits 50/50 starting at large tablet/laptop dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <TopSubcategories data={topSubcategories} />
        </div>
        <div className="w-full">
          <SubcategoryBreakdown data={subcategoryBreakdown} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
