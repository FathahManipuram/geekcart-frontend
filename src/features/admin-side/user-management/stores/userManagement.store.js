import { create } from "zustand";
import { deleteUserApi, getUserByIdApi, getUsersApi } from "../api/api.userManagement";
import { toast } from "sonner";

export const useUserManagementStore = create((set)=>({
	users: [],
	loading: false,
	currentPage:1,
	totalPages: 1,
	totalUsers: 0,
	search:"",
	selectedUser: null,


	fetchUsers: async({
		page=1,
		limit=5,
		search="",
	})=>{
		try{
			set({loading: true})
			console.log("before store: ",page, limit, search )

			const res= await getUsersApi({
				page, limit, search
			})
console.log("FetchStore: ", res)
			const data= res.data

			set({
				users: data.users,
				currentPage: data.currentPage,
				totalPages: data.totalPages,
				totalUsers: data.totalUsers,
				loading: false
			})

		}catch (err){
			set({loading: false})
			throw err
		}
	},

	fetchUserById: async(userId)=>{
		try{
			set({loading: true})
			const res= await getUserByIdApi(userId)
			console.log("getuserById: ",res)

			set({
				selectedUser: res.data,
				loading: false
			})


		}catch(err){
			set({loading: false})
			throw err
		}
	},

	deleteUser: async(userId)=>{
		try{
			set({loading: true})
			await deleteUserApi(userId)
			set((state)=> ({
				users: state.users.filter((user)=> user._id !== userId),
				loading: false,
			}))
		}catch(err){
			set({loading: false})
			throw err
		}
	}

}))