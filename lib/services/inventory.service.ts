import {
  InventoryRepository,
  type InventoryItem,
} from "../repositories/inventory";

export class InventoryService {
  /**
   * Récupère l'inventaire d'un membre.
   */
  static async getInventory(
    profileId: string
  ): Promise<InventoryItem[]> {
    return InventoryRepository.getInventory(
      profileId
    );
  }

  /**
   * Équipe un objet.
   */
  static async equipItem(
    profileId: string,
    itemId: string
  ) {
    return InventoryRepository.equipItem(
      profileId,
      itemId
    );
  }
}