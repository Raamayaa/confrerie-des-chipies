"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { AchievementService } from "@/lib/services/achievement.service";

export async function unlockAchievementAction(
  code: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Non autorisé.",
    };
  }

  try {
    const achievement =
      await AchievementService.unlock(
        session.user.id,
        code
      );

    revalidatePath("/profile");
    revalidatePath("/achievements");

    return {
      success: true,
      data: achievement,
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