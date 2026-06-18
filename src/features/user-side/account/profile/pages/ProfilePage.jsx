import React, { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { toast } from "sonner";


const ProfilePage = () => {

  useEffect(() => {
    const {fetchProfile}= useAuthStore.getState()
      fetchProfile()

      fetchProfile().catch((err)=>{
        console.error("Failed to fetch profile:", err);
        const errorMessage= err?.response?.data?.message
        toast.error(errorMessage)
      })
    
  }, []);

  return (
    <div className="flex p-4 gap-2 min-h-screen">
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
