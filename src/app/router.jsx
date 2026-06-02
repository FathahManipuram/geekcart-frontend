import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./routes/public.routes";
import accountRoutes from "./routes/account.routes";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import cartRoutes from "./routes/cart.routes";

export const router = createBrowserRouter([
  
  publicRoutes,
  ...authRoutes,
  accountRoutes,
  adminRoutes,
  cartRoutes,
  
  
  
]);
