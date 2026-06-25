import { asText } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "../../../prismicio";
import PinButton from "../../offres/PinButton";

type Props = {
  params: Promise<{ technology: string }>;
};

export default async function TechnologyPage({ params }: Props) {
  const { technology } = await params;
  const selectedTechnology = decodeURIComponent(technology);
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
  const filteredJobs = jobs.filter((job) => {
    const slice = job.data.slices.find(
      (item) => item.slice_type === "job_posting",
    );

    return slice?.primary.technologies.some(
      (technology) => technology.name === selectedTechnology,
    );
  });

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <Link className="underline" href="/offres">
        Toutes les offres
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">{selectedTechnology}</h1>

      {filteredJobs.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {filteredJobs.map((job) => {
            const slice = job.data.slices.find(
              (item) => item.slice_type === "job_posting",
            );
            const title = slice ? asText(slice.primary.title) : job.uid;
            const description = slice ? asText(slice.primary.description) : "";

            return (
              <article className="border border-zinc-200 p-4" key={job.id}>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-medium">
                    {title || "Offre sans titre"}
                  </h2>
                  {job.uid ? <PinButton uid={job.uid} /> : null}
                </div>
                {slice?.primary.date ? <p>{slice.primary.date}</p> : null}
                {description ? <p>{description}</p> : null}
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
    </main>
  );
}
