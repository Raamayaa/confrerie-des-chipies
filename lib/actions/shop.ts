"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { ShopService } from "@/lib/services/shop.service";

export async function buyItemAction(
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
      await ShopService.buyItem(
        session.user.id,
        itemId
      );

    revalidatePath("/shop");
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