"use server";

import { auth } from "@/auth";

import { GameService } from "@/lib/services/game.service";

export async function joinGameAction(
  gameId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await GameService.joinGame(
    session.user.id,
    gameId
  );

  return {
    success: true,
  };
}

export async function leaveGameAction(
  gameId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await GameService.leaveGame(
    session.user.id,
    gameId
  );

  return {
    success: true,
  };
}