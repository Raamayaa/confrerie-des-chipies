import Image from "next/image";
import { Trophy, Crown } from "lucide-react";

import { Card } from "@/components/ui/card";

import CosmeticAvatar from "@/components/shared/CosmeticAvatar";
import ProfileTitle from "@/components/shared/ProfileTitle";

type Cosmetic = {
  id: string;
  name: string;
  image: string | null;
  rarity: string;
} | null;

type Props = {
  profile: {
    username: string;
    avatar: string | null;
    bio: string | null;
    banner: string | null;

    equipped_frame: Cosmetic;
    equipped_banner: Cosmetic;
    equipped_title: Cosmetic;
    equipped_effect: Cosmetic;
  };

  progress: {
    xp: number;
    level: number;
    current: number;
    required: number;
  };

  rank: number | null;
};

export default function MemberHero({
  profile,
  progress,
  rank,
}: Props) {
  const percent =
    (progress.current / progress.required) * 100;

  return (
    <Card className="overflow-hidden rounded-3xl border-0 bg-card shadow-2xl">
      {/* Bannière */}
      <div className="relative h-72 overflow-hidden">
        {profile.banner ? (
          <Image
            src={profile.banner}
            alt="Bannière"
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-background" />
      </div>

      {/* Contenu */}
      <div className="-mt-20 px-10 pb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Profil */}
          <div>
            <CosmeticAvatar
              avatar={profile.avatar}
              username={profile.username}
              frame={profile.equipped_frame}
              effect={profile.equipped_effect}
            />

            <div className="mt-6">
              <ProfileTitle
                title={profile.equipped_title}
              />

              <div className="flex items-center gap-3">
                <h1 className="text-5xl font-black">
                  {profile.username}
                </h1>

                <span className="rounded-full bg-violet-600/20 px-3 py-1 text-sm font-semibold text-violet-400">
                  Membre
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                {profile.bio ??
                  "Aucune biographie renseignée."}
              </p>
            </div>
          </div>

          {/* Carte XP */}
          <div className="w-full max-w-sm rounded-3xl border bg-background/60 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-500" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Niveau
                  </p>

                  <h2 className="text-3xl font-black">
                    {progress.level}
                  </h2>
                </div>
              </div>

              <div className="rounded-full bg-yellow-500/15 px-4 py-2 font-bold text-yellow-400">
                <Crown className="mr-1 inline h-4 w-4" />

                {rank ? `#${rank}` : "-"}
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm">
                <span>Progression</span>

                <span>{progress.xp} XP</span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 transition-all duration-700"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>
                  {progress.current} XP
                </span>

                <span>
                  {progress.required} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}