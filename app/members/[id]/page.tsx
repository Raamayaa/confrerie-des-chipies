import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import ProfileHero from "@/components/profile/ProfileHero";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileBadges from "@/components/profile/ProfileBadges";
import ProfileActivity from "@/components/profile/ProfileActivity";

import { ProfileService } from "@/lib/services/profile.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MemberPage({
  params,
}: Props) {
  const { id } = await params;

  const [
    profile,
    stats,
    progress,
    rank,
    badges,
    activity,
  ] = await Promise.all([
    ProfileService.getProfile(id),
    ProfileService.getDashboardStats(id),
    ProfileService.getProgress(id),
    ProfileService.getMemberRank(id),
    ProfileService.getBadges(id),
    ProfileService.getRecentActivity(id),
  ]);

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-6xl space-y-10 px-8 pb-20 pt-36">

        <ProfileHero
          profile={profile}
          progress={progress}
          rank={rank}
        />

        <ProfileStats
          profile={profile}
          stats={stats}
          progress={progress}
          rank={rank}
        />

        <ProfileBadges
          badges={badges}
        />

        <ProfileActivity
          activity={activity}
        />

      </main>
    </>
  );
}