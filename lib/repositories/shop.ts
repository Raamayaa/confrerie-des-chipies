import { supabaseAdmin } from "../supabase/server";

export class ShopRepository {
  // ==========================
  // Tous les objets
  // ==========================

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

  // ==========================
  // Acheter un objet
  // ==========================

  static async buyItem(
    profileId: string,
    itemId: string
  ) {
    // Profil
    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select("coins")
        .eq("id", profileId)
        .single();

    if (profileError || !profile) {
      throw new Error("Profil introuvable.");
    }

    // Objet
    const { data: item, error: itemError } =
      await supabaseAdmin
        .from("inventory_items")
        .select("*")
        .eq("id", itemId)
        .single();

    if (itemError || !item) {
      throw new Error("Objet introuvable.");
    }

    // Sécurité
    if (item.price <= 0) {
      throw new Error(
        "Prix de l'objet invalide."
      );
    }

    if (profile.coins < item.price) {
      throw new Error(
        "Vous n'avez pas assez de pièces."
      );
    }

    // Déjà possédé ?
    const { data: owned } =
      await supabaseAdmin
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

    // Déduit les pièces
    const remainingCoins =
      profile.coins - item.price;

    const { error: coinsError } =
      await supabaseAdmin
        .from("profiles")
        .update({
          coins: remainingCoins,
        })
        .eq("id", profileId);

    if (coinsError) {
      throw coinsError;
    }

    // Ajoute à l'inventaire
    const { error: inventoryError } =
      await supabaseAdmin
        .from("profile_inventory")
        .insert({
          profile_id: profileId,
          item_id: itemId,
          equipped: false,
        } as never);

    if (inventoryError) {
      throw inventoryError;
    }

    return {
      success: true,
      item,
      remainingCoins,
    };
  }

  // ==========================
  // Objets possédés
  // ==========================

  static async getOwnedItems(
    profileId: string
  ) {
    const { data, error } =
      await supabaseAdmin
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