import { Inbox } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
      <Inbox
        size={48}
        className="text-muted-foreground"
      />

      <h2 className="mt-6 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {description}
      </p>
    </div>
  );
}