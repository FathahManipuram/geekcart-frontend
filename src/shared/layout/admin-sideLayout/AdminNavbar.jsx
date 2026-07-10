import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { formatTitleCase } from "@/shared/utils/formatTitleCase";
import { useLocation, useNavigate } from "react-router-dom";
import { getPageTitleFromPath } from "@/shared/utils/getPageTitleFromPath";
import { useAdminAuthStore } from "@/features/auth/store/auth.admin.store";

const AdminNavbar = ({
  breadcrumb = "ADMIN",
  searchPlaceholder = "Search orders, clients...",
  showSearch = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useAdminAuthStore((state) => state.adminUser);

  const fullName = formatTitleCase(currentUser?.fullName) || "Admin User";
  const title = getPageTitleFromPath(location.pathname);
  const role = currentUser?.role || "admin";

  const avatar =
    currentUser?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div className="flex items-center gap-8">
        <div className="text-muted-foreground text-xs tracking-wide uppercase">
          <button onClick={handleBack} className="cursor-pointer">
            {breadcrumb}
          </button>

          <span className="mx-2">›</span>

          <span className="font-semibold text-[#8B5E3C]">{title}</span>
        </div>

        {showSearch && (
          <div className="relative hidden md:block">
            <Search
              size={16}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />

            <Input
              placeholder={searchPlaceholder}
              className="h-10 w-72 rounded-full border-none bg-[#F5F1EC] pl-10 shadow-none focus-visible:ring-1"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right leading-tight sm:block">
          <p className="text-sm font-semibold">{fullName}</p>

          <p className="text-muted-foreground text-[11px] uppercase">{role}</p>
        </div>

        {/* Avatar */}
        <img
          src={avatar}
          alt={fullName}
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default AdminNavbar;
