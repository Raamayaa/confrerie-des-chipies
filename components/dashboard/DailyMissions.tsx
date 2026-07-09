import { auth } from "@/auth";
import { CheckCircle2, Circle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

export default async function DailyMissions() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const missions =
    await ProfileService.getDailyMissions(
      session.user.id
    );

  return (
    <Card className="p-8">
      <h2 className="mb-8 text-2xl font-bold">
        🎯 Missions du jour
      </h2>

      <div className="space-y-5">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="flex items-center justify-between rounded-xl border p-5"
          >
            <div className="flex items-center gap-4">
              {mission.completed ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              ) : (
                <Circle className="h-6 w-6 text-gray-400" />
              )}

              <div>
                <p className="font-semibold">
                  {mission.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  +{mission.reward} XP
                </p>
              </div>
            </div>

            <span
              className={
                mission.completed
                  ? "font-bold text-emerald-500"
                  : "font-bold text-gray-400"
              }
            >
              {mission.completed
                ? "Terminée"
                : "À faire"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}