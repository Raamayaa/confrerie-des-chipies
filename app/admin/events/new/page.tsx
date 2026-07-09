import { createEvent } from "../actions";

import { GameService } from "@/lib/services/game.service";

import EventForm from "@/components/admin/events/EventForm";

export default async function NewEventPage() {
  const games = await GameService.getGames();

  return (
    <>
      <h1 className="mb-8 text-4xl font-black">
        Nouvel événement
      </h1>

      <EventForm
        games={games}
        action={createEvent}
      />
    </>
  );
}