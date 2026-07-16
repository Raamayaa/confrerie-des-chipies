import Image from "next/image";

type Props = {
  rank: number;
  member: {
    id: string;
    username: string;
    avatar: string | null;
    score: number;
    games: number;
    events: number;
    ideas: number;
    votes: number;
  };
};

export default function LeaderboardCard({
  rank,
  member,
}: Props) {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex items-center justify-between rounded-3xl border border-violet-500/20 bg-zinc-900/80 p-6 backdrop-blur-xl shadow-xl shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/20">

      <div className="flex items-center gap-6">

        {/* Classement */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-3xl font-black">
          {medals[rank - 1] ?? `#${rank}`}
        </div>

        {/* Avatar */}
        <Image
          src={
            member.avatar ??
            "https://placehold.co/80x80"
          }
          alt={member.username}
          width={72}
          height={72}
          className="rounded-full border-2 border-violet-500 object-cover shadow-lg"
        />

        {/* Infos */}
        <div>

          <h2 className="text-2xl font-black text-white">
            {member.username}
          </h2>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-400">

            <span>🎮 {member.games}</span>

            <span>📅 {member.events}</span>

            <span>💡 {member.ideas}</span>

            <span>❤️ {member.votes}</span>

          </div>

        </div>

      </div>

      {/* Score */}
      <div className="text-right">

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-3">

          <p className="text-3xl font-black text-yellow-400">
            ⭐ {member.score}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Score
          </p>

        </div>

      </div>

    </div>
  );
}