export const toggleSize=(
	selectedSizes= [],
	size= ""
)=>{
	const isSelected= selectedSizes.includes(size)

	if(isSelected){
		return selectedSizes.filter((item)=> item !== size)
	}

	return [
		...selectedSizes,
		size,
	]
}