"use client";

import Image from "next/image";
import { usePinnedOffersStore } from "./pinnedOffersStore";

type Props = {
  uid: string;
};

export default function PinButton({ uid }: Props) {
  const pinnedOffers = usePinnedOffersStore((state) => state.pinnedOffers);
  const togglePinnedOffer = usePinnedOffersStore(
    (state) => state.togglePinnedOffer,
  );
  const isPinned = pinnedOffers.includes(uid);

  return (
    <button
      type="button"
      onClick={() => togglePinnedOffer(uid)}
      aria-label={isPinned ? "Retirer du profil" : "Épingler dans le profil"}
      title={isPinned ? "Retirer du profil" : "Épingler dans le profil"}
    >
      <Image src="/save.svg" alt="" width={24} height={24} />
    </button>
  );
}
