import { supabaseAdmin } from "../supabase/server";

export class GamesRepository {
  // ==========================
  // Tous les jeux
  // ==========================

  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("games")
      .select(`
        *,
        game_players(
          profile_id
        )
      `)
      .order("name");

    if (error) {
      throw error;
    }

    return (
      data?.map((game) => ({
        ...game,
        players: game.game_players?.length ?? 0,
      })) ?? []
    );
  }

  // ==========================
  // Jeu par ID
  // ==========================

  static async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("games")
      .select(`
        *,
        game_players(
          profile_id,
          profiles(
            id,
            username,
            avatar
          )
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return {
      ...data,
      players: data.game_players?.length ?? 0,
    };
  }

  // ==========================
  // Participants
  // ==========================

  static async getPlayers(gameId: string) {
    const { data, error } = await supabaseAdmin
      .from("game_players")
      .select(`
        profiles(
          id,
          username,
          avatar
        )
      `)
      .eq("game_id", gameId);

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  // ==========================
  // Jeux du membre
  // ==========================

  static async getGamesByProfile(profileId: string) {
    const { data, error } = await supabaseAdmin
      .from("game_players")
      .select(`
        games(
          id,
          name,
          image
        )
      `)
      .eq("profile_id", profileId);

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  // ==========================
  // Jeux populaires
  // ==========================

  static async getPopularGames() {
    const games = await this.getAll();

    return games.sort(
      (a, b) => b.players - a.players
    );
  }

  // ==========================
  // Admin
  // ==========================

  static async getAllWithPlayers() {
    return this.getAll();
  }

  // ==========================
  // Création
  // ==========================

  static async create(values: {
    name: string;
    image: string;
    description?: string;
  }) {
    const { data, error } = await supabaseAdmin
      .from("games")
      .insert(values)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // ==========================
  // Modification
  // ==========================

  static async update(
    id: string,
    values: {
      name: string;
      image: string;
      description?: string;
    }
  ) {
    const { data, error } = await supabaseAdmin
      .from("games")
      .update(values)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // ==========================
  // Suppression
  // ==========================

  static async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("games")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  }

  // ==========================
  // Rejoindre un jeu
  // ==========================

  static async joinGame(
    profileId: string,
    gameId: string
  ) {
    const { data: existing } = await supabaseAdmin
      .from("game_players")
      .select("id")
      .eq("profile_id", profileId)
      .eq("game_id", gameId)
      .maybeSingle();

    if (existing) {
      throw new Error(
        "Vous participez déjà à ce jeu."
      );
    }

    const { error } = await supabaseAdmin
  .from("game_players")
  .insert({
    profile_id: profileId,
    game_id: gameId,
  } as never);

    if (error) {
      throw error;
    }
  }

  // ==========================
  // Quitter un jeu
  // ==========================

  static async leaveGame(
    profileId: string,
    gameId: string
  ) {
    const { error } = await supabaseAdmin
      .from("game_players")
      .delete()
      .eq("profile_id", profileId)
      .eq("game_id", gameId);

    if (error) {
      throw error;
    }
  }

  // ==========================
  // Vérifie la participation
  // ==========================

  static async isJoined(
    profileId: string,
    gameId: string
  ) {
    const { data } = await supabaseAdmin
      .from("game_players")
      .select("id")
      .eq("profile_id", profileId)
      .eq("game_id", gameId)
      .maybeSingle();

    return !!data;
  }
}