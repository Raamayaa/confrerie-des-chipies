import { GamesRepository } from "../repositories/games";

export class GameService {
  static async getGames() {
    return GamesRepository.getAll();
  }

  static async getGame(id: string) {
    return GamesRepository.getById(id);
  }

  static async getPlayers(gameId: string) {
    return GamesRepository.getPlayers(gameId);
  }

  static async getMyGames(profileId: string) {
    return GamesRepository.getGamesByProfile(profileId);
  }

  static async getPopularGames() {
    return GamesRepository.getPopularGames();
  }

  static async getAdminGames() {
    return GamesRepository.getAllWithPlayers();
  }

  static async createGame(values: {
  name: string;
  image: string;
  description?: string;
}) {
  return GamesRepository.create(values);
}

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

static async deleteGame(id: string) {
  return GamesRepository.delete(id);
}
}