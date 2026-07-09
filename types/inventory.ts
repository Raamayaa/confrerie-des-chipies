export interface InventoryItem {
  id: string;
  name: string;
  description: string | null;
  type: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  image: string | null;
  equipped: boolean;
}