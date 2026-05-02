import { create } from "zustand";

export const useAdminStore= create((set, get)=>({
	users:[],
	total:0,
	page:1,
	limit:10,
	search:"",
	loading: false,


	setSearch: (search)=> set({search}),

	fetchUser: async()=> {
		const {page, limit, search}=get()
		set({loading: true})
		try{
			const res= await getUserApi({page, limit, search})
			set({
				user: res.data.users,
				total: res.data.total,
				loading: false,
			})
		}catch(err){
			set({loading: false})
		}
	},

	toggleBlock: async (userId)=>{
		await toggleBlockApi(userId);
		get().fetchUsers()
	}
}))