import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function PageHeader({
  title,
  description,
  action,
}: Props) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-5xl font-black">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}