type Props = {
  profile: {
    username: string;
    coins: number;
  };

  stats: {
    games: number;
    events: number;
    ideas: number;
    votes: number;
  };

  progress: {
    xp: number;
    level: number;
    current: number;
    required: number;
  };

  rank: number | null;
};

export default function ProfileStats({
  profile,
  stats,
  progress,
  rank,
}: Props) {
  const cards = [
    {
      emoji: "⭐",
      title: "Niveau",
      value: progress.level,
    },
    {
      emoji: "🪙",
      title: "Pièces",
      value: profile.coins,
    },
    {
      emoji: "🎮",
      title: "Jeux",
      value: stats.games,
    },
    {
      emoji: "📅",
      title: "Événements",
      value: stats.events,
    },
    {
      emoji: "💡",
      title: "Idées",
      value: stats.ideas,
    },
    {
      emoji: "🏆",
      title: "Classement",
      value: rank ?? "-",
    },
  ];

  return (
    <section className="space-y-8">

      <div className="rounded-3xl border bg-card p-8">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-black">
              {profile.username}
            </h2>

            <p className="mt-2 text-muted-foreground">
              Niveau {progress.level}
            </p>

          </div>

          <div className="text-right">

            <p className="text-3xl font-black text-yellow-400">
              🪙 {profile.coins.toLocaleString("fr-FR")}
            </p>

          </div>

        </div>

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm">

            <span>Progression</span>

            <span>
              {progress.current} / {progress.required} XP
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
              style={{
                width: `${
                  (progress.current /
                    progress.required) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border bg-card p-6 text-center"
          >

            <div className="text-5xl">
              {card.emoji}
            </div>

            <h3 className="mt-4 text-lg font-bold">
              {card.title}
            </h3>

            <p className="mt-3 text-3xl font-black">
              {card.value}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}