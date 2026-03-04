import { TTrip } from "../../lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TripStatus = "scheduled" | "in_progress" | "completed" | "cancelled";

export type TUseTripsStore = {
  // trips: TTrip[];
  // setTrips: (trips: TTrip[]) => void;
  trips: {
    outbound: TTrip[];
    return: TTrip[] | null;
  };
  setTrips: (trips: { outbound: TTrip[]; return: TTrip[] | null }) => void;
  clearTrips: () => void;
  updateTripStatus: (tripId: string, status: TripStatus) => void;
};

// export const useTripsStore2 = create<TUseTripsStore>()(
//   persist(
//     (set) => ({
//       trips: [],
//       setTrips: (trips) => set(() => ({ trips })),
//       clearTrips: () => set(() => ({ trips: [] })),
//       updateTripStatus: (tripId, status) =>
//         set((state) => ({
//           trips: state.trips.map((trip) =>
//             trip._id === tripId || trip._id === tripId
//               ? { ...trip, status }
//               : trip
//           ),
//         })),
//     }),
//     {
//       name: "trips-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );


const useTripsStore = create<TUseTripsStore>()(
  persist(
    (set) => ({
      trips: { outbound: [], return: null },

      setTrips: (newTrips) => set({ trips: newTrips }),

      // 1. Updated to reset to the object structure instead of an empty array
      clearTrips: () => set(() => ({
        trips: { outbound: [], return: null }
      })),

      // 2. Updated to look through both outbound and return arrays
      updateTripStatus: (tripId, status) =>
        set((state) => {
          // Update outbound array
          const updatedOutbound = state.trips.outbound.map((trip) =>
            trip._id === tripId ? { ...trip, status } : trip
          );

          // Update return array if it exists
          const updatedReturn = state.trips.return
            ? state.trips.return.map((trip) =>
              trip._id === tripId ? { ...trip, status } : trip
            )
            : null;

          return {
            trips: {
              outbound: updatedOutbound,
              return: updatedReturn,
            },
          };
        }),
    }),
    {
      name: "trips-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useTripsStore;
