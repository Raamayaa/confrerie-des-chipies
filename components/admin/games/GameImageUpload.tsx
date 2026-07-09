"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/client";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function GameImageUpload({
  value,
  onChange,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    try {
      setLoading(true);

      const extension = file.name.split(".").pop();

      const filename = `${crypto.randomUUID()}.${extension}`;

      const { error } = await supabaseBrowser.storage
        .from("games")
        .upload(filename, file);

      if (error) throw error;

      const { data } = supabaseBrowser.storage
        .from("games")
        .getPublicUrl(filename);

      onChange(data.publicUrl);
    } catch (e) {
      console.error(e);
      alert("Impossible d'envoyer l'image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {value && (
        <Image
          src={value}
          alt="Aperçu"
          width={1000}
          height={500}
          className="h-64 w-full rounded-xl object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            upload(file);
          }
        }}
      />

      <Button
        type="button"
        disabled={loading}
      >
        {loading ? "Envoi..." : "Choisir une image"}
      </Button>
    </div>
  );
}