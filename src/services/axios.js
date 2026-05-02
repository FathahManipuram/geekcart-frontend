import axios from "axios"
import { ENV } from "../shared/config/env"

const api= axios.create({
	baseURL: ENV.API_URL,
	withCredentials:true,
	headers:{
		"Content-Type": "application/json",
	},
})

export default api