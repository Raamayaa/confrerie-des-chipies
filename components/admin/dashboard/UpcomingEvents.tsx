import Link from "next/link";

import { Card } from "@/components/ui/card";

import { DashboardService } from "@/lib/services/dashboard.service";

export default async function UpcomingEvents() {
  const { upcomingEvents } = await DashboardService.getDashboard();

  return (
    <Card className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          📅 Prochains événements
        </h2>

        <Link
          href="/events"
          className="text-violet-500 transition hover:text-violet-400"
        >
          Voir tout →
        </Link>
      </div>

      {upcomingEvents.length === 0 ? (
        <p className="text-muted-foreground">
          Aucun événement prévu.
        </p>
      ) : (
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {event.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {event.game?.name ?? "Jeu inconnu"}
                </p>
              </div>

              <span className="text-sm text-muted-foreground">
                {new Date(event.event_date).toLocaleDateString("fr-FR")}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}