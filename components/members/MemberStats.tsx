import {
  CalendarDays,
  Gamepad2,
  Heart,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

type Props = {
  profileId: string;
};

export default async function MemberStats({
  profileId,
}: Props) {
  const stats =
    await ProfileService.getDashboardStats(profileId);

  const items = [
    {
      label: "Jeux",
      value: stats.games,
      icon: Gamepad2,
      color:
        "from-violet-500 to-fuchsia-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Événements",
      value: stats.events,
      icon: CalendarDays,
      color:
        "from-emerald-500 to-green-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Idées",
      value: stats.ideas,
      icon: Lightbulb,
      color:
        "from-amber-500 to-orange-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Votes",
      value: stats.votes,
      icon: Heart,
      color:
        "from-rose-500 to-pink-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-violet-500" />

        <h2 className="text-3xl font-black">
          Statistiques
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.label}
              className="group relative overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${item.color}`}
              />

              <div className="relative p-7">
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>

                <p className="mt-2 text-5xl font-black">
                  {item.value}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}