"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  joinGameAction,
  leaveGameAction,
} from "@/app/games/actions";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

type Props = {
  game: {
    id: string;
    name: string;
    image: string | null;
    description: string | null;
    players: number;
  };

  joined: boolean;
};

export default function GameCard({
  game,
  joined,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  function join() {
    startTransition(async () => {
      try {
        await joinGameAction(game.id);

        toast.success(
          "Tu as rejoint le jeu 🎮"
        );

        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur"
        );
      }
    });
  }

  function leave() {
    startTransition(async () => {
      try {
        await leaveGameAction(game.id);

        toast.success(
          "Tu as quitté le jeu."
        );

        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erreur"
        );
      }
    });
  }

  return (
    <Card className="overflow-hidden rounded-3xl border border-white/10 bg-card transition hover:scale-[1.02]">

      <div className="relative h-48">

        {game.image ? (
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-7xl">
            🎮
          </div>
        )}

      </div>

      <div className="space-y-5 p-6">

        <div>

          <h2 className="text-2xl font-black">
            {game.name}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {game.description ??
              "Aucune description"}
          </p>

        </div>

        <div className="flex items-center justify-between">

          <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-400">
            👥 {game.players} joueurs
          </span>

          {joined ? (
            <Button
              disabled={pending}
              variant="destructive"
              onClick={leave}
            >
              Quitter
            </Button>
          ) : (
            <Button
              disabled={pending}
              onClick={join}
            >
              Rejoindre
            </Button>
          )}

        </div>

      </div>

    </Card>
  );
}