import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";
import GameCard from "@/components/home/GameCard";
import { supabase } from "@/lib/supabase";

export default async function GamesPage() {
  const { data: games, error } = await supabase
    .from("games")
    .select("*")
    .order("name");

  if (error) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-8 pt-36">
          <h1 className="text-red-500 text-2xl">
            Erreur : {error.message}
          </h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pt-36 pb-20">
        <div className="mb-12">
          <h1 className="text-6xl font-black">
            🎮 Jeux
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Tous les jeux de la Confrérie.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {games?.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              image={game.image}
              players={0}
            />
          ))}
        </div>
      </main>
    </>
  );
}