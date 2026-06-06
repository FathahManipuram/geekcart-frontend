import DataTable from '@/shared/components/DataTable';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import RoleBadge from './RoleBadge';
import UserIdentityCell from './UserIdentityCell';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '@/shared/components/ConfirmModal';
import { useUserManagementStore } from '../stores/userManagement.store';
import { toast } from 'sonner';

const UserTable = ({users, loading}) => {
const [deleteModalOpen, setDeleteModalOpen]= useState(false)
const [selectedUser, setSelectedUser]= useState(null)

const navigate= useNavigate()

const deleteUser= useUserManagementStore((state)=> state.deleteUser)

  const handleDelete= async()=>{
  if(!selectedUser) return
    try{
      console.log("selectedUser: ", selectedUser)
      await deleteUser(selectedUser._id)
    toast.success("User deleted successfully")
    setDeleteModalOpen(false)
    setSelectedUser(null)

    }catch(err){
      toast.error(err.response?.data?.message)
  }

    
  }

   const handleView = (user) => {
     console.log("View:", user);
     navigate(`users/${user._id}`);
     
   };

  const columns = [
    {
      header: "NAME & IDENTITY ",
      cell: (user) => (
        <UserIdentityCell user={user}/>
      ),
    },

    {
      header: "ROLE",
      cell: (user)=>(
        <RoleBadge role={user.role}/>
      )
    },

    {
      header: "STATUS",

      cell: (user) => (
        <span className={user.isBlocked ? "text-red-500" : "text-green-600"}>
          {user.isBlocked ? "Blocked" : "Active"}
        </span>
      ),
    },

    {
      header: "JOINED DATE",

      cell: (user) => new Date(user.createdAt).toLocaleDateString(),
    },

    {
      header: "ACTIONS",
      cell: (user) => (
        <div className="flex items-center gap-4">

          {/* DELETE */}
          <button
            onClick={() =>{
              setSelectedUser(user)
              setDeleteModalOpen(true)
            }}
            className="
              text-red-500
              hover:text-red-700
              transition
            "
          >
            <Trash2 size={16} />
          </button>

          {/* VIEW */}
          <button
            onClick={() => handleView(user)}
            className="
              text-muted-foreground
              hover:text-black
              transition
            "
          >
            <Eye size={16} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        emptyMessage="No users found"
      />

      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete User"
        description={`Are you sure you want
    to delete ${selectedUser?.fullName || "this user"}?`}
        confirmText="Delete User"
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}

export default UserTable
