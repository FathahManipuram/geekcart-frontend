import { create } from "zustand";
import { createSubcategoryApi, deleteSubcategoryApi, fetchSubcategoriesApi, updateSubCategoryApi } from "../api/subcategory.api";
import { fetchCategoryApi } from "../../category-management/api/category.api";

export const useSubcategoryStore= create((set, get)=>({
	subcategories: [],
	categories:[],
	pagination: {},
	activeSubcategories:0,
	totalSubcategories:0,
	totalCategories: 0,
	loading: false,
	error: null,
	queryParams:{
		page:1,
		limit:5,
		search: "",
		status: "",
		category: "",
	},


	//fetch categories
	fetchCategories: async()=>{
		try{
			const res= await fetchCategoryApi({
				page:1,
				limit: 50,
				status:"active"
			})
			console.log("categories: ", res.data)
			set({categories: res.data.categories,})
			return res
		}catch(err){
			const message= err.response?.data?.message || "Failed to fetch categories"
			set({error: message})
			throw err
		}
	},

	// change page
	changePage: async(page)=>{
		await get().fetchSubcategories({page})
	},

	// Fetch all subcategories
	 fetchSubcategories: async(params={})=>{
		try{
			console.log("params ", params)
			const currentParams={
				...get().queryParams,
				...params,
			}

			set({
				loading: true,
				error: null,
				queryParams: currentParams,
			})

			const res= await fetchSubcategoriesApi(currentParams)
console.log("store: ,", res)
			set({
				subcategories: res.data.subcategories,
				pagination: res.data.pagination,
				activeSubcategories: res.data.activeSubcategories,
				totalSubcategories: res.data.pagination.totalItems,
				totalCategories: res.data.totalCategories,
				loading: false,
			})
			return res
		} catch(err){
			const message= err.response?.data?.message || "Failed to fetch subcatagories"
			set({
				loading: false,
				error: message
			})
			throw err
		}
	 },


	 //Create subcategory
	 createSubcategory: async (data)=>{
		try{
			set({loading: true, error: null})
			const res= await createSubcategoryApi(data)

		// 	set((state)=> ({
		// 		subcategories: [res.data, ...state.subcategories],
		// 		loading: false,
		// }))

		await get().fetchSubcategories(get().queryParams)
		set({loading: false})
			return res
		}catch(err){
			const message= err.response?.data?.message || "Failed to create subcategory"
			set({loading: false, error: message})

			throw err
		}
	 },

	 //Update subcategory
	 updateSubcategory: async(subcategoryId, data)=>{
		try{
			set({loading: true, error: null})
			const res= await updateSubCategoryApi(subcategoryId, data)

			set((state)=>({
				subcategories: state.subcategories.map((subcategory)=> 
					subcategory._id === subcategoryId ? res.data : subcategory
				),
				loading: false,
			}))

			return res
		}catch(err){
			const message= err.response?.data?.message || "Failed to update subcategory"
			set({loading: false, error: message})

			throw err
		}
	 },

	 // delete subcategory
	 deleteSubcategory: async(subcategoryId)=>{
		try{
			set({loading: true, error: null})
			const res= await deleteSubcategoryApi(subcategoryId)

			// set((state)=>({
			// 	subcategories: state.subcategories.filter((subcategory)=> subcategory._id !== subcategoryId),
			// 	loading: false,
			// }))
			const {pagination, queryParams, subcategories}= get()
			const newPage= pagination.currentPage > 1 &&
			subcategories.length === 1 ? pagination.currentPage - 1 : pagination.currentPage


			await get().fetchSubcategories({...queryParams, page: newPage})
			set({loading: false})
			return res
		}catch(err){
			const message= err.response?.data?.message || "Subcategory deletion failed"

			set({loading: false, error: message})
			throw err
		}
	 },
}))