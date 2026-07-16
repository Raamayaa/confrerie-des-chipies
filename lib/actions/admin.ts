"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { ProfileService } from "@/lib/services/profile.service";

async function checkAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Non autorisé.");
  }

  const isAdmin =
    await ProfileService.isAdmin(
      session.user.id
    );

  if (!isAdmin) {
    throw new Error("Accès refusé.");
  }

  return session.user.id;
}

export async function updateMemberRoleAction(
  profileId: string,
  role: "admin" | "member"
) {
  try {
    await checkAdmin();

    await ProfileService.updateRole(
      profileId,
      role
    );

    revalidatePath("/admin");
    revalidatePath("/members");

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