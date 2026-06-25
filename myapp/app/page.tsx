import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header style={{ backgroundColor: "black" }}>
        <nav>
          <Link href="/">
            <Image src="/logo.svg" alt="DEV" width={95} height={24} priority />
          </Link>
          <Link href="/profil">Profil</Link>
        </nav>
      </header>

      <section>
        <h1>Nos dernières opportunités</h1>
        <Link href="/offres">{"Voir les offres d'emploi"}</Link>
      </section>
    </main>
  );
}
