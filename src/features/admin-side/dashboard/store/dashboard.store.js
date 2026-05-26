import { create } from "zustand"

export const useDashboardStore = create((set)=>({
	stats: {},
	loading: false,
	users: [],

	fetchDashboard: async()=>{
		set({loading: true})

		try{
			const res= "a"
		}catch(err){
			console.log(err)
		}
	},


}))