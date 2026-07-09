"use client";

import { ReactNode } from "react";

type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (row: T) => ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function DataTable<T>({
  columns,
  data,
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            {columns.map((column) => (
              <th
                key={column.title}
                className="px-6 py-4 text-left text-sm font-semibold"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-16 text-center text-muted-foreground"
              >
                Aucun résultat.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="border-b transition hover:bg-muted/30"
              >
                {columns.map((column) => (
                  <td
                    key={column.title}
                    className="px-6 py-4"
                  >
                    {column.render
                      ? column.render(row)
                      : String(
                          row[column.key as keyof T] ?? ""
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}