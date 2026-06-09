import { create } from "zustand"
import { getAllReturnRequestsApi, updateReturnRequestApi } from "../api/adminReturn.api"

export const useAdminReturnStore= create((set)=>({

	loading: false,
	error: null,

	returns: [],


fetchAllReturns: async(params)=>{
try{
	set({loading: true, error: null})

	const res= await getAllReturnRequestsApi(params)
	console.log("adminReturn Store: ", res.data)

	set({loading: false, returns: res.data})

	return res
}catch(err){
	const message= err?.response?.data?.message || "Failed to fetch return data"
	set({loading: false, error: message})
throw err
}
},

updateReturnRequest: async(returnId, payload)=>{
	try{
		set({loading: true, error: null})

		const res= await updateReturnRequestApi(returnId, payload)
		console.log("updatedRequeststore: ", res.date)

		set({loading: false})

		return res
	}catch(err){
		const message =
      err?.response?.data?.message || "Failed to fetch return data";

    set({ loading: false, error: message });

	}
}

}))