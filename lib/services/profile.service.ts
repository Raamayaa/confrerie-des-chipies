import { ProfilesRepository } from "../repositories/profiles";

export class ProfileService {
  /**
   * Profil d'un membre.
   */
  static async getProfile(id: string) {
    return ProfilesRepository.getProfile(id);
  }

  /**
   * Profil depuis l'identifiant Discord.
   */
  static async getProfileFromDiscord(
    discordId: string
  ) {
    return ProfilesRepository.getByDiscordId(
      discordId
    );
  }

  /**
   * Tous les membres.
   */
  static async getMembers() {
    return ProfilesRepository.getAll();
  }

  /**
   * Mise à jour du profil.
   */
  static async updateProfile(
    id: string,
    values: {
      username?: string;
      avatar?: string;
      bio?: string;
      banner?: string;
    }
  ) {
    return ProfilesRepository.update(
      id,
      values
    );
  }

  /**
   * Vérifie si le membre est administrateur.
   */
  static async isAdmin(
    profileId: string
  ) {
    return ProfilesRepository.isAdmin(
      profileId
    );
  }

  /**
   * Change le rôle d'un membre.
   */
  static async updateRole(
    profileId: string,
    role: "admin" | "member"
  ) {
    return ProfilesRepository.updateRole(
      profileId,
      role
    );
  }

  /**
   * Statistiques du tableau de bord.
   */
  static async getDashboardStats(
    profileId: string
  ) {
    return ProfilesRepository.getDashboardStats(
      profileId
    );
  }

  /**
   * Activité mensuelle.
   */
  static async getMonthlyActivity(
    profileId: string
  ) {
    return ProfilesRepository.getMonthlyActivity(
      profileId
    );
  }

  /**
   * Classement général.
   */
  static async getLeaderboard() {
    return ProfilesRepository.getLeaderboard();
  }

  /**
   * Activité récente.
   */
  static async getRecentActivity(
    profileId: string
  ) {
    return ProfilesRepository.getRecentActivity(
      profileId
    );
  }

  /**
   * Progression.
   */
  static async getProgress(
    profileId: string
  ) {
    return ProfilesRepository.getProgress(
      profileId
    );
  }

  /**
   * Badges.
   */
  static async getBadges(
    profileId: string
  ) {
    return ProfilesRepository.getBadges(
      profileId
    );
  }

  /**
   * Missions quotidiennes.
   */
  static async getDailyMissions(
    profileId: string
  ) {
    return ProfilesRepository.getDailyMissions(
      profileId
    );
  }

  /**
   * Jeux du membre.
   */
  static async getMemberGames(
    profileId: string
  ) {
    return ProfilesRepository.getMemberGames(
      profileId
    );
  }

  /**
   * Rang du membre.
   */
  static async getMemberRank(
    profileId: string
  ) {
    return ProfilesRepository.getMemberRank(
      profileId
    );
  }

  /**
   * Succès du membre.
   */
  static async getAchievements(
    profileId: string
  ) {
    return ProfilesRepository.getAchievements(
      profileId
    );
  }

  /**
   * Débloque un succès.
   */
  static async unlockAchievement(
    profileId: string,
    achievementId: string
  ) {
    return ProfilesRepository.unlockAchievement(
      profileId,
      achievementId
    );
  }

  /**
   * Nombre de pièces.
   */
  static async getCoins(
    profileId: string
  ) {
    return ProfilesRepository.getCoins(
      profileId
    );
  }

  /**
   * Ajoute des pièces.
   */
  static async addCoins(
    profileId: string,
    amount: number
  ) {
    if (amount <= 0) {
      throw new Error(
        "Montant invalide."
      );
    }

    return ProfilesRepository.addCoins(
      profileId,
      amount
    );
  }
}