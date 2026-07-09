import { supabaseAdmin } from "../supabase/server";

export class ShopRepository {
  static async getItems() {
    const { data, error } = await supabaseAdmin
      .from("inventory_items")
      .select("*")
      .order("price", { ascending: true });

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  static async buyItem(
    profileId: string,
    itemId: string
  ) {
    // Récupère le profil
    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select("coins")
        .eq("id", profileId)
        .single();

    if (profileError || !profile) {
      throw new Error("Profil introuvable");
    }

    // Récupère l'objet
    const { data: item, error: itemError } =
      await supabaseAdmin
        .from("inventory_items")
        .select("*")
        .eq("id", itemId)
        .single();

    if (itemError || !item) {
      throw new Error("Objet introuvable");
    }

    if (profile.coins < item.price) {
      throw new Error(
        "Vous n'avez pas assez de pièces."
      );
    }

    // Vérifie si l'objet est déjà possédé
    const { data: owned } = await supabaseAdmin
      .from("profile_inventory")
      .select("id")
      .eq("profile_id", profileId)
      .eq("item_id", itemId)
      .maybeSingle();

    if (owned) {
      throw new Error(
        "Vous possédez déjà cet objet."
      );
    }

    // Retire les pièces
    const { error: coinsError } =
      await supabaseAdmin
        .from("profiles")
        .update({
          coins: profile.coins - item.price,
        })
        .eq("id", profileId);

    if (coinsError) {
      throw coinsError;
    }

    // Ajoute l'objet à l'inventaire
    const { error: inventoryError } =
      await supabaseAdmin
        .from("profile_inventory")
        .insert({
          profile_id: profileId,
          item_id: itemId,
          equipped: false,
        });

    if (inventoryError) {
      throw inventoryError;
    }
  }

  static async getOwnedItems(profileId: string) {
  const { data, error } = await supabaseAdmin
    .from("profile_inventory")
    .select(`
      item_id,
      equipped
    `)
    .eq("profile_id", profileId);

  if (error) {
    throw error;
  }

  return data ?? [];
}

}