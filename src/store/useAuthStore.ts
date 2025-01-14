import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (value) => set({ isLoggedIn: value }),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    set({ isLoggedIn: false });
  },
}));
