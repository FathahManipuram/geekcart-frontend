import { create } from "zustand";
import { createCategoryApi, fetchCategoryApi, updateCategoryApi } from "../api/category.api";

export const useCategoryStore= create((set, get)=> ({
	
	categories: [],
	pagination: {},
	loading: false,
	error: null,
	


//Get all category
fetchCategories: async(params={})=>{
	try{
		set({
				loading: true,
				error: null,
			})
		const res= await fetchCategoryApi(params)
		console.log("All categories: ", res.data)
		set({
			categories: res.data.categories,
			paginamtionn: res.data.pagination,
			loading: false,
		})
		return res

	}catch(err){
		const message= err.response?.data?.message || "Failed to fetch categories"
		set({
			loading: false,
			error: message
		})
		throw err
	}
},


//Create category
	createCategory: async(data)=>{
		try{
			console.log("store: ", data)
			set({
				loading: true,
				error: null,
			})

			const res= await createCategoryApi(data)

			set({loading: false})
			return res
		} catch(err){
			const message= err.response?.data?.message || "failed to create category"
			set({loading: false, error: message})
			throw err
		}
	},

	//UpdateCategory
	updateCategory: async(categoryId, data)=>{
		try{
			set({loading: true, error: null})
			const res= await updateCategoryApi(categoryId, data)
			set((state)=> ({
				categories: state.categories.map((category)=>
				category._id===categoryId
				? res.data
				: category
			),
			loading: false
			}))
			return res
		}catch(err){
			const message= err.response?.data?.message || "Failed to update category"
			set({loading: false, error: message})
			throw err
		}
	}
}))