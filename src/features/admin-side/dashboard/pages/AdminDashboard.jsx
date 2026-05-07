import React from 'react'

const AdminDashboard = () => {
  return (
	<div className='p-6 space-y-6'>
		      <h1 className="text-2xl font-bold">Geekcart Admin</h1>
	    <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} />
        <StatCard title="Pending" value={stats.pending} />
        <StatCard title="Cancelled" value={stats.cancelled} />
      </div>

	   <div className="grid grid-cols-2 gap-6">
        <div>Sales Chart</div>
        <div>Order Status</div>
      </div>

	</div>
  )
}

export default AdminDashboard
