import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import EmptyState from "@/components/shared/EmptyState";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Game = {
  id: string;
  name: string;
  image: string;
};

type Participation = {
  games: Game | Game[] | null;
};

export default async function MyGames() {
  const session = await auth();

  const { data } = await supabase
    .from("game_players")
    .select(`
      games(
        id,
        name,
        image
      )
    `)
    .eq("discord_id", session?.user?.id);

  const participations = (data as Participation[]) ?? [];

  return (
    <Card className="p-8">
      <h2 className="mb-6 text-3xl font-bold">
        🎮 Mes jeux
      </h2>

      {participations.length === 0 ? (
        <EmptyState text="Tu ne participes encore à aucun jeu." />
      ) : (
        <div className="space-y-4">
          {participations.map((item, index) => {
            const game = Array.isArray(item.games)
              ? item.games[0]
              : item.games;

            if (!game) return null;

            return (
              <Link
                key={game.id ?? index}
                href={`/games/${game.id}`}
                className="flex items-center gap-4 rounded-2xl bg-white/5 p-3 transition hover:bg-violet-600/20"
              >
                <Image
                  src={game.image}
                  alt={game.name}
                  width={60}
                  height={60}
                  className="rounded-xl object-cover"
                />

                <div>
                  <h3 className="text-lg font-bold">
                    {game.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Voir la page du jeu
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Card>
  );
}