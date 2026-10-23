import React, { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { toast } from "sonner";

const ProfilePage = () => {
  useEffect(() => {
    const { fetchProfile } = useAuthStore.getState();

    fetchProfile().catch((err) => {
      console.error("Failed to fetch profile:", err);
      const errorMessage =
        err?.response?.data?.message || "Failed to load profile";
      toast.error(errorMessage);
    });
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-5xl">
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;
