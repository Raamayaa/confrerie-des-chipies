import { auth } from "@/auth";
import Image from "next/image";

export default async function AdminHeader() {
  const session = await auth();

  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div>
        <h2 className="text-2xl font-bold">
          👑 Administration
        </h2>

        <p className="text-gray-400">
          Gérez votre communauté.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Image
          src={
            session?.user?.image ??
            "https://cdn.discordapp.com/embed/avatars/0.png"
          }
          alt="Avatar"
          width={45}
          height={45}
          className="rounded-full"
        />

        <div>
          <p className="font-semibold">
            {session?.user?.name}
          </p>

          <p className="text-xs text-gray-400">
            Administrateur
          </p>
        </div>
      </div>
    </header>
  );
}