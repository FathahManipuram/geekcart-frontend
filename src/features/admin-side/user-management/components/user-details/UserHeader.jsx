import React from "react";

import { Button } from "@/shared/components/ui/button";

const UserHeader = ({ user }) => {
  return (
    <div className="flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-5">
        <img
          src={user.avatar}
          alt={user.fullName}
          className="
            w-24
            h-24
            rounded-2xl
            object-cover
          "
        />

        <div>
          <p
            className="
              uppercase
              tracking-[0.3em]
              text-xs
              text-muted-foreground
            "
          >
            Active Member
          </p>

          <h1 className="text-5xl font-bold mt-2">{user.fullName}</h1>

          <p className="text-muted-foreground mt-2">
            Active User since November 2022
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex gap-4">
        <Button variant="outline">Edit User</Button>

        <Button variant="destructive">Block User</Button>
      </div>
    </div>
  );
};

export default UserHeader;
