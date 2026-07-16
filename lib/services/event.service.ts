import { EventsRepository } from "../repositories/events";

import { LevelService } from "./level.service";
import { NotificationService } from "./notification.service";
import { ActivityService } from "./activity.service";
import { AchievementService } from "./achievement.service";

export class EventService {
  /**
   * Tous les événements.
   */
  static async getEvents() {
    return EventsRepository.getAll();
  }

  /**
   * Événement par ID.
   */
  static async getEvent(id: string) {
    return EventsRepository.getById(id);
  }

  /**
   * Création.
   */
  static async createEvent(values: {
    title: string;
    description?: string;
    event_date: string;
    discord_link?: string;
    game_id: string;
  }) {
    return EventsRepository.create(values);
  }

  /**
   * Modification.
   */
  static async updateEvent(
    id: string,
    values: {
      title: string;
      description?: string;
      event_date: string;
      discord_link?: string;
      game_id: string;
    }
  ) {
    return EventsRepository.update(id, values);
  }

  /**
   * Suppression.
   */
  static async deleteEvent(id: string) {
    return EventsRepository.delete(id);
  }

  /**
   * Participer.
   */
  static async joinEvent(
    profileId: string,
    eventId: string
  ) {
    await EventsRepository.joinEvent(
      profileId,
      eventId
    );

    await LevelService.addXp(
      profileId,
      50
    );

    await NotificationService.create(
      profileId,
      "📅 Événement rejoint",
      "Vous participez à un événement.",
      "event"
    );

    await ActivityService.create(
      profileId,
      "event",
      "A rejoint un événement."
    );

    await AchievementService.unlock(
      profileId,
      "FIRST_EVENT"
    );
  }

  /**
   * Quitter.
   */
  static async leaveEvent(
    profileId: string,
    eventId: string
  ) {
    await EventsRepository.leaveEvent(
      profileId,
      eventId
    );

    await ActivityService.create(
      profileId,
      "event",
      "A quitté un événement."
    );
  }

  /**
   * Vérifie la participation.
   */
  static async isJoined(
    profileId: string,
    eventId: string
  ) {
    return EventsRepository.isJoined(
      profileId,
      eventId
    );
  }

}