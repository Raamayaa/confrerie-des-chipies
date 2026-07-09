import { InventoryRepository } from "../repositories/inventory";

export class InventoryService {
  static async getInventory(profileId: string) {
    return InventoryRepository.getInventory(profileId);
  }

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