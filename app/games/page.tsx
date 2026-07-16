import { auth } from "@/auth";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import GameCard from "@/components/games/GameCard";

import { GameService } from "@/lib/services/game.service";

export default async function GamesPage() {
  const session = await auth();

  const games = await GameService.getGames();

  const joinedGames = session?.user?.id
    ? await GameService.getMyGames(session.user.id)
    : [];

  const joinedIds = new Set(
    joinedGames
      .map((game) => game.games?.id)
      .filter(
        (id): id is string => Boolean(id)
      )
  );

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
            <p>
  Rejoins les jeux de la communauté et gagne de l&apos;XP.
</p>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={{
                id: game.id,
                name: game.name,
                image: game.image,
                description: game.description,
                players: game.players,
              }}
              joined={joinedIds.has(game.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
}