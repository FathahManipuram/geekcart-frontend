import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { adminLoginApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'sonner';

const AdminLoginPage = () => {
	const navigate= useNavigate()
	const adminLogin= useAuthStore((state)=> state.adminLogin)
	const isAdmin= true

	const handleSubmit= async(data)=>{
		try{
			console.log("adminlogindata: ", data)
			const res= await adminLogin(data)
			const {user}= res.data
			console.log("user ", user)
			toast.success("Admin login successful")

			if(user.role !== "admin"){
				navigate("/")
			}
			navigate("/admin/dashboard")
		} catch(err){
			toast.error(err.response?.data?.message || "Admin login failed")
		}
		
	}
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-120 shadow-lg rounded-none p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Please authenticate to access the dashboard.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleSubmit} isAdmin={isAdmin}/>

          {/* <p className="text-center font-light text-xs mt-8">
            New to GeekCart?{" "}
            <Link
              to="/register"
              className="text-primary cursor-pointer font-bold"
            >
              Create an account
            </Link>
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminLoginPage
