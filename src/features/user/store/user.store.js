import { create } from "zustand";
import { updateProfileApi } from "../api/user.api";
import { storage } from "@/services/storage";

const storedUser= storage.get("user")

export const useUserStore= create((set)=>({
	user: storedUser || null,
	loading: false,

	setUser: (user)=>{
		storage.set("user", user)
		set({user})
	},
	updateProfile: async (data)=>{
		try{
			set({loading: true})
			const res= await updateProfileApi(data)
			const updatedUser= res.data
			set({
				user: updatedUser,
				loading: false
			})
			return res
		}catch(err){
			set({loading: false});
			throw err
		}
	}
}))