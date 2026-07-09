import { supabaseAdmin } from "../supabase/server";

export class NotificationsRepository {
  static async latest(profileId: string) {
    const { data, error } = await supabaseAdmin
      .from("notifications")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    return data;
  }

  static async unread(profileId: string) {
    const { count, error } = await supabaseAdmin
      .from("notifications")
      .select("*", {
        head: true,
        count: "exact",
      })
      .eq("profile_id", profileId)
      .eq("is_read", false);

    if (error) throw error;

    return count ?? 0;
  }

  static async create(
    profileId: string,
    title: string,
    message: string,
    link?: string
  ) {
    const { error } = await supabaseAdmin
      .from("notifications")
      .insert({
        profile_id: profileId,
        title,
        message,
        link,
      });

    if (error) throw error;
  }

  static async read(id: string) {
    await supabaseAdmin
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", id);
  }
}