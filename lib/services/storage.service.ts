import { supabaseAdmin } from "../supabase/server";

export class StorageService {
  static async uploadProfileImage(
    path: string,
    file: Buffer,
    contentType: string
  ) {
    const { error } = await supabaseAdmin.storage
      .from("profiles")
      .upload(path, file, {
        upsert: true,
        contentType,
      });

    if (error) {
      throw error;
    }

    return supabaseAdmin.storage
      .from("profiles")
      .getPublicUrl(path).data.publicUrl;
  }
}