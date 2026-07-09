import {
  Award,
  Lock,
  Star,
  Trophy,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

type Props = {
  profileId: string;
};

const rarityColors = {
  common:
    "border-slate-500/30 bg-slate-500/10",
  rare:
    "border-sky-500/40 bg-sky-500/10",
  epic:
    "border-violet-500/40 bg-violet-500/10",
  legendary:
    "border-yellow-500/40 bg-yellow-500/10",
};

export default async function MemberAchievements({
  profileId,
}: Props) {
  const achievements =
    await ProfileService.getAchievements(
      profileId
    );

  const unlocked =
    achievements.filter(
      (achievement) => achievement.unlocked
    ).length;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-yellow-500" />

          <h2 className="text-3xl font-black">
            Succès
          </h2>
        </div>

        <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-400">
          {unlocked} / {achievements.length}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`rounded-3xl border transition-all hover:-translate-y-2 hover:shadow-xl ${
              achievement.unlocked
                ? rarityColors[
                    achievement.rarity as keyof typeof rarityColors
                  ]
                : "opacity-50"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="text-5xl">
                  {achievement.unlocked ? (
                    achievement.icon
                  ) : (
                    <Lock className="h-10 w-10" />
                  )}
                </div>

                <span className="rounded-full bg-background px-3 py-1 text-xs font-bold uppercase">
                  {achievement.rarity}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-black">
                {achievement.name}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {achievement.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />

                  <span className="font-bold">
                    {achievement.xp} XP
                  </span>
                </div>

                {achievement.unlocked ? (
                  <Trophy className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}