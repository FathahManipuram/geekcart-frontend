import userApi from "@/services/userApi"


export const getProfileApi= ()=> userApi.get("/user/profile")
export const updateProfileApi = (data) => userApi.patch("/user/profile", data);

export const changeEmailApi = (data) => userApi.patch("/user/change-email", data);
export const verifyEmailChangeApi = (data) =>
  userApi.post("/user/verify-email-change", data);

export const uploadProfileImageApi = (file) =>
  userApi.post("/user/profile-image", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const changePasswordApi = (data) => userApi.put("/user/change-password", data);