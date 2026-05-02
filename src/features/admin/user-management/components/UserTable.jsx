import React from 'react'
import UserRow from './UserRow'
import { useAdminStore } from '../../auth/admin.store'

const UserTable = () => {
  const {users}= useAdminStore()
  return (
	 <table className="w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
          <th>Joined</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <UserRow key={user._id} user={user} />
        ))}
      </tbody>
    </table>
  )
}

export default UserTable
