import React, { useEffect } from 'react'
import { useDashboardStore } from '../store/dashboard.store';
import DashboardStats from '../components/DashboardStats';
import SubcategoryBreakdown from '../components/SubcategoryBreakdown';
import UserGrowthChart from '../components/UserGrowthChart';
import DashboardHeader from '../components/DashboardHeader';

const AdminDashboardPage = () => {
	const {fetchDashboard, userDetails, subcategoryBreakdown, userGrowth}= useDashboardStore()


	useEffect(()=>{
		fetchDashboard()
	}, [])
  return (
    <div className="space-y-6">
		<DashboardHeader/>
      <DashboardStats data={userDetails} />

      <div className="grid gap-6 lg:grid-cols-3">
        
        <div className="lg:col-span-2">
          <UserGrowthChart data={userGrowth} />
        </div>

        <div>
          <SubcategoryBreakdown
            data={subcategoryBreakdown}
          />
        </div>

      </div>
    </div>
  );

}

export default AdminDashboardPage
