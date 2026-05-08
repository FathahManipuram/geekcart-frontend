import React, { useEffect } from "react";

import UserStats from "../components/UserStats";
import UserTable from "../components/UserTable";


import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useUserManagementStore } from "../stores/userManagement.store";
import UserManagementHeader from "../components/UserManagementHeader";

const UserManagementPage = () => {
  const { fetchUsers, users, loading, currentPage, totalPages, totalUsers } =
    useUserManagementStore()

  useEffect(() => {
    fetchUsers({
      page: 1,
      limit: 5,
    });
  }, [fetchUsers]);

  return (
    <div className="space-y-8">
      {/* Header */}
      {/* <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">User Management</h1>

          <p className="text-muted-foreground tracking-widest text-sm mt-2 uppercase">
            Oversee and curate the community
          </p>
        </div>
      </div> */}

      <UserManagementHeader/>

      {/* Search */}
      <SearchBar/>

      {/* Stats */}
      <UserStats totalUsers={totalUsers} />

      {/* Table */}
      <UserTable users={users} loading={loading} />

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default UserManagementPage;
