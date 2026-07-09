import { notFound } from "next/navigation";

import { EventService } from "@/lib/services/event.service";
import { GameService } from "@/lib/services/game.service";

import EventForm from "@/components/admin/events/EventForm";

import { updateEvent } from "../actions";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditEventPage({
  params,
}: Props) {
  const event = await EventService.getEvent(params.id);

  if (!event) {
    notFound();
  }

  const games = await GameService.getGames();

  return (
    <>
      <h1 className="mb-8 text-4xl font-black">
        Modifier l&APOSévénement
      </h1>

      <EventForm
        games={games}
        defaultValues={{
          title: event.title,
          description: event.description ?? "",
          event_date: event.event_date?.slice(0, 16),
          discord_link: event.discord_link ?? "",
          game_id: event.game_id ?? undefined,
        }}
        action={updateEvent.bind(null, event.id)}
      />
    </>
  );
}