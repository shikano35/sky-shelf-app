import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  setAuth: (loggedIn: boolean, admin: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const isClient = typeof window !== "undefined";

  return {
    isLoggedIn: isClient ? !!localStorage.getItem("token") : false,
    isAdmin: isClient ? localStorage.getItem("isAdmin") === "true" : false,
    setAuth: (loggedIn, admin) => {
      if (isClient) {
        localStorage.setItem("token", loggedIn.toString());
        localStorage.setItem("isAdmin", admin.toString());
      }
      set({ isLoggedIn: loggedIn, isAdmin: admin });
    },
    logout: () => {
      if (isClient) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin");
      }
      set({ isLoggedIn: false, isAdmin: false });
    },
  };
});
