import { create } from "zustand"
import { loginApi } from "../api/auth.api"
import { storage } from "@/services/storage"

export const useAuthStore= create((set)=>({
	user: null,
	loading: false,
	error: null,

	login: async(data)=>{
		try{
			set({loading: true, error: null})
			const res= await loginApi(data)
			const {user, accessToken, refreshToken}= res.data

			set({
				user,
				loading: false,
			});

			storage.set("accessToken", accessToken)
			storage.set("refreshToken", refreshToken)
			return res
		} catch(error){
			const message= error.response?.data?.message || "Login failed"

			set({loading: false,
				error: message,
			})
			
			throw error
		}
	},

	logout: ()=>{
		storage.remove("accessToken")

		set({
			user: null,
			error: null,
		})
	}
}))