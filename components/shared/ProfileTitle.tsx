import { TITLE_CLASSES } from "@/lib/utils/cosmetics";

type Cosmetic = {
  id: string;
  name: string;
  image: string | null;
  rarity: string;
} | null;

type Props = {
  title: Cosmetic;
};

export default function ProfileTitle({
  title,
}: Props) {
  if (!title) return null;

  return (
    <div
      className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-lg ${
        TITLE_CLASSES[
          title.rarity
        ] ?? TITLE_CLASSES.common
      }`}
    >
      <span>{title.image}</span>

      <span>{title.name}</span>
    </div>
  );
}