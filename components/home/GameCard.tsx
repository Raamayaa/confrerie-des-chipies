import Image from "next/image";
import Link from "next/link";

type Avatar = {
  id: string;
  username: string;
  avatar: string | null;
};

type Props = {
  id: string;
  name: string;
  image: string;
  players: number;
  avatars: Avatar[];
};

export default function GameCard({
  id,
  name,
  image,
  players,
  avatars,
}: Props) {
  return (
    <Link href={`/games/${id}`}>
      <article className="overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-1 hover:shadow-xl">
        <Image
          src={image}
          alt={name}
          width={600}
          height={320}
          className="h-56 w-full object-cover"
        />
        <div className="space-y-5 p-6">
          <div>
            <h3 className="text-2xl font-bold">
              {name}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {players} joueur{players > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex -space-x-3">
            {avatars.slice(0, 5).map((player) => (
              <Image
                key={player.id}
                src={
                  player.avatar ??
                  "https://cdn.discordapp.com/embed/avatars/0.png"
                }
                alt={player.username}
                width={38}
                height={38}
                className="rounded-full border-2 border-background"
              />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}