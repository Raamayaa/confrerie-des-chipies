import { supabaseAdmin } from "../supabase/server";

export class EventsRepository {
  // ==========================
  // Tous les événements
  // ==========================

  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("events")
      .select(`
        *,
        game:games(
          id,
          name,
          image
        ),
        participants(
          profile_id
        )
      `)
      .order("event_date");

    if (error) {
      throw error;
    }

    return (
      data?.map((event) => ({
        ...event,
        participantsCount:
          event.participants?.length ?? 0,
      })) ?? []
    );
  }

  // ==========================
  // Événement
  // ==========================

  static async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("events")
      .select(`
        *,
        game:games(
          id,
          name,
          image
        ),
        participants(
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
      participantsCount:
        data.participants?.length ?? 0,
    };
  }

  // ==========================
  // Création
  // ==========================

  static async create(values: {
    title: string;
    description?: string;
    event_date: string;
    discord_link?: string;
    game_id: string;
  }) {
    const { data, error } =
      await supabaseAdmin
        .from("events")
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
      title: string;
      description?: string;
      event_date: string;
      discord_link?: string;
      game_id: string;
    }
  ) {
    const { data, error } =
      await supabaseAdmin
        .from("events")
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
  const { data } = await supabaseAdmin
    .from("participants")
    .select("id")
    .eq("event_id", id);

  if ((data?.length ?? 0) > 0) {
    throw new Error(
      "Impossible de supprimer un événement avec des participants."
    );
  }

  const { error } = await supabaseAdmin
    .from("events")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

  // ==========================
  // Rejoindre
  // ==========================

  static async joinEvent(
    profileId: string,
    eventId: string
  ) {
    const { data: existing } =
      await supabaseAdmin
        .from("participants")
        .select("id")
        .eq("profile_id", profileId)
        .eq("event_id", eventId)
        .maybeSingle();

    if (existing) {
      throw new Error(
        "Vous participez déjà."
      );
    }

    const { error } =
      await supabaseAdmin
        .from("participants")
        .insert({
          profile_id: profileId,
          event_id: eventId,
        } as never);

    if (error) {
      throw error;
    }
  }

  // ==========================
  // Quitter
  // ==========================

  static async leaveEvent(
    profileId: string,
    eventId: string
  ) {
    const { error } =
      await supabaseAdmin
        .from("participants")
        .delete()
        .eq("profile_id", profileId)
        .eq("event_id", eventId);

    if (error) {
      throw error;
    }
  }

  // ==========================
  // Vérifie la participation
  // ==========================

  static async isJoined(
    profileId: string,
    eventId: string
  ) {
    const { data } =
      await supabaseAdmin
        .from("participants")
        .select("id")
        .eq("profile_id", profileId)
        .eq("event_id", eventId)
        .maybeSingle();

    return !!data;
  }
}