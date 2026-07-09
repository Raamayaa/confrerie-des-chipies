import GameForm from "@/components/admin/games/GameForm";
import { createGame } from "../action";

export default function NewGamePage() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Nouveau jeu
      </h1>

      <GameForm action={createGame} />
    </>
  );
}