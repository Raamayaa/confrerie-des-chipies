import { supabaseAdmin } from "../supabase/server";

export class StorageService {
  /**
   * Upload d'une image de profil.
   */
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

  /**
   * Upload d'une bannière.
   */
  static async uploadBanner(
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

  /**
   * Supprime un fichier.
   */
  static async deleteFile(path: string) {
    const { error } = await supabaseAdmin.storage
      .from("profiles")
      .remove([path]);

    if (error) {
      throw error;
    }
  }
}