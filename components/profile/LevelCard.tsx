type Props = {
  level: number;
  xp: number;
};

export default function LevelCard({
  level,
  xp,
}: Props) {
  const currentLevelXp = level * 100;
  const nextLevelXp = (level + 1) * 100;

  const percent =
    ((xp - currentLevelXp) /
      (nextLevelXp - currentLevelXp)) *
    100;

  return (
    <section className="rounded-3xl border border-violet-500/20 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-violet-500/10">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-300">
            Niveau actuel
          </p>

          <h2 className="mt-2 text-5xl font-black text-white">
            ⭐ {level}
          </h2>

        </div>

        <div className="text-right">

          <p className="text-3xl font-black text-cyan-400">
            {xp} XP
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Objectif : {nextLevelXp} XP
          </p>

        </div>

      </div>

      <div className="mt-8">

        <div className="mb-2 flex justify-between text-sm text-gray-300">

          <span>Progression</span>

          <span>
            {Math.round(Math.min(percent, 100))}%
          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-zinc-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 transition-all duration-500"
            style={{
              width: `${Math.min(percent, 100)}%`,
            }}
          />

        </div>

      </div>

    </section>
  );
}