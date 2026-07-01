"use client";

import Image from "next/image";
import { Users } from "lucide-react";

type Props = {
  name: string;
  image: string;
  players: number;
};

export default function GameCard({
  name,
  image,
  players,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/20">

      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">
          {name}
        </h3>

        <div className="mt-4 flex items-center gap-2 text-gray-400">
          <Users size={18} />
          {players} joueurs
        </div>

        <button className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-500">
          🎮 Je joue
        </button>
      </div>

    </div>
  );
}