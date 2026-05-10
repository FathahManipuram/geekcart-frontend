import { create } from "zustand";
import { blockUserApi, createUserApi, deleteUserApi, getUserByIdApi, getUsersApi, updateUSerApi } from "../api/api.userManagement";

export const useUserManagementStore = create((set)=>({
	users: [],
	loading: false,
	currentPage:1,
	totalPages: 1,
	totalUsers: 0,
	activeUsers:0,
	blockedUsers:0,
	totalAdmins:0,
	search:"",
	selectedUser: null,
	status: "all",


//Fetch all user
	fetchUsers: async({
		page=1,
		limit=5,
		search="",
		status="all",
	})=>{
		try{
			set({loading: true})
			console.log("before store: ",page, limit, search, status )

			const res= await getUsersApi({
				page, limit, search, status
			})
console.log("FetchStore: ", res)
			const data= res.data
			console.log(data)

			set({
				users: data.users,
				currentPage: data.currentPage,
				totalPages: data.totalPages,
				totalUsers: data.totalUsers,
				activeUsers: data.activeUsers,
				blockedUsers: data.blockedUsers,
				totalAdmins: data.totalAdmins,
				loading: false,
				search,
				status,
			})

		}catch (err){
			set({loading: false})
			throw err
		}
	},


//Fetch user by ID
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


//Delete user
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
	},

	//Block user
	blockUser: async(userId)=>{
		try{
			set({loading: true})
			const res= await blockUserApi(userId)
			const updatedUser= res.data

			set((state)=>({
				users: state.users.map((user)=> user._id === userId
				? updatedUser : user
				),
				selectedUser: updatedUser,
				loading: false,
			}))
			return res
		}catch(err){
			set({loading: false})
			throw err
		}
	},


//Create user
	createUser: async(data)=>{
		console.log("newuserData",data)
		try{
			set({loading: true})
			const res= await createUserApi(data)
			const newUser= res.data

			set((state)=> ({
				users: [newUser, ...state.users],
				totalUsers: state.totalUsers+1,
				loading: false,
			}))
		}catch(err){
			set({loading: false})
			throw err

		}
	},

//Update user
	updateUser: async(userId, data)=>{
		try{
			set({loading: true})
			const res= await updateUSerApi(userId, data)
			const updatedUser= res.data

			set((state)=> ({
				users: state.users.map((user)=>
					user._id === userId ? updatedUser : user
				),
				selectedUser: state.selectedUser?._id === userId ? updatedUser : state.selectedUser,
				
				loading: false,
			}))
			return res
		} catch(err){
			set({loading: false})
			throw err
		}
	}

}))