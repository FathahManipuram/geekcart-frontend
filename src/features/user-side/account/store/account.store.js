import { create } from "zustand";
import { createAddressApi, getAddressByIdApi, getAddressesApi, removeAddressApi, updateAddressApi } from "../address/api/address.api"

export const useAccountStore = create((set, get) => ({
  addresses: [],
  loading: false,
  address: null,

  //Fetch address
  fetchAddresses: async () => {
    try {
      set({ loading: true });
      const res = await getAddressesApi();

      set({
        addresses: res.data,
        loading: false,
      });
      return res;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  // Add address
  addAddress: async (data) => {
    try {
      set({ loading: true });

      const res = await createAddressApi(data);

      set((state) => ({
        addresses: [res.data, ...state.addresses],
        loading: false,
      }));
      get().fetchAddresses();

      return res;
    } catch (err) {
      set({ loading: false });

      throw err;
    }
  },

  //Update Address
  updateAddress: async (id, data) => {
    try {
      set({ loading: true });
      const res = await updateAddressApi(id, data);

      get().fetchAddresses();

      return res;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  //Remove Address
  removeAddress: async (addressId) => {
    try {
      set({ loading: true });
      await removeAddressApi(addressId);

      set((state) => ({
        addresses: state.addresses.filter(
          (address) => address._id !== addressId,
        ),
        loading: false,
      }));
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  getAddressById: async (addressId) => {
    try {
      set({ loading: true });
      const res = await getAddressByIdApi(addressId);
      set({
        address: res.data,
        loading: false,
      });
      return res;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },
}));