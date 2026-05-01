import api from "@/services/axios"


export const updateProfileApi= (data)=> api.put("/user/profile", data)