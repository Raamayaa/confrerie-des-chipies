import { Coins, ShoppingBag, Sparkles } from "lucide-react";

type Props = {
  coins: number;
};

export default function ShopHeader({
  coins,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-600 p-10 text-white shadow-2xl">
      <div className="absolute -right-10 -top-10 opacity-10">
        <Sparkles className="h-56 w-56" />
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <ShoppingBag className="h-5 w-5" />
            Boutique
          </div>

          <h1 className="text-5xl font-black">
            Personnalise ton profil
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Achète des cadres, bannières, titres et effets
            pour rendre ton profil unique.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-black/20 px-6 py-5 backdrop-blur">
          <Coins className="h-8 w-8 text-yellow-300" />

          <div>
            <p className="text-sm text-white/70">
              Solde
            </p>

            <p className="text-3xl font-black">
              {coins.toLocaleString("fr-FR")} 🪙
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}