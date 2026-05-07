import { create } from "zustand";
import { createAddressApi, getAddressesApi, removeAddressApi, updateAddressApi } from "../address/api/address.api"

export const useAccountStore = create((set) => ({
  addresses: [],
  loading: false,

  fetchAddresses: async () => {
    try {
      set({ loading: true });
      const res = await getAddressesApi();

      set({
        addresses: res.data,
        loading: false,
      });
      return res
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  addAddress: async (data) => {
    try {
      set({ loading: true });

      const res = await createAddressApi(data);

      set((state) => ({
        addresses: [res.data, ...state.addresses],
        loading: false,
      }));

      return res;
    } catch (err) {
      set({ loading: false });

      throw err;
    }
  },

  updateAddress: async(id, data)=>{
    try{
      set({loading: true})
      const res= await updateAddressApi(id, data)
      
      set((state)=>({
        addresses: state.addresses.map((address)=> address._id ===id ? res.data: address),
        loading: false,
      }))

      return res
    }catch(err){
      set({loading: false})
      throw err
    }
  },

  removeAddress: async(addressId)=>{
    try{
      set({loading: true})
      await removeAddressApi(addressId)

      set((state)=>({
        addresses: state.addresses.filter((address)=> address._id !== addressId),
        loading: false
      }))
    }catch(err){
      set({loading: false})
      throw err
    }
  }


}));