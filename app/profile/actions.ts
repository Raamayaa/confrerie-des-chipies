"use server";

import { auth } from "@/auth";

import { ProfileService } from "@/lib/services/profile.service";

export async function updateProfileAction(data: {
  username: string;
  bio: string;
  avatar?: string;
  banner?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await ProfileService.updateProfile(session.user.id, {
    username: data.username,
    bio: data.bio,
    avatar: data.avatar,
    banner: data.banner,
  });

  return {
    success: true,
  };
}