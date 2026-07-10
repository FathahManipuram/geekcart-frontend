import { create } from "zustand";
import { googleLoginApi, loginApi } from "../api/auth.api";
import { storage } from "@/services/storage";
import {
  changeEmailApi,
  changePasswordApi,
  getProfileApi,
  updateProfileApi,
  uploadProfileImageApi,
  verifyEmailChangeApi,
} from "@/features/user-side/account/profile/api/user.api";
import { STORAGE_KEYS } from "@/shared/constants/storageKeys";


const storedUser = storage.get(STORAGE_KEYS.USER_PROFILE);

export const useAuthStore = create((set, get) => ({
  user: storedUser || null,
  accessToken: null,
  loading: false,
  error: null,

setAuth: ({user, accessToken})=>{
  storage.set(STORAGE_KEYS.USER_PROFILE, user)
  storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken)

  set({
    user,
    accessToken,
    loading: false,
    error: null,
  })
},

clearAuth: ()=>{
  storage.remove(STORAGE_KEYS.USER_PROFILE)
  storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
  set({
    user: null,
    accessToken: null,
    error: null,
  })
},

  //Login
  login: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await loginApi(data);
      const { user, accessToken } = res.data;
      get().setAuth({
        user,
        accessToken,
      })
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
      set({ loading: true, error: null});

      const res = await googleLoginApi(token);
      const { user, accessToken } = res.data;
     get().setAuth({
      user, accessToken,
     })

      return res;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  // Logout
  logout: () => {
   get().clearAuth()
  },

  //Fetch profile
  fetchProfile: async () => {
    try {
      set({ loading: true });

      const res = await getProfileApi();
      const user = res.data;
      const currentUser= get().user
      if(JSON.stringify(currentUser) !== JSON.stringify(user)){
        storage.set(STORAGE_KEYS.USER_PROFILE, user);
        set({ user, loading: false });
      }else{

        set({
          user, loading: false
        })
      }
      
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
      const updatedUser = user;
      storage.set(STORAGE_KEYS.USER_PROFILE, updatedUser);
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
      const res = await uploadProfileImageApi(formData);
      const updatedAvatar = res.data.avatar;

      const updatedUser = { ...get().user, avatar: updatedAvatar };
      storage.set(STORAGE_KEYS.USER_PROFILE, updatedUser);

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
      const res = await changeEmailApi({ email });
      set({ loading: false });
  
      return res;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  // Verify email change
  verifyEmailChange: async (data) => {
    try{
      set({ loading: true, error: null });
      const res = await verifyEmailChangeApi(data);
  
      const user = res.data;
      storage.set(STORAGE_KEYS.USER_PROFILE, user);
      set({ user, loading: false, error: null,});

      return res;
    }catch(err){
      const message =
        err.response?.data?.message || "Email verification failed";
      set({ loading: false, error: message });
      throw err
    }

  },

  //Change password
  changePassword: async(data)=>{
    try{
       set({ loading: true , error: null});

       const res= await changePasswordApi(data)
       const updatedUser= res.data
       storage.set(STORAGE_KEYS.USER_PROFILE, updatedUser)
       set({user: updatedUser, loading: false})
       return res
    }catch(err){
      const message = err.response?.data?.message || "Change password failed";
      set({ loading: false, error: message });
      throw err;
    }
  }
}));
