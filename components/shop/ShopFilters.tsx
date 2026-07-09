"use client";

type Filter =
  | "all"
  | "frame"
  | "banner"
  | "title"
  | "effect";

type Props = {
  value: Filter;
  onChange: (value: Filter) => void;
};

const filters = [
  { value: "all", label: "Tous" },
  { value: "frame", label: "🖼️ Cadres" },
  { value: "banner", label: "🌌 Bannières" },
  { value: "title", label: "🏷️ Titres" },
  { value: "effect", label: "✨ Effets" },
] as const;

export default function ShopFilters({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`rounded-full px-5 py-2 font-semibold transition ${
            value === filter.value
              ? "bg-violet-600 text-white"
              : "bg-muted hover:bg-muted/70"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}