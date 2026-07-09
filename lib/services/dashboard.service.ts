import { DashboardRepository } from "../repositories/dashboard";

import type { DashboardData } from "@/types/dashboard";

export class DashboardService {
  static async getDashboard(): Promise<DashboardData> {
    const [
      stats,
      upcomingEvents,
      popularGames,
      recentActivity,
    ] = await Promise.all([
      DashboardRepository.getStats(),
      DashboardRepository.getUpcomingEvents(),
      DashboardRepository.getPopularGames(),
      DashboardRepository.getRecentActivity(),
    ]);

    return {
      stats,
      upcomingEvents,
      popularGames,
      recentActivity,
    };
  }
}