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
    <section className="rounded-3xl border border-violet-500/20 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-violet-500/10">

      <h2 className="mb-6 text-2xl font-black text-white">
        🏅 Badges
      </h2>

      {badges.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-800/60 py-10 text-center">
          <p className="text-gray-400">
            Aucun badge débloqué.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">

          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 rounded-2xl border border-violet-500/30 bg-zinc-800/70 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-2xl">
                {badge.icon ?? "🏅"}
              </div>

              <div>
                <p className="font-bold text-white">
                  {badge.name}
                </p>

                <p className="text-sm text-gray-400">
                  Badge débloqué
                </p>
              </div>

            </div>
          ))}

        </div>
      )}
    </section>
  );
}