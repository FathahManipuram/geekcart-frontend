import { Button } from '@/shared/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { UserPlus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserManagementHeader = () => {
	const navigate= useNavigate()
  return (
    <div className="space-y-6">
      <div className="flex justify-between sm:flex-col gap-3 lg:flex-row">
        <h1 className="text-4xl font-bold">User Management</h1>

        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => navigate("/admin/user-management/users/create")}>
            <UserPlus size={16} />
            Add New User
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserManagementHeader
