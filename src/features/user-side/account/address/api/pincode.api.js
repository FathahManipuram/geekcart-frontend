import { toast } from "sonner"
import { verifyPincodeApi } from "./address.api"

export const verifyPincode= async(pincode)=>{
	const res= await verifyPincodeApi(pincode)
	const result= res.data[0]
	console.log(result)

	  if (result.Status !== "Success") {
     toast.error("Invalid PIN code");
    }
	const office = result.PostOffice[0];
	return {
    city: office.Name.toLowerCase(),
    state: office.State.toLowerCase(),
    country: "india",
  };
}