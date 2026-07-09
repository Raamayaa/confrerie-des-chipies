import { auth } from "@/auth";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import { ProfileService } from "@/lib/services/profile.service";

import ProfileEditor from "@/components/profile/ProfileEditor";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const profile = await ProfileService.getProfile(
    session.user.id
  );

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-4xl px-8 pb-20 pt-36">
        <ProfileEditor profile={profile} />
      </main>
    </>
  );
}