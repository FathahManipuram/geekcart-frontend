import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { formatTitleCase } from "@/shared/utils/formatTitleCase";
import { useLocation, useNavigate} from "react-router-dom";
import { getPageTitleFromPath } from "@/shared/utils/getPageTitleFromPath";
import { useAdminAuthStore } from "@/features/auth/store/auth.admin.store";

const AdminNavbar = ({
  breadcrumb = "ADMIN",
  searchPlaceholder = "Search orders, clients...",
  showSearch = false,
}) => {
  const location= useLocation()
  const navigate= useNavigate()
  const currentUser = useAdminAuthStore((state) => state.adminUser);


  const fullName = formatTitleCase(currentUser?.fullName) || "Admin User";
  const title= getPageTitleFromPath(location.pathname) 
  const role = currentUser?.role || "admin";

  const avatar =
    currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`;

const handleBack=()=>{
  if(window.history.length > 1){
    navigate(-1)
  }else{
    navigate("/admin/dashboard")
  }
}

  return (
    <header className="h-20 border-b bg-white px-8 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          <button
            onClick={handleBack}
            className="cursor-pointer"
          >
            {breadcrumb}
          </button>

          <span className="mx-2">›</span>

          <span className="font-semibold text-[#8B5E3C]">{title}</span>
        </div>

        {showSearch && (
          <div className="relative hidden md:block">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder={searchPlaceholder}
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
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right leading-tight hidden sm:block">
          <p className="text-sm font-semibold">{fullName}</p>

          <p className="text-[11px] uppercase text-muted-foreground">{role}</p>
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
