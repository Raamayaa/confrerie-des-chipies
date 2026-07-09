import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import MyGames from "@/components/admin/dashboard/MyGames";
import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";
import UpcomingEvents from "@/components/admin/dashboard/UpcomingEvents";

import Notifications from "@/components/dashboard/Notifications";
import MyStats from "@/components/dashboard/MyStats";
import LevelCard from "@/components/dashboard/LevelCard";
import Badges from "@/components/dashboard/Badges";
import DailyMissions from "@/components/dashboard/DailyMissions";
import MyActivity from "@/components/dashboard/MyActivity";
import Leaderboard from "@/components/dashboard/Leaderboard";

export default function DashboardPage() {
  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-8 px-8 pb-20 pt-36">
        {/* En-tête */}
        <DashboardHeader />

        {/* Statistiques */}
        <MyStats />

        {/* Niveau */}
        <LevelCard />

        {/* Badges */}
        <Badges />

        {/* Missions quotidiennes */}
        <DailyMissions />

        {/* Graphique d'activité */}
        <MyActivity />

        {/* Classement des membres */}
        <Leaderboard />

        {/* Mes jeux + Activité */}
        <div className="grid gap-8 xl:grid-cols-2">
          <MyGames />
          <ActivityFeed />
        </div>

        {/* Événements + Notifications */}
        <div className="grid gap-8 xl:grid-cols-2">
          <UpcomingEvents />
          <Notifications />
        </div>
      </main>
    </>
  );
}