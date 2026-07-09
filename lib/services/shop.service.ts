import { ShopRepository } from "../repositories/shop";

export class ShopService {
  static getItems() {
    return ShopRepository.getItems();
  }

  static buyItem(
    profileId: string,
    itemId: string
  ) {
    return ShopRepository.buyItem(
      profileId,
      itemId
    );
  }

  static getOwnedItems(profileId: string) {
  return ShopRepository.getOwnedItems(profileId);
}

}