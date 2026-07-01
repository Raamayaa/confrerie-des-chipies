import Navbar from "@/components/layout/Navbar";
import Background from "@/components/shared/Background";
import EventCard from "@/components/home/EventCard";
import { events } from "@/data/events";

export default function EventsPage() {
  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pt-36 pb-20">
        <div className="mb-12">
          <h1 className="text-6xl font-black">
            📅 Événements
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            Retrouvez toutes les prochaines soirées de la Confrérie des
            Chipies et inscrivez-vous en un clic.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              game={event.game}
              date={event.date}
              players={event.players}
              emoji={event.emoji}
            />
          ))}
        </div>
      </main>
    </>
  );
}