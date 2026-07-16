type Badge = {
  id: string;
  name: string;
  icon: string | null;
  color?: string | null;
};

type Props = {
  badges: Badge[];
};

export default function ProfileBadges({
  badges,
}: Props) {
  return (
    <section className="rounded-3xl border bg-card p-8">
      <h2 className="mb-6 text-2xl font-black">
        🏅 Badges
      </h2>

      {badges.length === 0 ? (
        <p className="text-muted-foreground">
          Aucun badge débloqué.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-3"
            >
              <span className="text-2xl">
                {badge.icon ?? "🏅"}
              </span>

              <span className="font-semibold">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}