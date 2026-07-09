import Link from "next/link";
import Image from "next/image";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { GameService } from "@/lib/services/game.service";

export default async function GamesPage() {
  const games = await GameService.getGames();

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pb-20 pt-36">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black">
            🎮 Jeux de la communauté
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Retrouvez tous les jeux auxquels joue la communauté et rejoignez vos
            partenaires de jeu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game) => (
            <Card
              key={game.id}
              className="overflow-hidden rounded-3xl border-0 bg-card shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-60">
                <Image
                  src={game.image ?? "/images/default-game.jpg"}
                  alt={game.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <h2 className="text-3xl font-black text-white">
                    {game.name}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <p className="line-clamp-3 text-muted-foreground">
                  {game.description ??
                    "Aucune description disponible pour ce jeu."}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-400">
  🎮 Jeu disponible
</span>

                  <Link href={`/games/${game.id}`}>
                    <Button>Voir</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}