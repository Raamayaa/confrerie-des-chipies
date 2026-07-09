import { supabaseAdmin } from "../supabase/server";

export class GamesRepository {
  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("games")
      .select("*")
      .order("name");

    if (error) throw error;

    return data;
  }

  static async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("games")
      .select(`
        *,
        game_players(
          id,
          profiles(
            id,
            username,
            avatar
          )
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

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

    if (error) throw error;

    return data;
  }

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

    if (error) throw error;

    return data;
  }

  static async getPopularGames() {
    const { data, error } = await supabaseAdmin
      .from("games")
      .select(`
        *,
        game_players(count)
      `);

    if (error) throw error;

    return data;
  }

  // Liste des jeux avec le nombre de participants (Admin)
  static async getAllWithPlayers() {
    const { data, error } = await supabaseAdmin
      .from("games")
      .select(`
        *,
        game_players(count)
      `)
      .order("name");

    if (error) throw error;

    return data;
  }

  // Création d'un jeu
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

    if (error) throw error;

    return data;
  }

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

  if (error) throw error;

  return data;
}

static async delete(id: string) {
  const { error } = await supabaseAdmin
    .from("games")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
}