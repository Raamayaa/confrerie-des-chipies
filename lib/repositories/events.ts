import { supabaseAdmin } from "../supabase/server";

export class EventsRepository {
  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("events")
      .select(`
        *,
        game:games(
          id,
          name,
          image
        )
      `)
      .order("event_date");

    if (error) throw error;

    return data;
  }

  static async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("events")
      .select(`
        *,
        game:games(
          id,
          name,
          image
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  static async create(values: {
    title: string;
    description?: string;
    event_date: string;
    discord_link?: string;
    game_id: string;
  }) {
    const { data, error } = await supabaseAdmin
      .from("events")
      .insert(values)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  static async update(
    id: string,
    values: {
      title: string;
      description?: string;
      event_date: string;
      discord_link?: string;
      game_id: string;
    }
  ) {
    const { data, error } = await supabaseAdmin
      .from("events")
      .update(values)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  static async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("events")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}