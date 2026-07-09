import { ProfilesRepository } from "../repositories/profiles";

export class ProfileService {
  static getProfile(id: string) {
    return ProfilesRepository.getProfile(id);
  }

  static getProfileFromDiscord(discordId: string) {
    return ProfilesRepository.getByDiscordId(discordId);
  }

  static getMembers() {
    return ProfilesRepository.getAll();
  }

  static async updateProfile(
  id: string,
  values: {
    username?: string;
    avatar?: string;
    bio?: string;
    banner?: string;
  }
) {
  return ProfilesRepository.update(id, values);
}

  static isAdmin(profileId: string) {
    return ProfilesRepository.isAdmin(profileId);
  }

  static updateRole(
    profileId: string,
    role: "admin" | "member"
  ) {
    return ProfilesRepository.updateRole(profileId, role);
  }

  static getDashboardStats(profileId: string) {
    return ProfilesRepository.getDashboardStats(profileId);
  }

  static getMonthlyActivity(profileId: string) {
    return ProfilesRepository.getMonthlyActivity(profileId);
  }

  static getLeaderboard() {
    return ProfilesRepository.getLeaderboard();
  }

  static getRecentActivity(profileId: string) {
    return ProfilesRepository.getRecentActivity(profileId);
  }

  static getProgress(profileId: string) {
    return ProfilesRepository.getProgress(profileId);
  }

  static getBadges(profileId: string) {
    return ProfilesRepository.getBadges(profileId);
  }

  static getDailyMissions(profileId: string) {
    return ProfilesRepository.getDailyMissions(profileId);
  }

  static getMemberGames(profileId: string) {
  return ProfilesRepository.getMemberGames(profileId);
}

static getMemberRank(profileId: string) {
  return ProfilesRepository.getMemberRank(profileId);
}

static getAchievements(profileId: string) {
  return ProfilesRepository.getAchievements(profileId);
}

static unlockAchievement(
  profileId: string,
  achievementId: string
) {
  return ProfilesRepository.unlockAchievement(
    profileId,
    achievementId
  );
}

static getCoins(profileId: string) {
  return ProfilesRepository.getCoins(profileId);
}

static addCoins(
  profileId: string,
  amount: number
) {
  return ProfilesRepository.addCoins(
    profileId,
    amount
  );
}

}