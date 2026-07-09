import { auth } from "@/auth";

import ActivityChart from "./ActivityChart";

import { ProfileService } from "@/lib/services/profile.service";

export default async function MyActivity() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const data = await ProfileService.getMonthlyActivity(
    session.user.id
  );

  return <ActivityChart data={data} />;
}