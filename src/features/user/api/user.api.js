import api from "@/services/axios"

export const getProfileApi= ()=> api.get("/user/profile")
export const updateProfileApi= (data)=> api.put("/user/profile", data)