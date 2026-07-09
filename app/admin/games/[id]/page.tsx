import { notFound } from "next/navigation";

import { GameService } from "@/lib/services/game.service";

import GameForm from "@/components/admin/games/GameForm";

import { updateGame } from "../action";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGamePage({
  params,
}: Props) {
  const { id } = await params;

  const game = await GameService.getGame(id);

  if (!game) {
    notFound();
  }

  return (
    <>
      <h1 className="mb-8 text-4xl font-black">
        Modifier le jeu
      </h1>

      <GameForm
        defaultValues={{
          name: game.name,
          image: game.image,
          description: game.description ?? "",
        }}
        action={updateGame.bind(null, id)}
      />
    </>
  );
}