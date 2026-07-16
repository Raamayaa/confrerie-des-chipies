import Image from "next/image";

type Props = {
  profile: {
    username: string;
    avatar: string | null;
    banner: string | null;
    bio: string | null;
    coins: number;
  };

  progress: {
    level: number;
    current: number;
    required: number;
  };

  rank: number | null;
};

export default function ProfileHero({
  profile,
  progress,
  rank,
}: Props) {
  const percentage =
    (progress.current / progress.required) * 100;

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-violet-500/10">

      <div
        className="h-56 bg-cover bg-center"
        style={{
          backgroundImage: profile.banner
            ? `url(${profile.banner})`
            : undefined,
        }}
      >
        {!profile.banner && (
          <div className="flex h-full items-center justify-center text-7xl">
            🌌
          </div>
        )}
      </div>

      <div className="-mt-16 px-8 pb-8">

        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">

          <div className="flex flex-col items-center gap-6 md:flex-row md:items-end">

            <Image
              src={
                profile.avatar ??
                "https://placehold.co/160x160"
              }
              alt={profile.username}
              width={140}
              height={140}
              className="rounded-full border-4 border-zinc-900 object-cover shadow-xl"
            />

            <div>

              <h1 className="text-4xl font-black text-white">
                {profile.username}
              </h1>

              <p className="mt-2 text-gray-300">
                {profile.bio ||
                  "Aucune bio renseignée."}
              </p>

            </div>

          </div>

          <div className="mt-8 text-center md:mt-0 md:text-right">

            <div className="text-4xl font-black text-yellow-400">
              🪙 {profile.coins.toLocaleString("fr-FR")}
            </div>

            <div className="mt-2 text-sm text-gray-400">
              Rang #{rank ?? "-"}
            </div>

          </div>

        </div>

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm text-gray-300">

            <span>
              Niveau {progress.level}
            </span>

            <span>
              {progress.current} / {progress.required} XP
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 transition-all duration-500"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

      </div>

    </section>
  );
}