import { auth } from "@/auth";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";
import InventoryGrid from "@/components/inventory/InventoryGrid";

import { InventoryService } from "@/lib/services/inventory.service";

export default async function InventoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const inventory = await InventoryService.getInventory(
    session.user.id
  );

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pb-20 pt-36">
        <div className="mb-10">
          <h1 className="text-5xl font-black">
            🎒 Inventaire
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            Gérez vos objets, cadres, titres et cosmétiques.
          </p>
        </div>

        <InventoryGrid inventory={inventory} />
      </main>
    </>
  );
}