"use client";

import { useState, useTransition } from "react";

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
    } catch (error) {
      console.error(error);
      alert("Impossible d'envoyer l'avatar.");
    }
  }

  async function handleBannerUpload(file: File) {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", "banners");

      const url = await uploadImageAction(formData);

      setBanner(url);
    } catch (error) {
      console.error(error);
      alert("Impossible d'envoyer la bannière.");
    }
  }

  function save() {
    startTransition(async () => {
      try {
        console.log("Envoi du profil...");

        const result = await updateProfileAction({
          username,
          bio,
          avatar: avatar ?? undefined,
          banner: banner ?? undefined,
        });

        console.log("Résultat :", result);

        alert("Profil enregistré !");
      } catch (error) {
        console.error("Erreur :", error);

        alert(JSON.stringify(error, null, 2));
      }
    });
  }

  return (
    <Card className="space-y-8 p-8">
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
          disabled={isPending}
          onClick={save}
        >
          {isPending
            ? "Enregistrement..."
            : "Enregistrer"}
        </Button>
      </div>
    </Card>
  );
}