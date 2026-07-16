import { GamesRepository } from "../repositories/games";

import { LevelService } from "./level.service";
import { NotificationService } from "./notification.service";
import { AchievementService } from "./achievement.service";
import { ActivityService } from "./activity.service";

export class GameService {
  /**
   * Tous les jeux.
   */
  static async getGames() {
    return GamesRepository.getAll();
  }

  /**
   * Jeu par ID.
   */
  static async getGame(id: string) {
    return GamesRepository.getById(id);
  }

  /**
   * Participants d'un jeu.
   */
  static async getPlayers(gameId: string) {
    return GamesRepository.getPlayers(gameId);
  }

  /**
   * Jeux d'un membre.
   */
  static async getMyGames(profileId: string) {
    return GamesRepository.getGamesByProfile(profileId);
  }

  /**
   * Jeux populaires.
   */
  static async getPopularGames() {
    return GamesRepository.getPopularGames();
  }

  /**
   * Jeux (Admin).
   */
  static async getAdminGames() {
    return GamesRepository.getAllWithPlayers();
  }

  /**
   * Création d'un jeu.
   */
  static async createGame(values: {
    name: string;
    image: string;
    description?: string;
  }) {
    return GamesRepository.create(values);
  }

  /**
   * Modification d'un jeu.
   */
  static async updateGame(
    id: string,
    values: {
      name: string;
      image: string;
      description?: string;
    }
  ) {
    return GamesRepository.update(id, values);
  }

  /**
   * Suppression d'un jeu.
   */
  static async deleteGame(id: string) {
    return GamesRepository.delete(id);
  }

  /**
   * Rejoindre un jeu.
   */
  static async joinGame(
    profileId: string,
    gameId: string
  ) {
    await GamesRepository.joinGame(
      profileId,
      gameId
    );

    // +25 XP
    await LevelService.addXp(
      profileId,
      25
    );

    // Notification
    await NotificationService.create(
      profileId,
      "🎮 Nouveau jeu",
      "Vous avez rejoint un nouveau jeu.",
      "game"
    );

    // Activité
    await ActivityService.create(
      profileId,
      "game",
      "A rejoint un nouveau jeu."
    );

    // Succès
    await AchievementService.unlock(
      profileId,
      "FIRST_GAME"
    );
  }

  /**
   * Quitter un jeu.
   */
  static async leaveGame(
    profileId: string,
    gameId: string
  ) {
    await GamesRepository.leaveGame(
      profileId,
      gameId
    );

    await ActivityService.create(
      profileId,
      "game",
      "A quitté un jeu."
    );
  }

  /**
   * Vérifie si le membre participe.
   */
  static async isJoined(
    profileId: string,
    gameId: string
  ) {
    return GamesRepository.isJoined(
      profileId,
      gameId
    );
  }
}