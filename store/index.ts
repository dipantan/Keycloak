import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: any) => set({ user }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
