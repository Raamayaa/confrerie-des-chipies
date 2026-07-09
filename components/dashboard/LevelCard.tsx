import { auth } from "@/auth";
import { Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

export default async function LevelCard() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const progress = await ProfileService.getProgress(
    session.user.id
  );

  const percent =
    (progress.current / progress.required) * 100;

  return (
    <Card className="p-8">
      <div className="flex items-center gap-3">
        <Trophy className="h-7 w-7 text-yellow-500" />

        <h2 className="text-2xl font-bold">
          Niveau {progress.level}
        </h2>
      </div>

      <p className="mt-4 text-muted-foreground">
        {progress.xp} XP
      </p>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-violet-600 transition-all"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {progress.current} / {progress.required} XP
      </p>
    </Card>
  );
}