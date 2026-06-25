import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
      <body><header style={{ backgroundColor: "black" }}>
        <nav>
          <Link href="/">
            <Image src="/logo.svg" alt="DEV" width={95} height={24} priority />
          </Link>
          <Link href="/profil">
            <Image src="/login.svg" alt="Profil" width={24} height={24} />
          </Link>
        </nav>
      </header>{children}</body>
    </html>
  );
}
