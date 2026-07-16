type Mission = {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
};

type Props = {
  missions: Mission[];
};

export default function MissionsList({
  missions,
}: Props) {
  return (
    <div className="space-y-5">
      {missions.map((mission) => (
        <div
          key={mission.id}
          className={`rounded-3xl border p-6 transition ${
            mission.completed
              ? "border-green-500/40 bg-green-500/10"
              : "border-white/10 bg-card"
          }`}
        >
          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black">
                {mission.title}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Récompense :
                <span className="ml-2 font-bold text-yellow-400">
                  🪙 {mission.reward}
                </span>
              </p>

            </div>

            {mission.completed ? (
              <span className="rounded-full bg-green-500 px-4 py-2 font-bold text-white">
                ✅ Terminée
              </span>
            ) : (
              <span className="rounded-full bg-yellow-500 px-4 py-2 font-bold text-black">
                ⏳ En cours
              </span>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}