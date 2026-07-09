"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Pencil, Trash2 } from "lucide-react";

import DataTable from "@/components/admin/DataTable";
import SearchBar from "@/components/admin/SearchBar";

import { Button } from "@/components/ui/button";

type Game = {
  id: string;
  name: string;
  image: string;
  game_players?: {
    count: number;
  }[];
};

type Props = {
  games: Game[];
};

export default function AdminGamesTable({
  games,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredGames = useMemo(() => {
    if (!search) return games;

    return games.filter((game) =>
      game.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [games, search]);

  return (
    <div className="space-y-6">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un jeu..."
      />

      <DataTable
        data={filteredGames}
        columns={[
          {
            key: "image",
            title: "Image",
            render: (game) => (
              <Image
                src={game.image}
                alt={game.name}
                width={70}
                height={70}
                className="rounded-lg"
              />
            ),
          },
          {
            key: "name",
            title: "Jeu",
          },
          {
            key: "players",
            title: "Joueurs",
            render: (game) =>
              game.game_players?.[0]?.count ?? 0,
          },
          {
            key: "actions",
            title: "Actions",
            render: (game) => (
              <div className="flex gap-2">
                <Link href={`/admin/games/${game.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                  >
                    <Pencil size={16} />
                  </Button>
                </Link>

                <Button
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}