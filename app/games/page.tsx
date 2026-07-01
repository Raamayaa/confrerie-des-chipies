import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";
import GameCard from "@/components/home/GameCard";
import { games } from "@/data/games";

export default function GamesPage() {
  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pt-36 pb-20">
        <div className="mb-12">
          <h1 className="text-6xl font-black">
            🎮 Jeux
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            Retrouvez tous les jeux de la communauté et découvrez les plus populaires.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {games.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              image={game.image}
              players={game.players}
            />
          ))}
        </div>
      </main>
    </>
  );
}