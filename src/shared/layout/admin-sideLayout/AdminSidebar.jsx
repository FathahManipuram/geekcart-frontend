import React from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  TicketPercent,
  ClipboardList,
  LogOut,
  Star,
  RotateCcw,
  Boxes,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { toast } from "sonner";

const links = [
  {
    label: "Sales Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },

  {
    label: "User Management",
    icon: Users,
    path: "/admin/user-management",
  },

  {
    label: "Product Management",
    icon: Package,
    path: "/admin/products",
  },

  {
    label: "Review Management",
    icon: Star,
    path: "/admin/reviews",
  },

  {
    label: "Return Management",
    icon: RotateCcw,
    path: "/admin/returns",
  },

  {
    label: "Offer & Coupon",
    icon: TicketPercent,
    path: "/admin/coupons",
  },

  {
    label: "Category Management",
    icon: Boxes,
    path: "/admin/categories",
  },

  {
    label: "Order Management",
    icon: ClipboardList,
    path: "/admin/orders",
  },
];

const AdminSidebar = ({collapsed, setCollapsed}) => {
const navigate= useNavigate()
const logout= useAuthStore((state)=> state.logout)
const handleSignOut = async() => {
  await logout()
  toast.success("Sign Out successfully")
  navigate("/admin/login")
};


  return (
    <aside className={`bg-white border-r flex flex-col h-screen transition-all duration-300 ${collapsed ? "w-20": "w-72"}`}>
 
      <div className="h-20 flex items-center px-6">
       
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#8B5E3C] text-white flex items-center justify-center font-bold">
            G
          </div>

          <div>
            <h2 className="font-bold text-xl">GeekCart</h2>

            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3 rounded-lg
                text-sm font-medium
                transition-all

                ${
                  isActive
                    ? "bg-[#F3ECE5] text-[#8B5E3C]"
                    : "text-muted-foreground hover:bg-[#F8F4EF]"
                }
              `
              }
            >
              <Icon size={18} />

              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t p-4">
        <button
        onClick={handleSignOut}
          className="
            flex items-center gap-3
            px-4 py-3 rounded-lg
            text-sm font-medium
            text-muted-foreground
            hover:bg-red-50 hover:text-red-500
            w-full transition-all
          "
        >
          <LogOut size={18} />

          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
