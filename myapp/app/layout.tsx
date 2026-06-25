import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevJobs - Offres d'emploi",
  description:
    "Mini-application Next.js pour consulter et suivre des offres d'emploi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
