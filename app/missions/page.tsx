import { auth } from "@/auth";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import { ProfileService } from "@/lib/services/profile.service";

import MissionsList from "@/components/missions/MissionsList";

export default async function MissionsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const missions =
    await ProfileService.getDailyMissions(
      session.user.id
    );

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-5xl px-8 pb-20 pt-36">

        <div className="mb-12">
          <h1 className="text-5xl font-black">
            🎯 Missions quotidiennes
          </h1>

          <p className="mt-3 text-muted-foreground">
            Termine des missions pour gagner des pièces et de l&apos;XP.
          </p>
        </div>

        <MissionsList missions={missions} />

      </main>
    </>
  );
}