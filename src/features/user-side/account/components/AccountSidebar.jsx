// import { useAuthStore } from "@/features/auth/store/auth.store";
// import ConfirmModal from "@/shared/components/ConfirmModal";
// import { Album, CreditCard, LogOut, MapPin, User } from "lucide-react";
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// const AccountSidebar = () => {
 
//   const { user, logout } = useAuthStore();
//    const [showConfirmModal, setShowConfirmModal]= useState(false)
  


// const links = [
//   {
//     icon: <User size={16} />,
//     label: "Account Details",
//     path: "/account/profile",
//   },
//   {
//     icon: <MapPin size={16} />,
//     label: "Saved Addresses",
//     path: "/account/addresses",
//   },
//   {
//     icon: <Album size={16} />,
//     label: "Order History",
//     path: "/account/order-history",
//   },
//   // {
//   //   icon: <CreditCard size={16} />,
//   //   label: "Payments",
//   //   path: "/account/payments",
//   // },
// ];



//   const navClass = ({ isActive }) =>
//     `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${
//       isActive ? "bg-amber-200 text-black fond-semibold" : "hover:bg-muted"
//     }`;

//   return (
//     <div className="bg-card p-4 sm:p-6 rounded-xl w-full space-y-6 shadow-sm">
//       {/* profile */}
//       <div className="flex flex-col items-center text-center">
//         <img
//           src={user?.avatar}
//           alt={user?.fullName}
//           className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border"
//         />

//         <h2 className="font-semibold mt-3 text-base sm:text-lg uppercase">
//           {user?.fullName}
//         </h2>

//         <p className="text-xs sm:text-sm text-muted-foreground break-all">
//           {user?.email}
//         </p>
//       </div>

//       {/* menu */}
//       <ul className="space-y-2 text-sm">
//         {links.map((link, index) => (
//           <li key={index}>
//             <NavLink to={link.path} className={navClass}>
//               <span>{link.icon}</span>
//               {link.label}
//             </NavLink>
//           </li>
//         ))}
//         {user && (
//           <li>
//             <button
//               onClick={() => setShowConfirmModal(true)}
//               className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors w-full text-left"
//             >
//               <LogOut size={16} />
//               Sign Out
//             </button>
//           </li>
//         )}
//       </ul>

//       <ConfirmModal
//         open={showConfirmModal}
//         onOpenChange={setShowConfirmModal}
//         title="Are you sure to sign out?"
//         description=""
//         onConfirm={()=>logout()}
//       />
//     </div>
//   );
// };

// export default AccountSidebar;


import { useAuthStore } from "@/features/auth/store/auth.store";
import ConfirmModal from "@/shared/components/ConfirmModal";
import { Album, LogOut, MapPin, User } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const AccountSidebar = () => {
  const { user, logout } = useAuthStore();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const links = [
    {
      icon: <User size={18} />,
      label: "Account Details",
      shortLabel: "Account",
      path: "/account/profile",
    },
    {
      icon: <MapPin size={18} />,
      label: "Saved Addresses",
      shortLabel: "Address",
      path: "/account/addresses",
    },
    {
      icon: <Album size={18} />,
      label: "Order History",
      shortLabel: "Orders",
      path: "/account/order-history",
    },
  ];

const navClass = ({ isActive }) =>
  `
    flex
    flex-col
    items-center
    justify-center
    gap-1
    rounded-lg
    px-3
    py-2

    md:flex-row
    md:justify-start
    md:gap-2
    md:px-3
    md:py-2.5

    transition-colors

    ${isActive ? "bg-primary text-white" : "hover:bg-muted"}
  `;

  return (
    <>
      <aside className="bg-card fixed bottom-0 left-0 z-40 w-full rounded-xl rounded-b-none border-t p-4 shadow-sm md:static md:w-full md:rounded-xl md:border md:p-6">
        {/* ================= PROFILE ================= */}

        <div className="hidden flex-col items-center text-center md:flex">
          <img
            src={user?.avatar}
            alt={user?.fullName}
            className="h-16 w-16 rounded-full border object-cover sm:h-20 sm:w-20"
          />

          <h2 className="mt-3 text-base font-semibold uppercase sm:text-sm">
            {user?.fullName}
          </h2>

          <p className="text-muted-foreground text-xs break-all sm:text-xs">
            {user?.email}
          </p>
        </div>

        {/* ================= MENU ================= */}

        <nav className="md:mt-6">
          <ul className="flex items-center justify-around gap-1 text-xs md:flex-col md:items-stretch md:justify-start md:gap-2 md:text-sm">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={navClass}>
                  <span className="shrink-0">{link.icon}</span>

                  <span className="hidden md:inline">{link.label}</span>

                  <span className="text-[11px] md:hidden">
                    {link.shortLabel}
                  </span>
                </NavLink>
              </li>
            ))}

            {/* ================= SIGN OUT ================= */}

            {user && (
              <li>
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="flex w-full flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-red-500 transition-colors hover:bg-red-100 md:flex-row md:justify-start md:gap-2 md:px-3 md:py-2.5"
                >
                  <LogOut size={18} />

                  <span className="text-[11px] md:text-sm">Sign Out</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      <ConfirmModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        title="Are you sure to sign out?"
        description=""
        onConfirm={logout}
      />
    </>
  );
};

export default AccountSidebar;