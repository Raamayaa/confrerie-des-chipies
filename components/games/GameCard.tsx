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
    <Card className="group overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-900/80 backdrop-blur-xl shadow-xl shadow-violet-500/10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/20">

      {/* Image */}
      <div className="relative h-52 overflow-hidden">

        {game.image ? (
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-700/40 via-fuchsia-600/20 to-cyan-500/30 text-7xl">
            🎮
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

      </div>

      {/* Contenu */}
      <div className="space-y-6 p-6">

        <div>

          <h2 className="text-2xl font-black text-white">
            {game.name}
          </h2>

          <p className="mt-3 min-h-[48px] text-sm text-gray-400">
            {game.description ??
              "Aucune description"}
          </p>

        </div>

        <div className="flex items-center justify-between">

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300">
            👥 {game.players} joueurs
          </span>

          {joined ? (
            <Button
              disabled={pending}
              onClick={leave}
              className="rounded-xl bg-red-600 text-white hover:bg-red-500"
            >
              {pending ? "..." : "Quitter"}
            </Button>
          ) : (
            <Button
              disabled={pending}
              onClick={join}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90"
            >
              {pending ? "..." : "Rejoindre"}
            </Button>
          )}

        </div>

      </div>

    </Card>
  );
}