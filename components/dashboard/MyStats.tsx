import { auth } from "@/auth";

import {
  CalendarDays,
  Gamepad2,
  Heart,
  Lightbulb,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

export default async function MyStats() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const stats = await ProfileService.getDashboardStats(
    session.user.id
  );

  const items = [
    {
      label: "Jeux",
      value: stats.games,
      icon: Gamepad2,
      color: "text-violet-500",
    },
    {
      label: "Événements",
      value: stats.events,
      icon: CalendarDays,
      color: "text-emerald-500",
    },
    {
      label: "Idées",
      value: stats.ideas,
      icon: Lightbulb,
      color: "text-amber-500",
    },
    {
      label: "Votes",
      value: stats.votes,
      icon: Heart,
      color: "text-rose-500",
    },
  ];

  return (
    <Card className="p-8">
      <h2 className="mb-8 text-2xl font-bold">
        📊 Mes statistiques
      </h2>

      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border bg-background/40 p-6 text-center transition hover:border-violet-500/40 hover:shadow-lg"
            >
              <Icon
                className={`mx-auto mb-4 h-10 w-10 ${item.color}`}
              />

              <p className="text-4xl font-black">
                {item.value}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}