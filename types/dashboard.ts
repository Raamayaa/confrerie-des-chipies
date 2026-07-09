export type DashboardStats = {
  games: number;
  members: number;
  events: number;
  ideas: number;
};

export type UpcomingEvent = {
  id: string;
  title: string;
  event_date: string;
  game: {
    name: string;
  } | null;
};

export type PopularGame = {
  id: string;
  name: string;
  image: string | null;
  game_players: {
    count: number;
  }[];
};

export type RecentActivity = {
  id: string;
  action: string;
  created_at: string | null;
  profiles: {
    username: string;
    avatar: string | null;
  } | null;
};

export type DashboardData = {
  stats: DashboardStats;
  upcomingEvents: UpcomingEvent[];
  popularGames: PopularGame[];
  recentActivity: RecentActivity[];
};