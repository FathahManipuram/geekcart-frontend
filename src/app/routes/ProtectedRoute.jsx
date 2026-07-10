import { useAuthStore } from "@/features/auth/store/auth.store";
import Navbar from "@/shared/layout/Navbar";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;
