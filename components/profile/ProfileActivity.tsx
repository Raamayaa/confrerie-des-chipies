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
    <section className="rounded-3xl border bg-card p-8">
      <h2 className="mb-8 text-2xl font-black">
        📜 Activité récente
      </h2>

      {activity.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune activité récente.
        </p>
      ) : (
        <div className="space-y-4">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition hover:border-violet-500/30"
            >
              <div className="text-3xl">
                {icons[item.type] ??
                  icons.default}
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  {item.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    item.created_at
                  ).toLocaleDateString(
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