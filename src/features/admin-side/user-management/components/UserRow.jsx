import React from "react";
import { useAdminStore } from "../../auth/admin.store";

const UserRow = ({ user }) => {
  const { toggleBlock } = useAdminStore();
  return (
    <tr>
      <td>{user.fullName}</td>

      <td>{user.role}</td>

      <td>{user.isBlocked ? "Blocked" : "Active"}</td>

      <td>{new Date(user.createdAt).toDateString()}</td>

      <td>
        <button onClick={() => toggleBlock(user._id)}>
          {user.isBlocked ? "Unblock" : "Block"}
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
