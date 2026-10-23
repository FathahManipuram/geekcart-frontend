import Modal from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { formatDateForDisplay } from "@/shared/utils/date";
import { Edit, Edit3 } from "lucide-react";
import ProfileForm from "./ProfileForm";

const ProfileDisplay = ({ user, editProfileOpen, setEditProfileOpen }) => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Personal Information</h2>

          <span
            onClick={() => setEditProfileOpen(true)}
            className="cursor-pointer rounded-sm bg-amber-200 p-1"
          >
            <Edit3 size={12} />
          </span>
       
      </div>

      <div className="mb-3 grid grid-cols-2 gap-4 text-sm">
        <div>
          <Label>FULL NAME</Label>
          <Input
            value={user?.fullName}
            readOnly
            type="text"
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label>PHONE NUMBER</Label>
          <Input
            placeholder="+91 "
            value={user?.phoneNumber}
            readOnly
            type="tel"
            className="h-8"
          />
        </div>

        <div>
          <Label>GENDER</Label>
          <Input
            value={user?.gender || "- -"}
            readOnly
            type="text"
            className="h-8"
          />
        </div>

        <div>
          <Label>DATE OF BIRTH</Label>
          <Input
            value={formatDateForDisplay(user?.dateOfBirth)}
            readOnly
            type="text"
            className="h-8"
          />
        </div>
      </div>

      <Modal
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        title="Edit Profile"
      >
        <ProfileForm onClose={() => setEditProfileOpen(false)} user={user} />
      </Modal>
    </>
  );
};

export default ProfileDisplay;
