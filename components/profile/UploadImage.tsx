"use client";

import { ChangeEvent } from "react";

type Props = {
  label: string;
  value: string | null;
  onChange: (file: File) => void;
};

export default function UploadImage({
  label,
  value,
  onChange,
}: Props) {
  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        {label}
      </label>

      {value ? (
        <img
          src={value}
          alt={label}
          className="h-48 w-full rounded-xl border object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
          Aucune image
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full rounded-md border p-2"
      />
    </div>
  );
}