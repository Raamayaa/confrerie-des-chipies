import { ShopRepository } from "../repositories/shop";

export class ShopService {
  /**
   * Tous les objets de la boutique.
   */
  static async getItems() {
    return ShopRepository.getItems();
  }

  /**
   * Achète un objet.
   */
  static async buyItem(
    profileId: string,
    itemId: string
  ) {
    return ShopRepository.buyItem(
      profileId,
      itemId
    );
  }

  /**
   * Objets possédés par un membre.
   */
  static async getOwnedItems(
    profileId: string
  ) {
    return ShopRepository.getOwnedItems(
      profileId
    );
  }
}