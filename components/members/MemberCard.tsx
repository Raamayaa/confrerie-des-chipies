import Image from "next/image";
import Link from "next/link";

type Props = {
  member: {
    id: string;
    username: string;
    avatar: string | null;
    banner: string | null;
    bio: string | null;
  };
};

export default function MemberCard({
  member,
}: Props) {
  return (
    <Link
      href={`/members/${member.id}`}
      className="overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-2 hover:border-violet-500/40"
    >
      <div
        className="h-32 bg-cover bg-center"
        style={{
          backgroundImage: member.banner
            ? `url(${member.banner})`
            : undefined,
        }}
      />

      <div className="-mt-12 flex flex-col items-center p-6">

        <Image
          src={
            member.avatar ??
            "https://placehold.co/100x100"
          }
          alt={member.username}
          width={96}
          height={96}
          className="rounded-full border-4 border-background object-cover"
        />

        <h2 className="mt-4 text-xl font-black">
          {member.username}
        </h2>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          {member.bio ??
            "Aucune bio"}
        </p>

      </div>

    </Link>
  );
}