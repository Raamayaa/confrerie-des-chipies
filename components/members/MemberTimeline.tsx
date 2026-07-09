import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

type Props = {
  profileId: string;
};

function getIcon(type: "game" | "event" | "idea") {
  switch (type) {
    case "game":
      return "🎮";

    case "event":
      return "📅";

    case "idea":
      return "💡";
  }
}

export default async function MemberTimeline({
  profileId,
}: Props) {
  const activity =
    await ProfileService.getRecentActivity(profileId);

  return (
    <Card className="p-8">
      <h2 className="mb-8 text-3xl font-bold">
        📈 Activité récente
      </h2>

      {activity.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune activité.
        </p>
      ) : (
        <div className="space-y-5">
          {activity.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-5 rounded-2xl border p-5 transition hover:border-violet-500/40"
            >
              <div className="text-4xl">
                {getIcon(item.type)}
              </div>

              <div className="flex-1">
                <h3 className="font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.created_at
                    ? new Date(
                        item.created_at
                      ).toLocaleDateString(
                        "fr-FR",
                        {
                          dateStyle: "long",
                        }
                      )
                    : "Date inconnue"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}