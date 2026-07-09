import Image from "next/image";
import Link from "next/link";

import { Gamepad2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

type Props = {
  profileId: string;
};

export default async function MemberGames({
  profileId,
}: Props) {
  const games = (await ProfileService.getMemberGames(
    profileId
  )) as {
    id: string;
    name: string;
    image: string;
  }[];

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <Gamepad2 className="h-8 w-8 text-violet-500" />

        <h2 className="text-3xl font-black">
          Jeux favoris
        </h2>
      </div>

      {games.length === 0 ? (
        <Card className="rounded-3xl p-12 text-center">
          <Gamepad2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h3 className="text-xl font-bold">
            Aucun jeu
          </h3>

          <p className="mt-2 text-muted-foreground">
            Ce membre n&apos;a ajouté aucun jeu.
          </p>
        </Card>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="group"
            >
              <Card className="overflow-hidden rounded-3xl border-0 bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl font-black text-white">
                      {game.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-muted-foreground">
                    Jeu disponible dans la communauté.
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="rounded-full bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-400">
                      Voir le jeu
                    </span>

                    <Gamepad2 className="h-5 w-5 text-violet-500 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}