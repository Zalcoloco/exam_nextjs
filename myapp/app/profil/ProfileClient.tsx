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
    <section className="mt-6">
      <h1 className="text-3xl font-semibold">Profil</h1>

      {pinnedJobs.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {pinnedJobs.map((job) => (
            <article className="border border-zinc-200 p-4" key={job.uid}>
              <h2 className="text-xl font-medium">{job.title}</h2>
              <Link className="mt-3 inline-block underline" href={job.url}>
                Voir l&apos;offre
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4">Aucune offre épinglée.</p>
      )}
    </section>
  );
}
