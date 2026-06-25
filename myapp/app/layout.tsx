import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev",
  description:
    "Application Next.js pour consulter et suivre des offres d'emploi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
