import { storage } from "@/services/storage";
import { create } from "zustand";
import { adminLoginApi } from "../api/auth.api";
import { STORAGE_KEYS } from "@/shared/constants/storageKeys";

const storedAdmin= storage.get("admin_profile")

export const useAdminAuthStore = create((set, get) => ({
  adminUser: storedAdmin || null,
  accessToken: null,
  loading: false,
  error: null,

  setAuth: ({ user, accessToken }) => {
    storage.set(STORAGE_KEYS.ADMIN_PROFILE, user);
    storage.set(STORAGE_KEYS.ADMIN_ACCESS_TOKEN, accessToken)
    set({ adminUser: user, accessToken, loading: false, error: null });
  },

  clearAuth: () => {
    storage.remove(STORAGE_KEYS.ADMIN_PROFILE);
    storage.remove(STORAGE_KEYS.ADMIN_ACCESS_TOKEN)
    
    set({
      adminUser: null,
      accessToken: null,
      loading: false,
      error: null,
    });
  },

  // Admin login
  adminLogin: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await adminLoginApi(data);
      const { user, accessToken } = res.data;

      get().setAuth({
        user,
        accessToken,
      });
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Admin login failed";
      set({ loading: false, error: message });
      throw err;
    }
  },

  // Logout
  logout: () => {
    get().clearAuth();
  },
}));