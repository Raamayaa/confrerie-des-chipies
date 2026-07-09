import { auth } from "@/auth";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import ShopHeader from "@/components/shop/ShopHeader";
import ShopItem from "@/components/shop/ShopItem";

import { ShopService } from "@/lib/services/shop.service";
import { ProfileService } from "@/lib/services/profile.service";

export default async function ShopPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const [items, ownedItems, coins] =
    await Promise.all([
      ShopService.getItems(),
      ShopService.getOwnedItems(
        session.user.id
      ),
      ProfileService.getCoins(
        session.user.id
      ),
    ]);

  const categories = {
    frame: items.filter(
      (item) => item.type === "frame"
    ),
    banner: items.filter(
      (item) => item.type === "banner"
    ),
    title: items.filter(
      (item) => item.type === "title"
    ),
    effect: items.filter(
      (item) => item.type === "effect"
    ),
  };

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-14 px-8 pb-20 pt-36">
        <ShopHeader coins={coins} />

        {Object.entries(categories).map(
          ([category, list]) => (
            <section
              key={category}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black capitalize">
                {category}
              </h2>

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                {list.map((item) => {
                  const owned =
                    ownedItems.find(
                      (inventoryItem) =>
                        inventoryItem.item_id ===
                        item.id
                    );

                  return (
                    <ShopItem
                      key={item.id}
                      item={item}
                      owned={!!owned}
                      equipped={
                        owned?.equipped ?? false
                      }
                    />
                  );
                })}
              </div>
            </section>
          )
        )}
      </main>
    </>
  );
}