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
      value: profile.coins.toLocaleString("fr-FR"),
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

  const percentage =
    (progress.current / progress.required) * 100;

  return (
    <section className="space-y-8">

      {/* Carte principale */}
      <div className="rounded-3xl border border-violet-500/20 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-violet-500/10">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-black text-white">
              {profile.username}
            </h2>

            <p className="mt-2 text-gray-300">
              Niveau {progress.level}
            </p>

          </div>

          <div className="text-right">

            <p className="text-4xl font-black text-yellow-400">
              🪙 {profile.coins.toLocaleString("fr-FR")}
            </p>

          </div>

        </div>

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm text-gray-300">

            <span>Progression</span>

            <span>
              {progress.current} / {progress.required} XP
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 transition-all duration-500"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Statistiques */}
      <div className="grid gap-6 md:grid-cols-3">

        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-violet-500/20 bg-zinc-900/80 p-6 text-center backdrop-blur-xl shadow-xl shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-violet-500/20"
          >

            <div className="text-5xl">
              {card.emoji}
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">
              {card.title}
            </h3>

            <p className="mt-3 text-3xl font-black text-white">
              {card.value}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}