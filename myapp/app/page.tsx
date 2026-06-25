import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header>
        <nav>
          <Link href="/">DEV</Link>
          <Link href="/profil">Profil</Link>
        </nav>
      </header>

      <section>
        <h1>Nos dernières opportunités</h1>
        <Link href="/offres">Voir les offres d'emploi</Link>
      </section>
    </main>
  );
}
