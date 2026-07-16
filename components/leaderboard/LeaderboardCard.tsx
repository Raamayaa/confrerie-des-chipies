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
    <div className="flex items-center justify-between rounded-3xl border bg-card p-6 transition hover:border-violet-500/40">

      <div className="flex items-center gap-5">

        <div className="text-4xl w-12 text-center">
          {medals[rank - 1] ?? `#${rank}`}
        </div>

        <Image
          src={
            member.avatar ??
            "https://placehold.co/80x80"
          }
          alt={member.username}
          width={72}
          height={72}
          className="rounded-full border-2 border-violet-500 object-cover"
        />

        <div>

          <h2 className="text-2xl font-black">
            {member.username}
          </h2>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">

            <span>🎮 {member.games}</span>

            <span>📅 {member.events}</span>

            <span>💡 {member.ideas}</span>

            <span>❤️ {member.votes}</span>

          </div>

        </div>

      </div>

      <div className="text-right">

        <div className="text-3xl font-black text-yellow-400">
          ⭐ {member.score}
        </div>

        <p className="text-sm text-muted-foreground">
          Score
        </p>

      </div>

    </div>
  );
}