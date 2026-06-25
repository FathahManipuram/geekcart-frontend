import userApi from "@/services/userApi";


export const createAddressApi= async(data)=> userApi.post("/account/address", data)

export const getAddressesApi = async () => userApi.get("/account/address");

export const updateAddressApi = async (addressId, data) =>
  userApi.patch(`/account/address/${addressId}`, data);

export const removeAddressApi = async (addressId) =>
  userApi.delete(`/account/address/${addressId}`);
  
export const verifyPincodeApi = async (pincode) =>
  userApi.get(`https://api.postalpincode.in/pincode/${pincode}`);