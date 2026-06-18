import { useAuthStore } from "@/features/auth/store/auth.store";
import { Album, CreditCard, LogOut, MapPin, User } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AccountSidebar = () => {
  const navigate= useNavigate()
  const { user, logout } = useAuthStore();


const links = [
  {
    icon: <User size={16} />,
    label: "Account Details",
    path: "/account/profile",
  },
  {
    icon: <MapPin size={16} />,
    label: "Saved Addresses",
    path: "/account/addresses",
  },
  {
    icon: <Album size={16} />,
    label: "Order History",
    path: "/account/order-history",
  },
  // {
  //   icon: <CreditCard size={16} />,
  //   label: "Payments",
  //   path: "/account/payments",
  // },
];



  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${
      isActive ? "bg-amber-200 text-black fond-semibold" : "hover:bg-muted"
    }`;

  return (
    <div className="bg-card p-4 sm:p-6 rounded-xl w-full space-y-6 shadow-sm">
      {/* profile */}
      <div className="flex flex-col items-center text-center">
        <img
          src={user?.avatar}
          alt={user?.fullName}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border"
        />

        <h2 className="font-semibold mt-3 text-base sm:text-lg uppercase">
          {user?.fullName}
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground break-all">
          {user?.email}
        </p>
      </div>

      {/* menu */}
      <ul className="space-y-2 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink to={link.path} className={navClass}>
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          </li>
        ))}
        {user && (
          <li>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors w-full text-left"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AccountSidebar;
