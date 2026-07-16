export const dynamic = "force-dynamic";

import Background from "@/components/shared/Background";
import Navbar from "@/components/layout/Navbar";

import { ProfileService } from "@/lib/services/profile.service";

import MemberCard from "@/components/members/MemberCard";

export default async function MembersPage() {
  const members =
    await ProfileService.getMembers();

  return (
    <>
      <Background />
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 pb-20 pt-36">
        <div className="mb-12">
          <h1 className="text-5xl font-black">
            👥 Membres
          </h1>

          <p className="mt-3 text-muted-foreground">
            Découvre les membres de la Confrérie.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
            />
          ))}
        </div>
      </main>
    </>
  );
}