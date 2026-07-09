import { Coins } from "lucide-react";

type Props = {
  coins: number;
};

export default function CoinsBadge({
  coins,
}: Props) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 font-bold text-yellow-400">
      <Coins className="h-5 w-5" />

      {coins.toLocaleString("fr-FR")}
    </div>
  );
}