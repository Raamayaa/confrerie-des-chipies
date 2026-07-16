"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { EventService } from "@/lib/services/event.service";

export async function joinEventAction(
  eventId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Non autorisé.",
    };
  }

  try {
    await EventService.joinEvent(
      session.user.id,
      eventId
    );

    revalidatePath("/events");
    revalidatePath(`/events/${eventId}`);
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

export async function leaveEventAction(
  eventId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Non autorisé.",
    };
  }

  try {
    await EventService.leaveEvent(
      session.user.id,
      eventId
    );

    revalidatePath("/events");
    revalidatePath(`/events/${eventId}`);
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