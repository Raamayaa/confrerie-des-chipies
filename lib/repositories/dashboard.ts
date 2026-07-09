import { supabaseAdmin } from "../supabase/server";

type EventRow = {
  id: string;
  title: string;
  event_date: string;
  game:
    | {
        name: string;
      }[]
    | null;
};

type GameRow = {
  id: string;
  name: string;
  image: string | null;
  game_players:
    | {
        count: number;
      }[]
    | null;
};

type ActivityRow = {
  id: string;
  action: string;
  created_at: string | null;
  profiles:
    | {
        username: string;
        avatar: string | null;
      }[]
    | null;
};

export class DashboardRepository {
  static async getStats() {
    const [games, events, profiles, ideas] = await Promise.all([
      supabaseAdmin
        .from("games")
        .select("*", { count: "exact", head: true }),

      supabaseAdmin
        .from("events")
        .select("*", { count: "exact", head: true }),

      supabaseAdmin
        .from("profiles")
        .select("*", { count: "exact", head: true }),

      supabaseAdmin
        .from("ideas")
        .select("*", { count: "exact", head: true }),
    ]);

    return {
      games: games.count ?? 0,
      events: events.count ?? 0,
      members: profiles.count ?? 0,
      ideas: ideas.count ?? 0,
    };
  }

  static async getUpcomingEvents() {
    const { data, error } = await supabaseAdmin
      .from("events")
      .select(`
        id,
        title,
        event_date,
        game:games(name)
      `)
      .gte("event_date", new Date().toISOString())
      .order("event_date")
      .limit(5);

    if (error) {
      throw error;
    }

    return (
      (data as unknown as EventRow[] | null)?.map((event) => ({
        id: event.id,
        title: event.title,
        event_date: event.event_date,
        game: event.game?.[0] ?? null,
      })) ?? []
    );
  }

  static async getPopularGames() {
    const { data, error } = await supabaseAdmin
      .from("games")
      .select(`
        id,
        name,
        image,
        game_players(count)
      `)
      .limit(5);

    if (error) {
      throw error;
    }

    return (
      (data as unknown as GameRow[] | null)?.map((game) => ({
        id: game.id,
        name: game.name,
        image: game.image,
        game_players: game.game_players ?? [],
      })) ?? []
    );
  }

  static async getRecentActivity() {
    const { data, error } = await supabaseAdmin
      .from("activity")
      .select(`
        id,
        action,
        created_at,
        profiles(
          username,
          avatar
        )
      `)
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) {
      throw error;
    }

    return (
      (data as unknown as ActivityRow[] | null)?.map((activity) => ({
        id: activity.id,
        action: activity.action,
        created_at: activity.created_at,
        profiles: activity.profiles?.[0] ?? null,
      })) ?? []
    );
  }
}