import React, { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { useAuthStore } from "@/features/auth/store/auth.store";
import AccountSidebar from "../../components/AccountSidebar";

const ProfilePage = () => {
  const fetchProfile = useAuthStore((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  return (
    <div className="flex flex-row bg-muted-foreground p-4 gap-2">
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
