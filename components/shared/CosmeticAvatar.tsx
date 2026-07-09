import Image from "next/image";
import { Sparkles } from "lucide-react";

import { FRAME_CLASSES } from "@/lib/utils/cosmetics";

type Cosmetic = {
  id: string;
  name: string;
  image: string | null;
  rarity: string;
} | null;

type Props = {
  avatar: string | null;
  username: string;
  frame: Cosmetic;
  effect: Cosmetic;
  size?: number;
};

export default function CosmeticAvatar({
  avatar,
  username,
  frame,
  effect,
  size = 150,
}: Props) {
  return (
    <div
      className={`relative w-fit rounded-full p-2 ${
        frame
          ? FRAME_CLASSES[frame.rarity] ??
            FRAME_CLASSES.common
          : ""
      }`}
    >
      <Image
        src={
          avatar ??
          "https://cdn.discordapp.com/embed/avatars/0.png"
        }
        alt={username}
        width={size}
        height={size}
        className="rounded-full border-4 border-background shadow-2xl"
      />

      {effect && (
        <div className="absolute -bottom-2 -right-2 rounded-full bg-yellow-500 p-2 shadow-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}