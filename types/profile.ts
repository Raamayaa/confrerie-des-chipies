export interface Profile {
  id: string;
  discord_id: string;
  username: string;
  avatar: string | null;
  banner: string | null;
  bio: string | null;
  role: "admin" | "member";
  created_at: string;
}

export interface ProfileProgress {
  xp: number;
  level: number;
  current: number;
  required: number;
}

export interface DashboardStats {
  games: number;
  events: number;
  ideas: number;
  votes: number;
}