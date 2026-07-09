import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";

type Member = {
  discord_id: string;
  username: string;
  avatar: string | null;
};

type Props = {
  member: Member;
};

export default function MemberCard({
  member,
}: Props) {
  return (
    <Link href={`/members/${member.discord_id}`}>
      <Card className="overflow-hidden transition hover:scale-[1.02] hover:border-violet-500">
        <div className="flex flex-col items-center p-6">
          <Image
            src={
              member.avatar ??
              "https://cdn.discordapp.com/embed/avatars/0.png"
            }
            alt={member.username}
            width={96}
            height={96}
            className="rounded-full border-4 border-violet-500"
          />

          <h2 className="mt-4 text-xl font-bold">
            {member.username}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Voir le profil
          </p>
        </div>
      </Card>
    </Link>
  );
}