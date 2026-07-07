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
    console.log("File: ", file);
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
    <div className="w-full h-45 flex flex-col items-center justify-center gap-2">
      <div className="relative">
        <img
          src={user?.avatar}
          alt="profile"
          className="w-20 h-20 rounded-full bg-amber-100 border object-cover"
        />
        <button
          type="button"
          disabled={loading}
          onClick={() => fileRef.current.click()}
          className="bg-amber-300 p-1 absolute bottom-0 right-0 shadow disabled:opacity-50 rounded-full text-center cursor-pointer"
        >
          {loading ? "..." : <ImageUp size={14} />}
        </button>
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
