import api from "@/services/axios"

export const getProfileApi= ()=> api.get("/user/profile")
export const updateProfileApi= (data)=> api.patch("/user/profile", data)

export const changeEmailApi= (data)=> api.patch("/user/change-email", data)
export const verifyEmailChangeApi= (data)=> api.post("/user/verify-email-change", data)

export const uploadProfieImageApi= (file)=> api.post ("/user/profile-image", file, {
	headers:{
		"Content-Type": "multipart/form-data"
	}
	
})

export const changePasswordApi= (data)=> api.put("/user/change-password", data)