import { asText } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "../prismicio";

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

  return (
    <main>
      <header>
        <nav>
          <Link href="/">DEV</Link>
          <Link href="/profil">Profil</Link>
        </nav>
      </header>

      <section>
        <h1>Nos dernieres opportunites</h1>
      </section>

      <section>
        <h2>Offres disponibles</h2>

        {jobs.length > 0 ? (
          <div>
            {jobs.map((job) => {
              const slice = job.data.slices.find(
                (item) => item.slice_type === "job_posting",
              );
              const title = slice ? asText(slice.primary.title) : job.uid;
              const technologies =
                slice?.primary.technologies
                  .map((technology) => technology.name)
                  .filter(Boolean)
                  .join(", ") || "Technologies non renseignees";

              return (
                <article key={job.id}>
                  <h3>{title || "Offre sans titre"}</h3>
                  <p>{technologies}</p>
                  <Link href={job.url ?? `/offres/${job.uid}`}>
                    Voir l'offre
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
