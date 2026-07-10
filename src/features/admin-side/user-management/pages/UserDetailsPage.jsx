import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "../components/user-details/UserHeader";
import UserPersonalCard from "../components/user-details/UserPersonalCard";
import UserFinancialCard from "../components/user-details/UserFinancialCard";
import UserAddressCard from "../components/user-details/UserAddressCard";
import { useUserManagementStore } from "../stores/userManagement.store";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const fetchUserById = useUserManagementStore((state) => state.fetchUserById);
  const loading = useUserManagementStore((state) => state.loading);
  const selectedUser = useUserManagementStore((state) => state.selectedUser);
  const selectedUserWallet = useUserManagementStore(
    (state) => state.selectedUserWallet,
  );
  const selectedUserAddress = useUserManagementStore(
    (state) => state.selectedUserAddress,
  );

  useEffect(() => {
    fetchUserById(userId);
  }, [fetchUserById, userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!selectedUser) {
    return <p>User not found</p>;
  }
  return (
    <>
      <div>
        <UserHeader user={selectedUser} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <UserPersonalCard user={selectedUser} />
        <UserFinancialCard wallet={selectedUserWallet} />
        <UserAddressCard address={selectedUserAddress} />
      </div>
    </>
  );
};

export default UserDetailsPage;
