import { ReactNode } from "react";

type Props = {
  title: string;
  value: number;
  icon: ReactNode;
};

export default function StatsCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-black">
            {value}
          </h2>
        </div>

        <div className="text-violet-500">
          {icon}
        </div>
      </div>
    </div>
  );
}