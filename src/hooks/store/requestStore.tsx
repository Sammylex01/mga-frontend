import { TBookingReequest } from "../../lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TUseRequestStore = {
  request: null | TBookingReequest;
  setRequest: (request: null | TBookingReequest) => void;
  clearRequests: () => void;
};


const useRequestStore = create<TUseRequestStore>()(
  persist(
    (set) => ({
      request: null,
      setRequest: (request) => set({ request }),
      clearRequests: () => set({ request: null }),
    }),
    {
      name: "request-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRequestStore;
