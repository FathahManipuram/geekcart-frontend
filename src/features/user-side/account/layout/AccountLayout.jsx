import React from "react";
import AccountSidebar from "../components/AccountSidebar";
import { Outlet } from "react-router-dom";

const AccountLayout = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* STICKY SIDEBAR */}
        <div className="lg:sticky lg:top-20 lg:col-span-3">
          <AccountSidebar />
        </div>

        {/* SCROLLABLE MAIN CONTENT */}
        <div className="md:pb-0 lg:col-span-9 pb-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
