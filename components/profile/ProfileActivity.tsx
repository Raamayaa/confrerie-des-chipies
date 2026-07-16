type Activity = {
  id: string;
  type: string;
  title: string;
  created_at: string;
};

type Props = {
  activity: Activity[];
};

const icons: Record<string, string> = {
  achievement: "🏆",
  game: "🎮",
  event: "📅",
  idea: "💡",
  shop: "🛒",
  coin: "🪙",
  default: "✨",
};

export default function ProfileActivity({
  activity,
}: Props) {
  return (
    <section className="rounded-3xl border border-violet-500/20 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-violet-500/10">

      <h2 className="mb-8 text-2xl font-black text-white">
        📜 Activité récente
      </h2>

      {activity.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-800/60 py-10 text-center">
          <p className="text-gray-400">
            Aucune activité récente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 rounded-2xl border border-zinc-700 bg-zinc-800/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-3xl">
                {icons[item.type] ?? icons.default}
              </div>

              <div className="flex-1">

                <p className="font-bold text-white">
                  {item.title}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {new Date(item.created_at).toLocaleDateString(
                    "fr-FR",
                    {
                      dateStyle: "long",
                    }
                  )}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}