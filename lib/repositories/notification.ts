import { supabaseAdmin } from "../supabase/server";

export class NotificationRepository {
  // ==========================
  // Créer une notification
  // ==========================

  static async create(
    profileId: string,
    title: string,
    message: string,
    type: string
  ) {
    const { error } = await supabaseAdmin
      .from("notifications")
      .insert({
        profile_id: profileId,
        title,
        message,
        type,
      } as never);

    if (error) {
      throw error;
    }

    return {
      success: true,
    };
  }

  // ==========================
  // Notifications d'un membre
  // ==========================

  static async getByProfile(
    profileId: string
  ) {
    const { data, error } =
      await supabaseAdmin
        .from("notifications")
        .select("*")
        .eq("profile_id", profileId)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  // ==========================
  // Tout marquer comme lu
  // ==========================

  static async markAllAsRead(
    profileId: string
  ) {
    const { error } =
      await supabaseAdmin
        .from("notifications")
        .update({
          is_read: true,
        })
        .eq("profile_id", profileId)
        .eq("is_read", false);

    if (error) {
      throw error;
    }

    return {
      success: true,
    };
  }

  // ==========================
  // Nombre de notifications
  // non lues
  // ==========================

  static async getUnreadCount(
    profileId: string
  ) {
    const { count, error } =
      await supabaseAdmin
        .from("notifications")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("profile_id", profileId)
        .eq("is_read", false);

    if (error) {
      throw error;
    }

    return count ?? 0;
  }
}