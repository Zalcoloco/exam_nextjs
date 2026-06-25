import { asText } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "../../prismicio";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
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
  const jobLinks = jobs.map((job) => {
    const slice = job.data.slices.find(
      (item) => item.slice_type === "job_posting",
    );
    const title = slice ? asText(slice.primary.title) : job.uid;

    return {
      uid: job.uid,
      title: title || "Offre sans titre",
      url: job.url ?? `/offres/${job.uid}`,
    };
  });

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <Link className="underline" href="/">
        Accueil
      </Link>
      <ProfileClient jobs={jobLinks} />
    </main>
  );
}
