import { auth } from "@/auth";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import { ProfileService } from "@/lib/services/profile.service";

import ProfileHero from "@/components/profile/ProfileHero";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileBadges from "@/components/profile/ProfileBadges";
import ProfileEditor from "@/components/profile/ProfileEditor";
import ProfileActivity from "@/components/profile/ProfileActivity";
import LevelCard from "@/components/profile/LevelCard";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const [
    profile,
    stats,
    progress,
    rank,
    badges,
    activity,
  ] = await Promise.all([
    ProfileService.getProfile(session.user.id),
    ProfileService.getDashboardStats(session.user.id),
    ProfileService.getProgress(session.user.id),
    ProfileService.getMemberRank(session.user.id),
    ProfileService.getBadges(session.user.id),
    ProfileService.getRecentActivity(session.user.id),
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

        <LevelCard
          level={profile.level}
          xp={profile.xp}
        />

        <ProfileBadges
          badges={badges}
        />

        <ProfileActivity
          activity={activity}
        />

        <ProfileEditor
          profile={profile}
        />
      </main>
    </>
  );
}