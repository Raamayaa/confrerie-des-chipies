"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { NotificationService } from "@/lib/services/notification.service";

export async function markNotificationsAsReadAction() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Non autorisé.",
    };
  }

  try {
    await NotificationService.markAllAsRead(
      session.user.id
    );

    revalidatePath("/notifications");

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