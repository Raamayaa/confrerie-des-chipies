"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { equipItemAction } from "@/app/inventory/inventory.actions";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type InventoryItem = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  rarity: string;
  image: string | null;
  equipped: boolean;
};

type Props = {
  inventory: InventoryItem[];
};

const rarityColors: Record<string, string> = {
  common: "border-slate-500/30",
  rare: "border-sky-500/40",
  epic: "border-violet-500/40",
  legendary: "border-yellow-500/40",
};

export default function InventoryGrid({
  inventory,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  async function equip(itemId: string) {
    startTransition(async () => {
      await equipItemAction(itemId);

      router.refresh();
    });
  }

  if (inventory.length === 0) {
    return (
      <Card className="rounded-3xl p-12 text-center">
        <div className="text-6xl">🎒</div>

        <h2 className="mt-6 text-3xl font-black">
          Inventaire vide
        </h2>

        <p className="mt-3 text-muted-foreground">
          Tu ne possèdes encore aucun objet.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {inventory.map((item) => (
        <Card
          key={item.id}
          className={`rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-xl ${
            rarityColors[item.rarity] ??
            rarityColors.common
          }`}
        >
          <div className="text-6xl">
            {item.image ?? "📦"}
          </div>

          <h2 className="mt-6 text-2xl font-black">
            {item.name}
          </h2>

          <p className="mt-3 text-muted-foreground">
            {item.description}
          </p>

          <div className="mt-3">
            <span className="rounded-full bg-muted px-3 py-1 text-xs uppercase">
              {item.rarity}
            </span>
          </div>

          <Button
            className="mt-8 w-full"
            disabled={
              isPending || item.equipped
            }
            onClick={() =>
              equip(item.id)
            }
          >
            {item.equipped
              ? "Équipé"
              : "Équiper"}
          </Button>
        </Card>
      ))}
    </div>
  );
}