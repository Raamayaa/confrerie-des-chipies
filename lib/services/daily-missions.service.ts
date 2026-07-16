import { DailyMissionRepository } from "../repositories/daily-missions";

export class DailyMissionService {
  /**
   * Récupère les missions quotidiennes
   * d'un membre.
   */
  static async getMissions(
    profileId: string
  ) {
    return DailyMissionRepository.getMissions(
      profileId
    );
  }

  /**
   * Progression d'une mission.
   * (À implémenter dans la V2.)
   */
  static async progress(
    profileId: string,
    missionCode: string,
    amount = 1
  ) {
    // TODO :
    // DailyMissionRepository.progress(...)
    return {
      profileId,
      missionCode,
      amount,
    };
  }

  /**
   * Réinitialisation quotidienne.
   * (À implémenter dans la V2.)
   */
  static async resetDailyMissions() {
    // TODO :
    // DailyMissionRepository.reset()
  }
}