import { NotificationsRepository } from "../repositories/notifications";

export class NotificationService {
  static latest(profileId: string) {
    return NotificationsRepository.latest(profileId);
  }

  static unread(profileId: string) {
    return NotificationsRepository.unread(profileId);
  }

  static create(
    profileId: string,
    title: string,
    message: string,
    link?: string
  ) {
    return NotificationsRepository.create(
      profileId,
      title,
      message,
      link
    );
  }

  static read(id: string) {
    return NotificationsRepository.read(id);
  }
}