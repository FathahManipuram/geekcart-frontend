import { formatTitleCase } from "./formatTitleCase"

export const getPageTitleFromPath= (pathname="", fallback="Dashboard")=>{
	const segments= pathname.split("/").filter(Boolean)

	const lastSegment= segments.at(-1)

	const isMongoId= /^[a-f\d]{24}$/i.test(lastSegment ||"")

	const targetSegment= isMongoId ? segments.at(-2) : lastSegment

	const segment= targetSegment || fallback

	return segment
	.split("-")
	.map(
		(word)=> word.charAt(0) + word.slice(1)
	).join(" ")
}

