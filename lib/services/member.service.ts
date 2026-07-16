import { ProfileService } from "./profile.service";

export class MemberService {
  /**
   * Tous les membres.
   */
  static async getMembers() {
    return ProfileService.getMembers();
  }

  /**
   * Profil d'un membre.
   */
  static async getMember(
    profileId: string
  ) {
    return ProfileService.getProfile(
      profileId
    );
  }

  /**
   * Rang du membre.
   */
  static async getRank(
    profileId: string
  ) {
    return ProfileService.getMemberRank(
      profileId
    );
  }

  /**
   * Progression.
   */
  static async getProgress(
    profileId: string
  ) {
    return ProfileService.getProgress(
      profileId
    );
  }

  /**
   * Jeux du membre.
   */
  static async getGames(
    profileId: string
  ) {
    return ProfileService.getMemberGames(
      profileId
    );
  }

  /**
   * Succès du membre.
   */
  static async getAchievements(
    profileId: string
  ) {
    return ProfileService.getAchievements(
      profileId
    );
  }

  /**
   * Activité récente.
   */
  static async getRecentActivity(
    profileId: string
  ) {
    return ProfileService.getRecentActivity(
      profileId
    );
  }
}