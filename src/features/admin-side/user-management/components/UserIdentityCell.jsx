import { formatTitleCase } from "@/shared/utils/formatTitleCase";
import React from "react";

const UserIdentityCell = ({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar || "https://i.pravatar.cc/150?img=3"}
        alt={user.fullName}
        className="h-12 w-12 rounded-xl object-cover"
      />

      <div>
        <p className="text-sm font-semibold">
          {formatTitleCase(user.fullName)}
        </p>

        <p className="text-muted-foreground text-xs">{user.email}</p>
      </div>
    </div>
  );
};

export default UserIdentityCell;
