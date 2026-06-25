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
      <body>
        <header className="bg-black">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="DEV"
                width={95}
                height={24}
                priority
              />
            </Link>
            <Link href="/profil" aria-label="Profil">
              <Image src="/login.svg" alt="" width={24} height={24} />
            </Link>
          </nav>
        </header>
        {children}
        <footer className="mx-auto max-w-5xl px-5 py-6">
          <Link className="underline" href="/mentions-legales">
            Mentions légales
          </Link>
        </footer>
      </body>
    </html>
  );
}
