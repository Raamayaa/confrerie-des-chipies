import {
  Coins,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

type Props = {
  coins: number;
};

export default function ShopHeader({
  coins,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-violet-500/10">

      {/* Halo lumineux */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-700/30 via-fuchsia-600/20 to-cyan-500/30" />

      <div className="absolute -right-10 -top-10 opacity-10">
        <Sparkles className="h-56 w-56 text-white" />
      </div>

      <div className="relative flex flex-col gap-8 p-10 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-white">
            <ShoppingBag className="h-5 w-5 text-violet-300" />
            Boutique
          </div>

          <h1 className="text-5xl font-black text-white">
            Personnalise ton profil
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Achète des cadres, des bannières, des titres et des effets pour rendre ton profil totalement unique.
          </p>

        </div>

        <div className="rounded-2xl border border-yellow-400/20 bg-zinc-800/70 px-8 py-6 backdrop-blur-xl shadow-lg shadow-yellow-500/10">

          <div className="flex items-center gap-4">

            <Coins className="h-10 w-10 text-yellow-400" />

            <div>

              <p className="text-sm uppercase tracking-wider text-gray-400">
                Solde actuel
              </p>

              <p className="text-4xl font-black text-yellow-400">
                {coins.toLocaleString("fr-FR")} 🪙
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}