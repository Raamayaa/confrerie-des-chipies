"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateProfileAction } from "@/app/profile/actions";
import { uploadImageAction } from "@/app/profile/upload-action";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import UploadImage from "./UploadImage";

type Props = {
  profile: {
    username: string;
    bio: string | null;
    avatar: string | null;
    banner: string | null;
  };
};

export default function ProfileEditor({
  profile,
}: Props) {
  const [username, setUsername] = useState(
    profile.username
  );

  const [bio, setBio] = useState(
    profile.bio ?? ""
  );

  const [avatar, setAvatar] = useState<string | null>(
    profile.avatar
  );

  const [banner, setBanner] = useState<string | null>(
    profile.banner
  );

  const [isPending, startTransition] =
    useTransition();

  async function handleAvatarUpload(file: File) {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", "avatars");

      const url = await uploadImageAction(formData);

      setAvatar(url);

      toast.success("Avatar mis à jour !");
    } catch (error) {
      console.error(error);

      toast.error(
        "Impossible d'envoyer l'avatar."
      );
    }
  }

  async function handleBannerUpload(file: File) {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", "banners");

      const url = await uploadImageAction(formData);

      setBanner(url);

      toast.success("Bannière mise à jour !");
    } catch (error) {
      console.error(error);

      toast.error(
        "Impossible d'envoyer la bannière."
      );
    }
  }

  function save() {
    startTransition(async () => {
      try {
        await updateProfileAction({
          username,
          bio,
          avatar: avatar ?? undefined,
          banner: banner ?? undefined,
        });

        toast.success(
          "Profil enregistré avec succès !"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Impossible d'enregistrer le profil."
        );
      }
    });
  }

  return (
    <Card className="space-y-10 rounded-3xl p-8">

      {/* Aperçu du profil */}
      <div className="overflow-hidden rounded-3xl border bg-card shadow-xl">

        <div
          className="relative h-48 bg-cover bg-center"
          style={{
            backgroundImage: banner
              ? `url(${banner})`
              : undefined,
          }}
        >
          {!banner && (
            <div className="flex h-full items-center justify-center text-6xl">
              🌌
            </div>
          )}
        </div>

        <div className="-mt-16 flex flex-col items-center px-6 pb-8">

          <Image
            src={
              avatar ??
              "https://placehold.co/160x160"
            }
            alt={username}
            width={128}
            height={128}
            className="h-32 w-32 rounded-full border-4 border-background object-cover shadow-xl"
          />

          <h2 className="mt-5 text-3xl font-black">
            {username}
          </h2>

          <p className="mt-3 max-w-2xl text-center text-muted-foreground">
            {bio ||
              "Aucune bio pour le moment."}
          </p>
        </div>

      </div>

      {/* Formulaire */}
      <div>

        <h1 className="text-3xl font-black">
          Mon profil
        </h1>

        <p className="mt-2 text-muted-foreground">
          Personnalisez votre profil.
        </p>

      </div>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Pseudo
          </label>

          <Input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Bio
          </label>

          <Textarea
            rows={5}
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
          />
        </div>

        <UploadImage
          label="Avatar"
          value={avatar}
          onChange={handleAvatarUpload}
        />

        <UploadImage
          label="Bannière"
          value={banner}
          onChange={handleBannerUpload}
        />

        <Button
          className="w-full"
          disabled={isPending}
          onClick={save}
        >
          {isPending
            ? "💾 Enregistrement..."
            : "💾 Enregistrer les modifications"}
        </Button>

      </div>

    </Card>
  );
}