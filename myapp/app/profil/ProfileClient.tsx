"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

type Job = {
  uid: string;
  title: string;
  url: string;
};

type Props = {
  jobs: Job[];
};

const storageKey = "pinnedOffers";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(storageKey) ?? "[]";
}

export default function ProfileClient({ jobs }: Props) {
  const pinnedOffers = JSON.parse(
    useSyncExternalStore(subscribe, getSnapshot, () => "[]"),
  ) as string[];
  const pinnedJobs = jobs.filter((job) => pinnedOffers.includes(job.uid));

  return (
    <section>
      <h1>Profil</h1>

      {pinnedJobs.length > 0 ? (
        <div>
          {pinnedJobs.map((job) => (
            <article key={job.uid}>
              <h2>{job.title}</h2>
              <Link href={job.url}>Voir l&apos;offre</Link>
            </article>
          ))}
        </div>
      ) : (
        <p>Aucune offre épinglée.</p>
      )}
    </section>
  );
}
