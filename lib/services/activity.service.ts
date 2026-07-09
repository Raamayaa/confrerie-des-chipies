import { ActivityRepository } from "../repositories/activity";

export class ActivityService {
  static async latest() {
    return ActivityRepository.getLatest();
  }

  static async create(
    profileId: string,
    type: string,
    message: string
  ) {
    return ActivityRepository.create(
      profileId,
      type,
      message
    );
  }
}