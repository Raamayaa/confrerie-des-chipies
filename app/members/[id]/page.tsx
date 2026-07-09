import { notFound } from "next/navigation";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import { ProfileService } from "@/lib/services/profile.service";

import MemberHero from "@/components/members/MemberHero";
import MemberStats from "@/components/members/MemberStats";
import MemberBadges from "@/components/members/MemberBadges";
import MemberAchievements from "@/components/members/MemberAchievements";
import MemberGames from "@/components/members/MemberGames";
import MemberTimeline from "@/components/members/MemberTimeline";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MemberPage({
  params,
}: Props) {
  const { id } = await params;

  const profile = await ProfileService.getProfile(id);

  if (!profile) {
    notFound();
  }

  const [progress, rank] = await Promise.all([
    ProfileService.getProgress(id),
    ProfileService.getMemberRank(id),
  ]);

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-8 pb-20 pt-36">
        {/* Hero */}
        <MemberHero
          profile={profile}
          progress={progress}
          rank={rank}
        />

        {/* Statistiques */}
        <MemberStats profileId={id} />

        {/* Succès */}
        <MemberAchievements profileId={id} />

        {/* Badges */}
        <MemberBadges profileId={id} />

        {/* Jeux */}
        <MemberGames profileId={id} />

        {/* Activité récente */}
        <MemberTimeline profileId={id} />
      </main>
    </>
  );
}