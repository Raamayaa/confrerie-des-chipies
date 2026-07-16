import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import { auth } from "@/auth";
import { AchievementService } from "@/lib/services/achievement.service";

type AchievementWithProfile = {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  rarity: string;
  xp: number;
  code: string | null;
  profile_achievements: {
    unlocked_at: string | null;
    profile_id: string;
  }[];
};

export default async function AchievementsPage() {
  const session = await auth();

  const profileId = session?.user.profileId;

  if (!profileId) {
    return null;
  }

  const achievements =
    (await AchievementService.getAllWithProfile(
      profileId
    )) as AchievementWithProfile[];

  const unlocked = achievements.filter(
    (achievement) =>
      achievement.profile_achievements.length > 0
  );

  const progress =
    achievements.length === 0
      ? 0
      : Math.round(
          (unlocked.length /
            achievements.length) *
            100
        );

  const rarityColors: Record<string, string> = {
    common: "border-slate-500/40",
    rare: "border-sky-500/40",
    epic: "border-violet-500/40",
    legendary: "border-yellow-500/40",
  };

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pb-20 pt-36">
        <div className="mb-12">
          <h1 className="text-5xl font-black">
            🏆 Succès
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            Débloque des succès en participant à la vie de la communauté.
          </p>

          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm">
              <span>Progression</span>

              <span>
                {unlocked.length} / {achievements.length}
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((achievement) => {
            const isUnlocked =
              achievement.profile_achievements.length > 0;

            return (
              <div
                key={achievement.id}
                className={`rounded-3xl border bg-card p-8 transition-all ${
                  rarityColors[
                    achievement.rarity
                  ] ?? rarityColors.common
                } ${
                  isUnlocked
                    ? ""
                    : "opacity-60 grayscale"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-6xl">
                    {achievement.icon}
                  </div>

                  <div className="text-3xl">
                    {isUnlocked ? "✅" : "🔒"}
                  </div>
                </div>

                <h2 className="mt-6 text-2xl font-black">
                  {achievement.name}
                </h2>

                <p className="mt-3 text-muted-foreground">
                  {achievement.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-400">
                    {achievement.rarity}
                  </span>

                  <span className="font-bold text-yellow-400">
                    +{achievement.xp} XP
                  </span>
                </div>

                {isUnlocked &&
                  achievement.profile_achievements[0]
                    ?.unlocked_at && (
                    <p className="mt-6 text-xs text-muted-foreground">
                      Débloqué le{" "}
                      {new Date(
                        achievement.profile_achievements[0].unlocked_at
                      ).toLocaleDateString(
                        "fr-FR",
                        {
                          dateStyle: "long",
                        }
                      )}
                    </p>
                  )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}