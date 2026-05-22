export const buildProductFormData= (data)=>{

	const formData = new FormData()

	formData.append("name", data.name)
	formData.append("description", data.description)


	if(data.coverImage instanceof File){
		formData.append("coverImage", data.coverImage)
	}else if(typeof data.coverImage ==="string"){
		formData.append("existingCoverImage", data.coverImage)
	}

	const existingGalleryImages= [];

	(data.galleryImages || []).forEach((image)=>{
		if(image instanceof File){
			formData.append("galleryImages", image)
		}else if(typeof image === "string"){
			existingGalleryImages.push(image)
		}
	})
	
	if(existingGalleryImages.length > 0){
		formData.append("existingGalleryImages", JSON.stringify(existingGalleryImages))
	}


	formData.append("category", data.category)
	formData.append("subcategory", data.subcategory)

	//formData.append("defaultAttributes", JSON.stringify(data.defaultAttributes || {}))
	formData.append("sleeve", data.sleeve)
	formData.append("fabric", data.fabric)

	formData.append("manufacturer", JSON.stringify(data.manufacturer || {}));
	formData.append("isReturnable", String(data.isReturnable))
	formData.append("returnWindowDays", String(data.returnWindowDays))

	formData.append("isActive", String(data.isActive))
	formData.append("isFeatured", String(data.isFeatured))
	formData.append("isLimited", String(data.isLimited))


	formData.append("selectedSizes", JSON.stringify(data.selectedSizes || []))
	formData.append("selectedColor", data.selectedColor || "")


	formData.append("variants", JSON.stringify(data.variants || []));



	for(const [key, value] of formData.entries()){
		console.log(key, value)
	}
	return formData;
}