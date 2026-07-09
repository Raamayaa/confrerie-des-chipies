import { Award, Lock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

type Props = {
  profileId: string;
};

export default async function MemberBadges({
  profileId,
}: Props) {
  const badges =
    await ProfileService.getBadges(profileId);

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <Award className="h-8 w-8 text-yellow-500" />

        <h2 className="text-3xl font-black">
          Badges
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {badges.map((badge) => (
          <Card
            key={badge.id}
            className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
              badge.unlocked
                ? "border-yellow-500/40"
                : "opacity-50"
            }`}
          >
            {badge.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-transparent" />
            )}

            <div className="relative flex flex-col items-center p-6">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full text-5xl transition-transform duration-300 group-hover:scale-110 ${
                  badge.unlocked
                    ? "bg-yellow-500/10"
                    : "bg-muted"
                }`}
              >
                {badge.unlocked ? (
                  badge.icon
                ) : (
                  <Lock className="h-9 w-9 text-muted-foreground" />
                )}
              </div>

              <h3 className="mt-5 text-center text-lg font-bold">
                {badge.name}
              </h3>

              <span
                className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${
                  badge.unlocked
                    ? "bg-green-500/15 text-green-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {badge.unlocked
                  ? "Débloqué"
                  : "Verrouillé"}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}