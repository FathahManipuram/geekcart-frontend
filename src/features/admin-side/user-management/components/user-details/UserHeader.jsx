import React, { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { useUserManagementStore } from "../../stores/userManagement.store";
import { toast } from "sonner";
import ConfirmModal from "@/shared/components/ConfirmModal";
import Modal from "@/shared/components/Modal";
import UserForm from "../create-user/UserForm";
import { updateUserSchema } from "../../validations/updateUser.validation";
import { monthYearFormat } from "@/shared/utils/date";

const UserHeader = ({ user }) => {
  const[openUserEditModal, setUserEditModal]= useState(false)
  const [blockModalOpen, setBlockModalOpen] = useState(false)
  const blockUser= useUserManagementStore((state)=> state.blockUser)
  const loading= useUserManagementStore((state)=> state.loading)
  const {selectedUser, updateUser}= useUserManagementStore()

const handleBlock= async()=>{
  try{
    await blockUser(selectedUser._id)

    toast.success(selectedUser.isBlocked ? "User unblocked": "User blocked")
    setBlockModalOpen(false)
  }catch(err){
    toast.error(err.response?.data?.message)
  }
}


const handleSubmit= async(data)=>{
 try{
   const finalData={}
  Object.keys(data).forEach((key)=>{
    const value= data[key]

    if(value !== "" && value !==undefined){
      finalData[key]= value
    }
  })

  const res= await updateUser(selectedUser._id, finalData)
  toast.success(res.message || "User updated")
  setUserEditModal(false)

 }catch(err){
  toast.error(err.response?.data?.message || "User updation failed")
 }
}

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-5">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="
            w-24
            h-24
            rounded-2xl
            object-cover
          "
          />

          <div>
            <p
              className={`uppercase tracking-[0.2em] text-xs font-semibold ${
                user?.isBlocked ? "text-destructive" : "text-green-600"
              }`}
            >
              {`${user.isBlocked ? "Blocked Member" : "Active Member"}`}
            </p>

            <h1 className="text-4xl font-bold mt-1">{user.fullName}</h1>

            <p className="text-muted-foreground mt-2">
              Active User since {`${monthYearFormat(user.createdAt)}`}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-4">
          <Button
            onClick={() => setUserEditModal(true)}
            variant="outline"
            className="cursor-pointer"
          >
            Edit User
          </Button>

          <Button
            onClick={() => {
              setBlockModalOpen(true);
            }}
            variant={user?.isBlocked ? "default" : "destructive"}
            className="cursor-pointer"
          >
            {user?.isBlocked ? "Unblock User" : "Block User"}
          </Button>
        </div>
      </div>

      <ConfirmModal
        open={blockModalOpen}
        onOpenChange={setBlockModalOpen}
        title={selectedUser?.isBlocked ? "Unblock User" : "Block User"}
        description={
          selectedUser?.isBlocked
            ? "Are you sure you want to unblock this user?"
            : "Are you sure you want to block this user?"
        }
        confirmText={selectedUser?.isBlocked ? "Unblock" : "Block"}
        onConfirm={handleBlock}
        loading={loading}
      />

      <Modal
        open={openUserEditModal}
        onOpenChange={setUserEditModal}
        title="Update User"
      >
        <UserForm
          initialData={selectedUser}
          onClose={() => setUserEditModal(false)}
          onSubmit={handleSubmit}
          schema={updateUserSchema}
        />
      </Modal>
    </>
  );
};

export default UserHeader;
