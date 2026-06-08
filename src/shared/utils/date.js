export const formatDateForDisplay= (date)=>{
	if(!date) return ""
	const d= new Date(date)
	if(isNaN(d)) return ""
	
	const day= String(d.getDate()).padStart(2, "0")
	const month= String(d.getMonth()+1).padStart(2, "0")
	const year= d.getFullYear()

	return `${day}-${month}-${year}`
}

export const formatDateForInput= (date)=>{
	if(!date) return ""
	const d= new Date(date)
	if(isNaN(d)) return ""

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`
}


export const monthYearFormat= (date)=>{
	if(!date) return "N/A";
	const d= new Date(date)

	if(isNaN(d)) return "N/A"

	return new Intl.DateTimeFormat("en-US",{
		month: "long",
		year: "numeric",
	}).format(d)
}

export const formatDateTime= (date)=>{
if (!date) return "";
  const d = new Date(date);
  if (isNaN(d)) return "";

  return new Intl.DateTimeFormat("en-US", {
	year: "numeric",
    month: "long",   
    day: "numeric",  
    hour: "2-digit",  
    minute: "2-digit",
    //second: "2-digit",
    hour12: true,     
  }).format(d)
}