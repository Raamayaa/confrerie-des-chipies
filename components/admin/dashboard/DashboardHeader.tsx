import { auth } from "@/auth";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default async function DashboardHeader() {
  const session = await auth();

  return (
    <Card className="flex flex-col items-center justify-between gap-8 p-8 md:flex-row">
      <div>
        <p className="text-sm uppercase tracking-widest text-violet-400">
          Dashboard
        </p>

        <h1 className="mt-2 text-5xl font-black">
          👋 Bonjour {session?.user?.name}
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Ravi de te revoir dans la Confrérie des Chipies.
        </p>

        <div className="mt-6 inline-flex rounded-full bg-violet-600/20 px-4 py-2 text-sm text-violet-300">
          ✨ Connecté avec Discord
        </div>
      </div>

      <Image
        src={
          session?.user?.image ??
          "https://cdn.discordapp.com/embed/avatars/0.png"
        }
        alt="Avatar"
        width={110}
        height={110}
        className="rounded-full border-4 border-violet-500 shadow-lg shadow-violet-500/30"
      />
    </Card>
  );
}