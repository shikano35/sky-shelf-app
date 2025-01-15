import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  setAuth: (loggedIn: boolean, admin: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("token"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
  setAuth: (loggedIn, admin) => {
    localStorage.setItem("isLoggedIn", loggedIn.toString());
    localStorage.setItem("isAdmin", admin.toString());
    set({ isLoggedIn: loggedIn, isAdmin: admin });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    set({ isLoggedIn: false, isAdmin: false });
  },
}));
