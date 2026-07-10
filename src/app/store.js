import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLoading: false,

  setLoading: (value) => set({ isLoading: value }),
}));
