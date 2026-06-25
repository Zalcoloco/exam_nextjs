"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  uid: string;
};

const storageKey = "pinnedOffers";

function getPinnedOffers() {
  return JSON.parse(localStorage.getItem(storageKey) ?? "[]") as string[];
}

export default function PinButton({ uid }: Props) {
  const [isPinned, setIsPinned] = useState(() =>
    getPinnedOffers().includes(uid),
  );

  function togglePinnedOffer() {
    const pinnedOffers = getPinnedOffers();
    const nextPinnedOffers = isPinned
      ? pinnedOffers.filter((pinnedUid) => pinnedUid !== uid)
      : [...pinnedOffers, uid];

    localStorage.setItem(storageKey, JSON.stringify(nextPinnedOffers));
    setIsPinned(!isPinned);
  }

  return (
    <button
      type="button"
      onClick={togglePinnedOffer}
    >
      <Image src="/save.svg" alt="" width={24} height={24} />
    </button>
  );
}
