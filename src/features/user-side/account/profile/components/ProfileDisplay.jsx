import Modal from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { formatDateForDisplay } from "@/shared/utils/date";
import { Edit } from "lucide-react";
import ProfileForm from "./ProfileForm";

const ProfileDisplay = ({ user, editProfileOpen, setEditProfileOpen }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Personal Information</h2>
        <Button
          onClick={() => setEditProfileOpen(true)}
          className="cursor-pointer"
        >
          <span>
            <Edit />
          </span>
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
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
