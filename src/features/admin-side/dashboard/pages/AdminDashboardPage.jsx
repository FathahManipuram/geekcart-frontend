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
    <div className="mx-auto w-full max-w-7xl space-y-6 px-2 py-4 sm:px-4 md:px-6">
      <DashboardHeader />

      <DashboardStats data={userDetails} />

      <div className="w-full overflow-hidden">
        <UserGrowthChart data={userGrowth} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="w-full overflow-hidden lg:col-span-2">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
