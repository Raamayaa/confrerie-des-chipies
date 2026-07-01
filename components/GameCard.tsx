"use client";

type Props = {
  name: string;
  emoji: string;
  players: number;
};

export default function GameCard({
  name,
  emoji,
  players,
}: Props) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,.25)]">

      <div className="text-6xl text-center">
        {emoji}
      </div>

      <h3 className="mt-6 text-center text-2xl font-bold">
        {name}
      </h3>

      <p className="mt-2 text-center text-gray-400">
        👥 {players} joueurs
      </p>

      <button className="mt-6 w-full rounded-xl bg-cyan-600 py-3 font-semibold transition hover:bg-cyan-500">
        Je joue
      </button>

    </div>
  );
}