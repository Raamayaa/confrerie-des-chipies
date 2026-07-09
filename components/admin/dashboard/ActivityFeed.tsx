import { auth } from "@/auth";

import {
  CalendarDays,
  Gamepad2,
  Lightbulb,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

function getIcon(type: string) {
  switch (type) {
    case "game":
      return (
        <Gamepad2 className="h-5 w-5 text-violet-500" />
      );

    case "event":
      return (
        <CalendarDays className="h-5 w-5 text-emerald-500" />
      );

    case "idea":
      return (
        <Lightbulb className="h-5 w-5 text-amber-500" />
      );

    default:
      return null;
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function ActivityFeed() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const activities =
    await ProfileService.getRecentActivity(
      session.user.id
    );

  return (
    <Card className="p-8">
      <h2 className="mb-8 text-3xl font-bold">
        🔥 Mon activité
      </h2>

      {activities.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune activité.
        </p>
      ) : (
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div
              key={`${activity.type}-${activity.created_at}-${index}`}
              className="flex items-start gap-4 rounded-xl border p-4 transition hover:border-violet-500/40"
            >
              <div className="mt-1">
                {getIcon(activity.type)}
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.type === "game" &&
                    "Jeu rejoint"}

                  {activity.type === "event" &&
                    "Participation à un événement"}

                  {activity.type === "idea" &&
                    "Nouvelle idée proposée"}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {formatDate(activity.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}