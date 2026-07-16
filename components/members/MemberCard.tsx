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
      className="group overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-900/80 backdrop-blur-xl shadow-xl shadow-violet-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/20"
    >
      {/* Bannière */}
      <div
        className="relative h-36 bg-cover bg-center"
        style={{
          backgroundImage: member.banner
            ? `url(${member.banner})`
            : undefined,
        }}
      >
        {!member.banner && (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-700/40 via-fuchsia-600/20 to-cyan-500/30 text-5xl">
            🌌
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
      </div>

      {/* Avatar + infos */}
      <div className="-mt-14 flex flex-col items-center px-6 pb-8">

        <Image
          src={
            member.avatar ??
            "https://placehold.co/100x100"
          }
          alt={member.username}
          width={100}
          height={100}
          className="rounded-full border-4 border-zinc-900 object-cover shadow-xl transition duration-300 group-hover:scale-105"
        />

        <h2 className="mt-5 text-xl font-black text-white">
          {member.username}
        </h2>

        <p className="mt-3 line-clamp-2 text-center text-sm text-gray-400">
          {member.bio ?? "Aucune bio"}
        </p>

      </div>
    </Link>
  );
}