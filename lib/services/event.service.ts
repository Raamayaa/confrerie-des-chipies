import { EventsRepository } from "../repositories/events";

export class EventService {
  static getEvents() {
    return EventsRepository.getAll();
  }

  static getEvent(id: string) {
    return EventsRepository.getById(id);
  }

  static createEvent(values: {
    title: string;
    description?: string;
    event_date: string;
    discord_link?: string;
    game_id: string;
  }) {
    return EventsRepository.create(values);
  }

  static updateEvent(
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

  static deleteEvent(id: string) {
    return EventsRepository.delete(id);
  }
}