import { create } from "zustand";
import { persist } from "zustand/middleware";

type PinnedOffersStore = {
  pinnedOffers: string[];
  togglePinnedOffer: (uid: string) => void;
};

export const usePinnedOffersStore = create<PinnedOffersStore>()(
  persist(
    (set) => ({
      pinnedOffers: [],
      togglePinnedOffer: (uid) =>
        set((state) => ({
          pinnedOffers: state.pinnedOffers.includes(uid)
            ? state.pinnedOffers.filter((pinnedUid) => pinnedUid !== uid)
            : [...state.pinnedOffers, uid],
        })),
    }),
    {
      name: "pinnedOffers",
    },
  ),
);
