import { asText } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "../../../prismicio";

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
    <main>
      <Link href="/offres">Toutes les offres</Link>
      <h1>{selectedTechnology}</h1>

      {filteredJobs.length > 0 ? (
        <div>
          {filteredJobs.map((job) => {
            const slice = job.data.slices.find(
              (item) => item.slice_type === "job_posting",
            );
            const title = slice ? asText(slice.primary.title) : job.uid;
            const description = slice ? asText(slice.primary.description) : "";

            return (
              <article key={job.id}>
                <h2>{title || "Offre sans titre"}</h2>
                {slice?.primary.date ? <p>{slice.primary.date}</p> : null}
                {description ? <p>{description}</p> : null}
                <Link href={job.url ?? `/offres/${job.uid}`}>
                  {"Voir l'offre"}
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
