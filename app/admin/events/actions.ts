"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { EventService } from "@/lib/services/event.service";

function getEventValues(formData: FormData) {
  return {
    title: formData.get("title")?.toString().trim() ?? "",
    description: formData.get("description")?.toString().trim() ?? "",
    event_date: formData.get("event_date")?.toString().trim() ?? "",
    discord_link: formData.get("discord_link")?.toString().trim() ?? "",
    game_id: formData.get("game_id")?.toString().trim() ?? "",
  };
}

export async function createEvent(formData: FormData) {
  const values = getEventValues(formData);

  if (!values.title) {
    throw new Error("Le titre est obligatoire.");
  }

  if (!values.event_date) {
    throw new Error("La date est obligatoire.");
  }

  if (!values.game_id) {
    throw new Error("Le jeu est obligatoire.");
  }

  await EventService.createEvent(values);

  revalidatePath("/admin/events");

  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  formData: FormData
) {
  const values = getEventValues(formData);

  if (!values.title) {
    throw new Error("Le titre est obligatoire.");
  }

  if (!values.event_date) {
    throw new Error("La date est obligatoire.");
  }

  if (!values.game_id) {
    throw new Error("Le jeu est obligatoire.");
  }

  await EventService.updateEvent(id, values);

  revalidatePath("/admin/events");
  revalidatePath(`/events/${id}`);

  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await EventService.deleteEvent(id);

  revalidatePath("/admin/events");

  redirect("/admin/events");
}