// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  role: string;
  phone_number: string;
  specialization: string;
  experience: string;
  license: string;
  verified : boolean;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isHydrated: boolean
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setIsHydrated : (isHydrated: boolean) => void
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isHydrated :false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
      setIsHydrated : (state) => set({isHydrated :state})
    }),
    {
      name: "auth-store", // Key in localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);
