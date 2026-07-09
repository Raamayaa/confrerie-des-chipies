"use client";

type Props = {
  value: string;
  onChange(value: string): void;
};

export default function SearchGames({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher un jeu..."
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-violet-500"
    />
  );
}