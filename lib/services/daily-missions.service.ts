import { DailyMissionRepository } from "../repositories/daily-missions";

export class DailyMissionService {
  static getMissions(profileId: string) {
    return DailyMissionRepository.getMissions(profileId);
  }
}