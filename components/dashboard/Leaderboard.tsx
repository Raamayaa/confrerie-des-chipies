import Image from "next/image";

import { Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ProfileService } from "@/lib/services/profile.service";

export default async function Leaderboard() {
  const members = await ProfileService.getLeaderboard();

  return (
    <Card className="p-8">
      <div className="mb-8 flex items-center gap-3">
        <Trophy className="h-7 w-7 text-yellow-500" />

        <h2 className="text-2xl font-bold">
          🏆 Membres les plus actifs
        </h2>
      </div>

      {members.length === 0 ? (
        <p className="text-muted-foreground">
          Aucun membre.
        </p>
      ) : (
        <div className="space-y-4">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-xl border p-4 transition hover:border-violet-500/40 hover:bg-background/40"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center text-xl">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : index + 1}
                </span>

                <Image
                  src={
                    member.avatar ??
                    "https://cdn.discordapp.com/embed/avatars/0.png"
                  }
                  alt={member.username}
                  width={48}
                  height={48}
                  className="rounded-full border"
                />

                <div>
                  <p className="font-semibold">
                    {member.username}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    🎮 {member.games} • 📅 {member.events} • 💡 {member.ideas}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-black text-violet-500">
                  {member.score}
                </p>

                <p className="text-xs text-muted-foreground">
                  points
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}