import { STORAGE_KEYS } from "@/shared/constants/storageKeys";
import { storage } from "./storage";
//import { useAuthStore } from "@/features/auth/store/auth.store";
import { toast } from "sonner";
import { logoutUser } from "@/shared/utils/logoutUser";

export const setupInterceptors=(
	axiosInstance, 
	tokenKey=STORAGE_KEYS.ACCESS_TOKEN
	)=>{
	axiosInstance.interceptors.request.use(
		(config)=>{
			console.log("axiosReq: ",config)
			const token= storage.get(tokenKey);
			if(token){
				config.headers.Authorization= `Bearer ${token}`
			}
		return config
	},
	(error)=> Promise.reject(error)
	);
	

	axiosInstance.interceptors.response.use(
		(response)=> {
			console.log("Axios response:",response.data)
		return	response.data},
		(error)=>{
			console.log("Errorconfig: ", error.config)
			const message= error.response?.data?.message||error.message||"Something went wrong"
			const status= error.response?.status
			console.log("AxiosError:",message)

			if (
        (status === 403 && message === "User is blocked") ||
        (status === 401 && message === "Token expired, please login again")
      ) {
        toast.error(
          status === 403
            ? "Your account has been blocked by the administrator."
            : "Token expired, please login again",
        );
        setTimeout(() => {
          logoutUser()
        }, 5000);
      }

			return Promise.reject(error)
		}
	)
}