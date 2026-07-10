import { useAdminAuthStore } from "@/features/auth/store/auth.admin.store";
import { Navigate } from "react-router-dom";

const AdminGuestRoute = ({ children }) => {
  const adminUser = useAdminAuthStore((state) => state.adminUser);

  if (adminUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default AdminGuestRoute;
