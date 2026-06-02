import React, { useEffect } from 'react'
import { useDashboardStore } from '../store/dashboard.store';
import DashboardStats from '../components/DashboardStats';
import SubcategoryBreakdown from '../components/SubcategoryBreakdown';

const AdminDashboardPage = () => {
	const {fetchDashboard, userDetails, subcategoryBreakdown}= useDashboardStore()


	useEffect(()=>{
		fetchDashboard()
	}, [])
  return (
    <div className="space-y-8">
      <DashboardStats data={userDetails} />
	  <SubcategoryBreakdown data={subcategoryBreakdown}/>
    </div>
  );

}

export default AdminDashboardPage
