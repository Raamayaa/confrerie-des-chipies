import { supabaseAdmin } from "../supabase/server";

export class DailyMissionRepository {
  // ==========================
  // Missions quotidiennes
  // ==========================

  static async getMissions(
    profileId: string
  ) {
    const { data, error } =
      await supabaseAdmin
        .from("profile_daily_missions")
        .select(`
          progress,
          claimed,
          daily_missions(
            id,
            title,
            description,
            xp,
            coins,
            objective,
            type
          )
        `)
        .eq("profile_id", profileId);

    if (error) {
      throw error;
    }

    return (
      data?.map((mission) => ({
        progress: mission.progress,
        claimed: mission.claimed,
        ...(Array.isArray(
          mission.daily_missions
        )
          ? mission.daily_missions[0]
          : mission.daily_missions),
      })) ?? []
    );
  }
}