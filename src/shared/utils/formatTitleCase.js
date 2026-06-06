export const formatTitleCase= (text="")=>{
	return text
	.trim()
	.toLowerCase()
	.split(/\s+/)
	.map(
		(word)=>
		word.charAt(0).toUpperCase() +
		word.slice(1)
	).join(" ")
}