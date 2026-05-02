import api from "@/services/axios"

export const getProfileApi= ()=> api.get("/user/profile")
export const updateProfileApi= (data)=> api.put("/user/profile", data)

export const changeEmailApi= (data)=> api.post("/user/change-email", data)
export const verifyEmailChangeApi= (data)=> api.post("/user/verify-email-change", data)