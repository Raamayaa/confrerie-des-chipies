import Background from "@/components/shared/Background";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import Stats from "@/components/home/Stats";
import EventCard from "@/components/home/EventCard";
import GameCard from "@/components/home/GameCard";
import WhyJoin from "@/components/home/WhyJoin";
import Footer from "@/components/home/Footer";

import { events } from "@/data/events";
import { games } from "@/data/games";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />

      <Hero />

      <Stats />

      {/* Événements */}
      <section
        id="events"
        className="mx-auto max-w-7xl px-8 py-20"
      >
        <div className="mb-10">
          <h2 className="text-5xl font-black">
            🔥 Prochains événements
          </h2>

          <p className="mt-2 text-gray-400">
            Rejoins les prochaines soirées de la communauté.
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
      </section>

      {/* Jeux */}
      <section
        id="games"
        className="mx-auto max-w-7xl px-8 py-20"
      >
        <div className="mb-10">
          <h2 className="text-5xl font-black">
            🎮 Jeux de la communauté
          </h2>

          <p className="mt-2 text-gray-400">
            Les jeux préférés des Chipies.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {games.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              image={game.image}
              players={game.players}
            />
          ))}
        </div>
      </section>

      <WhyJoin />

      <Footer />
    </>
  );
}