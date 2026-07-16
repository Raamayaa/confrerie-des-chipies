import { supabaseAdmin } from "../supabase/server";

export class ActivityRepository {
  // ==========================
  // Dernières activités
  // ==========================

  static async getLatest(limit = 15) {
    const { data, error } = await supabaseAdmin
      .from("activity")
      .select(`
        *,
        profiles(
          username,
          avatar
        )
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(limit);

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  // ==========================
  // Créer une activité
  // ==========================

  static async create(
    profileId: string,
    type: string,
    message: string
  ) {
    if (!message.trim()) {
      throw new Error(
        "Le message est vide."
      );
    }

    const { error } = await supabaseAdmin
      .from("activity")
      .insert({
        profile_id: profileId,
        type,
        message,
      } as never);

    if (error) {
      throw error;
    }

    return {
      success: true,
    };
  }
}