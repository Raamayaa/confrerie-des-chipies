"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { ProfileService } from "@/lib/services/profile.service";

export async function updateProfileAction(
  values: {
    username?: string;
    avatar?: string;
    bio?: string;
    banner?: string;
  }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Non autorisé.",
    };
  }

  try {
    const profile =
      await ProfileService.updateProfile(
        session.user.id,
        values
      );

    revalidatePath("/profile");
    revalidatePath("/members");

    return {
      success: true,
      data: profile,
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