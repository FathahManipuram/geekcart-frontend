import { toast } from "sonner";
import api from "./axios"
import { storage } from "./storage";

export const setupInterceptors=()=>{
	api.interceptors.request.use(
		(config)=>{
			console.log("axiosReq: ",config)
			const token= storage.get("accessToken");
			if(token){
				config.headers.Authorization= `Bearer ${token}`
			}
		return config
	},
	(error)=> Promise.reject(error)
	);
	

	api.interceptors.response.use(
		(response)=> {
			console.log("Axios response:",response.data)
		return	response.data},
		async (error)=>{
			console.log("Errorconfig: ", error.config)
			const message= error.response?.data?.message||error.message||"Something went wrong"
			console.log(message)
				// toast.error(message)
			return Promise.reject(error)
		}
	)
}