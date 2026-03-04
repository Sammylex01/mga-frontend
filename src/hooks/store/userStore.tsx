import { TUser } from "../../lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TUseUserStore = {
  user: null | TUser;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: TUser | null) => void;
  setToken: (token: string | null) => void;
  setAuth: (user: TUser, token: string) => void;
  clearAuth: () => void;
};

const useUserStore = create<TUseUserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
