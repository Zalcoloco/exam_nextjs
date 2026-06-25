import { asText } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "../../../prismicio";
import PinButton from "./PinButton";

type Props = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const job = await client.getByUID("single", uid).catch(() => null);
  const slice = job?.data.slices.find(
    (item) => item.slice_type === "job_posting",
  );

  return {
    title: slice ? asText(slice.primary.title) : "Offre",
  };
}

export default async function JobPage({ params }: Props) {
  const { uid } = await params;
  const client = createClient();
  const job = await client.getByUID("single", uid).catch(() => null);

  if (!job) {
    notFound();
  }

  const slice = job.data.slices.find(
    (item) => item.slice_type === "job_posting",
  );

  if (!slice) {
    notFound();
  }

  const technologies = slice.primary.technologies
    .map((technology) => technology.name)
    .filter(Boolean)
    .join(", ");

  return (
    <main>
      <Link href="/offres">Retour aux offres</Link>
      <h1>{asText(slice.primary.title) || "Offre sans titre"}</h1>
      {slice.primary.date ? <p>{slice.primary.date}</p> : null}
      {technologies ? <p>{technologies}</p> : null}
      <PinButton uid={uid} />
      <PrismicRichText field={slice.primary.description} />
    </main>
  );
}
