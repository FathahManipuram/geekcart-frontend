import React, { useEffect } from 'react'
import { useAdminStore } from '../auth/admin.store'
import { Edit3, Eye, Trash } from 'lucide-react'

const UserTable = () => {
	const {users, toggleBlock, fetchUsers}= useAdminStore()
	useEffect(()=>{
		fetchUsers()
	},[])
	
  return (
	<div>
	  <table>
		<thead>
			<tr>
				<th>Name & Identity</th>
				<th>Role</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
		</thead>

		<tbody>
			{users.map((user)=>(
				<tr key={user._id}>
					<td>
						<div></div>
						<div>
							<p>{user.fullName}</p>
							<p>{user.email}</p>
						</div>
					</td>
					<td>{user.role}</td>

					<td>{user.isBlocked ? "Blocked": "Active"}</td>
					<td>
						<button><Edit3/></button>
						<button><Trash/></button>
						<button><Eye/></button>
					</td>
				</tr>
			))}
		</tbody>
	  </table>
	</div>
  )
}

export default UserTable
