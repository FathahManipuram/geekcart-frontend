import axios from "axios"
import { ENV } from "../shared/config/env"

export const createAxiosInstance= ()=>{
	return axios.create({
    baseURL: ENV.API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
