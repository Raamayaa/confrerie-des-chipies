"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { GameService } from "@/lib/services/game.service";

function getGameValues(formData: FormData) {
  return {
    name: formData.get("name")?.toString().trim() ?? "",
    image: formData.get("image")?.toString().trim() ?? "",
    description: formData.get("description")?.toString().trim() ?? "",
  };
}

export async function createGame(formData: FormData) {
  const values = getGameValues(formData);

  if (!values.name) {
    throw new Error("Le nom du jeu est obligatoire.");
  }

  if (!values.image) {
    throw new Error("L'image du jeu est obligatoire.");
  }

  await GameService.createGame(values);

  revalidatePath("/admin/games");
  redirect("/admin/games");
}

export async function updateGame(
  id: string,
  formData: FormData
) {
  const values = getGameValues(formData);

  if (!values.name) {
    throw new Error("Le nom du jeu est obligatoire.");
  }

  if (!values.image) {
    throw new Error("L'image du jeu est obligatoire.");
  }

  await GameService.updateGame(id, values);

  revalidatePath("/admin/games");
  revalidatePath(`/games/${id}`);

  redirect("/admin/games");
}

export async function deleteGame(id: string) {
  await GameService.deleteGame(id);

  revalidatePath("/admin/games");

  redirect("/admin/games");
}