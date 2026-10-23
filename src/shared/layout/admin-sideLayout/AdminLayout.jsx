// import React, { useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminNavbar from "./AdminNavbar";
// import { Outlet } from "react-router-dom";
// import ScrollToTop from "@/shared/components/ScrollToTop";

// const AdminLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   return (
//     <div className="bg-background flex h-screen overflow-hidden">
//       <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       <div className="flex flex-1 flex-col overflow-hidden">
//         <AdminNavbar />

//         <main className="flex-1 overflow-y-auto p-8">
//           <ScrollToTop />
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/shared/components/ScrollToTop";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminNavbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <ScrollToTop />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
