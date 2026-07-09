"use client";

import { useState } from "react";

type Props = {
  onUploaded(url: string): void;
};

export default function GameImageUpload({
  onUploaded,
}: Props) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    try {
      setUploading(true);

      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/upload/game", {
        method: "POST",
        body,
      });

      const data = await res.json();

      onUploaded(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files?.length) return;

          upload(e.target.files[0]);
        }}
      />

      {uploading && (
        <p>Upload...</p>
      )}
    </div>
  );
}