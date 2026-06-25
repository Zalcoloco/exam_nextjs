import { asText } from "@prismicio/client";
import { NextResponse } from "next/server";
import { createClient } from "../../../../../prismicio";

type Params = {
  params: Promise<{ uid: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { uid } = await params;
  const client = createClient();
  const job = await client.getByUID("single", uid).catch(() => null);

  if (!job) {
    return NextResponse.json({ error: "Offre introuvable" }, { status: 404 });
  }

  const slice = job.data.slices.find(
    (item) => item.slice_type === "job_posting",
  );

  if (!slice) {
    return NextResponse.json({ error: "Offre incomplète" }, { status: 404 });
  }

  const title = asText(slice.primary.title) || "Offre sans titre";

  return NextResponse.json({
    to: slice.primary.email_admin,
    subject: `Candidature - ${title}`,
    content: asText(slice.primary.applicationText),
    offer: {
      uid: job.uid,
      title,
      url: job.url ?? `/offres/${job.uid}`,
    },
    sent: false,
  });
}
