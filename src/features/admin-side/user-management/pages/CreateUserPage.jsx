import React from "react";
import CreateUserForm from "../components/CreateUserForm";

const CreateUserPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <p className="text-sm text-muted-foreground">
          User Management / Add New User
        </p>

        <h1 className="text-4xl font-bold mt-4">Add New User</h1>

        <p className="text-muted-foreground mt-2">
          Onboard a new member to the GeekCart ecosystem.
        </p>
      </div>

      {/* Form */}

      <CreateUserForm />
    </div>
  );
};

export default CreateUserPage;
