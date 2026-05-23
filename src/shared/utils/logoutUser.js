import { storage } from "@/services/storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const logoutUser=()=>{
	storage.remove(STORAGE_KEYS.USER_PROFILE);

  storage.remove(STORAGE_KEYS.ACCESS_TOKEN);

  window.location.href = "/login";
}