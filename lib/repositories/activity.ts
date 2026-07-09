import { supabaseAdmin } from "../supabase/server";

export class ActivityRepository {
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
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data;
  }

  static async create(
    profileId: string,
    type: string,
    message: string
  ) {
    const { error } = await supabaseAdmin
      .from("activity")
      .insert({
        profile_id: profileId,
        type,
        message,
      });

    if (error) throw error;
  }
}