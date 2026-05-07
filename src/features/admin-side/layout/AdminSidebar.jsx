
import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
	<div>
	  <Link to="/admin/users">User Management</Link>
	</div>
  )
}

export default AdminSidebar
