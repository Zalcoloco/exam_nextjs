import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <h1>Nos dernières opportunités</h1>
        <Link href="/offres">{"Voir les offres d'emploi"}</Link>
      </section>
    </main>
  );
}
