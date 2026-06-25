import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-base font-semibold">
            DEV
          </Link>
          <Link
            href="/profil"
            className="text-sm font-medium text-slate-600 hover:text-slate-950"
          >
            Profil
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Nos dernière opportunités
          </h1>
        </div>
      </section>
    </main>
  );
}
