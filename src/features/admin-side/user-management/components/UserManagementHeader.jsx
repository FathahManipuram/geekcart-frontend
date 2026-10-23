import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import { useUserManagementStore } from "../stores/userManagement.store";
import Modal from "@/shared/components/Modal";
import UserForm from "./create-user/UserForm";
import { toast } from "sonner";
import { createUserApi } from "../api/api.userManagement";
import { createUserSchema } from "../validations/createUser.validation";
import Header from "@/shared/components/Header";

const UserManagementHeader = () => {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const { status, search, fetchUsers } = useUserManagementStore();

  const handleStatusChange = (value) => {
    fetchUsers({
      page: 1,
      limit: 5,
      search,
      status: value,
    });
  };

  const handleSubmit = async (data) => {
    try {
      const res = await createUserApi(data);
      toast.success(res.message || "User created successfully");
      setOpenCreateUserModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "User creation failed");
    }
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Responsive Container: Stacks vertically on mobile, aligns horizontally on sm+ */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Header title="User Management" />

          {/* Action Toolbar: Full-width stacked on mobile, inline flex on tablet/desktop */}
          <div className="flex w-full gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setOpenCreateUserModal(true)}
              className="flex cursor-pointer items-center justify-center gap-2 sm:w-auto"
            >
              <UserPlus size={16} />
              <span>Add New User</span>
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={openCreateUserModal}
        onOpenChange={setOpenCreateUserModal}
        title="Add New User"
      >
        <UserForm
          onClose={() => setOpenCreateUserModal(false)}
          onSubmit={handleSubmit}
          schema={createUserSchema}
        />
      </Modal>
    </>
  );
};

export default UserManagementHeader;
