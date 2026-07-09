import { supabaseAdmin } from "../supabase/server";

export class ProfilesRepository {
  static async getByDiscordId(discordId: string) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("discord_id", discordId)
      .single();

    if (error) throw error;

    return data;
  }

  static async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .order("username");

    if (error) throw error;

    return data;
  }

  static async update(
  id: string,
  values: {
    username?: string;
    avatar?: string;
    bio?: string;
    banner?: string;
  }
) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update(values)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  static async isAdmin(profileId: string) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", profileId)
      .single();

    if (error) throw error;

    return data.role === "admin";
  }

  static async updateRole(
    profileId: string,
    role: "admin" | "member"
  ) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ role })
      .eq("id", profileId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  /**
   * Statistiques du dashboard utilisateur
   */
 static async getDashboardStats(profileId: string) {
  const [games, events, ideas] = await Promise.all([
    supabaseAdmin
      .from("game_players")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("profile_id", profileId),

    supabaseAdmin
      .from("participants")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("profile_id", profileId),

    supabaseAdmin
      .from("ideas")
      .select("votes", {
        count: "exact",
      })
      .eq("profile_id", profileId),
  ]);

  const votes =
    ideas.data?.reduce(
      (total, idea) => total + (idea.votes ?? 0),
      0
    ) ?? 0;

  return {
    games: games.count ?? 0,
    events: events.count ?? 0,
    ideas: ideas.count ?? 0,
    votes,
  };
}

  /**
   * Activité mensuelle
   * TODO : remplacer par une vraie requête SQL
   */
  static async getMonthlyActivity(profileId: string) {
  const { data, error } = await supabaseAdmin
    .from("game_players")
    .select("created_at")
    .eq("profile_id", profileId);

  if (error) {
    throw error;
  }

  const months = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];

  const result = months.map((month) => ({
    month,
    games: 0,
  }));

  for (const game of data ?? []) {
    if (!game.created_at) {
  continue;
}

const monthIndex = new Date(game.created_at).getMonth();
    result[monthIndex].games += 1;
  }

  return result;
}

  static async getLeaderboard() {
  const { data: profiles, error } = await supabaseAdmin
    .from("profiles")
    .select(`
      id,
      username,
      avatar
    `)
    .order("username");

  if (error) {
    throw error;
  }

  const leaderboard = await Promise.all(
    (profiles ?? []).map(async (profile) => {
      const [games, events, ideas] = await Promise.all([
        supabaseAdmin
          .from("game_players")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("profile_id", profile.id),

        supabaseAdmin
          .from("participants")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("profile_id", profile.id),

        supabaseAdmin
          .from("ideas")
          .select("votes")
          .eq("profile_id", profile.id),
      ]);

      const gamesCount = games.count ?? 0;
      const eventsCount = events.count ?? 0;
      const ideasCount = ideas.data?.length ?? 0;

      const votes =
        ideas.data?.reduce(
          (total, idea) => total + (idea.votes ?? 0),
          0
        ) ?? 0;

      const score =
        gamesCount * 10 +
        eventsCount * 20 +
        ideasCount * 5 +
        votes;

      return {
        id: profile.id,
        username: profile.username,
        avatar: profile.avatar,
        games: gamesCount,
        events: eventsCount,
        ideas: ideasCount,
        votes,
        score,
      };
    })
  );

  return leaderboard.sort(
    (a, b) => b.score - a.score
  );
}

static async getRecentActivity(profileId: string) {
  const [gamesResult, eventsResult, ideasResult] = await Promise.all([
    supabaseAdmin
      .from("game_players")
      .select(`
        created_at,
        games(name)
      `)
      .eq("profile_id", profileId),

    supabaseAdmin
      .from("participants")
      .select(`
        created_at,
        events(title)
      `)
      .eq("profile_id", profileId),

    supabaseAdmin
      .from("ideas")
      .select(`
        created_at,
        title
      `)
      .eq("profile_id", profileId),
  ]);

  if (gamesResult.error) throw gamesResult.error;
  if (eventsResult.error) throw eventsResult.error;
  if (ideasResult.error) throw ideasResult.error;

  const activity = [
    ...(gamesResult.data ?? []).map((item) => {
      const game = Array.isArray(item.games)
        ? item.games[0]
        : item.games;

      return {
        type: "game" as const,
        title: game?.name ?? "Jeu",
        created_at: item.created_at,
      };
    }),

    ...(eventsResult.data ?? []).map((item) => {
      const event = Array.isArray(item.events)
        ? item.events[0]
        : item.events;

      return {
        type: "event" as const,
        title: event?.title ?? "Événement",
        created_at: item.created_at,
      };
    }),

    ...(ideasResult.data ?? []).map((item) => ({
      type: "idea" as const,
      title: item.title,
      created_at: item.created_at,
    })),
  ];

  return activity.sort((a, b) => {
  const dateA = a.created_at
    ? new Date(a.created_at).getTime()
    : 0;

  const dateB = b.created_at
    ? new Date(b.created_at).getTime()
    : 0;

  return dateB - dateA;
});
}

static async getProgress(profileId: string) {
  const stats = await this.getDashboardStats(profileId);

  const xp =
    stats.games * 100 +
    stats.events * 200 +
    stats.ideas * 75 +
    stats.votes * 10;

  const level = Math.floor(xp / 500) + 1;

  const currentLevelXp = (level - 1) * 500;
  const nextLevelXp = level * 500;

  return {
    xp,
    level,
    current: xp - currentLevelXp,
    required: nextLevelXp - currentLevelXp,
  };
}

static async getBadges(profileId: string) {
  const stats = await this.getDashboardStats(profileId);

  const badges = [
    {
      id: "first-game",
      name: "Premier jeu",
      icon: "🎮",
      unlocked: stats.games >= 1,
    },
    {
      id: "gamer",
      name: "Gamer",
      icon: "🏆",
      unlocked: stats.games >= 10,
    },
    {
      id: "event-lover",
      name: "Fêtard",
      icon: "📅",
      unlocked: stats.events >= 5,
    },
    {
      id: "inventor",
      name: "Inventeur",
      icon: "💡",
      unlocked: stats.ideas >= 3,
    },
    {
      id: "popular",
      name: "Populaire",
      icon: "❤️",
      unlocked: stats.votes >= 25,
    },
    {
      id: "legend",
      name: "Légende",
      icon: "👑",
      unlocked:
        stats.games >= 25 &&
        stats.events >= 10 &&
        stats.ideas >= 10,
    },
  ];

  return badges;
}

static async getDailyMissions(profileId: string) {
  const stats = await this.getDashboardStats(profileId);

  return [
    {
      id: "join-game",
      title: "Rejoindre un jeu",
      reward: 50,
      completed: stats.games >= 1,
    },
    {
      id: "join-event",
      title: "Participer à un événement",
      reward: 100,
      completed: stats.events >= 1,
    },
    {
      id: "create-idea",
      title: "Proposer une idée",
      reward: 75,
      completed: stats.ideas >= 1,
    },
    {
      id: "receive-vote",
      title: "Recevoir un vote",
      reward: 25,
      completed: stats.votes >= 1,
    },
  ];
}

static async getProfile(id: string) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select(`
      *,
      equipped_frame:inventory_items!profiles_equipped_frame_fkey(
        id,
        name,
        image,
        rarity
      ),
      equipped_banner:inventory_items!profiles_equipped_banner_fkey(
        id,
        name,
        image,
        rarity
      ),
      equipped_title:inventory_items!profiles_equipped_title_fkey(
        id,
        name,
        image,
        rarity
      ),
      equipped_effect:inventory_items!profiles_equipped_effect_fkey(
        id,
        name,
        image,
        rarity
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

static async getMemberGames(profileId: string) {
  const { data, error } = await supabaseAdmin
    .from("game_players")
    .select(`
      games (
        id,
        name,
        image
      )
    `)
    .eq("profile_id", profileId);

  if (error) {
    throw error;
  }

  return (data ?? []).flatMap((row) => {
    const game = Array.isArray(row.games)
      ? row.games[0]
      : row.games;

    if (!game) {
      return [];
    }

    return [
      {
        id: game.id,
        name: game.name,
        image: game.image,
      },
    ];
  });
}

static async getMemberRank(profileId: string) {
  const leaderboard = await this.getLeaderboard();

  const index = leaderboard.findIndex(
    (member) => member.id === profileId
  );

  return index === -1 ? null : index + 1;
}

static async getAchievements(profileId: string) {
  const { data: achievements, error } = await supabaseAdmin
    .from("achievements")
    .select("*")
    .order("xp");

  if (error) {
    throw error;
  }

  const { data: unlocked, error: unlockedError } =
    await supabaseAdmin
      .from("profile_achievements")
      .select("achievement_id")
      .eq("profile_id", profileId);

  if (unlockedError) {
    throw unlockedError;
  }

  const unlockedIds = new Set(
    unlocked.map((item) => item.achievement_id)
  );

  return achievements.map((achievement) => ({
    ...achievement,
    unlocked: unlockedIds.has(achievement.id),
  }));
}

static async unlockAchievement(
  profileId: string,
  achievementId: string
) {
  const { error } = await supabaseAdmin
    .from("profile_achievements")
    .upsert({
      profile_id: profileId,
      achievement_id: achievementId,
    });

  if (error) {
    throw error;
  }
}

static async getCoins(profileId: string) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("coins")
    .eq("id", profileId)
    .single();

  if (error) {
    throw error;
  }

  return data.coins;
}

static async addCoins(
  profileId: string,
  amount: number
) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("coins")
    .eq("id", profileId)
    .single();

  if (error) {
    throw error;
  }

  const { error: updateError } =
    await supabaseAdmin
      .from("profiles")
      .update({
        coins: data.coins + amount,
      })
      .eq("id", profileId);

  if (updateError) {
    throw updateError;
  }
}

}