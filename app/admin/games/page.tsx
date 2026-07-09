import Link from "next/link";
import { Plus } from "lucide-react";

import { GameService } from "@/lib/services/game.service";

import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import AdminGamesTable from "@/components/admin/games/AdminGamesTable";

import { Button } from "@/components/ui/button";

import type { Game } from "@/types/game";

export default async function AdminGamesPage() {
  const games = (await GameService.getAdminGames()) as Game[];

  return (
    <>
      <PageHeader
        title="🎮 Jeux"
        description="Gère les jeux de la communauté."
        action={
          <Link href="/admin/games/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau jeu
            </Button>
          </Link>
        }
      />

      {games.length === 0 ? (
        <EmptyState
          title="Aucun jeu"
          description="Commence par créer ton premier jeu."
        />
      ) : (
        <AdminGamesTable games={games} />
      )}
    </>
  );
}