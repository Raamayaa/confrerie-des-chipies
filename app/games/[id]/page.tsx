import { notFound } from "next/navigation";
import Image from "next/image";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";
import JoinButton from "@/components/games/JoinButton";

import { GameService } from "@/lib/services/game.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type Player = {
  id: string;

  profiles:
    | {
        username: string;
        avatar: string | null;
      }
    | {
        username: string;
        avatar: string | null;
      }[]
    | null;
};

export default async function GamePage({
  params,
}: Props) {
  const { id } = await params;

  const game = await GameService.getGame(id);

  if (!game) {
    notFound();
  }

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-6xl px-8 pb-20 pt-36">
        <div className="overflow-hidden rounded-3xl">
          <Image
            src={
              game.image ??
              "/images/default-game.jpg"
            }
            alt={game.name}
            width={1400}
            height={500}
            className="h-[350px] w-full object-cover"
          />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-black">
              {game.name}
            </h1>

            <p className="mt-3 text-lg text-gray-400">
              {game.game_players.length} joueurs
              participent.
            </p>
          </div>

          <JoinButton gameId={game.id} />
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold">
            👥 Participants
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {game.game_players.map(
              (player: Player) => {
                const profile =
                  Array.isArray(player.profiles)
                    ? player.profiles[0]
                    : player.profiles;

                if (!profile) return null;

                return (
                  <div
                    key={player.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl"
                  >
                    <Image
                      src={
                        profile.avatar ??
                        "https://cdn.discordapp.com/embed/avatars/0.png"
                      }
                      alt={profile.username}
                      width={80}
                      height={80}
                      className="mx-auto rounded-full"
                    />

                    <p className="mt-4 font-semibold">
                      {profile.username}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </main>
    </>
  );
}