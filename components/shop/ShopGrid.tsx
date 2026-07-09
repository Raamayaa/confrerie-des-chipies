"use client";

import { useMemo, useState } from "react";

import ShopFilters from "./ShopFilters";
import ShopItem from "./ShopItem";

type Item = {
  id: string;
  name: string;
  image: string | null;
  rarity: string;
  type: string;
  price: number;
  owned: boolean;
  equipped: boolean;
};

export default function ShopGrid({
  items,
}: {
  items: Item[];
}) {
  const [filter, setFilter] = useState<
    "all" | "frame" | "banner" | "title" | "effect"
  >("all");

  const [search, setSearch] =
    useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesType =
        filter === "all" ||
        item.type === filter;

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesType &&
        matchesSearch
      );
    });
  }, [filter, search, items]);

  return (
    <>
      <input
        placeholder="Rechercher..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="mb-6 w-full rounded-xl border bg-background px-4 py-3"
      />

      <ShopFilters
        value={filter}
        onChange={setFilter}
      />

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <ShopItem
            key={item.id}
            item={item}
            owned={item.owned}
            equipped={item.equipped}
          />
        ))}
      </div>
    </>
  );
}