import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
