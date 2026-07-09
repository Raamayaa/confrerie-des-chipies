import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

export default function InventoryPage() {
  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pb-20 pt-36">
        <div className="mb-10">
          <h1 className="text-5xl font-black">
            🎒 Inventaire
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            Gérez vos objets, cadres, titres et cosmétiques.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl border bg-card p-8">
            <div className="text-6xl">👑</div>

            <h2 className="mt-6 text-2xl font-black">
              Cadre Or
            </h2>

            <p className="mt-3 text-muted-foreground">
              Cadre légendaire.
            </p>

            <button className="mt-8 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-500">
              Équiper
            </button>
          </div>

          <div className="rounded-3xl border bg-card p-8 opacity-60">
            <div className="text-6xl">🌌</div>

            <h2 className="mt-6 text-2xl font-black">
              Fond Galaxy
            </h2>

            <p className="mt-3 text-muted-foreground">
              Bannière épique.
            </p>

            <button
              disabled
              className="mt-8 rounded-xl border px-6 py-3"
            >
              Verrouillé
            </button>
          </div>

          <div className="rounded-3xl border bg-card p-8 opacity-60">
            <div className="text-6xl">🚀</div>

            <h2 className="mt-6 text-2xl font-black">
              Titre Fondateur
            </h2>

            <p className="mt-3 text-muted-foreground">
              Réservé aux pionniers.
            </p>

            <button
              disabled
              className="mt-8 rounded-xl border px-6 py-3"
            >
              Verrouillé
            </button>
          </div>
        </div>
      </main>
    </>
  );
}