import { formatTitleCase } from '@/shared/utils/formatTitleCase';
import React from 'react'

const UserIdentityCell = ({user}) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar || "https://i.pravatar.cc/150?img=3"}
        alt={user.fullName}
        className="
          w-12
          h-12
          rounded-xl
          object-cover
        "
      />

      <div>
        <p className="font-semibold text-sm">{formatTitleCase(user.fullName)}</p>

        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}

export default UserIdentityCell
