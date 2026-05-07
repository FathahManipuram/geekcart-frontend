import api from "@/services/axios";

export const createAddressApi= async(data)=> api.post("/account/address", data)

export const getAddressesApi= async()=> api.get("/account/address")

export const updateAddressApi= async(addressId, data)=> api.patch(`/account/address/${addressId}`, data)

export const removeAddressApi= async(addressId)=> api.delete(`/account/address/${addressId}`)