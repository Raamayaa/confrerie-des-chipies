"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  buyItemAction,
  equipItemAction,
} from "@/app/shop/actions";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  rarityBorder,
  rarityGlow,
  rarityColors,
} from "@/lib/utils/rarity";

type Props = {
  item: {
    id: string;
    name: string;
    image: string | null;
    rarity: string;
    type: string;
    price: number;
  };

  owned: boolean;
  equipped: boolean;
};

const icons = {
  frame: "🖼️",
  banner: "🌌",
  title: "🏷️",
  effect: "✨",
} as const;

export default function ShopItem({
  item,
  owned,
  equipped,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function buy() {
    startTransition(async () => {
      try {
        await buyItemAction(item.id);
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    });
  }

  function equip() {
    startTransition(async () => {
      try {
        await equipItemAction(item.id);
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    });
  }

  return (
    <Card
      className={`rounded-3xl border-2 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ${
        rarityBorder[
          item.rarity as keyof typeof rarityBorder
        ] ?? rarityBorder.common
      } ${
        rarityGlow[
          item.rarity as keyof typeof rarityGlow
        ] ?? ""
      }`}
    >
      {/* Icône */}
      <div className="text-center text-6xl">
        {item.image ??
          icons[
            item.type as keyof typeof icons
          ] ??
          "📦"}
      </div>

      {/* Nom */}
      <h2 className="mt-4 text-center text-2xl font-black">
        {item.name}
      </h2>

      {/* Rareté */}
      <p
        className={`mt-2 text-center text-sm font-bold uppercase tracking-wide ${
          rarityColors[
            item.rarity as keyof typeof rarityColors
          ] ?? "text-slate-400"
        }`}
      >
        {item.rarity}
      </p>

      {/* Type */}
      <p className="mt-2 text-center capitalize text-muted-foreground">
        {item.type}
      </p>

      {/* Prix + bouton */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg font-bold text-yellow-500">
          🪙 {item.price}
        </span>

        {equipped ? (
          <Button
            disabled
            variant="secondary"
          >
            ✅ Équipé
          </Button>
        ) : owned ? (
          <Button
            disabled={isPending}
            onClick={equip}
          >
            ⚡ Équiper
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={buy}
          >
            🛒 Acheter
          </Button>
        )}
      </div>
    </Card>
  );
}