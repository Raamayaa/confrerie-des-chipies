import { ProfileService } from "@/lib/services/profile.service";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import LeaderboardCard from "@/components/leaderboard/LeaderboardCard";

export default async function LeaderboardPage() {
  const leaderboard =
    await ProfileService.getLeaderboard();

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-6xl px-8 pb-20 pt-36">

        <div className="mb-12 text-center">

          <h1 className="text-5xl font-black">
            🏆 Classement
          </h1>

          <p className="mt-3 text-muted-foreground">
            Les membres les plus actifs de la Confrérie.
          </p>

        </div>

        <div className="space-y-6">
          {leaderboard.map((member, index) => (
            <LeaderboardCard
              key={member.id}
              member={member}
              rank={index + 1}
            />
          ))}
        </div>

      </main>
    </>
  );
}