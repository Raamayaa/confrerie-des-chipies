import { NotificationRepository } from "../repositories/notification";

export type NotificationType =
  | "level"
  | "achievement"
  | "game"
  | "event"
  | "shop"
  | "idea"
  | "system";

export class NotificationService {
  /**
   * Crée une notification.
   */
  static async create(
    profileId: string,
    title: string,
    message: string,
    type: NotificationType = "system"
  ) {
    return NotificationRepository.create(
      profileId,
      title,
      message,
      type
    );
  }

  /**
   * Récupère les notifications d'un membre.
   */
  static async getByProfile(
    profileId: string
  ) {
    return NotificationRepository.getByProfile(
      profileId
    );
  }

  /**
   * Marque toutes les notifications comme lues.
   */
  static async markAllAsRead(
    profileId: string
  ) {
    return NotificationRepository.markAllAsRead(
      profileId
    );
  }
}