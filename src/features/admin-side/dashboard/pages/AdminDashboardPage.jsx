import React, { useEffect } from "react";
import { useDashboardStore } from "../store/dashboard.store";

import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import UserGrowthChart from "../components/UserGrowthChart";
import SalesChart from "../components/SalesChart";
import TopProducts from "../components/TopProducts";
import TopSubcategories from "../components/TopSubcategories";
import SubcategoryBreakdown from "../components/SubcategoryBreakdown";

const AdminDashboardPage = () => {
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
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <DashboardStats data={userDetails} />


      <UserGrowthChart data={userGrowth} />


      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart data={salesChart} />
        </div>

        <TopProducts data={topProducts} />
      </div>


      <div className="grid gap-6 lg:grid-cols-2">
        <TopSubcategories data={topSubcategories} />

        <SubcategoryBreakdown data={subcategoryBreakdown} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
