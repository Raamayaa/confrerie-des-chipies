"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { GameService } from "@/lib/services/game.service";

export async function joinGameAction(
  gameId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Non autorisé.",
    };
  }

  try {
    await GameService.joinGame(
      session.user.id,
      gameId
    );

    revalidatePath("/games");
    revalidatePath(`/games/${gameId}`);
    revalidatePath("/profile");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur est survenue.",
    };
  }
}

export async function leaveGameAction(
  gameId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Non autorisé.",
    };
  }

  try {
    await GameService.leaveGame(
      session.user.id,
      gameId
    );

    revalidatePath("/games");
    revalidatePath(`/games/${gameId}`);
    revalidatePath("/profile");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur est survenue.",
    };
  }
}