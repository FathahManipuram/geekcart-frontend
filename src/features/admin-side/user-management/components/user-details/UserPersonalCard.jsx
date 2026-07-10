import React from "react";

const UserPersonalCard = ({ user }) => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-6 text-lg font-bold">Personal Details</h2>

      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground text-xs uppercase">Full Name</p>

          <p className="mt-1 font-medium">{user.fullName}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Email Address
          </p>

          <p className="mt-1 font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs uppercase">
            Phone Number
          </p>

          <p className="mt-1 font-medium">{user.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPersonalCard;
