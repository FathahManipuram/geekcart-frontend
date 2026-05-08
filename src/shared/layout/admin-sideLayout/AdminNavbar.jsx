import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

const AdminNavbar = ({ title = "DASHBOARD", breadcrumb = "ADMIN" }) => {
  return (
    <header className="h-20 border-b bg-white px-8 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          <span>{breadcrumb}</span>

          <span className="mx-2">›</span>

          <span className="font-semibold text-[#8B5E3C]">{title}</span>
        </div>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            placeholder="Search orders, clients..."
            className="
              w-72
              h-10
              rounded-full
              bg-[#F5F1EC]
              border-none
              pl-10
              shadow-none
              focus-visible:ring-1
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="text-right leading-tight hidden sm:block">
          <p className="text-sm font-semibold">Vikram Singh</p>

          <p className="text-[11px] uppercase text-muted-foreground">Admin</p>
        </div>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/100"
          alt="admin"
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default AdminNavbar;
