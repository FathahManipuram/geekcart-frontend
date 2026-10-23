import { useAuthStore } from "@/features/auth/store/auth.store";
import { ImageUp } from "lucide-react";
import React, { useRef } from "react";
import { toast } from "sonner";

const EditProfileImageForm = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const uploadImage = useAuthStore((state) => state.uploadProfileImage);
  const fileRef = useRef();

  const handleChange = async (e) => {
    const file = e.target.files[0];
  
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("only image allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5 MB");
      return;
    }
    try {
      const res= await uploadImage(file);
      toast.success(res.message || "Profile image updated");
    } catch(err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="flex h-45 w-full flex-col items-center justify-center gap-2">
      <div className="relative">
        <img
          src={user?.avatar}
          alt="profile"
          className="h-20 w-20 rounded-full border bg-amber-100 object-cover"
        />
        <button
          type="button"
          disabled={loading}
          onClick={() => fileRef.current.click()}
          className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-amber-300 p-1 text-center shadow disabled:opacity-50"
        >
          {loading ? "..." : <ImageUp size={14} />}
        </button>
      </div>
      <div className="pt-4 flex flex-col items-center justify-center sm:hidden">
        <p className="text-sm font-medium">{user.fullName}</p>
        <p className="text-xs">{user.email}</p>
      </div>

      <input
        type="file"
        ref={fileRef}
        onChange={handleChange}
        accept="image/*"
        hidden
      />
    </div>
  );
};

export default EditProfileImageForm;
