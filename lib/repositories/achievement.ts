import { supabaseAdmin } from "../supabase/server";

export type Achievement = {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  rarity: string;
  xp: number;
};

export type ProfileAchievement = {
  unlocked_at: string | null;
  achievements: Achievement | Achievement[] | null;
};

export class AchievementRepository {
  // ==========================
  // Tous les succès
  // ==========================

  static async getAll(): Promise<Achievement[]> {
    const { data, error } = await supabaseAdmin
      .from("achievements")
      .select("*")
      .order("xp");

    if (error) {
      throw error;
    }

    return (data ?? []) as Achievement[];
  }

  // ==========================
  // Succès d'un membre
  // ==========================

  static async getProfileAchievements(
    profileId: string
  ): Promise<ProfileAchievement[]> {
    const { data, error } = await supabaseAdmin
      .from("profile_achievements")
      .select(`
        unlocked_at,
        achievements(*)
      `)
      .eq("profile_id", profileId);

    if (error) {
      throw error;
    }

    return (data ?? []) as ProfileAchievement[];
  }

  // ==========================
  // Vérifie si débloqué
  // ==========================

  static async hasAchievement(
    profileId: string,
    achievementId: string
  ) {
    const { data } = await supabaseAdmin
      .from("profile_achievements")
      .select("id")
      .eq("profile_id", profileId)
      .eq("achievement_id", achievementId)
      .maybeSingle();

    return !!data;
  }

  // ==========================
  // Débloquer
  // ==========================

  static async unlock(
    profileId: string,
    achievementId: string
  ) {
    // Protection supplémentaire
    if (
      await this.hasAchievement(
        profileId,
        achievementId
      )
    ) {
      return {
        success: false,
        reason: "already_unlocked",
      };
    }

    const { error } = await supabaseAdmin
      .from("profile_achievements")
      .insert({
        profile_id: profileId,
        achievement_id: achievementId,
      } as never);

    if (error) {
      throw error;
    }

    return {
      success: true,
    };
  }

  // ==========================
  // Recherche par code
  // ==========================

  static async findByCode(code: string) {
    const { data, error } = await supabaseAdmin
      .from("achievements")
      .select("*")
      .eq("name", code)
      .single();

    if (error) {
      return null;
    }

    return data as Achievement;
  }

  // ==========================
  // Tous les succès + état du membre
  // ==========================

  static async getAllWithProfile(
    profileId: string
  ) {
    const { data, error } = await supabaseAdmin
      .from("achievements")
      .select(`
        *,
        profile_achievements(
          unlocked_at,
          profile_id
        )
      `);

    if (error) {
      throw error;
    }

    return (
      data?.map((achievement) => ({
        ...achievement,
        unlocked:
          achievement.profile_achievements.some(
            (p) =>
              p.profile_id === profileId
          ),
      })) ?? []
    );
  }
}