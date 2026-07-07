import { STORAGE_KEYS } from "@/shared/constants/storageKeys";
import { storage } from "./storage";
import { toast } from "sonner";
import { logoutUser } from "@/shared/utils/logoutUser";

let isHandlingAuthError = false;

export const setupInterceptors = (
  axiosInstance,
  tokenKey = STORAGE_KEYS.ACCESS_TOKEN,
) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log("axiosReq: ", config);
      const token = storage.get(tokenKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Axios response:", response.data);
      return response.data;
    },
    (error) => {
      const responseData = error.response?.data;
      const message =
        responseData?.message || error.message || "Something went wrong";
      const status = error.response?.status;

      console.log("Errorconfig: ", error.config);
      console.log("AxiosError:", message);

      const lowerCaseMessage = message.toLowerCase();
      const hasToken= !!storage.get(tokenKey)
      const isUserBlocked =
        status === 403 && lowerCaseMessage.includes("blocked");

      const isTokenExpired =
        status === 401 && hasToken &&
        (lowerCaseMessage.includes("expired") ||
          lowerCaseMessage.includes("login again") ||
          lowerCaseMessage.includes("unauthorized"));

      if (isUserBlocked && !isHandlingAuthError) {
        isHandlingAuthError = true;
        toast.error("Your account has been blocked by the administrator.");
        setTimeout(() => {
          logoutUser();
          isHandlingAuthError = false;
        }, 4000);
        return Promise.reject(error);
      }

      if (isTokenExpired && !isHandlingAuthError) {
        isHandlingAuthError = true;
        toast.error("Your session has expired. Please login again.");

        setTimeout(() => {
          logoutUser();
          isHandlingAuthError = false;
        }, 2000);

        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
}