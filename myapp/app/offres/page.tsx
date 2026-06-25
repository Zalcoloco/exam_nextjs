import { asText } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "../../prismicio";

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
    <main>
      <Link href="/">Accueil</Link>
      <h1>Offres disponibles</h1>

      <section>
        <h2>Technologies</h2>
        {technologies.length > 0 ? (
          <ul>
            {technologies.map((technology) => (
              <li key={technology}>
                <Link href={`/technologies/${encodeURIComponent(technology)}`}>
                  {technology}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune technologie disponible.</p>
        )}
      </section>

      <section>
        {jobs.length > 0 ? (
          <div>
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
                <article key={job.id}>
                  <h2>{title || "Offre sans titre"}</h2>
                  {slice?.primary.date ? <p>{slice.primary.date}</p> : null}
                  <p>{technologies}</p>
                  {description ? <p>{description}</p> : null}
                  <Link href={job.url ?? `/offres/${job.uid}`}>
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
