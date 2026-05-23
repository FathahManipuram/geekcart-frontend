export const numberTransformer=(value)=>{
	if(value === "" || value === null || value === undefined){
		return ""
	}

	return Number(value)
}