import { asText } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "../prismicio";
import PinButton from "./offres/PinButton";

export default async function Home() {
  const client = createClient();
  const jobs = await client
    .getAllByType("single", {
      orderings: [
        {
          field: "document.first_publication_date",
          direction: "desc",
        },
      ],
    })
    .catch(() => []);
  const latestJobs = jobs.slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold">Nos dernières opportunités</h1>
          <Link className="inline-block underline" href="/offres">
            Voir les offres d&apos;emploi
          </Link>
        </div>

        {latestJobs.length > 0 ? (
          <div className="grid gap-4">
            {latestJobs.map((job) => {
              const slice = job.data.slices.find(
                (item) => item.slice_type === "job_posting",
              );
              const title = slice ? asText(slice.primary.title) : job.uid;

              return (
                <article className="border border-zinc-200 p-4" key={job.id}>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-medium">
                      {title || "Offre sans titre"}
                    </h2>
                    {job.uid ? <PinButton uid={job.uid} /> : null}
                  </div>
                  {slice?.primary.date ? <p>{slice.primary.date}</p> : null}
                  <Link
                    className="mt-3 inline-block underline"
                    href={job.url ?? `/offres/${job.uid}`}
                  >
                    Voir l&apos;offre
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <p>Aucune offre disponible.</p>
        )}
      </section>
    </main>
  );
}
