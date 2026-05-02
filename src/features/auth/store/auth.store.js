import { create } from "zustand"
import { loginApi } from "../api/auth.api"
import { storage } from "@/services/storage"
import { getProfileApi, updateProfileApi } from "@/features/user/api/user.api"
import { toast } from "sonner"

const storedUser= storage.get("user")

export const useAuthStore= create((set)=>({
	user: storedUser || null,
	loading: false,
	error: null,

	login: async(data)=>{
		try{
			set({loading: true, error: null})
			const res= await loginApi(data)
			const {user, accessToken, refreshToken}= res.data
			storage.set("user", user)
			storage.set("accessToken", accessToken)
			storage.set("refreshToken", refreshToken)
console.log("LOGIN: ",res)
console.log("Refreshtoken: ",refreshToken)
			set({
				user,
				loading: false,
			});

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
		storage.remove("refreshToken")
		storage.remove("user")

		set({
			user: null,
			error: null,
		})
	},

	//Fetch profile
	fetchProfile: async()=>{
		try{
			set({loading: true})

			const res= await getProfileApi()
			console.log("fetchDAtaprofile", res)
			const user= res.data
			storage.set("user", user)
			set({user, loading: false})
		}catch(err){
			set({loading: false})
			throw err
		}
	},

	//Update profile
	updateProfile: async(data)=>{
		try{
			set({loading: true})
			const res= await updateProfileApi(data)
			const {user}= res.data
			const updatedUser= user
			storage.set("user", updatedUser)
			set({user: updatedUser, loading: false})
			return res
		}catch(err){
			set({loading: false})
			throw err
		}
	}
}))