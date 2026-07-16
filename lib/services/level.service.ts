import { supabaseAdmin } from "@/lib/supabase/server";

import { NotificationService } from "./notification.service";

const LEVEL_REWARD = 500;

export class LevelService {
  /**
   * XP nécessaire pour atteindre un niveau.
   * Formule : niveau² × 100
   */
  static xpForLevel(level: number) {
    return level * level * 100;
  }

  /**
   * Calcule le niveau à partir de l'XP.
   */
  static levelFromXp(xp: number) {
    let level = 1;

    while (xp >= this.xpForLevel(level + 1)) {
      level++;
    }

    return level;
  }

  /**
   * Ajoute de l'XP,
   * met à jour le niveau,
   * attribue les récompenses
   * et envoie les notifications.
   */
  static async addXp(
    profileId: string,
    amount: number
  ) {
    if (amount <= 0) {
      throw new Error(
        "Montant d'XP invalide."
      );
    }

    const { data: profile, error } =
      await supabaseAdmin
        .from("profiles")
        .select("xp, level, coins")
        .eq("id", profileId)
        .single();

    if (error || !profile) {
      throw (
        error ??
        new Error("Profil introuvable")
      );
    }

    const oldLevel = profile.level ?? 1;

    const newXp =
      (profile.xp ?? 0) + amount;

    const newLevel =
      this.levelFromXp(newXp);

    const update = {
      xp: newXp,
      level: newLevel,
      coins: profile.coins ?? 0,
    };

    // Bonus lors d'une montée de niveau
    if (newLevel > oldLevel) {
      update.coins +=
        (newLevel - oldLevel) *
        LEVEL_REWARD;
    }

    const { error: updateError } =
      await supabaseAdmin
        .from("profiles")
        .update(update)
        .eq("id", profileId);

    if (updateError) {
      throw updateError;
    }

    // Notification uniquement lors d'une montée de niveau
    if (newLevel > oldLevel) {
      await NotificationService.create(
        profileId,
        "🎉 Niveau supérieur !",
        `Bravo ! Vous êtes maintenant niveau ${newLevel}.`,
        "level"
      );

      // À ajouter plus tard :
      //
      // await AchievementService.checkLevelAchievements(
      //   profileId,
      //   newLevel
      // );
      //
      // await DailyMissionService.progress(
      //   profileId,
      //   "gain_xp",
      //   amount
      // );
    }

    return {
      xp: newXp,
      level: newLevel,
      coins: update.coins,
    };
  }
}