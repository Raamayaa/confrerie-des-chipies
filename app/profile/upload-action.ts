"use server";

import { supabaseAdmin } from "@/lib/supabase/server";

export async function uploadImageAction(
  formData: FormData
) {
  const file = formData.get("file") as File;

  const folder = formData.get(
    "folder"
  ) as "avatars" | "banners";

  if (!file) {
    throw new Error("Aucun fichier.");
  }

  const extension =
    file.name.split(".").pop() ?? "png";

  const fileName =
    crypto.randomUUID() + "." + extension;

  const path = `${folder}/${fileName}`;

  const { error } =
    await supabaseAdmin.storage
      .from("profiles")
      .upload(path, file, {
        upsert: true,
      });

  if (error) {
    throw new Error(error.message);
  }

  return supabaseAdmin.storage
    .from("profiles")
    .getPublicUrl(path).data.publicUrl;
}