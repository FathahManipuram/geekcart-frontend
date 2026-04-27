import { create } from "zustand"
import { loginApi } from "../api/auth.api"
import { storage } from "@/services/storage"

export const useAuthStore= create((set)=>({
	user: null,
	loading: false,

	login: async(data)=>{
		try{
			set({loading: true})
			const res= await loginApi(data)

			set({
				user: res.data.user,
				loading: false,
			});

			storage.set("accessToken", res.data.token)
			return res
		} catch(error){
			set({loading: false})
			throw error
		}
	}
}))