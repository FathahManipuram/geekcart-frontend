import { create } from "zustand"
import { googleLoginApi, loginApi } from "../api/auth.api"
import { storage } from "@/services/storage"
import { getProfileApi, updateProfileApi, uploadProfieImageApi } from "@/features/user/api/user.api"
import { toast } from "sonner"

const storedUser= storage.get("user")

export const useAuthStore= create((set,get)=>({
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

//Login with google
	loginWithGoogle: async (token)=>{
		try{
			set({loading: true})

			const  res= await googleLoginApi(token)
			const {user, accessToken, refreshToken}=res.data
			console.log("LoginwitGoogle:", user, accessToken, refreshToken)
			storage.set("user", user)
			storage.set("accessToken", accessToken)
			storage.set("refreshToken", refreshToken)

			set({
				user,
				loading: false,
			})

			return res
		}catch(error){
			set({loading: false})
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
	},


	//Upload profile Image
	uploadProfileImage: async (file)=>{
		try{

			const formData= new FormData();
			formData.append("image", file)
			set({loading: true})
			const res= await uploadProfieImageApi(formData)
			const updatedAvatar= res.data.avatar;

			const updatedUser= {...get().user, avatar: updatedAvatar}
			storage.set("user", updatedUser)

			set({
				user: updatedUser,
				loading: false,
			})
		}catch(err){
			set({loading: false})
			throw err
		}
	}

}))