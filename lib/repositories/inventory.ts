import { supabaseAdmin } from "../supabase/server";

export type InventoryItem = {
  equipped: boolean;
  id: string;
  name: string;
  description: string | null;
  type: "frame" | "banner" | "title" | "effect";
  rarity: string;
  image: string | null;
};

export class InventoryRepository {
  static async getInventory(
  profileId: string
): Promise<InventoryItem[]> {
  const { data, error } = await supabaseAdmin
    .from("profile_inventory")
    .select(`
      equipped,
      inventory_items (
        id,
        name,
        description,
        type,
        rarity,
        image
      )
    `)
    .eq("profile_id", profileId);

  if (error) {
    throw error;
  }

  return (data ?? []).flatMap(
    (row): InventoryItem[] => {
      const item = row.inventory_items;

      if (!item || Array.isArray(item)) {
        return [];
      }

      return [
        {
          equipped: Boolean(row.equipped),
          id: item.id,
          name: item.name,
          description: item.description,
          type:
            item.type as InventoryItem["type"],
          rarity: item.rarity,
          image: item.image,
        },
      ];
    }
  );
}

  static async equipItem(
    profileId: string,
    itemId: string
  ) {
    const { data: item, error: itemError } =
      await supabaseAdmin
        .from("inventory_items")
        .select("*")
        .eq("id", itemId)
        .single();

    if (itemError || !item) {
      throw itemError ?? new Error("Objet introuvable");
    }

    const { data: sameTypeItems } =
      await supabaseAdmin
        .from("profile_inventory")
        .select(`
          item_id,
          inventory_items(type)
        `)
        .eq("profile_id", profileId);

    for (const row of sameTypeItems ?? []) {
      const inventoryItem = Array.isArray(
        row.inventory_items
      )
        ? row.inventory_items[0]
        : row.inventory_items;

      if (inventoryItem?.type === item.type) {
        await supabaseAdmin
          .from("profile_inventory")
          .update({
            equipped: false,
          })
          .eq("profile_id", profileId)
          .eq("item_id", row.item_id);
      }
    }

    const { error } = await supabaseAdmin
      .from("profile_inventory")
      .update({
        equipped: true,
      })
      .eq("profile_id", profileId)
      .eq("item_id", itemId);

    if (error) {
      throw error;
    }

    const updates: {
      equipped_frame?: string;
      equipped_banner?: string;
      equipped_title?: string;
      equipped_effect?: string;
    } = {};

    switch (item.type) {
      case "frame":
        updates.equipped_frame = item.id;
        break;

      case "banner":
        updates.equipped_banner = item.id;
        break;

      case "title":
        updates.equipped_title = item.id;
        break;

      case "effect":
        updates.equipped_effect = item.id;
        break;
    }

    if (Object.keys(updates).length > 0) {
      const { error: profileError } =
        await supabaseAdmin
          .from("profiles")
          .update(updates)
          .eq("id", profileId);

      if (profileError) {
        throw profileError;
      }
    }
  }
}