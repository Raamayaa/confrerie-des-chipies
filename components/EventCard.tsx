"use client";

type Props = {
  game: string;
  date: string;
  players: number;
  emoji: string;
};

export default function EventCard({
  game,
  date,
  players,
  emoji,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-[0_0_40px_rgba(139,92,246,.25)]">

      <div className="text-5xl">
        {emoji}
      </div>

      <h3 className="mt-5 text-2xl font-bold">
        {game}
      </h3>

      <p className="mt-2 text-gray-400">
        {date}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        👥 {players} participants
      </p>

      <div className="mt-8 flex gap-3">

        <button className="flex-1 rounded-xl bg-green-600 py-2 transition hover:bg-green-500">
          Présent
        </button>

        <button className="flex-1 rounded-xl bg-yellow-500 py-2 text-black transition hover:bg-yellow-400">
          Peut-être
        </button>

      </div>

    </div>
  );
}