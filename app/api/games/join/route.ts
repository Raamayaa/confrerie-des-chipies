import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { supabaseAdmin } from "@/lib/supabase/server";
import { ActivityService } from "@/lib/services/activity.service";

export async function POST(req: Request) {
  const session = await auth();

  const profileId = session?.user.profileId;

  if (!profileId) {
    return NextResponse.json(
      { error: "Utilisateur non connecté." },
      { status: 401 }
    );
  }

  const { gameId } = await req.json();

  // Vérifie si le joueur participe déjà
  const { data: existing, error: selectError } =
    await supabaseAdmin
      .from("game_players")
      .select("id")
      .eq("game_id", gameId)
      .eq("profile_id", profileId)
      .maybeSingle();

  if (selectError) {
    return NextResponse.json(
      { error: selectError.message },
      { status: 400 }
    );
  }

  if (existing) {
    return NextResponse.json({
      success: true,
      alreadyJoined: true,
    });
  }

  // Récupère le profil
  const { data: profile, error: profileError } =
    await supabaseAdmin
      .from("profiles")
      .select(
        "discord_id, username, avatar"
      )
      .eq("id", profileId)
      .single();

  if (profileError || !profile) {
    return NextResponse.json(
      { error: "Profil introuvable." },
      { status: 400 }
    );
  }

  // Inscription
  const { error } = await supabaseAdmin
    .from("game_players")
    .insert({
      game_id: gameId,
      profile_id: profileId,
      discord_id: profile.discord_id,
      username: profile.username,
      avatar: profile.avatar,
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Nom du jeu
  const { data: game } =
    await supabaseAdmin
      .from("games")
      .select("name")
      .eq("id", gameId)
      .single();

  await ActivityService.create(
    profileId,
    "join_game",
    `A rejoint ${game?.name ?? "un jeu"}`
  );

  return NextResponse.json({
    success: true,
    alreadyJoined: false,
  });
}