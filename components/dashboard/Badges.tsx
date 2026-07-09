import { auth } from "@/auth";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

export default async function Badges() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const badges =
    await ProfileService.getBadges(
      session.user.id
    );

  return (
    <Card className="p-8">
      <h2 className="mb-8 text-2xl font-bold">
        🏅 Mes badges
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-xl border p-6 text-center transition ${
              badge.unlocked
                ? "border-violet-500 bg-violet-500/10"
                : "opacity-40"
            }`}
          >
            <div className="text-5xl">
              {badge.icon}
            </div>

            <h3 className="mt-4 font-bold">
              {badge.name}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {badge.unlocked
                ? "Débloqué"
                : "Verrouillé"}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}