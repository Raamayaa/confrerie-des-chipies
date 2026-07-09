import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function AdminPage({
  title,
  description,
  action,
  children,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            {title}
          </h1>

          {description && (
            <p className="mt-2 text-gray-400">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>

      {children}
    </div>
  );
}