"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  buyItemAction,
  equipItemAction,
} from "@/app/shop/actions";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

        toast.success("Objet acheté !", {
          description: `${item.name} a été ajouté à votre inventaire.`,
        });

        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Achat impossible", {
            description: error.message,
          });
        }
      }
    });
  }

  function equip() {
    startTransition(async () => {
      try {
        await equipItemAction(item.id);

        toast.success("Objet équipé !", {
          description: `${item.name} est maintenant équipé.`,
        });

        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Impossible d'équiper l'objet", {
            description: error.message,
          });
        }
      }
    });
  }

  return (
    <Card
      className={`rounded-3xl border-2 bg-zinc-900/80 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl ${
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
      <div className="flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-6xl">
          {item.image ??
            icons[
              item.type as keyof typeof icons
            ] ??
            "📦"}
        </div>
      </div>

      {/* Nom */}
      <h2 className="mt-6 text-center text-2xl font-black text-white">
        {item.name}
      </h2>

      {/* Rareté */}
      <p
        className={`mt-2 text-center text-sm font-bold uppercase tracking-widest ${
          rarityColors[
            item.rarity as keyof typeof rarityColors
          ] ?? "text-slate-400"
        }`}
      >
        {item.rarity}
      </p>

      {/* Type */}
      <p className="mt-2 text-center capitalize text-gray-400">
        {item.type}
      </p>

      {/* Prix */}
      <div className="mt-8 flex justify-center">
        <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-lg font-bold text-yellow-400">
          🪙 {item.price.toLocaleString("fr-FR")}
        </span>
      </div>

      {/* Bouton */}
      <div className="mt-8">
        {equipped ? (
          <Button
            disabled
            className="w-full rounded-xl bg-emerald-600 text-white"
          >
            ✅ Équipé
          </Button>
        ) : owned ? (
          <Button
            disabled={isPending}
            onClick={equip}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90"
          >
            ⚡ Équiper
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={buy}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90"
          >
            {isPending
              ? "⏳ Achat..."
              : "🛒 Acheter"}
          </Button>
        )}
      </div>
    </Card>
  );
}