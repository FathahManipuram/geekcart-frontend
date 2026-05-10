import { Button } from '@/shared/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useUserManagementStore } from '../stores/userManagement.store'
import Modal from '@/shared/components/Modal'
import UserForm from './create-user/UserForm'
import { toast } from 'sonner'
import { createUserApi } from '../api/api.userManagement'
import { createUserSchema } from '../validations/createUser.validation'

const UserManagementHeader = () => {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const {status, search, fetchUsers}= useUserManagementStore()

  const handleStatusChange= (value)=>{
    console.log("value= ", value)
    fetchUsers({
      page:1,
      limit:5,
      search,
      status: value,
    })
  }


  const handleSubmit= async(data)=>{
    try{ 
      const res= await createUserApi(data);
      toast.success(res.message || "User created successfully")
      setOpenCreateUserModal(false)
    }catch(err){
      toast.error(err.response?.data?.message || "User creation failed")
    }
  }
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between sm:flex-col gap-3 lg:flex-row">
          <h1 className="text-4xl font-bold">User Management</h1>

          <div className="flex items-center gap-4">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={()=> setOpenCreateUserModal(true)}
            >
              <UserPlus size={16} />
              Add New User
            </Button>
          </div>
        </div>
      </div>


      <Modal
      open={openCreateUserModal}
      onOpenChange={setOpenCreateUserModal}
      title="Add New User"
      >
<UserForm onClose={()=> setOpenCreateUserModal(false)} onSubmit={handleSubmit} schema={createUserSchema}/> 
      </Modal>
    </>
  );
}

export default UserManagementHeader
