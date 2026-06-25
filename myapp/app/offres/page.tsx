import { asText } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "../../prismicio";
import PinButton from "./PinButton";

export default async function JobsPage() {
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
  const technologies = Array.from(
    new Set(
      jobs.flatMap((job) => {
        const slice = job.data.slices.find(
          (item) => item.slice_type === "job_posting",
        );

        return (
          slice?.primary.technologies
            .map((technology) => technology.name)
            .filter((technology): technology is string => Boolean(technology)) ??
          []
        );
      }),
    ),
  );

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <Link className="underline" href="/">
        Accueil
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">Offres disponibles</h1>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-medium">Technologies</h2>
        {technologies.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li key={technology}>
                <Link
                  className="inline-block border border-zinc-300 px-3 py-1"
                  href={`/technologies/${encodeURIComponent(technology)}`}
                >
                  {technology}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune technologie disponible.</p>
        )}
      </section>

      <section className="mt-8">
        {jobs.length > 0 ? (
          <div className="grid gap-4">
            {jobs.map((job) => {
              const slice = job.data.slices.find(
                (item) => item.slice_type === "job_posting",
              );
              const title = slice ? asText(slice.primary.title) : job.uid;
              const description = slice ? asText(slice.primary.description) : "";
              const technologies =
                slice?.primary.technologies
                  .map((technology) => technology.name)
                  .filter(Boolean)
                  .join(", ") || "Technologies non renseignées";

              return (
                <article className="border border-zinc-200 p-4" key={job.id}>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-medium">
                      {title || "Offre sans titre"}
                    </h2>
                    {job.uid ? <PinButton uid={job.uid} /> : null}
                  </div>
                  {slice?.primary.date ? <p>{slice.primary.date}</p> : null}
                  <p>{technologies}</p>
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
      </section>
    </main>
  );
}
