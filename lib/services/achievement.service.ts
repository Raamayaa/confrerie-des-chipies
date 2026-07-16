import { AchievementRepository } from "../repositories/achievement";

import { NotificationService } from "./notification.service";
import { LevelService } from "./level.service";

export {
  type Achievement,
  type ProfileAchievement,
} from "../repositories/achievement";

export class AchievementService {
  /**
   * Débloque un succès.
   */
  static async unlock(
    profileId: string,
    code: string
  ) {
    const achievement =
      await AchievementRepository.findByCode(code);

    if (!achievement) {
      return null;
    }

    const alreadyUnlocked =
      await AchievementRepository.hasAchievement(
        profileId,
        achievement.id
      );

    if (alreadyUnlocked) {
      return null;
    }

    await AchievementRepository.unlock(
      profileId,
      achievement.id
    );

    // Notification
    await NotificationService.create(
      profileId,
      "🏆 Succès débloqué !",
      `Vous avez obtenu : ${achievement.name}`,
      "achievement"
    );

    // Bonus XP (si la colonne existe)
    if ("xp" in achievement && typeof achievement.xp === "number") {
      await LevelService.addXp(
        profileId,
        achievement.xp
      );
    }

    return achievement;
  }

  /**
   * Succès du membre.
   */
  static getProfileAchievements(
    profileId: string
  ) {
    return AchievementRepository.getProfileAchievements(
      profileId
    );
  }

  /**
   * Tous les succès.
   */
  static getAll() {
    return AchievementRepository.getAll();
  }

  /**
   * Tous les succès avec l'état du membre.
   */
  static getAllWithProfile(
    profileId: string
  ) {
    return AchievementRepository.getAllWithProfile(
      profileId
    );
  }
}