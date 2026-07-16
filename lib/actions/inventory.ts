"use server";

import { auth } from "@/auth";

import { revalidatePath } from "next/cache";

import { InventoryService } from "@/lib/services/inventory.service";

export async function equipItemAction(
  itemId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Non autorisé.",
    };
  }

  try {
    const result =
      await InventoryService.equipItem(
        session.user.id,
        itemId
      );

    // Recharge les pages concernées
    revalidatePath("/inventory");
    revalidatePath("/profile");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur est survenue.",
    };
  }
}