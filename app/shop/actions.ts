"use server";

import { auth } from "@/auth";

import { ShopService } from "@/lib/services/shop.service";
import { InventoryService } from "@/lib/services/inventory.service";

export async function buyItemAction(itemId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await ShopService.buyItem(
    session.user.id,
    itemId
  );

  return {
    success: true,
    message: "Objet acheté avec succès !",
  };
}

export async function equipItemAction(itemId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await InventoryService.equipItem(
    session.user.id,
    itemId
  );

  return {
    success: true,
    message: "Objet équipé avec succès !",
  };
}