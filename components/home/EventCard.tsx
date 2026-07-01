import { CalendarDays, Users } from "lucide-react";

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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/20">
      <div className="text-5xl">
        {emoji}
      </div>

      <h3 className="mt-4 text-2xl font-bold">
        {game}
      </h3>

      <div className="mt-5 flex items-center gap-2 text-gray-400">
        <CalendarDays size={18} />
        {date}
      </div>

      <div className="mt-2 flex items-center gap-2 text-gray-400">
        <Users size={18} />
        {players} joueurs
      </div>

      <button className="mt-8 w-full rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-500">
        ✅ Participer
      </button>
    </div>
  );
}