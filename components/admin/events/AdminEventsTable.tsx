"use client";

import Link from "next/link";

import { Pencil, Trash2, ExternalLink } from "lucide-react";

import DataTable from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";

type Event = {
  id: string;
  title: string;
  event_date: string;
  discord_link?: string | null;

  game:
    | {
        id: string;
        name: string;
        image: string | null;
      }
    | null;
};

type Props = {
  events: Event[];
};

export default function AdminEventsTable({
  events,
}: Props) {
  return (
    <DataTable
      data={events}
      columns={[
        {
          key: "game",
          title: "Jeu",
          render: (event) => event.game?.name ?? "-",
        },
        {
          key: "title",
          title: "Événement",
        },
        {
          key: "event_date",
          title: "Date",
          render: (event) =>
            new Date(event.event_date).toLocaleString("fr-FR"),
        },
        {
          key: "discord",
          title: "Discord",
          render: (event) =>
            event.discord_link ? (
              <a
                href={event.discord_link}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              "-"
            ),
        },
        {
          key: "actions",
          title: "Actions",
          render: (event) => (
            <div className="flex gap-2">
              <Link href={`/admin/events/${event.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>

              <Button
                size="sm"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}