import api from "./axios"

export const setupInterceptors=()=>{
	api.interceptors.request.use(
		(config)=>{
			const token= localStorage.getItem("accessToken");
			if(token){
				config.headers.Authorization= `Bearer ${token}`
			}
		return config
	}),
	(error)=> Promise.reject(error);

	api.interceptors.response.use(
		(res)=> res,
		(error)=>{
			if(error.response?.status===401){
				console.log("Unothorized- handle logout")
			}
			return Promise.error(error)
		}
	)
}