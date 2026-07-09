import { Users, Gamepad2, CalendarDays, Lightbulb } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default async function Stats() {
  const [{ count: members }, { count: games }, { count: events }, { count: ideas }] =
    await Promise.all([
      supabase.from("game_players").select("*", { count: "exact", head: true }),
      supabase.from("games").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("ideas").select("*", { count: "exact", head: true }),
    ]);

  const stats = [
    {
      icon: Users,
      value: members ?? 0,
      label: "Membres",
    },
    {
      icon: Gamepad2,
      value: games ?? 0,
      label: "Jeux",
    },
    {
      icon: CalendarDays,
      value: events ?? 0,
      label: "Événements",
    },
    {
      icon: Lightbulb,
      value: ideas ?? 0,
      label: "Idées",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-8 py-10">
      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-violet-500/40 hover:-translate-y-1"
            >
              <Icon className="mb-4 text-violet-400" size={32} />

              <h3 className="text-3xl font-bold">
                {item.value}
              </h3>

              <p className="text-gray-400">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}