// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
//   Package,
//   TicketPercent,
//   ClipboardList,
//   LogOut,
//   Star,
//   RotateCcw,
//   Boxes,
//   PanelLeftClose,
//   PanelLeftOpen,
//   Blocks,
//   BadgePercent,
//   ChartLine,
// } from "lucide-react";

// import { NavLink, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { useAdminAuthStore } from "@/features/auth/store/auth.admin.store";
// import ConfirmModal from "@/shared/components/ConfirmModal";

// const links = [
//   {
//     label: "Admin Dashboard",
//     icon: LayoutDashboard,
//     path: "/admin/dashboard",
//   },

//   {
//     label: "User Management",
//     icon: Users,
//     path: "/admin/user-management",
//   },

//   {
//     label: "Product Management",
//     icon: Package,
//     path: "/admin/products",
//   },
//   {
//     label: "Order Management",
//     icon: ClipboardList,
//     path: "/admin/orders",
//   },

//   // {
//   //   label: "Review Management",
//   //   icon: Star,
//   //   path: "/admin/reviews",
//   // },

//   {
//     label: "Return Management",
//     icon: RotateCcw,
//     path: "/admin/returns",
//   },

//   {
//     label: "Coupon Management",
//     icon: TicketPercent,
//     path: "/admin/coupons",
//   },
//   {
//     label: "Offer Management",
//     icon: BadgePercent,
//     path: "/admin/offers",
//   },

//   {
//     label: "Category Management",
//     icon: Boxes,
//     path: "/admin/categories",
//   },
//   {
//     label: "Subcategory Management",
//     icon: Blocks,
//     path: "/admin/subcategories",
//   },
//   {
//     label: "Sales Report",
//     icon: ChartLine,
//     path: "/admin/sales-report",
//   },
// ];

// const AdminSidebar = ({ collapsed, setCollapsed, setMobileOpen, mobileOpen}) => {
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const navigate = useNavigate();
//   const logout = useAdminAuthStore((state) => state.logout);

//   const handleSignOut = async () => {
//     try {
//       await logout();
//       toast.success("Signed Out successfully");
//       navigate("/admin/login");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Logout failed");
//     }
//   };

//   return (
//     <aside
//       // className={`fixed inset-0 z-50 flex h-screen flex-col border-r bg-white transition-all duration-300 md:static md:translate-x-0 ${collapsed ? "-translate-x-full md:w-20" : "w-full translate-x-0 md:w-72"} `}
//   className={`
//     fixed inset-0 z-50
//     flex h-screen flex-col
//     border-r bg-white
//     transition-transform duration-300

//     ${
//       mobileOpen
//         ? "translate-x-0"
//         : "-translate-x-full"
//     }

//     md:static
//     md:translate-x-0
//     ${collapsed ? "md:w-20" : "md:w-72"}
//   `}

//     >
//       <div className="flex h-20 items-center justify-between px-4">
//         <div className="flex items-center gap-3">
//           <div
//             onClick={() => setCollapsed(!collapsed)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") setCollapsed(!collapsed);
//             }}
//             className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border font-bold contain-content"
//           >
//             <img src="/GeekCart-favicon.png" alt="geekCart-icon" />
//           </div>

//           {!collapsed && (
//             <div>
//               <h2 className="text-xl font-bold">GeekCart</h2>

//               <p className="text-muted-foreground text-[11px] tracking-wider uppercase">
//                 Admin Dashboard
//               </p>
//             </div>
//           )}
//         </div>

//         {/* <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="
//       p-2 rounded-lg
//       hover:bg-muted
//       transition-colors
//     "
//         >
//           {collapsed ? (
//             <PanelLeftOpen size={18} />
//           ) : (
//             <PanelLeftClose size={18} />
//           )}
//         </button> */}
//       </div>

//       {/* Links */}
//       <div className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
//         {links.map((link) => {
//           const Icon = link.icon;

//           return (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               title={collapsed ? link.label : ""}
//               onClick={() => setMobileOpen(false)}

//               className={({ isActive }) =>
//                 `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${collapsed ? "md:justify-center" : ""} ${
//                   isActive
//                     ? "bg-[#F3ECE5] text-[#8B5E3C]"
//                     : "text-muted-foreground hover:bg-[#F8F4EF]"
//                 } `
//               }
//             >
//               <Icon size={18} className="shrink-0"/>

//               {!collapsed && (
//                 <span className={collapsed ? "hidden" : "block"}>
//                   {link.label}
//                 </span>
//               )}
//             </NavLink>
//           );
//         })}
//       </div>

//       {/* Logout */}
//       <div className="border-t p-4">
//         <button
//           title={collapsed ? "Sign Out" : ""}
//           onClick={() => setShowConfirmModal(true)}
//           className="text-muted-foreground flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-red-50 hover:text-red-500"
//         >
//           <LogOut size={18} />

//           {!collapsed && <span>Sign Out</span>}
//         </button>
//       </div>

//       <ConfirmModal
//         open={showConfirmModal}
//         onOpenChange={setShowConfirmModal}
//         title="Are sure to sign out"
//         description=""
//         onConfirm={handleSignOut}
//       />
//     </aside>
//   );
// };

// export default AdminSidebar;




import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  TicketPercent,
  ClipboardList,
  LogOut,
  RotateCcw,
  Boxes,
  Blocks,
  BadgePercent,
  ChartLine,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAdminAuthStore } from "@/features/auth/store/auth.admin.store";
import ConfirmModal from "@/shared/components/ConfirmModal";

const links = [
  {
    label: "Admin Dashboard",
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
    label: "Order Management",
    icon: ClipboardList,
    path: "/admin/orders",
  },
  {
    label: "Return Management",
    icon: RotateCcw,
    path: "/admin/returns",
  },
  {
    label: "Coupon Management",
    icon: TicketPercent,
    path: "/admin/coupons",
  },
  {
    label: "Offer Management",
    icon: BadgePercent,
    path: "/admin/offers",
  },
  {
    label: "Category Management",
    icon: Boxes,
    path: "/admin/categories",
  },
  {
    label: "Subcategory Management",
    icon: Blocks,
    path: "/admin/subcategories",
  },
  {
    label: "Sales Report",
    icon: ChartLine,
    path: "/admin/sales-report",
  },
];

const AdminSidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  const logout = useAdminAuthStore((state) => state.logout);

  const handleSignOut = async () => {
    try {
      await logout();

      toast.success("Signed Out successfully");

      setShowConfirmModal(false);
      setMobileOpen(false);

      navigate("/admin/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const handleNavigation = () => {
    // Close only the mobile sidebar.
    setMobileOpen(false);
  };

  const handleLogoClick = () => {
    // collapsed is only relevant to desktop.
    if (window.innerWidth >= 768) {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <>
      {/* ================= MOBILE BACKDROP ================= */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed inset-0 z-50 flex h-screen flex-col border-r bg-white transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:static md:h-screen md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-72"} `}
      >
        {/* ================= HEADER ================= */}

        <div className="flex h-20 shrink-0 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* Logo */}

            <button
              type="button"
              onClick={handleLogoClick}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border bg-white"
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
            >
              <img
                src="/GeekCart-favicon.png"
                alt="GeekCart"
                className="h-full w-full object-cover"
              />
            </button>

            {/* Brand */}

            <div className={`min-w-0 ${collapsed ? "md:hidden" : "block"} `}>
              <h2 className="text-xl font-bold">GeekCart</h2>

              <p className="text-muted-foreground text-[11px] tracking-wider uppercase">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavigation}
                title={collapsed ? link.label : ""}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${collapsed ? "md:justify-center" : ""} ${
                    isActive
                      ? "bg-[#F3ECE5] text-[#8B5E3C]"
                      : "text-muted-foreground hover:bg-[#F8F4EF]"
                  } `
                }
              >
                <Icon size={18} className="shrink-0" />

                {/* 
                  Mobile:
                  Always show title.

                  Desktop:
                  Hide title when collapsed.
                */}

                <span className={collapsed ? "md:hidden" : ""}>
                  {link.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* ================= LOGOUT ================= */}

        <div className="shrink-0 border-t p-4">
          <button
            type="button"
            title={collapsed ? "Sign Out" : ""}
            onClick={() => setShowConfirmModal(true)}
            className="text-muted-foreground flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-red-50 hover:text-red-500 md:justify-start"
          >
            <LogOut size={18} className="shrink-0" />

            <span className={collapsed ? "md:hidden" : ""}>Sign Out</span>
          </button>
        </div>

        {/* ================= CONFIRM MODAL ================= */}

        <ConfirmModal
          open={showConfirmModal}
          onOpenChange={setShowConfirmModal}
          title="Are you sure you want to sign out?"
          description=""
          onConfirm={handleSignOut}
        />
      </aside>
    </>
  );
};

export default AdminSidebar;