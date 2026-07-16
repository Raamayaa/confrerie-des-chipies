import { DashboardRepository } from "../repositories/dashboard";

import type { DashboardData } from "@/types/dashboard";

export class DashboardService {
  /**
   * Récupère toutes les données
   * du tableau de bord.
   */
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

  /**
   * Recharge le dashboard.
   * Prévu pour la V2 (cache).
   */
  static async refreshDashboard() {
    return this.getDashboard();
  }
}