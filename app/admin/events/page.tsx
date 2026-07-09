import Link from "next/link";
import { Plus } from "lucide-react";

import { EventService } from "@/lib/services/event.service";

import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import AdminEventsTable from "@/components/admin/events/AdminEventsTable";
import { Button } from "@/components/ui/button";

export default async function AdminEventsPage() {
  const events = await EventService.getEvents();

  return (
    <>
      <PageHeader
        title="📅 Événements"
        description="Gère les événements de la communauté."
        action={
          <Link href="/admin/events/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel événement
            </Button>
          </Link>
        }
      />

      {events.length === 0 ? (
        <EmptyState
          title="Aucun événement"
          description="Commence par créer ton premier événement."
        />
      ) : (
        <AdminEventsTable events={events} />
      )}
    </>
  );
}