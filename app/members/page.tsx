import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import MembersGrid from "@/components/members/MembersGrid";

export default function MembersPage() {
  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pt-36 pb-20">
        <div className="mb-12">
          <h1 className="text-5xl font-black">
            👥 Membres
          </h1>

          <p className="mt-3 text-muted-foreground">
            Découvrez tous les membres de la communauté.
          </p>
        </div>

        <MembersGrid />
      </main>
    </>
  );
}