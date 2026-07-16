"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  joinGameAction,
  leaveGameAction,
} from "@/lib/actions/games";

type Props = {
  gameId: string;
  joined: boolean;
};

export default function JoinButton({
  gameId,
  joined,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = joined
        ? await leaveGameAction(gameId)
        : await joinGameAction(gameId);

      if (!result.success) {
        alert(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={
        joined
          ? "bg-green-600 text-white hover:bg-red-600"
          : ""
      }
    >
      {isPending
        ? "⏳ Chargement..."
        : joined
        ? "🚪 Quitter le jeu"
        : "🎮 Je joue"}
    </Button>
  );
}