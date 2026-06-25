import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "../../prismicio";
import { components } from "../../slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("mention").catch(() => null);

  return {
    title: page?.data.meta_title || "Mentions légales",
    description: page?.data.meta_description || undefined,
  };
}

export default async function LegalNoticePage() {
  const client = createClient();
  const page = await client.getSingle("mention").catch(() => null);

  if (!page) {
    notFound();
  }

  const title = page.data.slices
    .map((slice) =>
      slice.slice_type === "legal_terms" ? asText(slice.primary.heading) : "",
    )
    .find(Boolean);

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-3xl font-semibold">
        {title || "Mentions légales"}
      </h1>
      <div className="mt-8">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </main>
  );
}
