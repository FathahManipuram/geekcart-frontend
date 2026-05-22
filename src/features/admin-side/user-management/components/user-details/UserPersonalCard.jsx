import React from "react";

const UserPersonalCard = ({ user }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        border
      "
    >
      <h2 className="font-bold text-lg mb-6">Personal Details</h2>

      <div className="space-y-6">
        <div>
          <p className="text-xs text-muted-foreground uppercase">Full Name</p>

          <p className="font-medium mt-1">{user.fullName}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase">
            Email Address
          </p>

          <p className="font-medium mt-1">{user.email}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase">
            Phone Number
          </p>

          <p className="font-medium mt-1">{user.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPersonalCard;
