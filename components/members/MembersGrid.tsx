import Image from "next/image";
import Link from "next/link";

import { ProfilesRepository } from "@/lib/repositories/profiles";

export default async function MembersGrid() {
  const members =
    await ProfilesRepository.getAll();

  return (
    <div className="grid gap-8 md:grid-cols-3 xl:grid-cols-4">
      {members.map((member) => (
        <Link
          key={member.id}
          href={`/members/${member.id}`}
          className="rounded-3xl border bg-card p-8 transition hover:-translate-y-1 hover:border-violet-500"
        >
          <Image
            src={
              member.avatar ??
              "https://cdn.discordapp.com/embed/avatars/0.png"
            }
            alt={member.username}
            width={90}
            height={90}
            className="mx-auto rounded-full"
          />

          <h2 className="mt-6 text-center text-2xl font-bold">
            {member.username}
          </h2>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            {member.role}
          </p>
        </Link>
      ))}
    </div>
  );
}