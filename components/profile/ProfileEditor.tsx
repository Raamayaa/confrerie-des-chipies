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
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio ?? "");
  const [avatar, setAvatar] = useState<string | null>(profile.avatar);
  const [banner, setBanner] = useState<string | null>(profile.banner);

  const [isPending, startTransition] = useTransition();

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
      toast.error("Impossible d'envoyer l'avatar.");
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
      toast.error("Impossible d'envoyer la bannière.");
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

        toast.success("Profil enregistré avec succès !");
      } catch (error) {
        console.error(error);
        toast.error("Impossible d'enregistrer le profil.");
      }
    });
  }

  return (
    <Card className="space-y-10 rounded-3xl border border-violet-500/20 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-violet-500/10">

      {/* Aperçu */}
      <div className="overflow-hidden rounded-3xl border border-violet-500/20 bg-zinc-800/70 shadow-xl">

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
            className="h-32 w-32 rounded-full border-4 border-zinc-900 object-cover shadow-xl"
          />

          <h2 className="mt-5 text-3xl font-black text-white">
            {username}
          </h2>

          <p className="mt-3 max-w-2xl text-center text-gray-300">
            {bio || "Aucune bio pour le moment."}
          </p>

        </div>

      </div>

      {/* Titre */}
      <div>

        <h1 className="text-3xl font-black text-white">
          Mon profil
        </h1>

        <p className="mt-2 text-gray-400">
          Personnalisez votre profil.
        </p>

      </div>

      {/* Formulaire */}
      <div className="space-y-6">

        <div>

          <label className="mb-2 block text-sm font-medium text-white">
            Pseudo
          </label>

          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-zinc-700 bg-zinc-800 text-white placeholder:text-gray-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-white">
            Bio
          </label>

          <Textarea
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border-zinc-700 bg-zinc-800 text-white placeholder:text-gray-500"
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
          onClick={save}
          disabled={isPending}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white transition hover:opacity-90"
        >
          {isPending
            ? "💾 Enregistrement..."
            : "💾 Enregistrer les modifications"}
        </Button>

      </div>

    </Card>
  );
}