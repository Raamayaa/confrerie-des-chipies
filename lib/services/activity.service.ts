import { ActivityRepository } from "../repositories/activity";

export type ActivityType =
  | "game"
  | "event"
  | "shop"
  | "achievement"
  | "level"
  | "idea"
  | "system";

export class ActivityService {
  /**
   * Récupère les dernières activités.
   */
  static async latest() {
    return ActivityRepository.getLatest();
  }

  /**
   * Crée une activité.
   */
  static async create(
    profileId: string,
    type: ActivityType,
    message: string
  ) {
    if (!message.trim()) {
      throw new Error(
        "Le message d'activité est vide."
      );
    }

    return ActivityRepository.create(
      profileId,
      type,
      message
    );
  }
}