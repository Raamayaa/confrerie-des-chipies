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
    <div className="rounded-3xl border bg-card p-8">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-muted-foreground">
            Niveau
          </p>

          <h2 className="text-5xl font-black">
            ⭐ {level}
          </h2>
        </div>

        <div className="text-right">

          <p className="font-bold">
            {xp} XP
          </p>

          <p className="text-sm text-muted-foreground">
            Objectif : {nextLevelXp} XP
          </p>

        </div>

      </div>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-muted">

        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
          style={{
            width: `${Math.min(percent, 100)}%`,
          }}
        />

      </div>

    </div>
  );
}