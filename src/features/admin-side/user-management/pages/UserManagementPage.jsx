import React from "react";
import UserStats from "../components/UserStats";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import { useUserManagementStore } from "../stores/userManagement.store";
import UserManagementHeader from "../components/UserManagementHeader";
import Pagination from "@/shared/components/Pagination";
import CreateUserForm from "../components/create-user/UserForm";
import UserStatsCard from "../components/UserStatsCard";

const UserManagementPage = () => {
  const { fetchUsers, users, loading, currentPage, totalPages, totalUsers, search, status, activeUsers, blockedUsers, totalAdmins } =
    useUserManagementStore()


  const handlePageChange=(page)=>{
fetchUsers({
      page,
      limit: 5,
      search,
      status,
    });
  }

  return (
    <div className="space-y-8">
      <UserManagementHeader />

      <SearchBar />

      <UserStatsCard totalUsers={totalUsers} activeUsers={activeUsers} blockedUsers={blockedUsers} totalAdmins={totalAdmins}/>

      <UserTable users={users} loading={loading} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserManagementPage;
