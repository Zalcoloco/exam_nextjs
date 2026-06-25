import { asText } from "@prismicio/client";
import { NextResponse } from "next/server";
import { createClient } from "../../../prismicio";

export async function GET() {
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
  const latestJobs = jobs.slice(0, 3).map((job) => {
    const slice = job.data.slices.find(
      (item) => item.slice_type === "job_posting",
    );

    return {
      uid: job.uid,
      title: slice ? asText(slice.primary.title) : job.uid,
      date: slice?.primary.date ?? null,
      technologies:
        slice?.primary.technologies
          .map((technology) => technology.name)
          .filter(Boolean) ?? [],
      url: job.url ?? `/offres/${job.uid}`,
    };
  });

  return NextResponse.json(latestJobs);
}
