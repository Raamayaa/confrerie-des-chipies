import Background from "@/components/shared/Background";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import Stats from "@/components/home/Stats";
import EventCard from "@/components/home/EventCard";
import GameCard from "@/components/home/GameCard";
import WhyJoin from "@/components/home/WhyJoin";
import Footer from "@/components/home/Footer";

import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: games } = await supabase
    .from("games")
    .select(`
      id,
      name,
      image,
      game_players(
        id,
        username,
        avatar
      )
    `)
    .order("name");

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  return (
    <>
      <Background />
      <Navbar />

      <Hero />

      <Stats />

      <section
        id="events"
        className="mx-auto max-w-7xl px-8 py-20"
      >
        <div className="mb-10">
          <h2 className="text-5xl font-black">
            🔥 Prochains événements
          </h2>

          <p className="mt-2 text-gray-400">
            Les prochaines soirées de la Confrérie.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {events?.map((event) => (
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

      <section
        id="games"
        className="mx-auto max-w-7xl px-8 py-20"
      >
        <div className="mb-10">
          <h2 className="text-5xl font-black">
            🎮 Jeux de la communauté
          </h2>

          <p className="mt-2 text-gray-400">
            Tous les jeux disponibles.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {games?.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.image}
              players={game.game_players?.length ?? 0}
              avatars={game.game_players ?? []}
            />
          ))}
        </div>
      </section>

      <WhyJoin />

      <Footer />
    </>
  );
}