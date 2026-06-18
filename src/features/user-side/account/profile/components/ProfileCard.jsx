import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import { useAuthStore } from "@/features/auth/store/auth.store";
import EditProfileImageForm from "./EditProfileImageForm";
import ProfileDisplay from "./ProfileDisplay";
import ProfileDisplayTwo from "./ProfileDisplayTwo";
import ProfileDisplayThree from "./ProfileDisplayThree";


const ProfileCard = () => {
  const user = useAuthStore((state) => state.user);

  const [emailEditOpen, setEmailEditOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [passwordEditOpen, setPasswordEditOpen] = useState(false);
 
  return (
    <div className="flex flex-col gap-2 bg-card border p-8 rounded-xl w-full">
      <EditProfileImageForm user={user} />
      <ProfileDisplay
        user={user}
        editProfileOpen={editProfileOpen}
        setEditProfileOpen={setEditProfileOpen}
      />
      <ProfileDisplayTwo
        user={user}
        emailEditOpen={emailEditOpen}
        setEmailEditOpen={setEmailEditOpen}
      />
      <ProfileDisplayThree
        user={user}
        passwordEditOpen={passwordEditOpen}
        setPasswordEditOpen={setPasswordEditOpen}
      />
    </div>
  );
};

export default ProfileCard;
