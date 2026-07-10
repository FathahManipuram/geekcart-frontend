import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import React from "react";
import LoginForm from "../components/LoginForm";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../store/auth.store";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  const handleLogin = async (data) => {
    try {
      const res = await login(data);
      const { user } = res.data;
      toast.success("Login successful");
      if (user.role === "admin") {
        navigate("/admin/login");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <Card className="w-120 rounded-none p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">
            Welcome Back
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Please enter your details to access your account.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} />

          <div className="my-6 flex items-center gap-4">
            <div className="bg-border/60 h-px flex-1" />

            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              Or continue with
            </span>

            <div className="bg-border/60 h-px flex-1" />
          </div>

          <div>
            <GoogleLogin
              shape="circle"
              onSuccess={async (credentialResponse) => {
                try {
                  const token = credentialResponse.credential;
                  await loginWithGoogle(token);
                  toast.success("Google login successful");
                  navigate("/");
                } catch (err) {
                  toast.error(
                    err?.response?.data?.message || "Google login failed",
                  );
                }
              }}
              onError={() => {
                console.error("Google login failed");
              }}
              className="mb-8 flex w-full items-center justify-center gap-2 rounded-lg border py-2"
            />
          </div>

          <p className="mt-8 text-center text-xs font-light">
            New to GeekCart?{" "}
            <Link
              to="/register"
              className="text-primary cursor-pointer font-bold"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
