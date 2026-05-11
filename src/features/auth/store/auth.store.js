import { create } from "zustand";
import { adminLoginApi, googleLoginApi, loginApi } from "../api/auth.api";
import { storage } from "@/services/storage";
import {
  changeEmailApi,
  getProfileApi,
  updateProfileApi,
  uploadProfieImageApi,
  verifyEmailChangeApi,
} from "@/features/user-side/account/profile/api/user.api";

const storedUser = storage.get("user");

export const useAuthStore = create((set, get) => ({
  user: storedUser || null,
  loading: false,
  error: null,

  //Login
  login: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await loginApi(data);
      console.log(res);
      const { user, accessToken, refreshToken } = res.data;
      storage.set("user", user);
      storage.set("accessToken", accessToken);
      storage.set("refreshToken", refreshToken);

      set({
        user,
        loading: false,
      });

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";

      set({ loading: false, error: message });

      throw err;
    }
  },

  //Login with google
  loginWithGoogle: async (token) => {
    try {
      set({ loading: true });

      const res = await googleLoginApi(token);
      const { user, accessToken, refreshToken } = res.data;
      console.log("LoginwitGoogle:", user, accessToken, refreshToken);
      storage.set("user", user);
      storage.set("accessToken", accessToken);
      storage.set("refreshToken", refreshToken);

      set({
        user,
        loading: false,
      });

      return res;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  // Logout
  logout: () => {
    storage.remove("accessToken");
    storage.remove("refreshToken");
    storage.remove("user");

    set({
      user: null,
      error: null,
    });
  },

// Admin login
adminLogin: async(data)=>{
  try{
    set({ loading: true, error: null });
    const res= await adminLoginApi(data)
    const {user, accessToken, refreshToken}= res.data
    storage.set("user", user)
    storage.set("accessToken", accessToken)
    storage.set("refreshToken", refreshToken)
    set({
      user,
      loading: false,
    })
    return res
  } catch(err){
    const message= err.response?.data?.message
    set({ loading: false, error: message });
    throw err
  }
},

  //Fetch profile
  fetchProfile: async () => {
    try {
      set({ loading: true });

      const res = await getProfileApi();
      console.log("fetchDAtaprofile", res);
      const user = res.data;
      storage.set("user", user);
      set({ user, loading: false });
      return res
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  //Update profile
  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const res = await updateProfileApi(data);
      const user = res.data;
      console.log("StoreRes: ", res);
      console.log("storeUser", user);
      const updatedUser = user;
      console.log("UpdatedUser:", updatedUser);
      storage.set("user", updatedUser);
      set({ user: updatedUser, loading: false });
      return res;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  //Upload profile Image
  uploadProfileImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      set({ loading: true });
      const res = await uploadProfieImageApi(formData);
      const updatedAvatar = res.data.avatar;

      const updatedUser = { ...get().user, avatar: updatedAvatar };
      storage.set("user", updatedUser);

      set({
        user: updatedUser,
        loading: false,
      });
      return res
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  //Change email
  changeEmail: async (email) => {
    try {
      set({ loading: true });
      console.log("StorechangeEmail:", email);
      const res = await changeEmailApi({ email });
      set({ loading: false });
      console.log("store res:", res);
      return res;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  // Verify email change
  verifyEmailChange: async (data) => {
    console.log("Verify emailChange: ", data);
    const res = await verifyEmailChangeApi(data);
    console.log(res.email);
    const { user } = res.data;
    storage.set("user", user);

    set({ user });

    return res;
  },
}));
